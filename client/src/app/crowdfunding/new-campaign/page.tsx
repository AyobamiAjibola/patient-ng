'use client'

import ImagePreviewSingle from "@/app/components/ImagePreviewSingle";
import ImageUploader from "@/app/components/ImageUploader";
import Navbar from "@/app/components/Navbar"
import { NButton, PButton2 } from "@/app/components/PButton";
import StepperVertical from "@/app/components/Stepper";
import { Avatar, Box, CircularProgress, Typography, useMediaQuery, useTheme } from "@mui/material"
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useAtom } from 'jotai';
import { selectedImageArrayAtom } from '@/lib/atoms';
import { ArrowBack, ArrowForward, CheckCircleOutline } from "@mui/icons-material";
import InputField from "@/app/components/InputField";
import Select from "react-select";
import { customStyles } from "@/constant/customStyles";
import { stateLga } from "@/constant/state";
import { formAmount } from "@/lib/helper";
import useBank from "@/app/hooks/useBank";
import { banks } from "@/constant/bank";
import capitalize from "capitalize";
import Toastify from "@/app/components/ToastifySnack";
import { useCreateCrowdfunding } from "@/app/admin/hooks/crowdFuncdingHook/useCrowdFunding";
import { useSession } from "next-auth/react";
import { useFetchSingleUser } from "@/app/admin/hooks/userHook/useUser";
import { motion } from "framer-motion";

interface IProps {
    title: string;
    state: string;
    lga: string;
    description: string;
    firstName: string;
    lastName: string;
    accountNumber: string;
    bank: string;
    accountName: string;
    amount: string;
    bankCode: string;
    address: string;
}

const containerVariants = {
    hidden: {
      opacity: 0,
      y: 50
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 1 }
    }
}

export default function page() {
    const theme = useTheme();
    const isMobile = useMediaQuery('(max-width: 900px)');
    const router = useRouter();
    const [campaignImg, _] = useAtom(selectedImageArrayAtom);
    const [activeStep, setActiveStep] = useState(0);
    const steps = typeof sessionStorage !== 'undefined' && sessionStorage.getItem('step');
    const [isError, setIsError] = useState<boolean>(false);
    const [state, setState] = useState([]);
    const [bank, setBank] = useState([]);
    const [district, setDistrict] = useState<any[]>([]);
    const { verifyBank, verifyBankIsLoading, verified } = useBank();
    const [isErrorMsg, setIsErrorMsg] = useState<boolean>(false);
    const { data: session } = useSession();
    const singleUserMutation = useFetchSingleUser();
    const [userImg, setUserImg] = useState<string>('');

    const MotionBox = motion(Box);

    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState('');
    const [isSuccess, setIsSuccess] = useState(false);
    const createCrowdfundingMutation = useCreateCrowdfunding();

    const handleOpenNotification = (type: 'success' | 'error', successMsg?: string, errorMsg?: string) => {
        setMessage(type === 'success' ? successMsg || 'Operation was successful!' : errorMsg || 'There was an error!');
        setIsError(type === 'error');
        setIsSuccess(type === 'success');
        setOpen(true);
    };

    const [data, setData] = useState<IProps>({
        title: '',
        state: '',
        lga: '',
        description: '',
        firstName: '',
        lastName: '',
        accountNumber: '',
        bank: '',
        accountName: '',
        amount: '',
        bankCode: '',
        address: ''
    })

    const serializedData = typeof sessionStorage !== 'undefined' && sessionStorage.getItem('fundraiserData');
    const getHeight = () => {
    if (typeof window !== 'undefined') {
        return window.innerHeight;
    }
    // Return a default height or handle the case where window is not available
        return 0;
    };

    const screenHeight = getHeight();

    const handleNext = async () => {
        if(campaignImg.length === 0) {
            handleOpenNotification('error', '', 'Please upload an image.')
            return;
        }

        const obj: IProps = {
            title: data.title,
            state: data.state,
            lga: data.lga,
            description: data.description,
            firstName: data.firstName,
            lastName: data.lastName,
            accountNumber: data.accountNumber,
            bank: data.bank,
            accountName: data.accountName,
            amount: data.amount,
            bankCode: data.bankCode,
            address: data.address
        }
        
        const toStore = JSON.stringify(obj);
        sessionStorage.setItem('fundraiserData', toStore);

        const next = activeStep + 1
        sessionStorage.setItem('step', next.toString())

        setActiveStep((prevActiveStep) => {
            return (prevActiveStep + 1)
        });
    };

    const handleSubmitCampaign = async () => {
        if(!session?.user) {
            handleOpenNotification('error', '', 'Please sign in to proceed.')
            return;
        }
        if(campaignImg.length === 0) {
            handleOpenNotification('error', '', 'Please upload an image.')
            return;
        }
        if(data.accountName === '' || data.accountNumber === '' || data.bank === '') {
            handleOpenNotification('error', '', 'Please fill the beneficiary account details.')
            return;
        }

        const payload = sessionStorage.getItem('fundraiserData');
        const obj = JSON.parse(payload as any);

        const reqObject = {
            ...obj,
            image: campaignImg[0]
        }

        await createCrowdfundingMutation.mutateAsync(reqObject, {
            onSuccess: (response) => {
                setIsErrorMsg(false)
                handleOpenNotification('success', response.message)
                router.push('/crowdfunding')
                sessionStorage.removeItem('fundraiserData')
                sessionStorage.removeItem('step')
            },
            onError: (error: any) => {
                setIsErrorMsg(true)
                const errorMessage = error.response?.data?.message || 'An unexpected error occurred';
                handleOpenNotification('error', '', errorMessage)
            }
        })
    }

    const handleBack = () => {
        const prev = activeStep - 1
        sessionStorage.setItem('step', prev.toString())
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

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

    useEffect(() => {
        if(steps) {
            setActiveStep(+steps)
        }
    },[steps]);

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
        if(banks) {
            let bankArray: any = [];
    
            banks?.map((item: any, index: number) => {
                bankArray.push({
                    value: item.name,
                    label: item.name,
                    code: item.code
                });
            });

            setBank(bankArray);
        }
        
    }, [banks]);

    useEffect(() => {
        if(serializedData) {
            const deserialize = JSON.parse(serializedData);

            setData(deserialize)
        }
    },[sessionStorage]);

    // useEffect(() => {
    //     const handleVeriBank = async () => {
    //         if(data.accountNumber.length === 10 && data.bankCode) {
    //             await verifyBank.mutateAsync({
    //                 accountNumber: data.accountNumber,
    //                 bankCode: data.bankCode
    //             })
    //         }
    //     }

    //     handleVeriBank();
    // },[data.accountNumber, data.bankCode]);

    const hasMounted = useRef(false);

    useEffect(() => {
        const handleFetch = async () => {
            await singleUserMutation.mutateAsync(session?.user.userId as string, {
                onSuccess: (response: any) => {
                    setUserImg(response.result.image)
                }
            })
        }
        
        handleFetch();
    },[session]);

    useEffect(() => {
        const handleVeriBank = async () => {
            if (data.accountNumber.length === 10 && data.bankCode) {
                try {
                    await verifyBank.mutateAsync({
                        accountNumber: data.accountNumber,
                        bankCode: data.bankCode
                    });
                } catch (error) {
                    console.error('Bank verification failed', error);
                }
            }
        };

        if (hasMounted.current) {
            handleVeriBank();
        } else {
            hasMounted.current = true;
        }
    }, [data.accountNumber, data.bankCode]);

    useEffect(() => {
        if(verifyBank.isError) {
            handleOpenNotification('error', '', 'Could not resolve account name. Please confirm the account number and bank.')
        }
    },[verifyBank.isError])

    useEffect(() => {
        if(verifyBank.isSuccess) {
            setData({...data, accountName: verified})
        }
    },[verifyBank.isSuccess]);

    return (
        <>
            <Navbar/>
            <MotionBox
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                sx={{
                    display: 'flex',
                    height: screenHeight
                }}
            >
                {!isMobile && (<Box
                    sx={{
                        width: '30%',
                        height: '100%',
                        borderRight: `1px solid ${theme.palette.secondary.lighter}`,
                        pl: '75px', py: 4, pr: 2
                    }}
                >
                    <StepperVertical
                        activeStep={activeStep}
                        setActiveStep={setActiveStep}
                    />
                </Box>)}

                <Box
                    sx={{
                        flexDirection: 'column',
                        width: isMobile ? '100%' : '70%',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: '100%'
                    }}
                >
                    {steps && steps !== '4' && (<Box
                        sx={{
                            width: '100%',
                            height: isMobile ? 'auto' : '15%',
                            borderBottom: `1px solid ${theme.palette.secondary.lighter}`,
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            pl: isMobile ? '20px' : '40px', py: isMobile ? 4 : 0
                        }}
                    >
                        <Typography
                            sx={{
                                fontSize: theme.typography.labellg.fontSize,
                                fontWeight: theme.typography.labelsm.fontWeight,
                                color: isErrorMsg ? "red" : theme.palette.primary.main
                            }}
                        >
                            {isErrorMsg ? 'Error!' : 'Welcome!'}
                        </Typography>
                        <Typography
                            sx={{
                                fontSize: theme.typography.labelsm.fontSize,
                                color: theme.palette.secondary.light
                            }}
                        >
                            {isErrorMsg ? 'Please address the error in your application.' : 'Your fundraising journey starts now.'}
                        </Typography>
                    </Box>)}
                    
                    {steps && steps === '0' && (<Box
                        sx={{
                            display: 'flex',
                            height: '70vh', //isMobile ? 'auto' : '70%',
                            width: '100%',
                            flexDirection: 'column',
                            py: 4,
                            pl: isMobile ? '20px' : '40px',
                            backgroundColor: theme.palette.secondary.lightest
                        }}
                    >
                        <Typography
                            sx={{
                                fontSize: theme.typography.labellg.fontSize,
                                mb: 2
                            }}
                        >
                            Add a cover photo
                        </Typography>
                        <Box
                            sx={{
                                width: '100%',
                                height: '100%', //isMobile ? '300px' : '100%',
                                border: `1px solid ${theme.palette.secondary.lighter}`,
                                borderRadius: theme.borderRadius.sm,
                                backgroundColor: 'white',
                                display: 'flex', mr: isMobile ? 3 : 4,
                                justifyContent: 'center',
                                alignItems: 'center', mt: 2,
                                alignSelf: 'center'
                            }}
                        >
                            <Box
                                sx={{
                                    width: isMobile ? '90%' : '96%',
                                    height: '90%',
                                    border: campaignImg.length > 0  ? 'none' : `2px dashed ${theme.palette.secondary.lighter}`,
                                    borderRadius: theme.borderRadius.sm,
                                    backgroundColor: campaignImg.length > 0  ? 'transparent' : theme.palette.secondary.lightest,
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    flexDirection: 'column'
                                }}
                            >
                                {campaignImg.length === 0 
                                    ? (<ImageUploader
                                        label={''}
                                        showImageName={true}
                                        allowMultiple={false}
                                    />
                                    ) : (
                                        <ImagePreviewSingle image={campaignImg[0]} />
                                    )}
                            </Box>
                        </Box>
                    </Box>)}

                    {steps && steps === '1' &&(
                        <Box
                            sx={{
                                display: 'flex',
                                height: isMobile ? 'auto' : '70%',
                                width: '100%',
                                flexDirection: 'column',
                                py: 2, overflow: 'scroll',
                                backgroundColor: theme.palette.secondary.lightest
                            }}
                        >
                            <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    borderBottom: `1px solid ${theme.palette.secondary.lighter}`,
                                    mb: 3, pb: 3,
                                    alignItems: 'center', px: '40px'
                                }}
                            >
                                <Box sx={{display: 'flex', gap: 1, alignItems: 'center'}}>
                                    <Typography
                                        sx={{
                                            fontSize: theme.typography.labelsm.fontSize,
                                            fontWeight: theme.typography.labelsm.fontWeight
                                        }}
                                    >
                                        Add a cover photo
                                    </Typography>
                                    <CheckCircleOutline 
                                        sx={{
                                            color: theme.palette.primary.main,
                                            fontSize: '16px'
                                        }}
                                    />
                                </Box>
                                <PButton2 transBg={true} bg={false} width='100px'
                                    onClick={() => {
                                        sessionStorage.setItem('step', '0')
                                        setActiveStep(0)
                                    }}
                                >
                                    Edit
                                </PButton2>
                            </Box>
                            <Typography
                                sx={{
                                    fontSize: theme.typography.labellg.fontSize,
                                    fontWeight: theme.typography.labellg.fontWeight,
                                    px: '40px', pb: 3
                                }}
                            >
                                Share the details of your fundraising with donors
                            </Typography>

                            <Box 
                                sx={{
                                    px: '40px'
                                }}
                            >
                                <Box
                                    sx={{
                                        width: '100%'
                                    }}
                                >
                                    <InputField
                                        label="Fundraiser title"
                                        placeholder="Input fundraiser title"
                                        isBorder={true}
                                        labelStyle={{
                                            fontSize: theme.typography.labelxs.fontSize,
                                            fontWeight: theme.typography.labelxs.fontWeight
                                        }}
                                        onChange={(e) => setData({...data, title: e.target.value})}
                                        value={data.title}
                                    />
                                </Box>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        flexDirection:'column',
                                        py: 2
                                    }}
                                >

                                    <Typography
                                        sx={{
                                            fontSize: theme.typography.labelxs.fontSize,
                                            fontWeight: theme.typography.labelxs.fontWeight,
                                        }}
                                    >
                                        Where are you located?
                                    </Typography>
                                    <Box
                                        sx={{
                                            width: '100%',
                                            display: 'flex',
                                            flexDirection: isMobile ? 'column' : 'row',
                                            gap: 3, 
                                            py: 2
                                        }}
                                    >
                                        <Box
                                            sx={{
                                                width: isMobile ? '100%' : '50%'
                                            }}
                                        >
                                            <Select
                                                className="w-full h-10 font-light"
                                                options={state}
                                                styles={customStyles}
                                                placeholder="Choose state"
                                                name="state"
                                                onChange={(item) => {
                                                    handleDistrict(String(item?.value));
                                                    setData({...data, state: String(item?.value)})
                                                }}
                                                value={{
                                                    value: data.state,
                                                    label: data.state
                                                }}
                                            />
                                        </Box>
                                        <Box
                                            sx={{
                                                width: isMobile ? '100%' : '50%'
                                            }}
                                        >
                                            <Select
                                                className="w-full h-10 font-light"
                                                options={district}
                                                styles={customStyles}
                                                placeholder="Choose lga"
                                                name="lga"
                                                onChange={(item) => {
                                                    setData({...data, lga: String(item?.value)})
                                                }}
                                                value={{
                                                    value: data.lga,
                                                    label: data.lga
                                                }}
                                            />
                                        </Box>
                                    </Box>
                                </Box>

                                <Box
                                    sx={{
                                        width: '100%'
                                    }}
                                >
                                    <InputField
                                        label="Fundraiser description"
                                        placeholder="Hello, my name is XYZ and i am fundraising for"
                                        multiline={true}
                                        isBorder={true}
                                        labelStyle={{
                                            fontSize: theme.typography.labelxs.fontSize,
                                            fontWeight: theme.typography.labelxs.fontWeight
                                        }}
                                        rows={6}
                                        onChange={(e) => setData({...data, description: e.target.value})}
                                        value={data.description}
                                    />
                                </Box>

                            </Box>
                        </Box>
                    )}

                    {steps && steps === '2' &&(
                        <Box
                            sx={{
                                display: 'flex',
                                height: isMobile ? 'auto' : '70%',
                                width: '100%',
                                flexDirection: 'column',
                                py: 2, overflow: 'scroll',
                                backgroundColor: theme.palette.secondary.lightest
                            }}
                        >
                            <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    borderBottom: `1px solid ${theme.palette.secondary.lighter}`,
                                    mb: 3, pb: 3,
                                    alignItems: 'center', px: '40px'
                                }}
                            >
                                <Box sx={{display: 'flex', gap: 1, alignItems: 'center'}}>
                                    <Typography
                                        sx={{
                                            fontSize: theme.typography.labelsm.fontSize,
                                            fontWeight: theme.typography.labelsm.fontWeight
                                        }}
                                    >
                                        Add a cover photo
                                    </Typography>
                                    <CheckCircleOutline 
                                        sx={{
                                            color: theme.palette.primary.main,
                                            fontSize: '16px'
                                        }}
                                    />
                                </Box>
                                <PButton2 transBg={true} bg={false} width='100px'
                                    onClick={() => {
                                        sessionStorage.setItem('step', '0')
                                        setActiveStep(0)
                                    }}
                                >
                                    Edit
                                </PButton2>
                            </Box>
                            <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    borderBottom: `1px solid ${theme.palette.secondary.lighter}`,
                                    mb: 3, pb: 3,
                                    alignItems: 'center', px: '40px'
                                }}
                            >
                                <Box sx={{display: 'flex', gap: 1, alignItems: 'center'}}>
                                    <Typography
                                        sx={{
                                            fontSize: theme.typography.labelsm.fontSize,
                                            fontWeight: theme.typography.labelsm.fontWeight
                                        }}
                                    >
                                        Details of fundraising
                                    </Typography>
                                    <CheckCircleOutline 
                                        sx={{
                                            color: theme.palette.primary.main,
                                            fontSize: '16px'
                                        }}
                                    />
                                </Box>
                                <PButton2 transBg={true} bg={false} width='100px'
                                    onClick={() => {
                                        sessionStorage.setItem('step', '1')
                                        setActiveStep(1)
                                    }}
                                >
                                    Edit
                                </PButton2>
                            </Box>
                            <Typography
                                sx={{
                                    fontSize: theme.typography.labelsm.fontSize,
                                    fontWeight: theme.typography.labelsm.fontWeight,
                                    pb: 2, px: '40px'
                                }}
                            >
                                Who are you fundraising for?
                            </Typography>
                            <Box
                                sx={{
                                    backgroundColor: 'transparent',
                                    borderRadius: theme.borderRadius.sm,
                                    border: `1px solid ${theme.palette.secondary.lighter}`,
                                    py: 4, display: 'flex', flexDirection: 'column', gap: 4,
                                    px: '40px'
                                }}
                            >
                                <Box
                                    sx={{
                                        display: 'flex',
                                        flexDirection: isMobile ? 'column' : 'row',
                                        width: '100%', gap: 4
                                    }}
                                >
                                    <Box
                                        sx={{
                                            width: isMobile ? '100%' : '50%'
                                        }}
                                    >
                                        <InputField
                                            placeholder="First name"
                                            label="First name"
                                            isBorder={true}
                                            labelStyle={{
                                                fontSize: theme.typography.labelxs.fontSize,
                                                fontWeight: theme.typography.labelxs.fontWeight
                                            }}
                                            onChange={(e) => setData({...data, firstName: e.target.value})}
                                            value={data.firstName}
                                        />
                                    </Box>
                                    <Box
                                        sx={{
                                            width: isMobile ? '100%' : '50%'
                                        }}
                                    >
                                        <InputField
                                            placeholder="Last name"
                                            label="Last name"
                                            isBorder={true}
                                            labelStyle={{
                                                fontSize: theme.typography.labelxs.fontSize,
                                                fontWeight: theme.typography.labelxs.fontWeight
                                            }}
                                            onChange={(e) => setData({...data, lastName: e.target.value})}
                                            value={data.lastName}
                                        />
                                    </Box>
                                </Box>
                                <Box
                                    sx={{
                                        width: '100%'
                                    }}
                                >
                                    <InputField
                                        placeholder="Address"
                                        label="Address"
                                        isBorder={true}
                                        multiline={true}
                                        rows={4}
                                        labelStyle={{
                                            fontSize: theme.typography.labelxs.fontSize,
                                            fontWeight: theme.typography.labelxs.fontWeight
                                        }}
                                        onChange={(e) => setData({...data, address: e.target.value})}
                                        value={data.address}
                                    />
                                </Box>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        flexDirection: isMobile ? 'column' : 'row',
                                        width: '100%', gap: 4
                                    }}
                                >
                                    <Box
                                        sx={{
                                            width: isMobile ? '100%' : '50%'
                                        }}
                                    >
                                        <InputField
                                            placeholder="account number"
                                            label="Account number"
                                            isBorder={true}
                                            labelStyle={{
                                                fontSize: theme.typography.labelxs.fontSize,
                                                fontWeight: theme.typography.labelxs.fontWeight
                                            }}
                                            onChange={(e) => setData({...data, accountNumber: e.target.value})}
                                            value={data.accountNumber}
                                            endAdornment={(
                                                <>
                                                    { verifyBankIsLoading && <CircularProgress size='14px'/> }
                                                </>
                                            )}
                                        />
                                    </Box>
                                    <Box
                                        sx={{
                                            width: isMobile ? '100%' : '50%',
                                            display: 'flex',
                                            flexDirection: 'column'
                                        }}
                                    >
                                        <Typography
                                            sx={{
                                                fontSize: theme.typography.labelxs.fontSize,
                                                fontWeight: theme.typography.labelxs.fontWeight,
                                                mb: '7px'
                                            }}
                                        >
                                            Bank
                                        </Typography>
                                        <Select
                                            className="w-full h-10 font-light"
                                            options={bank}
                                            styles={customStyles}
                                            placeholder="Choose bank"
                                            name="bank"
                                            onChange={(item) => {
                                                //@ts-ignore
                                                setData({...data, bank: String(item?.value), bankCode: item?.code})
                                            }}
                                            value={{
                                                value: data.bank,
                                                label: data.bank,
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
                                        placeholder="account name"
                                        label="Account name"
                                        isBorder={true}
                                        labelStyle={{
                                            fontSize: theme.typography.labelxs.fontSize,
                                            fontWeight: theme.typography.labelxs.fontWeight
                                        }}
                                        disabled
                                        // onChange={(e) => setData({...data, accountName: verified})}
                                        value={verified || data.accountName}
                                    />
                                </Box>
                                
                            </Box>
                        </Box>
                    )}

                    {steps && steps === '3' &&(
                        <Box
                            sx={{
                                display: 'flex',
                                height: isMobile ? 'auto' : '70%',
                                width: '100%',
                                flexDirection: 'column',
                                py: 2,
                                backgroundColor: theme.palette.secondary.lightest
                            }}
                        >
                            <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    borderBottom: `1px solid ${theme.palette.secondary.lighter}`,
                                    mb: 3, pb: 3,
                                    alignItems: 'center', px: '40px'
                                }}
                            >
                                <Box sx={{display: 'flex', gap: 1, alignItems: 'center'}}>
                                    <Typography
                                        sx={{
                                            fontSize: theme.typography.labelsm.fontSize,
                                            fontWeight: theme.typography.labelsm.fontWeight
                                        }}
                                    >
                                        Add a cover photo
                                    </Typography>
                                    <CheckCircleOutline 
                                        sx={{
                                            color: theme.palette.primary.main,
                                            fontSize: '16px'
                                        }}
                                    />
                                </Box>
                                <PButton2 transBg={true} bg={false} width='100px'
                                    onClick={() => {
                                        sessionStorage.setItem('step', '0')
                                        setActiveStep(0)
                                    }}
                                >
                                    Edit
                                </PButton2>
                            </Box>
                            <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    borderBottom: `1px solid ${theme.palette.secondary.lighter}`,
                                    mb: 3, pb: 3,
                                    alignItems: 'center', px: '40px'
                                }}
                            >
                                <Box sx={{display: 'flex', gap: 1, alignItems: 'center'}}>
                                    <Typography
                                        sx={{
                                            fontSize: theme.typography.labelsm.fontSize,
                                            fontWeight: theme.typography.labelsm.fontWeight
                                        }}
                                    >
                                        Details of fundraising
                                    </Typography>
                                    <CheckCircleOutline 
                                        sx={{
                                            color: theme.palette.primary.main,
                                            fontSize: '16px'
                                        }}
                                    />
                                </Box>
                                <PButton2 transBg={true} bg={false} width='100px'
                                    onClick={() => {
                                        sessionStorage.setItem('step', '1')
                                        setActiveStep(1)
                                    }}
                                >
                                    Edit
                                </PButton2>
                            </Box>
                            <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    borderBottom: `1px solid ${theme.palette.secondary.lighter}`,
                                    mb: 3, pb: 3,
                                    alignItems: 'center', px: '40px'
                                }}
                            >
                                <Box sx={{display: 'flex', gap: 1, alignItems: 'center'}}>
                                    <Typography
                                        sx={{
                                            fontSize: theme.typography.labelsm.fontSize,
                                            fontWeight: theme.typography.labelsm.fontWeight
                                        }}
                                    >
                                        Who are you fundraising for?
                                    </Typography>
                                    <CheckCircleOutline 
                                        sx={{
                                            color: theme.palette.primary.main,
                                            fontSize: '16px'
                                        }}
                                    />
                                </Box>
                                <PButton2 transBg={true} bg={false} width='100px'
                                    onClick={() => {
                                        sessionStorage.setItem('step', '2')
                                        setActiveStep(1)
                                    }}
                                >
                                    Edit
                                </PButton2>
                            </Box>

                            <Typography
                                sx={{
                                    fontSize: theme.typography.labelsm.fontSize,
                                    fontWeight: theme.typography.labelsm.fontWeight,
                                    pb: 2, px: '40px'
                                }}
                            >
                                How much will you like to raise?
                            </Typography>

                            <Box
                                sx={{
                                    width: '100%',
                                    px: '40px', py: 4
                                }}
                            >
                                <InputField
                                    placeholder="Your starting goal"
                                    label="Amount"
                                    isBorder={true}
                                    labelStyle={{
                                        fontSize: theme.typography.labelxs.fontSize,
                                        fontWeight: theme.typography.labelxs.fontWeight
                                    }}
                                    onChange={(e) => setData({...data, amount: e.target.value})}
                                    value={data.amount}
                                    startAdornment={(
                                        <Typography>
                                            ₦
                                        </Typography>
                                    )}
                                />
                            </Box>
                        </Box>
                    )}

                    {steps && steps === '4' &&(
                        <Box
                            sx={{
                                display: 'flex',
                                height: isMobile ? 'auto' : '100%',
                                width: '100%',
                                flexDirection: 'column',
                                pt: 2, pb: 4,
                                px: isMobile ? '20px' : '40px',
                                backgroundColor: 'white',
                                overflow: 'scroll', gap: 3
                            }}
                        >
                            <Typography
                                sx={{
                                    fontSize: theme.typography.h5.fontSize,
                                    fontWeight: theme.typography.h5.fontWeight,
                                    pt: 4
                                }}
                            >
                                {capitalize.words(data.firstName)} {capitalize.words(data.lastName)}
                            </Typography>
                            <Box
                                sx={{
                                    border: `1px solid ${theme.palette.secondary.lighter}`,
                                    width: '100%', height: '400px',
                                    borderRadius: theme.borderRadius.sm,
                                    display: 'flex', flexDirection: 'column'
                                }}
                            >
                                <img 
                                    src={campaignImg.length ? URL.createObjectURL(campaignImg[0]) : "/crowd2.png"}
                                    alt="beneficiary image"
                                    crossOrigin="anonymous"
                                    style={{
                                        width: '100%',
                                        height: '90%',
                                        borderTopLeftRadius: theme.borderRadius.sm,
                                        borderTopRightRadius: theme.borderRadius.sm
                                    }} 
                                />
                                <Box
                                    sx={{
                                        flex: 1,
                                        py: 2,
                                        px: 4,
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 1,
                                        backgroundColor: theme.palette.secondary.lightest,
                                        borderBottomLeftRadius: theme.borderRadius.sm,
                                        borderBottomRightRadius: theme.borderRadius.sm
                                    }}
                                >
                                    <img
                                        src={userImg ? `${process.env.NEXT_PUBLIC_SERVER_URL}/${userImg}` : "/logo.png"}
                                        alt="user image"
                                        style={{
                                            width: '20px',
                                            height: '20px',
                                            borderRadius: '50%'
                                        }}
                                    />
                                    <Typography variant="labelxs" className="capitalize">
                                        {session?.user.fullName}
                                    </Typography>
                                    <Typography
                                        sx={{
                                            fontSize: theme.typography.labelxs.fontSize,
                                            color: theme.palette.secondary.light
                                        }}
                                    >
                                        is organizing a fundraiser on behalf of {capitalize.words(data.firstName)} {capitalize.words(data.lastName)}
                                    </Typography>
                                </Box>
                            </Box>

                            <Box
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column'
                                }}
                            >
                                <Typography
                                    sx={{
                                        fontSize: theme.typography.labelsm.fontSize,
                                        fontWeight: theme.typography.labelsm.fontWeight
                                    }}
                                >
                                    Fundraiser title
                                </Typography>
                                <Typography
                                    sx={{
                                        fontSize: theme.typography.labelxs.fontSize,
                                        color: theme.palette.secondary.light
                                    }}
                                >
                                    {capitalize.words(data.title)}
                                </Typography>
                            </Box> 

                            <Box
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column'
                                }}
                            >
                                <Typography
                                    sx={{
                                        fontSize: theme.typography.labelsm.fontSize,
                                        fontWeight: theme.typography.labelsm.fontWeight
                                    }}
                                >
                                    Where are you located?
                                </Typography>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        mb: 2, gap: 1
                                    }}
                                >
                                    <Typography
                                        sx={{
                                            fontSize: theme.typography.labelxs.fontSize,
                                            color: theme.palette.secondary.light,
                                            fontWeight: theme.typography.labelxs.fontWeight
                                        }}
                                    >
                                        State:
                                    </Typography>
                                    <Typography
                                        sx={{
                                            fontSize: theme.typography.labelxs.fontSize,
                                            color: theme.palette.secondary.light
                                        }}
                                    >
                                        {data.state}
                                    </Typography>
                                </Box>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        gap: 1
                                    }}
                                >
                                    <Typography
                                        sx={{
                                            fontSize: theme.typography.labelxs.fontSize,
                                            color: theme.palette.secondary.light,
                                            fontWeight: theme.typography.labelxs.fontWeight
                                        }}
                                    >
                                        LGA:
                                    </Typography>
                                    <Typography
                                        sx={{
                                            fontSize: theme.typography.labelxs.fontSize,
                                            color: theme.palette.secondary.light
                                        }}
                                    >
                                        {data.lga} 
                                    </Typography>
                                </Box>
                            </Box> 

                            <Box
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column'
                                }}
                            >
                                <Typography
                                    sx={{
                                        fontSize: theme.typography.labelsm.fontSize,
                                        fontWeight: theme.typography.labelsm.fontWeight
                                    }}
                                >
                                    Fundraiser Beneficiary
                                </Typography>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        mb: 2
                                    }}
                                >
                                    <Typography
                                        sx={{
                                            fontSize: theme.typography.labelxs.fontSize,
                                            color: theme.palette.secondary.light,
                                            fontWeight: theme.typography.labelxs.fontWeight
                                        }}
                                    >
                                        Name
                                    </Typography>
                                    <Typography
                                        sx={{
                                            fontSize: theme.typography.labelxs.fontSize,
                                            color: theme.palette.secondary.light
                                        }}
                                    >
                                        {capitalize.words(data.firstName)} {capitalize.words(data.lastName)} 
                                    </Typography>
                                </Box>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        mb: 2
                                    }}
                                >
                                    <Typography
                                        sx={{
                                            fontSize: theme.typography.labelxs.fontSize,
                                            color: theme.palette.secondary.light,
                                            fontWeight: theme.typography.labelxs.fontWeight
                                        }}
                                    >
                                        Address
                                    </Typography>
                                    <Typography
                                        sx={{
                                            fontSize: theme.typography.labelxs.fontSize,
                                            color: theme.palette.secondary.light
                                        }}
                                    >
                                        {data.address}
                                    </Typography>
                                </Box>
                            </Box>

                            <Box
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column'
                                }}
                            >
                                <Typography
                                    sx={{
                                        fontSize: theme.typography.labelsm.fontSize,
                                        fontWeight: theme.typography.labelsm.fontWeight
                                    }}
                                >
                                    Fundraiser description
                                </Typography>
                                <Typography
                                    sx={{
                                        fontSize: theme.typography.labelxs.fontSize,
                                        color: theme.palette.secondary.light
                                    }}
                                >
                                    {data.description}
                                </Typography>
                            </Box> 

                            <Box
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column'
                                }}
                            >
                                <Typography
                                    sx={{
                                        fontSize: theme.typography.labelsm.fontSize,
                                        fontWeight: theme.typography.labelsm.fontWeight
                                    }}
                                >
                                    Acccount details
                                </Typography>

                                <Box
                                    sx={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        mb: 2
                                    }}
                                >
                                    <Typography
                                        sx={{
                                            fontSize: theme.typography.labelxs.fontSize,
                                            color: theme.palette.secondary.light,
                                            fontWeight: theme.typography.labelxs.fontWeight
                                        }}
                                    >
                                        Account number
                                    </Typography>
                                    <Typography
                                        sx={{
                                            fontSize: theme.typography.labelxs.fontSize,
                                            color: theme.palette.secondary.light
                                        }}
                                    >
                                        {data.accountNumber} 
                                    </Typography>
                                </Box>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        mb: 2
                                    }}
                                >
                                    <Typography
                                        sx={{
                                            fontSize: theme.typography.labelxs.fontSize,
                                            color: theme.palette.secondary.light,
                                            fontWeight: theme.typography.labelxs.fontWeight
                                        }}
                                    >
                                        Bank
                                    </Typography>
                                    <Typography
                                        sx={{
                                            fontSize: theme.typography.labelxs.fontSize,
                                            color: theme.palette.secondary.light
                                        }}
                                    >
                                        {data.bank} 
                                    </Typography>
                                </Box>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        mb: 2
                                    }}
                                >
                                    <Typography
                                        sx={{
                                            fontSize: theme.typography.labelxs.fontSize,
                                            color: theme.palette.secondary.light,
                                            fontWeight: theme.typography.labelxs.fontWeight
                                        }}
                                    >
                                        Account name
                                    </Typography>
                                    <Typography
                                        sx={{
                                            fontSize: theme.typography.labelxs.fontSize,
                                            color: theme.palette.secondary.light
                                        }}
                                    >
                                        {data.accountName} 
                                    </Typography>
                                </Box>
                            </Box> 

                            <Box
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column'
                                }}
                            >
                                <Typography
                                    sx={{
                                        fontSize: theme.typography.labelsm.fontSize,
                                        fontWeight: theme.typography.labelsm.fontWeight
                                    }}
                                >
                                    How much will you like to raise?
                                </Typography>
                                <Typography
                                    sx={{
                                        fontSize: theme.typography.labelxs.fontSize,
                                        color: theme.palette.secondary.light
                                    }}
                                >
                                    {formAmount(+data.amount)}
                                </Typography>
                            </Box> 
                            
                        </Box>
                    )}

                    <Box
                        sx={{
                            width: '100%',
                            height: isMobile ? 'auto' : '15%',
                            borderTop: `1px solid ${theme.palette.secondary.lighter}`,
                            pl: isMobile ? '20px' : '40px', pt: 2, pb: 4,
                            backgroundColor: theme.palette.secondary.lightest,
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            display: 'flex',
                            pr: isMobile ? '10px' : '20px'
                        }}
                    >
                        <PButton2 
                            transBg={true} 
                            bg={false} 
                            width='100px' 
                            disabled={typeof sessionStorage !== 'undefined' && sessionStorage.getItem('step') === '0'}
                            onClick={handleBack}
                        >
                            <Typography
                                sx={{
                                    fontSize: theme.typography.labelxs.fontSize
                                }}
                            >
                                <ArrowBack sx={{fontSize: '16px', mb: 1}}/> Prev
                            </Typography>
                        </PButton2>
                        {steps !== '4' && (<PButton2 transBg={true} bg={false} width='100px' onClick={handleNext}>
                            <Typography
                                sx={{
                                    fontSize: theme.typography.labelxs.fontSize
                                }}
                            >
                                Next
                                <ArrowForward sx={{fontSize: '16px', mb: 1}}/>
                            </Typography>
                        </PButton2>)}
                        {steps === '4' && (
                            <NButton
                                onClick={handleSubmitCampaign}
                                bkgcolor={theme.palette.primary.main}
                                width='100px'
                                textcolor="white"
                                hoverbordercolor={theme.palette.primary.main}
                                hovercolor={theme.palette.primary.main}
                            >
                                {createCrowdfundingMutation.isLoading ? 'Loading...' : 'Submit'}
                                <ArrowForward sx={{fontSize: '16px', mb: 1}}/>
                            </NButton>
                        )}
                    </Box>
                </Box>
            </MotionBox>

            <Toastify
                open={open}
                onClose={() => setOpen(false)}
                message={message}
                error={isError}
                success={isSuccess}
            />
        </>
    )
}
