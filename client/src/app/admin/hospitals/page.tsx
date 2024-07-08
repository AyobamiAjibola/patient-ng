'use client';

import HospitalTable from "@/app/components/HospitalTable";
import InputField from "@/app/components/InputField";
import MModal from "@/app/components/Modal";
import { NButton } from "@/app/components/PButton";
import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import { useCreateHospital, useDeleteHospital, useGetHospitals } from "../hooks/userHook/useUser";
import Toastify from "@/app/components/ToastifySnack";

export default function page() {
    const theme = useTheme();
    const [open, setOpen] = useState<boolean>(false);
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const [name, setName] = useState<string>('');
    const [address, setAddress] = useState<string>('');
    const createHospitalMutation = useCreateHospital();
    const getHospitalsMutation = useGetHospitals();
    const [hospitals, setHospitals] = useState<any>([]);
    const deleteHospitalMutation = useDeleteHospital();

    const [openSnack, setOpenSnack] = useState(false);
    const [message, setMessage] = useState('');
    const [isSuccess, setIsSuccess] = useState(false);
    const [isError, setIsError] = useState(false);

    const handleOpenNotification = (type: 'success' | 'error', successMsg?: string, errorMsg?: string) => {
        setMessage(type === 'success' ? successMsg || 'Operation was successful!' : errorMsg || 'There was an error!');
        setIsError(type === 'error');
        setIsSuccess(type === 'success');
        setOpenSnack(true);
    };

    const handleCreateHospital = async () => {
        await createHospitalMutation.mutateAsync({
            hospitalName: name,
            address
        }, {
            onSuccess: async () => {
                handleOpenNotification('success', 'Successfully added hospital.')
                setOpen(false)
                await handleGetHospitals()
            },
            onError: (error: any) => {
                const errorMessage = error.response?.data?.message || 'An unexpected error occurred';
                handleOpenNotification('error', '', errorMessage)
            }
        })
    }

    const handleGetHospitals = async () => {
        await getHospitalsMutation.mutateAsync({}, {
            onSuccess: (response: any) => {
                setHospitals(response.results)
            }
        })
    };

    const handleDelete = async (id: any) => {
        await deleteHospitalMutation.mutateAsync(id, {
          onSuccess: async () => {
            await handleGetHospitals()
          }
        })
    }

    useEffect(() => {
        handleGetHospitals()
    },[]);

    return (
        <>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    p: 4,
                    bgcolor: 'white'
                }}
            >
                <Typography variant="h4">
                    Hospitals
                </Typography>
                <Box my={3}
                    sx={{
                        display: 'flex',
                        justifyContent: 'flex-end',
                        alignItems: 'flex-end'
                    }}
                >
                    <NButton
                        bkgcolor={theme.palette.primary.main}
                        textcolor="white"
                        onClick={()=>setOpen(true)}
                    >
                        Add Hospital
                    </NButton>
                </Box>

                <HospitalTable
                    //@ts-ignore
                    data={hospitals}
                    handleDelete={handleDelete}
                    isLoading={deleteHospitalMutation.isLoading}
                />
            </Box>

            <MModal
                onClose={() => setOpen(false)}
                open={open}
                width={isMobile ? '80%' : '60%'}
                height='auto'
                showCloseIcon={false}
            >
                <Box className="flex flex-col py-5 px-10">
                    <Box
                        sx={{
                            width: '100%',
                            mt: 3, gap: 1,
                            display: 'flex',
                            flexDirection: 'column'
                        }}
                    >
                        <InputField
                            label="Hospital"
                            placeholder="Enter hospital name"
                            isBorder={true}
                            labelStyle={{
                                fontSize: theme.typography.labelbase.fontSize,
                                fontWeight: 500
                            }}
                            value={name}
                            onChange={(e)=>setName(e.target.value)}
                        />

                        <InputField
                            label="Hospital Address"
                            placeholder="Enter address"
                            isBorder={true}
                            labelStyle={{
                                fontSize: theme.typography.labelbase.fontSize,
                                fontWeight: 500
                            }}
                            value={address}
                            onChange={(e)=>setAddress(e.target.value)}
                            multiline={true}
                            rows={6}
                        />

                        <NButton
                            bkgcolor={theme.palette.primary.main}
                            textcolor='white'
                            width='100%'
                            onClick={handleCreateHospital}
                        >
                            {createHospitalMutation.isLoading ? 'Loading...' : 'Submit'}
                        </NButton>
                    </Box>
                </Box>
            </MModal>

            <Toastify
                open={openSnack}
                onClose={() => setOpenSnack(false)}
                message={message}
                error={isError}
                success={isSuccess}
            />
        </>
    )
}
