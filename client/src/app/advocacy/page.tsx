'use client';

import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import Navbar from "../components/Navbar";
import PButton from "../components/PButton";
import { ArrowDownward, ChatBubbleOutline } from "@mui/icons-material";
import Footer from "@/modules/client/components/Footer";
import InputField from "../components/InputField";
import { useForm } from "react-hook-form";

const advocacy = [
  "Informal Complaint (Stage 1)",
  "Formal Complaint (Stage 2)",
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

  const onSubmit = async (data: FormValues) => {
    const payload = {
      ...data
    }
    console.log(payload, 'data')
  }

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      nameOfHospital: '',
      addressOfHospital: '',
      complaints: ''
    },
  });

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
          <PButton transBg={false} bg={true} width="300px">
            How to make complaints <ArrowDownward sx={{fontSize: '16px'}}/>
          </PButton>
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
                iPatient's advocacy helped me get the right diagnosis and treatment, and I feel empowered!
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
            backgroundColor: '#FFF7D9',
            borderRadius: theme.borderRadius.sm,
            border: `1px solid #CCA200`,
            width: '100%',
            height: 'auto',
            display: 'flex',
            gap: 2
          }}
        >
          <Box
            sx={{
              height: '100%',
              borderRight: `1px solid #CCA200`,
              py: 3, pl: 4, pr: 2,
              display: 'flex',
              flexDirection: 'column',
              gap: 4,
              backgroundColor: '#F5E8B7',
              width: isMobile ? '100%' : '40%',
              borderTopLeftRadius: theme.borderRadius.sm,
              borderBottomLeftRadius: theme.borderRadius.sm,
            }}
          >
            {
              advocacy.map((item, index) => (
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
                      backgroundColor: '#FFCB00',
                      borderRadius: theme.borderRadius.full
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: theme.typography.labelsm.fontSize,
                        fontWeight: theme.typography.labelsm.fontWeight
                      }}
                    >
                      {index + 1}
                    </Typography>
                  </Box>
                  <Typography
                    sx={{
                      fontSize: theme.typography.labelsm.fontSize,
                      fontWeight: theme.typography.labelsm.fontWeight
                    }}
                  >
                    {item}
                  </Typography>
                </Box>
              ))
            }
          </Box>
          {!isMobile && (<Box
            sx={{
              width: '60%',
              display: 'flex',
              px: 5, py: 4, gap: 3,
              flexDirection: 'column'
            }}
          >
            <Typography
              sx={{
                fontSize: theme.typography.h3.fontSize,
                fontWeight: theme.typography.h5.fontWeight
              }}
            >
              Informal Complaint (Stage 1)
            </Typography>
            <Typography
              sx={{
                fontSize: theme.typography.labelsm.fontSize
              }}
            >
              If you are unhappy with the response you receive after raising the issue, you can make a written complaint. You can do this by  filling out the online complaints form on the  website here.
            </Typography>
          </Box>)}
        </Box>
      </Box>

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: 'auto',
          px: isMobile ? '20px' : '90px', py: 8,
          backgroundColor: '#FFF7D9'
        }}
      >
        {!isMobile && (<img
          src='/advocacy-img2.png'
          alt="advocacy image"
          style={{
            width: '100%',
            height: '550px',
            borderRadius: theme.borderRadius.lg
          }}
        />)}
        <Box
          sx={{
            backgroundColor: 'white',
            height: '500px',
            width: isMobile? '100%' : '30%',
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
              label="First Name"
              placeholder="First name"
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
              label="First Name"
              placeholder="First name"
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
              label="First Name"
              placeholder="First name"
              isBorder={true}
              labelStyle={{
                fontSize: theme.typography.labelxs.fontSize,
                fontWeight: theme.typography.labelsm.fontWeight
              }}
              errorMessage={errors.complaints?.message}
              error={!!errors.complaints}
              register={register('complaints')}
              multiline={true}
              rows={6}
            />
            <PButton transBg={false} bg={true} width="100%">
              Send your complaints
            </PButton>
          </form>
        </Box>
      </Box>

      <Footer/>
    </>
  )
}
