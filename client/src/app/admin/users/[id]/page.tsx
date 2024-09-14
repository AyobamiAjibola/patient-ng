'use client';

import InputField from "@/app/components/InputField";
import PButton, { NButton } from "@/app/components/PButton";
import Pagination from "@/app/components/Pagination";
import { ArrowBack, FiberManualRecord, FileDownloadOutlined, KeyboardArrowRightOutlined, LockOutlined, PersonOutline } from "@mui/icons-material";
import { Avatar, Box, Button, Divider, LinearProgress, Rating, Typography, linearProgressClasses, styled, useMediaQuery, useTheme } from "@mui/material";
import { Tag } from "antd";
import { useRouter } from "next/navigation";
import { createElement, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { stateLga } from "@/constant/state";
import { customStyles } from "@/constant/customStyles";
import Select from "react-select";
import { formAmount, wordBreaker } from "@/lib/helper";
import { useChangeReviewStatus, useFetchSingleUser, useResetUserPassword, useToggleUserStatus, useUpdateUser } from "../../hooks/userHook/useUser";
import { useSession } from "next-auth/react";
import MultiSelectComponent from "../../components/MultiSelect";
import capitalize from "capitalize";
import Toastify from "@/app/components/ToastifySnack";
import { useActivateCrowdfunding, useGetActiveCrowdfunding, useMarkCrowdfundingDone } from "../../hooks/crowdFuncdingHook/useCrowdFunding";
import { useUsersAdvocacies } from "../../hooks/advocacyHook/useAdvocacy";
import { useGetUserInsights } from "../../hooks/insightHook/useInsight";
import moment from "moment";

const item = [
    "User information",
    "Crowdfunding",
    "Advocacy",
    "Insights"
];

const userInfo = [
    {
        title: 'User profile',
        icon: PersonOutline
    },
    {
        title: 'Reset password',
        icon: LockOutlined
    }
];

type FormValues = {
    firstName?: string,
    lastName?: string,
    email?: string,
    phone?: string,
    age?: 0,
    gender?: string,
    address?: string,
    newPassword?: string,
    resetEmail?: string
}

type OptionType = {
    label: string;
    value: string;
};

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
    const [selectedGender, setSelectedGender] = useState<string>('');
    const getUserMutation = useFetchSingleUser();
    const {data: session} = useSession();
    const [selectedOptions, setSelectedOptions] = useState<OptionType[]>([]);
    const updateUserMutation = useUpdateUser();
    const resetUserPassword = useResetUserPassword();
    const toggleUserStatus = useToggleUserStatus();
    const getActiveCrowdfundingMutation = useGetActiveCrowdfunding();
    const [recordedDonations, setRecordedDonations] = useState<number>(0);
    const toggleCrowdfundingStatusMutation = useActivateCrowdfunding();
    const [percent, setPercent] = useState<number>(0);
    const markCampaignAsDoneMutation = useMarkCrowdfundingDone();
    const getUsersAdvocacyMutation = useUsersAdvocacies();
    const [advocacy, setAdvocacy] = useState<any>([]);
    const [insights, setInsights] = useState<any>([]);
    const userInsightsMutation = useGetUserInsights();
    const reviewStatusMutation = useChangeReviewStatus();
    const [status, setStatus] = useState<string>('');

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

    //Advocacy pagination
    const itemsPerPage = advocacy.length ? 10 : advocacy.length;
    const totalPages = Math.ceil(advocacy.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, advocacy.length);
    const currentData = advocacy.slice(startIndex, endIndex);

    //Insights pagination
    const insightItemsPerPage = insights?.length ? 10 : insights?.length;
    const insightTotalPages = Math.ceil(insights?.length / insightItemsPerPage);
    const insightStartIndex = (currPage - 1) * insightItemsPerPage;
    const insightEndIndex = Math.min(insightStartIndex + insightItemsPerPage, insights?.length);
    const insightCurrentData = insights?.slice(insightStartIndex, insightEndIndex);

    const handleUserStatus = async() => {
        if(getUserMutation.data?.result) {
            await toggleUserStatus.mutateAsync(getUserMutation.data?.result?._id, {
                onSuccess: async (response: any) => {
                    await getUserMutation.mutateAsync(params.id)
                    handleOpenNotification('success', response.message)
                },
                onError: (error: any) => {
                    const errorMessage = error.response?.data?.message || 'An unexpected error occurred';
                    handleOpenNotification('error', '', errorMessage)
                }
            })
        } else {
            return null;
        }
    }

    const handleChangeReviewStatus = async (id: string) => {
        const payload = {
            reviewId: id,
            status
        }
        await reviewStatusMutation.mutateAsync(payload, {
            onSuccess: () => {
                fetchInsights()
                handleOpenNotification('success', `Successfully changed status to ${status}`)
            },
            onError: (error: any) => {
                const errorMessage = error.response?.data?.message || 'An unexpected error occurred';
                handleOpenNotification('error', '', errorMessage)
            }
        })
    }

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

    const fetchInsights = async () => {
        await userInsightsMutation.mutateAsync(params.id, {
            onSuccess: (response: any) => {
                setInsights(response.results)
            }
        })
    }

    const handleToggleStatus = async () => {
        await toggleCrowdfundingStatusMutation.mutateAsync(getActiveCrowdfundingMutation.data?.result._id, {
            onSuccess: async (response: any) => {
                await getActiveCrowdfundingMutation.mutateAsync(params.id)
                handleOpenNotification('success', "Successfully updated status.")
            },
            onError: (error: any) => {
                const errorMessage = error.response?.data?.message || 'An unexpected error occurred';
                handleOpenNotification('error', '', errorMessage)
            }
        })
    };

    const handleMarkDone = async () => {
        await markCampaignAsDoneMutation.mutateAsync(getActiveCrowdfundingMutation.data?.result._id, {
            onSuccess: async (response: any) => {
                await getActiveCrowdfundingMutation.mutateAsync(params.id)
                handleOpenNotification('success', "Successfully marked campaign as done.")
            },
            onError: (error: any) => {
                const errorMessage = error.response?.data?.message || 'An unexpected error occurred';
                handleOpenNotification('error', '', errorMessage)
            }
        })
    }

    const handlePageChange = (newPage: any) => {
        setCurrentPage(newPage);
    };

    const handlePageChangeInsight = (newPage: any) => {
        setCurrPage(newPage);
    };

    const onSubmit = async (data: FormValues) => {
        let perms: string[] = []
        if(selectedOptions) {
            selectedOptions.forEach(obj => {
                perms.push(obj.value)
            });
        }

        const payload = {
          ...data,
          userType: perms,
          gender: selectedGender,
          state: selectedState,
          lga: selectedDistrict,
          userId: params.id
        }

        await updateUserMutation.mutateAsync(payload)
    }

    const onSubmitPass = async (data: FormValues) => {
        const email = getUserMutation.data?.result.email
        if(email !== data.resetEmail) {
            handleOpenNotification('error', '', 'Please enter the correct user email.')
            return;
        }
        const payload = {
            email: data.resetEmail
        }

        await resetUserPassword.mutateAsync(payload, {
            onSuccess: (response: any) => {
                handleOpenNotification('success', response.message)
            },
            onError: (error: any) => {
                const errorMessage = error.response?.data?.message || 'An unexpected error occurred';
                handleOpenNotification('error', '', errorMessage)
            }
        })
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
        setValue
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
        if(params) {
            getUserMutation.mutateAsync(params.id)
        }
    },[params, session]);

    useEffect(() => {
        if(params) {
            getUsersAdvocacyMutation.mutateAsync(params.id)
        }
    },[params, session]);
    
    useEffect(() => {
        if(getUserMutation.isSuccess) {
            const data = getUserMutation.data?.result
            setValue('firstName', data.firstName || '');
            setValue('lastName', data.lastName || '');
            setValue('email', data.email || '');
            setValue('phone', data.phone || '');
            setValue('age', data.age || 0);
            setValue('address', data.address || '');
            setSelectedState(data.state || '');
            setSelectedDistrict(data.lga || '');
            setSelectedGender(data.gender || '');
            if(data.userType.length > 0) {
                let type = data.userType.map((item: any) => ({
                    label: capitalize.words(item),
                    value: item
                }));
                setSelectedOptions(type)
            }
        }
    },[getUserMutation.isSuccess]);

    useEffect(() => {
        if(updateUserMutation.isSuccess) {
            getUserMutation.mutateAsync(params.id)
        }
    },[updateUserMutation.isSuccess, params, session]);

    useEffect(() => {
        const fetchActiveCrowdfunding = async () => {
            await getActiveCrowdfundingMutation.mutateAsync(params.id)
        }
        
        fetchInsights()
        fetchActiveCrowdfunding()
    },[params, session]);

    useEffect(() => {
        if (getActiveCrowdfundingMutation.isSuccess) {
            const { donations } = getActiveCrowdfundingMutation.data?.result || {};

            if (donations) {
                const total = donations.reduce((acc: any, donation: any) => acc + Number(donation.amount), 0);
                setRecordedDonations(total);
            }
        }
    }, [getActiveCrowdfundingMutation.isSuccess]);    
    
    useEffect(() => {
        const { amountNeeded } = getActiveCrowdfundingMutation.data?.result || {};
    
        if (amountNeeded) {
            const per = (Number(recordedDonations) / Number(amountNeeded)) * 100;
            setPercent(per);
        }
    }, [getActiveCrowdfundingMutation.isSuccess, recordedDonations]);

    useEffect(() => {
        if(getUsersAdvocacyMutation.isSuccess) {
            setAdvocacy(getUsersAdvocacyMutation.data?.results)
        }
    },[getUsersAdvocacyMutation.isSuccess]);

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
                        <img
                            src={getUserMutation.data?.result?.image ? `${process.env.NEXT_PUBLIC_SERVER_URL}/${getUserMutation.data?.result?.image}` : "/model.png"}
                            alt="image"
                            style={{
                                width: 100,
                                height: 100,
                                borderRadius: '50%'
                            }}
                            crossOrigin="anonymous"
                        />
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                mt: 4
                            }}
                        >
                            <Typography variant="labelsm">
                                {capitalize.words(getUserMutation.data?.result?.firstName || '')} {capitalize.words(getUserMutation.data?.result?.lastName || '')}
                            </Typography>
                            <Typography variant="paragraphxs"
                                sx={{
                                    color: theme.palette.secondary.light
                                }}
                            >
                                {getUserMutation.data?.result?.email || ''}
                            </Typography>
                        </Box>
                    </Box>

                    {!isMobile && getUserMutation.data?.result && (<Box
                        sx={{
                            display: 'flex',
                            gap: 2, mt: 4
                        }}
                    >
                        <NButton
                            disabled={getUserMutation.isLoading}
                            bkgcolor={getUserMutation.data?.result?.active ? 'red' : theme.palette.primary.main}
                            textcolor={"white"}
                            hoverbordercolor={getUserMutation.data?.result?.active ? 'red' : theme.palette.primary.main}
                            onClick={handleUserStatus}
                            hovercolor={getUserMutation.data?.result?.active ? 'red' : theme.palette.primary.main}
                        >
                            {getUserMutation.data?.result?.active ? 'Deactivate user' : 'Activate user'}
                        </NButton>
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
                                {getActiveCrowdfundingMutation.data?.result ? (
                                <>
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
                                            src={getActiveCrowdfundingMutation.data.result ? `${process.env.NEXT_PUBLIC_SERVER_URL}/${getActiveCrowdfundingMutation.data.result.image}` : '/crowd1.png'}
                                            crossOrigin="anonymous"
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
                                                    border: `1px solid ${getActiveCrowdfundingMutation.data.result.status === 'active' ? theme.palette.primary.main : theme.palette.state.warning}`,
                                                    borderRadius: theme.borderRadius.md,
                                                    bgcolor: 'white'
                                                }}
                                            >
                                                <Typography variant={isMobile ? 'labelxs' : 'labelsm'}
                                                    sx={{
                                                        color: getActiveCrowdfundingMutation.data.result.status === 'active' 
                                                            ? theme.palette.primary.main
                                                            : theme.palette.state.warning
                                                    }}
                                                >
                                                    {getActiveCrowdfundingMutation.data.result.status === 'pending' 
                                                        ? 'Awaiting review' 
                                                        : capitalize.words(getActiveCrowdfundingMutation.data.result.status)}
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
                                                    bkgcolor={theme.palette.primary.main}
                                                    textcolor="white"
                                                    onClick={handleMarkDone}
                                                >
                                                    <Typography variant={isMobile ? "paragraphxxs" : "paragraphsm"}>
                                                        {markCampaignAsDoneMutation.isLoading ? 'Loading...' : 'Mark campaign as done'}
                                                    </Typography>
                                                </NButton>
                                                <NButton
                                                    onClick={handleToggleStatus}
                                                    bkgcolor={getActiveCrowdfundingMutation.data.result.status === "pending" 
                                                                ? theme.palette.primary.main
                                                                : getActiveCrowdfundingMutation.data?.result && getActiveCrowdfundingMutation.data?.result.status === "inactive"
                                                                    ? theme.palette.primary.main
                                                                    : "red"
                                                            }
                                                    textcolor="white"
                                                    hoverbordercolor={getActiveCrowdfundingMutation.data.result.status === "pending" 
                                                                        ? theme.palette.primary.main
                                                                        : getActiveCrowdfundingMutation.data?.result && getActiveCrowdfundingMutation.data?.result.status === "inactive"
                                                                            ? theme.palette.primary.main
                                                                            : "red"
                                                                    }
                                                    hovercolor={getActiveCrowdfundingMutation.data.result.status === "pending" 
                                                                    ? theme.palette.primary.main
                                                                    : getActiveCrowdfundingMutation.data?.result && getActiveCrowdfundingMutation.data?.result.status === "inactive"
                                                                        ? theme.palette.primary.main
                                                                        : "red"
                                                                }           
                                                >
                                                    <Typography variant={isMobile ? "paragraphxxs" : "paragraphsm"}>
                                                        {getActiveCrowdfundingMutation.data.result.status === "pending" || getActiveCrowdfundingMutation.data?.result && getActiveCrowdfundingMutation.data.result.status === "inactive"
                                                            ? getActiveCrowdfundingMutation.isLoading ? "Loading..." : "Approve"
                                                            : getActiveCrowdfundingMutation.isLoading ? "Loading..." : "Deactivate campaign"
                                                        }
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
                                                src={getActiveCrowdfundingMutation.data.result.user.image 
                                                        ? `${process.env.NEXT_PUBLIC_SERVER_URL}/${getActiveCrowdfundingMutation.data.result.user.image}`
                                                        : '/model.png'}
                                                alt="crowdfunding image"
                                                sx={{
                                                    width: '40px',
                                                    height: '40px',
                                                    mr: 1
                                                }}
                                            />
                                            <Typography variant="labelxs">
                                                {capitalize.words(getActiveCrowdfundingMutation.data.result.user.firstName)} {capitalize.words(getActiveCrowdfundingMutation.data.result.user.lastName)}
                                            </Typography>
                                            <Typography variant="paragraphxs">
                                                is organising a fundraiser on behalf of
                                            </Typography>
                                            <Typography variant="labelxs">
                                                {capitalize.words(getActiveCrowdfundingMutation.data.result.fundraisingFor)}
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
                                            {getActiveCrowdfundingMutation.data.result.address}
                                        </Typography>
                                        <Box
                                            sx={{
                                                display: 'flex',
                                                gap: 1, mt: 3, mb: 1,
                                                alignItems: 'center'
                                            }}
                                        >
                                            <Typography variant="labelsm">
                                                {formAmount(recordedDonations)}
                                            </Typography>
                                            <Typography variant="paragraphsm"
                                                sx={{
                                                    color: theme.palette.secondary.light
                                                }}
                                            >
                                                {`of ${formAmount(+getActiveCrowdfundingMutation.data.result.amountNeeded)} goal`}
                                            </Typography>
                                        </Box>
                                        <BorderLinearProgress variant="determinate" value={percent} />
                                        <Typography variant="labelxs"
                                            sx={{
                                                color: theme.palette.secondary.light
                                            }}
                                        >
                                            {getActiveCrowdfundingMutation.data.result.donations.length} donations
                                        </Typography>
                                    </Box>
                                </>
                                ) : (
                                    <Box display={'flex'} justifyContent={'center'} alignItems={'center'}>
                                        <Typography>
                                            This user does not have any active or pending campaign.
                                        </Typography>
                                    </Box>
                                )
                                
                            }
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
                                            currentData.map((item: any, index: number) => (
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
                                                    onClick={() => router.push(`/admin/advocacy/${item._id}`)}
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
                                                            <Tag color={item.status === "pending" ? "orange" : item.status === "in-progress" ? "green" : "red"}
                                                                style={{
                                                                    color: item.status === "pending" ? "orange" : item.status === "in-progress" ? "green" : "red"
                                                                }}
                                                            >
                                                                <FiberManualRecord sx={{fontSize: '12px'}}/> {capitalize.words(item.status.replace('-', ' '))}
                                                            </Tag>
                                                        </Box> 
                                                        <Typography variant="paragraphxs">
                                                            {item.reference}
                                                        </Typography>
                                                    </Box>
                                                    <Typography variant="paragraphsm" color={theme.palette.secondary.light}>
                                                    {item.hospitalAddress}
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
                                                                               <Typography variant="labelxs" mb={2}>
                                                                                    Gender
                                                                                </Typography>
                                                                                <Select
                                                                                    className="w-full h-10 font-light"
                                                                                    options={[
                                                                                        {value: "male", label: "Male"},
                                                                                        {value: "female", label: "Female"}
                                                                                    ]}
                                                                                    styles={customStyles}
                                                                                    placeholder="Select Gender"
                                                                                    name="gender"
                                                                                    onChange={(item) => {
                                                                                        setSelectedGender(String(item?.value))
                                                                                    }}
                                                                                    value={{
                                                                                        value: selectedGender,
                                                                                        label: selectedGender,
                                                                                    }}
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
                                                                        <Box
                                                                            sx={{
                                                                                width: '100%',
                                                                                mb: 4
                                                                            }}
                                                                        >
                                                                            <MultiSelectComponent
                                                                                setSelectedOptions={setSelectedOptions}
                                                                                labelStyle={{
                                                                                    fontSize: theme.typography.labelbase.fontSize,
                                                                                    fontWeight: 500
                                                                                }}
                                                                                label="Select user permissions"
                                                                                selectedOptions={selectedOptions}
                                                                            />
                                                                        </Box>
                                                                        
                                                                        <PButton transBg={false} bg={true} width="100%" type="submit">
                                                                            <Typography sx={{fontSize: theme.typography.labelsm.fontSize}}>
                                                                                <FileDownloadOutlined/> {updateUserMutation.isLoading ? 'Saving...' : 'Save Changes'}
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
                                                                            Reset user password
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
                                                                                    width: '100%'
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
                                                                                    errorMessage={errors.resetEmail?.message}
                                                                                    error={!!errors.resetEmail}
                                                                                    register={register('resetEmail')}
                                                                                />
                                                                            </Box>
                                                                        </Box>

                                                                        <PButton transBg={false} bg={true} width="100%" type="submit">
                                                                            <Typography sx={{fontSize: theme.typography.labelsm.fontSize}}>
                                                                                <FileDownloadOutlined/> {resetUserPassword.isLoading ? 'Saving...' : 'Save Changes'}
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
                                    insightCurrentData.length > 0
                                        ? <Box
                                                sx={{
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    p: 2, width: '100%',
                                                    gap: 3
                                                }}
                                            >
                                                {
                                                    insightCurrentData.map((review: any, index: number) => {
                                                        const reviewData = review.review;
                                                        return (
                                                            <Box key={index}
                                                                sx={{
                                                                    borderRadius: theme.borderRadius.sm,
                                                                    border: `1px solid ${theme.palette.secondary.lighter}`,
                                                                    display: 'flex',
                                                                    flexDirection: 'column',
                                                                    cursor: 'pointer',
                                                                    p: 4, gap: 2
                                                                }}
                                                            >
                                                                <Box
                                                                    sx={{
                                                                        display: 'flex',
                                                                        gap: 2,
                                                                        alignItems: 'center'
                                                                    }}
                                                                >
                                                                    <img
                                                                        src={getUserMutation.data?.result?.image ? `${process.env.NEXT_PUBLIC_SERVER_URL}/${getUserMutation.data?.result?.image}` : "/model.png"}
                                                                        alt="user image"
                                                                        style={{
                                                                            width: 40,
                                                                            height: 40,
                                                                            borderRadius: '50%'
                                                                        }}
                                                                        crossOrigin="anonymous"
                                                                    />
                                                                    <Box
                                                                        sx={{
                                                                            display: 'flex',
                                                                            flexDirection: 'column'
                                                                        }}
                                                                    >
                                                                        <Typography variant="labelxxs" className="capitalize">
                                                                            {reviewData.user.firstName} {reviewData.user.lastName}
                                                                        </Typography>
                                                                        <Typography variant="paragraphxxs"color={theme.palette.secondary.light}>
                                                                            {getUserMutation.data?.result?.email || ''}
                                                                        </Typography>
                                                                    </Box>
                                                                </Box>
                                                                <Divider sx={{mt: 1,}}/>
                                                                <Box
                                                                    sx={{
                                                                        display: 'flex',
                                                                        justifyContent: 'space-between'
                                                                    }}
                                                                >
                                                                    <Rating
                                                                        name="half-rating-read"
                                                                        size={'small'}
                                                                        value={reviewData.rating}
                                                                        precision={0.5}
                                                                        readOnly
                                                                        sx={{ color: theme.palette.state.warning }}
                                                                    />
                                                                    <Typography variant="labelxxs" color={theme.palette.secondary.light}>
                                                                        {moment(reviewData.createdAt).fromNow()}
                                                                    </Typography>
                                                                </Box>
                                                                <Typography variant="labelsm">
                                                                    {review.hospital.hospitalName}
                                                                </Typography>
                                                                <Typography variant="labelsm" color={theme.palette.secondary.light}>
                                                                    {wordBreaker(reviewData.review, 30)}
                                                                </Typography>
                                                                <Divider sx={{mt: 3, mb: 2}}/>
                                                                <Box
                                                                    sx={{
                                                                        display: 'flex',
                                                                        gap: 2,
                                                                        justifyContent: 'flex-end',
                                                                        alignItems: 'center'
                                                                    }}
                                                                >
                                                                    <NButton
                                                                        bkgcolor={reviewData.status === "Rejected" ? theme.palette.border.main : "transparent"}
                                                                        textcolor={reviewData.status === "Rejected" ? theme.palette.secondary.light : theme.palette.state.error}
                                                                        hoverbordercolor={theme.palette.state.error}
                                                                        hovercolor={theme.palette.state.error}
                                                                        bordercolor={reviewData.status === "Rejected" ? theme.palette.border.main : theme.palette.state.error}
                                                                        onClick={()=>handleChangeReviewStatus(reviewData._id)}
                                                                        onMouseEnter={()=>setStatus("Rejected")}
                                                                        disabled={reviewData.status === "Rejected"}
                                                                    >
                                                                        Reject
                                                                    </NButton>
                                                                    <NButton
                                                                        bkgcolor={reviewData.status === "Accepted" ? theme.palette.border.main : theme.palette.primary.main}
                                                                        textcolor={reviewData.status === "Accepted" ? theme.palette.secondary.light : "white"}
                                                                        hovercolor={theme.palette.primary.main}
                                                                        onClick={()=>handleChangeReviewStatus(reviewData._id)}
                                                                        onMouseEnter={()=>setStatus("Accepted")}
                                                                        disabled={reviewData.status === "Accepted"}
                                                                    >
                                                                        Approve
                                                                    </NButton>
                                                                </Box>
                                                            </Box>
                                                    )})
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
                                        :   <Box justifyContent={'center'} alignItems={'center'}>
                                                <Typography variant="labellg">
                                                    No data found.
                                                </Typography>
                                            </Box>
                                    )
                    }
                </Box>
            </Box>

            <Toastify
                open={open}
                onClose={() => setOpen(false)}
                message={message}
                error={isError}
                success={isSuccess}
            />
        </Box>
    )
}
