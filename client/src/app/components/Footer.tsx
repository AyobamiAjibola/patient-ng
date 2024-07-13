'user client'

import { Copyright, FacebookRounded, FiberManualRecord, Instagram, LinkedIn, LocationOn, Mail, Phone } from "@mui/icons-material";
import { Box, Divider, IconButton, Typography, useMediaQuery, useTheme } from "@mui/material"
import { Dropdown } from "antd";
import Image from "next/image";
import { useRouter } from "next/navigation";
import type { MenuProps } from 'antd';
import Link from "next/link";
import MModal from "./Modal";
import { useAtom } from "jotai";
import { openModal, openModal2, openType } from "@/lib/atoms";
import HTMLReactParser from 'html-react-parser';
import { useEffect, useState } from "react";
import { useContactUs, useGetDocs } from "../admin/hooks/userHook/useUser";
import InputField from "./InputField";
import { NButton } from "./PButton";
import Toastify from "./ToastifySnack";

const links = [
    {name: "Advocacy", link: '/advocacy'},
    {name: "Crowdfunding", link: '/crowdfunding'}
]

export default function Footer() {
    const theme = useTheme();
    const isMobile = useMediaQuery('(max-width: 900px)');
    const router = useRouter();
    const [open, setOpen] = useAtom(openModal);
    const [open2, setOpen2] = useAtom(openModal2);
    const [data, setData] = useState<any>({
        contactUs: '',
        aboutUs: ''
    });
    const getDocsMutation = useGetDocs();
    const [type, setType] = useAtom(openType);
    const [values, setValues] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        message: ''
    });
    const contactusMutation = useContactUs();

    const [openSnack, setOpenSnack] = useState(false);
    const [message, setMessage] = useState('');
    const [isSuccess, setIsSuccess] = useState(false);
    const [isError, setIsError] = useState(false);

    const handleOpenNotification = (type: 'success' | 'error', successMsg?: string, errorMsg?: string) => {
        setMessage(type === 'success' ? successMsg || 'Operation was successful!' : errorMsg || 'There was an error!');
        setIsError(type === 'error');
        setIsSuccess(type === 'success');
        setOpenSnack(true);
    };

    const items: MenuProps['items'] = [
        {
          key: '1',
          label: (
            <Link href={'blog'}>
                Blog
            </Link>
          ),
        },
        {
          key: '2',
          label: (
            <Link href={'patient-stories'}>
                Patient Stories
            </Link>
          ),
        },
        {
          key: '3',
          label: (
            <Link href={'webinar'}>
                Webinar
            </Link>
          ),
        },
        {
            key: '4',
            label: (
              <Link href={'podast'}>
                  Podcast
              </Link>
            ),
        },
        {
            key: '5',
            label: (
              <Link href={'award'}>
                  Award
              </Link>
            ),
        },
        {
            key: '6',
            label: (
              <Link href={'insight'}>
                  Insights
              </Link>
            ),
        },
    ];

    const handleGetDocs = async () => {
        await getDocsMutation.mutateAsync({}, {
            onSuccess: (response: any) => {
                setData({
                    contactUs: response.result.contactUs,
                    aboutUs: response.result.aboutUs
                })
            }
        })
    }

    const handleSubmit = async () => {
        await contactusMutation.mutateAsync(values, {
            onSuccess: () => {
                setValues({
                    firstName: '',
                    lastName: '',
                    email: '',
                    phone: '',
                    message: ''
                })
                setOpen2(false)
            },
            onError: (error: any) => {
                const errorMessage = error.response?.data?.message || 'An unexpected error occurred';
                handleOpenNotification('error', '', errorMessage)
            }
        })
    }

    const handleClose = () => {
        setOpen(false)
        setType('')
    }

    const handleClose2 = () => {
        setOpen2(false)
    }

    useEffect(() => {
        handleGetDocs()
    },[]);
      
    return (
        <>
            <Box
                sx={{
                    width: '100%',
                    backgroundColor: theme.palette.secondary.lightest,
                    px: isMobile ? '20px' : '90px',
                    py: isMobile ? 4 : 5,
                    borderTop: `1px solid ${theme.palette.secondary.lighter}`,
                    display: 'flex',
                    flexDirection: 'column'
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: isMobile ? 'column' : 'row',
                        justifyContent: isMobile ? 'flex-start' : 'space-between',
                        alignItems: isMobile ? 'flex-start' : 'center',
                        gap: isMobile ? 2 : 0
                    }}
                >
                    <Image
                        src='/ipatient-logo.png'
                        alt='logo'
                        height={100}
                        width={100}
                    />
                    <Box display={'flex'} gap={3}>
                        <Box
                            sx={{
                                display: 'flex',
                                gap: 3
                            }}
                        >
                            {
                                links.slice(0, 4).map((link, index: number) => (
                                    <Typography key={index}
                                        onClick={() => {
                                            if(link.name === 'Resources') return null;
                                            router.push(`${link.link}`)}}
                                        sx={{
                                            color: theme.palette.primary.darker,
                                            fontSize: isMobile ? theme.typography.labelxs.fontSize : theme.typography.labelsm.fontSize,
                                            fontWeight: theme.typography.labelsm.fontWeight,
                                            cursor: 'pointer',
                                            '&:hover': {
                                                color: theme.palette.primary.main
                                            }
                                        }}
                                    >
                                        { link.name }
                                    </Typography>
                                ))
                            }
                        </Box>
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: 2
                            }}
                        >
                            <Dropdown menu={{ items }} placement="bottomRight" arrow={{ pointAtCenter: true }} trigger={['click']}>
                                <Typography sx={{cursor: 'pointer'}}
                                    onClick={(e) => e.preventDefault()}
                                    variant={isMobile ? 'labelxs' : 'labelsm'}
                                    color={theme.palette.primary.darker}
                                >
                                    Resources
                                </Typography>
                            </Dropdown>
                        </Box>
                    </Box>
                    <Box
                        sx={{
                            display: 'flex',
                            ml: isMobile ? -2 : 0
                        }}
                    >
                        <IconButton>
                            <FacebookRounded/>
                        </IconButton>
                        <IconButton>
                            <LinkedIn/>
                        </IconButton>
                        <IconButton>
                            <Instagram/>
                        </IconButton>
                    </Box>
                </Box>

                <Box
                    sx={{
                        width: '100%',
                        height: '1px',
                        backgroundColor: theme.palette.secondary.lighter,
                        my: 4
                    }}
                />

                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: isMobile ? 'column' : 'row',
                        justifyContent: isMobile ? 'flex-start' : 'space-between',
                        alignItems: isMobile ? 'flex-start' : 'center',
                        gap: isMobile ? 2 : 0
                    }}
                >
                    <Typography
                        sx={{
                            fontSize: theme.typography.labelxs.fontSize,
                            color: theme.palette.secondary.light
                        }}
                    >
                        <Copyright sx={{fontSize: '12px', mb: '2px'}}/> {new Date().getFullYear()} Patient.ng. All rights reserved.
                    </Typography>
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center', gap: 2
                        }}
                    >
                        <Typography onClick={()=>router.push('/privacy-policy')}
                            sx={{
                                fontSize: theme.typography.labelxs.fontSize,
                                color: theme.palette.primary.main,
                                cursor: 'pointer'
                            }}
                        >
                            Terms & Conditions
                        </Typography>
                        <FiberManualRecord sx={{color: theme.palette.secondary.light, fontSize: '10px'}}/>
                        <Typography onClick={()=>router.push('/privacy-policy')}
                            sx={{
                                fontSize: theme.typography.labelxs.fontSize,
                                color: theme.palette.primary.main,
                                cursor: 'pointer'
                            }}
                        >
                            Privacy policy
                        </Typography>
                        <FiberManualRecord sx={{color: theme.palette.secondary.light, fontSize: '10px'}}/>
                        <Typography
                            onMouseEnter={()=>setType('about')}
                            onClick={()=>setOpen(true)}
                            sx={{
                                fontSize: theme.typography.labelxs.fontSize,
                                color: theme.palette.primary.main,
                                cursor: 'pointer'
                            }}
                        >
                            About us
                        </Typography>
                        <FiberManualRecord sx={{color: theme.palette.secondary.light, fontSize: '10px'}}/>
                        <Typography
                            onClick={()=>setOpen2(true)}
                            sx={{
                                fontSize: theme.typography.labelxs.fontSize,
                                color: theme.palette.primary.main,
                                cursor: 'pointer'
                            }}
                        >
                            Contact us
                        </Typography>
                    </Box>
                </Box>
            </Box>

            <MModal
                onClose={handleClose2}
                open={open2}
                width={isMobile ? '95%' : '70%'}
                height='90vh'
                showCloseIcon={false}
            >
                <Box
                    sx={{
                        display: 'flex',
                        gap: 4,
                        flexDirection: isMobile ? 'column' : 'row',
                        p: 3,
                        height: '100%'
                    }}
                >
                    {!isMobile && (<Box
                        sx={{
                            position: 'relative',
                            width: '30%'
                        }}
                    >
                        <img
                            alt='contact-us'
                            src='/contactus.png'
                            style={{
                                width: '100%',
                                height: '100%',
                                borderRadius: theme.borderRadius.sm
                            }}
                        />

                        <Box
                            sx={{
                                position: 'absolute',
                                mx: 3,
                                height: 'auto',
                                p: 2,
                                border: `1px solid ${theme.palette.border.main}`,
                                background: `rgba(255, 255, 255, 0)`,
                                backdropFilter: 'blur(1px)',
                                borderRadius: theme.borderRadius.sm,
                                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                                top: '14em',
                                width: '90%'
                            }}
                        >
                            <Typography variant="paragraphsm" color={'white'}>
                                You can reach us at:
                            </Typography>
                            <Box
                                sx={{
                                    display: 'flex',
                                    gap: 3,
                                    alignItems: 'flex-start',
                                    justifyContent: 'flex-start',
                                    mt: 3
                                }}
                            >
                                <Box
                                    sx={{
                                        bgcolor: 'white',
                                        p: 2,
                                        borderRadius: theme.borderRadius.sm,
                                        width: '20%',
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignitems: 'center'
                                    }}
                                >
                                    <Mail
                                        sx={{
                                            color: 'black',
                                            fontSize: 'px'
                                        }}
                                    />
                                </Box>
                                <Box display={'flex'} flexDirection={'column'} width={'80%'}>
                                    <Typography variant="paragraphxs" color={theme.palette.secondary.lighter}>
                                        Email
                                    </Typography>
                                    <Typography variant="paragraphxs" color={theme.palette.secondary.lighter}>
                                        Get in touch by emailing
                                    </Typography>
                                    <Typography variant="paragraphxs" color={theme.palette.border.main}>
                                        info@ipatient.com
                                    </Typography>
                                </Box>
                            </Box>

                            <Box
                                sx={{
                                    display: 'flex',
                                    gap: 3,
                                    alignItems: 'flex-start',
                                    justifyContent: 'flex-start',
                                    mt: 3
                                }}
                            >
                                <Box
                                    sx={{
                                        bgcolor: 'white',
                                        p: 2,
                                        borderRadius: theme.borderRadius.sm,
                                        width: '20%',
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignitems: 'center'
                                    }}
                                >
                                    <Phone
                                        sx={{
                                            color: 'black',
                                            fontSize: 'px'
                                        }}
                                    />
                                </Box>
                                <Box display={'flex'} flexDirection={'column'} width={'80%'}>
                                    <Typography variant="paragraphxs" color={theme.palette.secondary.lighter}>
                                        Phone
                                    </Typography>
                                    <Typography variant="paragraphxs" color={theme.palette.secondary.lighter}>
                                        Give us a call on 866 - 370 - 2996
                                    </Typography>
                                </Box>
                            </Box>

                            <Box
                                sx={{
                                    display: 'flex',
                                    gap: 3,
                                    alignItems: 'flex-start',
                                    justifyContent: 'flex-start',
                                    mt: 3
                                }}
                            >
                                <Box
                                    sx={{
                                        bgcolor: 'white',
                                        p: 2,
                                        borderRadius: theme.borderRadius.sm,
                                        width: '20%',
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignitems: 'center'
                                    }}
                                >
                                    <LocationOn
                                        sx={{
                                            color: 'black',
                                            fontSize: 'px'
                                        }}
                                    />
                                </Box>
                                <Box display={'flex'} flexDirection={'column'} width={'80%'}>
                                    <Typography variant="paragraphxs" color={theme.palette.secondary.lighter}>
                                        Location
                                    </Typography>
                                    <Typography variant="paragraphxs" color={theme.palette.secondary.lighter}>
                                        Visit us at 1450 S Havana St, Aurora,
                                    </Typography>
                                    <Typography variant="paragraphxs" color={theme.palette.border.main}>
                                        CO 80012
                                    </Typography>
                                </Box>
                            </Box>
                            
                        </Box>
                    </Box>)}

                    <Box
                        sx={{
                            width: isMobile ? '100%' : '70%',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                    >
                        <Typography variant="h5" textAlign={'left'} width='100%'>
                            Get in touch with us
                        </Typography>
                        <Typography variant="paragraphsm" color={theme.palette.secondary.light}
                            textAlign={'left'} width='100%' mb={3}
                        >
                            Let's connect and see how we can help you achieve ypur goals.
                        </Typography>

                        <Box 
                            width={'100%'} 
                            display={'flex'}
                            gap={2}
                            sx={{
                                flexDirection: isMobile ? 'column' : 'rows'
                            }}
                        >
                            <Box width={isMobile ? '100%' : '50%'}>
                                <InputField
                                    label="First Name"
                                    placeholder="First Name"
                                    onChange={(e: any) => setValues({ ...values, firstName: e.target.value})}
                                    isBorder={true}
                                    labelStyle={{
                                        fontSize: theme.typography.labelbase.fontSize,
                                        fontWeight: 500
                                    }}
                                    value={values.firstName}
                                />
                            </Box>
                            <Box width={isMobile ? '100%' : '50%'}>
                                <InputField
                                    label="Last Name"
                                    placeholder="Last Name"
                                    onChange={(e: any) => setValues({ ...values, lastName: e.target.value})}
                                    isBorder={true}
                                    labelStyle={{
                                        fontSize: theme.typography.labelbase.fontSize,
                                        fontWeight: 500
                                    }}
                                    value={values.lastName}
                                />
                            </Box>
                        </Box>

                        <Box 
                            width={'100%'} 
                            display={'flex'}
                            gap={2}
                            sx={{
                                flexDirection: isMobile ? 'column' : 'rows'
                            }}
                        >
                            <Box width={isMobile ? '100%' : '50%'}>
                                <InputField
                                    label="Email"
                                    placeholder="Email"
                                    onChange={(e: any) => setValues({ ...values, email: e.target.value})}
                                    isBorder={true}
                                    labelStyle={{
                                        fontSize: theme.typography.labelbase.fontSize,
                                        fontWeight: 500
                                    }}
                                    value={values.email}
                                />
                            </Box>
                            <Box width={isMobile ? '100%' : '50%'}>
                                <InputField
                                    label="Phone Number"
                                    placeholder="Phone Number"
                                    onChange={(e: any) => setValues({ ...values, phone: e.target.value})}
                                    isBorder={true}
                                    labelStyle={{
                                        fontSize: theme.typography.labelbase.fontSize,
                                        fontWeight: 500
                                    }}
                                    value={values.phone}
                                />
                            </Box>
                        </Box>
                        <Box width={'100%'}>
                            <InputField
                                label="Your Message"
                                placeholder="Your Message"
                                onChange={(e: any) => setValues({ ...values, message: e.target.value})}
                                isBorder={true}
                                labelStyle={{
                                    fontSize: theme.typography.labelbase.fontSize,
                                    fontWeight: 500
                                }}
                                multiline={true}
                                rows={6}
                                value={values.message}
                            />
                        </Box>

                        <NButton
                            onClick={handleSubmit}
                            bkgcolor={theme.palette.primary.main}
                            textcolor="white"
                            width="100%"
                        >
                            {contactusMutation.isLoading ? 'Submitting...' : 'Contact us'}
                        </NButton>
                    </Box>
                </Box>
            </MModal>

            <MModal
                onClose={handleClose}
                open={open}
                width={isMobile ? '95%' : '60%'}
                height='auto'
                showCloseIcon={false}
            >
                <Box className="flex flex-col"
                    sx={{
                        py: isMobile ? 2 : 5,
                        px: 3
                    }}
                >
                    <Typography variant={isMobile ? "h6" : "h5"}>
                        {type === 'contact' ? 'Contact Us' : 'About Us'}
                    </Typography>
                    <Divider sx={{my: 3}} />
                    <Box
                        sx={{
                            bgcolor: 'white',
                            width: 'white',
                            p: 3,
                            height: 'auto',
                            borderBottomLeftRadius: theme.borderRadius.sm,
                            borderBottomRightRadius: theme.borderRadius.sm
                        }}
                    >
                        {type === 'contact' ? HTMLReactParser(data.contactUs) : HTMLReactParser(data.aboutUs)}
                    </Box>
                </Box>
            </MModal>

            <Toastify
                open={openSnack}
                onClose={() => setOpenSnack(false)}
                message={message}
                error={isError}
                success={isSuccess}
            />
        </>
    )
}
