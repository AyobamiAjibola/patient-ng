'use client';

import CrowdfundingAdminTable from "@/app/components/CrowdfundingAdminTable";
import { SearchOutlined } from "@mui/icons-material";
import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import { Input } from "antd";
import { ChangeEvent, useEffect, useState } from "react";
import { useGetCrowdfundings } from "../hooks/crowdFuncdingHook/useCrowdFunding";
import { useSession } from "next-auth/react";

const items = [
  "Pending",
  "Active",
  "Inactive",
  "Done"
]

export default function page() {
  const theme = useTheme();
  const md = useMediaQuery(theme.breakpoints.down('md'));
  const sm = useMediaQuery(theme.breakpoints.down('sm'));
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [currentItem, setCurrentItem] = useState<string>('Pending');
  const [crowdfunding, setCrowdfunding] = useState<any>([]);
  const getCrowedFundingMutation = useGetCrowdfundings();
  const {data: session} = useSession();

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
    if(getCrowedFundingMutation.isSuccess) {
      if(currentItem === "Pending") {
        const filteredData = getCrowedFundingMutation.data?.results?.filter((crowdCampaign) => crowdCampaign.status === "pending");
        setCrowdfunding(filteredData)
      } else if(currentItem === "Active") {
        const filteredData = getCrowedFundingMutation.data?.results?.filter((crowdCampaign) => crowdCampaign.status === "active");
        setCrowdfunding(filteredData)
      } else if(currentItem === "Inactive") {
        const filteredData = getCrowedFundingMutation.data?.results?.filter((crowdCampaign) => crowdCampaign.status === "inactive");
        setCrowdfunding(filteredData)
      } else {
        const filteredData = getCrowedFundingMutation.data?.results?.filter((crowdCampaign) => crowdCampaign.status === "done");
        setCrowdfunding(filteredData)
      }
    }
  },[currentItem, getCrowedFundingMutation.isSuccess]);

  useEffect(() => {
    const handleGetCrowd = async () => {
      await getCrowedFundingMutation.mutateAsync({})
    }
    handleGetCrowd()
  },[session]);

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
            px: 2, mb: 2,
            flexDirection: sm ? 'column' : 'row'
          }}
        >
          <Box 
            sx={{
              width: sm ? "100%" : "70%",
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
          <Box sx={{width: sm ? "100%" : "30%"}}>
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
