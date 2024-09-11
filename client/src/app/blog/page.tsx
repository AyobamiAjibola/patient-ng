'use client';

import Navbar from '@/app/components/Navbar'
import { characterBreaker, wordBreaker } from '@/lib/helper';
import Footer from '@/app/components/Footer';
import { Box, Grid, Typography, useMediaQuery, useTheme } from '@mui/material'
import { Tag } from 'antd';
import Search from 'antd/es/input/Search';
import { useRouter } from 'next/navigation';
import { ChangeEvent, useEffect, useState } from 'react';
import Pagination from '../components/Pagination';
import { HourglassEmpty } from '@mui/icons-material';
import { useGetBlogCategories, useGetBlogs } from '../admin/hooks/blogHook/useBlog';
import { useSession } from 'next-auth/react';
import HtmlToText from '../components/HtmlToText';
import FramerMotion, { FramerMotion2 } from '../components/FramerMotion';
import BlogCard from '../components/BlogCard';

export default function Blog() {
  const theme = useTheme();
  const router = useRouter();
  const isMobile = useMediaQuery('(max-width: 900px)');
  const [blogs, setBlogs] = useState<any>([]);
  const [blogCategories, setBlogCategories] = useState<any>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const getBlogsMutation = useGetBlogs();
  const getBLogsCategory = useGetBlogCategories();
  const {data: session} = useSession();

  const filteredData =
  blogs &&
  blogs.filter((item: any) =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.publisher.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.category.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const itemsPerPage = filteredData.length ? 10 : filteredData.length;
  const totalPages = Math.ceil(filteredData.length / itemsPerPage) || 1;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, filteredData.length);
  const currentData = filteredData.slice(startIndex, endIndex);

  const handlePageChange = (newPage: any) => {
    setCurrentPage(newPage);
  };

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    const cleanedInput = inputValue.replace(/[^a-zA-Z0-9 ]/g, '');

    setSearchQuery(cleanedInput);
  };

  useEffect(() => {
    const handleFetchBlogsData = async () => {
      await getBlogsMutation.mutateAsync({}, {
        onSuccess: async (response: any) => {
          const filtered = await response.results.filter((data: any) => data.status === 'publish')
          setBlogs(filtered)
        }
      });

      await getBLogsCategory.mutateAsync({}, {
        onSuccess: (response: any) => {
          setBlogCategories(response.results)
        }
      });
    }

    handleFetchBlogsData();
  },[session]);

  return (
    <>
      <Navbar />
      <FramerMotion2
        sx={{
          height: 'auto', 
          width: '100%',
          px: isMobile ? '20px' : '90px'
        }}
      >
        <Box className="w-[100%] flex flex-col justify-center items-center" sx={{pt: 6, pb: 5, height: '80vh'}}>
          <Typography 
            sx={{
              fontSize: theme.typography.labelsm.fontSize,
              color: theme.palette.primary.main,
              mb: 4, mt: 6
            }}
          >
            SUPPORT STARTS HERE
          </Typography>
          <Typography 
            sx={{
              fontSize: isMobile ? theme.typography.h4.fontSize : theme.typography.h2.fontSize,
              color: theme.palette.secondary.main,
              mb: isMobile ? -1 : -3,
              fontWeight: theme.typography.h2.fontWeight
            }}
          >
            Our Latest Articles 
          </Typography>
          <Typography 
            sx={{
              fontSize: isMobile ? theme.typography.h4.fontSize : theme.typography.h2.fontSize,
              color: theme.palette.secondary.main,
              fontWeight: theme.typography.h2.fontWeight
            }}
          >
            and Blog Posts.
          </Typography>
          <Typography 
            sx={{
              fontSize: isMobile ? theme.typography.labelsm.fontSize : theme.typography.labellg.fontSize,
              color: theme.palette.secondary.light,
              mt: 4, textAlign: 'center',
              width: isMobile ? '100%' : '70%'
            }}
          >
            {`We are trusted source for information, support, and advocacy on patient care in Nigeria.
                Here, we empower patient caregivers and advocates with valuable insights on navigating 
                healthcare systems, raising funds for medical expenses, and amplifying patient voices 
                through stories of hope and inspiration.
            `}
          </Typography>
        </Box>

        <Grid item 
          sx={{
            mx: isMobile ? '20px' : '60px', mt: 5,
            display: 'flex',
            justifyContent: 'space-between',
            flexDirection: isMobile ? 'column' : 'row', 
            alignItems: 'center',
            gap: 4
          }}
        >
          <Box display={'flex'} width={isMobile ? '100%' : '70%'} gap={3}>
            <Typography
              sx={{
                fontWeight: theme.typography.labelxl.fontWeight
              }}
            >
              Tags:
            </Typography>
            <Box 
              sx={{
                width: '100%', 
                display: 'flex', 
                flexDirection: 'row', 
                gap: 5,
                overflowX: 'scroll',
                whiteSpace: 'nowrap',
                '&::-webkit-scrollbar': {
                  display: 'none',
                },
                scrollbarWidth: 'none',
              }}
            >
              <Box display={'flex'} alignItems={'center'} gap={2}>
                <Box 
                  sx={{
                    minWidth: 70, 
                    width: 'auto',
                    height: 'auto', 
                    display: 'flex', 
                    justifyContent: 'center', 
                    flexDirection: 'row',
                    cursor: 'pointer',
                    backgroundColor: theme.palette.secondary.lighter,
                    borderRadius: theme.borderRadius.md,
                    '&:hover': {
                      backgroundColor: theme.palette.secondary.light,
                      color: 'white'
                    }
                  }}
                  onClick={() => setSearchQuery('')}
                >
                  <Typography variant='paragraphsm' className='capitalize'>
                    All
                  </Typography>
                </Box>
                {blogCategories.map((category: any, index: number) => (
                  <Box sx={{
                      minWidth: 70, 
                      width: 'auto',
                      height: 'auto', 
                      display: 'flex', 
                      justifyContent: 'center', 
                      flexDirection: 'row',
                      cursor: 'pointer',
                      backgroundColor: theme.palette.secondary.lighter,
                      borderRadius: theme.borderRadius.md,
                      '&:hover': {
                        backgroundColor: theme.palette.secondary.light,
                        color: 'white'
                      }
                    }}
                    onClick={() => setSearchQuery(category.name)}
                    key={index}
                  >
                    <Typography variant='paragraphsm' className='capitalize'>
                      { category.name }
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Box>
          </Box>

          <Box sx={{width: isMobile ? '100%' : '30%'}}>
            <Search
              placeholder="Search"
              allowClear
              size="large"
              onChange={handleSearchChange}
            />
          </Box>
        </Grid>

        <FramerMotion
          threshold={0.1}
          sx={{
            width: '100%',
            height: 'auto',
            display: 'flex', gap: 4, my: 6,
            justifyContent: 'center',
            alignItems: 'center', flexDirection: 'column',
          }}
        >
          <Typography
            sx={{
              fontWeight: 600,
              fontSize: theme.typography.h4.fontSize
            }}
          >
            Blog Posts
          </Typography>
          {currentData.length > 0 
            ? (<Box
                sx={{
                  flexWrap: isMobile ? 'normal' : 'wrap',
                  display: 'flex', width: '100%',
                  gap: 3,
                  justifyContent: isMobile ? 'normal' : 'center',
                  mt: '10px',
                  overflowX: isMobile ? 'scroll' : 'unset',
                  whiteSpace: isMobile ? 'nowrap' : 'normal',
                  '&::-webkit-scrollbar': {
                    display: 'none',
                  },
                  scrollbarWidth: 'none'
                }}
              >
                {currentData.map((blog: any, index: number) => (
                  <BlogCard blog={blog} />
                ))}

              </Box>
            ) : (
              <Box width={'100%'} justifyContent={'center'} alignItems={'center'} display={'flex'} flexDirection={'column'}>
                <HourglassEmpty sx={{fontSize: '2em', color: theme.palette.border.main}}/>
                <Typography variant='paragraphlg' color={theme.palette.border.main}>
                  No Data
                </Typography>
              </Box>
            )
          }
        </FramerMotion>
        <Box
          sx={{
              width: '100%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              mt: 5
          }}
          >
          {blogs.length !== 0 && (<Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />)}
        </Box>
      </FramerMotion2>
      <Footer/>
    </>
  )
}
