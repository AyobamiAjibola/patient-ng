'use client';

import { Box, Typography, useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import dynamic from 'next/dynamic';
import { useGetDocs, useUpdateTC } from "../hooks/userHook/useUser";
import { NButton } from "@/app/components/PButton";
import Toastify from "@/app/components/ToastifySnack";
 
const DynamicHeader = dynamic(() => import('../components/TextEditor'), {
  ssr: false,
})

export default function page() {
  const [content, setContent] = useState<string>('');
  const updateTCMutation = useUpdateTC();
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
    await updateTCMutation.mutateAsync({
      content
    }, {
      onSuccess: async () => {
        await handleGetDocs()
      }
    })
  }

  const handleGetDocs = async () => {
    await getDocsMutation.mutateAsync({}, {
      onSuccess: (response: any) => {
        setContent(response.result.termsAndCondition.content)
      },
      onError: (error: any) => {
        const errorMessage = error.response?.data?.message || 'An unexpected error occurred';
        handleOpenNotification('error', '', errorMessage)
      }
    })
  }

  useEffect(() => {
    handleGetDocs()
  },[]);

  return (
    <>
      <Box display={'flex'} flexDirection={'column'} px={4}>
        <Typography variant="h4" mb={3} mt={6}>
          Terms and Condition
        </Typography>
        <Box mt={4} mb={6}>
          <DynamicHeader
            preference={content}
            setPreference={setContent}
          />
        </Box>


        <NButton
          bkgcolor={theme.palette.primary.main}
          textcolor="white"
          width='200px'
          onClick={handleTC}
        >
          {updateTCMutation.isLoading ? 'Saving...' : 'Submit'}
        </NButton>
      </Box>

      <Toastify
        open={openSnack}
        onClose={() => setOpenSnack(false)}
        message={message}
        error={isError}
        success={isSuccess}
      />
    </>
  )
}
