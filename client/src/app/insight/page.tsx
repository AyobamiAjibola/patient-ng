'use client';

import Footer from "@/app/components/Footer";
import Navbar from "../components/Navbar";
import { Box, Divider, IconButton, Rating, Typography, useMediaQuery, useTheme } from "@mui/material";
import { Close, FiberManualRecord, HourglassEmpty, Language, LocalPhone, MailOutline, Star, ToggleOff, ToggleOn } from "@mui/icons-material";
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
import InputField from "../components/InputField";
import { useCreateInsight, useGetInsights } from "../admin/hooks/insightHook/useInsight";
import Toastify from "../components/ToastifySnack";
import { useSession } from "next-auth/react";
import { useGetHospitals } from "../admin/hooks/userHook/useUser";

const rates = [
    "All",
    "3.0",
    "4.4",
    "4.5"
]

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
    const [selectedRating, setSelectedRating] = useState<number>(0);
    const [hospitals, setHospitals] = useState([]);
    const [selectedHospital, setSelectedHospital] = useState<string>('');
    const insightMutation = useCreateInsight();
    const insightsMutation = useGetInsights();
    const [insightData, setInsightData] = useState<any>([]);
    const { data: session } = useSession();
    const getHospitalMutation = useGetHospitals();
    const [rate, setRate] = useState<string>('All');

    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState('');
    const [isSuccess, setIsSuccess] = useState(false);
    const [isError, setIsError] = useState<boolean>(false);

    const handleOpenNotification = (type: 'success' | 'error', successMsg?: string, errorMsg?: string) => {
        setMessage(type === 'success' ? successMsg || 'Operation was successful!' : errorMsg || 'There was an error!');
        setIsError(type === 'error');
        setIsSuccess(type === 'success');
        setOpen(true);
    };
    

    const filteredData =
        insightData &&
        insightData.filter((item: any) => {
        // if(rate === 'All') {
        //     return item;
        // }

        return item.hospital.rating.toString() === searchQuery || 
                item.hospital.hospitalName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                item.hospital.state.toLowerCase().includes(searchQuery.toLowerCase())
    });
   
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
    const totalPages = Math.ceil(filteredData.length / reviewsPage) || 1;
    const startIndex = (currPage - 1) * reviewsPage;
    const endIndex = Math.min(startIndex + reviewsPage, filteredData.length);
    const currentData = filteredData.slice(startIndex, endIndex);

    const handleInsight = async () => {
        const payload = {
            hospitalName: selectedHospital,
            rating: selectedRating,
            comment: insight
        }

        await insightMutation.mutateAsync(payload, {
            onSuccess: async (response: any) => {
                await insightsMutation.mutateAsync({});
                setModalOpen(false)
                handleOpenNotification('success', response.message)
            },
            onError: (error: any) => {
                const errorMessage = error.response?.data?.message || 'An unexpected error occurred';
                handleOpenNotification('error', '', errorMessage)
            }
        })
    }

    const fetchHospitals = async () => {
        getHospitalMutation.mutateAsync({}, {
            onSuccess: (response: any) => {
                let array: any = [];
    
                response.results.map((item: any, index: number) => {
                array.push({
                    value: item.hospitalName,
                    label: capitalize.words(item.hospitalName),
                });
                });
                setHospitals(array);
            }
        })
    }

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
        fetchHospitals()
    }, []);

    useEffect(() => {
        const handleFetchInsights = async () => {
            await insightsMutation.mutateAsync({})
        }
        handleFetchInsights();
    },[session]);

    useEffect(() => {
        if(insightsMutation.isSuccess) {
            setInsightData(insightsMutation.data.results)
        }
    },[insightsMutation.isSuccess]);

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
                    Find a Healthcare provider to review
                </Typography>
                <Typography variant="paragraphlg">
                    Top rated healthcare providers, better patient outcomes
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
                    <Typography variant="labelxs"
                        onClick={()=>{
                            setRate('All')
                            setSearchQuery('')
                        }}
                        sx={{
                            cursor: 'pointer',
                            color: theme.palette.state.error,
                            '&:hover': {
                                color: theme.palette.primary.main
                            }
                        }}
                    >
                        Clear filter
                    </Typography>
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
                            rates.map((rating, index) => (
                                <Box key={index}
                                    sx={{
                                        display: 'flex',
                                        gap: 1,
                                        borderRight: index === 3 ? 'none' : `1px solid ${theme.palette.secondary.lighter}`,
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        p: 1,
                                        cursor: 'pointer',
                                        bgcolor: rating === rate ? theme.palette.primary.main : 'transparent',
                                        color: rating === rate ? 'white' : 'black',
                                        '&:hover': {
                                            backgroundColor: theme.palette.primary.main
                                        },
                                        width:'100%'
                                    }}
                                    onClick={()=>{
                                        setSearchQuery(rating)
                                        setRate(rating)}}
                                >
                                    <Star sx={{color: '#FFCB00', fontSize: '14px'}}/>
                                    <Typography
                                        sx={{
                                            fontSize: theme.typography.labelxs.fontSize,
                                            fontWeight: theme.typography.labelsm.fontWeight
                                        }}
                                    >
                                        {rating === "All" ? `${rating}` : `${rating}+`}
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
                            setSearchQuery(String(item?.value))
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
                            enterButton={<Button disabled style={{ backgroundColor: theme.palette.primary.main, color: 'white' }}>Search</Button>}
                            size="large"
                            onChange={handleSearchChange}
                            // onMouseEnter={()=>setRate('All')}
                        />
                    </Box>
                    {
                        currentData.length > 0
                            ?   (currentData.map((review: any, index: number) => (
                                    <Box key={index}
                                        sx={{
                                            border: `1px solid ${theme.palette.secondary.lighter}`,
                                            p: 2,
                                            borderRadius: theme.borderRadius.sm,
                                            display: 'flex',
                                            flexDirection: 'column',
                                            height: '220px',
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
                                                    height: '90%',
                                                    pl: 2
                                                }}
                                            >
                                                <img
                                                    src={review.hospital.image ? `${process.env.NEXT_PUBLIC_SERVER_URL}/${review.hospital.image}` : "/logo.png"}
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
                                                <Box
                                                    sx={{
                                                        display: 'flex',
                                                        flexDirection: 'column'
                                                    }}
                                                >
                                                    <Typography variant="labelxl">
                                                        {review.hospital.hospitalName}
                                                    </Typography>
                                                    <Box
                                                        sx={{
                                                            display: 'flex',
                                                            gap: 2,
                                                            alignItems: 'center'
                                                        }}
                                                    >
                                                        <Rating
                                                            name="half-rating-read"
                                                            size={'medium'}
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
                                                            {review.reviews.length} {review.reviews.length > 1 ? 'Reviews' : 'Review'}
                                                        </Typography>
                                                        
                                                    </Box>
                                                </Box>
                                                <Typography variant="paragraphsm" color={theme.palette.secondary.light} mt={3}>
                                                    {review.hospital.state}, {review.hospital.lga}
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
                                                    alignItems: 'center',
                                                    gap: 1
                                                }}
                                            >
                                                <Box
                                                    sx={{
                                                        display: 'flex',
                                                        gap: 1, mt: 1
                                                    }}
                                                >
                                                    <IconButton
                                                        onClick={() => {
                                                            if(!review.hospital.website) return;
                                                            const newWindow = window?.open(`${review.hospital.website}`, '_blank');
                                                            newWindow?.focus();
                                                        }}
                                                    >
                                                        <Language 
                                                            sx={{
                                                                color: theme.palette.primary.main
                                                            }}
                                                        />
                                                    </IconButton>
                                                    <IconButton
                                                        component="a"
                                                        href={`mailto:${review.hospital.email}`}
                                                    >
                                                        <MailOutline
                                                            sx={{
                                                                color: theme.palette.primary.main
                                                            }}
                                                        />
                                                    </IconButton>
                                                    <IconButton
                                                        component="a"
                                                        href={`tel:${review.hospital.phone}`}                                        
                                                    >
                                                        <LocalPhone
                                                            sx={{
                                                                color: theme.palette.primary.main
                                                            }}
                                                        />
                                                    </IconButton>
                                                </Box>
                                                <Box sx={{height: '35px', width: '1px', bgcolor: theme.palette.secondary.lighter}}/>
                                            </Box>

                                            <Box
                                                sx={{
                                                    display: 'flex',
                                                    gap: 2,
                                                    alignItems: 'center'
                                                }}
                                            >
                                                {
                                                    review.hospital.services.map((service: string, index: number) => (
                                                        <Box
                                                            key={index}
                                                            sx={{
                                                                display: 'flex',
                                                                alignItems: 'center'
                                                            }}
                                                        >
                                                            <Typography className="capitalize" variant="paragraphxs"
                                                                color={theme.palette.secondary.light}
                                                            >
                                                                [{ service }]
                                                            </Typography>
                                                            {index !== 3 || review.hospital.services.length === 1 && (<FiberManualRecord 
                                                                sx={{
                                                                    mx: 2, 
                                                                    fontSize: '10px', 
                                                                    color: theme.palette.border.main
                                                                }}
                                                            />)}
                                                        </Box>
                                                    ))
                                                }
                                            </Box>

                                            <Typography variant="labelsm"
                                                component={'button'}
                                                onClick={() => router.push(`/insight/${review._id}`)}
                                                onMouseEnter={()=>localStorage.setItem('rating', review.rating)}
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
                {insightData.length !== 0 && (<Pagination
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
                height='auto'
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
                            Rating & Review
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
                        Select healthcare provider
                    </Typography>
                    <Select
                        className="w-full h-auto font-light"
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
                        placeholder="Leave a review here"
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
                        Give a rating
                    </Typography>
                    <Box display={'flex'}>
                        {
                            [1,2,3,4,5].map((rating, index) => (
                                <Box key={index}
                                    onClick={()=>setSelectedRating(rating)}
                                    sx={{
                                        width: '60px',
                                        display: 'flex',
                                        gap: 1,
                                        cursor: 'pointer',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        height: '40px',
                                        p: 3,
                                        borderRight: rating !== 5 ? `3px solid ${theme.palette.secondary.lightest}` : 'none',
                                        borderTopLeftRadius: rating === 1 ? theme.borderRadius.sm : 'none',
                                        borderBottomLeftRadius: rating === 1 ? theme.borderRadius.sm : 'none',
                                        borderTopRightRadius: rating === 5 ? theme.borderRadius.sm : 'none',
                                        borderBottomRightRadius: rating === 5 ? theme.borderRadius.sm : 'none',
                                        backgroundColor: rating === selectedRating ? theme.palette.primary.main : theme.palette.secondary.lighter
                                    }}
                                >
                                    <Star sx={{color: '#FFCB00', fontSize: '15px'}}/>
                                    <Typography
                                        variant="labelxs"
                                        color={rating === selectedRating ? 'white' : 'black'}
                                    >
                                        {rating}
                                    </Typography>
                                </Box>
                            ))
                        }
                    </Box>
                </Box>
                <Box width={'100%'}>
                    <NButton type='submit'
                        onClick={handleInsight}
                        textcolor="white"
                        bkgcolor={theme.palette.primary.main}
                    >
                        {insightsMutation.isLoading ? 'Sumbitting...' : 'Submit review'}
                    </NButton>
                </Box>
                </Box>
            </MModal>

            <Toastify
                open={open}
                onClose={() => setOpen(false)}
                message={message}
                error={isError}
                success={isSuccess}
            />
            <Footer/>
        </>
    )
}
