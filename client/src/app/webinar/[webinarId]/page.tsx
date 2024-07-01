'use client';

import { useCreateWebinarWaitlist } from "@/app/admin/hooks/webinarHook/useWebinar";
import { useGetSingleWebinar } from "@/app/admin/hooks/webinarHook/useWebinar";
import InputField from "@/app/components/InputField";
import MModal from "@/app/components/Modal";
import Navbar from "@/app/components/Navbar";
import PButton, { NButton } from "@/app/components/PButton";
import PodcastEmbed from "@/app/components/PodcastEmbed";
import Toastify from "@/app/components/ToastifySnack";
import { getFirstLetters } from "@/lib/helper";
import { Close } from "@mui/icons-material";
import { Avatar, Box, IconButton, Typography, useMediaQuery, useTheme } from "@mui/material";
import capitalize from 'capitalize'
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

const speakers = [
  {
    name: "abayomi olowu",
    designation: "ceo"
  },
  {
    name: "Adekunle Taiwp",
    designation: "UX Designer @ Microsoft"
  }
]

export default function Webinar({ params }: any) {
  const isMobile = useMediaQuery('(max-width: 959px)');
  const theme = useTheme();
  const {status: authStatus, data: session} = useSession();
  const getWebinarMutation = useGetSingleWebinar();
  const [webinar, setWebinar] = useState<any>({});
  const waitlistMutation = useCreateWebinarWaitlist();
  const [phone, setPhone] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [firstName, setFirstName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [open, setOpen] = useState<boolean>(false);

  const [message, setMessage] = useState<string>('');
  const [isError, setIsError] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);

  const handleOpenNotification = (type: 'success' | 'error', successMsg?: string, errorMsg?: string) => {
    setMessage(type === 'success' ? successMsg || 'Operation was successful!' : errorMsg || 'There was an error!');
    setIsError(type === 'error');
    setIsSuccess(type === 'success');
    setSnackbarOpen(true);
  };


  const getWebinar = async () => {
    await getWebinarMutation.mutateAsync(params.webinarId, {
      onSuccess: (response: any) => {
        setWebinar(response.result)
      }
    })
  }

  const handleWaitlist = async () => {
    const regex = /^\d+$/;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if(!regex.test(phone)) {
      handleOpenNotification('error', '', 'Phone number should only contain numbers.')
      return;
    }
    if(!emailRegex.test(email)) {
      handleOpenNotification('error', '', 'Invalid email address.')
      return;
    }
    const payload = {
      firstName,
      lastName,
      phone,
      email
    }

    await waitlistMutation.mutateAsync(payload, {
      onSuccess: async () => {
        await getWebinar()
        setLastName('')
        setFirstName('')
        setEmail('')
        setPhone('')
        handleOpenNotification('success', 'Successfully added to the waitlist.')
      },
      onError: (error: any) => {
        const errorMessage = error.response?.data?.message || 'An unexpected error occurred';
        handleOpenNotification('error', '', errorMessage)
      }
    })
  }

  useEffect(() => {
    getWebinar()
  },[session, params]);

  return (
    <>
      <Navbar/>
      <Box
        sx={{
          display: 'flex',
          gap: 4, py: 10, px: isMobile ? '20px' : '90px'
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            width: '60%'
          }}
        >
          <Typography
            sx={{
              width: '63px',
              height: 'auto',
              px: 1,
              backgroundColor: theme.palette.background.main,
              color: 'white',
              fontSize: theme.typography.labelxs,
              borderRadius: theme.borderRadius.xs,
              mb: 3
            }}
          >
            WEBINAR
          </Typography>
          <Typography
            sx={{
              fontSize: theme.typography.h3.fontSize,
              fontWeight: theme.typography.h3.fontWeight,
              lineHeight: theme.typography.h3.lineHeight
            }}
          >
            {webinar.title}
          </Typography>
          <Typography
            sx={{
              fontSize: theme.typography.labelsm.fontSize,
              color: theme.palette.secondary.light,
              mt: 7
            }}
          >
            {webinar.summary}
          </Typography>
          <Box
            sx={{
              width: '250px',
              height: 'auto',
              px: 2, py: 4,
              backgroundColor: theme.palette.secondary.lightest,
              border: `1px solid ${theme.palette.secondary.lighter}`,
              display: 'flex',
              flexDirection: 'column',
              gap: 3, my: 4,
              borderRadius: theme.borderRadius.sm
            }}
          >
            <Typography
              sx={{
                fontSize: theme.typography.labelsm.fontSize,
                fontWeight: theme.typography.labelsm.fontWeight
              }}
            >
              Featured speakers
            </Typography>
            {
              webinar.speakers?.map((speaker: any, index: number) => (
                <Box key={index}
                  sx={{
                    display: 'flex',
                    gap: 1
                  }}
                >
                  <Avatar>
                    {getFirstLetters(speaker.speakerName)}
                  </Avatar>
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column'
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: theme.typography.labelxs.fontSize,
                        fontWeight: theme.typography.labelxs.fontWeight
                      }}
                    >
                      {capitalize.words(speaker.speakerName)}
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: theme.typography.labelxs.fontSize,
                        color: theme.palette.secondary.light
                      }}
                    >
                      {capitalize.words(speaker.occupation)}
                    </Typography>
                  </Box>
                </Box>
              ))
            }
          </Box>
          {authStatus === 'authenticated' ? (
            <NButton 
              width="200px"
              bkgcolor="transparent"
              bordercolor={theme.palette.primary.main}
              hoverbordercolor={theme.palette.primary.main}
              textcolor={theme.palette.primary.main}
              onClick={()=>setOpen(true)}
            >
              Click to watch webinar
            </NButton>
            ) : (<NButton 
                    width="200px"
                    bkgcolor="transparent"
                    bordercolor={theme.palette.primary.main}
                    hoverbordercolor={theme.palette.primary.main}
                    textcolor={theme.palette.primary.main}
                  >
                  Signup for free
                </NButton>
              )
          }
        </Box>
        <Box
          sx={{
            width: '40%',
            height: '400px',
            border: `1px solid ${theme.palette.secondary.lighter}`,
            borderRadius: theme.borderRadius.sm,
            display: 'flex',
            p: 4, justifyContent: 'center', alignItems: 'center',
            flexDirection: 'column'
          }}
        >
          <Typography
            sx={{
              fontSize: theme.typography.h5.fontSize,
              alignSelf: 'center',
              fontWeight: theme.typography.labelsm.fontWeight
            }}
          > 
            Watch On-Demand
          </Typography>
          <Box style={{width: '100%'}}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                gap: 2, mt: 4
              }}
            >
              <Box sx={{width: '50%'}}>
                <InputField
                  label="First name"
                  isBorder={true}
                  onChange={(e)=>setFirstName(e.target.value)}
                  value={firstName}
                />
              </Box>
              <Box sx={{width: '50%'}}>
                <InputField
                  label="Last name"
                  isBorder={true}
                  onChange={(e)=>setLastName(e.target.value)}
                  value={lastName}
                />
              </Box>
            </Box>
            <InputField
              label="Email"
              isBorder={true}
              onChange={(e)=>setEmail(e.target.value)}
              value={email}
            />
            <InputField
              label="Phone number"
              isBorder={true}
              onChange={(e)=>setPhone(e.target.value)}
              value={phone}
            />
            <NButton
              bkgcolor={theme.palette.primary.main}
              textcolor="white"
              width='100%'
              onClick={handleWaitlist}
            >
              {waitlistMutation.isLoading ? 'Loading...' : 'Submit'}
            </NButton>
          </Box>
        </Box>
      </Box>

      <MModal
        onClose={()=>setOpen(false)}
        open={open}
        width={isMobile ? '95%' : '60%'}
        showCloseIcon={false}
        onClickOut={false}
        height='auto'
      >
        <Box
          sx={{
            flex: 1,
            overflow: 'scroll',
            position: 'relative'
          }}
        >
          <PodcastEmbed
            link={webinar.webinarLink}
            height='60vh'
          />
          <IconButton
            onClick={()=>setOpen(false)}
            sx={{
              position: 'absolute',
              top: 2,
              left: '50%',
              bgcolor: 'red',
              '&:hover': {
                bgcolor: 'red',
              }
            }}
          >
            <Close sx={{color: 'white'}}/>
          </IconButton>
        </Box>
      </MModal>

      <Toastify
        open={snackbarOpen}
        onClose={() => setSnackbarOpen(false)}
        message={message}
        error={isError}
        success={isSuccess}
      />
    </>
  )
}
