'use client';

import { useGetAdvocacies, useUpdateComplain } from "@/app/admin/hooks/advocacyHook/useAdvocacy";
import { useGetSingleAdvocacy } from "@/app/admin/hooks/advocacyHook/useAdvocacy";
import InputField from "@/app/components/InputField";
import { NButton } from "@/app/components/PButton";
import Toastify from "@/app/components/ToastifySnack";
import { FiberManualRecord } from "@mui/icons-material";
import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import { Tag } from "antd";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Select from "react-select";
import { customStyles } from "@/constant/customStyles";

const category = [
    { value: "Health Insurance", label: "Health Insurance" },
    { value: "Medical Billing", label: "Medical Billing" },
    { value: "Medical Errors/Negligence", label: "Medical Errors/Negligence" },
    { value: "Patient Rights", label: "Patient Rights" }
]

export default function page({ params }: any) {
    const theme = useTheme();
    const { id } = params;
    const isMobile = useMediaQuery('(max-width: 900px)');
    const {data: session} = useSession();
    const getAdvocacyMutation = useGetSingleAdvocacy();
    const updateAdvocacyMutation = useUpdateComplain();
    const [complaints, setComplaints] = useState<string>('');
    const [ref, setRef] = useState<string>('');

    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState('');
    const [isSuccess, setIsSuccess] = useState(false);
    const [isError, setIsError] = useState(false);
    const [status, setStatus] = useState<string>('');
    const [selectedCategory, setSelectedCategory] = useState<string>('');

    const handleOpenNotification = (type: 'success' | 'error', successMsg?: string, errorMsg?: string) => {
        setMessage(type === 'success' ? successMsg || 'Operation was successful!' : errorMsg || 'There was an error!');
        setIsError(type === 'error');
        setIsSuccess(type === 'success');
        setOpen(true);
    };

    const handleUpdateAdvocacy = async () => {
        await updateAdvocacyMutation.mutateAsync({
            complaints,
            category: selectedCategory,
            advocacyId: id
        }, {
            onSuccess: async () => {
                await handleGetAdvocacy()
            },
            onError: (error: any) => {
                const errorMessage = error.response?.data?.message || 'An unexpected error occurred';
                handleOpenNotification('error', '', errorMessage)
            }
        })
      }
    
    const handleGetAdvocacy = async () => {
        await getAdvocacyMutation.mutateAsync(id, {
            onSuccess: (response: any) => {
                setRef(response.result.reference)
                setComplaints(response.result.complaints)
                setStatus(response.result.status)
                setSelectedCategory(response.result.category)
            }
        })
    }

    useEffect(() => {
        if(params) {
            handleGetAdvocacy()
        }
    },[params, session]);

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
                        Advocacy ID {ref}
                    </Typography>
                    <Tag
                        style={{
                            color: status === 'pending' 
                                    ? 'gold'
                                    : status === 'closed'
                                        ? 'red'
                                        : 'green',
                            fontSize: '14px',
                            fontWeight: 500,
                            padding: '5px'
                        }}
                        className="capitalize"
                    >
                        <FiberManualRecord sx={{fontSize: '12px'}}/> {status}
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
                    <Box mb={3}>
                        <Typography
                            sx={{
                                fontSize: theme.typography.labellg.fontSize,
                                mb: 2
                            }}
                        >
                            Category
                        </Typography>
                        <Select
                            className="w-full h-10 font-light"
                            options={category}
                            styles={customStyles}
                            placeholder="Choose category"
                            name="category"
                            onChange={(item) => {
                                setSelectedCategory(String(item?.value));
                            }}
                            value={{
                                value: selectedCategory,
                                label: selectedCategory,
                            }}
                        />
                        </Box>
                    <Box
                        sx={{
                            width: '100%'
                        }}
                    >
                        <InputField
                            label="COMPLAINT/MESSAGE"
                            placeholder="Enter author"
                            isBorder={true}
                            value={complaints}
                            onChange={(e) => setComplaints(e.target.value)}
                            rows={12}
                            multiline={true}
                        />
                        <Box sx={{display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-end'}}>
                            <NButton
                                onClick={handleUpdateAdvocacy}
                                bkgcolor={theme.palette.primary.main}
                                textcolor="white"
                            >
                                {updateAdvocacyMutation.isLoading ? 'Saving...' : 'Save'}
                            </NButton>
                        </Box>
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