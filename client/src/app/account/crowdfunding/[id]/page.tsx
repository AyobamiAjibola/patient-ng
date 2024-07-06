'use client';

import { useUpdateCrowdfunding } from "@/app/admin/hooks/crowdFuncdingHook/useCrowdFunding";
import { useGetSingleCrowdfunding } from "@/app/admin/hooks/crowdFuncdingHook/useCrowdFunding";
import ImagePreviewSingle from "@/app/components/ImagePreviewSingle";
import ImageUploader from "@/app/components/ImageUploader";
import InputField from "@/app/components/InputField";
import { NButton } from "@/app/components/PButton";
import Toastify from "@/app/components/ToastifySnack";
import { selectedImageArrayAtom, setMenuIndex } from "@/lib/atoms";
import { formAmount } from "@/lib/helper";
import { Box, LinearProgress, Typography, linearProgressClasses, styled, useMediaQuery, useTheme } from "@mui/material";
import { useAtom } from "jotai";
import { useEffect, useState } from "react";

export default function page({ params }: any) {
    const theme = useTheme();
    const [_, setCurrentIndex] = useAtom(setMenuIndex);
    const isMobile = useMediaQuery('(max-width: 900px)');
    const [address, setAddress] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [amountNeeded, setAmountNeeded] = useState<string>('');
    const [amountRaised, setAmountRaised] = useState<string>('');
    const [campaignImage, setCampaignImage] = useState<string>('');
    const [donations, setDonations] = useState<number>(0);
    const [title, setTitle] = useState<string>('');
    const [location, setLocation] = useState<any>({
        state: '',
        lga: ''
    });
    const getSingleCampaign = useGetSingleCrowdfunding();
    const updateCrowdMutation = useUpdateCrowdfunding();
    const [crowdImage, __] = useAtom(selectedImageArrayAtom);
    const [isEdit, setIsEdit] = useState<boolean>(false);
    const percent = (+amountRaised/+amountNeeded) * 100;

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

  const fetchSingleCampaign = async () => {
    await getSingleCampaign.mutateAsync(params.id, {
        onSuccess: (response: any) => {
            setTitle(response.result.title)
            setAddress(response.result.address)
            setDescription(response.result.description)
            setAmountNeeded(response.result.amountNeeded)
            setAmountRaised(response.result.amountRaised)
            setCampaignImage(response.result.image)
            setDonations(response.result.donations.length)
            setLocation(response.result.location)
        }
    })
  }

  const handleUpdateCrowd = async () => {
    const payload = {
        title,
        amountNeeded,
        description,
        address,
        image: crowdImage[0],
        crowdFundingId: params.id
    }
    await updateCrowdMutation.mutateAsync(payload, {
        onSuccess: async (response) => {
            await fetchSingleCampaign()
            handleOpenNotification('success', "Successfully updated.")
            setIsEdit(false)
        },
        onError: (error: any) => {
            const errorMessage = error.response?.data?.message || 'An unexpected error occurred';
            handleOpenNotification('error', '', errorMessage)
        }
    })
  }

  useEffect(() => {
    fetchSingleCampaign()
  },[params])

  useEffect(() => {
    setCurrentIndex(1)
  },[]);

  const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
    height: 7,
    borderRadius: 5,
    [`&.${linearProgressClasses.colorPrimary}`]: {
      backgroundColor: theme.palette.secondary.lighter
    },
    [`& .${linearProgressClasses.bar}`]: {
      borderRadius: 5,
      backgroundColor: theme.palette.primary.main
    },
  }));

  return (
    <Box
        sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 3
        }}
    >
        {!isEdit && (
            <Box mb={6}>
                <NButton onClick={() => setIsEdit(true)}
                    bkgcolor={theme.palette.primary.main}
                    textcolor="white"
                    width="200px"
                >
                    Edit info
                </NButton>
                <Box
                    sx={{
                        display: 'flex',
                        width: '100%',
                        height: '500px',
                        flexDirection: 'column',
                        border: `1px solid ${theme.palette.secondary.lighter}`,
                        borderRadius: theme.borderRadius.sm,
                        mt: 2, mb: 4
                    }}
                >
                    <img
                        src={campaignImage ? `${process.env.NEXT_PUBLIC_SERVER_URL}/${campaignImage}` : "/crowd1.png"}
                        alt="campaign image"
                        style={{
                            width: '100%',
                            height: '80%',
                            borderTopLeftRadius: theme.borderRadius.sm,
                            borderTopRightRadius: theme.borderRadius.sm
                        }}
                        crossOrigin="anonymous"
                    />

                    <Box
                        sx={{
                            flex: 1,
                            width: '100%',
                            height: 'auto',
                            flexDirection: 'column',
                            border: `1px solid ${theme.palette.secondary.lighter}`,
                            borderBottomRightRadius: theme.borderRadius.sm,
                            borderBottomLeftRadius: theme.borderRadius.sm,
                            backgroundColor: theme.palette.secondary.lightest,
                            p: 4
                        }}
                    >
                        <Typography className="capitalize"
                            sx={{
                                fontSize: theme.typography.labelsm.fontSize,
                                mb: 3
                            }}
                        >
                        {`${location.lga}, ${location.state}`}
                        </Typography>
                        <Box
                            sx={{
                                display: 'flex',
                                gap: 1, alignItems: 'center'
                            }}
                        >
                            <Typography
                                sx={{
                                    fontSize: theme.typography.labelsm.fontSize,
                                    fontWeight: theme.typography.labelsm.fontWeight
                                }}
                            >
                                {formAmount(+amountRaised)}
                            </Typography>
                            <Typography
                                sx={{
                                    fontSize: theme.typography.labelxs.fontSize,
                                    color: theme.palette.secondary.light
                                }}
                            >
                                of {formAmount(+amountNeeded)} goal
                            </Typography>
                        </Box>
                        <BorderLinearProgress variant="determinate" value={percent} sx={{my: 2}}/>
                        <Typography
                            sx={{
                                fontSize: theme.typography.labelxs.fontSize,
                                color: theme.palette.secondary.light
                            }}
                        >
                            {donations} donations
                        </Typography>
                    </Box>
                </Box>
            </Box>
        )}
        
        {isEdit && (
        <>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column'
                }}
            >
                <Typography variant="h4" mb={2}>
                    Edit details.
                </Typography>
                <Box
                    sx={{
                        borderRadius: theme.borderRadius.sm,
                        border: `2px dashed ${theme.palette.border.main}`,
                        p: 3
                    }}
                >
                    {crowdImage.length === 0 
                        ? (<ImageUploader
                            label={''}
                            showImageName={true}
                            allowMultiple={false}
                        />
                        ) : (
                            <ImagePreviewSingle image={crowdImage[0]} height="400px"/>
                        )}
                </Box>
            </Box>
            <Box mb={6}>
                <Box width={'100%'} gap={3} display={'flex'}>
                    <Box
                        sx={{
                            width: isMobile ? '100%' : '50%'
                        }}
                    >
                        <InputField
                            label="Title"
                            placeholder="Enter title"
                            onChange={(e) => {
                                setTitle(e.target.value)
                            }}
                            isBorder={true}
                            labelStyle={{
                                fontSize: theme.typography.labelbase.fontSize,
                                fontWeight: 500
                            }}
                            value={title}
                        />
                    </Box>
                    <Box
                        sx={{
                            width: isMobile ? '100%' : '50%'
                        }}
                    >
                        <InputField
                            label="Amount needed"
                            placeholder="Enter amount needed"
                            onChange={(e) => {
                                setAmountNeeded(e.target.value)
                            }}
                            isBorder={true}
                            labelStyle={{
                                fontSize: theme.typography.labelbase.fontSize,
                                fontWeight: 500
                            }}
                            value={amountNeeded}
                        />
                    </Box>
                </Box>

                <Box width={'100%'} gap={3} display={'flex'}>
                    <Box
                        sx={{
                            width: isMobile ? '100%' : '50%'
                        }}
                    >
                        <InputField
                            label="Description"
                            placeholder="Enter description"
                            onChange={(e) => {
                                setDescription(e.target.value)
                            }}
                            isBorder={true}
                            labelStyle={{
                                fontSize: theme.typography.labelbase.fontSize,
                                fontWeight: 500
                            }}
                            value={description}
                        />
                    </Box>
                    <Box
                        sx={{
                            width: isMobile ? '100%' : '50%'
                        }}
                    >
                        <InputField
                            label="Address"
                            placeholder="Enter address"
                            onChange={(e) => {
                                setAddress(e.target.value)
                            }}
                            isBorder={true}
                            labelStyle={{
                                fontSize: theme.typography.labelbase.fontSize,
                                fontWeight: 500
                            }}
                            multiline={true}
                            rows={4}
                            value={address}
                        />
                    </Box>
                </Box>

                <NButton
                    onClick={handleUpdateCrowd}
                    bkgcolor={theme.palette.primary.main}
                    textcolor="white"
                    width='100%'
                >
                    {updateCrowdMutation.isLoading ? 'Submitting...' : 'Submit'}
                </NButton>
            </Box>
        </>)}

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
