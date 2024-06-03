'use client';

import InputField from "@/app/components/InputField";
import { NButton } from "@/app/components/PButton";
import { setEditState } from "@/lib/atoms";
import { FiberManualRecord } from "@mui/icons-material";
import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import { Tag } from "antd";
import { useAtom } from "jotai";

export default function page({ params }: any) {
    const theme = useTheme();
    const isMobile = useMediaQuery('(max-width: 900px)');
    const [isEdit, _] = useAtom(setEditState);

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
                        width: '100%'
                    }}
                >
                    <Box
                        sx={{
                            width: '100%'
                        }}
                    >
                        <InputField
                            label="COMPLAINT/MESSAGE"
                            placeholder="Enter author"
                            isBorder={true}
                            value={`Lorem ipsum dolor sit amet, consectetur adipisicing elit. Esse quod corporis nulla quisquam temporibus ipsa, quasi labore vel totam cum sed expedita, natus asperiores hic nostrum optio minus est laboriosam!`}
                            onChange={(e) => console.log(e.target.value)}
                            rows={12}
                            multiline={true}
                        />
                        <Box sx={{display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-end'}}>
                            <NButton
                                bkgcolor={theme.palette.primary.main}
                                textcolor="white"
                            >
                                Save
                            </NButton>
                        </Box>
                    </Box>
                    
                </Box>
            </Box>
        </Box>
    )
}
