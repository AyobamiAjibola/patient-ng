'use client';

import { setDrawerOpen } from "@/lib/atoms";
import { Box, useTheme } from "@mui/material";
import { useAtom } from "jotai";
import DrawerComponent from "./components/Drawer";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { redirect, useRouter } from "next/navigation";

export default function page({children}: any) {
  const [open, setOpen] = useAtom(setDrawerOpen);
  const theme = useTheme();
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      redirect('/');
    },
  });
  const router = useRouter();

  const toggleDrawer = () => {
    setOpen(!open);
  };

  useEffect(() => {
    if(session?.user.isAdmin === false) {
      router.push('/')
    }
  },[session]);

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
    </Box>
  )
}
