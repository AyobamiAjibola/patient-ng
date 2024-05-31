'use client';

import ImageUploader from '@/app/components/ImageUploader';
import InputField from '@/app/components/InputField';
import MModal from '@/app/components/Modal';
import { NButton } from '@/app/components/PButton';
import { selectedImageArrayAtom } from '@/lib/atoms';
import { ArrowBackRounded, ChatBubbleOutlineSharp, DeleteOutlineOutlined, DescriptionOutlined, Favorite, FavoriteBorderOutlined, RemoveRedEyeOutlined, SendOutlined } from '@mui/icons-material';
import { Box, Divider, Typography, useMediaQuery, useTheme } from '@mui/material';
import JoditEditor from 'jodit-react';
import { useAtom } from 'jotai';
import { useRouter } from 'next/navigation';
import { useMemo, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';

type FormValues = {
    title: string;
    permalink: string;
    author: string;
}

export default function page() {
    const theme = useTheme();
    const md = useMediaQuery(theme.breakpoints.down('md'));
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const [campaignImg, _] = useAtom(selectedImageArrayAtom);
    const [link, setLink] = useState("");
    const editor = useRef(null);
    const [content, setContent] = useState("");
    const [openModal, setOpenModal] = useState<boolean>(false);
    const router = useRouter();

    const {
        handleSubmit,
        register,
        formState: { errors },
    } = useForm<FormValues>({
        defaultValues: {
          title: '',
          author: ''
        },
    });

    const getHeight = () => {
        if (typeof window !== 'undefined') {
            return window.innerHeight;
        }
            return 0;
    };
    
    const screenHeight = getHeight();

    const onSubmit = (data: FormValues) => {

        const payload = {
            ...data,
            coverImage: campaignImg,
            permalink: link,
            content
        }

        console.log(payload)
    };

    const config = useMemo(() => ({
        readonly: false,
        height: 400,
        placeholder: 'Start typing...'
    }), []);

    // useEffect(() => {
    //     setLink(`/${restaurantName.replaceAll(/\s+/g, '-').trim().toLowerCase()}`);
    // }, []);

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
                <Typography variant={ md ? "h5" : "h4" }>
                    Edit blog post
                </Typography>
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
                            width: isMobile ? '100%' : '70%'
                        }}
                    >
                        <form onSubmit={handleSubmit(onSubmit)} noValidate>
                            <Box
                                sx={{
                                    width: '100%',
                                    mt: 3
                                }}
                            >
                                <InputField
                                    label="Blog post title"
                                    placeholder="Enter title"
                                    onChange={(e) => 
                                        setLink(`/${e.target.value
                                        .replaceAll(/\s+/g, '-')
                                        .trim()
                                        .toLowerCase()}`
                                    )}
                                    isBorder={true}
                                    labelStyle={{
                                        fontSize: theme.typography.labelbase.fontSize,
                                        fontWeight: 500
                                    }}
                                    errorMessage={errors.title?.message}
                                    error={!!errors.title}
                                    register={register('title')}
                                />
                            </Box>

                            <Box
                                sx={{
                                    display: 'flex',
                                    gap: 1, mt: '-12px'
                                }}
                            >
                                <Typography variant='paragraphsm'
                                    sx={{
                                        color: theme.palette.secondary.light
                                    }}
                                >
                                    Permalink:
                                </Typography>
                                <Typography variant='paragraphsm'
                                    sx={{
                                        color: theme.palette.primary.main
                                    }}
                                >
                                    {process.env.NEXT_PUBLIC_CLIENT_URL}{link}
                                </Typography>
                            </Box>

                            <Box
                                sx={{
                                    width: '100%',
                                    mt: 3
                                }}
                            >
                                <InputField
                                    label="Author"
                                    placeholder="Enter author"
                                    isBorder={true}
                                    labelStyle={{
                                        fontSize: theme.typography.labelbase.fontSize,
                                        fontWeight: 500
                                    }}
                                    errorMessage={errors.author?.message}
                                    error={!!errors.author}
                                    register={register('author')}
                                />
                            </Box>

                            <Box
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    mt: 3
                                }}
                            >
                                <Typography variant='labelbase' mb={2}>
                                    Header image
                                </Typography>
                                <Box
                                    sx={{
                                        width: '100%',
                                        border: `3px dashed ${theme.palette.secondary.lighter}`,
                                        borderRadius: theme.borderRadius.sm,
                                        backgroundColor: "white",
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        flexDirection: 'column'
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

                            <Box mt={4}>
                                <JoditEditor
                                    ref={editor}
                                    value={content}
                                    onChange={(newContent) => {}}
                                    config={config}
                                    onBlur={newContent => setContent(newContent)}
                                />
                            </Box>

                        </form>
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
                                textcolor='black' 
                                bkgcolor='white' 
                                bordercolor={theme.palette.secondary.lighter}
                                width={isMobile ? '100%' : '45%'}
                                hoverbordercolor={theme.palette.border.main}
                                hovercolor={'black'}
                                onClick={() => setOpenModal(true)}
                            >
                                <Typography variant='labelxs'>
                                    <RemoveRedEyeOutlined sx={{fontSize: '14px', mb: '0.5px'}}/> Preview
                                </Typography>
                            </NButton>
                            <NButton 
                                textcolor='black' 
                                bkgcolor='white' 
                                bordercolor={theme.palette.secondary.lighter}
                                width={isMobile ? '100%' : '55%'}
                                hoverbordercolor={theme.palette.border.main}
                                hovercolor={'black'}
                            >
                                <Typography variant='labelxs'>
                                    <DescriptionOutlined sx={{fontSize: '14px', mb: '0.5px'}}/> Save as draft
                                </Typography>
                            </NButton>
                        </Box>
                        <NButton 
                            textcolor='white' 
                            bkgcolor={theme.palette.primary.main}
                            width='100%'
                        >
                            <Typography variant='paragraphxs'>
                                <SendOutlined sx={{fontSize: '14px', mb: '0.5px'}}/> Publish
                            </Typography>
                        </NButton>
                        <NButton 
                            textcolor='red' 
                            bkgcolor={'white'}
                            bordercolor={theme.palette.state.error}
                            width='100%'
                            hoverbordercolor={theme.palette.state.error}
                            hovercolor={theme.palette.state.error}
                        >
                            <Typography variant='paragraphxs'>
                                <DeleteOutlineOutlined sx={{fontSize: '14px', mb: '0.5px'}}/> Archive
                            </Typography>
                        </NButton>
                        <Divider sx={{my: 4}}/>
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: 2
                            }}
                        >
                            <Box
                                sx={{
                                    display: 'flex', gap: 1
                                }}
                            >
                                <RemoveRedEyeOutlined sx={{fontSize: '14px', mb: '0.5px', color: theme.palette.secondary.light}}/>
                                <Typography variant='labelxxs'>
                                    1,200
                                </Typography>
                                <Typography variant='paragraphxxs' color={theme.palette.secondary.light}>
                                    Views
                                </Typography>
                            </Box>
                            <Box
                                sx={{
                                    display: 'flex', gap: 1
                                }}
                            >
                                <FavoriteBorderOutlined sx={{fontSize: '14px', mb: '0.5px', color: theme.palette.secondary.light}}/>
                                <Typography variant='labelxxs'>
                                    250
                                </Typography>
                                <Typography variant='paragraphxxs' color={theme.palette.secondary.light}>
                                    Likes
                                </Typography>
                            </Box>
                            <Box
                                sx={{
                                    display: 'flex', gap: 1
                                }}
                            >
                                <ChatBubbleOutlineSharp sx={{fontSize: '14px', mb: '0.5px', color: theme.palette.secondary.light}}/>
                                <Typography variant='labelxxs'>
                                    37
                                </Typography>
                                <Typography variant='paragraphxxs' color={theme.palette.secondary.light}>
                                    Comments
                                </Typography>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Box>

            <MModal
                onClose={() => setOpenModal(false)}
                open={openModal}
                width={isMobile ? '80%' : '60%'}
            >
                <Box className="flex flex-col p-10"
                    sx={{
                        height: screenHeight/100 * 80
                    }}
                >
                    <Typography variant='h4' mb={2}>
                        Preview
                    </Typography>
                    <Divider sx={{mb: 4}} />
                    <Box
                        sx={{
                            overflow: 'scroll'
                        }}
                        dangerouslySetInnerHTML={{ __html: content }}
                    />
                </Box>
            </MModal>
        </Box>
    )
}
