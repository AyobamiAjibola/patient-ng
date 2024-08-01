'use client'

import Navbar from "@/app/components/Navbar";
import { Avatar, Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import PButton, { NButton } from "../components/PButton";
import { HourglassEmpty } from "@mui/icons-material";
import { wordBreaker } from "@/lib/helper";
import { useRouter } from "next/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Mousewheel, Keyboard } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import Footer from "@/app/components/Footer";
import { useGetCrowdfundings } from "../admin/hooks/crowdFuncdingHook/useCrowdFunding";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import CrowdCard from "../components/CrowdCard";

const stories = [
  {
    title: 'Amina’s Road to Recovery',
    story: `Amina, a young mother from Kano, was diagnosed with breast cancer. The cost of chemotherapy and surgery was beyond what her family could afford.
            Feeling desperate, Amina turned to patient.ng to start a crowdfunding campaign. She shared her story honestly and vulnerably, reaching out to her
            community for help. Within weeks, donations began pouring in from friends, family, and even strangers. Through the generosity of her supporters, Amina
            raised enough money for her treatment. Today, she’s in remission and spends her time raising awareness about breast cancer in her community.`,
    image: 'model.png',
    name: 'Amina'
  },
  {
    title: 'Tunde’s Dialysis Dream',
    story: `Tunde, a young Uber driver from Lagos, needed regular dialysis treatments due to kidney failure. The costs were astronomical, and his family’s resources were
            quickly depleting. With the help of his friends, Tunde launched a crowdfunding campaign on patient.ng. The response was overwhelming. People from all over
            Nigeria contributed, sharing Tunde’s story on social media and raising awareness about his plight. In just two months, Tunde raised enough funds to cover his
            dialysis treatments for an entire year.`,
    image: 'model.png',
    name: 'Tunde'
  },
  {
    title: 'Fatima’s Fight Against Sickle Cell Disease',
    story: `Fatima, a university student in Abuja, had been battling sickle cell disease her entire life. When her condition worsened, she needed a bone marrow
            transplant, which was both risky and expensive. Her friends and family rallied around her, launching a crowdfunding campaign on her behalf on patient.ng.
            Fatima’s story resonated with many Nigerians in Diaspora, and the donations started flowing in. Local businesses, community leaders, and even her university
            contributed to her campaign. Fatima raised the necessary funds for her transplant and is currently making travel plans to India for the procedure.`,
    image: 'model.png',
    name: 'Fatima'
  },
  {
    title: 'Emeka’s Heart Surgery Miracle',
    story: `Emeka, a teenager from Enugu who loves to play football, was born with a congenital heart defect that required urgent surgery. His parents couldn’t afford
            the procedure, but they refused to give up hope. They started a crowdfunding campaign on patient.ng, sharing Emeka’s story with anyone who would listen.
            The campaign went viral on WhatsApp, with people from all walks of life donating and spreading the word. Within a few months, Emeka’s family raised the
            full amount needed for his surgery in Lagos, Nigeria. Today, Emeka is healthy and active, enjoying the childhood he almost lost.`,
    image: 'model.png',
    name: 'Emeka'
  },
  {
    title: 'Chidi’s Battle with Leukemia',
    story: `Chidi, a 34 year old father of 3 from Port Harcourt, was recently diagnosed with leukemia. The treatment costs were overwhelming, and his family was at a
            loss of options. They turned to patient.ng for help, hoping to raise enough money to save Chidi’s life. His wife shared their story, highlighting Chidi’s role as a
            young, loving father and husband. The community response was incredible. Friends, neighbors, and even strangers contributed to Chidi’s campaign.
            Fundraising events were organized at his local church which highlighted his story. In the end, Chidi raised more than enough for his treatment and is now in
            remission.`,
    image: 'model.png',
    name: 'Chidi'
  }
];

const crowdFundingWork = [
  {
    title: 'Explore',
    content: `Explore on-going patient crowdfunding campaigns to
              find one that resonates with you.`
  },
  {
    title: 'Support',
    content: `Make a donation or give a heart to help the
      fundraiser reach their goal.`
  },
  {
    title: 'Monitor',
    content: `Follow the campaign and track its progress daily.`
  },
  {
    title: 'Share',
    content: `Share the success of your contributions and celebrate
            its impact.`
  }
]

export default function CrowdFundings() {
  const theme = useTheme();
  const isMobile = useMediaQuery('(max-width: 900px)');
  const router = useRouter();
  const campaignsMutation = useGetCrowdfundings();
  const {data: session} = useSession();
  const [crowdCampaign, setCrowdCampaign] = useState<any>([]);

  useEffect(() => {
    const handleFetchData = async () => {
      await campaignsMutation.mutateAsync({},{
        onSuccess: (response: any) => {
          const crowd = response.results.filter((crowefunding: any) => crowefunding.status === 'active')
          setCrowdCampaign(crowd)
        }
      })
    }

    handleFetchData();
  },[session]);

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
            height: '100vh',
            background: theme.palette.secondary.lightest,
            display: 'flex',
            gap: 6, px: isMobile ? '20px' : '90px', py: 6,
            alignItems: 'center'
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
              Uniting Hearts, Saving Lives!
            </Typography>
            <Typography
              sx={{
                fontSize: theme.typography.labelsm.fontSize,
                lineHeight: theme.typography.labelxs.lineHeight,
                color: theme.palette.secondary.light
              }}
            >
              With no fee to start, you can ask for help, whenever
              you truly need help. Whether you are raising money
              for yourself, friends or family, our team of patient
              advocates can help your fundraiser for medical
              emergencies, critical surgeries or life-saving
              medications reach its goal successfully on patient.ng
            </Typography>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'flex-start',
                justifyContent: 'flex-start',
                width: '100%'
              }}
            >
              <PButton bg={true} transBg={false} width='200px' onClick={() => router.push('/crowdfunding/new-campaign')}>
                Start a Fundraiser
              </PButton>
            </Box>
          </Box>
          {!isMobile && (<img
            src='/crowd.png'
            alt='crowd funding image'
            style={{
              height: '80%',
              width: 500
            }}
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
            { crowdCampaign.length > 0
              ? (crowdCampaign.slice(0, 3).map((fundraiser: any, index: number) => {
                const percent = fundraiser.amountRaised 
                                  ? (+fundraiser.amountRaised/+fundraiser.amountNeeded) * 100
                                  : (0/+fundraiser.amountNeeded) * 100;

                return ( 
                  <CrowdCard
                    fundraiser={fundraiser}
                    percent={percent}
                  />
                )})
              ) : (
                <Box width={'100%'} justifyContent={'center'} alignItems={'center'} display={'flex'} flexDirection={'column'}>
                  <HourglassEmpty sx={{fontSize: '2em', color: theme.palette.border.main}}/>
                  <Typography variant='paragraphlg' color={theme.palette.border.main}>
                      No Active Crowdfunding.
                  </Typography>
                </Box>
              )
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
              lineHeight: 1.3
            }}
          >
            Impact Stories in Nigeria That Will Inspire You
          </Typography>
          <Typography
            sx={{
              fontSize: theme.typography.labelsm.fontSize,
              color: theme.palette.secondary.light,
              mb: 2
            }}
          >
            These stories remind us of the incredible impact that community support can have. Crowdfunding not only provides financial relief but also brings people
            together, fostering a sense of hope and solidarity. If you’re facing medical challenges, consider starting your own crowdfunding campaign on patient.ng. Your
            story could inspire others and bring you the support you need.
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
                      minWidth: '400px'
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
                      {story.story}
                    </Typography>
                    {/* <Box
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
                    </Box> */}
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
            See how it works
          </Typography>
          <Typography
            sx={{
              fontSize: theme.typography.labelsm.fontSize,
              color: theme.palette.secondary.light,
              mb: 2
            }}
          >
            Learn how crowdfunding on patient.ng helps support patients
            across Nigeria
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
                          minWidth: '50px', maxHeight: '50px',
                          backgroundColor: theme.palette.secondary.lightest,
                          border: `1px solid ${theme.palette.secondary.lighter}`,
                          borderRadius: theme.borderRadius.full
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
                  <NButton
                    bkgcolor={theme.palette.primary.main}
                    textcolor="white"
                    width="100%"
                    onClick={() => router.push('/crowdfunding/campaigns')}
                  >
                    <Typography>
                      Support a Campaign
                    </Typography>
                  </NButton>
                </Box>
                
              </Box>
              {!isMobile && (<Box
                sx={{
                  flex: 1,
                  mt: -8
                }}
              >
                <img
                  src='/crowed-img.jpg'
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
                Need help urgently?
              </Typography>
              <Typography
                sx={{
                  fontSize: theme.typography.labelsm.fontSize,
                  color: 'white'
                }}
              >
                Start your patient crowdfunding campaign today
              </Typography>
            </Box>
            <NButton
              bkgcolor={theme.palette.primary.main}
              textcolor={theme.palette.primary.darker}
              hovercolor="white"
              width="250px"
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
            </NButton>
          </Box>
        </Box>
      </Box>

      <Footer/>
    </>
  )
}
