'use client';

import { Box, Typography } from "@mui/material";
import Uploader from "../components/UploadFiles";

export default function page() {
  return (
    <Box
        sx={{
            display: 'flex',
            flexDirection: 'column',
            pt: '2em',
            px: 4
        }}
    >
        <Typography variant="h5">
            Upload advocacy files
        </Typography>

        <Box>
            <Uploader
                showImageName={true}
                allowMultiple={true}
            />
        </Box>
    </Box>
  )
}
