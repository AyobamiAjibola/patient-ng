'use client';

import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import Navbar from "../components/Navbar";
import HTMLReactParser from 'html-react-parser';
import { useGetDocs } from "../admin/hooks/userHook/useUser";
import { useEffect, useState } from "react";
import moment from "moment";
import Footer from "../components/Footer";

export default function page() {
    const isMobile = useMediaQuery('(max-width: 900px)');
    const theme = useTheme();
    const getDocsMutation = useGetDocs();
    const [data, setData] = useState<any>({
        content: '',
        upodatedDate: null
    });

    const handelFetch = async () => {
        await getDocsMutation.mutateAsync({}, {
            onSuccess: (response: any) => {
                setData({
                    content: response.result.termsAndCondition.content,
                    dateUpdated: response.result.termsAndCondition.dateUpdated
                })
            }
        })
    }

    useEffect(() => {
        handelFetch()
    },[]);

    return (
        <>
            <Navbar/>
            <Box
                sx={{
                    px: isMobile ? '20px' : '90px',
                    py: 4,
                    bgcolor: theme.palette.secondary.lightest
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        borderRadius: theme.borderRadius.sm,
                        border: `1px solid ${theme.palette.border.main}`,
                        bgcolor: theme.palette.secondary.lightest,
                        flexDirection: 'column'
                    }}
                >
                    <Typography variant="h4" px={4} pt={4}>
                        Privacy & Policy
                    </Typography>
                    <Typography variant="paragraphsm" pb={4} px={4}>
                        {moment(data.upodatedDate).format('DD MMM YY')}
                    </Typography>
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
                        {HTMLReactParser(data.content)}
                    </Box>
                </Box>
                
            </Box>
            <Footer/>
        </>
    )
}
