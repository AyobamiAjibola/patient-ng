'use client';

import { Box, Typography, useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import { useAboutUs, useGetDocs } from "../hooks/userHook/useUser";
import { NButton } from "@/app/components/PButton";
import Toastify from "@/app/components/ToastifySnack";
import MyEditor from "../components/JoditEditor/MyEditor";

export default function page() {
  const [aboutUs, setAboutUs] = useState<string>('');
  const updateConAbtUsMutation = useAboutUs();
  const getDocsMutation = useGetDocs();
  const theme = useTheme();

  const [openSnack, setOpenSnack] = useState(false);
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);

  const handleOpenNotification = (type: 'success' | 'error', successMsg?: string, errorMsg?: string) => {
      setMessage(type === 'success' ? successMsg || 'Operation was successful!' : errorMsg || 'There was an error!');
      setIsError(type === 'error');
      setIsSuccess(type === 'success');
      setOpenSnack(true);
  };


  const handleTC = async () => {
    await updateConAbtUsMutation.mutateAsync({
        aboutUs,
        contactUs: 'contact us'
      }, {
        onSuccess: async () => {
          await handleGetDocs()
        },
        onError: (error: any) => {
          const errorMessage = error.response?.data?.message || 'An unexpected error occurred';
          handleOpenNotification('error', '', errorMessage)
        }
      }
    )
  }

  const handleGetDocs = async () => {
    await getDocsMutation.mutateAsync({}, {
      onSuccess: (response: any) => {
        setAboutUs(response.result.aboutUs)
      }
    })
  }

  useEffect(() => {
    handleGetDocs()
  },[]);

  return (
    <Box display={'flex'} flexDirection={'column'} px={4} pb={6}>
      <Typography variant="h4" mb={3} mt={6}>
        About and Contact Us
      </Typography>
      <Box mt={4} mb={6}>
        <Typography variant="labellg">
          About Us
        </Typography>
        <MyEditor
          content={aboutUs}
          setContent={setAboutUs}
        />

      </Box>

      {/* <Box mt={4} mb={6}>
        <Typography variant="labellg">
          Contact Us
        </Typography>
        <DynamicHeader
          preference={contactUs}
          setPreference={setContactUs}
        />
      </Box> */}

      <NButton
        bkgcolor={theme.palette.primary.main}
        textcolor="white"
        width='200px'
        onClick={handleTC}
      >
        {updateConAbtUsMutation.isLoading ? 'Saving...' : 'Submit'}
      </NButton>

      <Toastify
        open={openSnack}
        onClose={() => setOpenSnack(false)}
        message={message}
        error={isError}
        success={isSuccess}
      />
    </Box>
  )
}
