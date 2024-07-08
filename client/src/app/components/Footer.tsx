'user client'

import { Copyright, FacebookRounded, FiberManualRecord, Instagram, LinkedIn } from "@mui/icons-material";
import { Box, Divider, IconButton, Typography, useMediaQuery, useTheme } from "@mui/material"
import { Dropdown } from "antd";
import Image from "next/image";
import { useRouter } from "next/navigation";
import type { MenuProps } from 'antd';
import Link from "next/link";
import MModal from "./Modal";
import { useAtom } from "jotai";
import { openModal, openType } from "@/lib/atoms";
import HTMLReactParser from 'html-react-parser';
import { useEffect, useState } from "react";
import { useGetDocs } from "../admin/hooks/userHook/useUser";

const links = [
    {name: "Advocacy", link: '/advocacy'},
    {name: "Crowdfunding", link: '/crowdfunding'},
    // {name: "Insights", link: '/insights'},
    // {name: "Resources", link: ''}
]

const resources = [
    {name: "Blog", link: '/blog'},
    {name: "Patient Stories", link: '/patient-stories'},
    {name: "Webinar", link: 'webinar'},
    {name: "Podcast", link: 'podcast'},
    {name: "Award", link: 'award'},
    {name: "Insights", link: '/insights'}
]

export default function Footer() {
    const theme = useTheme();
    const isMobile = useMediaQuery('(max-width: 900px)');
    const router = useRouter();
    const [open, setOpen] = useAtom(openModal);
    const [data, setData] = useState<any>({
        contactUs: '',
        aboutUs: ''
    });
    const getDocsMutation = useGetDocs();
    const [type, setType] = useAtom(openType)

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

    const handleClose = () => {
        setOpen(false)
        setType('')
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
                            onMouseEnter={()=>setType('contact')}
                            onClick={()=>setOpen(true)}
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
                onClose={handleClose}
                open={open}
                width={isMobile ? '95%' : '60%'}
                height='auto'
                showCloseIcon={false}
            >
                <Box className="flex flex-col"
                    sx={{
                        py: isMobile ? 2 : 5,
                        px: isMobile ? 3 : 10
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
        </>
    )
}
