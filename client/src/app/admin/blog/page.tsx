'use client';

import BlogAdminTable from "@/app/components/BlogAdminTable";
import { NButton } from "@/app/components/PButton";
import UsersAdminTable from "@/app/components/UsersAdminTable";
import { Add, SearchOutlined } from "@mui/icons-material";
import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import { Input } from "antd";
import { useRouter } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";
import { useGetBlogs } from "../hooks/blogHook/useBlog";
import { useSession } from "next-auth/react";

const item = [
  "All",
  "Published",
  "Draft",
  "Archived"
]

export default function page() {
  const theme = useTheme();
  const md = useMediaQuery(theme.breakpoints.down('md'));
  const sm = useMediaQuery(theme.breakpoints.down('sm'));
  const [currentItem, setCurrentItem] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [blogs, setBlogs] =  useState<any>([]);
  const router = useRouter();
  const getBlogsMutation = useGetBlogs();
  const {data: session} = useSession();
  const [blogData, setBlogData] = useState<any>([]);

  const filteredData =
    blogs &&
    blogs.filter((item: any) =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.publisher.toLowerCase().includes(searchQuery.toLowerCase())
    );

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    const cleanedInput = inputValue.replace(/[^a-zA-Z0-9 ]/g, '');

    setSearchQuery(cleanedInput);
  };

  useEffect(() => {
    if(currentItem === "All") {
      setBlogs(blogData)
    } else if(currentItem === "Published") {
      const filteredData = blogData.filter((blogs: any) => blogs.status === "publish");
      setBlogs(filteredData)
    } else if(currentItem === "Draft") {
      const filteredData = blogData.filter((blog: any) => blog.status === "draft");
      setBlogs(filteredData)
    }else if(currentItem === "Archived") {
      const filteredData = blogData.filter((blog: any) => blog.status === "archived");
      setBlogs(filteredData)
    }
  },[currentItem]);

  useEffect(() => {
    const fetchBlogs = async () => {
      await getBlogsMutation.mutateAsync({}, {
        onSuccess: (response) => {
          setBlogData(response.results)
        }
      });
    }

    fetchBlogs();
  },[session]);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        p: 4
      }}
    >
      <Box mb={4}
        sx={{
          display: 'flex',
          flexDirection: sm ? 'column' : 'row',
          justifyContent: sm ? 'flex-start' : 'space-between',
          alignItems: sm ? 'flex-start' : 'center'
        }}
      >
        <Typography variant={ md ? "h5" : "h4" }>
          Blog
        </Typography>
        <NButton 
          textcolor="white" 
          bkgcolor={theme.palette.primary.main} 
          onClick={() => router.push('/admin/blog/new-blog')}
        >
          <Add/> New blog post
        </NButton>
      </Box>

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
          <BlogAdminTable
            //@ts-ignore
            data={filteredData}
          />
        </Box>
      </Box>
    </Box>
  )
}
