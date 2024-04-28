'use client'

import Navbar from "@/app/components/Navbar";
import { Box, LinearProgress, Typography, linearProgressClasses, styled, useMediaQuery, useTheme } from "@mui/material";
import PButton from "../components/PButton";
import Image from "next/image";
import { LocationOn } from "@mui/icons-material";
import { characterBreaker, formAmount, wordBreaker } from "@/lib/helper";
import { useRouter } from "next/navigation";

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

export default function CrowdFundings() {
  const theme = useTheme();
  const isMobile = useMediaQuery('(max-width: 959px)');
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
              gap: 6, px: '64px', py: 6
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
                <PButton bg={true} transBg={false} width='200px'>
                  Start a Crowdfunding
                </PButton>
                <Typography
                  sx={{
                    fontSize: theme.typography.labelxs.fontSize,
                    fontWeight: theme.typography.labelxs.fontWeight,
                    color: theme.palette.primary.main
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
              px: '64px', py: 6
            }}
          >
            <Box
              sx={{
                display: 'flex',
                justifyContent: isMobile ? 'flex-start' : 'space-between',
                alignItems: 'center',
                flexDirection: isMobile ? 'column' : 'row'
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 1
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
              <PButton bg={true} transBg={false} width='200px'>
                See all Campaigns
              </PButton>
            </Box>
            <Box
              sx={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: 4, mt: '60px'
              }}
            >
              { crowdCampaign.slice(0, 4).map((fundraiser: any, index: number) => {
                const percent = (+fundraiser.raised/+fundraiser.amountNeeded) * 100;

                return ( 
                <Box key={index}
                  sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      height: '450px',
                      width: '250px',
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
                        flexDirection: 'column'
                      }}
                    >
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
                      <Typography
                        sx={{
                          fontSize: theme.typography.labelxs.fontSize,
                          lineHeight: theme.typography.labelxs.lineHeight,
                          color: theme.palette.secondary.light
                        }}
                      >
                        { wordBreaker(fundraiser.story, 10) }...
                      </Typography>
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
                    <Box
                      sx={{
                        flex: 1, mt: 3,
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
        </Box>
    </>
  )
}
