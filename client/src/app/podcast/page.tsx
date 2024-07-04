'use client';

import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import Navbar from "../components/Navbar";
import PButton, { NButton } from "../components/PButton";
import Image from "next/image";
import { useEffect, useState } from "react";
import { wordBreaker } from "@/lib/helper";
import { ArrowRight } from "@mui/icons-material";
import Pagination from "../components/Pagination";
import { useRouter } from "next/navigation";
import Footer from "@/app/components/Footer";
import { useGetPodcastCategories, useGetPodcasts } from "../admin/hooks/podcastHook/usePodcast";
import moment from "moment";
import { useSession } from "next-auth/react";

const channels = [
    '/apple-pod.png',
    '/spotify-pod.png',
    '/google-pod.png',
    '/soundcloud-pod.png',
    '/youtube-pod.png'
  ]

  const podIcons = [
    '/icon1.png',
    '/icon2.png',
    '/icon3.png',
    '/icon4.png'
  ]

export default function Podcasts() {
    const theme = useTheme();
    const isMobile = useMediaQuery('(max-width: 900px)');
    const [value, setValue] = useState<string>('All');
    const [selectedIndex, setSelectedIndex] = useState<number>(0);
    const [currentPage, setCurrentPage] = useState(1);
    const router = useRouter();
    const podcastCategoryMutation = useGetPodcastCategories();
    const fetchPodcastsMutation = useGetPodcasts(); 
    const [podcasts, setPodcasts] = useState<any>([]);
    const [podcastCategories, setPodcastCategories] = useState<any>([]);
    const {status: authStatus} = useSession();

    const filteredData = podcasts.filter((item: any) => {
        if(value === 'All') {
            return item;
        }
        return item.category.toLowerCase().includes(value.toLowerCase())
    });

    const itemsPerPage = filteredData.length === podcasts.length ? 10 : filteredData.length;

    const totalPages = Math.ceil(filteredData.length / itemsPerPage);

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, filteredData.length);
    const currentData = filteredData.slice(startIndex, endIndex);

    const handlePageChange = (newPage: any) => {
        setCurrentPage(newPage);
    };

    const handleFetchPodcasts = async () => {
        await fetchPodcastsMutation.mutateAsync({}, {
            onSuccess: (response: any) => {
                setPodcasts(response.results)
            }
        })
    }

    const handlePodCategory = async () => {
        await podcastCategoryMutation.mutateAsync({}, {
            onSuccess: (response: any) => {
                setPodcastCategories(response.results)
            }
        })
    }

    useEffect(() => {
        handleFetchPodcasts()
        handlePodCategory()
    },[]);

    return (
        <>
            <Navbar/>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    py: 6, width: '100%'
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        px: isMobile ? '20px' : '90px'
                    }}
                >
                    <Typography
                        sx={{
                            fontSize: theme.typography.h2.fontSize,
                            fontWeight: theme.typography.h2.fontWeight
                        }}
                    >
                        Find and Listen in your
                    </Typography>
                    <Box
                        sx={{
                            display: 'flex',
                            gap: 1, mt: -2,
                            alignItems: 'center'
                        }}
                    >
                        <Typography
                            sx={{
                                fontSize: theme.typography.h2.fontSize,
                                fontWeight: theme.typography.h2.fontWeight
                            }}
                        >
                            favorite {isMobile ? 'Podcast' : ''}
                        </Typography>
                        {!isMobile && (<img
                            src='/podcastImg.png'
                            style={{
                                width: '220px',
                                height: '50px'
                            }}
                            alt='podcast'
                        />)}
                    </Box>
                    <Typography
                        sx={{
                            fontSize: theme.typography.labellg.fontSize,
                            color: theme.palette.secondary.light,
                            width: isMobile ? '100%' : '70%', my: 6
                        }}
                    >
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium quasi, cumque exercitationem saepe error eius corporis soluta cupiditate quas ducimus, veniam tempora illum expedita doloremque nobis vel velit deserunt ut?
                    </Typography>

                    <PButton bg={true} transBg={false} width={isMobile ? '50%' : '20%'}>
                        <Typography>
                            Start Listening
                        </Typography>
                    </PButton>

                    <Typography
                        sx={{
                            fontSize: theme.typography.labelsm.fontSize,
                            fontWeight: theme.typography.labelsm.fontWeight,
                            color: theme.palette.secondary.light, mt: 6
                        }}
                    >
                        Listen to Our Podcast On
                    </Typography>

                    <Box
                        sx={{
                            display: 'flex',
                            gap: isMobile ? 3 : 6,
                            alignItems: 'center', mt: 2,
                            flexWrap: 'wrap'
                        }}
                    >
                        {
                            channels.map((channel: any, index: number) => (
                                <Box key={index}>
                                    <img
                                        src={channel}
                                        alt='podcast icon'
                                        style={{
                                            width: isMobile ? 100 : 150,
                                            height: isMobile ? 20 : 40
                                        }}
                                    />
                                </Box>
                            ))
                        }
                    </Box>
                </Box>

                <Box
                    sx={{
                        display: 'flex',
                        backgroundColor: theme.palette.secondary.lightest,
                        height: 'auto', mt: 8,
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: '100%'
                    }}
                >
                    <Box
                        sx={{
                            width: isMobile ? '90%' : '80%',
                            py: 4
                        }}
                    >
                        <Typography
                            sx={{
                                fontSize: theme.typography.h2.fontSize,
                                fontWeight: theme.typography.h2.fontWeight
                            }}
                        >
                            Listen to the Podcast
                        </Typography>
                        <Box
                            sx={{
                                display: 'flex',
                                overflowX: 'scroll',
                                gap: theme.spacing(3),
                                whiteSpace: 'nowrap',
                                '&::-webkit-scrollbar': {
                                display: 'none',
                                },
                                scrollbarWidth: 'none',
                                mt: 4, mb: 6
                            }}
                        >
                            <Box>
                                <PButton 
                                    onClick={() => {
                                        setValue("All")
                                        setSelectedIndex(0)
                                    }}
                                    transBg={selectedIndex === 0 ? false : true}
                                    bg={selectedIndex === 0 ? true : false}
                                >
                                    <Typography className="capitalize"
                                        sx={{
                                            fontSize: isMobile ? theme.typography.labelxs : theme.typography.labelsm
                                        }}
                                    >
                                        {"All"}
                                    </Typography>
                                </PButton>
                            </Box>
                            {
                                podcastCategories.map((category: any, index: number) => (
                                    <Box key={index}>
                                        <PButton 
                                            onClick={() => {
                                                setValue(category.name)
                                                setSelectedIndex(index + 1)
                                            }}
                                            transBg={selectedIndex === index + 1 ? false : true}
                                            bg={selectedIndex === index + 1 ? true : false}
                                        >
                                            <Typography className="capitalize"
                                                sx={{
                                                    fontSize: isMobile ? theme.typography.labelxs : theme.typography.labelsm
                                                }}
                                            >
                                                {category.name}
                                            </Typography>
                                        </PButton>
                                    </Box>
                                ))
                            }
                        </Box>

                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: 4, height: 'auto'
                            }}
                        >
                            { currentData.length > 0  
                                ? (currentData.map((podcast: any, index: number) => (
                                    <Box key={index}
                                        sx={{
                                            display: 'flex',
                                            gap: isMobile ? 2 : 4,
                                            backgroundColor: 'white',
                                            p: 4,
                                            borderRadius: theme.borderRadius.sm,
                                            height: isMobile ? '350px' : '250px',
                                            my: 2
                                        }}
                                    >
                                        {!isMobile && (<img
                                            src={podcast.image ? `${process.env.NEXT_PUBLIC_SERVER_URL}/${podcast.image}` : '/logo.png'}
                                            alt='podcast image'
                                            style={{
                                                width: '20%',
                                                height: '100%',
                                                borderRadius: theme.borderRadius.sm
                                            }}
                                            crossOrigin="anonymous"
                                        />)}
                                        <Box
                                            sx={{
                                                width: isMobile ? '100%' : '80%',
                                                flexDirection: 'column',
                                                display: 'flex',
                                                gap: 4
                                            }}
                                        >
                                            <Box sx={{display: 'flex', gap: 3}}>
                                                <Box
                                                    sx={{
                                                        display: 'flex',
                                                        gap: 1
                                                    }}
                                                >
                                                    <Box sx={{display: 'flex', gap: 1, alignItems: 'center'}}>
                                                        <img
                                                            src='/podcast-date.png'
                                                            alt='podcast date icon'
                                                            style={{
                                                                width: '15px',
                                                                height: '15px'
                                                            }}
                                                        />
                                                        <Typography
                                                            sx={{
                                                                fontSize: theme.typography.labelxs.fontSize,
                                                                color: theme.palette.secondary.light
                                                            }}
                                                        >
                                                            {moment(podcast.releaseDate).format('MMMM DD, YYYY')}
                                                        </Typography>
                                                    </Box>
                                                </Box>
                                                <Box
                                                    sx={{
                                                        display: 'flex',
                                                        gap: 1
                                                    }}
                                                >
                                                    <Box sx={{display: 'flex', gap: 1, alignItems: 'center'}}>
                                                        <img
                                                            src='/podcast-timer.png'
                                                            alt='podcast timer icon'
                                                            style={{
                                                                width: '15px',
                                                                height: '15px'
                                                            }}
                                                        />
                                                        <Typography
                                                            sx={{
                                                                fontSize: theme.typography.labelxs.fontSize,
                                                                color: theme.palette.secondary.light
                                                            }}
                                                        >
                                                            {podcast.duration}
                                                        </Typography>
                                                    </Box>
                                                </Box>
                                            </Box>

                                            <Typography className="capitalize"
                                                sx={{
                                                    fontSize: isMobile ? theme.typography.h6.fontSize : theme.typography.h5.fontSize,
                                                    fontWeight: theme.typography.h5.fontWeight
                                                }}
                                            >
                                                {podcast.title}
                                            </Typography>
                                            <Typography
                                                sx={{
                                                    fontSize: theme.typography.labelsm.fontSize,
                                                    color: theme.palette.secondary.light
                                                }}
                                            >
                                                {wordBreaker(podcast.summary, 40)}
                                            </Typography>
                                            <Box
                                                sx={{
                                                    display: 'flex',
                                                    justifyContent: isMobile ? 'flex-start' : 'space-between',
                                                    alignItems: 'center',
                                                    flexDirection: isMobile ? 'column' : 'row'
                                                }}
                                            >
                                                <NButton
                                                    bkgcolor={theme.palette.primary.main} 
                                                    textcolor='white'
                                                    width='20%'
                                                    onClick={()=>{
                                                    authStatus === 'authenticated' 
                                                        ? router.push(`/podcast/${podcast._id}`)
                                                        : router.push('/signin')
                                                    }}
                                                >
                                                    <ArrowRight/>
                                                    <Typography 
                                                    sx={{
                                                        fontSize: theme.typography.labelxs.fontSize
                                                    }}
                                                    >
                                                    {authStatus === 'authenticated' ? 'Play Episode' : 'Sign In'}
                                                    </Typography>
                                                </NButton>

                                                <Box sx={{display: 'flex', gap: 4, mt: isMobile ? 3 : 0}}>
                                                {
                                                    podIcons.map((icon: string, index: number) => (
                                                        <Image
                                                            key={index}
                                                            src={icon}
                                                            alt='podcast icon'
                                                            width={isMobile ? 25 : 30}
                                                            height={isMobile ? 25 : 30}
                                                        />
                                                    ))
                                                }
                                                </Box>
                                            </Box> 
                                        
                                        </Box> 
                                    </Box>
                                ))
                                ) : (
                                    <Typography
                                        sx={{
                                            fontSize: theme.typography.labelsm.fontSize,
                                            fontWeight: theme.typography.labelsm.fontWeight,
                                            color: theme.palette.secondary.light
                                        }}
                                    >
                                        Sorry. No podcast found for the selected category.
                                    </Typography>
                                )
                            }
                            
                        </Box>
                        
                    </Box>
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
                    {filteredData.length !== 0 && (<Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={handlePageChange}
                    />)}
                </Box>
            </Box>

            <Footer/>
        </>
    )
}
