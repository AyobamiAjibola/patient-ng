'use client';

import { setMenuIndex } from "@/lib/atoms";
import { formAmount } from "@/lib/helper";
import { Avatar, Box, LinearProgress, Typography, linearProgressClasses, styled, useTheme } from "@mui/material";
import { useAtom } from "jotai";
import { useEffect } from "react";

export default function page({ params }: any) {
  const theme = useTheme();
  const percent = (20000/+500000) * 100;
  const [_, setCurrentIndex] = useAtom(setMenuIndex);

  useEffect(() => {
    setCurrentIndex(1)
  },[]);

  const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
    height: 7,
    borderRadius: 5,
    [`&.${linearProgressClasses.colorPrimary}`]: {
      backgroundColor: theme.palette.secondary.lighter //[theme.palette.mode === 'light' ? 200 : 800],
    },
    [`& .${linearProgressClasses.bar}`]: {
      borderRadius: 5,
      backgroundColor: theme.palette.primary.main//theme.palette.mode === 'light' ? '#1a90ff' : '#308fe8',
    },
  }));

  return (
    <Box
        sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 3
        }}
    >
        <Box
            sx={{
                display: 'flex',
                width: '100%',
                height: '500px',
                flexDirection: 'column',
                border: `1px solid ${theme.palette.secondary.lighter}`,
                borderRadius: theme.borderRadius.sm
            }}
        >
            <img
                src="/crowd1.png"
                alt="campaign image"
                style={{
                    width: '100%',
                    height: '80%',
                    borderTopLeftRadius: theme.borderRadius.sm,
                    borderTopRightRadius: theme.borderRadius.sm
                }}
            />
            <Box
                sx={{
                    height: '20%',
                    borderBottomLeftRadius: theme.borderRadius.sm,
                    borderBottomRightRadius: theme.borderRadius.sm,
                    backgroundColor: theme.palette.secondary.lightest,
                    p: 2, alignItems: 'center', gap: 2,
                    display: 'flex'
                }}
            >
                <Avatar
                    src='/model.png'
                    alt="user image"
                    sx={{
                        width: '50px',
                        height: '50px'
                    }}
                />
                <Typography
                    sx={{
                        fontSize: theme.typography.labelsm.fontSize,
                        fontWeight: theme.typography.labelsm.fontWeight
                    }}
                >
                    Abayomi Olowu
                </Typography>
                <Typography
                    sx={{
                        fontSize: theme.typography.labelsm.fontSize,
                        color: theme.palette.secondary.light
                    }}
                >
                    is organising a  fundraiser on behalf of  
                </Typography>
                <Typography
                    sx={{
                        fontSize: theme.typography.labelsm.fontSize,
                        fontWeight: theme.typography.labelsm.fontWeight
                    }}
                >
                    Osaze Odemwinge
                </Typography>
            </Box>
        </Box>

        <Box
            sx={{
                display: 'flex',
                width: '100%',
                height: 'auto',
                flexDirection: 'column',
                border: `1px solid ${theme.palette.secondary.lighter}`,
                borderRadius: theme.borderRadius.sm,
                backgroundColor: theme.palette.secondary.lightest,
                mb: 4, p: 4
            }}
        >
            <Typography
                sx={{
                    fontSize: theme.typography.labelsm.fontSize,
                    mb: 3
                }}
            >
                Ikeja, Lagos State
            </Typography>
            <Box
                sx={{
                    display: 'flex',
                    gap: 1, alignItems: 'center'
                }}
            >
                <Typography
                    sx={{
                        fontSize: theme.typography.labelsm.fontSize,
                        fontWeight: theme.typography.labelsm.fontWeight
                    }}
                >
                    {formAmount(20000)}
                </Typography>
                <Typography
                    sx={{
                        fontSize: theme.typography.labelxs.fontSize,
                        color: theme.palette.secondary.light
                    }}
                >
                    of {formAmount(500000)} goal
                </Typography>
            </Box>
            <BorderLinearProgress variant="determinate" value={percent} sx={{my: 2}}/>
            <Typography
                sx={{
                    fontSize: theme.typography.labelxs.fontSize,
                    color: theme.palette.secondary.light
                }}
            >
                0 donations
            </Typography>
        </Box>
    </Box>
  )
}
