'use client';

import { Box, Divider, Typography, useMediaQuery, useTheme } from "@mui/material";
import Image from "next/image";
import InputField from "../components/InputField";
import { useEffect, useState } from "react";
import { NButton } from "../components/PButton";
import { signIn, useSession } from "next-auth/react";
import Toastify from "../components/ToastifySnack";
import { useRouter } from "next/navigation";

export default function page() {
  const theme = useTheme();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const {data: session, status: authStatus} = useSession();
  const [isLoggedAsAdmin, setIsLoggedAsAdmin] = useState<boolean>(false);
  const router = useRouter();
  const isMobile = useMediaQuery('(max-width: 900px)');

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

  const handleSignIn = async () => {
    if(authStatus === 'authenticated') {
      router.push('/')
      return;
    }
    setIsLoading(true);
    const response = await signIn('credentials', {
      email,
      password,
      redirect: false,
    });

    if(response) {
      if (response.ok === true) {
        setIsLoggedAsAdmin(true);
      } else if(response.ok === false) {
        setIsLoading(false);
        handleOpenNotification('error', '', response.error as string)
      }
    }
  };

  useEffect(() => {
    if(isLoggedAsAdmin && session?.user?.isAdmin) {
      router.push('/admin');
    } else if(isLoggedAsAdmin && !session?.user?.isAdmin) {
      router.push('/');
    }

    return () => {
      setIsLoggedAsAdmin(false);
    }
  },[isLoggedAsAdmin, session]);

  return (
    <Box 
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        bgcolor: theme.palette.secondary.lightest
      }}
    >
      <Box className="flex flex-col justify-center items-center"
        sx={{
          height: 'auto',
          overflow: 'scroll', 
          p: 4,
          width: isMobile ? '90%' : '40%',
          borderRadius: theme.borderRadius.sm,
          bgcolor: 'white',
          boxShadow: 2
        }}
      >
        <Image
          src="/logo.png"
          alt="logo"
          width={60}
          height={60}
        />
        <Typography variant='h5' mt={2}>
          Welcome back
        </Typography>
        <Typography variant='paragraphsm' color={theme.palette.secondary.light} mb={3}>
          Please enter your details to login.
        </Typography>
        <Box width={'100%'} mt={2}>
          <InputField
            label="Email address"
            placeholder="Enter email"
            isBorder={true}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            labelStyle={{
              fontWeight: 500,
              marginBottom: -2,
              fontSize: theme.typography.labelsm
            }}
          />
        </Box>
        <Box width={'100%'}>
          <InputField
            label="Password"
            placeholder="Enter password"
            isBorder={true}
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            labelStyle={{
              fontWeight: 500,
              marginBottom: -2,
              fontSize: theme.typography.labelsm
            }}
          />
        </Box>
        <Box
          sx={{
            display: 'flex',
            width: '100%',
            justifyContent: 'flex-start',
            mt: -3, mb: 3
          }}
        >
          <Typography variant='paragraphxs'
            onClick={()=>router.push('/forgotpassword')}
            sx={{
              color: theme.palette.primary.main,
              '&:hover': {
                fontWeight: 500
              },
              cursor: 'pointer'
            }}
          >
            Forgot password?
          </Typography>
        </Box>
        <NButton
          textcolor='white'
          bkgcolor={theme.palette.primary.main}
          width='100%'
          onClick={handleSignIn}
        >
          {isLoading ? "Logging you in..." : "Sign in" }
        </NButton>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            my: 3, width: '100%',
            justifyContent: 'space-between'
          }}
        >
          <Divider sx={{width: '45%'}}/>
          <Typography variant='paragraphsm' color={theme.palette.secondary.light}>
            OR
          </Typography>
          <Divider sx={{width: '45%'}}/>
        </Box>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 2, width: '100%'
          }}
        >
          <NButton
            textcolor='black'
            bkgcolor='white'
            bordercolor={theme.palette.border.main}
            hoverbordercolor={theme.palette.primary.main}
            width={'100%'}
          >
            <img
              src="/googleLogo.png"
              alt="google logo"
              style={{
                width: '20px',
                height: '20px'
              }}
            />
            <Typography variant='labelxs' ml={2}>
              Sign in with Google
            </Typography>
          </NButton>
          {/* <NButton
            textcolor='white'
            bkgcolor='black'
            bordercolor={'black'}
            hoverbordercolor={'black'}
            width={'50%'}
          >
            <img
              src="/appleLogo.png"
              alt="apple logo"
              style={{
                width: '20px',
                height: '20px'
              }}
            />
            <Typography variant='labelxs' ml={2}>
              Sign in with Apple
            </Typography>
          </NButton> */}
        </Box>

        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1, width: '100%',
            justifyContent: 'center',
            mt: 2
          }}
        >
          <Typography variant='paragraphxs' color={theme.palette.secondary.light}>
            Don't have an account?
          </Typography>
          <Typography variant='labelxs'
            onClick={() => router.push('/signup')}
            sx={{
              cursor: 'pointer',
              '&:hover': {
                color: theme.palette.primary.main
              }
            }}
          >
            Register
          </Typography>
        </Box>
      </Box>

      <Toastify
        open={snackbarOpen}
        onClose={() => setSnackbarOpen(false)}
        message={message}
        error={isError}
        success={isSuccess}
      />
    </Box>
  )
}
