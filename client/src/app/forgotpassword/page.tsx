'use client';

import { Box, Typography, useMediaQuery, useTheme, useThemeProps } from "@mui/material";
import Image from "next/image";
import InputField from "../components/InputField";
import { useEffect, useState } from "react";
import { NButton } from "../components/PButton";
import { useRouter } from "next/navigation";
import { useForgotPassword, useResetPassword } from "../admin/hooks/userHook/useUser";
import Toastify from "../components/ToastifySnack";
import MModal from "../components/Modal";
import OtpInputField from "../components/OtpInputField";
import { useSession } from "next-auth/react";

export default function Page() {
    const theme = useTheme();
    const isMobile = useMediaQuery('(max-width: 900px)');
    const [email, setEmail] = useState<string>('');
    const router = useRouter();
    const forgotPasswordMutation = useForgotPassword();
    const resetPasswordMutation = useResetPassword();
    const [successForgotPassModal, setSuccessForgotPassModal] = useState<boolean>(false);
    const [enterResetPasswordModal, setEnterResetPasswordModal] = useState<boolean>(false);
    const [otp, setOtp] = useState('');
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const {status: authStatus} = useSession();

    const [message, setMessage] = useState<string>('');
    const [isError, setIsError] = useState<boolean>(false);
    const [isSuccess, setIsSuccess] = useState<boolean>(false);
    const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);

    const handleOpenNotification = (type: 'success' | 'error', successMsg?: string, errorMsg?: string) => {
        setMessage(type === 'success' ? successMsg || 'Operation was successful!' : errorMsg || 'There was an error!');
        setIsError(type === 'error');
        setIsSuccess(type === 'success');
        setSnackbarOpen(true);
    };

    const handleModalClose3 = () => {
        setSuccessForgotPassModal(false)
        setEnterResetPasswordModal(true)
    };

    const handleResendToken = async () => {
        await forgotPasswordMutation.mutateAsync(email, {
          onError: (error: any) => {
            const errorMessage = error.response?.data?.message || 'An unexpected error occurred';
            handleOpenNotification('error', '', errorMessage)
          }
        })
    }

    const handleResetPassword = async () => {
        const payload = {
          resetCode: otp,
          password: password,
          confirmPassword: confirmPassword
        }
    
        await resetPasswordMutation.mutateAsync(payload, {
          onError: (error: any) => {
            const errorMessage = error.response?.data?.message || 'An unexpected error occurred';
            handleOpenNotification('error', '', errorMessage)
          },
          onSuccess: (response) => {
            handleOpenNotification('success', 'Successful, please log in with your new password.')
            setEnterResetPasswordModal(false)
            setEmail('')
            setPassword('')
            setConfirmPassword('')
            setOtp('')
            router.push('/signin')
          },
        })
    }

    const handleModalClose = () => {
        setEnterResetPasswordModal(false)
    };

    const handleForgotPassword = async () => {
        await forgotPasswordMutation.mutateAsync(email, {
          onSuccess: (response) => {
            setSuccessForgotPassModal(true)
          },
          onError: (error: any) => {
            const errorMessage = error.response?.data?.message || 'An unexpected error occurred';
            handleOpenNotification('error', '', errorMessage)
          }
        })
    };

    useEffect(() => {
        let intervalId: NodeJS.Timeout;
    
        if(successForgotPassModal) {
          intervalId = setTimeout(() => {
            setSuccessForgotPassModal(false)
            setEnterResetPasswordModal(true)
          },5000)
        }
    
        return () => {
          clearInterval(intervalId)
        }
    },[successForgotPassModal]);

    useEffect(() => {
        if(authStatus === 'authenticated') {
            router.push('/')
        }
    },[authStatus])

    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
                bgcolor: theme.palette.secondary.lightest
            }}
        >
            <Box className="flex flex-col justify-center items-center"
                sx={{
                    height: 'auto',
                    overflow: 'scroll', 
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
                    Reset Your Password
                </Typography>
                <Typography variant='paragraphxs' color={theme.palette.secondary.light} mb={3}
                    sx={{textAlign: 'center'}}
                >
                    Enter your email address we will send you a code to reset your password.
                </Typography>
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
                <NButton
                    textcolor='white'
                    bkgcolor={theme.palette.primary.main}
                    width='100%'
                    onClick={handleForgotPassword}
                >
                    {forgotPasswordMutation.isLoading ? "Loading..." : "Continue" }
                </NButton>
                <Box className="flex items-center justify-center">
                    <Typography variant='labelxs'
                        onClick={() => router.push('/signin')}
                        sx={{
                            cursor: 'pointer',
                            '&:hover': {
                                color: theme.palette.primary.main
                            },
                            mt: 2
                        }}
                    >
                        Sign in instead
                    </Typography>
                </Box>
            </Box>

            <MModal
                onClose={handleModalClose3}
                open={successForgotPassModal}
                width={isMobile ? '95%' : '40%'}
                showCloseIcon={false}
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
                    Check Your Inbox
                </Typography>
                <Typography variant='paragraphsm' color={theme.palette.secondary.light} mb={3}
                    sx={{textAlign: 'center'}}
                >
                    We've sent a password reset link to your email. Click the link to create a new password.
                </Typography>
                </Box>
            </MModal>

            <MModal
                onClose={handleModalClose}
                open={enterResetPasswordModal}
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
                    Reset Your Password
                </Typography>
                <Box width={'100%'} mt={3} mb={3}>
                    <Typography variant='labelsm'>
                        Enter the otp sent to your email.
                    </Typography>
                    <OtpInputField
                        value={otp}
                        onChange={setOtp}
                    />
                    <Typography variant='paragraphxs'
                    onClick={() => forgotPasswordMutation.isLoading ? null : handleResendToken()}
                    sx={{
                        color: theme.palette.primary.main,
                        ml: 2,
                        '&:hover': {
                        fontWeight: 500
                        },
                        cursor: 'pointer'
                    }}
                    >
                    {forgotPasswordMutation.isLoading ? 'Resending otp...' : 'Resend password otp'}
                    </Typography>
                </Box>
                <Box width={'100%'}>
                    <InputField
                    label="Enter new password"
                    placeholder="Enter new password"
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
                <Box width={'100%'}>
                    <InputField
                        label="Confirm password"
                        placeholder="Enter confirm password"
                        isBorder={true}
                        type='password'
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        labelStyle={{
                            fontWeight: 500,
                            marginBottom: -2,
                            fontSize: theme.typography.labelsm
                        }}
                    />
                </Box>
                <NButton
                    textcolor='white'
                    bkgcolor={theme.palette.primary.main}
                    width='100%'
                    onClick={handleResetPassword}
                >
                    {resetPasswordMutation.isLoading ? "Reseting password..." : "Reset password" }
                </NButton>
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
