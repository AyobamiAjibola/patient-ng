'use client'

import InputField from "@/app/components/InputField";
import MModal from "@/app/components/Modal";
import Navbar from "@/app/components/Navbar";
import PButton from "@/app/components/PButton";
import { formAmount } from "@/lib/helper";
import { Person, Reply } from "@mui/icons-material";
import { Avatar, Box, LinearProgress, Typography, linearProgressClasses, styled, useMediaQuery, useTheme } from "@mui/material";
import { useState } from "react";

const donations = [
  {
    name: 'Abayomi Olowu',
    amount: '50000'
  },
  {
    name: 'Abayomi Olowu',
    amount: '10000'
  },
  {
    name: 'Anonymous',
    amount: '20000'
  },
  {
    name: 'Abayomi Olowu',
    amount: '10000'
  },
  {
    name: 'Anonymous',
    amount: '20000'
  }
]

const amounts = [
  "500", "1000", "5000", "10000", "20000"
]

export default function CrowdFunding() {
  const theme = useTheme();
  const percent = (+100000/+500000) * 100;
  const isMobile = useMediaQuery('(max-width: 900px)');
  const [open, setOpen] = useState<boolean>(false);
  const [value, setValue] = useState<string>('');
  const [showDonations, setShowDonations] = useState<boolean>(true);

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

  const handleCloseModal = () => {
    setValue('');
    setOpen(false);
    setShowDonations(true);
  };

  const handleDonateNow = () => {
    setShowDonations(false);
    setOpen(true)
  }

  return (
    <>
        <Navbar/>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            px: isMobile ? '20px' : '64px', py: 4, gap: 4
          }}
        >
          <Typography
            sx={{
              fontSize: theme.typography.h4.fontSize,
              fontWeight: theme.typography.h4.fontWeight
            }}
          >
            {`Save ${'Osaze Odewingie'}`}
          </Typography>
          <Box
            sx={{
              display: 'flex',
              flexDirection: isMobile ? 'column' : 'row',
              gap: 4
            }}
          >
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                width: isMobile ? '100%' : '70%'
              }}
            >
              <Box
                sx={{
                  border: `1px solid ${theme.palette.secondary.lighter}`,
                  borderRadius: theme.borderRadius.sm,
                  height: isMobile ? '500px' : '600px', mb: 4
                }}
              >
                <img
                  src='/crowd2.png'
                  alt='campaign image'
                  crossOrigin="anonymous"
                  style={{
                    width: '100%',
                    height: isMobile ? '70%' : '90%',
                    borderTopLeftRadius: theme.borderRadius.sm,
                    borderTopRightRadius: theme.borderRadius.sm
                  }}
                />
                <Box
                  sx={{
                    height: isMobile ? '30%' : '10%', width: '100%',
                    backgroundColor: theme.palette.secondary.lightest,
                    alignItems: 'center',
                    display: 'flex', px: 4, gap: 2,
                    borderBottomLeftRadius: theme.borderRadius.sm,
                    borderBottomRightRadius: theme.borderRadius.sm,
                    flexDirection: isMobile ? 'column' : 'row'
                  }}
                >
                  <Avatar
                    src='/model.png'
                    alt='campain organized image'
                    style={{
                      width: isMobile ? '45px' : '30px',
                      height: isMobile ? '45px' : '30px',
                      marginTop: isMobile ? '10px' : '0px'
                    }}
                  />
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      flexDirection: isMobile ? 'column' : 'row',
                      gap: 1
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: theme.typography.labelsm.fontSize,
                        fontWeight: theme.typography.labelsm.fontWeight,
                        textAlign: isMobile ? 'center' : 'left'
                      }}
                    >
                      Abayomi Olowu
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: theme.typography.labelsm.fontSize,
                        color: theme.palette.secondary.light,
                        textAlign: isMobile ? 'center' : 'left'
                      }}
                    >
                      {`is organising a fundraiser on behalf of ${'Osaze Odemwinge'}`}
                    </Typography>
                  </Box>
                  
                </Box>
              </Box>
              <Typography
                sx={{
                  fontSize: theme.typography.labelsm.fontSize,
                  color: theme.palette.secondary.light,
                  lineHeight: theme.typography.labelsm.lineHeight
                }}
              >
                {`The rise of remote work has been nothing short of transformative, with technology advancements and changing workplace dynamics enabling individuals to work from anywhere in the world. While remote work offers enticing benefits such as flexibility, increased autonomy, and a better work-life balance, it's essential to consider if going remote is the right choice for you. In this article, we'll explore the advantages and challenges of remote work to help you make an informed decision. The rise of remote work has been nothing short of transformative, with technology advancements and changing workplace dynamics enabling individuals to work from anywhere in the world. While remote work offers enticing benefits such as flexibility, increased autonomy, and a better work-life balance, it's essential to consider if going remote is the right choice for you. In this article, we'll explore the advantages and challenges of remote work to help you make an informed decision. The rise of remote work has been nothing short of transformative, with technology advancements and changing workplace dynamics enabling individuals to work from anywhere in the world. While remote work offers enticing benefits such as flexibility, increased autonomy, and a better work-life balance, it's essential to consider if going remote is the right choice for you. In this article, we'll explore the advantages and challenges of remote work to help you make an informed decision.`}
              </Typography>
            </Box>
            <Box
              sx={{
                display: 'flex',
                width: isMobile ? '100%' : '30%',
                height: 'auto',
                maxHeight: '550px',
                p: 4, flexDirection: 'column',
                border: `1px solid ${theme.palette.secondary.lighter}`,
                borderRadius: theme.borderRadius.sm
              }}
            >
              <Typography
                sx={{
                  fontSize: theme.typography.labelxs.fontSize,
                  mb: 4
                }}
              >
                Created 2days ago  
              </Typography>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1, mb: 2
                }}
              >
                <Typography
                  sx={{
                    fontSize: theme.typography.labelxs.fontSize,
                    fontWeight: theme.typography.labelsm.fontWeight
                  }}
                >
                    {formAmount(+100000)} raised
                </Typography>
                <Typography
                  sx={{
                    fontSize: theme.typography.labelxs.fontSize,
                    color: theme.palette.secondary.light
                  }}
                >
                    of {formAmount(+500000)}
                </Typography>
              </Box>
              <BorderLinearProgress variant="determinate" value={percent} />
              <Typography
                sx={{
                  fontSize: theme.typography.labelxs.fontSize,
                  color: theme.palette.secondary.light,
                  mb: 4, mt: 1
                }}
              >
                200 donations
              </Typography>
              <Box sx={{display: 'flex', flexDirection: 'column', gap: 3}}>
                <PButton transBg={false} bg={true} width='100%'
                  onClick={handleDonateNow}
                >
                  <Typography
                     sx={{
                      fontSize: theme.typography.labelsm.fontSize,
                      fontWeight: theme.typography.labelsm.fontWeight
                    }}
                  >
                    Donate now
                  </Typography>
                </PButton>
                <PButton transBg={true} bg={false} width='100%'>
                  <Reply sx={{color: 'black', mr: 1, mb: 1, fontSize: '18px'}}/>
                  <Typography
                    sx={{
                      fontSize: theme.typography.labelsm.fontSize,
                      color: theme.palette.secondary.light,
                      fontWeight: theme.typography.labelsm.fontWeight
                    }}
                  >
                    Share
                  </Typography>
                </PButton>
              </Box>

              <Typography
                sx={{
                  color: theme.palette.secondary.light,
                  mt: 5, mb: 3,
                  fontSize: theme.typography.labelxs.fontSize
                }}
              >
                DONATIONS
              </Typography>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 3
                }}
              >
                {
                  donations.slice(0, 3).map((donation: any, index: number) => (
                    <Box key={index}
                      sx={{
                        display: 'flex',
                        gap: 2
                      }}
                    >
                      <Avatar
                        alt='donation'
                        sx={{
                          width: '40px',
                          height: '40px'
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
                            fontSize: theme.typography.labelsm.fontSize,
                            fontWeight: theme.typography.labelxs.fontWeight
                          }}
                        >
                          {donation.name}
                        </Typography>
                        <Typography
                          sx={{
                            fontSize: theme.typography.labelxs.fontSize,
                            color: theme.palette.secondary.light
                          }}
                        >
                          {formAmount(+donation.amount)}
                        </Typography>
                      </Box>
                    </Box>
                  ))
                }

                <Typography onClick={() => setOpen(true)}
                  sx={{
                    color: theme.palette.primary.main,
                    fontSize: theme.typography.labelxs.fontSize,
                    fontWeight: theme.typography.labelsm.fontWeight,
                    mt: 2,
                    cursor: 'pointer'
                  }}
                >
                  See all donations
                </Typography>
              </Box>
            </Box>
          </Box>
          <MModal onClose={handleCloseModal} open={open} width={'30%'}>
            <Box
              sx={{
                px: 4, pb: 2,
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              { showDonations && (<>
                  <Box sx={{display: 'flex', gap: 1, alignItems: 'center'}}>
                    <Person sx={{color: theme.palette.primary.main}}/>
                    <Typography
                      sx={{
                        fontSize: theme.typography.labellg.fontSize,
                        fontWeight: theme.typography.labellg.fontWeight
                      }}
                    >
                      Donations ({`200`})
                    </Typography>
                  </Box>

                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 3,
                      mt: 4
                    }}
                  >
                    {
                      donations.map((donation: any, index: number) => (
                        <Box key={index}
                          sx={{
                            display: 'flex',
                            gap: 2
                          }}
                        >
                          <Avatar
                            alt='donation'
                            sx={{
                              width: '40px',
                              height: '40px'
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
                                fontSize: theme.typography.labelsm.fontSize,
                                fontWeight: theme.typography.labelxs.fontWeight
                              }}
                            >
                              {donation.name}
                            </Typography>
                            <Typography
                              sx={{
                                fontSize: theme.typography.labelxs.fontSize,
                                color: theme.palette.secondary.light
                              }}
                            >
                              {formAmount(+donation.amount)}
                            </Typography>
                          </Box>
                        </Box>
                      ))
                    }
                  </Box>
                </>
              )}

              <Box 
                sx={{
                  border: `1px solid ${theme.palette.secondary.lighter}`,
                  backgroundColor: theme.palette.secondary.lightest,
                  p: 2, mt: 4,
                  borderRadius: theme.borderRadius.sm
                }}
              >
                <Typography
                  sx={{
                    fontSize: theme.typography.labelsm.fontSize,
                    fontWeight: theme.typography.labelsm.fontWeight,
                    mb: 1
                  }}
                >
                  DONATE NOW
                </Typography>
                <Box
                  sx={{
                    display: 'flex',
                    gap: 1,
                    alignItems: 'center'
                  }}
                >
                  <Box sx={{width: '80%'}}>
                    <InputField
                      placeholder="Input an amount to donate"
                      isBorder={true}
                      onChange={(e) => setValue(e.target.value)}
                      value={value}
                    />
                  </Box>
                  <PButton transBg={false} bg={true} width={'20%'}>
                    <Typography 
                      sx={{
                        fontSize: theme.typography.labelsm.fontSize,
                        fontWeight: theme.typography.labelsm.fontWeight
                      }}
                    >
                      Donate
                    </Typography>
                  </PButton>
                </Box>
                <Box sx={{display: 'flex', gap: 2, width: '100%', mt: 2}}>
                  {
                    amounts.map((amount, index) => (
                      <Box key={index} onClick={() => setValue(amount)}
                        sx={{
                          border: `1px solid ${theme.palette.border.main}`,
                          backgroundColor: theme.palette.secondary.lightest,
                          width: '20%', height: '30px',
                          '&:hover': {
                            backgroundColor: theme.palette.primary.main
                          },
                          cursor: 'pointer',
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                          borderRadius: theme.borderRadius.sm
                        }}
                      >
                        <Typography 
                          sx={{
                            fontSize: theme.typography.labelxs.fontSize,
                            '&:hover': {
                              color: 'white'
                            },
                          }}
                        >
                          {amount}
                        </Typography>
                      </Box>
                    ))
                  }
                </Box>
              </Box>
            </Box>
          </MModal>
        </Box>
    </>
  )
}
