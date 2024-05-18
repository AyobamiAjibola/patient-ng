'use client';

import Footer from "@/modules/client/components/Footer";
import Navbar from "../components/Navbar";
import { Box, Divider, IconButton, Rating, Typography, useMediaQuery, useTheme } from "@mui/material";
import { Language, LocalPhone, MailOutline, Star, ToggleOff, ToggleOn, Web } from "@mui/icons-material";
import Select from "react-select";
import { customStyles } from "@/constant/customStyles";
import { stateLga } from "@/constant/state";
import { useEffect, useState } from "react";
import { Switch } from "antd";
import capitalize from "capitalize";

const rates = [
    "All",
    "3.0",
    "4.0",
    "4.5"
]

const reviews = [
    {
        name: 'ABC Hospital',
        rating: '4',
        state: 'lagos',
        isVerified: true,
        reviews: [
            {
                title: 'review title',
                comment: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nostrum ducimus eaque architecto totam quibusdam, error vero praesentium aspernatur debitis recusandae. Est veniam beatae iusto iste recusandae voluptates rem eveniet dolorem!',
                dateCreated: '2 hours ago',
                rating: '3'
            },
            {
                title: 'review title',
                comment: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nostrum ducimus eaque architecto totam quibusdam, error vero praesentium aspernatur debitis recusandae. Est veniam beatae iusto iste recusandae voluptates rem eveniet dolorem!',
                dateCreated: '2 hours ago',
                rating: '2'
            },
            {
                title: 'review title',
                comment: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nostrum ducimus eaque architecto totam quibusdam, error vero praesentium aspernatur debitis recusandae. Est veniam beatae iusto iste recusandae voluptates rem eveniet dolorem!',
                dateCreated: '2 hours ago',
                rating: '1'
            }
        ]
    },
    {
        name: 'X Hospital',
        rating: '5',
        state: 'lagos',
        isVerified: true,
        reviews: [
            {
                title: 'review title',
                comment: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nostrum ducimus eaque architecto totam quibusdam, error vero praesentium aspernatur debitis recusandae. Est veniam beatae iusto iste recusandae voluptates rem eveniet dolorem!',
                dateCreated: '2 hours ago',
                rating: '3'
            },
            {
                title: 'review title',
                comment: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nostrum ducimus eaque architecto totam quibusdam, error vero praesentium aspernatur debitis recusandae. Est veniam beatae iusto iste recusandae voluptates rem eveniet dolorem!',
                dateCreated: '2 hours ago',
                rating: '8'
            },
            {
                title: 'review title',
                comment: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nostrum ducimus eaque architecto totam quibusdam, error vero praesentium aspernatur debitis recusandae. Est veniam beatae iusto iste recusandae voluptates rem eveniet dolorem!',
                dateCreated: '2 hours ago',
                rating: '2'
            }
        ]
    },
    {
        name: 'XYZ Hospital',
        rating: '3',
        state: 'lagos',
        isVerified: true,
        reviews: [
            {
                title: 'review title',
                comment: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nostrum ducimus eaque architecto totam quibusdam, error vero praesentium aspernatur debitis recusandae. Est veniam beatae iusto iste recusandae voluptates rem eveniet dolorem!',
                dateCreated: '3 hours ago',
                rating: '4'
            },
            {
                title: 'review title',
                comment: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nostrum ducimus eaque architecto totam quibusdam, error vero praesentium aspernatur debitis recusandae. Est veniam beatae iusto iste recusandae voluptates rem eveniet dolorem!',
                dateCreated: '1 hours ago',
                rating: '4'
            },
            {
                title: 'review title',
                comment: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nostrum ducimus eaque architecto totam quibusdam, error vero praesentium aspernatur debitis recusandae. Est veniam beatae iusto iste recusandae voluptates rem eveniet dolorem!',
                dateCreated: '4 hours ago',
                rating: '4'
            }
        ]
    }
];

export default function Insight() {
    const isMobile = useMediaQuery('(max-width: 900px)');
    const theme = useTheme();
    const [selectedState, setSelectedState] = useState('');
    const [state, setState] = useState([]);
    const [toggle, setToggle] = useState<boolean>(true);

    const onChange = (checked: any) => {
        console.log(`switch to ${checked}`);
    };

    useEffect(() => {
        let stateArray: any = [];
        const newData = Object.entries(stateLga);
    
        newData.map((item, index) => {
          stateArray.push({
            value: item[0],
            label: item[0],
          });
        });
        setState(stateArray);
    }, []);

    return (
        <>
            <Navbar/>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 3,
                    height: 'auto',
                    px: isMobile ? '20px' : '90px', pt: 7, pb: 2
                }}
            >
                <Typography
                    sx={{
                        fontSize: theme.typography.h3.fontSize,
                        fontWeight: theme.typography.h3.fontWeight
                    }}
                >
                    Compare the best healthcare facilities.
                </Typography>
            </Box>

            <Box
                sx={{
                    display: 'flex',
                    height: 'auto',
                    px: isMobile ? '20px' : '90px',
                    gap: 3,
                    flexDirection: isMobile ? 'column' : 'row'
                }}
            >
                <Box
                    sx={{
                        width: isMobile ? '100%' : '30%',
                        maxHeight: '250px',
                        backgroundColor: theme.palette.secondary.lightest,
                        border: `1px solid ${theme.palette.secondary.lighter}`,
                        display: 'flex',
                        flexDirection: 'column',
                        p: 3,
                        borderRadius: theme.borderRadius.sm
                    }}
                >
                    <Typography
                        sx={{
                            fontSize: theme.typography.labelxs.fontSize,
                            fontWeight: theme.typography.labelsm.fontWeight
                        }}
                    >
                        RATING
                    </Typography>

                    <Box
                        sx={{
                            display: 'flex',
                            border: `1px solid ${theme.palette.secondary.lighter}`,
                            borderRadius: theme.borderRadius.xs,
                            width: 'auto',
                            justifyContent: 'space-evenly'
                        }}
                    >
                        {
                            rates.map((rate, index) => (
                                <Box key={index}
                                    sx={{
                                        display: 'flex',
                                        gap: 1,
                                        borderRight: index === 3 ? 'none' : `1px solid ${theme.palette.secondary.lighter}`,
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        p: 1,
                                        cursor: 'pointer',
                                        '&:hover': {
                                            backgroundColor: theme.palette.primary.main
                                        },
                                        width:'100%'
                                    }}
                                >
                                    <Star sx={{color: '#FFCB00', fontSize: '14px'}}/>
                                    <Typography
                                        sx={{
                                            fontSize: theme.typography.labelxs.fontSize,
                                            fontWeight: theme.typography.labelsm.fontWeight
                                        }}
                                    >
                                        {rate}+
                                    </Typography>
                                </Box>
                            ))
                        }
                    </Box>

                    <Typography
                        sx={{
                            fontSize: theme.typography.labelxs.fontSize,
                            fontWeight: theme.typography.labelsm.fontWeight,
                            mt: '2rem'
                        }}
                    >
                        LOCATION
                    </Typography>

                    <Select
                        className="w-full h-10 font-light"
                        options={state}
                        styles={customStyles}
                        placeholder="Choose state"
                        name="state"
                        onChange={(item) => {
                            setSelectedState(String(item?.value));
                        }}
                        value={{
                            value: selectedState,
                            label: selectedState
                        }}
                    />

                    <Typography
                        sx={{
                            fontSize: theme.typography.labelxs.fontSize,
                            fontWeight: theme.typography.labelsm.fontWeight,
                            mt: '2rem'
                        }}
                    >
                        COMPANY STATUS
                    </Typography>
                    <Box
                        onClick={() => setToggle(!toggle)}
                        sx={{
                            cursor: 'pointer',
                            display: 'flex', gap: 2,
                            alignItems: 'center',
                        }}
                    >
                        <>
                        {toggle 
                            ? <ToggleOn sx={{color: theme.palette.primary.main, fontSize: '2rem'}}/> 
                            : <ToggleOff sx={{color: theme.palette.secondary.light, fontSize: '2rem'}}/>}
                        </>

                        <Typography
                            sx={{
                                fontSize: theme.typography.labelsm.fontSize,
                                fontWeight: theme.typography.labelsm.fontWeight
                            }}
                        >
                            verified
                        </Typography>
                    </Box>

                </Box>

                <Box
                    sx={{
                        width: isMobile ? '100%' : '70%',
                        height: 'auto',
                        display: 'flex',
                        flexDirection: 'column',
                        p: 3, gap: 3
                    }}
                >
                    {
                        reviews.map((review, index) => (
                            <Box key={index}
                                sx={{
                                    border: `1px solid ${theme.palette.secondary.lighter}`,
                                    p: 2,
                                    borderRadius: theme.borderRadius.sm,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    height: '200px',
                                    width: '100%'
                                }}
                            >
                                <Box
                                    sx={{
                                        display: 'flex',
                                        gap: 4,
                                        height: '80%',
                                        borderBottom: `1px solid ${theme.palette.secondary.lighter}`
                                    }}
                                >
                                    {!isMobile && (<Box
                                        sx={{
                                            width: '25%',
                                            height: '90%'
                                        }}
                                    >
                                        <img
                                            src="/model.png"
                                            alt="insights image"
                                            crossOrigin="anonymous"
                                            style={{
                                                width: '100%',
                                                height: '100%',
                                                borderRadius: theme.borderRadius.sm
                                            }}
                                        />
                                    </Box>)}
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            gap: 1,
                                            width: isMobile ? '100%' : '75%'
                                        }}
                                    >
                                        <Typography
                                            sx={{
                                                fontSize: theme.typography.labelxl.fontSize,
                                                fontWeight: theme.typography.labelxl.fontWeight
                                            }}
                                        >
                                            {review.name}
                                        </Typography>
                                        <Box
                                            sx={{
                                                display: 'flex',
                                                gap: 2
                                            }}
                                        >
                                            <Rating
                                                name="half-rating-read"
                                                size={'small'}
                                                value={+review.rating}
                                                precision={0.5}
                                                readOnly
                                                sx={{ color: '#FFCB00' }}
                                            />
                                            <Typography
                                                sx={{
                                                    fontSize: theme.typography.labelsm.fontSize
                                                }}
                                            >
                                                {review.rating}
                                            </Typography>
                                            <Divider orientation="vertical"/>
                                            <Typography
                                                sx={{
                                                    fontSize: theme.typography.labelsm.fontSize,
                                                    color: theme.palette.secondary.light
                                                }}
                                            >
                                                {review.reviews.length} Reviews
                                            </Typography>
                                        </Box>
                                        <Typography
                                            sx={{
                                                fontSize: theme.typography.labelsm.fontSize,
                                                color: theme.palette.secondary.light, mt: 3
                                            }}
                                        >
                                            {capitalize.words(review.state)} State
                                        </Typography>
                                    </Box>
                                </Box>
                                <Box
                                    sx={{
                                        flex: 1,
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        flexDirection: 'row',
                                        width: '100%', display: 'flex'
                                    }}
                                >
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            gap: 1, mt: 1
                                        }}
                                    >
                                        <IconButton>
                                            <Language 
                                                sx={{
                                                    color: theme.palette.primary.main
                                                }}
                                            />
                                        </IconButton>
                                        <IconButton>
                                            <MailOutline
                                                sx={{
                                                    color: theme.palette.primary.main
                                                }}
                                            />
                                        </IconButton>
                                        <IconButton>
                                            <LocalPhone
                                                sx={{
                                                    color: theme.palette.primary.main
                                                }}
                                            />
                                        </IconButton>
                                    </Box>

                                    <Typography
                                        sx={{
                                            fontSize: theme.typography.labelsm.fontSize,
                                            fontWeight: theme.typography.labelsm.fontWeight,
                                            mr: 2, mt: 1,
                                            color: theme.palette.primary.main,
                                            cursor: 'pointer'
                                        }}
                                    >
                                        See review
                                    </Typography>

                                </Box>
                            </Box>
                        ))
                    }
                </Box>
            </Box>

            <Footer/>
        </>
    )
}
