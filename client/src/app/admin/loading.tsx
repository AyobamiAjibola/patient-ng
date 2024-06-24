'use client';
import { Backdrop, useTheme } from "@mui/material";
import PuffLoader from "react-spinners/PuffLoader";

export default function Loading() {
  const theme = useTheme();

  return (
    <div>
        <Backdrop
          open={true}
          sx={{
            display: 'flex',
            minHeight: '100vh',
            width: '100%',
            position: 'absolute',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <PuffLoader color={theme.palette.primary.main} size={100} />
        </Backdrop>
    </div>
  )
}