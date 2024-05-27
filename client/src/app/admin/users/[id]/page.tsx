'use client';

import InputField from "@/app/components/InputField";
import PButton, { NButton } from "@/app/components/PButton";
import Pagination from "@/app/components/Pagination";
import { ArrowBack, FiberManualRecord, FileDownloadOutlined, KeyboardArrowRightOutlined, LockOutlined, PersonOutline } from "@mui/icons-material";
import { Avatar, Box, Button, LinearProgress, Rating, Typography, linearProgressClasses, styled, useMediaQuery, useTheme } from "@mui/material";
import { Tag } from "antd";
import { useRouter } from "next/navigation";
import { createElement, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { stateLga } from "@/constant/state";
import { customStyles } from "@/constant/customStyles";
import Select from "react-select";
import { formAmount } from "@/lib/helper";

const item = [
    "User information",
    "Crowdfunding",
    "Advocacy",
    "Insights"
];

const advocacy = [
    {
      hospitalName: "ABC Hospital",
      address: "Chrismas street abuja",
      status: 'pending',
      complaints: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio, molestias. Consequuntur, quam veritatis quod obcaecati magni repudiandae deleniti expedita mollitia consectetur voluptatum animi ex, eos earum, ab qui! Libero, similique.`,
      refNumber: '#1234543'
    },
    {
      hospitalName: "ABC Hospital",
      address: "Chrismas street abuja",
      status: 'pending',
      complaints: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio, molestias. Consequuntur, quam veritatis quod obcaecati magni repudiandae deleniti expedita mollitia consectetur voluptatum animi ex, eos earum, ab qui! Libero, similique.`,
      refNumber: '#1234543'
    },
    {
      hospitalName: "ABC Hospital",
      address: "Chrismas street abuja",
      status: 'pending',
      complaints: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio, molestias. Consequuntur, quam veritatis quod obcaecati magni repudiandae deleniti expedita mollitia consectetur voluptatum animi ex, eos earum, ab qui! Libero, similique.`,
      refNumber: '#1234543'
    },
    {
      hospitalName: "ABC Hospital",
      address: "Chrismas street abuja",
      status: 'pending',
      complaints: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio, molestias. Consequuntur, quam veritatis quod obcaecati magni repudiandae deleniti expedita mollitia consectetur voluptatum animi ex, eos earum, ab qui! Libero, similique.`,
      refNumber: '#1234543'
    },
    {
      hospitalName: "ABC Hospital",
      address: "Chrismas street abuja",
      status: 'pending',
      complaints: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio, molestias. Consequuntur, quam veritatis quod obcaecati magni repudiandae deleniti expedita mollitia consectetur voluptatum animi ex, eos earum, ab qui! Libero, similique.`,
      refNumber: '#1234543'
    },
    {
      hospitalName: "ABC Hospital",
      address: "Chrismas street abuja",
      status: 'pending',
      complaints: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio, molestias. Consequuntur, quam veritatis quod obcaecati magni repudiandae deleniti expedita mollitia consectetur voluptatum animi ex, eos earum, ab qui! Libero, similique.`,
      refNumber: '#1234543'
    },
    {
      hospitalName: "ABC Hospital",
      address: "Chrismas street abuja",
      status: 'pending',
      complaints: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio, molestias. Consequuntur, quam veritatis quod obcaecati magni repudiandae deleniti expedita mollitia consectetur voluptatum animi ex, eos earum, ab qui! Libero, similique.`,
      refNumber: '#1234543'
    },
    {
      hospitalName: "ABC Hospital",
      address: "Chrismas street abuja",
      status: 'pending',
      complaints: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio, molestias. Consequuntur, quam veritatis quod obcaecati magni repudiandae deleniti expedita mollitia consectetur voluptatum animi ex, eos earum, ab qui! Libero, similique.`,
      refNumber: '#1234543'
    },
    {
      hospitalName: "ABC Hospital",
      address: "Chrismas street abuja",
      status: 'pending',
      complaints: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio, molestias. Consequuntur, quam veritatis quod obcaecati magni repudiandae deleniti expedita mollitia consectetur voluptatum animi ex, eos earum, ab qui! Libero, similique.`,
      refNumber: '#1234543'
    },
    {
      hospitalName: "ZYX Hospital",
      address: "Chrismas street abuja",
      status: 'pending',
      complaints: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio, molestias. Consequuntur, quam veritatis quod obcaecati magni repudiandae deleniti expedita mollitia consectetur voluptatum animi ex, eos earum, ab qui! Libero, similique.`,
      refNumber: '#1234543'
    }
]

const userInfo = [
    {
        title: 'User profile',
        icon: PersonOutline
    },
    {
        title: 'Change password',
        icon: LockOutlined
    }
];

const insights = [
    {
        rating: 4,
        title: 'Good Insight',
        createdAt: '2h ago',
        content: 'lore Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio deleniti provident sed neque in. Doloremque eum officiis unde, cupiditate est dicta eius aliquam voluptas nostrum porro culpa nisi provident illo?'
    },
    {
        rating: 4,
        title: 'Good Insight',
        createdAt: '2h ago',
        content: 'lore Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio deleniti provident sed neque in. Doloremque eum officiis unde, cupiditate est dicta eius aliquam voluptas nostrum porro culpa nisi provident illo?'
    },
    {
        rating: 4,
        title: 'Good Insight',
        createdAt: '2h ago',
        content: 'lore Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio deleniti provident sed neque in. Doloremque eum officiis unde, cupiditate est dicta eius aliquam voluptas nostrum porro culpa nisi provident illo?'
    }
]

type FormValues = {
    firstName?: string,
    lastName?: string,
    email?: string,
    phone?: string,
    age?: 0,
    gender?: string,
    address?: string,
    oldPassword?: string,
    newPassword?: string
}

export default function page({ params }: any) {
    const router = useRouter();
    const theme = useTheme();
    const [currentItem, setCurrentItem] = useState<string>('User information');
    const [currentPage, setCurrentPage] = useState(1);
    const [currPage, setCurrPage] = useState(1);
    const [currItem, setCurrItem] = useState<string>('User profile');
    const isMobile = useMediaQuery('(max-width: 900px)');
    const [selectedState, setSelectedState] = useState('');
    const [state, setState] = useState([]);
    const [district, setDistrict] = useState<any[]>([]);
    const [selectedDistrict, setSelectedDistrict] = useState<string>('');
    const percent = (+100000/+500000) * 100;

    //Advocacy pagination
    const itemsPerPage = advocacy.length ? 10 : advocacy.length;
    const totalPages = Math.ceil(advocacy.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, advocacy.length);
    const currentData = advocacy.slice(startIndex, endIndex);

    //Insights pagination
    const insightItemsPerPage = insights.length ? 10 : insights.length;
    const insightTotalPages = Math.ceil(insights.length / insightItemsPerPage);
    const insightStartIndex = (currPage - 1) * insightItemsPerPage;
    const insightEndIndex = Math.min(insightStartIndex + insightItemsPerPage, insights.length);
    const insightCurrentData = insights.slice(insightStartIndex, insightEndIndex);

    const handleDistrict = (value: any) => {
        if (!value) {
          return;
        }
        const newData = Object.entries(stateLga).find(
          (_items) => _items[0] === value
        );
    
        if (!newData) {
          return;
        }
        const districtArray = newData[1]?.map(
          (item) => {
            return {
              value: item,
              label: item,
            };
          }
        );
        setDistrict(districtArray);
    };

    const handlePageChange = (newPage: any) => {
        setCurrentPage(newPage);
    };

    const handlePageChangeInsight = (newPage: any) => {
        setCurrPage(newPage);
    };

    const onSubmit = async (data: FormValues) => {
        const payload = {
          ...data
        }
        console.log(payload, 'data')
    }

    const onSubmitPass = async (data: FormValues) => {
        const payload = {
            oldPassword: data.oldPassword,
            newPassword: data.newPassword
        }

        console.log(payload)
    }

    const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
        height: 7,
        borderRadius: 5,
        [`&.${linearProgressClasses.colorPrimary}`]: {
          backgroundColor: theme.palette.secondary.lighter
        },
        [`& .${linearProgressClasses.bar}`]: {
          borderRadius: 5,
          backgroundColor: theme.palette.primary.main
        },
    }));

    const {
        handleSubmit,
        register,
        formState: { errors },
    } = useForm<FormValues>({
        defaultValues: {
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          age: 0,
          gender: '',
          address: ''
        },
    });

    const getHeight = () => {
        if (typeof window !== 'undefined') {
            return window.innerWidth;
        }
            return 0;
    };
    
    const screenWidth = getHeight();

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
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                bgcolor: 'white'
            }}
        >
            <Box position={'relative'} mb={8} >
                <Box
                    sx={{
                        width: '100%',
                        height: '16rem'
                    }}
                >
                    <img
                        src='/img-wrap.png'
                        alt="user image wrap"
                        style={{
                            width: '100%',
                            height: '100%'
                        }}
                    />
                </Box>
                <Box sx={{position: 'absolute', top: 16, left: 16, p: 4}}>
                    <Button onClick={() => router.back()}
                        sx={{
                            textTransform: 'none',
                            borderRadius: theme.borderRadius.xs,
                            backgroundColor: 'white',
                            color: 'black',
                            width: '100px',
                            border: `1px solid ${theme.palette.border.main}`,
                            '&:hover': {
                                color: theme.palette.primary.main,
                                backgroundColor: 'white'
                            },
                            gap: 2,
                            display: 'flex',
                            alignItems: 'center'
                        }}
                        >
                            <ArrowBack sx={{fontSize: '14px'}}/>
                            <Typography variant="labelxs">
                                Back
                            </Typography>
                    </Button>
                </Box>
                <Box 
                    sx={{
                        width: '100%', 
                        px: 4, position: 'absolute',
                        top: 220,
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                    }}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 3
                        }}
                    >
                        <Avatar
                            src="/model.png"
                            alt="image"
                            sx={{
                                width: 100,
                                height: 100
                            }}
                        />
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                mt: 4
                            }}
                        >
                            <Typography variant="labelsm">
                                Lisa Steve
                            </Typography>
                            <Typography variant="paragraphxs"
                                sx={{
                                    color: theme.palette.secondary.light
                                }}
                            >
                                lisa@gmail.com
                            </Typography>
                        </Box>
                    </Box>

                    {!isMobile && (<Box
                        sx={{
                            display: 'flex',
                            gap: 2, mt: 4
                        }}
                    >
                        <Button
                            sx={{
                                textTransform: 'none',
                                borderRadius: theme.borderRadius.sm,
                                backgroundColor: 'white',
                                color: 'red',
                                // width: props.width,
                                border: `1px solid red`,
                                px: theme.spacing(3),
                            }}
                        >
                            <Typography variant="paragraphxs">
                                Deactivate user
                            </Typography>
                        </Button>
                        <PButton transBg={false} bg={true}>
                            <Typography variant="paragraphxs">
                                Activate user
                            </Typography>
                        </PButton>
                    </Box>)}
                </Box>
            </Box>

            <Box 
                sx={{
                    display: 'flex',
                    gap: 4,
                    px: 4,
                    pb: 2,
                    borderBottom: `1px solid ${theme.palette.secondary.lighter}`,
                    maxWidth: isMobile ? '100%' : 'auto',
                    overflowX: 'scroll',
                    whiteSpace: 'nowrap',
                    '&::-webkit-scrollbar': {
                    display: 'none',
                    },
                    scrollbarWidth: 'none',
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
                        height: isMobile ? 'auto' : '1.6rem'
                    }}
                >
                    {item}
                </Typography>
                ))}
            </Box>

            <Box
                sx={{
                    bgcolor: theme.palette.secondary.lightest,
                    p: isMobile ? 0 : 4, height: 'auto'
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        borderRadius: theme.borderRadius.sm,
                        bgcolor: 'white',
                        border: `1px solid ${theme.palette.secondary.lighter}`,
                        p: 2
                    }}
                >
                    { currentItem === 'Crowdfunding' 
                        ?   (<Box
                                sx={{
                                    width: '100%',
                                    display: 'flex',
                                    p: 3, gap: 3,
                                    flexDirection: 'column'
                                }}
                            >
                                <Box
                                    sx={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        width: '100%',
                                        height: isMobile ? '20rem' : '40rem',
                                        position: 'relative',
                                        borderRadius: theme.borderRadius.sm,
                                        border: `1px solid ${theme.palette.secondary.lighter}`
                                    }}
                                >
                                    <img
                                        src='/crowd1.png'
                                        style={{
                                            width: '100%',
                                            height: '90%',
                                            borderTopLeftRadius:theme.borderRadius.sm,
                                            borderTopRightRadius:theme.borderRadius.sm
                                        }}
                                    />
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            width: '100%',
                                            position: 'absolute',
                                            justifyContent: 'space-between',
                                            top: 10, px: 3
                                        }}
                                    >
                                        <Box
                                             sx={{
                                                display: 'flex',
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                px: 2,
                                                border: `1px solid ${theme.palette.state.warning}`,
                                                borderRadius: theme.borderRadius.md,
                                                bgcolor: 'white'
                                            }}
                                        >
                                            <Typography variant={isMobile ? 'labelxs' : 'labelsm'}
                                                sx={{
                                                    color: theme.palette.state.warning
                                                }}
                                            >
                                                Awaiting review
                                            </Typography>
                                        </Box>
                                        <Box
                                            sx={{
                                                display: 'flex',
                                                gap: 2,
                                                flexDirection: isMobile ? 'column' : 'row'
                                            }}
                                        >
                                            <NButton
                                                bkgcolor="red"
                                                textcolor="white"
                                            >
                                                <Typography variant={isMobile ? "paragraphxxs" : "paragraphsm"}>
                                                    Delete campaign
                                                </Typography>
                                            </NButton>
                                            <NButton
                                                bkgcolor={theme.palette.primary.main}
                                                textcolor="white"
                                            >
                                                <Typography variant={isMobile ? "paragraphxxs" : "paragraphsm"}>
                                                    Approve
                                                </Typography>
                                            </NButton>
                                        </Box>
                                    </Box>
                                    <Box
                                        sx={{
                                            height: '10%',
                                            width: '100%',
                                            backgroundColor: theme.palette.secondary.lightest,
                                            borderBottomLeftRadius:theme.borderRadius.sm,
                                            borderBottomRightRadius:theme.borderRadius.sm,
                                            display: 'flex',
                                            alignItems: 'center',
                                            px: 2, gap: 1
                                        }}
                                    >
                                        <Avatar
                                            src='/model.png'
                                            alt="crowdfunding image"
                                            sx={{
                                                width: '40px',
                                                height: '40px',
                                                mr: 1
                                            }}
                                        />
                                        <Typography variant="labelxs">
                                            Olawale Kudus
                                        </Typography>
                                        <Typography variant="paragraphxs">
                                            is organising a fundraiser on behalf of
                                        </Typography>
                                        <Typography variant="labelxs">
                                            Abayomi Kudus
                                        </Typography>
                                    </Box>
                                </Box>

                                <Box
                                    sx={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        width: '100%',
                                        height: 'auto',
                                        borderRadius: theme.borderRadius.sm,
                                        border: `1px solid ${theme.palette.secondary.lighter}`,
                                        p: 3
                                    }}
                                >
                                    <Typography variant="labelsm">
                                        Abuja
                                    </Typography>
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            gap: 1, mt: 3, mb: 1,
                                            alignItems: 'center'
                                        }}
                                    >
                                        <Typography variant="labelsm">
                                            {formAmount(100000)}
                                        </Typography>
                                        <Typography variant="paragraphsm"
                                            sx={{
                                                color: theme.palette.secondary.light
                                            }}
                                        >
                                            {`of ${formAmount(500000)} goal`}
                                        </Typography>
                                    </Box>
                                    <BorderLinearProgress variant="determinate" value={percent} />
                                    <Typography variant="labelxs"
                                        sx={{
                                            color: theme.palette.secondary.light
                                        }}
                                    >
                                        0 donations
                                    </Typography>
                                </Box>
                            </Box>
                            ) 
                        : currentItem === 'Advocacy' 
                            ?   (
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            gap: 3,
                                            height: 'auto',
                                            width: '100%',
                                            px: 2, py: 3
                                        }}
                                    >
                                        {
                                            currentData.map((item, index) => (
                                                <Box key={index}
                                                    sx={{
                                                        display: 'flex',
                                                        flexDirection: 'column',
                                                        borderRadius: theme.borderRadius.sm,
                                                        border: `1px solid ${theme.palette.secondary.lighter}`,
                                                        p: 3, gap: 3,
                                                        cursor: 'pointer',
                                                        '&:hover': {
                                                            border: `1px solid ${theme.palette.primary.main}`
                                                        }
                                                    }}
                                                    onClick={() => router.push(`/admin/advocacy/${index}`)}
                                                >
                                                    <Box
                                                        sx={{
                                                            display: 'flex',
                                                            justifyContent: 'space-between',
                                                            alignItems: 'center'
                                                        }}
                                                    >
                                                        <Box
                                                            sx={{
                                                                display: 'flex',
                                                                gap: 2
                                                            }}
                                                        >
                                                            <Typography variant="labelsm">
                                                                {item.hospitalName}
                                                            </Typography>
                                                            <Tag>
                                                                <FiberManualRecord sx={{fontSize: '12px'}}/> {item.status}
                                                            </Tag>
                                                        </Box> 
                                                        <Typography variant="paragraphxs">
                                                            {item.refNumber}
                                                        </Typography>
                                                    </Box>
                                                    <Typography variant="paragraphsm" color={theme.palette.secondary.light}>
                                                    {item.address}
                                                    </Typography>
                                                    <Typography variant="paragraphsm" color={theme.palette.secondary.light}>
                                                    {item.complaints}
                                                    </Typography>
                                                </Box>
                                            ))
                                        }
                                        <Box
                                            sx={{
                                                width: '100%',
                                                display: 'flex',
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                mt: 5
                                            }}
                                            >
                                            {advocacy.length !== 0 && (<Pagination
                                                currentPage={currentPage}
                                                totalPages={totalPages}
                                                onPageChange={handlePageChange}
                                            />)}
                                        </Box>
                                    </Box>
                                )
                            : currentItem === 'User information' 
                                ?   (
                                        <Box
                                            sx={{
                                                display: 'flex',
                                                gap: 3, width: '100%',
                                                p: 2,
                                                flexDirection: isMobile ? 'column' : 'row'
                                            }}
                                        >
                                             {isMobile && (<Typography variant='h6'>
                                                {currItem === 'User profile' ? 'User profile' : 'Change password'}
                                            </Typography>)}
                                            <Box
                                                sx={{
                                                    p: 2,
                                                    border: `1px solid ${theme.palette.secondary.lighter}`,
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    borderRadius: theme.borderRadius.sm,
                                                    width: isMobile ? '100%' : '20%',
                                                    height: '120px'
                                                }}
                                            >
                                                <Typography variant="paragraphxxs" mb={2}>
                                                    SELECT MENU
                                                </Typography>
                                                {
                                                    userInfo.map((item, index) => (
                                                        <Box key={index} 
                                                            sx={{
                                                                display: 'flex',
                                                                gap: 1, mb: index === 0 ? 2 : 0,
                                                                alignItems: 'center',
                                                                cursor: 'pointer',
                                                                bgcolor: item.title === currItem ? theme.palette.secondary.lightest : 'transparent',
                                                                p: 2,
                                                                borderRadius: item.title === currItem  ? theme.borderRadius.sm : 'none'
                                                            }}
                                                            onClick={() => setCurrItem(item.title)}
                                                        >
                                                            {createElement(item.icon, {
                                                                style: {
                                                                    fontSize: index === 1 ? '12px' : '14px',
                                                                    color: item.title === currItem 
                                                                        ? theme.palette.primary.main
                                                                        : theme.palette.secondary.light
                                                                }
                                                            })}
                                                            <Typography variant="paragraphxs">
                                                                {item.title}
                                                            </Typography>
                                                            {item.title === currItem  && (<KeyboardArrowRightOutlined 
                                                                sx={{
                                                                    fontSize: '14px',
                                                                    color: theme.palette.secondary.light
                                                                }}
                                                            />)}
                                                        </Box>
                                                    ))
                                                }
                                            </Box>

                                            <Box
                                                sx={{
                                                    p: 2,
                                                    borderLeft: `1px solid ${theme.palette.secondary.lighter}`,
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    width: isMobile ? '100%' : '80%',
                                                    height: 'auto'
                                                }}
                                            >
                                                {
                                                    currItem === 'User profile' 
                                                        ?   (
                                                                <Box
                                                                    sx={{
                                                                        display: 'flex',
                                                                        flexDirection: 'column'
                                                                    }}
                                                                >
                                                                    <form onSubmit={handleSubmit(onSubmit)} noValidate>
                                                                        {!isMobile && (<Typography variant='h6' mb={4}>
                                                                            User profile
                                                                        </Typography>)}

                                                                        <Box
                                                                            sx={{
                                                                                width: '100%',
                                                                                gap: 3,
                                                                                display: 'flex',
                                                                                flexDirection: isMobile ? 'column' : 'row'
                                                                            }}
                                                                        >
                                                                            <Box
                                                                                sx={{
                                                                                    width: isMobile ? '100%' : '50%'
                                                                                }}
                                                                            >
                                                                                <InputField
                                                                                    label="First Name"
                                                                                    placeholder="First name"
                                                                                    isBorder={true}
                                                                                    labelStyle={{
                                                                                        fontSize: theme.typography.labelxs.fontSize,
                                                                                        fontWeight: theme.typography.labelsm.fontWeight
                                                                                    }}
                                                                                    errorMessage={errors.firstName?.message}
                                                                                    error={!!errors.firstName}
                                                                                    register={register('firstName')}
                                                                                />
                                                                            </Box>
                                                                            <Box
                                                                                sx={{
                                                                                    width: isMobile ? '100%' : '50%'
                                                                                }}
                                                                            >
                                                                                <InputField
                                                                                    label="Last Name"
                                                                                    placeholder="last name"
                                                                                    isBorder={true}
                                                                                    labelStyle={{
                                                                                        fontSize: theme.typography.labelxs.fontSize,
                                                                                        fontWeight: theme.typography.labelsm.fontWeight
                                                                                    }}
                                                                                    errorMessage={errors.lastName?.message}
                                                                                    error={!!errors.lastName}
                                                                                    register={register('lastName')}
                                                                                />
                                                                            </Box>
                                                                        </Box>

                                                                        <Box
                                                                            sx={{
                                                                                width: '100%',
                                                                                gap: 3,
                                                                                display: 'flex',
                                                                                flexDirection: isMobile ? 'column' : 'row'
                                                                            }}
                                                                        >
                                                                            <Box
                                                                                sx={{
                                                                                    width: isMobile ? '100%' : '50%'
                                                                                }}
                                                                            >
                                                                                <InputField
                                                                                    label="Email"
                                                                                    placeholder="Email"
                                                                                    isBorder={true}
                                                                                    labelStyle={{
                                                                                        fontSize: theme.typography.labelxs.fontSize,
                                                                                        fontWeight: theme.typography.labelsm.fontWeight
                                                                                    }}
                                                                                    errorMessage={errors.email?.message}
                                                                                    error={!!errors.email}
                                                                                    register={register('email')}
                                                                                />
                                                                            </Box>
                                                                            <Box
                                                                                sx={{
                                                                                    width: isMobile ? '100%' : '50%'
                                                                                }}
                                                                            >
                                                                                <InputField
                                                                                    label="Phone Number"
                                                                                    placeholder="Phone number"
                                                                                    isBorder={true}
                                                                                    labelStyle={{
                                                                                        fontSize: theme.typography.labelxs.fontSize,
                                                                                        fontWeight: theme.typography.labelsm.fontWeight
                                                                                    }}
                                                                                    errorMessage={errors.phone?.message}
                                                                                    error={!!errors.phone}
                                                                                    register={register('phone')}
                                                                                />
                                                                            </Box>
                                                                        </Box>

                                                                        <Box
                                                                            sx={{
                                                                                width: '100%',
                                                                                gap: 3,
                                                                                display: 'flex',
                                                                                flexDirection: isMobile ? 'column' : 'row'
                                                                            }}
                                                                        >
                                                                            <Box
                                                                                sx={{
                                                                                    width: isMobile ? '100%' : '50%'
                                                                                }}
                                                                            >
                                                                                <InputField
                                                                                    label="Age"
                                                                                    placeholder="Age"
                                                                                    isBorder={true}
                                                                                    type='number'
                                                                                    labelStyle={{
                                                                                        fontSize: theme.typography.labelxs.fontSize,
                                                                                        fontWeight: theme.typography.labelsm.fontWeight
                                                                                    }}
                                                                                    errorMessage={errors.age?.message}
                                                                                    error={!!errors.age}
                                                                                    register={register('age')}
                                                                                />
                                                                            </Box>
                                                                            <Box
                                                                                sx={{
                                                                                    width: isMobile ? '100%' : '50%'
                                                                                }}
                                                                            >
                                                                                <InputField
                                                                                    label="Gender"
                                                                                    placeholder="Gender"
                                                                                    isBorder={true}
                                                                                    labelStyle={{
                                                                                        fontSize: theme.typography.labelxs.fontSize,
                                                                                        fontWeight: theme.typography.labelsm.fontWeight
                                                                                    }}
                                                                                    errorMessage={errors.gender?.message}
                                                                                    error={!!errors.gender}
                                                                                    register={register('gender')}
                                                                                />
                                                                            </Box>
                                                                        </Box>

                                                                        <Box
                                                                            sx={{
                                                                                width: '100%'
                                                                            }}
                                                                        >
                                                                            <InputField
                                                                                label="Address"
                                                                                placeholder="Address"
                                                                                isBorder={true}
                                                                                labelStyle={{
                                                                                    fontSize: theme.typography.labelxs.fontSize,
                                                                                    fontWeight: theme.typography.labelsm.fontWeight
                                                                                }}
                                                                                errorMessage={errors.address?.message}
                                                                                error={!!errors.address}
                                                                                register={register('address')}
                                                                            />
                                                                        </Box>

                                                                        <Box
                                                                            sx={{
                                                                                width: '100%',
                                                                                flexDirection: isMobile ? 'column' : 'row',
                                                                                display: 'flex', gap: 3, mt: 2, mb: '2.5rem'
                                                                            }}
                                                                        >
                                                                            <Box
                                                                                sx={{
                                                                                width: isMobile ? '100%' : '50%'
                                                                                }}
                                                                            >
                                                                                <Typography variant="labelxs" mb={2}>
                                                                                    State
                                                                                </Typography>
                                                                                <Select
                                                                                    className="w-full h-10 font-light"
                                                                                    options={state}
                                                                                    styles={customStyles}
                                                                                    placeholder="Select State"
                                                                                    name="state"
                                                                                    onChange={(item) => {
                                                                                        handleDistrict(String(item?.value));
                                                                                        setSelectedState(String(item?.value));
                                                                                    }}
                                                                                    value={{
                                                                                        value: selectedState,
                                                                                        label: selectedState
                                                                                    }}
                                                                                />
                                                                            </Box>
                                                                            <Box
                                                                                sx={{
                                                                                width: isMobile ? '100%' : '50%'
                                                                                }}
                                                                            >
                                                                               <Typography variant="labelxs" mb={2}>
                                                                                    LGA
                                                                                </Typography>
                                                                                <Select
                                                                                    className="w-full h-10 font-light"
                                                                                    options={district}
                                                                                    styles={customStyles}
                                                                                    placeholder="Select LGA"
                                                                                    name="lga"
                                                                                    onChange={(item) => {
                                                                                        setSelectedDistrict(String(item?.value))
                                                                                    }}
                                                                                    value={{
                                                                                        value: selectedDistrict,
                                                                                        label: selectedDistrict,
                                                                                    }}
                                                                                />
                                                                            </Box>
                                                                        </Box>
                                                                        
                                                                        <PButton transBg={false} bg={true} width="100%" type="submit">
                                                                            <Typography sx={{fontSize: theme.typography.labelsm.fontSize}}>
                                                                                <FileDownloadOutlined/> Save Changes
                                                                            </Typography>
                                                                        </PButton>
                                                                    </form>
                                                                </Box>
                                                            )
                                                        :   (
                                                                <Box
                                                                    sx={{
                                                                        display: 'flex',
                                                                        flexDirection: 'column'
                                                                    }}
                                                                >
                                                                    <form onSubmit={handleSubmit(onSubmitPass)} noValidate>
                                                                        {!isMobile && (<Typography variant='h6' mb={4}>
                                                                            Change password
                                                                        </Typography>)}

                                                                        <Box
                                                                            sx={{
                                                                                width: '100%',
                                                                                gap: 3,
                                                                                display: 'flex',
                                                                                flexDirection: isMobile ? 'column' : 'row',
                                                                                mb: 4
                                                                            }}
                                                                        >
                                                                            <Box
                                                                                sx={{
                                                                                    width: isMobile ? '100%' : '50%'
                                                                                }}
                                                                            >
                                                                                <InputField
                                                                                    label="Old Password"
                                                                                    placeholder="Old Password"
                                                                                    isBorder={true}
                                                                                    labelStyle={{
                                                                                        fontSize: theme.typography.labelxs.fontSize,
                                                                                        fontWeight: theme.typography.labelsm.fontWeight
                                                                                    }}
                                                                                    errorMessage={errors.oldPassword?.message}
                                                                                    error={!!errors.oldPassword}
                                                                                    register={register('oldPassword')}
                                                                                />
                                                                            </Box>
                                                                            <Box
                                                                                sx={{
                                                                                    width: isMobile ? '100%' : '50%'
                                                                                }}
                                                                            >
                                                                                <InputField
                                                                                    label="New Password"
                                                                                    placeholder="New Password"
                                                                                    isBorder={true}
                                                                                    labelStyle={{
                                                                                        fontSize: theme.typography.labelxs.fontSize,
                                                                                        fontWeight: theme.typography.labelsm.fontWeight
                                                                                    }}
                                                                                    errorMessage={errors.newPassword?.message}
                                                                                    error={!!errors.newPassword}
                                                                                    register={register('newPassword')}
                                                                                />
                                                                            </Box>
                                                                        </Box>

                                                                        <PButton transBg={false} bg={true} width="100%" type="submit">
                                                                            <Typography sx={{fontSize: theme.typography.labelsm.fontSize}}>
                                                                                <FileDownloadOutlined/> Save Changes
                                                                            </Typography>
                                                                        </PButton>
                                                                    </form>
                                                                </Box>
                                                            )
                                                }
                                            </Box>
                                        </Box>
                                    )
                                :   (
                                        <Box
                                            sx={{
                                                display: 'flex',
                                                flexDirection: 'column',
                                                p: 2, width: '100%',
                                                gap: 3
                                            }}
                                        >
                                            {
                                                insightCurrentData.map((review, index) => (
                                                    <Box key={index}
                                                        sx={{
                                                            borderRadius: theme.borderRadius.sm,
                                                            border: `1px solid ${theme.palette.secondary.lighter}`,
                                                            display: 'flex',
                                                            flexDirection: 'column',
                                                            p: 4, gap: 2
                                                        }}
                                                    >
                                                        <Box
                                                            sx={{
                                                                display: 'flex',
                                                                justifyContent: 'space-between'
                                                            }}
                                                        >
                                                            <Rating
                                                                name="half-rating-read"
                                                                size={'small'}
                                                                value={review.rating}
                                                                precision={0.5}
                                                                readOnly
                                                                sx={{ color: theme.palette.state.warning }}
                                                            />
                                                             <Typography variant="labelxxs" color={theme.palette.secondary.light}>
                                                                {review.createdAt}
                                                            </Typography>
                                                        </Box>
                                                        <Typography variant="labelsm">
                                                            {review.title}
                                                        </Typography>
                                                        <Typography variant="labelxs" color={theme.palette.secondary.light}>
                                                            {review.content}
                                                        </Typography>
                                                    </Box>
                                                ))
                                            }

                                            <Box
                                                sx={{
                                                    width: '100%',
                                                    display: 'flex',
                                                    justifyContent: 'center',
                                                    alignItems: 'center',
                                                    mt: 5
                                                }}
                                                >
                                                {insights.length !== 0 && (<Pagination
                                                    currentPage={currPage}
                                                    totalPages={insightTotalPages}
                                                    onPageChange={handlePageChangeInsight}
                                                />)}
                                            </Box>
                                        </Box>
                                    )
                    }
                </Box>
            </Box>
        </Box>
    )
}
