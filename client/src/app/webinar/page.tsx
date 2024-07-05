'use client';

import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import Navbar from "../components/Navbar";
import { Button } from 'antd';
import Search from 'antd/es/input/Search';
import MyCheckbox from "../components/CheckBox";
import { ChangeEvent, useEffect, useState } from "react";
import Image from "next/image";
import { characterBreaker } from "@/lib/helper";
import { ArrowForward, HourglassEmpty } from "@mui/icons-material";
import { useRouter } from "next/navigation";
import Footer from "@/app/components/Footer";
import { useGetWebinarCategories, useGetWebinars } from "../admin/hooks/webinarHook/useWebinar";
import Pagination from "../components/Pagination";
import { useSession } from "next-auth/react";

const topics = [
    "Nutrition and Diet",
    "Physical Fitness and Exercise",
    "Mental Health and Wellbeing",
    "Chronic Disease Management",
    "Women's Health",
    "Men's Health",
    "Healthy Aging",
    "Preventative Health",
    "Community Health and Wellness"
];

export default function Webinars() {
    const theme = useTheme();
    const router = useRouter();
    const [checkedTopics, setCheckedTopics] = useState<string[]>([]);
    const md = useMediaQuery(theme.breakpoints.down('md'));
    const fetchWebinarsMutation = useGetWebinars();
    const [webinars, setWebinars] = useState<any>([]);
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [currentPage, setCurrentPage] = useState(1);
    const {data: session} = useSession();
    const webinarCategoriesMutation = useGetWebinarCategories();
    const [webinarCategories, setWebinarCategories] = useState<any>([]);

    const filteredData = webinars && webinars.filter((item: any) => {
        if (checkedTopics.length === 0 && !searchQuery) {
            return true;
        }
    
        const matchesTopics = checkedTopics.length > 0 ? checkedTopics.includes(item.category.toLowerCase()) : true;
        const matchesSearch = searchQuery ? item.title.toLowerCase().includes(searchQuery.toLowerCase()) : true;
    
        return matchesTopics && matchesSearch;
    });
    

    const itemsPerPage = filteredData.length === webinars.length ? 10 : filteredData.length;

    const totalPages = Math.ceil(filteredData.length / itemsPerPage);

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, filteredData.length);
    const currentData = filteredData.slice(startIndex, endIndex);

    const handlePageChange = (newPage: any) => {
        setCurrentPage(newPage);
    };

    const handleWebinarCategory = async () => {
        await webinarCategoriesMutation.mutateAsync({}, {
            onSuccess: (response: any) => {
                setWebinarCategories(response.results)
            }
        })
    }

    const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
        const inputValue = e.target.value;
        const cleanedInput = inputValue.replace(/[^a-zA-Z0-9 ]/g, '');
    
        setSearchQuery(cleanedInput);
    };

    const handleFetchWebinars = async () => {
        await fetchWebinarsMutation.mutateAsync({}, {
            onSuccess: (response: any) => {
                const filtered = response.results.filter((data: any) => data.status !== "draft")
                setWebinars(filtered)
            }
        })
    }

    const handleCheckboxChange = (topic: string, checked: boolean) => {
      if (checked) {
        setCheckedTopics((prevTopics) => [...prevTopics, topic]);
      } else {
        setCheckedTopics((prevTopics) => prevTopics.filter((t) => t !== topic));
      }
    };

    useEffect(() => {
        handleFetchWebinars();
        handleWebinarCategory()
    },[]);

    return (
      <>
        <Navbar/>
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                py: md ? 4 : 6, px: md ? '20px' : '90px', width: '100%'
            }}
        >
            <Typography
                sx={{
                    fontSize: theme.typography.h4.fontSize,
                    fontWeight: theme.typography.h4.fontWeight
                }}
            >
                Find our on-demand webinar
            </Typography>
            <Box
                sx={{
                    display: 'flex',
                    width: '100%',
                    flexDirection: md ? 'column' : 'row'
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        gap: 3, mt: 4,
                        flexDirection: 'column',
                        width: md ? '100%' : '20%'
                    }}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            width: '100%'
                        }}
                    >
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'column'
                            }}
                        >
                            <Typography 
                                sx={{
                                    color: theme.palette.primary.darker, 
                                    fontSize: theme.typography.labelsm.fontSize,
                                    fontWeight: theme.typography.labelsm.fontWeight
                                }}
                            >
                                Search webinar
                            </Typography>
                            <Box sx={{width: '100%'}}>
                                <Search
                                    placeholder="Search"
                                    allowClear
                                    size="large"
                                    onChange={handleSearchChange}
                                />
                            </Box>
                        </Box>
                    </Box>
                    {!md && (<Box
                        sx={{
                            display: 'flex',
                            width: '100%',
                            flexDirection: 'column'
                        }}
                    >
                        <Typography 
                            sx={{
                                color: theme.palette.primary.darker, 
                                fontSize: theme.typography.labelsm.fontSize,
                                fontWeight: theme.typography.labelsm.fontWeight, my: 2
                            }}
                        >
                            TOPICS
                        </Typography>
                        <Box
                            sx={{
                                p: 4,
                                border: `1px solid ${theme.palette.secondary.lighter}`,
                                display: 'flex', flexDirection: 'column',
                                borderRadius: theme.borderRadius.sm, gap: 3
                            }}
                        >
                            {
                                webinarCategories.map((category: any, index: number) => (
                                    <Box key={category._id}
                                        sx={{
                                            display: 'flex',
                                            gap: 2,
                                            alignItems: 'center'
                                        }}
                                    >
                                        <MyCheckbox
                                            checked={checkedTopics.includes(category.name)}
                                            onChange={(checked) => handleCheckboxChange(category.name, checked)}
                                        >
                                            <Typography className="capitalize"
                                                sx={{fontWeight: theme.typography.labelxs.fontWeight, fontSize: theme.typography.labelxs.fontSize}}>
                                                {category.name}
                                            </Typography>
                                        </MyCheckbox>
                                        
                                    </Box>
                                ))
                            }
                        </Box>
                    </Box>)}
                </Box>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: md ? '100%' : '80%', mt: 5
                    }}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            gap: 3,
                            justifyContent: 'center',
                            alignItems: 'center',
                            width: '100%'
                        }}
                    >
                        {   currentData.length > 0 
                            ?   (currentData.map((webinar: any, index: number) => (
                                    <Box key={webinar._id}
                                        sx={{
                                            width: md ? '100%' : '280px',
                                            height: '400px',
                                            borderRadius: theme.borderRadius.sm,
                                            border: `1px solid ${theme.palette.secondary.lighter}`
                                        }}
                                    >
                                        <Box onClick={() => router.push(`/webinar/${webinar._id}`)}
                                            sx={{
                                                width: '100%',
                                                height: '60%',
                                                backgroundColor: index % 2 === 0 ? '#005158' : '#FFCB00',
                                                display: 'flex', flexDirection: 'column',
                                                borderTopLeftRadius: theme.borderRadius.sm,
                                                borderTopRightRadius: theme.borderRadius.sm,
                                                p: 3, justifyContent: 'space-between', cursor: 'pointer'
                                            }}
                                        >
                                            <Image
                                                src={index % 2 === 0 ? '/ipatient-logo2.png' : '/ipatient-logo.png'}
                                                alt='logo'
                                                height={100}
                                                width={100}
                                            />
                                            <Typography variant='labelsm' className="capitalize"
                                                sx={{
                                                    color: index % 2 === 0 ? 'white' : theme.palette.secondary.main
                                                }}
                                            >
                                                {webinar.title}
                                            </Typography>
                                        </Box> 
                                        <Box
                                            sx={{
                                                display: 'flex',
                                                flexDirection: 'column',
                                                p: 3,
                                                justifyContent: 'space-between',
                                                height: '40%'
                                            }}
                                        >
                                            <Typography variant='paragraphsm'
                                                sx={{
                                                    color: theme.palette.secondary.light
                                                }}
                                            >
                                                {webinar.summary.length > 40 ? `${characterBreaker(webinar.summary, 160)}...` : webinar.summary}
                                            </Typography>

                                            {!session?.user ? 
                                                (<Typography variant='labelxs'
                                                    sx={{
                                                        color: theme.palette.primary.main,
                                                        cursor: 'pointer', mt: 2
                                                    }}
                                                >
                                                    Signin <ArrowForward sx={{fontSize: theme.typography.labelsm.fontSize}}/>
                                                </Typography>
                                                ) : (
                                                <Typography
                                                    sx={{
                                                        color: theme.palette.primary.main,
                                                        fontSize: theme.typography.labelxs.fontSize,
                                                        fontWeight: theme.typography.labelxs.fontWeight,
                                                        cursor: 'pointer'
                                                    }}
                                                    onClick={()=>router.push(`/webinar/${webinar._id}`)}
                                                >
                                                    Open <ArrowForward sx={{fontSize: theme.typography.labelsm.fontSize}}/>
                                                </Typography>
                                                )
                                            }
                                        </Box>
                                    </Box>
                                ))
                            ) : (
                                <Box width={'100%'} justifyContent={'center'} alignItems={'center'} display={'flex'} flexDirection={'column'}>
                                    <HourglassEmpty sx={{fontSize: '2em', color: theme.palette.border.main}}/>
                                    <Typography variant='paragraphlg' color={theme.palette.border.main}>
                                        No Data
                                    </Typography>
                                </Box>
                            )
                        }
                    </Box>
                    <Box
                        sx={{
                            width: '100%',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            mt: 5
                        }}
                    >
                        {filteredData.length !== 0 && (<Pagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={handlePageChange}
                        />)}
                    </Box>
                </Box>
            </Box>
            
        </Box>
        <Footer/>
      </>
    )
  }
  