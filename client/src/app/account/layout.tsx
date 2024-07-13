'use client';

import { Avatar, Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import Navbar from "../components/Navbar";
import { ExitToAppOutlined, FavoriteBorderOutlined, FlagOutlined, MedicationOutlined, PersonOutlineOutlined } from "@mui/icons-material";
import { useAtom } from "jotai";
import { setMenuIndex } from "@/lib/atoms";
import { useFetchSingleUser } from "../admin/hooks/userHook/useUser";
import { useEffect, useState } from "react";
import { signOut, useSession } from "next-auth/react";
import { redirect, usePathname, useRouter } from "next/navigation";

export default function layout({ children }: any) {
    const theme = useTheme();
    const [currentIndex, setCurrentIndex] = useAtom(setMenuIndex);
    const isMobile = useMediaQuery('(max-width: 900px)');
    const getUserMutation = useFetchSingleUser();
    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [image, setImage] = useState<string>('');
    const pathname = usePathname();
    const router = useRouter();
    const { data: session } = useSession({
        required: true,
        onUnauthenticated() {
          redirect('/');
        },
      });

    const menu = [
        'Account Information',
        'Crowdfunding',
        'Insights',
        'Advocacy',
    ];

    const fetchSingleUser = async (id: any) => {
        await getUserMutation.mutateAsync(id, {
            onSuccess: (response: any) => {
                setName(`${response.result.firstName} ${response.result.lastName}`)
                setEmail(response.result.email)
                setImage(response.result.image)
            }
        })
    };
    
    const handleLogout = async () => {
        await signOut({
            redirect: true,
            callbackUrl: `${process.env.NEXT_PUBLIC_CLIENT_URL}/signin`
        });
        // router.push(`${process.env.NEXT_PUBLIC_CLIENT_URL}/signin`)
    };

    useEffect(() => {
        fetchSingleUser(session?.user.userId)
    },[session]);

    return (
        <>
            <Navbar/>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    px: isMobile ? '10px' : '90px'
                }}
            >
                <Typography
                    sx={{
                        fontSize: theme.typography.h5.fontSize,
                        fontWeight: theme.typography.h5.fontWeight,
                        my: 4
                    }}
                >
                    Account
                </Typography>
                <Box
                    sx={{
                        display: 'flex',
                        gap: isMobile ? '10px' : '40px',
                        width: '100%'
                    }}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            width: '20%',
                            height: '420px',
                            px: 2, py: 4,
                            border: `1px solid ${theme.palette.secondary.lighter}`,
                            borderRadius: theme.borderRadius.sm
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
                            <img
                                src={image ? `${process.env.NEXT_PUBLIC_SERVER_URL}/${image}` : '/model.png'}
                                alt='profile image'
                                style={{
                                    width: '50px',
                                    height: '50px',
                                    marginBottom: 2,
                                    borderRadius: '50%'
                                }}
                                crossOrigin="anonymous"
                            />
                            <Typography variant="labelsm" className="capitalize" textAlign={'center'}>
                                {name}
                            </Typography>
                            {!isMobile && (<Typography
                                sx={{
                                    fontSize: theme.typography.labelxs.fontSize,
                                    color: theme.palette.secondary.light
                                }}
                            >
                                {email}
                            </Typography>)}
                            {!isMobile && (<Box 
                                sx={{
                                    width: '90%',
                                    height: '1px', 
                                    backgroundColor: theme.palette.secondary.lighter,
                                    mt: 3
                                }}
                            />)}
                            <Box sx={{display: 'flex', gap: 2, flexDirection: 'column', mt: 3}}>
                                {
                                    menu.map((item, index) => (
                                        <Box key={index}
                                            onClick={() => {
                                                if(pathname.includes('/crowdfunding/') || pathname.includes('/reviews/') || pathname.includes('/advocacy/')){
                                                    router.push('/account')
                                                }
                                                setCurrentIndex(index)
                                            }}
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
                                                && <FlagOutlined 
                                                        sx={{
                                                            fontSize: '22px',
                                                            color: currentIndex === 3 ? theme.palette.primary.main : theme.palette.secondary.main
                                                        }}
                                                    />
                                            }

                                            {!isMobile && (<Typography
                                                sx={{
                                                    fontSize: theme.typography.labelsm.fontSize,
                                                    color: index === currentIndex ? theme.palette.primary.main : theme.palette.secondary.main,
                                                }}
                                            >
                                                {item}
                                            </Typography>)}
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
                                    onClick={handleLogout}
                                >
                                    <ExitToAppOutlined />
                                    {!isMobile && (<Typography
                                        sx={{
                                            fontSize: theme.typography.labelsm.fontSize,
                                            color: theme.palette.secondary.main,
                                        }}
                                    >
                                        Log Out
                                    </Typography>)}
                                </Box>
                            </Box>
                        </Box>
                    </Box>

                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            width: '80%'
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
