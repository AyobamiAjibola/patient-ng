'use client';

import { NButton } from "@/app/components/PButton";
import { Check, FiberManualRecord } from "@mui/icons-material";
import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import { Tag } from "antd";
import { useGetSingleAdvocacy, useUpdateAdvocacyStatus } from "../../hooks/advocacyHook/useAdvocacy";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import capitalize from "capitalize";
import moment from 'moment';
import Toastify from "@/app/components/ToastifySnack";


export default function page({ params }: any) {
    const theme = useTheme();
    const isMobile = useMediaQuery('(max-width: 900px)');
    const getSingleAdvocacy = useGetSingleAdvocacy();
    const {data: session} = useSession();
    const updateStatusMutation = useUpdateAdvocacyStatus();

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

    const handleStatus = async () => {
        await updateStatusMutation.mutateAsync(params.id, {
            onSuccess: async (response: any) => {
                await getSingleAdvocacy.mutateAsync(params.id)
                handleOpenNotification('success', response.message)
            },
            onError: (error: any) => {
                const errorMessage = error.response?.data?.message || 'An unexpected error occurred';
                handleOpenNotification('error', '', errorMessage)
            }
        })
    }

    useEffect(() => {
        const getAdvocacy = async () => {
            if(params.id) {
                await getSingleAdvocacy.mutateAsync(params.id)
            }
        }

        getAdvocacy();
    },[params.id, session]);

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
                        Advocacy ID {getSingleAdvocacy.data?.result.reference || ''}
                    </Typography>
                    <Tag 
                        color={getSingleAdvocacy.data?.result.status === "pending" ? "orange" : getSingleAdvocacy.data?.result.status === "in-progress" ? "green" : "red"}
                        style={{
                            color: getSingleAdvocacy.data?.result.status === "pending" ? "orange" : getSingleAdvocacy.data?.result.status === "in-progress" ? "green" : "red",
                            fontSize: '14px',
                            fontWeight: 500,
                            padding: '5px'
                        }}
                    >
                        <FiberManualRecord sx={{fontSize: '12px'}}/> {getSingleAdvocacy.data?.result && capitalize.words(getSingleAdvocacy.data?.result.status.replace('-', ' '))}
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
                        onClick={handleStatus}
                        disabled={getSingleAdvocacy.data?.result.status !== "pending"}
                        bordercolor={getSingleAdvocacy.data?.result.status === "pending" 
                                        ? theme.palette.state.warning
                                        : theme.palette.secondary.lighter}
                    >
                        <Typography variant={isMobile ? "labelxxs" : "labelxs" }
                            color={getSingleAdvocacy.data?.result.status === "pending" 
                                    ? theme.palette.state.warning
                                    : theme.palette.secondary.light}
                        >
                            <Check sx={{fontSize: isMobile ? '16px' : '18px'}} /> Mark as in progress
                        </Typography>
                    </NButton>
                    <NButton
                        onClick={handleStatus}
                        disabled={getSingleAdvocacy.data?.result.status === "closed"}
                        bordercolor={getSingleAdvocacy.data?.result.status === "closed"
                                        ? theme.palette.secondary.lighter
                                        : "red"}
                    >
                        <Typography variant={isMobile ? "labelxxs" : "labelxs" } 
                            color={getSingleAdvocacy.data?.result.status === "closed" 
                                ? theme.palette.secondary.light
                                : "red"}
                        >
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
                                    {getSingleAdvocacy.data?.result && `${capitalize.words(getSingleAdvocacy.data?.result.user.firstName)} ${capitalize.words(getSingleAdvocacy.data?.result.user.lastName)}`}
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
                                {getSingleAdvocacy.data?.result && moment(getSingleAdvocacy.data?.result.createdAt).format('MM/DD/YYYY(hh:mm A)')}
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
                                {getSingleAdvocacy.data?.result && getSingleAdvocacy.data?.result.complaints}
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
                                {getSingleAdvocacy.data?.result && `${capitalize.words(getSingleAdvocacy.data?.result.user.firstName)} ${capitalize.words(getSingleAdvocacy.data?.result.user.lastName)}`}
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
                                {getSingleAdvocacy.data?.result && `${getSingleAdvocacy.data?.result.user.email}`}
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
                            {getSingleAdvocacy.data?.result && `${getSingleAdvocacy.data?.result.user.phone}`}
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
                                {getSingleAdvocacy.data?.result && `${getSingleAdvocacy.data?.result.hospitalName}`}
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
                                {getSingleAdvocacy.data?.result && `${getSingleAdvocacy.data?.result.hospitalAddress}`}
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
                                {getSingleAdvocacy.data?.result && moment(getSingleAdvocacy.data?.result.createdAt).format('MM/DD/YYYY(hh:mm A)')}
                            </Typography>
                        </Box>
                        {/* <Box
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
                        </Box> */}
                    </Box>
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
