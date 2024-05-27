'use client';

import Navbar from '@/app/components/Navbar'
import PButton, { PButton2 } from '@/app/components/PButton';
import { characterBreaker, formAmount, wordBreaker } from '@/lib/helper';
import { ArrowForward, ArrowRight, DesktopWindows, LocationOn, Mic } from '@mui/icons-material';
import { Box, Button, Grid, LinearProgress, Typography, linearProgressClasses, styled, useMediaQuery, useTheme } from '@mui/material'
import Search from 'antd/es/input/Search';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Footer from '../components/Footer';

const crowdCampaign = [
  {
    image: '/crowd2.png',
    name: 'Osaze Odenwingie',
    story: `In today's digital age, managing and organizing an ever-expanding array of digital assets can be a daunting task.`,
    lastDonation: '15m ago',
    raised: '200000',
    amountNeeded: '500000',
    location: 'Ikeja, Lagos'
  },
  {
    image: '/crowd2.png',
    name: 'Osaze Odenwingie',
    story: `In today's digital age, managing and organizing an ever-expanding array of digital assets can be a daunting task.`,
    lastDonation: '15m ago',
    raised: '400000',
    amountNeeded: '500000',
    location: 'Ikeja, Lagos'
  },
  {
    image: '/crowd2.png',
    name: 'Osaze Odenwingie',
    story: `In today's digital age, managing and organizing an ever-expanding array of digital assets can be a daunting task.`,
    lastDonation: '15m ago',
    raised: '300000',
    amountNeeded: '500000',
    location: 'Ikeja, Lagos'
  },
  {
    image: '/crowd2.png',
    name: 'Osaze Odenwingie',
    story: `In today's digital age, managing and organizing an ever-expanding array of digital assets can be a daunting task.`,
    lastDonation: '15m ago',
    raised: '150000',
    amountNeeded: '500000',
    location: 'Ikeja, Lagos'
  },
  {
    image: '/crowd2.png',
    name: 'Osaze Odenwingie',
    story: `In today's digital age, managing and organizing an ever-expanding array of digital assets can be a daunting task.`,
    lastDonation: '15m ago',
    raised: '120000',
    amountNeeded: '500000',
    location: 'Ikeja, Lagos'
  },
  {
    image: '/crowd2.png',
    name: 'Osaze Odenwingie',
    story: `In today's digital age, managing and organizing an ever-expanding array of digital assets can be a daunting task.`,
    lastDonation: '15m ago',
    raised: '90000',
    amountNeeded: '500000',
    location: 'Ikeja, Lagos'
  }
];

const blogs = [
  {
    category: 'Pharmacy',
    date: '25 Apr 2023 ',
    image: '/cuisines.jpg',
    title: 'Organize your assets with a new methodology.',
    content: "In today's digital age, managing and organizing an ever-expanding array of digital assets can be a daunting task."
  },
  {
    category: 'Pharmacy',
    image: '/cuisines.jpg',
    date: '25 Apr 2023 ',
    title: 'Organize your assets with a new methodology.',
    content: "In today's digital age, managing and organizing an ever-expanding array of digital assets can be a daunting task."
  },
  {
    category: 'Pharmacy',
    image: '/cuisines.jpg',
    date: '25 Apr 2023 ',
    title: 'Organize your assets with a new methodology.',
    content: "In today's digital age, managing and organizing an ever-expanding array of digital assets can be a daunting task."
  },
  {
    category: 'Pharmacy',
    image: '/cuisines.jpg',
    date: '25 Apr 2023 ',
    title: 'Organize your assets with a new methodology.',
    content: "In today's digital age, managing and organizing an ever-expanding array of digital assets can be a daunting task."
  },
  {
    date: '22-10-2024',
    title: 'Faster ways to reach your customers and their needs.',
    content: 'In a rapidly evolving business landscape, the ability to connect with customers quickly and effectively is paramount.',
    image: '/cuisines.jpg'
  }
];

const podcasts = [
  {
      title: 'Ep 25: Method Practicing Playful Creation',
      description: `Good news, Sleep Wavers! On November 9th, Jessica will launch a brand-new podcast called Sleep Magic! In order to be prepared for her debut brand-new episode.`,
      date: 'October 27,2022',
      duration: '1hr',
      image: '/model.png',
      category: 'education',
      source: 'youtube'
  },
  {
      title: 'Ep 25: Method Practicing Playful Creation',
      description: `Good news, Sleep Wavers! On November 9th, Jessica will launch a brand-new podcast called Sleep Magic! In order to be prepared for her debut brand-new episode.`,
      date: 'October 27,2022',
      duration: '1hr',
      image: '/model.png',
      category: 'education',
      source: 'youtube'
  },
  {
      title: 'Ep 25: Method Practicing Playful Creation',
      description: `Good news, Sleep Wavers! On November 9th, Jessica will launch a brand-new podcast called Sleep Magic! In order to be prepared for her debut brand-new episode.`,
      date: 'October 27,2022',
      duration: '1hr',
      image: '/model.png',
      category: 'marketing',
      source: 'apple'
  },
  {
      title: 'Ep 25: Method Practicing Playful Creation',
      description: `Good news, Sleep Wavers! On November 9th, Jessica will launch a brand-new podcast called Sleep Magic! In order to be prepared for her debut brand-new episode.`,
      date: 'October 27,2022',
      duration: '1hr',
      image: '/model.png',
      category: 'marketing',
      source: 'soundcloud'
  },
  {
      title: 'Ep 25: Method Practicing Playful Creation',
      description: `Good news, Sleep Wavers! On November 9th, Jessica will launch a brand-new podcast called Sleep Magic! In order to be prepared for her debut brand-new episode.`,
      date: 'October 27,2022',
      duration: '1hr',
      image: '/model.png',
      category: 'development',
      source: 'google'
  },
  {
      title: 'Ep 25: Method Practicing Playful Creation',
      description: `Good news, Sleep Wavers! On November 9th, Jessica will launch a brand-new podcast called Sleep Magic! In order to be prepared for her debut brand-new episode.`,
      date: 'October 27,2022',
      duration: '1hr',
      image: '/model.png',
      category: 'web design',
      source: 'spotify'
  },
  {
      title: 'Ep 25: Method Practicing Playful Creation',
      description: `Good news, Sleep Wavers! On November 9th, Jessica will launch a brand-new podcast called Sleep Magic! In order to be prepared for her debut brand-new episode.`,
      date: 'October 27,2022',
      duration: '1hr',
      image: '/model.png',
      category: 'development',
      source: 'youtube'
  }
];

const webinars = [
  {
      categories: ["Nutrition and Diet", "Physical Fitness and Exercise"],
      title: "Healthy Eating Habits for Busy Lifestyles.",
      description: `My name is Slau, and I've faced more challenges in my health journey than I ever thought possible. Diagnosed with a rare autoimmune disease at the age of 25, I was suddenly thrust into a world of uncertainty and fear. But amidst the pain and confusion, I found something unexpected: strength.`
  },
  {
      categories: ["Nutrition and Diet", "Physical Fitness and Exercise"],
      title: "Healthy Eating Habits for Busy Lifestyles.",
      description: `My name is Slau, and I've faced more challenges in my health journey than I ever thought possible. Diagnosed with a rare autoimmune disease at the age of 25, I was suddenly thrust into a world of uncertainty and fear. But amidst the pain and confusion, I found something unexpected: strength.`
  },
  {
      categories: ["Nutrition and Diet", "Physical Fitness and Exercise"],
      title: "Healthy Eating Habits for Busy Lifestyles.",
      description: `My name is Slau, and I've faced more challenges in my health journey than I ever thought possible. Diagnosed with a rare autoimmune disease at the age of 25, I was suddenly thrust into a world of uncertainty and fear. But amidst the pain and confusion, I found something unexpected: strength.`
  },
  {
      categories: ["Nutrition and Diet", "Physical Fitness and Exercise"],
      title: "Healthy Eating Habits for Busy Lifestyles.",
      description: `My name is Slau, and I've faced more challenges in my health journey than I ever thought possible. Diagnosed with a rare autoimmune disease at the age of 25, I was suddenly thrust into a world of uncertainty and fear. But amidst the pain and confusion, I found something unexpected: strength.`
  },
  {
      categories: ["Nutrition and Diet", "Physical Fitness and Exercise"],
      title: "Healthy Eating Habits for Busy Lifestyles.",
      description: `My name is Slau, and I've faced more challenges in my health journey than I ever thought possible. Diagnosed with a rare autoimmune disease at the age of 25, I was suddenly thrust into a world of uncertainty and fear. But amidst the pain and confusion, I found something unexpected: strength.`
  },
  {
      categories: ["Nutrition and Diet", "Physical Fitness and Exercise"],
      title: "Healthy Eating Habits for Busy Lifestyles.",
      description: `My name is Slau, and I've faced more challenges in my health journey than I ever thought possible. Diagnosed with a rare autoimmune disease at the age of 25, I was suddenly thrust into a world of uncertainty and fear. But amidst the pain and confusion, I found something unexpected: strength.`
  }
];

const stories = [
  {
    content: 'The rise of remote work has been nothing short of transformative, with technology advancements and changing workplace dynamics enabling individuals to',
    name: 'Charlie Avila'
  },
  {
    content: 'The rise of remote work has been nothing short of transformative, with technology advancements and changing workplace dynamics enabling individuals to',
    name: 'Charlie Avila'
  },
  {
    content: 'The rise of remote work has been nothing short of transformative, with technology advancements and changing workplace dynamics enabling individuals to',
    name: 'Charlie Avila'
  },
  {
    content: 'The rise of remote work has been nothing short of transformative, with technology advancements and changing workplace dynamics enabling individuals to',
    name: 'Charlie Avila'
  },
  {
    content: 'The rise of remote work has been nothing short of transformative, with technology advancements and changing workplace dynamics enabling individuals to',
    name: 'Charlie Avila'
  },
  {
    content: 'The rise of remote work has been nothing short of transformative, with technology advancements and changing workplace dynamics enabling individuals to',
    name: 'Charlie Avila'
  },
  {
    content: 'The rise of remote work has been nothing short of transformative, with technology advancements and changing workplace dynamics enabling individuals to',
    name: 'Charlie Avila'
  },
  {
    content: 'The rise of remote work has been nothing short of transformative, with technology advancements and changing workplace dynamics enabling individuals to',
    name: 'Charlie Avila'
  },
  {
    content: 'The rise of remote work has been nothing short of transformative, with technology advancements and changing workplace dynamics enabling individuals to',
    name: 'Charlie Avila'
  },
  {
    content: 'The rise of remote work has been nothing short of transformative, with technology advancements and changing workplace dynamics enabling individuals to',
    name: 'Charlie Avila'
  },
  {
    content: 'The rise of remote work has been nothing short of transformative, with technology advancements and changing workplace dynamics enabling individuals to',
    name: 'Charlie Avila'
  }
]

export default function HomePage() {
  const theme = useTheme();
  const router = useRouter();
  const isMobile = useMediaQuery('(max-width: 900px)');
  const isLoggedIn = true;

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

  return (
    <>
      <Navbar />
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
              top: isMobile ? 100 : 170
            }}
          >
            <Typography 
              variant={isMobile ? 'labelsm' : 'h2'}
              sx={{
                color: 'white',
                mb: isMobile ? 1 : 4,
                width: isMobile ? '100%' : '50%'
              }}
            >
              Empowering Patients, Transforming Healthcare.
            </Typography>
            <Typography
              variant={isMobile ? 'paragraphxxs' : 'paragraphsm'}
              sx={{
                color: theme.palette.secondary.lighter,//'white',
                width: isMobile ? '100%' : '70%'
              }}
            >
              We believe in putting patients at the center of their healthcare journey. Discover a community-driven platform dedicated to providing support, resources, and advocacy for patients across Nigeria.
            </Typography>
            <Box
              sx={{
                display: 'flex',
                gap: 3, mt: isMobile ? 2 : 6
              }}
            >
              <PButton transBg={false} bg={true}>
                <Typography variant={isMobile ? 'paragraphxxs' : 'paragraphbase'}>
                  Contact Us
                </Typography>
              </PButton>
              <PButton transBg={true} bg={false}>
                <Typography variant={isMobile ? 'paragraphxxs' : 'paragraphbase'}>
                  About Us
                </Typography>
              </PButton>
            </Box>
          </Box>
        </Box>

        <Box
          sx={{
            height: isMobile ? '250px' : '700px',
            mx: isMobile ? '20px' : '90px',
            position: 'absolute',
            top: isMobile ? '14rem' : '35rem'
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
            const percent = (+fundraiser.raised/+fundraiser.amountNeeded) * 100;

            return ( 
            <Box key={index}
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
                  src={fundraiser.image}
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
                    >
                      <LocationOn
                        sx={{
                          color: theme.palette.primary.main, 
                          fontSize: '16px'
                        }}
                      /> { fundraiser.location }
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: theme.typography.labelsm.fontSize,
                        fontWeight: theme.typography.labelxs.fontWeight,
                        my: 1
                      }}
                    >
                      { characterBreaker(fundraiser.name, 20)}
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
                    { wordBreaker(fundraiser.story, 10) }...
                  </Typography>
                 
                  <Box>
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
                        Last donation
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: theme.typography.labelxs.fontSize,
                          fontWeight: theme.typography.labelxs.fontWeight
                        }}
                      >
                        { fundraiser.lastDonation }
                      </Typography>
                    </Box>
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
                        {formAmount(+fundraiser.raised)} raised
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
                    <Typography onClick={() => router.push(`/crowdfunding/${index}`)}
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
          onClick={() => router.push('/crowdfunding/campaigns')}
        >
          <PButton2 transBg={false} bg={false} width='250px'>
            <Typography sx={{color: 'black'}}>
              See all crowdfunding <ArrowForward/>
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

        <Box
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
              blogs.slice(0, 2).map((blog, index) => (
                <Box key={index}
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
                      src={blog.image}
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
                    {blog.date}
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: theme.typography.labellg.fontSize,
                      fontWeight: theme.typography.labelxl.fontWeight
                    }}
                  >
                    {blog.title}
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: theme.typography.labelxs.fontSize,
                      color: theme.palette.primary.main
                    }}
                  >
                    Learn more <ArrowForward sx={{fontSize: '16px'}}/>
                  </Typography>
                </Box>
              ))
            }
          </Box>

          {!isMobile && (<Box
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
                src='model.png'
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
                25 Apr 2023
              </Typography>
              <Typography
                sx={{
                  fontSize: theme.typography.labellg.fontSize,
                  fontWeight: theme.typography.labelxl.fontWeight
                }}
              >
                Maximize User Reach and Engagement with the Latest and Most Advanced Tools Available on the Market.
              </Typography>
              <Typography
                sx={{
                  fontSize: theme.typography.labelxs.fontSize,
                  color: theme.palette.secondary.light
                }}
              >
                {wordBreaker(`In a rapidly evolving business landscape, the ability to connect with customers quickly and effectively is paramount. In today's digital age, managing and organizing an ever-expanding array of digital assets can be a daunting task.`, 30)}...
              </Typography>
              <Typography
                sx={{
                  fontSize: theme.typography.labelxs.fontSize,
                  color: theme.palette.primary.main
                }}
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
              blogs.slice(2, 4).map((blog, index) => (
                <Box key={index}
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
                      src={blog.image}
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
                    {blog.date}
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: theme.typography.labellg.fontSize,
                      fontWeight: theme.typography.labelxl.fontWeight
                    }}
                  >
                    {blog.title}
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: theme.typography.labelxs.fontSize,
                      color: theme.palette.primary.main
                    }}
                  >
                    Learn more <ArrowForward/>
                  </Typography>
                </Box>
              ))
            }
          </Box>)}
        </Box>

        <Box 
          sx={{
            display: 'flex', justifyContent: 'center',
            mb: 4, mt: isMobile ? 0 : 4
          }}
          onClick={() => router.push('/blog')}
        >
          <PButton2 transBg={false} bg={false} width='250px'>
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
              color: theme.palette.primary.main
            }}
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
            podcasts.slice(0, 4).map((podcast, index) => (
              <Box key={index}
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
                    src={podcast.image}
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
                              width: '12px',
                              height: '12px'
                          }}
                      />
                      <Typography
                          sx={{
                              fontSize: theme.typography.labelxxs.fontSize,
                              color: theme.palette.secondary.light
                          }}
                      >
                          {podcast.date}
                      </Typography>
                    </Box>
                    <Box sx={{display: 'flex', gap: 1, alignItems: 'center'}}>
                      <img
                          src='/podcast-timer.png'
                          alt='podcast timer icon'
                          style={{
                              width: '12px',
                              height: '12px'
                          }}
                      />
                      <Typography
                          sx={{
                              fontSize: theme.typography.labelxxs.fontSize,
                              color: theme.palette.secondary.light
                          }}
                      >
                          {podcast.duration}
                      </Typography>
                    </Box>
                  </Box>

                  <Typography
                    sx={{
                      fontSize: theme.typography.labellg.fontSize,
                      fontWeight: theme.typography.labellg.fontWeight,
                      whiteSpace: 'pre-wrap'
                    }}
                  >
                    {podcast.title}
                  </Typography>

                  <PButton transBg={false} bg={true} width='50%'>
                    <ArrowRight/>
                    <Typography 
                      sx={{
                        fontSize: theme.typography.labelxs.fontSize
                      }}
                    >
                      Play Episode
                    </Typography>
                  </PButton>
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
              color: theme.palette.primary.main
            }}
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
            webinars.slice(0, 4).map((webinar, index) => (
              <Box key={index}
                sx={{
                  borderRadius: theme.borderRadius.sm,
                  // border: `1px solid #fff`,
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
                    {webinar.title}
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
                    {`${characterBreaker(webinar.description, 100)}...`}
                  </Typography>

                  {!isLoggedIn ? 
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
              stories.slice(0, 3).map((story, index) => (
                <Box key={index}
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
                    "{wordBreaker(story.content, 20)}..."
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: theme.typography.labelxs.fontSize,
                      fontWeight: theme.typography.labelsm.fontWeight,
                      whiteSpace: 'pre-wrap'
                    }}
                  >
                    -{story.name}
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: theme.typography.labelxs.fontSize,
                      fontWeight: theme.typography.labelsm.fontWeight,
                      color: theme.palette.primary.main
                    }}
                  >
                    Read full story <ArrowForward sx={{fontSize: '13px'}}/>
                  </Typography>
                </Box> 
              ))
            }
          </Box>)}

          {(!isMobile && stories.length > 7) &&(<Box
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
              stories.slice(4, 7).map((story, index) => (
                <Box key={index}
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
                    "{wordBreaker(story.content, 20)}..."
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: theme.typography.labelxs.fontSize,
                      fontWeight: theme.typography.labelsm.fontWeight,
                      whiteSpace: 'pre-wrap'
                    }}
                  >
                    -{story.name}
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: theme.typography.labelxs.fontSize,
                      fontWeight: theme.typography.labelsm.fontWeight,
                      color: theme.palette.primary.main
                    }}
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
              stories.slice(7, 10).map((story, index) => (
                <Box key={index}
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
                    "{wordBreaker(story.content, 20)}..."
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: theme.typography.labelxs.fontSize,
                      fontWeight: theme.typography.labelsm.fontWeight,
                      whiteSpace: 'pre-wrap'
                    }}
                  >
                    -{story.name}
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: theme.typography.labelxs.fontSize,
                      fontWeight: theme.typography.labelsm.fontWeight,
                      color: theme.palette.primary.main
                    }}
                  >
                    Read full story <ArrowForward sx={{fontSize: '13px'}}/>
                  </Typography>
                </Box> 
              ))
            }
          </Box>)}
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
            <Button
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
