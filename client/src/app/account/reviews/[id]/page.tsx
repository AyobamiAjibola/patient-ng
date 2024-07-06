'use client';

import { useGetSingleInsight, useUpdateInsight } from '@/app/admin/hooks/insightHook/useInsight';
import InputField from '@/app/components/InputField';
import PButton, { NButton } from '@/app/components/PButton';
import Toastify from '@/app/components/ToastifySnack';
import { customStyles } from '@/constant/customStyles';
import { setMenuIndex } from '@/lib/atoms';
import { Box, Typography, useMediaQuery, useTheme } from '@mui/material';
import { useAtom } from 'jotai';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import Select from "react-select";

interface IProps {
    reviews: string;
    hospital: string;
    rating: number;
}

export default function page({ params }: any) {
  const isMobile = useMediaQuery('(max-width: 900px)');
  const [_, setCurrentIndex] = useAtom(setMenuIndex);
  const theme = useTheme();
  const [data, setData] = useState<IProps>({
    reviews: '',
    hospital: '',
    rating: 0
  });
  const {data: session} = useSession();
  const getInsightMutation = useGetSingleInsight();
  const updateInsightMutation = useUpdateInsight();

  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);

  const handleOpenNotification = (type: 'success' | 'error', successMsg?: string, errorMsg?: string) => {
    setMessage(type === 'success' ? successMsg || 'Operation was successful!' : errorMsg || 'There was an error!');
    setIsError(type === 'error');
    setIsSuccess(type === 'success');
    setOpen(true);
  };

  useEffect(() => {
    setCurrentIndex(2)
  },[]);

  const handleUpdateInsight = async () => {
    await updateInsightMutation.mutateAsync({
        hospitalName: data.hospital,
        rating: data.rating,
        comment: data.reviews,
        insightId: params.id
    }, {
        onSuccess: async () => {
            await handleGetInsight()
        },
        onError: (error: any) => {
            const errorMessage = error.response?.data?.message || 'An unexpected error occurred';
            handleOpenNotification('error', '', errorMessage)
        }
    })
  }

  const handleGetInsight = async () => {
    await getInsightMutation.mutateAsync(params.id, {
        onSuccess: (response: any) => {
            setData({
                hospital: response.result.hospitalName,
                reviews: response.result.comment,
                rating: response.result.rating,
            })
        }
    })
  }

  useEffect(() => {
    if(params) {
        handleGetInsight()
    }
  },[params, session]);

  return (
    <Box
        sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 3
        }}
    >
        <Box
            sx={{
                display: 'flex',
                flexDirection: isMobile ? 'column' : 'row',
                width: '100%', gap: 4
            }}
        >
            <Box
                sx={{
                    width: isMobile ? '100%' : '50%'
                }}
            >
                <InputField
                    label="Hospital Name"
                    placeholder="Hospital name"
                    isBorder={true}
                    labelStyle={{
                        fontSize: theme.typography.labelsm.fontSize,
                        fontWeight: theme.typography.labelsm.fontWeight
                    }}
                    onChange={(e) => setData({...data, hospital: e.target.value})}
                    value={data.hospital}
                />
            </Box>
            <Box
                sx={{
                    width: isMobile ? '100%' : '50%',
                    display: 'flex',
                    flexDirection: 'column'
                }}
            >
                <Typography
                    sx={{
                        fontSize: theme.typography.labelxs.fontSize,
                        fontWeight: theme.typography.labelxs.fontWeight,
                        mb: '7px'
                    }}
                >
                    Rating
                </Typography>
                <Select
                    className="w-full h-10 font-light"
                    options={[
                        {value: 1, label: 1},
                        {value: 2, label: 2},
                        {value: 3, label: 3},
                        {value: 4, label: 4},
                        {value: 5, label: 5}
                    ]}
                    styles={customStyles}
                    placeholder="Choose bank"
                    name="bank"
                    onChange={(item) => {
                        setData({...data, rating: item?.value as number })
                    }}
                    value={{
                        value: data.rating,
                        label: data.rating
                    }}
                />
            </Box>
        </Box>

        <Box
            sx={{
                width: '100%'
            }}
        >
            <InputField
                label="Hospital review"
                placeholder="Hospital review"
                multiline={true}
                isBorder={true}
                labelStyle={{
                    fontSize: theme.typography.labelsm.fontSize,
                    fontWeight: theme.typography.labelsm.fontWeight
                }}
                rows={6}
                onChange={(e) => setData({...data, reviews: e.target.value})}
                value={data.reviews}
            />
        </Box>

        <NButton onClick={handleUpdateInsight}
            bkgcolor={theme.palette.primary.main}
            textcolor='white'
            hovercolor={theme.palette.primary.main}
            width='20%'
        >
            {updateInsightMutation.isLoading ? 'Saving...' : 'Save'}
        </NButton>

        <Toastify
            open={open}
            onClose={() => setOpen(false)}
            message={message}
            error={isError}
            success={isSuccess}
        />
    </Box>
  )
}
