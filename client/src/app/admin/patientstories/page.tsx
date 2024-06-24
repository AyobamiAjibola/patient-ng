'use client';

import { NButton } from "@/app/components/PButton";
import PatientStoriesAdminTable from "@/app/components/PatientStoriesAdminTable";
import { Add, SearchOutlined } from "@mui/icons-material";
import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import { Input } from "antd";
import { useRouter } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";
import { useFetchStories } from "../hooks/patientStoriesHook/usePatientStories";

const item = [
  "All",
  "Pending review",
  "Published",
  "Rejected"
]

export default function page() {
  const theme = useTheme();
  const md = useMediaQuery(theme.breakpoints.down('md'));
  const sm = useMediaQuery(theme.breakpoints.down('sm'));
  const [currentItem, setCurrentItem] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [stories, setStories] =  useState<any>([]);
  const router = useRouter();
  const fetchStoriesMutate = useFetchStories(); 

  const filteredData =
    stories &&
    stories.filter((item: any) =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.user.firstName.toLowerCase().includes(searchQuery.toLowerCase())
    );

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    const cleanedInput = inputValue.replace(/[^a-zA-Z0-9 ]/g, '');

    setSearchQuery(cleanedInput);
  };

  const fetchStories = async () => {
    await fetchStoriesMutate.mutateAsync({}, {
        onSuccess: async(response: any) => {
          const patientData = response.results;
          if(currentItem === "All") {
            setStories(patientData)
          } else if(currentItem === "Published") {
            const filteredData = patientData.filter((stories: any) => stories.status === "published");
            setStories(filteredData)
          } else if(currentItem === "Pending review") {
            const filteredData = patientData.filter((stories: any) => stories.status === "pending");
            setStories(filteredData)
          }else if(currentItem === "Rejected") {
            const filteredData = patientData.filter((stories: any) => stories.status === "rejected");
            setStories(filteredData)
          }
        }
    })
  };

  useEffect(() => {
    fetchStories()
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
        Patient story
      </Typography>

      <Box
        sx={{
          display: 'flex',
          p: 4,
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
            {item.map((item: string, index: number) => (
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

        <Box
          sx={{
            width: '100%',
            px: 2
          }}
        >
          <PatientStoriesAdminTable
            //@ts-ignore
            data={filteredData}
          />
        </Box>
      </Box>
    </Box>
  )
}
