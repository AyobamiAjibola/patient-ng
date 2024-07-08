'use client';

import Navbar from '@/app/components/Navbar'
import PButton, { NButton, PButton2 } from '@/app/components/PButton';
import { characterBreaker, formAmount, wordBreaker } from '@/lib/helper';
import { ArrowForward, ArrowRight, DesktopWindows, HourglassEmpty, LocationOn, Mic } from '@mui/icons-material';
import { Box, Button, LinearProgress, Typography, linearProgressClasses, styled, useMediaQuery, useTheme } from '@mui/material'
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import Footer from './components/Footer';
import { useGetCrowdfundings } from './admin/hooks/crowdFuncdingHook/useCrowdFunding';
import moment from 'moment';
import { useGetBlogs } from './admin/hooks/blogHook/useBlog';
import HtmlToText from './components/HtmlToText';
import { useFetchStories } from './admin/hooks/patientStoriesHook/usePatientStories';
import { useGetPodcasts } from './admin/hooks/podcastHook/usePodcast';
import { useGetWebinars } from './admin/hooks/webinarHook/useWebinar';
import { useAtom } from 'jotai';
import { openModal, openType } from '@/lib/atoms';

export default function HomePage() {
  const theme = useTheme();
  const router = useRouter();
  const isMobile = useMediaQuery('(max-width: 900px)');
  const getCrowdfundingMutation = useGetCrowdfundings();
  const [crowdCampaign, setCrowdCampaign] = useState<any>([]);
  const [blogs, setBlogs] = useState<any>([]);
  const getBlogsMutation = useGetBlogs();
  const fetchStoriesMutate = useFetchStories();
  const podcastMutation = useGetPodcasts();
  const webinarMutation = useGetWebinars();
  const [stories, setStories] = useState<any>([]);
  const [podcasts, setPodcasts] = useState<any>([]);
  const [webinar, setWebinar] = useState<any>([]);
  const { status: authStatus } = useSession();
  const [_, setType] = useAtom(openType)
  const [__, setOpen] = useAtom(openModal);

  const getHeight = () => {
    if (typeof window !== 'undefined') {
      return window.innerHeight;
    }
      return 0;
  };

  const screenHeight = getHeight();
  const imgHeight = Math.floor((80/100) * screenHeight);

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

  const fetchPodcasts = async () => {
    await podcastMutation.mutateAsync({}, {
      onSuccess: (response: any) => {
        const podcasts = response.results.slice(0, 5)
        setPodcasts(podcasts)
      }
    })
  }

  const fetchWebinar = async () => {
    await webinarMutation.mutateAsync({}, {
      onSuccess: (response: any) => {
        const podcasts = response.results.slice(0, 5)
        setWebinar(podcasts)
      }
    })
  }

  const fetchCrowedfunding = async () => {
    await getCrowdfundingMutation.mutateAsync({}, {
      onSuccess: (response: any) => {
        setCrowdCampaign(response.results)
      }
    })
  }

  const fetchBlogs = async () => {
    await getBlogsMutation.mutateAsync({}, {
      onSuccess: (response: any) => {
        setBlogs(response.results)
      }
    })
  }

  const fetchStories = async () => {
    await fetchStoriesMutate.mutateAsync({}, {
      onSuccess: (response: any) => {
        setStories(response.results)
      }
    })
  }

  useEffect(() => {
    fetchCrowedfunding()
    fetchBlogs()
    fetchStories()
    fetchPodcasts()
    fetchWebinar()
  },[]);

  return (
    <>
      <Navbar />
      <Box
        sx={{
          display: 'flex',
          gap: 3,
          position: 'absolute',
          pl: isMobile ? '20px' : '90px',
          top: isMobile ? '15em' : '25em'
        }}
      >
        <PButton transBg={false} bg={true}
          onMouseEnter={()=>setType('contact')}
          onClick={()=>setOpen(true)}
        >
          <Typography variant={isMobile ? 'paragraphxxs' : 'paragraphbase'}>
            Contact Us
          </Typography>
        </PButton>
        <PButton transBg={true} bg={false}
          onMouseEnter={()=>setType('about')}
          onClick={()=>setOpen(true)}
        >
          <Typography variant={isMobile ? 'paragraphxxs' : 'paragraphbase'}>
            About Us
          </Typography>
        </PButton>
      </Box>
      <Box
        sx={{
          width: '100%',
          height: isMobile ? imgHeight : '800px',
          marginTop: '-80px',
          position: 'relative',
          mb: isMobile ? '-4rem' : '28rem',
          zIndex: '-1'
        }}
      >
        <Box>
          <img
            src='/home-img.png'
            alt='home page image'
            style={{
              width: '100%',
              height: '100%',
            }}
          />
          <Box
            sx={{
              width: '100%',
              pl: isMobile ? '20px' : '90px',
              pr: isMobile ? '5px' : '0px',
              position: 'absolute',
              display: 'flex',
              flexDirection: 'column',
              top: isMobile ? 90 : 170
            }}
          >
            <Typography 
              variant={isMobile ? 'h5' : 'h3'}
              sx={{
                color: 'white',
                mb: isMobile ? 1 : 4,
                width: isMobile ? '100%' : '80%'
              }}
            >
              Empowering Patients, Transforming Healthcare.
            </Typography>
            <Typography
              variant={isMobile ? 'paragraphxs' : 'paragraphlg'}
              sx={{
                color: theme.palette.secondary.lighter,
                width: isMobile ? '100%' : '80%'
              }}
            >
              We believe in putting patients at the center of their healthcare journey. Discover a community-driven platform dedicated to providing support, resources, and advocacy for patients across Nigeria.
            </Typography>
          </Box>
        </Box>

        <Box
          sx={{
            height: isMobile ? '250px' : '700px',
            px: isMobile ? '20px' : '90px',
            position: 'absolute',
            top: isMobile ? '17rem' : '30rem',
            width: '100%'
          }}
        >
          <img
            src='/home-img2.png'
            alt='home page image'
            style={{
              width: '100%',
              height: '100%',
            }}
          />
        </Box>
      </Box>

      <Box
        sx={{
          height: 'auto',
          px: isMobile ? '20px' : '90px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          pt: '60px'
        }}
      >
        <Typography
          sx={{
            fontSize: theme.typography.labelsm.fontSize,
            backgroundColor: theme.palette.secondary.lighter,
            p: 2, color: theme.palette.primary.darker,
            borderRadius: theme.borderRadius.sm, width: '120px',
            textAlign: 'center', alignSelf: 'center', mb: 5
          }}
        >
          Crowdfunding
        </Typography>
        <Typography
          variant={ isMobile ? 'labellg' : 'h3' }
          sx={{
            alignSelf: 'center', mb: 2,
            textAlign: isMobile ? 'center' : 'left'
          }}
        >
          Support Health Initiatives, Make a Difference
        </Typography>
        <Typography
          variant={isMobile ? 'paragraphsm' : 'paragraphlg'}
          sx={{
            color: theme.palette.secondary.light, textAlign: 'center',
            alignSelf: 'center', width: isMobile ? '100%' : '80%'
          }}
        >
          Join us in funding critical healthcare projects and making an impact in the lives of patients and communities. Every contribution counts.
        </Typography>

        <Box
          sx={{
            display: 'flex',
            gap: 4, mt: isMobile ? '20px' : '60px',
            overflowX: 'scroll',
            whiteSpace: 'nowrap',
            '&::-webkit-scrollbar': {
              display: 'none',
            },
            scrollbarWidth: 'none',
          }}
        >
          { crowdCampaign.slice(0, 3).map((fundraiser: any, index: number) => {
              const percent = fundraiser.amountRaised 
                                ? (+fundraiser.amountRaised/+fundraiser.amountNeeded) * 100
                                : (0/+fundraiser.amountNeeded) * 100;

              return ( 
                <Box key={fundraiser}
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    height: '550px',
                    minWidth: '300px',
                    width: isMobile ? '100%' : '32%',
                    border: `1px solid ${theme.palette.secondary.lighter}`,
                    borderRadius: theme.borderRadius.sm
                  }}
                >
                  <img
                    src={fundraiser.image ? `${process.env.NEXT_PUBLIC_SERVER_URL}/${fundraiser.image}` : '/crowd2.png'}
                    alt='crowd funding image'
                    style={{
                      height: '50%',
                      width: '100%',
                      borderTopLeftRadius: theme.borderRadius.sm,
                      borderTopRightRadius: theme.borderRadius.sm
                    }}
                    crossOrigin="anonymous"
                  />
                  <Box
                    sx={{
                      px: '10px',
                      pt: '10px',
                      display: 'flex',
                      flexDirection: 'column',
                      height: '70%', justifyContent: 'space-evenly'
                    }}
                  >
                    <Box>
                      <Typography
                        sx={{
                          fontSize: theme.typography.labelxs.fontSize,
                          fontWeight: theme.typography.labelxs.fontWeight,
                          ml: -1
                        }}
                        className="capitalize"
                      >
                        <LocationOn
                          sx={{
                            color: theme.palette.primary.main, 
                            fontSize: '16px'
                          }}
                        /> { `${fundraiser.location.lga ? fundraiser.location.lga : 'Ikeja'}, ${fundraiser.location.state ? fundraiser.location.state : 'Lagos'}` }
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: theme.typography.labelsm.fontSize,
                          fontWeight: theme.typography.labelxs.fontWeight,
                          my: 1
                        }}
                        className="capitalize"
                      >
                        { characterBreaker(fundraiser.fundraisingFor, 20)}
                      </Typography>
                    </Box>

                    <Typography
                      sx={{
                        fontSize: theme.typography.labelxs.fontSize,
                        lineHeight: theme.typography.labelxs.lineHeight,
                        color: theme.palette.secondary.light,
                        whiteSpace: 'pre-wrap'
                      }}
                    >
                      { wordBreaker(fundraiser.description, 10) }...
                    </Typography>
                  
                    <Box>
                      {fundraiser.donations.length > 0
                        ? (<Box
                            sx={{
                                display: 'flex',
                                gap: 1, mt: 3
                            }}
                        >
                            <Typography
                                sx={{
                                    color: theme.palette.secondary.light,
                                    fontSize: theme.typography.labelxs.fontSize
                                }}
                            >
                                Last donation
                            </Typography>
                            <Typography
                                sx={{
                                    fontSize: theme.typography.labelxs.fontSize,
                                    fontWeight: theme.typography.labelxs.fontWeight
                                }}
                            >
                                { moment(fundraiser.donations[0].date).fromNow() }
                            </Typography>
                        </Box>
                        ) : (
                            <Box
                                sx={{
                                    display: 'flex',
                                    gap: 1, mt: 3
                                }}
                            >
                                <Typography
                                    sx={{
                                        color: theme.palette.secondary.light,
                                        fontSize: theme.typography.labelxs.fontSize
                                    }}
                                >
                                    No donations yet.
                                </Typography>
                            </Box>
                        )
                      }
                      <BorderLinearProgress variant="determinate" value={percent} sx={{my: 2}}/>
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 1
                        }}
                      >
                        <Typography
                          sx={{
                            fontSize: theme.typography.labelxxs.fontSize
                          }}
                        >
                          {formAmount(+fundraiser.amountRaised)} raised
                        </Typography>
                        <Typography
                          sx={{
                            fontSize: theme.typography.labelxxs.fontSize,
                            color: theme.palette.secondary.light
                          }}
                        >
                          of {formAmount(+fundraiser.amountNeeded)}
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                  <Box
                    sx={{
                      height: '30%', mt: 3,
                      backgroundColor: theme.palette.secondary.lightest,
                      borderBottomRightRadius: theme.borderRadius.sm,
                      borderBottomLeftRadius: theme.borderRadius.sm,
                      borderTop: `1px solid ${theme.palette.secondary.lighter}`
                    }}
                  >
                    <Box 
                      sx={{
                        display: 'flex', 
                        alignItems: 'center',
                        height: '100%',
                        px: '10px'
                      }}
                    >
                      <Typography onClick={() => router.push(`/crowdfunding/${fundraiser._id}`)}
                        sx={{
                          cursor: 'pointer',
                          color: theme.palette.primary.main,
                          fontSize: theme.typography.labelxs.fontSize,
                          fontWeight: theme.typography.labelxs.fontWeight,
                        }}
                      >
                        See More Information
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              )})
            }
        </Box>

        <Box 
          sx={{
            display: 'flex', justifyContent: 'center',
            mt: 4, mb: 4
          }}
        >
          <NButton
            bkgcolor={theme.palette.primary.main}
            textcolor='white'
            width='250px'
            onClick={() => router.push('/crowdfunding/campaigns')}
          >
            <Typography sx={{color: 'black'}}>
              See all crowdfunding <ArrowForward/>
            </Typography>
          </NButton>
        </Box>
      </Box>

      <Box
        sx={{
          height: 'auto',
          px: isMobile ? '20px' : '90px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          pt: '60px'
        }}
      >
        <Typography
          sx={{
            fontSize: theme.typography.labelsm.fontSize,
            backgroundColor: theme.palette.secondary.lighter,
            p: 2, color: theme.palette.primary.darker,
            borderRadius: theme.borderRadius.sm, width: '120px',
            textAlign: 'center', alignSelf: 'center', mb: 5
          }}
        >
          Featured blogs
        </Typography>
        <Typography
          variant={ isMobile ? 'labellg' : 'h3' }
          sx={{
            alignSelf: 'center', mb: 2
          }}
        >
          Latest Blog Posts
        </Typography>
        <Typography
          variant={isMobile ? 'paragraphsm' : 'paragraphlg'}
          sx={{
            color: theme.palette.secondary.light, textAlign: 'center',
            alignSelf: 'center', width: isMobile ? '100%' : '80%', mb: 4
          }}
        >
          Here’s a quick glance over our latest blog posts and media articles written by our team members, staff and guest writers.
        </Typography>

        {blogs.length > 0
          ? (<Box
              sx={{
                display: 'flex',
                gap: 4,
                justifyContent: 'center',
                width: '100%'
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  width: isMobile ? '100%' : '30%'
                }}
              >
                {
                  blogs.length > 0 && blogs.slice(0, 2).map((blog: any) => (
                    <Box key={blog._id}
                      sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 1,
                        height: '20rem'
                      }}
                    >
                      <Box
                        sx={{
                          height: '60%'
                        }}
                      >
                        <img
                          src={blog.titleImage ? `${process.env.NEXT_PUBLIC_SERVER_URL}/${blog.titleImage}` : '/logo.png'}
                          alt='blog image'
                          crossOrigin='anonymous'
                          style={{
                            width: '100%',
                            height: '100%'
                          }}
                        />
                      </Box>
                      <Typography
                        sx={{
                          fontSize: theme.typography.labelxxs.fontSize,
                          color: theme.palette.secondary.light
                        }}
                      >
                        {moment(blog.createdAt).format('DD MMM YY')}
                      </Typography>
                      <Typography className='capitalize'
                        sx={{
                          fontSize: theme.typography.labellg.fontSize,
                          fontWeight: theme.typography.labelxl.fontWeight
                        }}
                      >
                        {blog.title.length > 7 ? `${wordBreaker(blog.title, 7)}...` : blog.title}
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: theme.typography.labelxs.fontSize,
                          color: theme.palette.primary.main
                        }}
                        onClick={() => router.push(`/blog${blog.urlSlug }`)}
                      >
                        Learn more <ArrowForward sx={{fontSize: '16px'}}/>
                      </Typography>
                    </Box>
                  ))
                }
              </Box>

              {!isMobile && blogs.length > 2 && (<Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 1, maxHeight: '40rem', height: 'auto',
                  width: '40%'
                }}
              >
                <Box
                  sx={{
                    height: '70%'
                  }}
                >
                  <img
                    src={blogs[2]?.titleImage ? `${process.env.NEXT_PUBLIC_SERVER_URL}/${blogs[2]?.titleImage}` : '/logo.png'}
                    alt='blog image'
                    crossOrigin='anonymous'
                    style={{
                      width: '100%',
                      height: '100%'
                    }}
                  />
                </Box>
                  <Typography
                    sx={{
                      fontSize: theme.typography.labelxs.fontSize,
                      color: theme.palette.secondary.light
                    }}
                  >
                    {moment(blogs[2]?.createdAt).format('DD MMM YY')}
                  </Typography>
                  <Typography variant='labellg' className='capitalize'>
                    {blogs[2]?.title.length > 7 ? `${wordBreaker(blogs[2]?.title, 7)}...` : blogs[2]?.title}
                  </Typography>
                  <HtmlToText
                    mx={isMobile ? 2 : 3}
                    htmlString={isMobile ? wordBreaker(blogs[2]?.content, 20) : wordBreaker(blogs[2]?.content, 40)}
                  />
                  <Typography
                    sx={{
                      fontSize: theme.typography.labelxs.fontSize,
                      color: theme.palette.primary.main
                    }}
                    onClick={() => router.push(`/blog${blogs[2].urlSlug }`)}
                  >
                    Learn more <ArrowForward sx={{fontSize: '16px'}}/>
                  </Typography>
              </Box>)}

              {!isMobile && (<Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 2, width: '30%'
                }}
              >
                {
                  blogs.length > 3 &&
                    blogs.slice(3, 5).map((blog: any) => (
                        <Box key={blog._id}
                          sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            height: '20rem', gap: 1
                          }}
                        >
                          <Box
                            sx={{
                              height: '60%'
                            }}
                          >
                            <img
                              src={blog.titleImage ? `${process.env.NEXT_PUBLIC_SERVER_URL}/${blog.titleImage}` : '/logo.png'}
                              alt='blog image'
                              crossOrigin='anonymous'
                              style={{
                                width: '100%',
                                height: '100%'
                              }}
                            />
                          </Box>
                          
                          <Typography
                            sx={{
                              fontSize: theme.typography.labelxxs.fontSize,
                              color: theme.palette.secondary.light
                            }}
                          >
                            {moment(blog.createdAt).format('DD MMM YY')}
                          </Typography>
                          <Typography className='capitalize'
                            sx={{
                              fontSize: theme.typography.labellg.fontSize,
                              fontWeight: theme.typography.labelxl.fontWeight
                            }}
                          >
                            {blog.title.length > 7 ? `${wordBreaker(blog.title, 7)}...` : blog.title}
                          </Typography>
                          <Typography
                            sx={{
                              fontSize: theme.typography.labelxs.fontSize,
                              color: theme.palette.primary.main
                            }}
                            onClick={() => router.push(`/blog${blog.urlSlug }`)}
                          >
                            Learn more <ArrowForward/>
                          </Typography>
                        </Box>
                      ))
                  }
              </Box>)}
            </Box>)
          : (
            <Box my={6} width={'100%'} justifyContent={'center'} alignItems={'center'} display={'flex'} flexDirection={'column'}>
              <HourglassEmpty sx={{fontSize: '2em', color: theme.palette.border.main}}/>
              <Typography variant='paragraphlg' color={theme.palette.border.main}>
                  No Blog Found
              </Typography>
            </Box>
          )}
        <Box 
          sx={{
            display: 'flex', justifyContent: 'center',
            mb: 4, mt: isMobile ? 0 : 4
          }}
        >
          <PButton2 transBg={false} bg={false} width='250px'
            onClick={()=>router.push('/blog')}
          >
            <Typography sx={{color: 'black'}}>
              See all blog posts <ArrowForward/>
            </Typography>
          </PButton2>
        </Box>
      </Box>

      <Box
        sx={{
          height: 'auto',
          px: isMobile ? '20px' : '90px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          pt: '60px',
          backgroundColor: theme.palette.primary.darker
        }}
      >
        <Typography
          sx={{
            fontSize: theme.typography.labelsm.fontSize,
            backgroundColor: 'white',
            p: 1, color: theme.palette.primary.darker,
            borderRadius: theme.borderRadius.sm, width: '150px',
            textAlign: 'center', alignSelf: 'center', mb: 5
          }}
        >
          Podcast & webinar
        </Typography>
        <Typography
          sx={{
            fontSize: isMobile ? theme.typography.h5.fontSize : theme.typography.h4.fontSize,
            color: '#FFCB00', alignSelf: 'center', textAlign: 'center'
          }}
        >
          Stay Informed, Stay Healthy
        </Typography>
        <Typography
          sx={{
            fontSize: theme.typography.labelsm.fontSize,
            color: 'white', alignSelf: 'center', textAlign: 'center'
          }}
        >
          Tune in to expert-led podcasts and webinars on health and wellness topics that matter to you.
        </Typography>

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            mt: 6
          }}
        >
          <Typography
            sx={{
              fontSize: theme.typography.labelxs.fontSize,
              color: 'white'
            }}
          >
            <Mic sx={{color: theme.palette.primary.main, fontSize: '14px'}}/> Latest Episodes
          </Typography>
          <Typography
            sx={{
              fontSize: theme.typography.labelxs.fontSize,
              color: theme.palette.primary.main,
              cursor: 'pointer'
            }}
            onClick={()=>router.push('/podcast')}
          >
            See all Podcasts <ArrowForward sx={{fontSize: '14px'}}/>
          </Typography>
        </Box>

        <Box
          sx={{
            display: 'flex',
            gap: 4, mt: '10px',
            overflowX: 'scroll',
            whiteSpace: 'nowrap',
            '&::-webkit-scrollbar': {
              display: 'none',
            },
            scrollbarWidth: 'none',
            width: '100%'
          }}
        >
          {
            podcasts.map((podcast: any, index: number) => (
              <Box key={podcast._id}
                sx={{
                  backgroundColor: 'white',
                  borderRadius: theme.borderRadius.sm,
                  gap: 2,
                  p: 1,
                  display: 'flex',
                  minWidth: '400px',
                  height: '170px'
                }}
              >
                <Box
                  sx={{
                    width: '40%',
                    height:'100%'
                  }}
                >
                  <img
                    src={podcast.image ? `${process.env.NEXT_PUBLIC_SERVER_URL}/${podcast.image}` : '/logo.png'}
                    alt='podcast image'
                    style={{
                      width: '100%',
                      height: '100%',
                      borderRadius: theme.borderRadius.sm
                    }}
                    crossOrigin='anonymous'
                  />
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-evenly',
                    width: '60%'
                  }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      gap: 2
                    }}
                  >
                    <Box sx={{display: 'flex', gap: 1, alignItems: 'center'}}>
                      <img
                          src='/podcast-date.png'
                          alt='podcast date icon'
                          style={{
                              width: '14px',
                              height: '14px'
                          }}
                      />
                      <Typography variant='paragraphxs' color={theme.palette.secondary.light}>
                          {moment(podcast.releaseDate).format('MMMM DD, YYYY')}
                      </Typography>
                    </Box>
                    <Box sx={{display: 'flex', gap: 1, alignItems: 'center'}}>
                      <img
                          src='/podcast-timer.png'
                          alt='podcast timer icon'
                          style={{
                              width: '14px',
                              height: '14px'
                          }}
                      />
                      <Typography variant='paragraphxs' color={theme.palette.secondary.light}>
                          {podcast.duration}
                      </Typography>
                    </Box>
                  </Box>

                  <Typography variant='labellg'
                    sx={{
                      whiteSpace: 'pre-wrap'
                    }}
                  >
                    {podcast.title.length > 25 ? `${characterBreaker(podcast.title, 25)}...` : podcast.title}
                  </Typography>

                  <NButton
                    bkgcolor={theme.palette.primary.main} 
                    textcolor='white'
                    width='50%'
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
                </Box> 
              </Box>
            ))
          }
        </Box>
      </Box>

      <Box
        sx={{
          height: 'auto',
          px: isMobile ? '20px' : '90px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          pb: '60px',
          backgroundImage: 'url(/bg-image.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            mt: 6
          }}
        >
          <Typography
            sx={{
              fontSize: theme.typography.labelxs.fontSize,
              color: 'white'
            }}
          >
            <DesktopWindows sx={{color: theme.palette.primary.main, fontSize: '14px'}}/> Upcoming webinars
          </Typography>
          <Typography
            sx={{
              fontSize: theme.typography.labelxs.fontSize,
              color: theme.palette.primary.main,
              cursor: 'pointer'
            }}
            onClick={()=>router.push('/webinar')}
          >
            See all Webinars <ArrowForward sx={{fontSize: '14px'}}/>
          </Typography>
        </Box>

        <Box
          sx={{
            display: 'flex',
            gap: 4, mt: '10px',
            overflowX: 'scroll',
            whiteSpace: 'nowrap',
            '&::-webkit-scrollbar': {
              display: 'none',
            },
            scrollbarWidth: 'none',
            width: '100%'
          }}
        >
          {
            webinar.map((webinar: any, index: number) => (
              <Box key={index}
                sx={{
                  borderRadius: theme.borderRadius.sm,
                  display: 'flex',
                  minWidth: '400px',
                  height: '200px',
                  flexDirection: 'column'
                }}
              >
                <Box
                  sx={{
                    height: '60%',
                    width:'100%',
                    display: 'flex',
                    justifyContent: 'space-between',
                    flexDirection: 'column', p: 2,
                    backgroundColor: index % 2 === 0 ? '#005158' : '#FFCB00',
                    borderTopLeftRadius: theme.borderRadius.sm,
                    borderTopRightRadius: theme.borderRadius.sm
                  }}
                >
                  <Image
                    src={index % 2 === 0 ? '/ipatient-logo2.png' : '/ipatient-logo.png'}
                    alt='logo'
                    height={100}
                    width={100}
                  />
                  <Typography
                    sx={{
                      fontWeight: theme.typography.labelsm.fontWeight,
                      fontSize: theme.typography.labelsm.fontSize,
                      lineHeight: theme.typography.labelsm.lineHeight,
                      color: index % 2 === 0 ? 'white' : theme.palette.secondary.main,
                      whiteSpace: 'pre-wrap'
                    }}
                  >
                    {webinar.title.length > 50 ? `${characterBreaker(webinar.title, 50)}...` : webinar.title}
                  </Typography>
                </Box>

                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    height: '40%',
                    width: '100%',
                    backgroundColor: 'white',
                    p: 2,
                    borderBottomLeftRadius: theme.borderRadius.sm,
                    borderBottomRightRadius: theme.borderRadius.sm
                  }}
                >
                  <Typography
                    sx={{
                        fontSize: theme.typography.labelxs.fontSize,
                        lineHeight: theme.typography.labelxs.lineHeight,
                        color: theme.palette.secondary.light,
                        whiteSpace: 'pre-wrap'
                    }}
                  >
                    {webinar.summary.length ? `${characterBreaker(webinar.summary, 100)}...` : webinar.description}
                  </Typography>

                  {authStatus === 'unauthenticated' ? 
                    (<Typography
                      sx={{
                          color: theme.palette.primary.main,
                          fontSize: theme.typography.labelxs.fontSize,
                          fontWeight: theme.typography.labelxs.fontWeight,
                          cursor: 'pointer'
                      }}
                      >
                        Signup <ArrowForward sx={{fontSize: theme.typography.labelsm.fontSize}}/>
                      </Typography>
                    ) : (
                      <Typography
                        sx={{
                          color: theme.palette.primary.main,
                          fontSize: theme.typography.labelxs.fontSize,
                          fontWeight: theme.typography.labelxs.fontWeight,
                          cursor: 'pointer'
                        }}
                        onClick={()=>router.push(`/webinar/${webinar._id}`)}
                      >
                        Open <ArrowForward sx={{fontSize: theme.typography.labelsm.fontSize}}/>
                      </Typography>
                    )
                  }
                </Box> 
              </Box>
            ))
          }
        </Box>
      </Box>

      <Box
        sx={{
          height: 'auto',
          px: isMobile ? '20px' : '90px',
          pt: '60px'
        }}
      >
        <Box
          sx={{
            py: 6, px: 4,
            backgroundColor: theme.palette.secondary.lightest,
            border: `1px solid ${theme.palette.secondary.lighter}`,
            height: 'auto',
            borderRadius: theme.borderRadius.sm,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >
          <Typography
            sx={{
              fontSize: theme.typography.labelsm.fontSize,
              backgroundColor: 'white',
              p: 1, color: theme.palette.primary.darker,
              borderRadius: theme.borderRadius.sm, width: '150px',
              textAlign: 'center', alignSelf: 'center', mb: 5
            }}
          >
            Patient stories
          </Typography>
          <Typography
            sx={{
              fontSize: isMobile ? theme.typography.h5.fontSize : theme.typography.h4.fontSize,
              color: theme.palette.primary.darker, alignSelf: 'center', textAlign: 'center'
            }}
          >
            Inspiring patient stories from our community.
          </Typography>
          <Typography
            sx={{
              fontSize: theme.typography.labelsm.fontSize, mb: 4,
              color: theme.palette.secondary.light, alignSelf: 'center', textAlign: 'center'
            }}
          >
            Read inspiring stories from fellow patients or share your own to inspire others
          </Typography>

            {stories.length > 0 && (<>
              {stories.length && (<Box
                sx={{
                  display: 'flex',
                  gap: 4, mt: 4,
                  overflowX: 'scroll',
                  whiteSpace: 'nowrap',
                  '&::-webkit-scrollbar': {
                    display: 'none',
                  },
                  scrollbarWidth: 'none',
                }}
              >
                {
                  stories.slice(0, 3).map((story: any) => (
                    <Box key={story._id}
                      sx={{
                        minWidth: isMobile ? '70%' : '32%',
                        minHeight: '150px',
                        height: 'auto',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 2,
                        justifyContent: 'space-evenly'
                      }}
                    >
                      <Typography
                        sx={{
                          fontSize: theme.typography.labelsm.fontSize,
                          color: theme.palette.secondary.light,
                          whiteSpace: 'pre-wrap'
                        }}
                      >
                        {story.content.length > 20 ? `"${wordBreaker(story.content, 20)}..."` : story.content}
                      </Typography>
                      <Typography className='capitalize'
                        sx={{
                          fontSize: theme.typography.labelxs.fontSize,
                          fontWeight: theme.typography.labelsm.fontWeight,
                          whiteSpace: 'pre-wrap'
                        }}
                      >
                        -{story.user.firstName} {story.user.lastName}
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: theme.typography.labelxs.fontSize,
                          fontWeight: theme.typography.labelsm.fontWeight,
                          color: theme.palette.primary.main
                        }}
                        onClick={() => router.push(`/patient-stories/${story._id}`)}
                      >
                        Read full story <ArrowForward sx={{fontSize: '13px'}}/>
                      </Typography>
                    </Box> 
                  ))
                }
              </Box>)}

              {(!isMobile && stories.length > 7) && (<Box
                sx={{
                  display: 'flex',
                  gap: 4, mt: 4,
                  overflowX: 'scroll',
                  whiteSpace: 'nowrap',
                  '&::-webkit-scrollbar': {
                    display: 'none',
                  },
                  scrollbarWidth: 'none',
                }}
              >
                {
                  stories.slice(4, 7).map((story: any) => (
                    <Box key={story._id}
                      sx={{
                        minWidth: '32%',
                        minHeight: '150px',
                        height: 'auto',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 2,
                        justifyContent: 'space-evenly'
                      }}
                    >
                      <Typography
                        sx={{
                          fontSize: theme.typography.labelsm.fontSize,
                          color: theme.palette.secondary.light,
                          whiteSpace: 'pre-wrap'
                        }}
                      >
                        {story.content.length > 20 ? `"${wordBreaker(story.content, 20)}..."` : story.content}
                      </Typography>
                      <Typography className='capitalize'
                        sx={{
                          fontSize: theme.typography.labelxs.fontSize,
                          fontWeight: theme.typography.labelsm.fontWeight,
                          whiteSpace: 'pre-wrap'
                        }}
                      >
                        -{story.user.firstName} {story.user.lastName}
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: theme.typography.labelxs.fontSize,
                          fontWeight: theme.typography.labelsm.fontWeight,
                          color: theme.palette.primary.main
                        }}
                        onClick={() => router.push(`/patient-stories/${story._id}`)}
                      >
                        Read full story <ArrowForward sx={{fontSize: '13px'}}/>
                      </Typography>
                    </Box> 
                  ))
                }
              </Box>)}

              {(!isMobile && stories.length > 10) && (<Box
                sx={{
                  display: 'flex',
                  gap: 4, mt: 4,
                  overflowX: 'scroll',
                  whiteSpace: 'nowrap',
                  '&::-webkit-scrollbar': {
                    display: 'none',
                  },
                  scrollbarWidth: 'none',
                }}
              >
                {
                  stories.slice(7, 10).map((story: any) => (
                    <Box key={story._id}
                      sx={{
                        minWidth: '32%',
                        minHeight: '150px',
                        height: 'auto',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 2,
                        justifyContent: 'space-evenly'
                      }}
                    >
                      <Typography
                        sx={{
                          fontSize: theme.typography.labelsm.fontSize,
                          color: theme.palette.secondary.light,
                          whiteSpace: 'pre-wrap'
                        }}
                      >
                        {story.content.length > 20 ? `"${wordBreaker(story.content, 20)}..."` : story.content}
                      </Typography>
                      <Typography className='capitalize'
                        sx={{
                          fontSize: theme.typography.labelxs.fontSize,
                          fontWeight: theme.typography.labelsm.fontWeight,
                          whiteSpace: 'pre-wrap'
                        }}
                      >
                        -{story.user.firstName} {story.user.lastName}
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: theme.typography.labelxs.fontSize,
                          fontWeight: theme.typography.labelsm.fontWeight,
                          color: theme.palette.primary.main
                        }}
                        onClick={() => router.push(`/patient-stories/${story._id}`)}
                      >
                        Read full story <ArrowForward sx={{fontSize: '13px'}}/>
                      </Typography>
                    </Box>  
                  ))
                }
              </Box>)}
            </>)}
        </Box>
      </Box>

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          px: isMobile ? '20px' : '150px',
          my: 8
        }}
      >
        <Box
          sx={{
            width: isMobile ? '100%' : '80%',
            minHeight: '300px',
            py: isMobile ? 4 : 0, 
            px: 4,
            backgroundColor: '#06FF9D',
            borderRadius: theme.borderRadius.lg,
            display: 'flex', gap: 2
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              width: isMobile ? '100%' : '60%',
              justifyContent: 'center',
              gap: 3
            }}
          >
            <Typography
              sx={{
                fontSize: theme.typography.h4.fontSize,
                color: theme.palette.primary.darker
              }}
            >
              Get the Care You Deserve
            </Typography>
            <Typography
              sx={{
                fontSize: theme.typography.labellg.fontSize,
                color: theme.palette.secondary.light
              }}
            >
              Have you had a negative experience at a hospital? Report it to us and help create a safer, more compassionate healthcare system. Your voice matters!
            </Typography>
            <Button onClick={()=> router.push('/advocacy')}
              sx={{
                textTransform: 'none',
                borderRadius: theme.borderRadius.sm,
                backgroundColor: 'white',
                color: theme.palette.primary.darker,
                width: '200px',
                border: `none`,
                '&:hover': {
                  color: theme.palette.primary.main,
                  border: `1px solid ${theme.palette.primary.main}`,
                },
                px: theme.spacing(3),
              }}
            >
              Make a complaint
            </Button>
          </Box>

          {!isMobile && (<Box
            sx={{
              width: '40%',
              height: '100%',
              display: 'flex',
              my: 4
            }}
          >
            <img
              src='/speaker.png'
              alt='complaint'
              style={{
                width: '100%',
                height: '100%'
              }}
            />
          </Box>)}
        </Box>
      </Box>

      <Footer/>
    </>
  )
}
