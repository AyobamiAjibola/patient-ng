'use client';

import CrowdfundingAdminTable from "@/app/components/CrowdfundingAdminTable";
import { SearchOutlined } from "@mui/icons-material";
import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import { Input } from "antd";
import { ChangeEvent, useEffect, useState } from "react";

const crowdCampaign = [
  {
    date: "23 Oct 2023",
    title: "Save Odenwingie Osaze",
    status: "Inactive",
    fundraiserFor: "Someone else",
    createdBy: 'Kira John',
    story: `In today's digital age, managing and organizing an ever-expanding array of digital assets can be a daunting task.`,
    lastDonation: '15m ago',
    raised: '200000',
    amountNeeded: '500000',
    location: 'Ikeja, Lagos'
  },
  {
    date: "23 Oct 2023",
    title: "Save Odenwingie Osaze",
    status: "Active",
    fundraiserFor: "Someone else",
    createdBy: 'Osaze Kudus',
    story: `In today's digital age, managing and organizing an ever-expanding array of digital assets can be a daunting task.`,
    lastDonation: '15m ago',
    raised: '400000',
    amountNeeded: '500000',
    location: 'Ikeja, Lagos'
  },
  {
    date: "23 Oct 2023",
    title: "Save Odenwingie Osaze",
    status: "Active",
    fundraiserFor: "Someone else",
    createdBy: 'Audu Kelvin',
    story: `In today's digital age, managing and organizing an ever-expanding array of digital assets can be a daunting task.`,
    lastDonation: '15m ago',
    raised: '300000',
    amountNeeded: '500000',
    location: 'Ikeja, Lagos'
  },
  {
    date: "23 Oct 2023",
    title: "Save Odenwingie Osaze",
    status: "Inactive",
    fundraiserFor: "Charity",
    createdBy: 'Paul Benji',
    story: `In today's digital age, managing and organizing an ever-expanding array of digital assets can be a daunting task.`,
    lastDonation: '15m ago',
    raised: '150000',
    amountNeeded: '500000',
    location: 'Ikeja, Lagos'
  },
  {
    date: "23 Oct 2023",
    title: "Save Odenwingie Osaze",
    status: "Pending",
    fundraiserFor: "Self",
    createdBy: 'Kaffy Odenwingie',
    story: `In today's digital age, managing and organizing an ever-expanding array of digital assets can be a daunting task.`,
    lastDonation: '15m ago',
    raised: '120000',
    amountNeeded: '900000',
    location: 'Ikeja, Lagos'
  },
  {
    date: "23 Oct 2023",
    title: "Save Odenwingie Osaze",
    status: "Pending",
    fundraiserFor: "Charity",
    createdBy: 'Kudz Odenwingie',
    story: `In today's digital age, managing and organizing an ever-expanding array of digital assets can be a daunting task.`,
    lastDonation: '15m ago',
    raised: '90000',
    amountNeeded: '300000',
    location: 'Ikeja, Lagos'
  }
];

const items = [
  "Pending",
  "Active",
  "Inactive"
]

export default function page() {
  const theme = useTheme();
  const md = useMediaQuery(theme.breakpoints.down('md'));
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [currentItem, setCurrentItem] = useState<string>('Pending');
  const [crowdfunding, setCrowdfunding] = useState<any>([]);

  const filteredData =
    crowdfunding &&
    crowdfunding.filter((item: any) =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      item.amountNeeded.includes(searchQuery) ||
      item.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.createdBy.toLowerCase().includes(searchQuery.toLowerCase())
    );

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    const cleanedInput = inputValue.replace(/[^a-zA-Z0-9 ]/g, '');

    setSearchQuery(cleanedInput);
  };

  useEffect(() => {
    if(currentItem === "Pending") {
      const filteredData = crowdCampaign.filter((crowdCampaign) => crowdCampaign.status === "Pending");
      setCrowdfunding(filteredData)
    } else if(currentItem === "Active") {
      const filteredData = crowdCampaign.filter((crowdCampaign) => crowdCampaign.status === "Active");
      setCrowdfunding(filteredData)
    } else if(currentItem === "Inactive") {
      const filteredData = crowdCampaign.filter((crowdCampaign) => crowdCampaign.status === "Inactive");
      setCrowdfunding(filteredData)
    }
  },[currentItem]);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        p: 4
      }}
    >
      <Typography variant={ md ? "h5" : "h4" } mb={4}>
        Crowdfunding
      </Typography>

      <Box
        sx={{
          display: 'flex',
          p: 1,
          border: `1px solid ${theme.palette.secondary.lighter}`,
          bgcolor: theme.palette.background.default,
          height: 'auto',
          borderRadius: theme.borderRadius.sm,
          mt: 1,
          flexDirection: 'column'
        }}
      >
        <Box
          sx={{
            display: 'flex',
            width: '100%',
            gap: 4, mt: 2,
            alignItems: 'center',
            px: 2, mb: 2
          }}
        >
          <Box 
            sx={{
              width: "70%",
              display: 'flex',
              gap: 4
            }}
          >
            {items.map((item: string, index: number) => (
              <Typography variant={ currentItem === item ? "labelsm" : "paragraphsm"} 
                key={index}
                onClick={() => setCurrentItem(item)}
                sx={{
                  borderBottom: currentItem === item ? `2px solid ${theme.palette.primary.main}` : 'none',
                  color: currentItem === item
                    ? theme.palette.primary.main
                    : theme.palette.secondary.light,
                  cursor: 'pointer',
                  height: '1.6rem'
                }}
              >
                {item}
              </Typography>
            ))}
          </Box>
          <Box sx={{width: "30%"}}>
            <Input
              size="large" 
              placeholder="Search" 
              prefix={<SearchOutlined sx={{color: theme.palette.secondary.lighter}}/>} 
              onChange={handleSearchChange}
            />
          </Box>
        </Box>

        <CrowdfundingAdminTable
          //@ts-ignore
          data={filteredData}
        />
      </Box>
    </Box>
  )
}
