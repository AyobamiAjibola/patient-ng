'use client';

import Footer from "@/app/components/Footer";
import Navbar from "../components/Navbar";
import { Box, Divider, IconButton, Rating, Typography, useMediaQuery, useTheme } from "@mui/material";
import { Close, Language, LocalPhone, MailOutline, Star, ToggleOff, ToggleOn } from "@mui/icons-material";
import Select from "react-select";
import { customStyles } from "@/constant/customStyles";
import { stateLga } from "@/constant/state";
import { ChangeEvent, useEffect, useState } from "react";
import { Button } from "antd";
import capitalize from "capitalize";
import Search from 'antd/es/input/Search';
import Pagination from "../components/Pagination";
import { useRouter } from "next/navigation";
import { NButton } from "../components/PButton";
import MModal from "../components/Modal";
import { useWindowSize } from "@uidotdev/usehooks";
import InputField from "../components/InputField";
import { wordBreaker } from "@/lib/helper";

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
        writtenBy: "Lisa James",
        insight: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nostrum ducimus eaque architecto totam quibusdam, error vero praesentium aspernatur debitis recusandae. Est veniam beatae iusto iste recusandae voluptates rem eveniet dolorem!',
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
        writtenBy: "Lisa James",
        insight: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nostrum ducimus eaque architecto totam quibusdam, error vero praesentium aspernatur debitis recusandae. Est veniam beatae iusto iste recusandae voluptates rem eveniet dolorem!',
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
        writtenBy: "Lisa James",
        insight: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nostrum ducimus eaque architecto totam quibusdam, error vero praesentium aspernatur debitis recusandae. Est veniam beatae iusto iste recusandae voluptates rem eveniet dolorem!',
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
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [currPage, setCurrPage] = useState(1);
    const router = useRouter();
    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const [insight, setInsight] = useState<string>('');
    const size = useWindowSize();
    const [selectedRating, setSelectedRating] = useState<number>(0);
    const [hospitals, setHospitals] = useState([]);
    const [selectedHospital, setSelectedHospital] = useState<string>('');

    const filteredData =
        reviews &&
        reviews.filter((item: any) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
        const inputValue = e.target.value;
        const cleanedInput = inputValue.replace(/[^a-zA-Z0-9 ]/g, '');

        setSearchQuery(cleanedInput);
    };

    const handlePageChange = (newPage: any) => {
        setCurrPage(newPage);
    };

    const handleModalClose = () => {
        setInsight('')
        setModalOpen(false)
    }

    const reviewsPage = filteredData.length ? 10 : filteredData.length;
    const totalPages = Math.ceil(filteredData.length / reviewsPage);
    const startIndex = (currPage - 1) * reviewsPage;
    const endIndex = Math.min(startIndex + reviewsPage, filteredData.length);
    const currentData = filteredData.slice(startIndex, endIndex);

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

    useEffect(() => {
        let array: any = [];
    
        reviews.map((item, index) => {
          array.push({
            value: item.name,
            label: capitalize.words(item.name),
          });
        });
        setHospitals(array);
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
                    px: isMobile ? '20px' : '90px', pt: 6, pb: 4
                }}
            >
                <Typography variant="h3">
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
                        maxHeight: '350px',
                        backgroundColor: theme.palette.secondary.lightest,
                        border: `1px solid ${theme.palette.secondary.lighter}`,
                        display: 'flex',
                        flexDirection: 'column',
                        p: 3,
                        borderRadius: theme.borderRadius.sm
                    }}
                >
                    <NButton onClick={()=>setModalOpen(true)}
                        width={'100%'}
                        textcolor="white"
                        bkgcolor={theme.palette.primary.main}
                    >
                        Write insight
                    </NButton>
                    <Divider sx={{mt: 4}}/>
                    <Typography variant="labelxs" mt={4}>
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
                        gap: 3, pb: 4
                    }}
                >
                    <Box sx={{width: '100%'}}>
                        <Search
                            placeholder="Search"
                            allowClear
                            enterButton={<Button style={{ backgroundColor: theme.palette.primary.main, color: 'white' }}>Search</Button>}
                            size="large"
                            onChange={handleSearchChange}
                        />
                    </Box>
                    {
                        currentData.map((review, index) => (
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
                                            justifyContent: 'space-between',
                                            gap: 1,
                                            width: isMobile ? '100%' : '75%'
                                        }}
                                    >
                                        <Box
                                            sx={{
                                                display: 'flex',
                                                flexDirection: 'column'
                                            }}
                                        >
                                            <Typography variant="labelxl">
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
                                        </Box>
                                        <Typography variant="paragraphxs" color={theme.palette.secondary.light} mt={-1}>
                                            {capitalize.words(review.state)} state
                                        </Typography>
                                        <Typography variant="paragraphsm" color={theme.palette.secondary.light}>
                                            {wordBreaker(review.insight, isMobile ? 10 : 20)}{review.insight.length > 30 ? '...' : ''}
                                        </Typography>
                                        <Typography variant="labelxxs" color={theme.palette.secondary.light} mb={isMobile ? 1 : 3}>
                                            Written by {capitalize.words(review.writtenBy)}
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

                                    <Typography variant="labelsm"
                                        onClick={() => router.push(`/insight/${index}`)}
                                        sx={{
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
            <Box
                sx={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    mt: 5
                }}
                >
                {reviews.length !== 0 && (<Pagination
                    currentPage={currPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                />)}
            </Box>

            <MModal
                onClose={handleModalClose}
                open={modalOpen}
                width={isMobile ? '90%' : '60%'}
                showCloseIcon={false}
            >
                <Box className="flex flex-col p-2 gap-3"
                    sx={{
                        height: 'auto'
                    }}
                >
                <Box
                    sx={{
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        p: 1,
                        borderBottom: `1px solid ${theme.palette.secondary.lighter}`
                    }}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            gap: 2,
                            alignItems: 'center'
                        }}
                    >
                    <Star sx={{color: '#FFCB00', fontSize: '20px'}}/>
                    <Typography variant="labelsm">
                        Write Insight
                    </Typography>
                    </Box>
                    <IconButton onClick={handleModalClose}>
                    <Close sx={{fontSize: '16px'}}/>
                    </IconButton>
                </Box>

                <Box
                    sx={{
                        width: '100%'
                    }}
                >
                    <Typography variant="labelxs"
                        sx={{
                            mb: 2
                        }}
                    >
                        Health Care
                    </Typography>
                    <Select
                        className="w-full h-10 font-light"
                        options={hospitals}
                        styles={customStyles}
                        placeholder="Choose hospitals"
                        name="rating"
                        onChange={(item) => {
                            setSelectedHospital(String(item?.value));
                        }}
                        value={{
                            value: selectedHospital,
                            label: selectedHospital,
                        }}
                    />
                </Box>

                <Box
                    sx={{
                        width: '100%'
                    }}
                >
                    <InputField
                        label=""
                        placeholder="Write your insight"
                        isBorder={true}
                        value={insight}
                        onChange={(e) => setInsight(e.target.value)}
                        rows={isMobile ? 8 : 6}
                        multiline={true}
                    />
                </Box>
                <Box
                    sx={{
                        width: '100%'
                    }}
                >
                    <Typography variant="labelxs"
                        sx={{
                            mb: 2
                        }}
                    >
                        Rating
                    </Typography>
                    <Select
                        className="w-full h-10 font-light"
                        options={[
                            {value: 0, label: 0},
                            {value: 1, label: 1},
                            {value: 2, label: 2},
                            {value: 3, label: 3},
                            {value: 4, label: 4},
                            {value: 5, label: 5}
                        ]}
                        styles={customStyles}
                        placeholder="Choose rating"
                        name="rating"
                        onChange={(item) => {
                            setSelectedRating(Number(item?.value));
                        }}
                        value={{
                            value: selectedRating,
                            label: selectedRating,
                        }}
                    />
                </Box>
                <Box width={'100%'}>
                    <NButton
                    textcolor="white"
                    bkgcolor={theme.palette.primary.main}
                    >
                    Submit review
                    </NButton>
                </Box>
                </Box>
            </MModal>
            <Footer/>
        </>
    )
}
