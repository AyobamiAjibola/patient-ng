'use client';

import Navbar from '@/app/components/Navbar'
import { NButton } from '@/app/components/PButton';
import { characterBreaker, wordBreaker } from '@/lib/helper';
import { Add, ArrowForward, ArrowRight, DesktopWindows, HourglassEmpty, Mic, Remove } from '@mui/icons-material';
import { Box, Button, IconButton, Typography, useMediaQuery, useTheme } from '@mui/material'
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
import FramerMotion, { FramerMotion2 } from './components/FramerMotion';
import BlogCard from './components/BlogCard';

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

  const fetchPodcasts = async () => {
    await podcastMutation.mutateAsync({}, {
      onSuccess: (response: any) => {
        const podcasts = response.results.slice(0, 5)
        setPodcasts(podcasts)
      }
    })
  };

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
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          flexDirection: isMobile ? 'column' : 'row',
          pb: '50px', pt: '120px',
          alignItems: 'center'
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            width: isMobile ? '100%' : '50%'
          }}
        >
          <Box
            sx={{
              display: 'flex',
              gap: isMobile ? 2 : 3,
              alignItems: 'center',
              flexWrap: 'wrap'
            }}
          >
            {/* Empowering Patients, Transforming Healthcare */}
            <p
              style={{
                lineHeight: 1.3,
                marginBottom: '20px'
              }}
            >
              &nbsp;
              <span
                style={{
                  color: 'black',
                  fontSize: isMobile ? '28px' : '55px',
                  fontWeight: 700
                }}
              >
                Empowering
              </span>
              &nbsp;
              &nbsp;
              <span
                style={{
                  color: theme.palette.primary.main,
                  fontSize: isMobile ? '28px' : '50px',
                  fontWeight: 700
                }}
              >
                Patients,
              </span>
              &nbsp;
              &nbsp;
              <span
                style={{
                  color: 'black',
                  fontSize: isMobile ? '28px' : '50px',
                  fontWeight: 700
                }}
              >
                Transforming
              </span>
              &nbsp;
              &nbsp;
              <span
                style={{
                  color: 'black',
                  fontSize: isMobile ? '28px' : '50px',
                  fontWeight: 700
                }}
              >
                Healthcare
              </span>
            </p>
          </Box>
          <Typography
            sx={{
              color: 'black',
              fontSize: '16px',
              fontWeight: 400,
              pl: 1
            }}
          >
            {`Discover a community-driven platform dedicated to providing patient support that actually works. Submit your complaints, share your story, start a fundraiser or find reliable hospital ratings & reviews from real patients online.`}
          </Typography>

          <Box
            sx={{
              display: 'flex',
              gap: isMobile ? 1 : 3,
              mt: 5, pl: 1,
              justifyContent: isMobile ? 'center' : 'flex-start'
            }}
          >
            <NButton
              bkgcolor={theme.palette.primary.main}
              textcolor='white'
              onMouseEnter={()=>setType('contact')}
              onClick={()=>setOpen2(true)}
              width='200px'
            >
              <Typography variant='paragraphbase'>
                Contact us
              </Typography>
            </NButton>
            <NButton transBg={true} bg={false}
              bordercolor={theme.palette.primary.main}
              hoverbordercolor={theme.palette.primary.main}
              onMouseEnter={()=>setType('about')}
              onClick={()=>setOpen(true)}
              width='200px'
            >
              <Typography variant='paragraphbase'>
                Our story
              </Typography>
            </NButton>
          </Box>
        </Box>
        <Box
          width={isMobile ? '100%' : '50%'} 
          mt={isMobile ? 5 : 0} 
          display={'flex'} justifyContent={isMobile ? 'center' : 'flex-end'} 
          alignItems={isMobile ? 'center' : 'flex-end'}
        >
          <img
            src='/hero-img.png'
            alt='home page image'
            style={{
              width: '500px', //'50%',
              height: 'auto',//isMobile ? '45%' : '75%'
            }}
          />
        </Box>
      </Box>

      <FramerMotion
        sx={{
          display: 'flex',
          gap: isMobile ? 1 : 4,
          width: '100%',
          height: 'auto',
          flexDirection: isMobile ? 'column' : 'row',
          py: '50px',
          px: isMobile ? '20px' : '90px',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'center',
            flexDirection: 'column',
            gap: 3,
            flex: 1
          }}
        >
          <Typography
            sx={{
              fontSize: isMobile ? '32px' : '40px',
              fontWeight: 600,
              lineHeight: 1
            }}
          >
            What We Do For You
          </Typography>
          <Typography
            sx={{
              fontSize: '16px',
              textAlign: 'left',
              fontWeight: 400
            }}
          >
            {`Our dedicated team of advocates facilitate a patient community where members feel supported, heard and empowered to make informed decisions that improve their healthcare outcomes.`}
          </Typography>
          <Typography
            sx={{
              fontSize: '16px',
              textAlign: 'left',
              fontWeight: 400
            }}
          >
            {`We collaborate with healthcare professionals, organizations and communities to drive sustainable solutions that enhance patient experiences in Nigeria.`}
          </Typography>
          <NButton
            bkgcolor={"white"}
            textcolor={theme.palette.primary.main}
            bordercolor={theme.palette.primary.main}
            hoverbordercolor={theme.palette.primary.main}
            width='250px'
            onClick={()=>console.log('hello')}
          >
            Learn More
          </NButton>
        </Box>
        <Box
          sx={{
            flex: 1,
            display: 'flex',
            justifyContent: isMobile ? 'center' : 'flex-end',
            alignItems: isMobile ? 'center' : 'flex-end'
          }}
        >
          <img
            src='/right.png'
            alt='home page image'
            style={{
              width: '500px',
              height: 'auto'
            }}
          />
        </Box>
      </FramerMotion>

      <FramerMotion
        sx={{
          display: 'flex',
          px: isMobile ? '20px' : '90px',
          backgroundColor: theme.palette.secondary.lightest,
          height: isMobile ? 'auto' : '100vh',
          alignItems: 'center',
          py: '50px',
          flexDirection: isMobile ? 'column' : 'row'
        }}
      >
        <Box
          sx={{
            flex: 1,
            display: 'flex',
            justifyContent: isMobile ? 'center' : 'flex-end',
            alignItems: isMobile ? 'center' : 'flex-end',
            mr: isMobile ? 0 : 6
          }}
        >
          <img
            src='/advocacy-img.png'
            alt='home page image'
            style={{
              width: '400px',//isMobile ? '30%' : '45%',
              height: 'auto'//isMobile ? '30%' : '100%'
            }}
          />
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            flex: 1
          }}
        >
          <Typography
            sx={{
              fontSize: isMobile ? '32px' : '50px',
              fontWeight: 700,
              lineHeight: isMobile ? 1 : 1,
              mt: isMobile ? 5 : 0
            }}
          >
            Patient Advocacy Service
          </Typography>
          <p
            style={{
              marginTop: '4px',
              lineHeight: 1.3
            }}
          >
            <span
              style={{
                fontSize: isMobile ? '20px' : '32px',
                fontWeight: 700
              }}
            >
              Are you facing
            </span>
            &nbsp;&nbsp;
            <span
              style={{
                fontSize: isMobile ? '20px' : '32px',
                fontWeight: 700,
                color: theme.palette.primary.main
              }}
            >
              any challenge with
            </span>
            &nbsp;&nbsp;
            <span
              style={{
                fontSize: isMobile ? '20px' : '32px',
                fontWeight: 700
              }}
            >
              your hospital?
            </span>
          </p>
          <Typography
            sx={{
              fontSize: '16px',
              fontWeight: 400,
              lineHeight: 1.2,
              mt: isMobile ? 4 : 4
            }}
          >
            {`Submit your patient complaints about any public or private hospital in Nigeria to make your voice heard and get your issues resolved.`}
          </Typography>
          <Box
            width='100%'
            my={isMobile ? 5 : 5}
          >
            <NButton
              width='250'
              bkgcolor={theme.palette.primary.main}
              textcolor='white'
              onClick={()=>router.push('/advocacy')}
            >
              Submit complaints
            </NButton>
          </Box>
        </Box>
      </FramerMotion>

      <FramerMotion
        sx={{
          height: 'auto',
          px: isMobile ? '20px' : '90px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          py: '50px'
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
          {`Discover patient crowdfunding campaigns that inspire you! Every donation counts, even the green hearts you give!`}
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
            See all campaigns <ArrowForward/>
          </NButton>
        </Box>
      </FramerMotion>

      <FramerMotion
        sx={{
          display: 'flex',
          px: isMobile ? '20px' : '90px',
          backgroundColor: theme.palette.primary.main,
          gap: 4,
          height: 'auto',
          py: '50px',
          alignItems: 'center',
          flexDirection: isMobile ? 'column' : 'row'
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            flex: 1
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
            Every Patient has a Story
          </Typography>
          <Typography
            sx={{
              fontSize: '16px',
              color: 'white',
              fontWeight: 400,
              lineHeight: 1.2,
              textAlign: isMobile ? 'center' : 'left',
              mb: 4, mt: 2
            }}
          >
            {`Discover inspiring patient stories from our community or share your own patient experience to encourage and educate others.`}
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
              onClick={()=>router.push('/patient-stories')}
            >
              Read more
            </NButton>
          </Box>
        </Box>
        <Box flex={1}>
          <img
            src='/patient-story.png'
            alt='home page image'
            style={{
              width: '500px',
              height: 'auto'
            }}
          />
        </Box>
      </FramerMotion>

      <FramerMotion
        sx={{
          display: 'flex',
          px: isMobile ? '20px' : '90px',
          backgroundColor: theme.palette.secondary.lighter,
          gap: isMobile ? 4 : 4,
          height: isMobile ? 'auto' : '100vh',
          mt: isMobile ? '2em' : '3em',
          py: '50px',
          alignItems: 'center',
          flexDirection: isMobile ? 'column' : 'row'
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 2, flex: 1
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
              Hospital Ratings
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
            onClick={()=>router.push('/rating-and-review')}
          >
            See Ratings
          </NButton>
        </Box>
        <Box flex={1}>
          <img
            src='/hospital-review.png'
            alt='home page image'
            style={{
              width: '400px',//isMobile ? '50%' : '40%',
              height: 'auto'//isMobile ? '60%' : '80%'
            }}
          />
        </Box>
      </FramerMotion>

      <FramerMotion
        sx={{
          height: 'auto',
          px: isMobile ? '20px' : '90px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          py: '50px'
        }}
      >
        <Typography
          sx={{
            alignSelf: 'center', mb: 2,
            fontSize: isMobile ? '32px' : '50px',
            fontWeight: 600
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
                        borderRadius: theme.borderRadius.sm,
                        cursor: 'pointer',
                        '&:hover': {
                          backgroundColor: theme.palette.secondary.lighter
                        }
                      }}
                      onClick={() => router.push(`/blog${blog.urlSlug }`)}
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
                        htmlString={isMobile ? wordBreaker(blog.content, 25) : wordBreaker(blog.content, 30)}
                      />
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
      </FramerMotion>

      <FramerMotion
        sx={{
          height: 'auto',
          px: isMobile ? '20px' : '90px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          py: '50px',
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
            fontSize: isMobile ? '40px' : '50px',
            color: '#FFCB00', alignSelf: 'center', textAlign: 'center'
          }}
        >
          Stay Informed, Stay Healthy
        </Typography>
        <Typography
          sx={{
            fontSize: '16px',
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
      </FramerMotion>

      <FramerMotion
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
      </FramerMotion>

      <FramerMotion
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: isMobile ? 'auto' : '100vh',
          px: isMobile ? '20px' : '90px',
          py: '50px',
          maxWidth: isMobile ? '768px' : '100%'
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
      </FramerMotion>
      <Footer/>
    </>
  )
}
