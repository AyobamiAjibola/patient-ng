'use client';

import { NButton } from "@/app/components/PButton";
import { Check, FiberManualRecord } from "@mui/icons-material";
import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import { Tag } from "antd";

export default function page({ params }: any) {
    const theme = useTheme();
    const isMobile = useMediaQuery('(max-width: 900px)');

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                pb: 4
            }}
        >
            <Box
                sx={{
                    width: '100%',
                    borderBottom: `1px solid ${theme.palette.secondary.lighter}`,
                    p: 4,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    bgcolor: 'white'
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        gap: 2,
                        alignItems: isMobile ? 'flex-start' : 'center',
                        flexDirection: isMobile ? 'column' : 'row'
                    }}
                >
                    <Typography variant={ isMobile ? "labelxs" : "labelsm"}>
                        Advocacy ID #12343234324322 
                    </Typography>
                    <Tag
                        style={{
                            color: theme.palette.state.warning,
                            fontSize: '14px',
                            fontWeight: 500,
                            padding: '5px'
                        }}
                    >
                        <FiberManualRecord sx={{fontSize: '12px'}}/> Pending
                    </Tag>
                </Box>
                <Box
                    sx={{
                        display: 'flex',
                        gap: 2,
                        alignItems: 'center',
                        flexDirection: isMobile ? 'column' : 'row'
                    }}
                >
                    <NButton
                        bordercolor={theme.palette.state.warning}
                    >
                        <Typography variant={isMobile ? "labelxxs" : "labelxs" }
                            color={theme.palette.state.warning}
                        >
                            <Check sx={{fontSize: isMobile ? '16px' : '18px'}} /> Mark as in progress
                        </Typography>
                    </NButton>
                    <NButton
                        bordercolor={theme.palette.secondary.lighter}
                    >
                        <Typography variant={isMobile ? "labelxxs" : "labelxs" } color={'red'}>
                            <Check sx={{fontSize: isMobile ? '16px' : '18px'}} /> Mark as closed
                        </Typography>
                    </NButton>
                </Box>
            </Box>

            <Box
                sx={{
                    display: 'flex',
                    gap: 3, mt: 5,
                    flexDirection: isMobile ? 'column' : 'row',
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        width: isMobile ? '100%' : '70%',
                        gap: 2,
                        pl: isMobile ? 2 : 4,
                        pr: isMobile ? 2 : 0
                    }}
                >
                    <Typography variant="paragraphsm" color={theme.palette.secondary.light}>
                        COMPLAINT/MESSAGE
                    </Typography>
                    <Box
                        sx={{
                            borderRadius: theme.borderRadius.sm,
                            borderLeft: `4px solid ${theme.palette.primary.main}`,
                            display: 'flex',
                            flexDirection: 'column',
                            height: 'auto',
                            bgcolor: 'white'
                        }}
                    >
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                borderBottom: `1px solid ${theme.palette.secondary.lighter}`,
                                height: '70px', width: '100%',
                                p: 3,
                                alignItems: 'center'
                            }}
                        >
                            <Box
                                sx={{
                                    display: 'flex',
                                    gap: 2,
                                    flexDirection: isMobile ? 'column' : 'row'
                                }}
                            >
                                <Typography>
                                    Ademola Kadir
                                </Typography>
                                <Tag
                                    style={{
                                        fontSize: '12px',
                                        color: theme.palette.primary.darker,
                                    }}
                                >
                                    Customer
                                </Tag>
                            </Box>
                            <Typography variant='paragraphxs' color={theme.palette.secondary.light}>
                                07/01/2022(08:45)
                            </Typography>
                        </Box>
                        <Box
                            sx={{
                                display: 'flex',
                                height: 'auto',
                                width: '100%',
                                p: 3
                            }}
                        >
                            <Typography variant='paragraphsm' color={theme.palette.secondary.light}>
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Esse quod corporis nulla quisquam temporibus ipsa, quasi labore vel totam cum sed expedita, natus asperiores hic nostrum optio minus est laboriosam!
                            </Typography>
                        </Box>
                    </Box>
                </Box>

                <Box
                    sx={{
                        display: 'flex',
                        width: isMobile ? '100%' : '30%',
                        gap: 2,
                        pr: isMobile ? 2 : 4,
                        pl: isMobile ? 2 : 0,
                        flexDirection: 'column'
                    }}
                >
                    <Typography variant="paragraphsm" color={theme.palette.secondary.light}>
                        ADVOCACY INFORMATION
                    </Typography>
                    <Box
                        sx={{
                            borderRadius: theme.borderRadius.sm,
                            border: `1px solid ${theme.palette.secondary.lighter}`,
                            display: 'flex',
                            flexDirection: 'column',
                            height: 'auto',
                            bgcolor: 'white',
                            width: '100%'
                        }}
                    >
                        <Box
                            sx={{
                                 display: 'flex',
                                 flexDirection: 'column',
                                 p: 3,
                                 borderBottom: `1px solid ${theme.palette.secondary.lighter}`,
                                 height: 'auto'
                            }}
                        >
                            <Typography variant="paragraphxs" color={theme.palette.secondary.light}>
                                Customer
                            </Typography>
                            <Typography variant="labelsm">
                                Ese Glory
                            </Typography>
                        </Box>
                        <Box
                            sx={{
                                 display: 'flex',
                                 flexDirection: 'column',
                                 p: 3,
                                 borderBottom: `1px solid ${theme.palette.secondary.lighter}`,
                                 height: 'auto'
                            }}
                        >
                            <Typography variant="paragraphxs" color={theme.palette.secondary.light}>
                                Customer Email
                            </Typography>
                            <Typography variant="labelsm">
                                ese@gmail.com
                            </Typography>
                        </Box>
                        <Box
                            sx={{
                                 display: 'flex',
                                 flexDirection: 'column',
                                 p: 3,
                                 borderBottom: `1px solid ${theme.palette.secondary.lighter}`,
                                 height: 'auto'
                            }}
                        >
                            <Typography variant="paragraphxs" color={theme.palette.secondary.light}>
                                Customer Phone
                            </Typography>
                            <Typography variant="labelsm">
                                08098767656
                            </Typography>
                        </Box>
                        <Box
                            sx={{
                                 display: 'flex',
                                 flexDirection: 'column',
                                 p: 3,
                                 borderBottom: `1px solid ${theme.palette.secondary.lighter}`,
                                 height: 'auto'
                            }}
                        >
                            <Typography variant="paragraphxs" color={theme.palette.secondary.light}>
                                Name of Hospital
                            </Typography>
                            <Typography variant="labelsm">
                                ABC Clinic
                            </Typography>
                        </Box>
                        <Box
                            sx={{
                                 display: 'flex',
                                 flexDirection: 'column',
                                 p: 3,
                                 borderBottom: `1px solid ${theme.palette.secondary.lighter}`,
                                 height: 'auto'
                            }}
                        >
                            <Typography variant="paragraphxs" color={theme.palette.secondary.light}>
                                Address of Hospital
                            </Typography>
                            <Typography variant="labelsm">
                                Abuja Nigeria
                            </Typography>
                        </Box>
                        <Box
                            sx={{
                                 display: 'flex',
                                 flexDirection: 'column',
                                 p: 3,
                                 borderBottom: `1px solid ${theme.palette.secondary.lighter}`,
                                 height: 'auto'
                            }}
                        >
                            <Typography variant="paragraphxs" color={theme.palette.secondary.light}>
                                Submitted
                            </Typography>
                            <Typography variant="labelsm">
                                07/12/2022(08:45)
                            </Typography>
                        </Box>
                        <Box
                            sx={{
                                 display: 'flex',
                                 flexDirection: 'column',
                                 p: 3,
                                 height: 'auto'
                            }}
                        >
                            <Typography variant="paragraphxs" color={theme.palette.secondary.light}>
                                Status
                            </Typography>
                            <Tag
                                style={{
                                    color: 'red',
                                    display: 'flex',
                                    alignItems: 'center',
                                    fontSize: '12px',
                                    gap: 2, 
                                    width: '30%'
                                }}
                            >
                                <FiberManualRecord sx={{fontSize: '14px'}}/>
                                <Typography variant="labelxs">
                                    Closed
                                </Typography>
                            </Tag>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}
