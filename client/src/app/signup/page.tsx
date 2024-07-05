'use client';

import { Box, Divider, Typography, useMediaQuery, useTheme } from "@mui/material";
import Image from "next/image";
import { NButton } from "../components/PButton";
import { MyCheckbox2 } from "../components/CheckBox";
import InputField from "../components/InputField";
import { useEffect, useState } from "react";
import { useSendSignUpOtp, useSignUp, useUpdateUserOnboarding, useValidateSignUpOtp } from "../admin/hooks/userHook/useUser";
import Toastify from "../components/ToastifySnack";
import { useLocalStorage } from "@uidotdev/usehooks";
import { useRouter } from "next/navigation";
import MModal from "../components/Modal";
import OtpInputField from "../components/OtpInputField";
import { signIn, useSession } from "next-auth/react";
import { stateLga } from "@/constant/state";
import { customStyles } from "@/constant/customStyles";
import Select from "react-select";

export default function page() {
    const theme = useTheme();
    const [checked2, setChecked2] = useState<boolean>(false);
    const [email, setEmail] = useState<string>('');
    const [firstName, setFirstName] = useState<string>('');
    const [lastName, setLastName] = useState<string>('');
    const [phone, setPhone] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [checked, setChecked] = useState<boolean>(false);
    const sendSignUpTokenMutation = useSendSignUpOtp();
    // const [userDetails, setUserDetails] = useLocalStorage('userInfo', {});
    const [openAccountVerifyModal, setOpenAccountVerifyModal] = useState<boolean>(false);
    const router = useRouter();
    const isMobile = useMediaQuery('(max-width: 900px)');
    const [otp, setOtp] = useState('');
    const validateSignUpTokenMutation = useValidateSignUpOtp();
    const {data: session, update, status: authStatus} = useSession();
    const [openModalReg2, setOpenModalReg2] = useState<boolean>(false);
    const [state, setState] = useState([]);
    const [district, setDistrict] = useState<any[]>([]);
    const [selectedDistrict, setSelectedDistrict] = useState<string>('');
    const [selectedState, setSelectedState] = useState('');
    const [age, setAge] = useState('0');
    const [address, setAddress] = useState<string>('');
    const [selectedGender, setSelectedGender] = useState<string>('');
    const updateUserOnboardingMutation = useUpdateUserOnboarding();

    const [message, setMessage] = useState<string>('');
    const [isError, setIsError] = useState<boolean>(false);
    const [isSuccess, setIsSuccess] = useState<boolean>(false);
    const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);
    const signUpMutation = useSignUp();

    const handleOpenNotification = (type: 'success' | 'error', successMsg?: string, errorMsg?: string) => {
        setMessage(type === 'success' ? successMsg || 'Operation was successful!' : errorMsg || 'There was an error!');
        setIsError(type === 'error');
        setIsSuccess(type === 'success');
        setSnackbarOpen(true);
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

    const handleUpdateUserOnboarding = async () => {
        const payload = {
          age: age,
          gender: selectedGender,
          address: address,
          state: selectedState,
          lga: selectedDistrict
        }
    
        await updateUserOnboardingMutation.mutateAsync(payload, {
          onSuccess: async () => {
            await update({
              ...session,
              user: {
                ...session?.user,
                level: 2,
              },
            });
            setOpenModalReg2(false);
            router.push('/')
          },
          onError: (error: any) => {
            const errorMessage = error.response?.data?.message || 'An unexpected error occurred';
            handleOpenNotification('error', '', errorMessage)
          }
        })
    }

    const handleValidateSignUpOtp = async() => {
        const info = localStorage.getItem('userInfo');
        const userDetails = info && JSON.parse(info)
        const payload = {
          //@ts-ignore
          email: userDetails.email,
          emailOtp: otp
        }
    
        await validateSignUpTokenMutation.mutateAsync(payload, {
          onSuccess: async () => {
            await signUpMutation.mutateAsync({}, {
              onSuccess: async () => {
                await signIn('credentials', {
                  email,
                  password,
                  redirect: false,
                });
                
                await update({
                  ...session,
                  user: {
                    ...session?.user,
                    level: 1,
                  },
                });
    
                setOpenAccountVerifyModal(false)
                setOpenModalReg2(true);
                // setUserDetails({});
                localStorage.removeItem('userInfo')
              },
              onError: (error: any) => {
                const errorMessage = error.response?.data?.message || 'An unexpected error occurred';
                handleOpenNotification('error', '', errorMessage)
              }
            })
          }
        })
      }

    const handleResendSignOtp = async () => {
        await sendSignUpTokenMutation.mutateAsync(email)
    }
    
    const handleSendSignUpOtp = async () => {
        const regex = /^\d+$/;
        if(authStatus === 'authenticated') {
            handleOpenNotification('error', '', 'You currently signed, please sign out to proceed.')
            return;
        }

        if(!regex.test(phone)) {
          handleOpenNotification('error', '', 'Phone number should only contain numbers.')
          return;
        }
    
        if(phone.length > 11) {
          handleOpenNotification('error', '', 'Phone number too long.')
          return;
        }
        if(phone.length < 11) {
          handleOpenNotification('error', '', 'Phone number too short.')
          return;
        }
    
        const payload = {
          phone: phone,
          email: email,
          firstName: firstName,
          lastName: lastName,
          password: password,
          isAdvocate: checked2
        }
    
        await sendSignUpTokenMutation.mutateAsync( email, {
          onSuccess: () => {
            // setUserDetails(payload)
            localStorage.setItem('userInfo', JSON.stringify(payload))
            setOpenAccountVerifyModal(true)
            // setOpenModalReg(false)
          },
          onError: (error: any) => {
            const errorMessage = error.response?.data?.message || 'An unexpected error occurred';
            handleOpenNotification('error', '', errorMessage)
          }
        })
    };

    useEffect(() => {
        if(session?.user?.level === 1) {
          setOpenModalReg2(true)
        }
    },[session]);

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
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                bgcolor: theme.palette.secondary.lightest
            }}
        >
            <Box className="flex flex-col justify-center items-center"
                sx={{
                    height: 'auto',
                    my: 6,
                    p: 4,
                    width: isMobile ? '90%' : '40%',
                    borderRadius: theme.borderRadius.sm,
                    bgcolor: 'white',
                    boxShadow: 2
                }}
            >
                <Image
                    src="/logo.png"
                    alt="logo"
                    width={60}
                    height={60}
                />
                <Typography variant='h5' mt={2}>
                    Create Your Account
                </Typography>
                <Typography variant='paragraphsm' color={theme.palette.secondary.light} mb={3}>
                    Enter your details to begin.
                </Typography>
                
                <Box
                    sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 2, width: '100%'
                    }}
                >
                    <NButton
                        textcolor='black'
                        bkgcolor='white'
                        bordercolor={theme.palette.border.main}
                        hoverbordercolor={theme.palette.primary.main}
                        width={'50%'}
                    >
                        <img
                            src="/googleLogo.png"
                            alt="google logo"
                            style={{
                            width: '20px',
                            height: '20px'
                            }}
                        />
                        <Typography variant='labelxs' ml={2}>
                            Sign in with Google
                        </Typography>
                    </NButton>
                    <NButton
                        textcolor='white'
                        bkgcolor='black'
                        bordercolor={'black'}
                        hoverbordercolor={'black'}
                        width={'50%'}
                    >
                        <img
                            src="/appleLogo.png"
                            alt="apple logo"
                            style={{
                            width: '20px',
                            height: '20px'
                            }}
                        />
                        <Typography variant='labelxs' ml={2}>
                            Sign in with Apple
                        </Typography>
                    </NButton>
                </Box>
                <Box
                    sx={{
                    display: 'flex',
                    alignItems: 'center',
                    my: 3, width: '100%',
                    justifyContent: 'space-between'
                    }}
                >
                    <Divider sx={{width: '45%'}}/>
                    <Typography variant='paragraphsm' color={theme.palette.secondary.light}>
                        OR
                    </Typography>
                    <Divider sx={{width: '45%'}}/>
                </Box>

                <Box
                    sx={{
                    display: 'flex',
                    gap: 1, mb: 3, mt: 2,
                    alignItems: 'flex-start',
                    justifyContent: 'flex-start',
                    width: '100%', 
                    }}
                >
                    <MyCheckbox2
                        checked={checked2}
                        setChecked={setChecked2}
                    />
                    <Typography variant='paragraphbase'>
                        Want to become a Patient Advocate?
                    </Typography>
                </Box>

                <Box width={'100%'} display={'flex'} gap={2}>
                    <Box width={'50%'}>
                    <InputField
                        label="FirstName"
                        placeholder="Ade"
                        isBorder={true}
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        labelStyle={{
                        fontWeight: 500,
                        marginBottom: -2,
                        fontSize: theme.typography.labelsm
                        }}
                    />
                    </Box>
                    <Box width={'50%'}>
                    <InputField
                        label="Last name"
                        placeholder="Emeka"
                        isBorder={true}
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        labelStyle={{
                        fontWeight: 500,
                        marginBottom: -2,
                        fontSize: theme.typography.labelsm
                        }}
                    />
                    </Box>
                </Box>

                <Box width={'100%'}>
                    <InputField
                    label="Phone number"
                    placeholder="08100000000"
                    isBorder={true}
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    labelStyle={{
                        fontWeight: 500,
                        marginBottom: -2,
                        fontSize: theme.typography.labelsm
                    }}
                    />
                </Box>
                
                <Box width={'100%'}>
                    <InputField
                    label="Email address"
                    placeholder="Enter email"
                    isBorder={true}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    labelStyle={{
                        fontWeight: 500,
                        marginBottom: -2,
                        fontSize: theme.typography.labelsm
                    }}
                    />
                </Box>

                <Box width={'100%'}>
                    <InputField
                        label="Password"
                        placeholder="Enter password"
                        isBorder={true}
                        type='password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        labelStyle={{
                            fontWeight: 500,
                            marginBottom: -2,
                            fontSize: theme.typography.labelsm
                        }}
                    />
                </Box>
                <Box
                    sx={{
                    display: 'flex',
                    gap: 1, mb: 1, mt: 2,
                    alignItems: 'center',
                    justifyContent: 'center'
                    }}
                >
                    <MyCheckbox2
                        checked={checked}
                        setChecked={setChecked}
                    />
                    <Typography variant='paragraphxs' color={theme.palette.secondary.light}>
                        I agree Patient.ng
                    </Typography>
                    <Typography variant='labelxs' color={theme.palette.primary.main}>
                        Term and Conditions
                    </Typography>
                </Box>
                <NButton
                    textcolor='white'
                    bkgcolor={checked ? theme.palette.primary.main : theme.palette.border.main}
                    width='100%'
                    onClick={handleSendSignUpOtp}
                    disabled={!checked}
                >
                    {sendSignUpTokenMutation.isLoading ? "Loading..." : "Sign Up" }
                </NButton>

                <Box
                    sx={{
                    display: 'flex',
                    gap: 1, mt: 3, mb: 2
                    }}
                >
                    <Typography variant='paragraphxs' color={theme.palette.secondary.light}>
                        Already have an account?
                    </Typography>
                    <Typography variant='labelxs' onClick={()=>{
                            // setOpenModalReg(false)
                            router.push('/signin')
                        }}
                        sx={{
                            cursor: 'pointer',
                            '&:hover': {
                            color: theme.palette.primary.main
                            }
                        }}
                    >
                        Sign in
                    </Typography>
                </Box>
                
            </Box>

            <MModal
                onClose={()=>setOpenAccountVerifyModal(false)}
                open={openAccountVerifyModal}
                width={isMobile ? '95%' : '40%'}
                showCloseIcon={false}
                onClickOut={false}
                height={'auto'}
             >
                <Box className="flex flex-col justify-center items-center"
                    sx={{
                        height: 'auto',
                        bgcolor: theme.palette.secondary.lightest,
                        overflow: 'scroll', 
                        p: 3
                    }}
                >
                <Image
                    src="/logo.png"
                    alt="logo"
                    width={60}
                    height={60}
                    style={{marginTop: '30px'}}
                />
                <Typography variant='h5' mt={4}>
                    Verify Your Account
                </Typography>
                <Box width={'100%'} mt={3} mb={3} display={'flex'} justifyContent={'center'} alignItems={'center'} flexDirection={'column'}>
                    <Typography variant='paragraphbase' color={theme.palette.secondary.light} mb={4}
                        sx={{textAlign:'center'}}
                    >
                        A verification code has been sent to your email. Please enter the code below to verify your account.
                    </Typography>
                    <OtpInputField
                        value={otp}
                        onChange={setOtp}
                        inputNumber={6}
                    />
                    <Typography variant='labelsm' color={theme.palette.primary.main} mt={3}
                    sx={{
                        cursor: 'pointer',
                        textAlign: 'center'
                    }}
                    onClick={handleResendSignOtp}
                    >
                    {sendSignUpTokenMutation.isLoading ? 'Resending code...' : 'Resend code'}
                    </Typography>
                </Box>
                <Box mt={4}>
                    <NButton
                    textcolor='white'
                    bkgcolor={theme.palette.primary.main}
                    width='100%'
                    onClick={handleValidateSignUpOtp}
                    >
                    {validateSignUpTokenMutation.isLoading ? "Verifying..." : "Verify my account" }
                    </NButton>
                </Box>
                
                </Box>
            </MModal>

            <MModal
                onClose={() => setOpenModalReg2(false)}
                open={openModalReg2}
                width={isMobile ? '95%' : '40%'}
                showCloseIcon={false}
                onClickOut={false}
                height={'auto'}
            >
                <Box className="flex flex-col justify-center items-center"
                    sx={{
                        height: 'auto',
                        bgcolor: theme.palette.secondary.lightest,
                        overflow: 'scroll', 
                        p: 3
                    }}
                >
                <Image
                    src="/logo.png"
                    alt="logo"
                    width={60}
                    height={60}
                />
                <Typography variant='h5' mt={2}>
                    Personalize Your Experience
                </Typography>
                <Typography variant='paragraphsm' color={theme.palette.secondary.light} mb={3}
                    sx={{textAlign: 'center'}}
                >
                    Tell us a bit about yourself to tailor your iPatient experience.
                </Typography>
                <Box width={'100%'} display={'flex'} gap={2}>
                    <Box width={'50%'}>
                    <InputField
                        label="Age"
                        placeholder="Enter age"
                        isBorder={true}
                        type='number'
                        value={age}
                        onChange={(e) => setAge(e.target.value)}
                        labelStyle={{
                        fontWeight: 500,
                        marginBottom: -2,
                        fontSize: theme.typography.labelsm
                        }}
                    />
                    </Box>
                    <Box
                    sx={{
                        width: '50%',
                        mt: -1
                    }}
                    >
                    <Typography variant="labelxs" mb={2}>
                        Gender
                    </Typography>
                    <Select
                        className="w-full h-10 font-light"
                        options={[
                            {value: "male", label: "Male"},
                            {value: "female", label: "Female"}
                        ]}
                        styles={customStyles}
                        placeholder="Select Gender"
                        name="gender"
                        onChange={(item) => {
                            setSelectedGender(String(item?.value))
                        }}
                        value={{
                        value: selectedGender,
                        label: selectedGender,
                        }}
                    />
                    </Box>
                </Box>
                <Box
                    sx={{
                    width: '100%',
                    flexDirection: isMobile ? 'column' : 'row',
                    display: 'flex', gap: 3, mt: 2
                    }}
                >
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
                        placeholder="Select LGA"
                        name="lga"
                        onChange={(item) => {
                        setSelectedDistrict(String(item?.value))
                        }}
                        value={{
                            value: selectedDistrict,
                            label: selectedDistrict,
                        }}
                    />
                    </Box>
                </Box>
                <Box width={'100%'} mt={3}>
                    <InputField
                        label="Address"
                        placeholder="Enter address"
                        isBorder={true}
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        labelStyle={{
                            fontWeight: 500,
                            marginBottom: -2,
                            fontSize: theme.typography.labelsm
                        }}
                    />
                </Box>
                <Box mt={4} width='100%'>
                    <NButton
                    textcolor='white'
                    bkgcolor={theme.palette.primary.main}
                    width='100%'
                    onClick={handleUpdateUserOnboarding}
                    >
                    {updateUserOnboardingMutation.isLoading ? "Saving..." : "Continue" }
                    </NButton>
                </Box>
                </Box>
            </MModal>

            <Toastify
                open={snackbarOpen}
                onClose={() => setSnackbarOpen(false)}
                message={message}
                error={isError}
                success={isSuccess}
            />
        </Box>
    )
}
