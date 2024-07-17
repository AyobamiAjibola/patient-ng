'use client';

import HospitalTable from "@/app/components/HospitalTable";
import InputField from "@/app/components/InputField";
import MModal from "@/app/components/Modal";
import { NButton } from "@/app/components/PButton";
import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import { useCreateHospital, useDeleteHospital, useGetHospitals } from "../hooks/userHook/useUser";
import Toastify from "@/app/components/ToastifySnack";
import { useAtom } from "jotai";
import { selectedImageArrayAtom } from "@/lib/atoms";
import ImageUploader from "@/app/components/ImageUploader";
import MultipleTextField from "@/app/components/MultipleTextField";
import { stateLga } from "@/constant/state";
import Select from "react-select";
import { customStyles } from "@/constant/customStyles";

export default function page() {
    const theme = useTheme();
    const [open, setOpen] = useState<boolean>(false);
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const [name, setName] = useState<string>('');
    const [address, setAddress] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [phone, setPhone] = useState<string>('');
    const [website, setWebsite] = useState<string>('');
    const createHospitalMutation = useCreateHospital();
    const getHospitalsMutation = useGetHospitals();
    const [hospitals, setHospitals] = useState<any>([]);
    const deleteHospitalMutation = useDeleteHospital();
    const [image, _] = useAtom(selectedImageArrayAtom);
    const [items, setItems] = useState<any>([]);
    const [state, setState] = useState([]); 
    const [selectedState, setSelectedState] = useState('');
    const [lga, setLga] = useState('');
    const [district, setDistrict] = useState<any[]>([]);

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
        const phoneNumbers = /.*\d.*/;
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        const websiteRegex = /^(?:www\.)?[a-zA-Z0-9-]+\.[a-zA-Z]{2,}$/;
        if(items.length > 4) {
            handleOpenNotification('error', '', 'Services can not be more that 4.')
            return;
        }
        if(phone.length > 11 || phone.length < 11 && !phoneNumbers.test(phone)) {
            handleOpenNotification('error', '', 'Phone numbers should only contain 11 numbers.')
            return;
        }
        if(!emailRegex.test(email)) {
            handleOpenNotification('error', '', 'Invalid email address.')
            return;
        }
        if(!websiteRegex.test(website)) {
            handleOpenNotification('error', '', 'Invalid website.')
            return;
        }
        await createHospitalMutation.mutateAsync({
            hospitalName: name,
            address,
            phone,
            website: `https://${website}`,
            image: image[0],
            services: items,
            email,
            state: selectedState,
            lga
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

    const handleDistrict = (value: any) => {
        if (!value) {
          return;
        }
        const newData = Object.entries(stateLga).find(
          (_items) => _items[0] === value
        );
    
        if (!newData) {
          return;
        }
        const districtArray = newData[1]?.map(
          (item) => {
            return {
              value: item,
              label: item,
            };
          }
        );
        setDistrict(districtArray);
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

    useEffect(() => {
        let stateArray: any = [];
        const newData = Object.entries(stateLga);
    
        newData.map((item, index) => {
          stateArray.push({
            value: item[0],
            label: item[0],
          });
        });
        setState(stateArray);
    }, []);

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
                            label="Hospital Name"
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
                        />

                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: isMobile ? 'column' : 'row',
                                gap: 2,
                                width: '100%'
                            }}
                        >
                            <Box width={isMobile ? '100%' : '50%'}>
                                <InputField
                                    label="Email"
                                    placeholder="Enter email"
                                    isBorder={true}
                                    labelStyle={{
                                        fontSize: theme.typography.labelbase.fontSize,
                                        fontWeight: 500
                                    }}
                                    value={email}
                                    onChange={(e)=>setEmail(e.target.value)}
                                />
                            </Box>
                            <Box width={isMobile ? '100%' : '50%'}>
                                <InputField
                                    label="Phone Number"
                                    placeholder="Enter phone number"
                                    isBorder={true}
                                    labelStyle={{
                                        fontSize: theme.typography.labelbase.fontSize,
                                        fontWeight: 500
                                    }}
                                    value={phone}
                                    onChange={(e)=>setPhone(e.target.value)}
                                />
                            </Box>
                        </Box>

                        <Box width='100%'>
                            <InputField
                                label="Website"
                                placeholder="Enter website"
                                isBorder={true}
                                labelStyle={{
                                    fontSize: theme.typography.labelbase.fontSize,
                                    fontWeight: 500
                                }}
                                value={website}
                                onChange={(e)=>setWebsite(e.target.value)}
                                startAdornment={(
                                    <Box
                                        sx={{
                                            m: 1,
                                            borderRadius: theme.borderRadius.xs,
                                            boxShadow: 2,
                                            bgcolor: 'white',
                                            width: '4em',
                                            minHeight: '25px',
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center'
                                        }}
                                    >
                                        <Typography variant="labelsm" 
                                            color={theme.palette.secondary.light}
                                        >
                                            https://
                                        </Typography>
                                    </Box>
                                )}
                            />
                        </Box>

                        <Box width='100%'
                            sx={{
                                display: 'flex',
                                flexDirection: isMobile ? 'column' : 'row',
                                gap: 2
                            }}
                        >
                            <Box width={isMobile ? '100%' : '50%'}>
                                <Typography
                                    sx={{
                                        fontSize: theme.typography.labelxs.fontSize,
                                        fontWeight: theme.typography.labelsm.fontWeight,
                                        mb: 2
                                    }}
                                >
                                    State
                                </Typography>
                                <Select
                                    className="w-full h-10 font-light"
                                    options={state}
                                    styles={customStyles}
                                    placeholder="Select State"
                                    name="state"
                                    onChange={(item) => {
                                        handleDistrict(String(item?.value));
                                        setSelectedState(String(item?.value));
                                    }}
                                    value={{
                                        value: selectedState,
                                        label: selectedState
                                    }}
                                />
                            </Box>

                            <Box
                                sx={{
                                    width: isMobile ? '100%' : '50%'
                                }}
                            >
                                <Typography
                                    sx={{
                                        fontSize: theme.typography.labelxs.fontSize,
                                        fontWeight: theme.typography.labelsm.fontWeight,
                                        mb: 2
                                    }}
                                >
                                    LGA
                                </Typography>
                                <Select
                                    className="w-full h-10 font-light"
                                    options={district}
                                    styles={customStyles}
                                    placeholder="Choose lga"
                                    name="lga"
                                    onChange={(item) => {
                                        setLga(String(item?.value))
                                    }}
                                    value={{
                                        value: lga,
                                        label: lga
                                    }}
                                />
                            </Box>
                        </Box>

                        <Box
                            sx={{
                            width: '100%',
                            mb: 3
                            }}
                        >
                            <MultipleTextField
                                label={"Services"}
                                labelStyle={{
                                    fontSize: theme.typography.fontSize.labelxs,
                                    fontWeight: 500
                                }}
                                items={items}
                                setItems={setItems}
                                infoText="Please type in the services and then press enter."
                            />
                        </Box>

                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'column'
                            }}
                        >
                            <Typography variant='labelbase' mb={2}>
                                Hospital Image
                            </Typography>
                            <Box
                                sx={{
                                    width: '100%',
                                    border: `3px dashed ${theme.palette.secondary.lighter}`,
                                    borderRadius: theme.borderRadius.sm,
                                    backgroundColor: "white",
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    flexDirection: 'column'
                                }}
                            >
                                <ImageUploader
                                    label={''}
                                    showImageName={true}
                                    allowMultiple={false}
                                    showDomiImage={false}
                                    spacebtwimgtypes={-2}
                                    title={false}
                                />
                            </Box>
                        </Box>

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
