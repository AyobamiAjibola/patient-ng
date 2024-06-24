'use client';

import ImagePreviewSingle from "@/app/components/ImagePreviewSingle";
import ImageUploader from "@/app/components/ImageUploader";
import InputField from "@/app/components/InputField";
import MModal from "@/app/components/Modal";
import { NButton } from "@/app/components/PButton";
import { selectedImageArrayAtom } from "@/lib/atoms";
import { ArrowBackRounded, DoDisturbAlt, Edit, SendOutlined } from "@mui/icons-material";
import { Avatar, Box, Divider, Typography, useMediaQuery, useTheme } from "@mui/material";
import { Tag } from "antd";
import { useAtom } from "jotai";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDeleteStory, useGetSingleStory, usePublishStory, useRejectStory, useUpdateStory } from "../../hooks/patientStoriesHook/usePatientStories";
import Toastify from "@/app/components/ToastifySnack";

export default function page({params}: any) {
    const theme = useTheme();
    const md = useMediaQuery(theme.breakpoints.down('md'));
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const router = useRouter();
    const [storyImage, _] = useAtom(selectedImageArrayAtom);
    const [openModal, setOpenModal] = useState<boolean>(false);
    const [story, setStory] = useState('');
    const getSingleStoryMuatation = useGetSingleStory();
    const [image, setImage] = useState<string>('');
    const [title, setTitle] = useState<string>('');
    const [status, setStatus] = useState<string>('');
    const updateStoryMutation = useUpdateStory();
    const deleteStoryMutation = useDeleteStory();
    const rejectStoryMutation = useRejectStory();
    const publishStoryMutation = usePublishStory();
    const [storyData, setStoryData] = useState<any>({})

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

    const handleModalClose = () => {
        setOpenSnack(false)
    }

    const handleDeleteStory = async () => {
        await deleteStoryMutation.mutateAsync(params.id, {
            onSuccess: async () => {
                router.back();
                handleOpenNotification('success', 'Successfully deleted story.')
            },
            onError: (error: any) => {
                const errorMessage = error.response?.data?.message || 'An unexpected error occurred';
                handleOpenNotification('error', '', errorMessage)
            }
        })
    }

    const handlePublishStory = async () => {
        await publishStoryMutation.mutateAsync(params.id, {
            onSuccess: async () => {
                await fetchData(params.id)
                handleOpenNotification('success', 'Successfully published story.')
            },
            onError: (error: any) => {
                const errorMessage = error.response?.data?.message || 'An unexpected error occurred';
                handleOpenNotification('error', '', errorMessage)
            }
        })
    }

    const handleRejectStory = async () => {
        await rejectStoryMutation.mutateAsync(params.id, {
            onSuccess: async () => {
                await fetchData(params.id)
                handleOpenNotification('success', 'Successfully rejected story.')
            },
            onError: (error: any) => {
                const errorMessage = error.response?.data?.message || 'An unexpected error occurred';
                handleOpenNotification('error', '', errorMessage)
            }
        })
    }

    const getHeight = () => {
        if (typeof window !== 'undefined') {
            return window.innerHeight;
        }
            return 0;
    };
    
    const screenHeight = getHeight();

    const handleStoryUpdate = async () => {
        const payload = {
            title,
            story,
            image: storyImage,
            storyId: params.id
        }
        await updateStoryMutation.mutateAsync(payload, {
            onSuccess: async () => {
                await fetchData(params.id)
            },
            onError: (error: any) => {
                const errorMessage = error.response?.data?.message || 'An unexpected error occurred';
                handleOpenNotification('error', '', errorMessage)
            }
        })
    }

    const fetchData = async (id: string) => {
        await getSingleStoryMuatation.mutateAsync(id, {
          onSuccess: (response: any) => {
            setTitle(response.result.title)
            setStory(response.result.content)
            setImage(response.result.image)
            setStatus(response.result.status)
            setStoryData({
                email: response.result.user.email,
                userImage: response.result.user.image,
                fullName: `${response.result.user.firstName} ${response.result.user.lastName}`
            })
          }
        })
      }
    
    useEffect(() => {
        fetchData(params.id)
    },[params]);

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                p: 4
            }}
        >
            <Box mb={4}
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-start',
                    alignItems: 'flex-start',
                    gap: 3
                }}
            >
                <Typography variant="labelsm" onClick={() => router.back()}
                    sx={{
                        cursor: 'pointer',
                        '&:hover': {
                            color: theme.palette.primary.main
                        }
                    }}
                >
                    <ArrowBackRounded sx={{fontSize: '16px'}}/> Back
                </Typography>
                <Box
                    sx={{
                        display: 'flex',
                        gap: 2,
                        flexDirection: isMobile ? 'column' : 'row',
                        alignItems: 'center'
                    }}
                >
                    <Typography variant={ md ? "h5" : "h4" }>
                        {title}
                    </Typography>
                    <Tag color={status === "published" 
                        ? "green"
                        : status === "pending"
                          ? "gold"
                          : "red"
                        }
                        className='capitalize'
                    >
                        {status}
                    </Tag>
                </Box>

                <Box
                    sx={{
                        width: '100%',
                        display: 'flex',
                        flexDirection: isMobile ? 'column' : 'row',
                        gap: 4
                    }}
                >
                    
                    <Box
                        sx={{
                            width: isMobile ? '100%' : '70%',
                            p: 3,
                            display: 'flex',
                            flexDirection: 'column',
                            borderRadius: theme.borderRadius.sm,
                            border: `1px solid ${theme.palette.secondary.lightest}`,
                            justifyContent: 'space-between',
                            mt: isMobile ? 1 : '2.8em',
                            gap: 4,
                            bgcolor: 'white'
                        }}
                    >
                        <Box
                            sx={{
                                width: '100%'
                            }}
                        >
                            <InputField
                                label="Story title"
                                value={title}
                                placeholder="Enter story"
                                onChange={(e) => 
                                    setTitle(e.target.value)
                                }
                                isBorder={true}
                            />
                        </Box>
                        <Box
                            sx={{
                                width: '100%'
                            }}
                        >
                            <InputField
                                label="Story"
                                value={story}
                                placeholder="Enter story"
                                onChange={(e) => 
                                    setStory(e.target.value)
                                }
                                isBorder={true}
                                multiline={true}
                                rows={10}
                            />
                        </Box>
                        {image && (<Box width={'100%'}>
                            <img
                                src={`${process.env.NEXT_PUBLIC_SERVER_URL}/${image}`}
                                crossOrigin="anonymous"
                                style={{
                                    width: '100%',
                                    height: '17em'
                                }}
                            />
                        </Box>
                        )}
                        <Box>
                            <Typography variant="paragraphxxs" color={theme.palette.secondary.light}>
                                {image ? 'CHANGE IMAGE' : 'ATTACH IMAGE'}
                            </Typography>
                            <Box
                                sx={{
                                    width: '100%',
                                    border: `2px dashed ${theme.palette.secondary.lighter}`,
                                    borderRadius: theme.borderRadius.sm,
                                    backgroundColor: theme.palette.secondary.lightest,
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    flexDirection: 'column',
                                    py: 2,
                                }}
                            >
                                <ImageUploader
                                    label={''}
                                    showImageName={true}
                                    allowMultiple={false}
                                    showDomiImage={false}
                                    spacebtwimgtypes={-2}
                                    title={false}
                                />
                            </Box>
                        </Box>

                        <Box
                            sx={{
                                width: '100%',
                            }}
                        >
                            <NButton 
                                textcolor='white' 
                                bkgcolor={theme.palette.primary.main}
                                width='100%'
                                onClick={handleStoryUpdate}
                            >
                                {updateStoryMutation.isLoading ? 'Saving...' : 'Save'}
                            </NButton>
                        </Box>
                    </Box>

                    <Box
                        sx={{
                            display: 'flex',
                            bgcolor: 'white',
                            width: isMobile ? '100%' : '30%',
                            borderRadius: theme.borderRadius.sm,
                            border: `1px solid ${theme.palette.border.main}`,
                            p: 3, flexDirection: 'column',
                            gap: 2,
                            height: isMobile ? '320px' : '270px',
                            mt: isMobile ? 1 : '2.8em'
                        }}
                    >
                        <Box
                            sx={{
                                display: 'flex',
                                gap: 2, width: '100%',
                                flexDirection: isMobile ? 'column' : 'row'
                            }}
                        >
                            <NButton 
                                textcolor={status === 'rejected' ? theme.palette.secondary.light : theme.palette.state.error} 
                                bkgcolor={status === 'rejected' ? theme.palette.border.main : 'white'}
                                bordercolor={status === 'rejected' ? theme.palette.border.main : theme.palette.state.error}
                                width={isMobile ? '100%' : '45%'}
                                hoverbordercolor={theme.palette.state.error}
                                hovercolor={theme.palette.state.error}
                                onClick={handleRejectStory}
                                disabled={status === 'rejected'}
                            >
                                <Typography variant='labelxs'>
                                    <DoDisturbAlt sx={{fontSize: '14px', mb: '0.5px'}}/> {rejectStoryMutation.isLoading ? 'Rejecting...' : 'Reject'}
                                </Typography>
                            </NButton>
                            <NButton 
                                textcolor='white' 
                                bkgcolor={theme.palette.state.error}
                                width={isMobile ? '100%' : '55%'}
                                hoverbordercolor={theme.palette.state.error}
                                onClick={()=>setOpenModal(true)}
                                hovercolor="red"
                            >
                                <DoDisturbAlt sx={{fontSize: '14px', mb: '0.5px'}}/> Delete
                            </NButton>
                        </Box>

                        <NButton 
                            textcolor={status === 'published' ? theme.palette.secondary.light : 'white' }
                            bkgcolor={status === 'published' ? theme.palette.border.main : theme.palette.primary.main}
                            width='100%'
                            onClick={handlePublishStory}
                            disabled={status === 'published'}
                        >
                            <Typography variant='paragraphxs'>
                                <SendOutlined sx={{fontSize: '14px', mb: '0.5px'}}/> {publishStoryMutation.isLoading ? 'Publishing...' : 'Publish'}
                            </Typography>
                        </NButton>
                        <Divider sx={{my: 4}}/>
                        <Typography variant="paragraphxxs" color={theme.palette.secondary.light}>
                            SUBMITTED BY
                        </Typography>
                        <Box
                            sx={{
                                display: 'flex',
                                gap: 2
                            }}
                        >
                            <Avatar
                                src={storyData.userImage ? `${process.env.NEXT_PUBLIC_SERVER_URL}/${storyData.userImage}` : '/logo.png'}
                                alt='user'
                                sx={{
                                    width: 40,
                                    height: 40
                                }}
                            />
                            <Box
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column'
                                }}
                            >
                                <Typography variant="labelxs" className="capitalize">
                                    {storyData.fullName}
                                </Typography>
                                <Typography variant="paragraphxs" color={theme.palette.secondary.light}>
                                    {storyData.email}
                                </Typography>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Box>

            <MModal
                onClose={() => setOpenModal(false)}
                open={openModal}
                width={isMobile ? '90%' : '40%'}
                height={'120px'}
                showCloseIcon={false}
            >
                <Box className="flex flex-col"
                    sx={{
                        height: screenHeight/100 * 80
                    }}
                >
                    <Typography variant="h6" my={3} sx={{textAlign: 'center'}}>
                        Are you sure you want to delete the story?
                    </Typography>
                    <Box display={'flex'} gap={3} justifyContent={'center'} alignItems={'center'} mb={3}>
                        <NButton
                            bkgcolor={theme.palette.primary.main}
                            textcolor="white"
                            onClick={handleDeleteStory}
                        >
                            {deleteStoryMutation.isLoading ? 'Deleting...' : 'Yes'}
                        </NButton>
                        <NButton
                            bkgcolor="red"
                            textcolor="white"
                            hoverbordercolor="red"
                            hovercolor="red"
                            onClick={()=>setOpenModal(false)}
                        >
                            Cancel
                        </NButton>
                    </Box>
                </Box>
            </MModal>

            <Toastify
                open={openSnack}
                onClose={handleModalClose}
                message={message}
                error={isError}
                success={isSuccess}
            />
        </Box>
    )
}
