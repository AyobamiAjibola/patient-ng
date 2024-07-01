'user client'

import { Copyright, FacebookRounded, FiberManualRecord, Instagram, LinkedIn } from "@mui/icons-material";
import { Box, IconButton, Typography, useMediaQuery, useTheme } from "@mui/material"
import Image from "next/image";
import { useRouter } from "next/navigation";

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

  return (
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
                    <Typography
                        variant={isMobile ? 'labelxs' : 'labelsm'}
                        color={theme.palette.primary.darker}
                    >
                        Resources
                    </Typography>
                    {
                        resources.map((link, index: number) => (
                            <Typography key={index}
                                onClick={() => {
                                    if(link.name === 'Resources') return null;
                                    router.push(`${link.link}`)}}
                                sx={{
                                    color: theme.palette.primary.darker,
                                    fontSize: isMobile ? theme.typography.labelxs.fontSize : theme.typography.labelxs.fontSize,
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
                <Typography
                    sx={{
                        fontSize: theme.typography.labelxs.fontSize,
                        color: theme.palette.primary.main
                    }}
                >
                    Terms & Conditions
                </Typography>
                <FiberManualRecord sx={{color: theme.palette.secondary.light, fontSize: '10px'}}/>
                <Typography
                    sx={{
                        fontSize: theme.typography.labelxs.fontSize,
                        color: theme.palette.primary.main
                    }}
                >
                    Privacy policy
                </Typography>
                <FiberManualRecord sx={{color: theme.palette.secondary.light, fontSize: '10px'}}/>
                <Typography
                    sx={{
                        fontSize: theme.typography.labelxs.fontSize,
                        color: theme.palette.primary.main
                    }}
                >
                    About us
                </Typography>
                <FiberManualRecord sx={{color: theme.palette.secondary.light, fontSize: '10px'}}/>
                <Typography
                    sx={{
                        fontSize: theme.typography.labelxs.fontSize,
                        color: theme.palette.primary.main
                    }}
                >
                    Contact us
                </Typography>
            </Box>
        </Box>
    </Box>
  )
}
