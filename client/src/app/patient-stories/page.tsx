'use client';

import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import Navbar from "../components/Navbar";
import Image from "next/image";
import { ArrowDownward, ArrowForward, ChatBubbleOutline } from "@mui/icons-material";
import PButton from "../components/PButton";
import { characterBreaker } from "@/lib/helper";
import { useRouter } from "next/navigation";
import Footer from "@/app/components/Footer";

const patientStories = [
    {
        image: '/p_patient.png',
        title: 'A fighter, a survivor, and an inspiration to us all',
        publisher: 'Pariolodo James'
    },
    {
        image: '/p_patient.png',
        title: 'A fighter, a survivor, and an inspiration to us all',
        publisher: 'Pariolodo James'
    },
    {
        image: '/p_patient.png',
        title: 'A fighter, a survivor, and an inspiration to us all',
        publisher: 'Pariolodo James'
    },
    {
        image: '/p_patient.png',
        title: 'A fighter, a survivor, and an inspiration to us all',
        publisher: 'Pariolodo James'
    },
    {
        image: '/p_patient.png',
        title: 'A fighter, a survivor, and an inspiration to us all',
        publisher: 'Pariolodo James'
    },
    {
        image: '/p_patient.png',
        title: 'A fighter, a survivor, and an inspiration to us all',
        publisher: 'Pariolodo James'
    },
    {
        image: '/p_patient.png',
        title: 'A fighter, a survivor, and an inspiration to us all',
        publisher: 'Pariolodo James'
    },
    {
        image: '/p_patient.png',
        title: 'A fighter, a survivor, and an inspiration to us all',
        publisher: 'Pariolodo James'
    }
]

export default function PatientStories() {
    const isMobile = useMediaQuery('(max-width: 900px)');
    const theme = useTheme();
    const router = useRouter();

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
                        <PButton bg={true} width='150px' transBg={false}>
                            {'Share your story'}
                        </PButton>
                        <Box sx={{display: 'flex', gap: 1, alignItems: 'center', cursor: 'pointer'}}>
                            <Typography sx={{color: theme.palette.primary.main, fontSize: '13px'}}>
                                Read stories
                            </Typography>
                            <ArrowDownward sx={{color: theme.palette.primary.main, fontSize: '13px'}}/>
                        </Box>
                    </Box>
                </Box>
            </Box>

            <Box
                sx={{
                    display: 'flex',
                    gap: 4,
                    flexWrap: 'wrap',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}
            >
                {
                    patientStories.map((story: any, index: number) => (
                        <Box sx={{display: 'flex', flexDirection: 'column'}} key={index}>
                            <img
                                src={story.image}
                                alt='story'
                                style={{
                                    width: isMobile ? '100%' : 250,
                                    height: isMobile ? 450 : 400
                                }}
                                crossOrigin="anonymous"
                            />
                            <Typography variant={isMobile ? 'labelsm' : 'labelxs'}>
                                {`${characterBreaker(story.title, 45)}...`}
                            </Typography>
                            <Typography variant={isMobile ? 'labelsm' : 'labelxs'}>
                                by {story.publisher}
                            </Typography>
                            <Typography onClick={() => router.push(`/patient-stories/1`)}
                                variant="paragraphxs"
                                sx={{
                                    mt: 2, cursor: 'pointer',
                                    color: theme.palette.primary.main
                                }}
                            >
                                Read story <ArrowForward sx={{fontSize: theme.typography.labelxs.fontSize}}/>
                            </Typography>
                        </Box>
                    ))
                }
            </Box>
        </Box>

        <Footer/>
    </>
  )
}
