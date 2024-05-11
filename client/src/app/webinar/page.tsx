'use client';

import { Box, Typography, useTheme } from "@mui/material";
import Navbar from "../components/Navbar";
import { Button } from 'antd';
import Search from 'antd/es/input/Search';
import MyCheckbox from "../components/CheckBox";
import { useState } from "react";
import Image from "next/image";
import { characterBreaker } from "@/lib/helper";
import { ArrowBack, ArrowForward } from "@mui/icons-material";
import { useRouter } from "next/navigation";

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
]

const webinars = [
    {
        categories: ["Nutrition and Diet", "Physical Fitness and Exercise"],
        title: "Healthy Eating Habits for Busy Lifestyles.",
        description: `My name is Slau, and I've faced more challenges in my health journey than I ever thought possible. Diagnosed with a rare autoimmune disease at the age of 25, I was suddenly thrust into a world of uncertainty and fear. But amidst the pain and confusion, I found something unexpected: strength.`
    },
    {
        categories: ["Nutrition and Diet", "Physical Fitness and Exercise"],
        title: "Healthy Eating Habits for Busy Lifestyles.",
        description: `My name is Slau, and I've faced more challenges in my health journey than I ever thought possible. Diagnosed with a rare autoimmune disease at the age of 25, I was suddenly thrust into a world of uncertainty and fear. But amidst the pain and confusion, I found something unexpected: strength.`
    },
    {
        categories: ["Nutrition and Diet", "Physical Fitness and Exercise"],
        title: "Healthy Eating Habits for Busy Lifestyles.",
        description: `My name is Slau, and I've faced more challenges in my health journey than I ever thought possible. Diagnosed with a rare autoimmune disease at the age of 25, I was suddenly thrust into a world of uncertainty and fear. But amidst the pain and confusion, I found something unexpected: strength.`
    },
    {
        categories: ["Nutrition and Diet", "Physical Fitness and Exercise"],
        title: "Healthy Eating Habits for Busy Lifestyles.",
        description: `My name is Slau, and I've faced more challenges in my health journey than I ever thought possible. Diagnosed with a rare autoimmune disease at the age of 25, I was suddenly thrust into a world of uncertainty and fear. But amidst the pain and confusion, I found something unexpected: strength.`
    },
    {
        categories: ["Nutrition and Diet", "Physical Fitness and Exercise"],
        title: "Healthy Eating Habits for Busy Lifestyles.",
        description: `My name is Slau, and I've faced more challenges in my health journey than I ever thought possible. Diagnosed with a rare autoimmune disease at the age of 25, I was suddenly thrust into a world of uncertainty and fear. But amidst the pain and confusion, I found something unexpected: strength.`
    },
    {
        categories: ["Nutrition and Diet", "Physical Fitness and Exercise"],
        title: "Healthy Eating Habits for Busy Lifestyles.",
        description: `My name is Slau, and I've faced more challenges in my health journey than I ever thought possible. Diagnosed with a rare autoimmune disease at the age of 25, I was suddenly thrust into a world of uncertainty and fear. But amidst the pain and confusion, I found something unexpected: strength.`
    }
]

export default function Webinars() {
    const theme = useTheme();
    const isLoggedIn = false;
    const router = useRouter();
    const [checkedTopics, setCheckedTopics] = useState<string[]>([]);

    const handleCheckboxChange = (topic: string, checked: boolean) => {
      if (checked) {
        setCheckedTopics((prevTopics) => [...prevTopics, topic]);
      } else {
        setCheckedTopics((prevTopics) => prevTopics.filter((t) => t !== topic));
      }
    };

    return (
      <>
        <Navbar/>
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                py: 6, px: '60px', width: '100%'
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
                    width: '100%'
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        gap: 3, mt: 4,
                        flexDirection: 'column',
                        width: '20%'
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
                                    enterButton={<Button style={{ backgroundColor: theme.palette.primary.main, color: 'white' }}>Search</Button>}
                                    size="large"
                                    // onSearch={onSearch}
                                />
                            </Box>
                        </Box>
                    </Box>
                    <Box
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
                                topics.map((topic: any, index: number) => (
                                    <Box key={index}
                                        sx={{
                                            display: 'flex',
                                            gap: 2,
                                            alignItems: 'center'
                                        }}
                                    >
                                        <MyCheckbox
                                            checked={checkedTopics.includes(topic)}
                                            onChange={(checked) => handleCheckboxChange(topic, checked)}
                                        >
                                            <Typography sx={{fontWeight: theme.typography.labelxs.fontWeight, fontSize: theme.typography.labelxs.fontSize}}>
                                                {topic}
                                            </Typography>
                                        </MyCheckbox>
                                        
                                    </Box>
                                ))
                            }
                        </Box>
                    </Box>
                </Box>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: '80%', mt: 5
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
                        {
                            webinars.map((webinar: any, index: number) => (
                                <Box key={index}
                                    sx={{
                                        width: '280px',
                                        height: '350px',
                                        borderRadius: theme.borderRadius.sm,
                                        border: `1px solid ${theme.palette.secondary.lighter}`
                                    }}
                                >
                                    <Box onClick={() => router.push(`/webinar/${index}`)}
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
                                        <Typography
                                            sx={{
                                                fontWeight: theme.typography.labelsm.fontWeight,
                                                fontSize: theme.typography.labelsm.fontSize,
                                                lineHeight: theme.typography.labelsm.lineHeight,
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
                                            p: 3
                                        }}
                                    >
                                        <Typography
                                            sx={{
                                                fontSize: theme.typography.labelxs.fontSize,
                                                lineHeight: theme.typography.labelxs.lineHeight,
                                                color: theme.palette.secondary.light
                                            }}
                                        >
                                            {`${characterBreaker(webinar.description, 160)}...`}
                                        </Typography>

                                        {!isLoggedIn && (<Typography
                                                    sx={{
                                                        color: theme.palette.primary.main,
                                                        fontSize: theme.typography.labelxs.fontSize,
                                                        fontWeight: theme.typography.labelxs.fontWeight,
                                                        mt: 3, cursor: 'pointer'
                                                    }}
                                                >
                                                    Signup <ArrowForward sx={{fontSize: theme.typography.labelsm.fontSize}}/>
                                                </Typography>
                                            )}
                                    </Box>
                                </Box>
                            ))
                        }
                    </Box>
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            width: '100%', mt: 5
                        }}
                    >
                        <Typography
                            sx={{
                                fontSize: theme.typography.labelxs.fontSize,
                                '&:hover': {color: theme.palette.primary.main},
                                cursor: 'pointer'
                            }}
                        >
                            <ArrowBack/> Prev
                        </Typography>
                        <Typography
                            sx={{
                                fontSize: theme.typography.labelxs.fontSize,
                            }}
                        >
                            Pages 1 to 8
                        </Typography>
                        <Typography
                            sx={{
                                fontSize: theme.typography.labelxs.fontSize,
                                '&:hover': {color: theme.palette.primary.main},
                                cursor: 'pointer'
                            }}
                        >
                            Next <ArrowForward/>
                        </Typography>
                    </Box>
                </Box>
            </Box>
            
        </Box>
      </>
    )
  }
  