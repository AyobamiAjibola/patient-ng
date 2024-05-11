'use client'

import Navbar from "@/app/components/Navbar"
import { characterBreaker, formAmount, wordBreaker } from "@/lib/helper";
import { LocationOn } from "@mui/icons-material";
import { Box, LinearProgress, Typography, linearProgressClasses, styled, useMediaQuery, useTheme } from "@mui/material"
import { Button } from "antd";
import Search from "antd/es/input/Search";
import { useRouter } from "next/navigation";
import { useState } from "react";

const crowdCampaign = [
    {
      image: '/crowd2.png',
      name: 'Kira John',
      story: `In today's digital age, managing and organizing an ever-expanding array of digital assets can be a daunting task.`,
      lastDonation: '15m ago',
      raised: '200000',
      amountNeeded: '500000',
      location: 'Ikeja, Lagos'
    },
    {
      image: '/crowd2.png',
      name: 'Osaze Kudus',
      story: `In today's digital age, managing and organizing an ever-expanding array of digital assets can be a daunting task.`,
      lastDonation: '15m ago',
      raised: '400000',
      amountNeeded: '500000',
      location: 'Ikeja, Lagos'
    },
    {
      image: '/crowd2.png',
      name: 'Audu Kelvin',
      story: `In today's digital age, managing and organizing an ever-expanding array of digital assets can be a daunting task.`,
      lastDonation: '15m ago',
      raised: '300000',
      amountNeeded: '500000',
      location: 'Ikeja, Lagos'
    },
    {
      image: '/crowd2.png',
      name: 'Paul Benji',
      story: `In today's digital age, managing and organizing an ever-expanding array of digital assets can be a daunting task.`,
      lastDonation: '15m ago',
      raised: '150000',
      amountNeeded: '500000',
      location: 'Ikeja, Lagos'
    },
    {
      image: '/crowd2.png',
      name: 'Kaffy Odenwingie',
      story: `In today's digital age, managing and organizing an ever-expanding array of digital assets can be a daunting task.`,
      lastDonation: '15m ago',
      raised: '120000',
      amountNeeded: '900000',
      location: 'Ikeja, Lagos'
    },
    {
      image: '/crowd2.png',
      name: 'Kudz Odenwingie',
      story: `In today's digital age, managing and organizing an ever-expanding array of digital assets can be a daunting task.`,
      lastDonation: '15m ago',
      raised: '90000',
      amountNeeded: '300000',
      location: 'Ikeja, Lagos'
    }
];

export default function page() {
  const theme = useTheme();
  const isMobile = useMediaQuery('(max-width: 900px)');
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');

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

  const handleSearchChange = (e: any) => {
    const inputValue = e.target.value;
    const cleanedInput = inputValue.replace(/[^a-zA-Z0-9 ]/g, '');

    setSearchQuery(cleanedInput);
  };

  const filteredData =
  crowdCampaign &&
  crowdCampaign.filter((item: any) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.amountNeeded.toLowerCase().includes(searchQuery)
  );

  return (
    <>
        <Navbar/>
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                py: 6, px: '64px'
            }}
        >
            <Box sx={{width: isMobile ? '100%' : '30%', alignSelf: 'flex-end', mb: 5, mr: '3%'}}>
                <Search
                    placeholder="Search campaigns"
                    allowClear
                    enterButton={<Button style={{ backgroundColor: theme.palette.primary.main, color: 'white' }}>Search</Button>}
                    size="large"
                    // onSearch={onSearch}
                    onChange={handleSearchChange}
                    value={searchQuery}
                />
                {/* <Search/> */}
            </Box>
            <Box
                sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: 2, justifyContent: 'center'
                }}
            >
                { filteredData.map((fundraiser: any, index: number) => {
                    const percent = (+fundraiser.raised/+fundraiser.amountNeeded) * 100;

                    return ( 
                    <Box key={index}
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            height: '450px',
                            width: '23%',
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
    </>
  )
}
