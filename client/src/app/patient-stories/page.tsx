'use client';

import { Box, Divider, Typography, useMediaQuery, useTheme } from "@mui/material";
import Navbar from "../components/Navbar";
import Image from "next/image";
import { ArrowDownward, ArrowForward, ChatBubbleOutline, HourglassEmpty } from "@mui/icons-material";
import { NButton } from "../components/PButton";
import { characterBreaker } from "@/lib/helper";
import { useRouter } from "next/navigation";
import Footer from "@/app/components/Footer";
import MModal from "../components/Modal";
import InputField from "../components/InputField";
import Toastify from "../components/ToastifySnack";
import { useEffect, useRef, useState } from "react";
import { useFetchStories, usePostStory } from "../admin/hooks/patientStoriesHook/usePatientStories";
import ImagePreviewSingle from "@/app/components/ImagePreviewSingle";
import ImageUploader from "@/app/components/ImageUploader";
import { useAtom } from "jotai";
import { selectedImageArrayAtom } from "@/lib/atoms";
import Pagination from "../components/Pagination";
import { useSession } from "next-auth/react";

export default function PatientStories() {
    const isMobile = useMediaQuery('(max-width: 900px)');
    const theme = useTheme();
    const router = useRouter();
    const [story, setStory] = useState<string>('');
    const [title, setTitle] = useState<string>('');
    const [openModal, setOpenModal] = useState<boolean>(false);
    const postStoryMutation = usePostStory();
    const [campaignImg, setCampaignImg] = useAtom(selectedImageArrayAtom);
    const fetchStoriesMutate = useFetchStories(); 
    const [stories, setStories] = useState<any>([]);
    const storiesRef = useRef<any>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const {data: session} = useSession();

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

    const itemsPerPage = stories.length ? 10 : stories.length;
    const totalPages = Math.ceil(stories.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, stories.length);
    const currentData = stories.slice(startIndex, endIndex);
  
    const handlePageChange = (newPage: any) => {
      setCurrentPage(newPage);
    };

    const handleCloseModal = () => {
        setStory('')
        setTitle('')
        setOpenSnack(false)
    };

    const fetchStories = async () => {
        await fetchStoriesMutate.mutateAsync({}, {
            onSuccess: async(response: any) => {
                const filterData = response.results.filter((story: any) => story.status === 'published');
                setStories(filterData)
            }
        })
    };

    const handleStories = () => {
        if (storiesRef.current) {
          storiesRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const handleSubmitStory = async () => {
        const payload = {
            story,
            title,
            image: campaignImg[0]
        }

        await postStoryMutation.mutateAsync(payload, {
            onSuccess: async () => {
                await fetchStories()
                setOpenModal(false)
                setTitle('')
                setStory('')
                setCampaignImg([])
                // handleOpenNotification('success', response.message)
            },
            onError: (error: any) => {
                const errorMessage = error.response?.data?.message || 'An unexpected error occurred';
                handleOpenNotification('error', '', errorMessage)
            }
        })
    }

    useEffect(() => {
        fetchStories()
    },[session]);

    return (
        <>
            <Navbar/>
            <Box
                sx={{
                    height: 'auto',
                    px: isMobile ? '20px' : '64px', py: isMobile ? 4 : 6,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 8
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 4, width: '100%',
                        height: 'auto',
                        p: 2
                    }}
                >
                    {!isMobile && (<Box
                        sx={{
                            width: '50%',
                            ml: 10
                        }}
                    >
                        <Image
                            src='/model.png'
                            alt='patient story'
                            width={300}
                            height={600}
                            crossOrigin="anonymous"
                            style={{
                                position: 'relative',
                                borderRadius: theme.borderRadius.sm
                            }}
                        />
                        <Box
                            sx={{
                                width: 280,
                                height: 'auto',
                                backgroundColor: 'white',
                                borderRadius: theme.borderRadius.sm,
                                p:4, display: 'flex', gap: 1,
                                position: 'absolute',
                                mt: '-120px', ml: '-30px',
                                boxShadow: 5
                            }}
                        >
                            <ChatBubbleOutline
                                sx={{
                                    color: theme.palette.primary.main
                                }}
                            />
                            <Box
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column'
                                }}
                            >
                                <Typography
                                    sx={{
                                        fontSize: '12px',
                                        alignSelf: 'center'
                                    }}
                                >
                                    A fighter, a survivor, and an inspiration to us all.
                                </Typography>
                                <Typography
                                    sx={{
                                        fontSize: '12px',
                                        alignSelf: 'flex-end',
                                        color: theme.palette.secondary.light
                                    }}
                                >
                                    Sarah Thompson
                                </Typography>
                            </Box>
                        </Box>
                    </Box>)}

                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column'
                        }}
                    >
                        <Typography
                            sx={{
                                fontSize: theme.typography.h3.fontSize,
                                fontWeight: theme.typography.h3.fontWeight,
                                lineHeight: theme.typography.h2.lineHeight
                            }}
                        >
                            Explore inspiring patient stories from our community.
                        </Typography>
                        <Typography
                            sx={{
                                color: theme.palette.secondary.light,
                                mt: 3
                            }}
                        >
                            Read inspiring stories from fellow patients or share your own to inspire others
                        </Typography>
                        <Box
                            sx={{
                                mt: 5,
                                display: 'flex',
                                gap: 4, alignItems: 'center'
                            }}
                        >
                            <NButton
                                width='150px'
                                bkgcolor={theme.palette.primary.main}
                                textcolor="white"
                                onClick={()=>setOpenModal(true)}
                            >
                                {'Share your story'}
                            </NButton>
                            <Box sx={{display: 'flex', gap: 1, alignItems: 'center', cursor: 'pointer'}}
                                onClick={handleStories}
                            >
                                <Typography sx={{color: theme.palette.primary.main, fontSize: '13px'}}>
                                    Read stories
                                </Typography>
                                <ArrowDownward sx={{color: theme.palette.primary.main, fontSize: '13px'}}/>
                            </Box>
                        </Box>
                    </Box>
                </Box>

                <Box ref={storiesRef}
                    sx={{
                        display: 'flex',
                        gap: 3,
                        flexWrap: 'wrap',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}
                >
                    {   currentData.length > 0 
                        ?   (currentData.map((story: any, index: number) => (
                                <Box 
                                    sx={{
                                        display: 'flex', 
                                        flexDirection: 'column',
                                        border: `1px solid ${theme.palette.secondary.lighter}`,
                                        bgcolor: theme.palette.secondary.lightest,
                                        borderRadius: theme.borderRadius.sm,
                                        width: '30%',
                                        height: isMobile ? 450 : 400
                                    }} key={index}
                                >
                                    <img
                                        src={story.image ? `${process.env.NEXT_PUBLIC_SERVER_URL}/${story.image}` : '/p_patient.png'}
                                        alt='story'
                                        style={{
                                            width: '100%',
                                            height: '80%',
                                            borderTopRightRadius: theme.borderRadius.sm
                                        }}
                                        crossOrigin="anonymous"
                                    />
                                    <Typography variant={isMobile ? 'labelsm' : 'labelxs'} px={2} py={2}>
                                        {story.title.length > 45 ? `${characterBreaker(story.title, 45)}...` : story.title}
                                    </Typography>
                                    <Typography variant={isMobile ? 'labelxs' : 'labelxxs'} className="capitalize" px={2} color={theme.palette.secondary.light}>
                                        by {story.user.firstName} {story.user.lastName}
                                    </Typography>
                                    <Typography onClick={() => router.push(`/patient-stories/${story._id}`)} px={2}
                                        variant="paragraphxxs"
                                        sx={{
                                            mb: 1, cursor: 'pointer',
                                            color: theme.palette.primary.main
                                        }}
                                    >
                                        Read story <ArrowForward sx={{fontSize: theme.typography.labelxs.fontSize}}/>
                                    </Typography>
                                </Box>
                            ))
                        ) : (
                            <Box width={'100%'} justifyContent={'center'} alignItems={'center'} display={'flex'} flexDirection={'column'}>
                                <HourglassEmpty sx={{fontSize: '2em', color: theme.palette.border.main}}/>
                                <Typography variant='paragraphlg' color={theme.palette.border.main}>
                                    No Data
                                </Typography>
                            </Box>
                        )
                    }
                </Box>

                <Box
                    sx={{
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        mt: 5
                    }}
                    >
                    {stories.length !== 0 && (<Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={handlePageChange}
                    />)}
                </Box>
            </Box>

            <MModal
                onClose={() => setOpenModal(false)}
                open={openModal}
                width={isMobile ? '80%' : '60%'}
                showCloseIcon={false}
            >
                <Box className="flex flex-col p-3">
                    <Typography variant="h4" mb={3}>
                        Post your story.
                    </Typography>
                    <Divider sx={{mb: 3}}/>
                    <InputField
                        label="Title"
                        type="text"
                        placeholder='Story title...'
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        isBorder={true}
                    />
                    <InputField
                        label="Story"
                        type="text"
                        placeholder='Write your story here...'
                        multiline={true}
                        rows={8}
                        value={story}
                        onChange={(e) => setStory(e.target.value)}
                        isBorder={true}
                    />
                    <Typography variant='labelsm' mt={3} mb={2}>
                        Your story image
                    </Typography>
                    <Box
                        sx={{
                            width: '100%',
                            height: '60%',
                            border: campaignImg.length > 0  ? 'none' : `2px dashed ${theme.palette.secondary.lighter}`,
                            borderRadius: theme.borderRadius.sm,
                            backgroundColor: campaignImg.length > 0  ? 'transparent' : theme.palette.secondary.lightest,
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            flexDirection: 'column',
                            mb: 3
                        }}
                    >
                        {campaignImg.length === 0 
                            ? (<ImageUploader
                                label={''}
                                showImageName={true}
                                allowMultiple={false}
                            />
                            ) : (
                                <ImagePreviewSingle image={campaignImg[0]} />
                            )}
                    </Box>
                    <NButton
                        onClick={handleSubmitStory}
                        bkgcolor={theme.palette.primary.main}
                        textcolor='white'
                        width='20%'
                    >
                        {postStoryMutation.isLoading ? 'Loading...' : 'Save'}
                    </NButton>
                </Box>
            </MModal>

            <Toastify
                open={openSnack}
                onClose={handleCloseModal}
                message={message}
                error={isError}
                success={isSuccess}
            />
            <Footer/>
        </>
    )
}
