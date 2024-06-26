'use client';

import { useGetUserCrowdfundings, useSoftDeleteCrowdfunding } from "@/app/admin/hooks/crowdFuncdingHook/useCrowdFunding";
import MModal from "@/app/components/Modal";
import { NButton } from "@/app/components/PButton";
import PTable from "@/app/components/Table";
import Toastify from "@/app/components/ToastifySnack";
import { setFundraisingId, setMenuIndex } from "@/lib/atoms";
import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import { useAtom } from "jotai";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function Crowdfunding() {
  const [_, setCurrentIndex] = useAtom(setMenuIndex);
  const userCrowdFundingMutation = useGetUserCrowdfundings();
  const {data: session} = useSession();
  const [crowsFunding, setCrowdFunding] = useState<any>([]);
  const deleteMutation = useSoftDeleteCrowdfunding();
  const [open, setOpen] = useState<boolean>(false);
  const theme = useTheme();
  const isMobile = useMediaQuery('(max-width: 900px)');
  const [crowdId, setCrowdId] = useAtom(setFundraisingId);

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

  const handleDelete = async () => {
    await deleteMutation.mutateAsync(crowdId, {
      onSuccess: async () => {
        await handleFetch()
        handleOpenNotification('success', 'Successfully deleted campaign.')
        setOpen(false)
        setCrowdId('')
      },
      onError: (error: any) => {
        const errorMessage = error.response?.data?.message || 'An unexpected error occurred';
        handleOpenNotification('error', '', errorMessage)
      }
    })
  }

  const handleFetch = async () => {
    await userCrowdFundingMutation.mutateAsync({}, {
      onSuccess: (response: any) => {
        const filtered = response.results.filter((res: any) => res.status !== "deleted")
        setCrowdFunding(filtered)
      }
    });
  }

  useEffect(() => {
    handleFetch()
  },[session])

  useEffect(() => {
    setCurrentIndex(1)
  },[]);

  return (
    <Box
      sx={{
        width: '100%'
      }}
    >
      <PTable
        //@ts-ignore
        data={crowsFunding}
        open={open}
        setOpen={setOpen}
      />

      <MModal
        onClose={() => {
          setCrowdId('')
          setOpen(false)}
        }
        open={open}
        width={isMobile ? '95%' : '30%'}
        showCloseIcon={false}
        onClickOut={false}
        height='120px'
      >
        <Box className="flex flex-col justify-center items-center"
          sx={{
            height: 'auto',
            bgcolor: theme.palette.secondary.lightest,
            overflow: 'scroll', 
            p: 3
          }}
        >
          <Typography variant='h6' mb={3} sx={{textAlign: 'center'}}>
            Are you sure you want to delete this campaign?.
          </Typography>
          <Box display={'flex'} justifyContent={'center'} alignItems={'center'} gap={3}>
            <NButton
              bkgcolor={theme.palette.primary.main}
              textcolor='white'
              onClick={handleDelete}
            >
              {deleteMutation.isLoading ? 'Deleting...' : 'Yes'}
            </NButton>
            <NButton
              bkgcolor={'red'}
              textcolor='white'
              hoverbordercolor='red'
              hovercolor='red'
              onClick={() => {
                setCrowdId('')
                setOpen(false)}
              }
            >
              Cancel
            </NButton>
          </Box>
        </Box>
      </MModal>

      <Toastify
        open={openSnack}
        onClose={()=> setOpen(false)}
        message={message}
        error={isError}
        success={isSuccess}
      />
    </Box>
  )
}
