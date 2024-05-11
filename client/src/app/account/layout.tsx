'use client';

import { Avatar, Box, Typography, useTheme } from "@mui/material";
import Navbar from "../components/Navbar";
import { AccountBalanceWalletOutlined, ExitToAppOutlined, FavoriteBorderOutlined, MedicationOutlined, PersonOutlineOutlined } from "@mui/icons-material";
import { useAtom } from "jotai";
import { setMenuIndex } from "@/lib/atoms";

export default function layout({ children }: any) {
    const theme = useTheme();
    const [currentIndex, setCurrentIndex] = useAtom(setMenuIndex)

    const menu = [
        'Account Information',
        'Crowdfunding',
        'Hospital Reviews',
        'Finance',
    ]

    return (
        <>
            <Navbar/>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    px: '90px'
                }}
            >
                <Typography
                    sx={{
                        fontSize: theme.typography.h5.fontSize,
                        fontWeight: theme.typography.h5.fontWeight,
                        my: 6
                    }}
                >
                    Account
                </Typography>
                <Box
                    sx={{
                        display: 'flex',
                        gap: '40px',
                        width: '100%'
                    }}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            width: '20%',
                            height: 'auto',
                            px: 2, py: 4,
                            border: `1px solid ${theme.palette.secondary.lighter}`,
                            borderRadius: theme.borderRadius.sm,
                        }}
                    >
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                flexDirection: 'column'
                            }}
                        >
                            <Avatar
                                src='/model.png'
                                alt='profile image'
                                sx={{
                                    width: '50px',
                                    height: '50px',
                                    mb: 2
                                }}
                            />
                            <Typography
                                sx={{
                                    fontSize: theme.typography.labelsm.fontSize,
                                    fontWeight: theme.typography.labelsm.fontWeight
                                }}
                            >
                                Olowu Abayomi
                            </Typography>
                            <Typography
                                sx={{
                                    fontSize: theme.typography.labelxs.fontSize,
                                    color: theme.palette.secondary.light
                                }}
                            >
                                abayomi@patient.ng
                            </Typography>
                            <Box 
                                sx={{
                                    width: '90%',
                                    height: '1px', 
                                    backgroundColor: theme.palette.secondary.lighter,
                                    mt: 3
                                }}
                            />
                            <Box sx={{display: 'flex', gap: 2, flexDirection: 'column', mt: 3}}>
                                {
                                    menu.map((item, index) => (
                                        <Box key={index}
                                            onClick={() => setCurrentIndex(index)}
                                            sx={{
                                                border: index === currentIndex ? `1px solid ${theme.palette.primary.main}` : 'none',
                                                px: 4, py: 2,
                                                display: 'flex',
                                                alignItems: 'center', gap: 2,
                                                borderRadius: theme.borderRadius.xs,
                                                cursor: 'pointer',
                                                '&:hover': {
                                                    border: `1px solid ${theme.palette.primary.main}`,
                                                }
                                            }}
                                        >
                                            { index === 0 
                                                && <PersonOutlineOutlined 
                                                        sx={{
                                                            fontSize: '22px', 
                                                            color: currentIndex === 0 ? theme.palette.primary.main : theme.palette.secondary.main
                                                        }}
                                                    />
                                            }
                                            { index === 1 
                                                && <FavoriteBorderOutlined 
                                                        sx={{
                                                            fontSize: '22px',
                                                            color: currentIndex === 1 ? theme.palette.primary.main : theme.palette.secondary.main
                                                        }}
                                                    />
                                            }
                                            { index === 2 
                                                && <MedicationOutlined 
                                                        sx={{
                                                            fontSize: '22px',
                                                            color: currentIndex === 2 ? theme.palette.primary.main : theme.palette.secondary.main
                                                        }}
                                                    />
                                            }
                                            { index === 3 
                                                && <AccountBalanceWalletOutlined 
                                                        sx={{
                                                            fontSize: '22px',
                                                            color: currentIndex === 3 ? theme.palette.primary.main : theme.palette.secondary.main
                                                        }}
                                                    />
                                            }

                                            <Typography
                                                sx={{
                                                    fontSize: theme.typography.labelsm.fontSize,
                                                    color: index === currentIndex ? theme.palette.primary.main : theme.palette.secondary.main,
                                                }}
                                            >
                                                {item}
                                            </Typography>
                                        </Box>
                                    ))
                                }
                                <Box 
                                    sx={{
                                        width: '90%',
                                        height: '1px', 
                                        backgroundColor: theme.palette.secondary.lighter,
                                        mt: 3
                                    }}
                                />
                                <Box
                                    sx={{
                                        border: 'none',
                                        px: 4, py: 2,
                                        display: 'flex',
                                        alignItems: 'center', gap: 2,
                                        cursor: 'pointer',
                                        '&:hover': {
                                            border: `1px solid ${theme.palette.primary.main}`,
                                        }
                                    }}
                                >
                                    <ExitToAppOutlined />
                                    <Typography
                                        sx={{
                                            fontSize: theme.typography.labelsm.fontSize,
                                            color: theme.palette.secondary.main,
                                        }}
                                    >
                                        Log Out
                                    </Typography>
                                </Box>
                            </Box>
                        </Box>
                    </Box>

                    <Box
                        sx={{
                            flex: 1,
                            flexDirection: 'column'
                        }}
                    >
                        {currentIndex === 0 && (<Typography
                            sx={{
                                fontSize: theme.typography.h4.fontSize,
                                fontWeight: theme.typography.h4.fontWeight
                            }}
                        >
                            Personal Info
                        </Typography>)}
                        <Box
                            sx={{
                                width: '100%',
                                height: 'auto'
                            }}
                        >
                            { children }
                        </Box>
                    </Box>
                </Box>
            </Box>
        </>
    )
}
