'use client';

import { NButton } from "@/app/components/PButton";
import { formAmount } from "@/lib/helper";
import { ArrowBack } from "@mui/icons-material";
import { Avatar, Box, LinearProgress, Typography, linearProgressClasses, styled, useMediaQuery, useTheme } from "@mui/material";

export default function page() {
    const isMobile = useMediaQuery('(max-width: 900px)');
    const theme = useTheme();
    const percent = (+100000/+500000) * 100;

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

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: isMobile ? 'column' : 'row',
                p: 4
            }}
        >
            <Box
                sx={{
                    width: isMobile ? '100%' : '80%'
                }}
            >
                <Typography variant="labelsm">
                    <ArrowBack/> Back
                </Typography>

                <Box
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
                </Box>
            </Box>   

            <Box
                sx={{
                    p: 3,
                    width: isMobile ? '100%' : '20%',
                    borderRadius: theme.borderRadius.sm,
                    border: `1px solid ${theme.palette.secondary.lighter}`,
                    bgcolor: 'white',
                    height: '20rem',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 4
                }}
            >
                <Typography variant="labelxs">
                    Created 2d ago
                </Typography>

                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        width: '100%'
                    }}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            gap: 1, mb: 1,
                        }}
                    >
                        <Typography variant="labelxxs">
                            {formAmount(100000)}
                        </Typography>
                        <Typography variant="paragraphxxs"
                            sx={{
                                color: theme.palette.secondary.light
                            }}
                        >
                            {`of ${formAmount(500000)} goal`}
                        </Typography>
                    </Box>
                    <BorderLinearProgress variant="determinate" value={percent} />
                    <Typography variant="labelxxs" color={theme.palette.secondary.light}>
                        0 donations
                    </Typography>
                </Box>

                <NButton 
                    textcolor={!status ? theme.palette.state.success : theme.palette.state.error}
                    bordercolor={!status ? theme.palette.state.success : theme.palette.state.error}
                >
                    <Typography variant="labelxs">
                        {
                            status ? 'Disable' : 'Activate'
                        }
                    </Typography>
                </NButton>

                <Typography variant="paragraphxxs" color={theme.palette.secondary.light}>
                    DONATIONS
                </Typography>

            </Box>       
        </Box>
    )
}
