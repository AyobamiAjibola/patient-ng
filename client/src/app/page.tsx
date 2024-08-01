'use client';

import Navbar from '@/app/components/Navbar'
import { NButton } from '@/app/components/PButton';
import { characterBreaker, wordBreaker } from '@/lib/helper';
import { Add, ArrowForward, ArrowRight, DesktopWindows, HourglassEmpty, Mic, Remove } from '@mui/icons-material';
import { Box, IconButton, Typography, useMediaQuery, useTheme } from '@mui/material'
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import Footer from './components/Footer';
import { useGetCrowdfundings } from './admin/hooks/crowdFuncdingHook/useCrowdFunding';
import moment from 'moment';
import { useGetBlogs } from './admin/hooks/blogHook/useBlog';
import { HtmlToText2 } from './components/HtmlToText';
import { useGetPodcasts } from './admin/hooks/podcastHook/usePodcast';
import { useGetWebinars } from './admin/hooks/webinarHook/useWebinar';
import { useAtom } from 'jotai';
import { openModal, openModal2, openType } from '@/lib/atoms';
import CrowdCard from './components/CrowdCard';

const faq = [
  {
    title: 'What is Patient.ng?',
    summary: `Patient.ng is a comprehensive platform that empowers patients by providing advocacy
              services, crowdfunding mechanisms, experience sharing, and hospital reviews.`,
    id: 0
  },
  {
    title: 'How does the advocacy service work?',
    summary: `Our advocacy service allows patients to submit complaints about their healthcare
              experiences. We work to ensure these complaints are addressed and resolved efficiently.`,
    id: 1
  },
  {
    title: 'Is crowdfunding on Patient.ng secure?',
    summary: `Yes, our crowdfunding platform is secure, ensuring that funds raised are used
              appropriately for medical expenses.`,
    id: 2
  },
  {
    title: 'How can I share my story?',
    summary: `You can easily share your healthcare journey on Patient.ng, providing hope and guidance
            to others.`
  },
  {
    title: 'How do hospital ratings and reviews work?',
    summary: `Patients can rate and review hospitals based on their experiences, helping others make
              informed decisions about their healthcare providers.`,
    id: 3
  }
]

export default function HomePage() {
  const theme = useTheme();
  const router = useRouter();
  const isMobile = useMediaQuery('(max-width: 900px)');
  const getCrowdfundingMutation = useGetCrowdfundings();
  const [crowdCampaign, setCrowdCampaign] = useState<any>([]);
  const [blogs, setBlogs] = useState<any>([]);
  const getBlogsMutation = useGetBlogs();
  const podcastMutation = useGetPodcasts();
  const webinarMutation = useGetWebinars();
  const [podcasts, setPodcasts] = useState<any>([]);
  const [webinar, setWebinar] = useState<any>([]);
  const { status: authStatus } = useSession();
  const [_, setType] = useAtom(openType)
  const [__, setOpen] = useAtom(openModal);
  const [___, setOpen2] = useAtom(openModal2);
  const [expandedIndex, setExpandedIndex] = useState(null);

  const handleExpand = (index: any) => {
    setExpandedIndex(index === expandedIndex ? null : index);
  };

  const getHeight = () => {
    if (typeof window !== 'undefined') {
      return window.innerHeight;
    }
      return 0;
  };

  const screenHeight = getHeight();
  const imgHeight = Math.floor((80/100) * screenHeight);

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
        const crowd = response.results.filter((crowefunding: any) => crowefunding.status === 'active')
        setCrowdCampaign(crowd)
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

  useEffect(() => {
    fetchCrowedfunding()
    fetchBlogs()
    fetchPodcasts()
    fetchWebinar()
  },[]);

  return (
    <>
      <Navbar />
      <Box
        sx={{
          width: '100%',
          height: isMobile ? 'auto' : '100vh',
          px: isMobile ? '20px' : '90px',
          backgroundImage: 'url(/home-img.jpg)',
          display: 'flex',
          gap: 4,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          flexDirection: 'column',
          pb: isMobile ? '1em' : '0px'
        }}
      >
        <Box
          sx={{
            display: 'flex',
            gap: isMobile ? 2 : 6,
            pt: isMobile ? '100px' : '80px',
            alignItems: 'center',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              width: '50%'
            }}
          >
            <Typography
              sx={{
                color: 'black',
                fontSize: isMobile ? '28px' : '55px',
                fontWeight: 600,
                lineHeight: 1
              }}
            >
              Empowering
            </Typography>
            <Box
              sx={{
                display: 'flex',
                gap: isMobile ? 2 : 3
              }}
            >
              <Typography
                sx={{
                  color: theme.palette.primary.main,
                  fontSize: isMobile ? '28px' : '50px',
                  fontWeight: 600,
                }}
              >
                Patients
              </Typography>
              <Typography
                sx={{
                  color: 'black',
                  fontSize: isMobile ? '28px' : '50px',
                  fontWeight: 600
                }}
              >
                towards
              </Typography>
            </Box>
            <Box
              sx={{
                display: 'flex',
                gap: isMobile ? 2 : 3
              }}
            >
              <Typography
                sx={{
                  color: 'black',
                  fontSize: isMobile ? '28px' : '50px',
                  fontWeight: 600,
                  lineHeight: 1
                }}
              >
                Better
              </Typography>
              <Typography
                sx={{
                  color: theme.palette.primary.main,
                  fontSize: isMobile ? '28px' : '50px',
                  fontWeight: 600,
                  lineHeight: 1
                }}
              >
                Health
              </Typography>
            </Box>
            <Typography 
              sx={{
                color: 'black',
                fontSize: isMobile ? '28px' : '50px',
                fontWeight: 600
              }}
            >
              Outcomes
              </Typography>
            <Typography
              sx={{
                color: 'black',
                fontSize: '16px',
                fontWeight: 400
              }}
            >
              {`We believe in putting patients at the Centre of their healthcare journey. Discover a community-driven platform dedicated to providing support for
              patients across Nigeria.`}
            </Typography>

            {!isMobile && (<Box
              sx={{
                display: 'flex',
                gap: isMobile ? 1 : 3,
                mt: 5
              }}
            >
              <NButton
                bkgcolor={theme.palette.primary.main}
                textcolor='white'
                onMouseEnter={()=>setType('contact')}
                onClick={()=>setOpen2(true)}
                width={isMobile ? '200px' : '150px'}
              >
                <Typography variant={isMobile ? 'paragraphxxs' : 'paragraphbase'}>
                  Contact us
                </Typography>
              </NButton>
              <NButton transBg={true} bg={false}
                bordercolor={theme.palette.primary.main}
                hoverbordercolor={theme.palette.primary.main}
                onMouseEnter={()=>setType('about')}
                onClick={()=>setOpen(true)}
                width={isMobile ? '200px' : '150px'}
              >
                <Typography variant={isMobile ? 'paragraphxxs' : 'paragraphbase'}>
                  About us
                </Typography>
              </NButton>
            </Box>)}
          </Box>
          <img
            src='/hero-img.png'
            alt='home page image'
            style={{
              width: '50%',
              height: isMobile ? '45%' : '75%',
              marginTop: isMobile ? '0px' : '4rem'
            }}
          />
        </Box>

        {isMobile && (<Box
          sx={{
            display: 'flex',
            gap: 3,
            mt: 5
          }}
        >
          <NButton
            bkgcolor={theme.palette.primary.main}
            textcolor='white'
            onMouseEnter={()=>setType('contact')}
            onClick={()=>setOpen2(true)}
            width='300px'
          >
            <Typography variant={isMobile ? 'paragraphxxs' : 'paragraphbase'}>
              About Us
            </Typography>
          </NButton>
          <NButton transBg={true} bg={false}
            bordercolor={theme.palette.primary.main}
            hoverbordercolor={theme.palette.primary.main}
            onMouseEnter={()=>setType('about')}
            onClick={()=>setOpen(true)}
            width='300px'
          >
            <Typography variant={isMobile ? 'paragraphxxs' : 'paragraphbase'}>
              Contact Us
            </Typography>
          </NButton>
        </Box>)}
      </Box>

      <Box
        sx={{
          display: 'flex',
          gap: isMobile ? 1 : 4,
          width: '100%',
          height: 'auto',
          pt: isMobile ? 4 : 10,
          flexDirection: isMobile ? 'column' : 'row',
          pb: isMobile ? 0 : 8
        }}
      >
        {isMobile && (<Typography
          sx={{
            fontSize: '30px',
            fontWeight: 800,
            lineHeight: 0.7,
            textAlign: 'center',
            mb: 4
          }}
        >
          What We Do For You
        </Typography>)}
        <Box
          sx={{
            display: 'flex',
            height: '100%',
            gap: isMobile ? 0 : 4
          }}
        >
        <img
          src='/left.png'
          alt='home page image'
          style={{
            width: isMobile ? '50%' : '25%',
            height: isMobile ? '30%' : '60%'
          }}
        />
        {!isMobile && (<Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-start',
            flexDirection: 'column',
            gap: 3,
            flex: 1,
          }}
        >
          <Typography
            sx={{
              fontSize: '50px',
              fontWeight: 500,
              lineHeight: 0.7
            }}
          >
            What We Do For You
          </Typography>
          <Typography
            sx={{
              fontSize: '16px',
              textAlign: 'center',
              fontWeight: 400,
              mb: 6
            }}
          >
            {`Patient.ng is a public-health enterprise designed to deliver sustainable support systems for patients in Nigeria. We facilitate a patient community
              where members feel supported, heard and empowered to take control of their own healthcare experience.
              By providing patient advocacy and crowdfunding services, experience sharing, and hospital ratings & reviews mechanisms, Patient.ng aims to improve patient
              healthcare outcomes.`}
          </Typography>
          <NButton
            bkgcolor={"white"}
            textcolor={theme.palette.primary.main}
            bordercolor={theme.palette.primary.main}
            hoverbordercolor={theme.palette.primary.main}
            width='250px'
          >
            Learn More
          </NButton>
        </Box>)}
        <img
          src='/right.png'
          alt='home page image'
          style={{
            width: isMobile ? '50%' : '25%',
            height: '30%'
          }}
        />
        </Box>
        {isMobile && (<Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            gap: 3,
            flex: 1,
            mb: isMobile ? '1em' : '0px',
            mt: '1em',
            px: isMobile ? '20px' : '0px',
          }}
        >
          <Typography
            sx={{
              fontSize: '12px',
              textAlign: 'center',
              fontWeight: 400
            }}
          >
            {`Patient.ng is a public-health enterprise designed to deliver sustainable support systems for patients in Nigeria. We facilitate a patient community
              where members feel supported, heard and empowered to take control of their own healthcare experience.
              By providing patient advocacy and crowdfunding services, experience sharing, and hospital ratings & reviews mechanisms, Patient.ng aims to improve patient
              healthcare outcomes.`}
          </Typography>
        </Box>)}
        {isMobile && (<Box
          sx={{
            width: '100%',
            // mt: '-2.5em',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <NButton
            bordercolor={theme.palette.primary.main}
            textcolor={theme.palette.primary.main}
          >
            Learn More
          </NButton>
        </Box>)}
      </Box>

      <Box
        sx={{
          display: 'flex',
          px: isMobile ? '0px' : '90px',
          backgroundColor: theme.palette.secondary.lightest,
          gap: isMobile ? 2 : 4,
          height: isMobile ? 'auto' : '100vh',
          mt: isMobile ? '2em' : '3em',
          py: isMobile ? '2em' : '2em',
          alignItems: 'center'
        }}
      >
        <img
          src='/advocacy-img.png'
          alt='home page image'
          style={{
            width: isMobile ? '30%' : '45%',
            height: isMobile ? '30%' : '100%'
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
              fontSize: isMobile ? '14px' : '50px',
              fontWeight: 700,
              lineHeight: isMobile ? 1 : 1
            }}
          >
            Patient Advocacy Service
          </Typography>
          <Box
            sx={{
              display: 'flex',
              gap: isMobile ? 1 : 2,
              mt: 1
            }}
          >
            <Typography
              sx={{
                fontSize: isMobile ? '12px' : '28px',
                fontWeight: 600
              }}
            >
              Are you facing 
            </Typography>
            <Typography
              sx={{
                fontSize: isMobile ? '12px' : '28px',
                fontWeight: 600,
                color: theme.palette.primary.main
              }}
            >
              Challenges
            </Typography>
            <Typography
              sx={{
                fontSize: isMobile ? '12px' : '28px',
                fontWeight: 600
              }}
            >
              with
            </Typography>
            <Typography
              sx={{
                fontSize: isMobile ? '12px' : '28px',
                fontWeight: 600,
                color: theme.palette.primary.main
              }}
            >
              hospitals?
            </Typography>
          </Box>
          <Typography
            sx={{
              fontSize: isMobile ? '11px' : '20px',
              fontWeight: 400,
              lineHeight: 1.2,
              mt: isMobile ? 2 : 4
            }}
          >
            {`Share your experiences and complaints about public or private hospitals. We ensure your voice is heard and your issues are addressed.`}
          </Typography>
          <Box
            width='100%'
            my={isMobile ? 3 : 5}
          >
            <NButton
              width={isMobile ? '150px' : '250px'}
              bkgcolor={theme.palette.primary.main}
              textcolor='white'
              onClick={()=>router.push('/advocacy')}
            >
              Learn More
            </NButton>
          </Box>
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
            fontSize: '40px',
            borderRadius: theme.borderRadius.sm, width: '100%',
            textAlign: 'center', alignSelf: 'center', mb: 1,
            fontWeight: 600
          }}
        >
          Crowdfunding
        </Typography>
        <Typography
          variant={isMobile ? 'paragraphsm' : 'paragraphlg'}
          sx={{
            textAlign: 'center',
            alignSelf: 'center', width: isMobile ? '100%' : '60%'
          }}
        >
          Discover patient crowdfunding campaigns that resonate deeply with you. Every donation count, even the hearts you give!
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
                <CrowdCard
                  fundraiser={fundraiser}
                  percent={percent}
                />
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
            See all crowdfunding <ArrowForward/>
          </NButton>
        </Box>
      </Box>

      <Box
        sx={{
          display: 'flex',
          px: isMobile ? '20px' : '90px',
          backgroundColor: theme.palette.primary.main,
          gap: 4,
          height: 'auto',
          mt: isMobile ? '2em' : '3em',
          py: isMobile ? '2em' : '3em',
          alignItems: 'center',
          flexDirection: isMobile ? 'column' : 'row'
        }}
      >
        {isMobile && (<img
          src='/patient-story.png'
          alt='home page image'
          style={{
            width: isMobile ? '80%' : '50%',
            height: isMobile ? '60%' : '70%'
          }}
        />)}
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 4, width: isMobile ? '100%' : '50%'
          }}
        >
          <Typography
            sx={{
              fontSize: isMobile ? '32px' : '50px',
              color: 'white',
              fontWeight: 600,
              textAlign: isMobile ? 'center' : 'left'
            }}
          >
            Patient Stories
          </Typography>
          <Typography
            sx={{
              fontSize: isMobile ? '16px'  : '20px',
              color: 'white',
              fontWeight: 400,
              lineHeight: 1.2,
              my: isMobile ? 1 : 3,
              textAlign: isMobile ? 'center' : 'left'
            }}
          >
            Explore inspiring patient stories from our community or share your own unique personal experience to encourage and educate others
          </Typography>
          <Box
            sx={{
              display: 'flex',
              justifyContent: isMobile ? 'center' : 'left'
            }}
          >
            <NButton
              width='250px'
              bkgcolor='white'
              textcolor={theme.palette.primary.main}
              hovercolor='white'
            >
              Read more
            </NButton>
          </Box>
        </Box>
        {!isMobile && (<img
          src='/patient-story.png'
          alt='home page image'
          style={{
            width: isMobile ? '50%' : '50%',
            height: isMobile ? '40%' : '70%'
          }}
        />)}
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
          variant={ isMobile ? 'h5' : 'h3' }
          sx={{
            alignSelf: 'center', mb: 2
          }}
        >
          Featured Blogs
        </Typography>
        <Typography
          variant={isMobile ? 'paragraphsm' : 'paragraphlg'}
          sx={{
            color: theme.palette.secondary.light, textAlign: 'center',
            alignSelf: 'center', width: isMobile ? '100%' : '60%', mb: 6
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
                  gap: 4,
                  overflowX: 'scroll',
                  whiteSpace: 'nowrap',
                  '&::-webkit-scrollbar': {
                    display: 'none',
                  },
                  scrollbarWidth: 'none',
                }}
              >
                {
                  blogs.length > 0 && blogs.slice(0, 3).map((blog: any) => (
                    <Box key={blog._id}
                      sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 1,
                        height: '500px',
                        minWidth: '300px',
                        width: isMobile ? '100%' : '32%',
                        border: `1px solid ${theme.palette.secondary.lighter}`,
                        borderRadius: theme.borderRadius.sm
                      }}
                    >
                      <Box
                        sx={{
                          height: '50%'
                        }}
                      >
                        <img
                          src={blog.titleImage ? `${process.env.NEXT_PUBLIC_SERVER_URL}/${blog.titleImage}` : '/logo.png'}
                          alt='blog image'
                          crossOrigin='anonymous'
                          style={{
                            width: '100%',
                            height: '100%',
                            borderTopLeftRadius: theme.borderRadius.sm,
                            borderTopRightRadius: theme.borderRadius.sm
                          }}
                        />
                      </Box>
                      <Typography variant='paragraphsm' className='capitalize'
                        sx={{
                          color: theme.palette.primary.main, px: 3,
                          my: 3
                        }}
                      >
                        {`[${blog.category.name}]`}
                      </Typography>
                      <Typography className='capitalize'
                        sx={{
                          fontSize: theme.typography.labellg.fontSize,
                          fontWeight: theme.typography.labelxl.fontWeight,
                          whiteSpace: 'pre-wrap', px: 3, lineHeight: 1.3
                        }}
                      >
                        {blog.title.length > 50 ? `${characterBreaker(blog.title, 50)}...` : blog.title}
                      </Typography>
                      <HtmlToText2
                        mx={3}
                        my={2}
                        htmlString={isMobile ? wordBreaker(blog.content, 15) : wordBreaker(blog.content, 20)}
                      />
                      <Typography
                        sx={{
                          fontSize: theme.typography.labelxs.fontSize,
                          color: theme.palette.primary.main, px: 3
                        }}
                        onClick={() => router.push(`/blog${blog.urlSlug }`)}
                      >
                        Learn more <ArrowForward sx={{fontSize: '16px'}}/>
                      </Typography>
                    </Box>
                  ))
                }
              </Box>
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
            mb: 5, mt: isMobile ? 4 : 6
          }}
        >
          <NButton 
            width='300px'
            onClick={()=>router.push('/blog')}
            bkgcolor={theme.palette.primary.main}
            textcolor='white'
          >
              Read more
          </NButton>
        </Box>
      </Box>

      <Box
        sx={{
          display: 'flex',
          px: isMobile ? '20px' : '90px',
          backgroundColor: theme.palette.secondary.lighter,
          gap: isMobile ? 2 : 4,
          height: isMobile ? 'auto' : '100vh',
          mt: isMobile ? '2em' : '3em',
          py: isMobile ? '2em' : '3em',
          alignItems: 'center'
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 2, width: '50%'
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            <Typography
              sx={{
                fontSize: isMobile ? '40px' : '50px',
                color: 'black',
                fontWeight: 600,
                lineHeight: 1
              }}
            >
              Hospital Rating
            </Typography>
            <Typography
              sx={{
                fontSize: isMobile ? '40px' : '50px',
                color: 'black',
                fontWeight: 600,
                lineHeight: 1
              }}
            >
              and Reviews
            </Typography>
          </Box>
          <Typography
            sx={{
              fontSize: '16px',
              color: 'black',
              fontWeight: 400,
              lineHeight: 1.2,
              my: 3
            }}
          >
            Find data-driven insights based on patient experiences. Your ratings and reviews can help others make informed decisions about their healthcare provider.
          </Typography>
          <NButton
            width='200px'
            bkgcolor='transparent'
            textcolor={theme.palette.primary.main}
            bordercolor={theme.palette.primary.main}
            hoverbordercolor={theme.palette.primary.main}
          >
            Read more
          </NButton>
        </Box>
        <img
          src='/hospital-review.png'
          alt='home page image'
          style={{
            width: isMobile ? '50%' : '40%',
            height: isMobile ? '60%' : '80%'
          }}
        />
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
          backgroundImage: 'url(/bg-image.jpg)',
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

      {/* <Box
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
      </Box> */}

      {/* <Box
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
      </Box> */}

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: isMobile ? 'auto' : '100vh',
          px: isMobile ? '20px' : '90px',
          py: 6
        }}
      >
        <Typography variant='h2' textAlign={'center'} mb={4}>
          FAQ
        </Typography>

        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 3, mt: 4
          }}        
        >
          {
            faq.map((item: any, index: number) => (
              <Box key={index}
                sx={{
                  display: 'flex',
                  flexDirection: 'column'
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    borderBottom: `1px solid ${theme.palette.secondary.lighter}`,
                    py: 3
                  }}
                >
                  <Typography
                    variant='labellg'
                  >
                    {item.title}
                  </Typography>
                  <IconButton onClick={() => handleExpand(item.id)}>
                    {expandedIndex === item.id ? <Remove /> : <Add />}
                  </IconButton>
                </Box>
                {expandedIndex === item.id && (
                  <Box sx={{ padding: 2 }}>
                    <Typography fontSize='16px' color={theme.palette.secondary.light}>
                      {item.summary}
                    </Typography>
                  </Box>
                )}
              </Box>
            ))
          }
        </Box>
      </Box>
      <Footer/>
    </>
  )
}
