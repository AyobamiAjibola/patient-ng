'use client';

import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import Navbar from "../components/Navbar";
import PButton, { NButton } from "../components/PButton";
import { ArrowDownward, ChatBubbleOutline, FiberManualRecord } from "@mui/icons-material";
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
          height: '100vh',
          px: isMobile ? '20px' : '90px', pb: 5,
          gap: 4, pt: 8
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            width: isMobile ? '100%' : '60%',
            justifyContent: 'center',
            gap: 4,
            px: 2, 
          }}
        >
          <Typography
            sx={{
              fontSize: theme.typography.h3.fontSize,
              fontWeight: theme.typography.h3.fontWeight,
            }}
          >
            Your trusted partner, advocating for your rights and
            wellbeing.
          </Typography>
          <Typography
            sx={{
              fontSize: theme.typography.labellg.fontSize,
              color: theme.palette.secondary.light
            }}
          >
            Let us guide you through every step of your healthcare journey and help resolve your issue with expertise and compassion.
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
                  onClick={() => router.push('/signup')}
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
            src="/advocacy-img.jpg"
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
                Patient.ng helped me resolve the issue with my dad’s diagnosis and treatment after getting a second opinion. Now we finally feel heard and validated.
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
          px: isMobile ? '20px' : '90px', pb: 5,
          width: '100%'
        }}
      >
        <Typography
          sx={{
            fontSize: isMobile ? theme.typography.h5.fontSize : theme.typography.h3.fontSize,
            fontWeight: theme.typography.h3.fontWeight,
          }}
        >
          Guide to Making a Complaint
        </Typography>
        <Typography
          sx={{
            fontSize: theme.typography.labelsm.fontSize,
            color: theme.palette.secondary.light,
          }}
        >
          This guide details the different steps of the Patient.ng complaints process.
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
                  minWidth: '50px',
                  minHeight: '50px',
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
                {'Informal Complaint'}
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
                  minWidth: '50px',
                  minHeight: '50px',
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
                {'Formal Complaint'}
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
                  minWidth: '50px',
                  minHeight: '50px',
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
                {'What to Include'}
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
                  minWidth: '50px',
                  minHeight: '50px',
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
                Submit your Complaint
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
                  minWidth: '50px',
                  minHeight: '50px',
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
                Request Further Review
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
                ? 'Informal Complaint'
                : currentStep === 2
                  ? 'Formal Complaint'
                  : currentStep === 3
                    ? 'What to Include'
                    : currentStep === 4
                      ? 'Submit your complaint'
                      : 'Request Further Review'
              }
            </Typography>
            {currentStep === 3 && (<ul
              style={{
                margin: '10px',
                padding: '10px'
              }}
            >
              <li className="text-sm"><FiberManualRecord sx={{fontSize: '10px'}}/> Your name, Phone number and Email address.</li>
              <li className="text-sm"><FiberManualRecord sx={{fontSize: '10px'}}/> Name, Address and Department of the hospital.</li>
              <li className="text-sm"><FiberManualRecord sx={{fontSize: '10px'}}/> Who was involved, dates and times of the
              experience.</li>
              <li className="text-sm"><FiberManualRecord sx={{fontSize: '10px'}}/> An accurate description of what happened.</li>
              <li className="text-sm"><FiberManualRecord sx={{fontSize: '10px'}}/> Your complaint should also outline what you
                  have done to resolve the issue to date and what
                  you want to happen now to resolve your issue.</li>
            </ul>)}
            {currentStep === 3 && (
              <Typography variant="paragraphsm" ml={'10px'}>
                {`You can also attach any documentation to your
                  complaint that you feel is relevant, through the
                  online form or via email.`}
              </Typography>
            )}
            {currentStep === 3 && (
              <Typography variant="paragraphsm" ml={'10px'}>
                {`In your written complaint, you should grant
                  permission to patient.ng to access your personal
                  confidential information. If you don’t grant us
                  permission to access your personal confidential
                  information, we may not be able to effectively
                  process or resolve your complaint.`}
              </Typography>
            )}
            <Typography variant="paragraphsm">
              {currentStep === 1
                ? `If you are unhappy with the
                    care you received in a hospital, you can raise your
                    issue by making a verbal complaint with any
                    hospital staff you find.`
                : currentStep === 2
                  ? `If you are still unhappy with
                      the response you received after raising the issue
                      verbally, you can make a written complaint to the
                      hospital through patient.ng for free.`
                  : currentStep === 3
                    ? ``
                    : currentStep === 4
                      ? `You may now proceed to
                          submit your complaint online through the web
                          form or via email complaints@patient.ng`
                      : `If you are still
                          unsatisfied with the response you received from
                          the hospital through our service, you may
                          consider requesting a further review by our
                          professional patient advocates.`

              }
            </Typography>
            {currentStep === 1 && (
              <Typography variant="paragraphsm">
                {`This issue might be resolved without needing to
                  make a formal, written complaint to us at
                  patient.ng.`}
              </Typography>
            )}
            {currentStep === 2 && (
              <Typography variant="paragraphsm">
                {`You can do this by writing an email to us or filling
                  out the complaints form here.`}
              </Typography>
            )}
            {currentStep === 5 && (
              <Typography variant="paragraphsm">
                {`To proceed, you should reply to patient.ng within
                  30 days of the initial hospital response. Your
                  email response should begin with:
                  I am still unsatisfied with the response received
                  from the hospital through patient.ng and request
                  that a professional patient advocate is assigned
                  to undertake an independent case review of my
                  complaint.`}
              </Typography>
            )}
            {currentStep === 2 && (<Box display={'flex'} flexDirection={'column'}>
              <Typography variant="labelsm" mb={2}>
                Timeframe
              </Typography>
              <Typography variant="paragraphsm">
                <FiberManualRecord sx={{fontSize: '10px'}}/> Receive official acknowledgement of your
                complaint within 5 working days.
              </Typography>
              <Typography variant="paragraphsm">
                <FiberManualRecord sx={{fontSize: '10px'}}/> Receive official response to the complaint
                within 30 working days.
              </Typography>
            </Box>)}
            {currentStep === 5 && (<Box display={'flex'} flexDirection={'column'}>
              <Typography variant="labelsm" mb={2}>
                Timeframe
              </Typography>
              <Typography variant="paragraphsm">
                <FiberManualRecord sx={{fontSize: '10px'}}/> Respond to patient.ng via email within 30
                  working days of the initial response received
                  from the hospital.
              </Typography>
              <Typography variant="paragraphsm">
                <FiberManualRecord sx={{fontSize: '10px'}}/> Patient.ng will then have 20 working days
                  to review the complaint, in case you are
                  eligible for proper compensation.
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
              Use this form to make a complaint about a negative
              experience you may have had in a public or private hospital in
              Nigeria.
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
          <Typography variant={isMobile ? "h5" : "h4"} color={'white'} textAlign={'center'}>
            {/* {session?.user ? 'Not an advocate? Become an advocate today' : 'Sign up as an advocate today'} */}
            Want to become a professional patient advocate?
          </Typography>
          <Typography variant="paragraphbase" mb={4} color={'white'}>
            {/* Just {session?.user ? 'one click' : 'a few clicks'} can make a difference. {session?.user && 'Sign up now'}. */}
            You can make a difference. Join us to get started
            today
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
