'use client'

import { useGetCrowdfundings } from "@/app/admin/hooks/crowdFuncdingHook/useCrowdFunding";
import Navbar from "@/app/components/Navbar"
import CrowdCard from "@/app/components/CrowdCard";
import { HourglassEmpty } from "@mui/icons-material";
import { Box, Typography, useMediaQuery, useTheme } from "@mui/material"
import { Button } from "antd";
import Search from "antd/es/input/Search";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const containerVariants = {
    hidden: {
      opacity: 0,
      y: 50
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 1 }
    }
}

export default function page() {
  const theme = useTheme();
  const isMobile = useMediaQuery('(max-width: 900px)');
  const [searchQuery, setSearchQuery] = useState('');
  const [crowdCampaign, setCrowdCampaign] = useState<any>([]);
  const campaignsMutation = useGetCrowdfundings();
  const {data: session} = useSession();

  const MotionBox = motion(Box);

  const handleSearchChange = (e: any) => {
    const inputValue = e.target.value;
    const cleanedInput = inputValue.replace(/[^a-zA-Z0-9 ]/g, '');

    setSearchQuery(cleanedInput);
  };

  const filteredData =
  crowdCampaign &&
  crowdCampaign.filter((item: any) =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.amountNeeded.toLowerCase().includes(searchQuery)
  );

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
        <MotionBox
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            sx={{
                display: 'flex',
                flexDirection: 'column',
                pb: 6, px: isMobile ? '20px' : '90px',
                pt: 8
            }}
        >
            <Typography variant="h4">
                Campaigns
            </Typography>
            <Box sx={{width: isMobile ? '100%' : '30%', alignSelf: 'flex-end', mb: 5, mr: '3%'}}>
                <Search
                    placeholder="Search campaigns"
                    allowClear
                    enterButton={<Button style={{ backgroundColor: theme.palette.primary.main, color: 'white' }}>Search</Button>}
                    size="large"
                    onChange={handleSearchChange}
                    value={searchQuery}
                />
            </Box>
            <Box
                sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: isMobile ? 4 : 2, justifyContent: 'center'
                }}
            >
                { filteredData.length > 0
                    ? (filteredData.map((fundraiser: any, index: number) => {
                        const percent = fundraiser.raised 
                                    ? (+fundraiser.raised/+fundraiser.amountNeeded) * 100
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
        </MotionBox>
    </>
  )
}
