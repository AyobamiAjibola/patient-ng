'use client';

import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import Navbar from "../components/Navbar";
import PButton, { NButton } from "../components/PButton";
import { ArrowDownward, ChatBubbleOutline, CheckCircle } from "@mui/icons-material";
import Footer from "@/app/components/Footer";
import InputField from "../components/InputField";
import { useForm } from "react-hook-form";
import { useRef, useState } from "react";
import { useAtom } from "jotai";
import { modalReg } from "@/lib/atoms";
import { useSession } from "next-auth/react";
import { useCreateComplain } from "../admin/hooks/advocacyHook/useAdvocacy";
import Toastify from "../components/ToastifySnack";
import { useRouter } from "next/navigation";

const advocacy = [
  "Informal Complaint (Step 1)",
  "Formal Complaint (Step 2)",
  "What to Include in your Complaint",
  "Submit your complaint online",
  "Request the HSE to review the complaint"
];

type FormValues = {
  nameOfHospital: string;
  addressOfHospital: string;
  complaints: string;
}

export default function page() {
  const isMobile = useMediaQuery('(max-width: 900px)');
  const theme = useTheme();
  const targetRef = useRef<any>(null);
  const [_, setOpenModalReg] = useAtom(modalReg);
  const { data: session } = useSession();
  const createComplainMutation = useCreateComplain();
  const [currentStep, setCurrentStep] = useState<number>(1);
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);

  const handleOpenNotification = (type: 'success' | 'error', successMsg?: string, errorMsg?: string) => {
      setMessage(type === 'success' ? successMsg || 'Operation was successful!' : errorMsg || 'There was an error!');
      setIsError(type === 'error');
      setIsSuccess(type === 'success');
      setOpen(true);
  };

  const onSubmit = async (data: FormValues) => {
    const payload = {
      hospitalName: data.nameOfHospital,
      hospitalAddress: data.addressOfHospital,
      complaints: data.complaints
    }

    await createComplainMutation.mutateAsync(payload, {
      onSuccess: (response) => {
        handleOpenNotification('success', response.message)
        reset()
      },
      onError: (error: any) => {
        const errorMessage = error.response?.data?.message || 'An unexpected error occurred';
        handleOpenNotification('error', '', errorMessage)
      }
    })
  }

  const {
    handleSubmit,
    register,
    formState: { errors },
    reset
  } = useForm<FormValues>({
    defaultValues: {
      nameOfHospital: '',
      addressOfHospital: '',
      complaints: ''
    },
  });

  const handleClick = () => {
    if (targetRef.current) {
      targetRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <Navbar/>
      <Box
        sx={{
          display: 'flex',
          height: 'auto',
          px: isMobile ? '20px' : '90px', py: 5,
          gap: 4
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            width: isMobile ? '100%' : '60%',
            justifyContent: 'center',
            gap: 4,
            py: 6, px: 2
          }}
        >
          <Typography
            sx={{
              fontSize: theme.typography.h3.fontSize,
              fontWeight: theme.typography.h3.fontWeight,
            }}
          >
            Patient Advocacy Service
          </Typography>
          <Typography
            sx={{
              fontSize: theme.typography.labellg.fontSize,
              color: theme.palette.secondary.light
            }}
          >
            Your trusted ally in healthcare, advocating for your rights and well-being. Let us guide you through every step of your healthcare journey with expertise and compassion.
          </Typography>
          <Box
            sx={{
              display: 'flex',
              gap: 2,
              flexDirection: isMobile ? 'column' : 'row'
            }}
          >
            <NButton 
              textcolor={"white"}
              bkgcolor={theme.palette.primary.main}
              onClick={handleClick}
            >
              Make a complaints <ArrowDownward sx={{fontSize: '16px'}}/>
            </NButton>
            {session?.user
              ? (
                <></>
              ) : (
                <NButton
                  onClick={() => setOpenModalReg(true)}
                  textcolor={theme.palette.primary.main}
                  bordercolor={theme.palette.primary.main}
                  bkgcolor="white"
                  hoverbordercolor={theme.palette.primary.main}
                >
                  Become an advocate
                </NButton>
              )}
          </Box>
          
        </Box>
        {!isMobile && (<Box
          sx={{
            border: `8px solid #FFEFB2`,
            borderRadius: theme.borderRadius.sm,
            width: '400px',
            height: '500px'
          }}
        >
          <img
            src="/advocacy-img.png"
            alt="advocacy image"
            style={{
              width: '100%',
              height: '100%',
              borderRadius: theme.borderRadius.sm
            }}
          />
          <Box
            sx={{
                width: 280,
                height: 'auto',
                backgroundColor: 'white',
                borderRadius: theme.borderRadius.sm,
                p:3, display: 'flex', gap: 1,
                position: 'absolute',
                mt: '-130px', ml: '-60px',
                boxShadow: 5
            }}
          >
            <ChatBubbleOutline
                sx={{
                  color: theme.palette.primary.main
                }}
            />
            <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column'
                }}
            >
              <Typography
                sx={{
                  fontSize: '12px',
                  alignSelf: 'center'
                }}
              >
                Patient.ng advocacy service helped me get a second opinion
                  with the right diagnosis and treatment, and I felt supported.
              </Typography>
              <Typography
                sx={{
                  fontSize: '12px',
                  alignSelf: 'flex-end',
                  color: theme.palette.secondary.light
                }}
              >
                Sarah Thompson
              </Typography>
            </Box>
          </Box>
        </Box>)}
      </Box>

      <Box
        ref={targetRef}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: 'auto',
          px: isMobile ? '20px' : '90px', py: 5,
          width: '100%'
        }}
      >
        <Typography
          sx={{
            fontSize: isMobile ? theme.typography.h5.fontSize : theme.typography.h3.fontSize,
            fontWeight: theme.typography.h3.fontWeight,
          }}
        >
          Step-by-Step Guide to Making a Complaint
        </Typography>
        <Typography
          sx={{
            fontSize: theme.typography.labelsm.fontSize,
            color: theme.palette.secondary.light,
          }}
        >
          This guide explains the different stages of the HSE Your Service, Your Say complaints policy.
        </Typography>
        <Box
          sx={{
            mt: 4,
            backgroundColor: theme.palette.secondary.lightest,
            borderRadius: theme.borderRadius.sm,
            border: 'none',
            width: '100%',
            height: 'auto',
            display: 'flex',
            gap: 2,
            flexDirection: isMobile ? 'column' : 'row'
          }}
        >
          <Box
            sx={{
              height: '100%',
              borderRight: 'none',
              py: 3, pl: 4, pr: 2,
              display: 'flex',
              flexDirection: 'column',
              gap: 4,
              backgroundColor: theme.palette.primary.lightest,
              width: isMobile ? '100%' : '40%',
              borderTopLeftRadius: theme.borderRadius.sm,
              borderBottomLeftRadius: theme.borderRadius.sm,
            }}
          >
            <Box
              sx={{
                display: 'flex',
                gap: 4,
                alignItems: 'center',
              }}
            >
              <Box
                sx={{
                  width: '50px',
                  height: '50px',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: theme.palette.primary.main,
                  borderRadius: theme.borderRadius.full
                }}
              >
                <Typography variant="labelsm" color='white'>
                  {1}
                </Typography>
              </Box>
              <Typography variant="labelsm"
                sx={{
                  color: currentStep === 1 ? theme.palette.primary.main : 'black',
                  '&:hover': {
                    color: theme.palette.primary.main
                  },
                  cursor: 'pointer'
                }}
                onClick={()=>setCurrentStep(1)}
              >
                {'Informal Complaint (step 1)'}
              </Typography>
            </Box>
            <Box
              sx={{
                display: 'flex',
                gap: 4,
                alignItems: 'center',
              }}
            >
              <Box
                sx={{
                  width: '50px',
                  height: '50px',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: theme.palette.primary.main,
                  borderRadius: theme.borderRadius.full
                }}
              >
                <Typography variant="labelsm" color='white'>
                  {2}
                </Typography>
              </Box>
              <Typography variant="labelsm"
                sx={{
                  color: currentStep === 2 ? theme.palette.primary.main : 'black',
                  '&:hover': {
                    color: theme.palette.primary.main
                  },
                  cursor: 'pointer'
                }}
                onClick={()=>setCurrentStep(2)}
              >
                {'Formal Complaint (step 2)'}
              </Typography>
            </Box>
            <Box
              sx={{
                display: 'flex',
                gap: 4,
                alignItems: 'center',
              }}
            >
              <Box
                sx={{
                  width: '50px',
                  height: '50px',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: theme.palette.primary.main,
                  borderRadius: theme.borderRadius.full
                }}
              >
                <Typography variant="labelsm" color='white'>
                  {3}
                </Typography>
              </Box>
              <Typography variant="labelsm"
                sx={{
                  color: currentStep === 3 ? theme.palette.primary.main : 'black',
                  '&:hover': {
                    color: theme.palette.primary.main
                  },
                  cursor: 'pointer'
                }}
                onClick={()=>setCurrentStep(3)}
              >
                {'What to Include in your Complaint (step 3)'}
              </Typography>
            </Box>
            <Box
              sx={{
                display: 'flex',
                gap: 4,
                alignItems: 'center',
              }}
            >
              <Box
                sx={{
                  width: '50px',
                  height: '50px',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: theme.palette.primary.main,
                  borderRadius: theme.borderRadius.full
                }}
              >
                <Typography variant="labelsm" color='white'>
                  {4}
                </Typography>
              </Box>
              <Typography variant="labelsm"
                sx={{
                  color: currentStep === 4 ? theme.palette.primary.main : 'black',
                  '&:hover': {
                    color: theme.palette.primary.main
                  },
                  cursor: 'pointer'
                }}
                onClick={()=>setCurrentStep(4)}
              >
                {'Submit your complaint online or email to advocacy@patient.ng'}
              </Typography>
            </Box>
            <Box
              sx={{
                display: 'flex',
                gap: 4,
                alignItems: 'center',
              }}
            >
              <Box
                sx={{
                  width: '50px',
                  height: '50px',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: theme.palette.primary.main,
                  borderRadius: theme.borderRadius.full
                }}
              >
                <Typography variant="labelsm" color='white'>
                  {5}
                </Typography>
              </Box>
              <Typography variant="labelsm"
                sx={{
                  color: currentStep === 5 ? theme.palette.primary.main : 'black',
                  '&:hover': {
                    color: theme.palette.primary.main
                  },
                  cursor: 'pointer'
                }}
                onClick={()=>setCurrentStep(5)}
              >
                {'Request the HSE to review the complaint'}
              </Typography>
            </Box>
          </Box>
          <Box
            sx={{
              width: isMobile ? '100%' : '60%',
              display: 'flex',
              px: 5, py: 4, gap: 3,
              flexDirection: 'column'
            }}
          >
            <Typography variant={isMobile ? 'h5' : 'h4'}>
              {currentStep === 1 
                ? 'Informal Complaint (step 1)'
                : currentStep === 2
                  ? 'Formal Complaint (step 2)'
                  : currentStep === 3
                    ? 'What to Include in your Complaint (step 3)'
                    : currentStep === 4
                      ? 'Submit your complaint online (step 4)'
                      : 'Request the HSE to review the complaint (step 5)'
              }
            </Typography>
            {currentStep === 3 && (<ul
              style={{
                listStyleType: 'disc',
                margin: '20px',
                padding: '20px'
              }}
            >
              <li>Your name</li>
              <li>Phone number</li>
              <li>Email address</li>
              <li>Name of the hospital</li>
              <li>Name of the section in the hospital</li>
              <li>Who was involved, dates and times of the experience</li>
              <li>An accurate description of what happened.</li>
              <li>Your complaint should also outline what you have done to resolve the issue to date</li>
              <li>and what you want to happen now to resolve your issue.</li>
              <li>You can also attach any documentation to your complaint that you feel is relevant, through the online form or email.</li>
              <li>In your written complaint, you should grant permission to patient.ng to access your personal confidential information.</li>
              <li>If you don’t grant patient.ng permission to access your personal confidential information, we may not be able to effectively process your complaint.</li>
            </ul>)}
            <Typography variant="paragraphsm">
              {currentStep === 1
                ? `If you are unhappy with the patient care received in a healthcare institution, you can raise issue by making a verbal complaint
                with any member of staff at the reception. This issue might be resolved without needing to make a formal, written complaint.`
                : currentStep === 2
                  ? ` If you are unhappy with the response you received after raising the issue with the reception at the healthcare institution, you can
                        make a written complaint to the healthcare institution through patient.ng. You can do this by writing an email or filling out the complaints form on the
                        patient.ng website here.`
                  : currentStep === 3
                    ? ``
                    : currentStep === 4
                      ? `Submit your complaint online or email to advocacy@patient.ng`
                      : ` If you are unhappy with the response you receive from a healthcare institution after Step 3, you can consider asking our advocates at patient.ng to
                      review your complaint even further.
                      To proceed, you should reply to patient.ng within 30 days of the initial response. Your email response should begin with`

              }
            </Typography>
            {currentStep === 5 && (
              <Typography variant="paragraphsm" fontStyle={'italic'}>
                {`I am unhappy with the response I have received to my complaint/unhappy with how my complaint has been handled by the healthcare institution and
                      request that a patient.ng advocate undertakes an independent case review of the complaint.`}
              </Typography>
            )}
            {currentStep === 2 && (<Box display={'flex'} flexDirection={'column'}>
              <Typography variant="labelsm" mb={2}>
                Timeframe
              </Typography>
              <Typography variant="paragraphsm">
                <CheckCircle sx={{color: theme.palette.primary.main}}/> receive acknowledgement within 5 working days
              </Typography>
              <Typography variant="paragraphsm">
                <CheckCircle sx={{color: theme.palette.primary.main}}/> receive response to the complaint within 30 working days
              </Typography>
            </Box>)}
            {/* {currentStep === 3 && (<Box display={'flex'} flexDirection={'column'}>
              <Typography variant="paragraphsm">
                <CheckCircle sx={{color: theme.palette.primary.main}}/> Name and address of the hospital
              </Typography>
              <Typography variant="paragraphsm">
                <CheckCircle sx={{color: theme.palette.primary.main}}/> Your complaint should also outline what you have done to resolve the issue to date, and what you want to happen now to resolve your issue.
              </Typography>
              <Typography variant="paragraphsm">
                <CheckCircle sx={{color: theme.palette.primary.main}}/> You can also attach any documentation to your complaint  that you feel is relevant.
              </Typography>
              <Typography variant="paragraphsm">
                <CheckCircle sx={{color: theme.palette.primary.main}}/> In your complaint you should grant permission to the iPatient to access your personal confidential information.
              </Typography>
              <Typography variant="paragraphsm">
                If you don’t grant iPatient permission to access your personal confidential information, they may not be able to effectively process your complaint.
              </Typography>
            </Box>)} */}
            {/* {currentStep === 4 && (<Box display={'flex'} flexDirection={'column'}>
              <Typography variant="paragraphsm">
                <CheckCircle sx={{color: theme.palette.primary.main}}/> Your name, phone number, email address, name of the hospital, name of the section in the hospital, who was involved, dates and times of the experience, an accurate description of what happened.
              </Typography>
              <Typography variant="paragraphsm">
                <CheckCircle sx={{color: theme.palette.primary.main}}/> Email iPatient: You can also send your email to the iPatient complaints inbox
              </Typography>
              <Typography variant="paragraphsm">
                <CheckCircle sx={{color: theme.palette.primary.main}}/> Online: You can just submit your complaint online by filling out the form below
              </Typography>
              <Typography variant="paragraphsm">
                If you don’t grant the HSE permission to access your personal confidential information, they may not be able to effectively process your complaint.
              </Typography>
            </Box>)} */}
            {currentStep === 5 && (<Box display={'flex'} flexDirection={'column'}>
              <Typography variant="labelsm" mb={2}>
                Timeframe
              </Typography>
              <Typography variant="paragraphsm">
                <CheckCircle sx={{color: theme.palette.primary.main}}/> Respond to patient.ng within 30 working days of the initial response
              </Typography>
              <Typography variant="paragraphsm">
                <CheckCircle sx={{color: theme.palette.primary.main}}/> Patient.ng will then have 20 working days to review the complaint in case you are eligible for compensation.
              </Typography>
            </Box>)}
          </Box>
        </Box>
      </Box>

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: 'auto',
          px: isMobile ? '20px' : '90px', py: 8,
          backgroundColor: 'none'
        }}
      >
        {!isMobile && (<img
          src='/advocacy-img2.png'
          alt="advocacy image"
          style={{
            width: '100%',
            height: '40em',
            borderRadius: theme.borderRadius.lg
          }}
        />)}
        <Box
          sx={{
            backgroundColor: 'white',
            height: 'auto',
            width: isMobile? '100%' : '45%',
            mx: isMobile ? 0 : 4,
            mt: isMobile ? 0 : 4,
            borderRadius: theme.borderRadius.sm,
            display: 'flex',
            flexDirection: 'column',
            p: 3, 
            position: isMobile ? 'unset' : 'absolute'
          }}
        >
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <Typography
              sx={{
                fontSize: theme.typography.h5.fontSize,
                fontWeight: theme.typography.h5.fontWeight
              }}
            >
              We are happy to help
            </Typography>
            <Typography
              sx={{
                fontSize: isMobile ? theme.typography.labelxs.fontSize : theme.typography.labelsm.fontSize,
                color: theme.palette.secondary.light, my: 2
              }}
            >
              If you need assistance making a complaint about an experience you had in a Public Acute Hospital.
            </Typography>
            <InputField
              label="Hospital Name"
              placeholder="Hospital name"
              isBorder={true}
              labelStyle={{
                fontSize: theme.typography.labelxs.fontSize,
                fontWeight: theme.typography.labelsm.fontWeight
              }}
              errorMessage={errors.nameOfHospital?.message}
              error={!!errors.nameOfHospital}
              register={register('nameOfHospital')}
            />
            <InputField
              label="Address"
              placeholder="Hospital address"
              isBorder={true}
              labelStyle={{
                fontSize: theme.typography.labelxs.fontSize,
                fontWeight: theme.typography.labelsm.fontWeight
              }}
              errorMessage={errors.addressOfHospital?.message}
              error={!!errors.addressOfHospital}
              register={register('addressOfHospital')}
            />
            <InputField
              label="Complaints"
              placeholder="Your complain"
              isBorder={true}
              labelStyle={{
                fontSize: theme.typography.labelxs.fontSize,
                fontWeight: theme.typography.labelsm.fontWeight
              }}
              errorMessage={errors.complaints?.message}
              error={!!errors.complaints}
              register={register('complaints')}
              multiline={true}
              rows={10}
            />
            <PButton transBg={false} bg={true} width="100%" type="submit">
              {createComplainMutation.isLoading ? 'Sending...' : 'Send your complaints'}
            </PButton>
          </form>
        </Box>
      </Box>

      <Box
        sx={{
          pb: '4em',
          px: isMobile ? '20px' : '90px',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 2,
            py: 6,
            px: 2,
            backgroundColor: theme.palette.primary.darker,
            borderRadius: theme.borderRadius.md
          }}
        >
          <Typography variant={isMobile ? "h5" : "h4"} color={'white'}>
            {/* {session?.user ? 'Not an advocate? Become an advocate today' : 'Sign up as an advocate today'} */}
            Interested in becoming a patient advocate?
          </Typography>
          <Typography variant="paragraphbase" mb={4} color={'white'}>
            {/* Just {session?.user ? 'one click' : 'a few clicks'} can make a difference. {session?.user && 'Sign up now'}. */}
            Join our community today
          </Typography>
          <NButton
            bkgcolor={theme.palette.primary.main}
            textcolor="white"
            width='200px'
            onClick={() => session?.user ? null : router.push('/signup')}
          >
            {/* {session?.user ? 'Continue' : 'Sign up'} */}
            Sign up
          </NButton>
        </Box>
      </Box>

      <Toastify
        open={open}
        onClose={() => setOpen(false)}
        message={message}
        error={isError}
        success={isSuccess}
      />
      <Footer/>
    </>
  )
}
