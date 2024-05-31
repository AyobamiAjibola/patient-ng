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

export default function page({params}: any) {
    const theme = useTheme();
    const md = useMediaQuery(theme.breakpoints.down('md'));
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const router = useRouter();
    const [storyImage, _] = useAtom(selectedImageArrayAtom);
    const [openModal, setOpenModal] = useState<boolean>(false);
    const [story, setStory] = useState('');
    const [isDisabled, setIsDisabled] = useState<boolean>(true);

    const getHeight = () => {
        if (typeof window !== 'undefined') {
            return window.innerHeight;
        }
            return 0;
    };
    
    const screenHeight = getHeight();

    useEffect(() => {
        setStory('Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus praesentium possimus suscipit tempore dicta perspiciatis corrupti soluta fugit porro, expedita quod impedit animi eos earum quam? Nisi reprehenderit recusandae ad?')
    },[]);

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
                        A fighter, a survivor, and an inspiration to us all
                    </Typography>
                    <Tag
                        style={{
                            color: theme.palette.state.warning,
                            width: '9em'
                        }}
                    >
                        Pending review
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
                            border: `1px solid ${theme.palette.border.main}`,
                            justifyContent: 'space-between',
                            mt: isMobile ? 1 : '2.8em',
                            gap: 4,
                            bgcolor: 'white'
                        }}
                    >
                        <Box
                            sx={{
                                width: '100%',
                                bgcolor: theme.palette.secondary.lightest
                            }}
                        >
                            <InputField
                                label=""
                                value={story}
                                placeholder="Enter story"
                                onChange={(e) => 
                                    setStory(e.target.value)
                                }
                                showBorder={false}
                                bgcolor={false}
                                multiline={true}
                                rows={10}
                                disabled={isDisabled}
                            />
                        </Box>
                        <Box>
                            <Typography variant="paragraphxxs" color={theme.palette.secondary.light}>
                                ATTACH IMAGE
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
                                {storyImage.length !== 0 && (<Typography variant="labelxs" color={theme.palette.primary.main}
                                    onClick={() => setOpenModal(true)}
                                    sx={{
                                        cursor: 'pointer',
                                        mt: -2
                                    }}
                                >
                                    View Image
                                </Typography>)}
                            </Box>
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
                                width: '100%',
                            }}
                        >
                            <NButton 
                                textcolor='black' 
                                bkgcolor='white' 
                                bordercolor={theme.palette.secondary.lighter}
                                width='100%'
                                hoverbordercolor={theme.palette.border.main}
                                hovercolor={'black'}
                                onClick={() => setIsDisabled(false)}
                            >
                                <Typography variant='labelxs'>
                                    <Edit sx={{fontSize: '14px', mb: '0.5px'}}/> Edit
                                </Typography>
                            </NButton>
                        </Box>

                        <Box
                            sx={{
                                display: 'flex',
                                gap: 2, width: '100%',
                                flexDirection: isMobile ? 'column' : 'row'
                            }}
                        >
                            <NButton 
                                textcolor={theme.palette.state.error} 
                                bkgcolor='white' 
                                bordercolor={theme.palette.state.error}
                                width={isMobile ? '100%' : '45%'}
                                hoverbordercolor={theme.palette.state.error}
                                hovercolor={theme.palette.state.error}
                                // onClick={() => setOpenModal(true)}
                            >
                                <Typography variant='labelxs'>
                                    <DoDisturbAlt sx={{fontSize: '14px', mb: '0.5px'}}/> Reject
                                </Typography>
                            </NButton>
                            <NButton 
                                textcolor='white' 
                                bkgcolor={theme.palette.state.error}
                                // bordercolor={theme.palette.secondary.lighter}
                                width={isMobile ? '100%' : '55%'}
                                hoverbordercolor={theme.palette.state.error}
                            >
                                <Typography variant='labelxs'>
                                    <DoDisturbAlt sx={{fontSize: '14px', mb: '0.5px'}}/> Delete
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
                                src='/model.png'
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
                                <Typography variant="labelxs">
                                    Lisa Steve
                                </Typography>
                                <Typography variant="paragraphxs" color={theme.palette.secondary.light}>
                                    lisa@gmail.com
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
            >
                <Box className="flex flex-col"
                    sx={{
                        height: screenHeight/100 * 80
                    }}
                >
                    <ImagePreviewSingle
                        image={storyImage[0]}
                        showButton={false}
                    />
                </Box>
            </MModal>
        </Box>
    )
}
