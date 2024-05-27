'use client';

import { setDrawerOpen } from "@/lib/atoms";
import { Box, useTheme } from "@mui/material";
import { useAtom } from "jotai";
import DrawerComponent from "./components/Drawer";

export default function page({children}: any) {
  const [open, setOpen] = useAtom(setDrawerOpen);
  const theme = useTheme();

  const toggleDrawer = () => {
    setOpen(!open);
  };

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
