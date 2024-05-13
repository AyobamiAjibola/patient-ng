'use client';

import { Box } from "@mui/material";
import Navbar from "../components/Navbar";

export default function page() {
  return (
    <>
        <Navbar/>
        <Box
            sx={{
                display: 'flex',
                backgroundColor: '#FFFCF2',
                height: 'auto',
                px: '64px', py: 5
            }}
        >
            advocy
        </Box>
    </>
  )
}
