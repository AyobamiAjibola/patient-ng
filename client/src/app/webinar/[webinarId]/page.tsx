'use client';

import InputField from "@/app/components/InputField";
import Navbar from "@/app/components/Navbar";
import PButton from "@/app/components/PButton";
import { Avatar, Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import capitalize from 'capitalize'

const speakers = [
  {
    name: "abayomi olowu",
    designation: "ceo"
  },
  {
    name: "Adekunle Taiwp",
    designation: "UX Designer @ Microsoft"
  }
]

export default function Webinar({ params }: any) {
  const isMobile = useMediaQuery('(max-width: 959px)');
  const theme = useTheme();
  const isLoggedIn = true;

  return (
    <>
      <Navbar/>
      <Box
        sx={{
          display: 'flex',
          gap: 4, py: 10, px: '60px'
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            width: '60%'
          }}
        >
          <Typography
            sx={{
              width: '63px',
              height: 'auto',
              px: 1,
              backgroundColor: theme.palette.background.main,
              color: 'white',
              fontSize: theme.typography.labelxs,
              borderRadius: theme.borderRadius.xs,
              mb: 3
            }}
          >
            WEBINAR
          </Typography>
          <Typography
            sx={{
              fontSize: theme.typography.h3.fontSize,
              fontWeight: theme.typography.h3.fontWeight,
              lineHeight: theme.typography.h3.lineHeight
            }}
          >
            {`I was suddenly thrust into a world of uncertainty and fear. But amidst the pain.`}
          </Typography>
          <Typography
            sx={{
              fontSize: theme.typography.labelsm.fontSize,
              color: theme.palette.secondary.light,
              mt: 7
            }}
          >
            {`My name is Slau, and I've faced more challenges in my health journey than I ever thought possible. Diagnosed with a rare autoimmune disease at the age of 25, I was suddenly thrust into a world of uncertainty and fear. But amidst the pain and confusion, I found something unexpected: strength.
              For years, I battled flare-ups, hospitalizations, and setbacks that tested my resolve. Each day felt like a marathon, with no finish line in sight. But through it all, I refused to let my illness define me. With the unwavering support of my family, friends, and medical team, I learned to embrace every hurdle as an opportunity for growth.`}
          </Typography>
          <Box
            sx={{
              width: '250px',
              height: 'auto',
              px: 2, py: 4,
              backgroundColor: theme.palette.secondary.lightest,
              border: `1px solid ${theme.palette.secondary.lighter}`,
              display: 'flex',
              flexDirection: 'column',
              gap: 3, my: 4,
              borderRadius: theme.borderRadius.sm
            }}
          >
            <Typography
              sx={{
                fontSize: theme.typography.labelsm.fontSize,
                fontWeight: theme.typography.labelsm.fontWeight
              }}
            >
              Featured speakers
            </Typography>
            {
              speakers.map((speaker: any, index: number) => (
                <Box key={index}
                  sx={{
                    display: 'flex',
                    gap: 1
                  }}
                >
                  <Avatar
                    src='/model.png'
                    alt='speaker'
                  />
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column'
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: theme.typography.labelxs.fontSize,
                        fontWeight: theme.typography.labelxs.fontWeight
                      }}
                    >
                      {capitalize.words(speaker.name)}
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: theme.typography.labelxs.fontSize,
                        color: theme.palette.secondary.light
                      }}
                    >
                      {capitalize.words(speaker.designation)}
                    </Typography>
                  </Box>
                </Box>
              ))
            }
          </Box>
          {isLoggedIn ? (
            <PButton transBg={true} bg={false} width="200px">
              Click to watch webinar
            </PButton>
            ) : (<PButton transBg={true} bg={false} width="200px">
                  Signup for free
                </PButton>
              )
          }
        </Box>
        <Box
          sx={{
            width: '40%',
            height: '400px',
            border: `1px solid ${theme.palette.secondary.lighter}`,
            borderRadius: theme.borderRadius.sm,
            display: 'flex',
            p: 4, justifyContent: 'center', alignItems: 'center',
            flexDirection: 'column'
          }}
        >
          <Typography
            sx={{
              fontSize: theme.typography.h5.fontSize,
              alignSelf: 'center',
              fontWeight: theme.typography.labelsm.fontWeight
            }}
          > 
            Watch On-Demand
          </Typography>
          <form style={{width: '100%'}}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                gap: 2, mt: 4
              }}
            >
              <Box sx={{width: '50%'}}>
                <InputField
                  label="First name"
                  isBorder={true}
                />
              </Box>
              <Box sx={{width: '50%'}}>
                <InputField
                  label="Last name"
                  isBorder={true}
                />
              </Box>
            </Box>
            <InputField
              label="Email"
              isBorder={true}
            />
            <InputField
              label="Phone number"
              isBorder={true}
            />
            <PButton transBg={false} bg={true} width='100%'>
              Submit
            </PButton>
          </form>
        </Box>
      </Box>
    </>
  )
}
