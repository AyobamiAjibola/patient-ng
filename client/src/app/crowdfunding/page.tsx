'use client'

import Navbar from "@/app/components/Navbar";
import { Avatar, Box, LinearProgress, Typography, linearProgressClasses, styled, useMediaQuery, useTheme } from "@mui/material";
import PButton from "../components/PButton";
import Image from "next/image";
import { LocationOn } from "@mui/icons-material";
import { characterBreaker, formAmount, wordBreaker } from "@/lib/helper";
import { useRouter } from "next/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Mousewheel, Keyboard } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import Footer from "@/app/components/Footer";

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

const stories = [
  {
    title: 'Cancer Survivor',
    story: `Sarah Johnson, diagnosed with stage 4 cancer, received vital support from our community. Together, we raised NGN50,000, enabling her to access life-saving treatment and inspiring countless others.`,
    image: 'model.png',
    name: 'Abayomi Olowu'
  },
  {
    title: 'Cancer Survivor',
    story: `Sarah Johnson, diagnosed with stage 4 cancer, received vital support from our community. Together, we raised NGN50,000, enabling her to access life-saving treatment and inspiring countless others.`,
    image: 'model.png',
    name: 'Abayomi Olowu'
  },
  {
    title: 'Cancer Survivor',
    story: `Sarah Johnson, diagnosed with stage 4 cancer, received vital support from our community. Together, we raised NGN50,000, enabling her to access life-saving treatment and inspiring countless others.`,
    image: 'model.png',
    name: 'Abayomi Olowu'
  },
  {
    title: 'Cancer Survivor',
    story: `Sarah Johnson, diagnosed with stage 4 cancer, received vital support from our community. Together, we raised NGN50,000, enabling her to access life-saving treatment and inspiring countless others.`,
    image: 'model.png',
    name: 'Abayomi Olowu'
  },
  {
    title: 'Cancer Survivor',
    story: `Sarah Johnson, diagnosed with stage 4 cancer, received vital support from our community. Together, we raised NGN50,000, enabling her to access life-saving treatment and inspiring countless others.`,
    image: 'model.png',
    name: 'Abayomi Olowu'
  }
];

const crowdFundingWork = [
  {
    title: 'Choose a Campaign',
    content: `Explore diverse health initiatives and select the campaign you're passionate about supporting.`
  },
  {
    title: 'Make a Donation',
    content: `Support the cause with a donation of any amount and help us reach our fundraising goal.`
  },
  {
    title: 'Track Progress',
    content: `Monitor the impact of your donation in real-time and see how it's making a difference.`
  },
  {
    title: 'See Impact',
    content: `Discover the tangible results of your support and the transformative changes it's bringing about.`
  }
]

export default function CrowdFundings() {
  const theme = useTheme();
  const isMobile = useMediaQuery('(max-width: 900px)');
  const router = useRouter();

  const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
    height: 7,
    borderRadius: 5,
    [`&.${linearProgressClasses.colorPrimary}`]: {
      backgroundColor: theme.palette.secondary.lighter //[theme.palette.mode === 'light' ? 200 : 800],
    },
    [`& .${linearProgressClasses.bar}`]: {
      borderRadius: 5,
      backgroundColor: theme.palette.primary.main//theme.palette.mode === 'light' ? '#1a90ff' : '#308fe8',
    },
  }));

  return (
    <>
      <Navbar/>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: 'auto'
        }}
      >
        <Box
          sx={{
            height: 'auto',
            background: theme.palette.secondary.lightest,
            display: 'flex',
            gap: 6, px: isMobile ? '20px' : '90px', py: 6
          }}
        >
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'column',
              gap: 5
            }}
          >
            <Typography
              sx={{
                fontSize: theme.typography.h3.fontSize,
                fontWeight: theme.typography.h3.fontWeight,
                lineHeight: theme.typography.h3.lineHeight
              }}
            >
              Uniting Hearts, Healing Lives: Together, We Make Miracles Happen
            </Typography>
            <Typography
              sx={{
                fontSize: theme.typography.labelsm.fontSize,
                lineHeight: theme.typography.labelxs.lineHeight,
                color: theme.palette.secondary.light
              }}
            >
              Empower healing across Nigeria with a single click. Your support turns challenges into triumphs, making quality healthcare a reality for all.
            </Typography>
            <Box
              sx={{
                display: 'flex',
                gap: 3, alignItems: 'center'
              }}
            >
              <PButton bg={true} transBg={false} width='200px' onClick={() => router.push('/crowdfunding/new-campaign')}>
                Start a Crowdfunding
              </PButton>
              <Typography onClick={() => router.push('/crowdfunding/campaigns')}
                sx={{
                  fontSize: theme.typography.labelxs.fontSize,
                  fontWeight: theme.typography.labelxs.fontWeight,
                  color: theme.palette.primary.main,
                  cursor: 'pointer'
                }}
              >
                See Campaigns
              </Typography>
            </Box>
          </Box>
          {!isMobile && (<Image
            src='/crowd.png'
            alt='crowd funding image'
            width={500}
            height={450}
          />)}
        </Box>

        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            py: 6, px: isMobile ? '20px' : '90px'
          }}
        >
          <Box
            sx={{
              display: 'flex',
              justifyContent: isMobile ? 'center' : 'space-between',
              alignItems: 'center',
              flexDirection: isMobile ? 'column' : 'row'
            }}
          >
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 1,
                mb: isMobile ? 4 : 0,
                width: '100%'
              }}
            >
              <Typography
                sx={{
                  fontSize: theme.typography.h4.fontSize,
                  fontWeight: theme.typography.h4.fontWeight
                }}
              >
                Featured Campaigns
              </Typography>
              <Typography
                sx={{
                  fontSize: theme.typography.labelsm.fontSize,
                  color: theme.palette.secondary.light
                }}
              >
                Discover impactful health causes and contribute to campaigns making a difference.
              </Typography>
            </Box>
            <Box 
              sx={{
                width: '100%',
                display: 'flex',
                justifyContent: isMobile? 'flex-start' : 'flex-end',
                pr: isMobile ? 0 : '80px'
              }}
            >
              <PButton bg={true} transBg={false} width='200px'
                onClick={() => router.push('/crowdfunding/campaigns')}
              >
                See all Campaigns
              </PButton>
            </Box>
          </Box>

          <Box
            sx={{
              display: 'flex',
              gap: 4, mt: '60px',
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

        </Box>

        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 4, mt: '60px',
            flexDirection: 'column',
            backgroundColor: theme.palette.secondary.lighter,
            height: 'auto', py: 6, px: isMobile ? '20px' : '90px'
          }}
        >
          <Typography
            sx={{
              fontSize: theme.typography.h4.fontSize,
              fontWeight: theme.typography.h4.fontWeight,
              lineHeight: '1px'
            }}
          >
            Impact Stories
          </Typography>
          <Typography
            sx={{
              fontSize: theme.typography.labelsm.fontSize,
              color: theme.palette.secondary.light,
              mb: 2
            }}
          >
            See how your contributions have made a difference
          </Typography>
          
          <Swiper
            slidesPerView={isMobile ? 2 : 4}
            spaceBetween={isMobile ? 10 : 15}
            mousewheel={true}
            keyboard={true}
            cssMode={true}
            // navigation={isMobile ? false : true}
            modules={[Navigation, Mousewheel, Keyboard]}
            navigation={{
              prevEl: '.swiper-button-prev',
              nextEl: '.swiper-button-next',
            }}
            className="h-[auto] mySwiper gap-3 w-[100%]"
          >
            <div 
              className="swiper-button-prev" 
              style={{
                color: theme.palette.primary.main
              }}
            />
            <div className="swiper-button-next"
              style={{
                color: theme.palette.primary.main
              }}
            />
              {
                stories.map((story, index) => (
                  <SwiperSlide key={`${index}`}
                    className="bg-[white] shadow-md p-4 h-[auto] mb-6"
                    style={{
                      borderRadius: theme.borderRadius.sm,
                      backgroundColor: 'white',
                      display: 'flex', gap: 10,
                      flexDirection: 'column',
                      minWidth: '300px'
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: theme.typography.labelsm.fontSize,
                        fontWeight: theme.typography.labelsm.fontWeight
                      }}
                    >
                      {story.title}
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: theme.typography.labelxs.fontSize,
                        color: theme.palette.secondary.light
                      }}
                    >
                      {isMobile ? wordBreaker(story.story, 20) : wordBreaker(story.story, 40)}...
                    </Typography>
                    <Box
                      sx={{
                        display: 'flex',
                        gap: 2,
                        alignItems: 'center'
                      }}
                    >
                      <Avatar
                        src={story.image}
                        alt="story image"
                        sx={{
                          width: 30,
                          height: 30
                        }}
                      />
                        <Typography
                        sx={{
                          fontSize: theme.typography.labelxxs.fontSize,
                          fontWeight: theme.typography.labelsm.fontWeight
                        }}
                      >
                        {story.name}
                      </Typography>
                    </Box>
                  </SwiperSlide>
                ))
              }
          </Swiper>
        </Box>

        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 4, mt: '60px',
            flexDirection: 'column',
            height: 'auto', pt: 6, pl: isMobile ? '20px' : '90px'
          }}
        >
            <Typography
            sx={{
              fontSize: theme.typography.h4.fontSize,
              fontWeight: theme.typography.h4.fontWeight,
              lineHeight: '1px'
            }}
          >
            Let’s see how it works
          </Typography>
          <Typography
            sx={{
              fontSize: theme.typography.labelsm.fontSize,
              color: theme.palette.secondary.light,
              mb: 2
            }}
          >
            Learn seehow crowdfunding helps fund critical health initiatives.
          </Typography>

          <Box
            sx={{
              display: 'flex',
              gap: 3, flexDirection: 'column'
            }}
          >
            <Box
              sx={{
                display: 'flex',
                gap: isMobile ? 2 : 5
              }}
            >
              <Box sx={{width: isMobile ? '100%' : '50%'}}>
                {
                  crowdFundingWork.map((data, index) => (
                    <Box
                      key={index}
                      sx={{
                        display: 'flex',
                        gap: isMobile ? 2 : 5, mb: '30px'
                      }}
                    >
                      <Box
                        sx={{
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                          width: isMobile ? '60px' : '60px', height: isMobile ? '30px' : '50px',
                          backgroundColor: theme.palette.secondary.lightest,
                          border: `1px solid ${theme.palette.secondary.lighter}`,
                          borderRadius: '50%'
                        }}
                      >
                        <Typography
                          sx={{
                            fontWeight: theme.typography.labelsm.fontWeight,
                            fontSize: theme.typography.labelsm.fontSize
                          }}
                        >
                          {index + 1}
                        </Typography>
                      </Box>
                      <Box
                        sx={{
                          display: 'flex',
                          flexDirection: 'column',
                          pr: isMobile ? 3 : 0
                        }}
                      >
                        <Typography
                          sx={{
                            fontSize: isMobile ? theme.typography.labellg.fontSize : theme.typography.labelxl.fontSize,
                            fontWeight: theme.typography.labellg.fontWeight
                          }}
                        >
                          {data.title}
                        </Typography>
                        <Typography
                          sx={{
                            fontSize: isMobile ? theme.typography.labelsm.fontSize : theme.typography.labellg.fontSize,
                            color: theme.palette.secondary.light
                          }}
                        >
                          {data.content}
                        </Typography>
                      </Box>
                    </Box>
                  ))
                }
                <Box sx={{width: '200px', mt: isMobile ? '50px' : '70px', ml: isMobile ? '60px' : '80px'}}>
                  <PButton transBg={false} bg={true} width="100%"
                    onClick={() => router.push('/crowdfunding/campaigns')}
                  >
                    <Typography>
                      Support a Campaign
                    </Typography>
                  </PButton>
                </Box>
                
              </Box>
              {!isMobile && (<Box
                sx={{
                  flex: 1
                }}
              >
                <img
                  src='/crowdImg.png'
                  alt='campain'
                  style={{
                    width: '100%',
                    height: '100%'
                  }}
                />
              </Box>)}
            </Box>
          </Box>
        </Box>

        <Box sx={{px: isMobile ? '20px' : '90px', py: 6}}>
          <Box
            sx={{
              display: 'flex',
              p: 5,
              backgroundColor: theme.palette.primary.darker,
              width: '100%', height: 'auto',
              borderRadius: theme.borderRadius.md,
              justifyContent: isMobile ? 'flex-start' : 'space-between',
              flexDirection: isMobile ? 'column' : 'row',
              gap: 2
            }}
          >
            <Box>
              <Typography
                sx={{
                  fontSize: theme.typography.h5.fontSize,
                  fontWeight: theme.typography.h5.fontWeight,
                  color: 'white'
                }}
              >
                Start your own campaign
              </Typography>
              <Typography
                sx={{
                  fontSize: theme.typography.labelsm.fontSize,
                  color: 'white'
                }}
              >
                Have a health-related cause? Start your crowdfunding campaign today!
              </Typography>
            </Box>
            <PButton transBg={false} bg={true} width="250px"
              onClick={() => router.push('/crowdfunding/new-campaign')}
            >
              <Typography 
                sx={{
                  color: 'black',
                  '&:hover': {
                    color: 'white'
                  }
                }}
              >
                Get started
              </Typography>
            </PButton>
          </Box>
        </Box>
      </Box>

      <Footer/>
    </>
  )
}
