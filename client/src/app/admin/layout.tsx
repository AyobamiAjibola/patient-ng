'use client';

import { sessionErrorModal, sessionErrorMsg, setDrawerOpen, setOpenSignInModal } from "@/lib/atoms";
import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import { useAtom } from "jotai";
import DrawerComponent from "./components/Drawer";
import { signOut, useSession } from "next-auth/react";
import { useEffect } from "react";
import { redirect, useRouter } from "next/navigation";
import MModal from "../components/Modal";
import Image from "next/image";
import { NButton } from "../components/PButton";

export default function page({children}: any) {
  const [open, setOpen] = useAtom(setDrawerOpen);
  const theme = useTheme();
  const isMobile = useMediaQuery('(max-width: 900px)');
  const [_, setOpenModal] = useAtom(setOpenSignInModal);
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      redirect('/');
    },
  });
  const [sessionErrorModalOpen, setSessionErrorModalOpen] = useAtom(sessionErrorModal)
  const router = useRouter();
  const [sessionError, setSessionError] = useAtom(sessionErrorMsg)

  const toggleDrawer = () => {
    setOpen(!open);
  };

  useEffect(() => {
    if(session?.user.isAdmin === false) {
      redirect('/');
    }
  },[session]);

  useEffect(() => {
    if(sessionError !== '') {
      setSessionErrorModalOpen(true)
    }
  },[sessionError]);

  return (
    <Box display={'flex'} position={'relative'}>
      <DrawerComponent
        open={open}
        drawerClose={toggleDrawer}
      />
      <Box
        sx={{
          width: '100%'
        }}
      >
        <Box
          sx={{
            minHeight: '100vh',
            backgroundColor: theme.palette.secondary.lightest
          }}
        >
          {children}
        </Box>
      </Box>

      <MModal
        onClose={() => setSessionErrorModalOpen(false)}
        open={sessionErrorModalOpen}
        width={isMobile ? '95%' : '30%'}
        showCloseIcon={false}
        onClickOut={false}
        height='260px'
      >
        <Box className="flex flex-col justify-center items-center"
          sx={{
            height: 'auto',
            bgcolor: theme.palette.secondary.lightest,
            overflow: 'scroll', 
            p: 3
          }}
        >
          <Image
            src="/logo.png"
            alt="logo"
            width={60}
            height={60}
          />
          <Typography variant='h5' mt={4}>
            Your session has expired
          </Typography>
          <Typography variant='paragraphsm' color={theme.palette.secondary.light} mb={3}
            sx={{textAlign: 'center'}}
          >
            Please log in to continue.
          </Typography>
          
          <Box mt={4} width='100%' display={'flex'} justifyContent={'center'} alignItems={'center'}>
            <NButton
              textcolor='white'
              bkgcolor={theme.palette.primary.main}
              width='70%'
              onClick={() => {
                setSessionError('')
                setSessionErrorModalOpen(false)
                setOpenModal(true)
                signOut({
                  redirect: true,
                  callbackUrl:`${process.env.NEXT_PUBLIC_CLIENT_URL}/signin`
                })
                router.push(`${process.env.NEXT_PUBLIC_CLIENT_URL}/signin`)
              }}
            >
              Sign in
            </NButton>
          </Box>
        </Box>
      </MModal>
    </Box>
  )
}
