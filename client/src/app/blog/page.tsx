'use client';

import Navbar from '@/app/components/Navbar'
import { wordBreaker } from '@/lib/helper';
import Footer from '@/app/components/Footer';
import { Box, Grid, Typography, useMediaQuery, useTheme } from '@mui/material'
import { Button } from 'antd';
import Search from 'antd/es/input/Search';
import { useRouter } from 'next/navigation';

const categories = ["cat1", "cat2", "cat3", "cat4"];

const blog = [
  {
    date: '22-10-2024',
    title: 'Faster ways to reach your customers and their needs.',
    content: 'In a rapidly evolving business landscape, the ability to connect with customers quickly and effectively is paramount.',
    image: '/cuisines.jpg'
  },
  {
    date: '22-10-2024',
    title: 'Faster ways to reach your customers and their needs.',
    content: 'In a rapidly evolving business landscape, the ability to connect with customers quickly and effectively is paramount.',
    image: '/cuisines.jpg'
  },
  {
    date: '22-10-2024',
    title: 'Faster ways to reach your customers and their needs.',
    content: 'In a rapidly evolving business landscape, the ability to connect with customers quickly and effectively is paramount.',
    image: '/cuisines.jpg'
  }
]

const latest = [
  {
    category: 'Pharmacy',
    image: '/cuisines.jpg',
    title: 'Organize your assets with a new methodology.',
    content: "In today's digital age, managing and organizing an ever-expanding array of digital assets can be a daunting task."
  },
  {
    category: 'Pharmacy',
    image: '/cuisines.jpg',
    title: 'Organize your assets with a new methodology.',
    content: "In today's digital age, managing and organizing an ever-expanding array of digital assets can be a daunting task."
  },
  {
    category: 'Pharmacy',
    image: '/cuisines.jpg',
    title: 'Organize your assets with a new methodology.',
    content: "In today's digital age, managing and organizing an ever-expanding array of digital assets can be a daunting task."
  },
  {
    category: 'Pharmacy',
    image: '/cuisines.jpg',
    title: 'Organize your assets with a new methodology.',
    content: "In today's digital age, managing and organizing an ever-expanding array of digital assets can be a daunting task."
  }
]

export default function Blog() {
  const theme = useTheme();
  const router = useRouter();
  const isMobile = useMediaQuery('(max-width: 900px)');
  const bodyContent = "In today's digital age, managing and organizing an ever-expanding array of digital assets can be a daunting task."
  
  return (
    <>
      <Navbar />
      <Box 
        sx={{
          height: 'auto', 
          width: '100%',
          px: isMobile ? '20px' : '90px'
        }}
      >
        <Box className="w-[100%] h-auto flex flex-col justify-center items-center" sx={{pt: 8, pb: 5}}>
          <Typography 
            sx={{
              fontSize: theme.typography.labelsm.fontSize,
              color: theme.palette.primary.main,
              mb: 4
            }}
          >
            1% OF THE INDUSTRY
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
            We’ve been told it is possible to revolutionize the payment industry. We have not reinvented the wheel, we decided to build upon it - successfully.
          </Typography>
        </Box>

          <Grid item 
            sx={{
              mx: isMobile ? '20px' : '60px', mt: 5,
              display: 'flex',
              justifyContent: 'flex-start',
              flexDirection: isMobile ? 'column' : 'row', 
              alignItems: 'center',
              gap: isMobile ? 4 : 0 
            }}
          >
            <Box 
              sx={{
                width: isMobile ? '100%' : '75%', 
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
              <Typography
                sx={{
                  fontWeight: theme.typography.labelxl.fontWeight
                }}
              >
                Tags:
              </Typography>
              {categories.map((category, index) => (
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
                    '&:hover': {backgroundColor: theme.palette.secondary.light,}
                  }}
                  key={index}
                >
                  <Typography>
                    { category }
                  </Typography>
                </Box>
              ))}
            </Box>

            <Box sx={{width: isMobile ? '100%' : '25%'}}>
              <Search
                placeholder="Search"
                allowClear
                enterButton={<Button style={{ backgroundColor: theme.palette.primary.main, color: 'white' }}>Search</Button>}
                size="large"
                // onSearch={onSearch}
              />
            </Box>
          </Grid>

        <Grid item
          sx={{
            width: '100%',
            height: 'auto',
            backgroundColor: theme.palette.secondary.lightest,
            display: 'flex', gap: 4, mt: isMobile ? 2 : 6
          }}
        >
          <Box 
            sx={{
              width: isMobile ? '100%' : '50%',
              height: 'auto',
              backgroundColor: "transparent",
              ml: isMobile ? '20px' : '60px', mt: '40px', mb: '40px'
            }}
          >
            <Box
              sx={{
                width: '100%',
                height: '350px',
                backgroundColor: theme.palette.secondary.lighter
              }}
            >
              <img
                src='/cuisines.jpg'
                alt='cuisine'
                style={{
                  width: '100%',
                  height: '100%'
                }}
              />
            </Box>
            <Typography sx={{fontWeight: theme.typography.labelsm.fontWeight, mt: 4}}>
              25 Apr 2023 
            </Typography>
            <Typography onClick={() => router.push(`/blog/1`)}
              sx={{
                fontWeight: theme.typography.labelsm.fontWeight, 
                fontSize: theme.typography.paragraphxl.fontSize,
                mt: 2, cursor: 'pointer',
                '&:hover': { color: theme.palette.primary.main }
              }}
            >
              Organize your digital assets with a new methodology.
            </Typography>
            <Typography
              sx={{
                mt: 2,
                color: theme.palette.secondary.light
              }}
            >
              {wordBreaker(bodyContent, 18)}
            </Typography>
          </Box>
          {!isMobile && (<Box 
            sx={{
              width: '50%',
              height: 'auto', 
              backgroundColor: 'transparent',
              mr: '60px', mt: '40px', mb: '40px',
              display: 'flex', flexDirection: 'column',
              gap: 2
            }}
          >
            {blog.map((blog, index) => (
              <Box key={index} sx={{
                display: 'flex',
                flexDirection: 'row',
                width: '100%', gap: 3
              }}>
                <img
                  src={blog.image}
                  alt='blog'
                  style={{
                    width: '30%',
                    height: '160px'
                  }}
                />
                <Box sx={{display: 'flex', flexDirection: 'column'}}>
                  <Typography
                    sx={{
                      fontWeight: theme.typography.labelsm.fontWeight,
                      fontSize: '12px'
                    }}
                  >
                    {blog.date}
                  </Typography>
                  <Typography onClick={() => router.push(`/blog/${index}`)}
                    sx={{
                      fontWeight: theme.typography.labelsm.fontWeight,
                      mt: 4, '&:hover': { color: theme.palette.primary.main },
                      cursor: 'pointer'
                    }}
                  >
                    {blog.title}
                  </Typography>
                  <Typography
                    sx={{
                      color: theme.palette.secondary.light
                    }}
                  >
                    {wordBreaker(blog.content, 18)}
                  </Typography>
                </Box>
              </Box>
            ))}
          </Box>)}
        </Grid>

        <Grid
          sx={{
            width: '100%',
            height: 'auto',
            display: 'flex', gap: 4, my: 6,
            justifyContent: 'center',
            alignItems: 'center', flexDirection: 'column'
          }}
        >
          <Typography
            sx={{
              fontWeight: 600,
              fontSize: theme.typography.h4.fontSize
            }}
          >
            Latest Blog Posts
          </Typography>
          <Box
            sx={{
              flexWrap: !isMobile ? 'wrap' : 'unset',
              display: 'flex', width: '100%',
              gap: 2, flexDirection: 'row', mx: isMobile ? '20px' : '64px',
              justifyContent: 'center',
              mt: '10px',
              overflowX: isMobile ? 'scroll' : 'unset',
              whiteSpace: isMobile ? 'nowrap' : 'none',
              '&::-webkit-scrollbar': {
                display: 'none',
              },
              scrollbarWidth: 'none'
            }}
          >
            {latest.map((blog, index) => (
              <Box key={index}
                sx={{
                  minWidth: isMobile ? '70%' : '32%',
                  width: isMobile ? '70%' : '32%',
                  height: 'auto',
                  backgroundColor: theme.palette.secondary.lightest,
                  border: `1px solid ${theme.palette.secondary.lighter}`,
                  borderRadius: theme.borderRadius.sm,
                }}
              >
                <img
                  src={blog.image}
                  alt='blog'
                  style={{
                    width: '100%',
                    height: '50%',
                    borderTopLeftRadius: theme.borderRadius.sm,
                    borderTopRightRadius: theme.borderRadius.sm,
                  }}
                />
                <Typography
                  sx={{
                    color: theme.palette.primary.main,
                    mt: 4, mx: isMobile ? 2 : 4,
                    whiteSpace: isMobile ? 'pre-wrap' : 'none',
                  }}
                >
                  {blog.category}
                </Typography>
                <Typography
                  sx={{
                    mx: isMobile ? 2 : 4,
                    fontSize: isMobile ? theme.typography.labelsm : theme.typography.labellg, 
                    whiteSpace: isMobile ? 'pre-wrap' : 'none',
                  }}
                >
                  {blog.title}
                </Typography>
                <Typography
                  sx={{
                    mx: isMobile ? 2 : 4,
                    color: theme.palette.secondary.light,
                    fontSize: theme.typography.labelsm.fontSize,
                    whiteSpace: isMobile ? 'pre-wrap' : 'none',
                  }}
                >
                  {isMobile ? wordBreaker(blog.content, 20) : wordBreaker(blog.content, 40)}...
                </Typography>
                <Typography
                  onClick={() => router.push(`/blog/${index }`)}
                  sx={{
                    mx: isMobile ? 2 : 4,
                    color: theme.palette.primary.main,
                    fontSize: '12px', mt: 2,
                    cursor: 'pointer'
                  }}
                >
                  Read more...
                </Typography>
              </Box>
            ))}

          </Box>
        </Grid>
      </Box>
      <Footer/>
    </>
  )
}
