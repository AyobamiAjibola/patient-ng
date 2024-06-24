'use client';
import React, { useEffect, useState } from 'react';
import {
  Toolbar,
  IconButton,
  Drawer,
  List,
  Typography,
  useTheme,
  Box,
  TextField,
  Avatar,
  Divider
} from '@mui/material';
import Link from 'next/link';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { useMediaQuery } from '@mui/material';
import { useRouter, usePathname } from 'next/navigation';
import Image from 'next/image';
import Container from './Container';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import PButton, { NButton } from './PButton';
import MenuDropDown from './MenuDropDown';
import { useAtom } from 'jotai';
import { modalReg, sessionErrorModal, sessionErrorMsg, setIndex, setIsLoggedIn, setOpenSignInModal } from '@/lib/atoms';
import { KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material';
import MenuDropDown2 from './MenuDropDown2';
import MModal from './Modal';
import InputField from './InputField';
import { signIn, signOut, useSession } from 'next-auth/react';
import Toastify from './ToastifySnack';
import { useForgotPassword, useResetPassword, useSendSignUpOtp, useSignUp, useUpdateUserOnboarding, useValidateSignUpOtp } from '../admin/hooks/userHook/useUser';
import OtpInputField from './OtpInputField';
import { MyCheckbox2 } from './CheckBox';
import { useLocalStorage } from '@uidotdev/usehooks';
import Select from "react-select";
import { customStyles } from '@/constant/customStyles';
import { stateLga } from '@/constant/state';
import capitalize from 'capitalize';

interface PagesProps {
  id?: number;
  href: string;
  name: string;
}

const pages: PagesProps[] = [
  {
    id: 1,
    name: 'Advocacy',
    href: '/advocacy',
  },
  {
    id: 2,
    name: 'Crowdfunding',
    href: '/crowdfunding',
  },
  // {
  //   id: 3,
  //   name: 'Insight',
  //   href: '/insight',
  // },
  {
    id: 3,
    name: 'Resources',
    href: '',
  },
];

const resources = [
  {
    name: "Blog",
    link: "/blog"
  },
  {
    name: "Patient stories",
    link: "/patient-stories"
  },
  {
    name: "Webinar",
    link: "/webinar"
  },
  {
    name: "Podcast",
    link: "/podcast"
  },
  {
    name: "Award",
    link: "/award"
  },
  {
    name: 'Insight',
    link: '/insight',
  }
]

interface NavbarProps {
  showSearchBar?: boolean;
}
export default function Navbar({ showSearchBar = false }: NavbarProps) {
  const theme = useTheme();
  const router = useRouter();
  const [toggle, setToggle] = useState(false);
  const isMobile = useMediaQuery('(max-width: 900px)');
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [anchorEl2, setAnchorEl2] = useState<null | HTMLElement>(null);
  const [indx, setIndx] = useAtom(setIndex);
  const open = Boolean(anchorEl);
  const open2 = Boolean(anchorEl2);
  const pathname = usePathname();
  const isLogged = false;
  const [showResources, setShowResources] = useState(false);
  const [email, setEmail] = useState<string>('');
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [openModal, setOpenModal] = useAtom(setOpenSignInModal);
  const [openModalReg, setOpenModalReg] = useAtom(modalReg);
  const [openModalReg2, setOpenModalReg2] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);
  const [isLoggedAsAdmin, setIsLoggedAsAdmin] = useAtom(setIsLoggedIn);
  const { data: session, update } = useSession();
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [forgotPassModal, setForgotPassModal] = useState<boolean>(false);
  const forgotPasswordMutation = useForgotPassword();
  const resetPasswordMutation = useResetPassword();
  const [successForgotPassModal, setSuccessForgotPassModal] = useState<boolean>(false);
  const [enterResetPasswordModal, setEnterResetPasswordModal] = useState<boolean>(false);
  const [otp, setOtp] = useState('');
  const [otp2, setOtp2] = useState('');
  const [checked, setChecked] = useState<boolean>(false);
  const [checked2, setChecked2] = useState<boolean>(false);
  const signUpMutation = useSignUp();
  const sendSignUpTokenMutation = useSendSignUpOtp();
  const validateSignUpTokenMutation = useValidateSignUpOtp();
  const [userDetails, setUserDetails] = useLocalStorage('userInfo', {});
  const [openAccountVerifyModal, setOpenAccountVerifyModal] = useState<boolean>(false);
  const [age, setAge] = useState('0');
  const [address, setAddress] = useState<string>('');
  const [selectedGender, setSelectedGender] = useState<string>('');
  const updateUserOnboardingMutation = useUpdateUserOnboarding();
  const [state, setState] = useState([]);
  const [district, setDistrict] = useState<any[]>([]);
  const [selectedDistrict, setSelectedDistrict] = useState<string>('');
  const [selectedState, setSelectedState] = useState('');
  const [sessionError, setSessionError] = useAtom(sessionErrorMsg)
  const [sessionErrorModalOpen, setSessionErrorModalOpen] = useAtom(sessionErrorModal)

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

  const handleModalClose = () => {
    setOpenModal(false)
  };

  const handleModalClose2 = () => {
    setForgotPassModal(false)
  };

  const handleModalClose3 = () => {
    setSuccessForgotPassModal(false)
    setEnterResetPasswordModal(true)
  };

  const handleModalRegClose = () => {
    setOpenModalReg(false)
  }

  const handleModalClose4 = () => {
    setEnterResetPasswordModal(false)
  };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClick2 = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl2(event.currentTarget);
  };

  const handleOpenResources = () => {
    setShowResources(true)
  }

  const handleForgotPassword = async () => {
    await forgotPasswordMutation.mutateAsync(email, {
      onSuccess: (response) => {
        setSuccessForgotPassModal(true)
        setForgotPassModal(false)
      },
      onError: (error: any) => {
        const errorMessage = error.response?.data?.message || 'An unexpected error occurred';
        handleOpenNotification('error', '', errorMessage)
      }
    })
  }

  const handleResendToken = async () => {
    await forgotPasswordMutation.mutateAsync(email, {
      onError: (error: any) => {
        const errorMessage = error.response?.data?.message || 'An unexpected error occurred';
        handleOpenNotification('error', '', errorMessage)
      }
    })
  }

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
      },
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
      },
    })
  }

  const onToggle = () => setToggle(!toggle);

  const handleSignIn = async () => {
    setIsLoading(true);
    const response = await signIn('credentials', {
      email,
      password,
      redirect: false,
    });

    if(response) {
      if (response.ok === true) {
        setIsLoggedAsAdmin(true);
        setOpenModal(false)
      } else if(response.ok === false) {
        setIsLoading(false);
        handleOpenNotification('error', '', response.error as string)
      }
    }
  };

  const handleValidateSignUpOtp = async() => {
    const payload = {
      //@ts-ignore
      email: userDetails.email,
      emailOtp: otp2
    }

    await validateSignUpTokenMutation.mutateAsync(payload, {
      onSuccess: async () => {
        await signUpMutation.mutateAsync(userDetails, {
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
            setUserDetails({});
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
        setUserDetails(payload)
        setOpenAccountVerifyModal(true)
        setOpenModalReg(false)
      },
      onError: (error: any) => {
        const errorMessage = error.response?.data?.message || 'An unexpected error occurred';
        handleOpenNotification('error', '', errorMessage)
      }
    })
  };

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

  useEffect(() => {
    if(pathname === '/blog' || 
        pathname === '/webinar' || 
        pathname === '/patient-stories' ||
        pathname === '/award' ||
        pathname === '/podcast'
      ) {
      setIndx(3)
    } else if (pathname.includes('/advocacy')) {
      setIndx(0)
    } else if (pathname.includes('/crowdfunding')) {
      setIndx(1)
    } else if (pathname.includes('/insight')) {
      setIndx(2)
    } else if(pathname === '/') {
      setIndx(-1)
    }
  },[pathname]);

  useEffect(() => {
    if(isLoggedAsAdmin && session?.user?.isAdmin) {
      router.push('/admin');
    }

    return () => {
      setIsLoggedAsAdmin(false);
    }
  },[isLoggedAsAdmin]);

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
    if(session?.user?.level === 1) {
      setOpenModalReg2(true)
    }
  },[session]);

  useEffect(() => {
    if(sessionError !== '') {
      setSessionErrorModalOpen(true)
    }
  },[sessionError]);

  return (
    <Box 
      sx={{ 
        backgroundColor: pathname === '/' ? 'rgba(0, 0, 0, 0.5)' : theme.palette.background.white, 
        borderBottom: pathname === '/' ? 'none' : '2px solid #F3F3F3', position: 'relative'
      }}
    >
      <Container>
        <Toolbar
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%',
            minHeight: 80,
            margin: 'auto',
            position: 'relative',
            gap: !isMobile ? '' : '50px'
          }}
        >
          <Box className='flex flex-row items-center gap-4 cursor-pointer'
            onClick={() => router.push('/')}
          >
              <Image
                src='/logo.png'
                alt='logo'
                height={isMobile ? 30 : 40}
                width={isMobile ? 30 : 40}
              />
            <Typography variant={isMobile ? 'h6' : 'h5'}
              fontFamily={theme.fonts}
              sx={{
                color: pathname === '/' ? 'white' : theme.palette.primary.darker
              }}
            >
              Patient.ng
            </Typography>
          </Box>

          {showSearchBar && !isMobile && (
            <TextField
              placeholder="Find the best food or resta..."
              variant="standard"
              InputProps={{
                disableUnderline: true,
                style: {
                  border: `1px solid ${theme.palette.border.main}`,
                  height: '36px',
                  width: 250,
                  paddingTop: 1,
                  fontSize: '14px',
                  borderRadius: theme.borderRadius.sm,
                  color: theme.palette.secondary.light,
                  paddingLeft: theme.spacing(2),
                },
              }}
            />
          )}

          {/* Menu icon for mobile */}
          {isMobile ? (
            <IconButton
              edge="end"
              color="inherit"
              aria-label="menu"
              onClick={onToggle}
              sx={{ position: 'absolute', right: 0 }}
            >
              {toggle ? (
                <CloseIcon sx={{ fontSize: 20 }} />
              ) : (
                <MenuIcon sx={{ fontSize: 20, color: pathname === '/' ? 'white' : 'black' }} />
              )}
            </IconButton>
          ) : null}
          {/* Desktop navigation links */}
          {isMobile ? null : (
            <ul style={{ display: 'flex', gap: theme.spacing(4) }}>
              {pages.map((item, index) => (
                <li key={index}>
                  <Link href={item.href} className='flex flex-row items-center' 
                    onClick={(e: any) => {item.name === 'Resources' && handleClick(e)}}
                  >
                    <Typography
                      fontFamily={theme.fonts}
                      color={index === indx 
                              ? theme.palette.primary.main 
                              : pathname === '/' 
                                ? 'white'
                                : theme.palette.secondary.main
                            }
                      fontWeight={theme.typography.labelxl.fontWeight}
                      sx={{
                        '&:hover': { color: theme.palette.primary.main }
                      }}
                    >
                      {item.name}
                    </Typography>
                    {item.name === "Resources" && (<ExpandMoreIcon sx={{color: pathname === '/' ? 'white' : theme.palette.secondary.main}}/>)}
                  </Link>
                </li>
              ))}
            </ul>
          )}

          {!isMobile && !session?.user && (<Box className='flex flex-row gap-1 items-center'>
                <PButton bg={false} transBg={true} onClick={()=>setOpenModalReg(true)}>
                  Sign Up
                </PButton>
                <PButton bg={true} width='100px' transBg={false} onClick={()=>setOpenModal(true)}>
                  {'Log In'}
                </PButton>
              </Box>
          )}
          {!isMobile && session?.user && (<Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              cursor: 'pointer'
            }}
          >
            <Avatar
              src='/model.png'
              alt='profile image'
              style={{
                width: '40px',
                height: '40px',
                marginRight: 12
              }}
            />
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              <Typography
                sx={{
                  fontSize: theme.typography.labelxs.fontSize,
                  fontWeight: theme.typography.labelxs.fontWeight,
                  color: pathname === '/' ? 'white' : 'black'
                }}
              >
                {capitalize.words(session?.user?.fullName)}
              </Typography>
              <Typography
                sx={{
                  fontSize: theme.typography.labelxs.fontSize,
                  color: pathname === '/' ? 'white' : theme.palette.secondary.light, 
                  mt: -1
                }}
              >
                {session?.user?.email}
              </Typography>
            </Box>

            <IconButton onClick={(e: any) => handleClick2(e)}>
              {open2 ? <KeyboardArrowUp sx={{color: 'white'}}/> : <KeyboardArrowDown sx={{color: pathname === '/' ? 'white' : 'black'}}/>}
            </IconButton>
          </Box>)}
        </Toolbar>

        {/* Responsive mobile drawer */}
        <Drawer anchor="left" open={toggle} onClose={onToggle}>
          <List
            sx={{
              color: '#000000',
              height: '100svh',
              padding: 4,
              width: '375px',
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <Link href="/">
                <Image
                  src='/logo.png'
                  alt='logo'
                  height={40}
                  width={40}
                />
              </Link>
              <IconButton
                edge="end"
                color="inherit"
                aria-label="menu"
                onClick={onToggle}
              >
                <CloseIcon />
              </IconButton>
            </div>

            <ul
              style={{
                marginTop: theme.spacing(5),
                display: 'flex',
                flexDirection: 'column',
                gap: theme.spacing(3),
              }}
            >
              {pages.map((item, ind) => (
                <li key={ind}>
                  <Link href={item.href} onClick={(e: any) => {item.name === 'Resources' && handleOpenResources()}}>
                    <Typography variant='paragraphbase'
                      color={theme.palette.primary.main}
                    >
                      {item.name}
                    </Typography>
                    {item.name === 'Resources' && (<IconButton>
                      {showResources ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
                    </IconButton>)}
                  </Link>
                </li>
              ))}
            </ul>

            {isMobile && showResources && (
              <Box
                sx={{
                  width: '40%',
                  bgcolor: theme.palette.secondary.lightest,
                  border: `1px solid ${theme.palette.secondary.lighter}`,
                  borderRadius: theme.borderRadius.sm,
                  alignSelf: 'center',
                  display: 'flex',
                  justifyContent: 'flex-left',
                  alignItems: 'flex-left',
                  p: 3, gap: 2,
                  flexDirection: 'column'
                }}
              >
                {
                  resources.map((item, index) => (
                    <Box key={index}
                      sx={{
                        display: 'flex',
                        flexDirection: 'column'
                      }}
                    >
                      <Link href={item.link} onClick={() => setToggle(false)}>
                        <Typography variant='paragraphxs'
                          color={theme.palette.primary.darker}
                        >
                          {item.name}
                        </Typography>
                      </Link>
                    </Box>
                  ))
                }
              </Box>
            )}

            {!isLogged 
              ? (<Box className='flex flex-row gap-1 items-center' sx={{mt: '80px'}}>
                  <PButton bg={false} transBg={true}>
                    Sign Up
                  </PButton>
                  <PButton bg={true} width='100px' transBg={false}>
                    {'Log In'}
                  </PButton>
                </Box>
              ) : (
              <Box
                sx={{
                  display: 'flex',
                  gap: 2,
                  alignItems: 'center', mt: 6
                }}
              >
                <Avatar
                  src='/model.png'
                  alt='profile image'
                  style={{
                    width: '30px',
                    height: '30px'
                  }}
                />
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column'
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: theme.typography.labelxs.fontSize,
                      fontWeight: theme.typography.labelxs.fontWeight
                    }}
                  >
                    Abayomi Oluwo
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: theme.typography.labelxs.fontSize,
                      color: theme.palette.secondary.light
                    }}
                  >
                    email@gmail.com
                  </Typography>
                </Box>
                <IconButton onClick={(e: any) => handleClick2(e)}>
                  {open2 ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
                </IconButton>
              </Box>
            )}
          </List>
        </Drawer>
      </Container>
      <MenuDropDown
        anchorEl={anchorEl}
        setAnchorEl={setAnchorEl}
        open={open}
        handleClick={handleClick}
      />

      <MenuDropDown2
        anchorEl={anchorEl2}
        setAnchorEl={setAnchorEl2}
        open={open2}
        handleClick={handleClick2}
      />

      <MModal
        onClose={handleModalClose}
        open={openModal}
        width={isMobile ? '95%' : '30%'}
        showCloseIcon={true}
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
            Welcome back
          </Typography>
          <Typography variant='paragraphsm' color={theme.palette.secondary.light} mb={3}>
            Please enter your details to login.
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
              width: '100%',
              justifyContent: 'flex-start',
              mt: -3, mb: 3
            }}
          >
            <Typography variant='paragraphxs'
              onClick={()=>{
                setOpenModal(false)
                setForgotPassModal(true)
              }}
              sx={{
                color: theme.palette.primary.main,
                '&:hover': {
                  fontWeight: 500
                },
                cursor: 'pointer'
              }}
            >
              Forgot password?
            </Typography>
          </Box>
          <NButton
            textcolor='white'
            bkgcolor={theme.palette.primary.main}
            width='100%'
            onClick={handleSignIn}
          >
            {isLoading ? "Logging you in..." : "Sign in" }
          </NButton>
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
              gap: 1, width: '100%',
              justifyContent: 'center',
              mt: 2
            }}
          >
            <Typography variant='paragraphxs' color={theme.palette.secondary.light}>
              Don't have an account?
            </Typography>
            <Typography variant='labelxs'
              onClick={() => {
                setOpenModal(false)
                setOpenModalReg(true)
              }}
              sx={{
                cursor: 'pointer',
                '&:hover': {
                  color: theme.palette.primary.main
                }
              }}
            >
              Register
            </Typography>
          </Box>
        </Box>
      </MModal>

      <MModal
        onClose={handleModalClose2}
        open={forgotPassModal}
        width={isMobile ? '95%' : '30%'}
        showCloseIcon={false}
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
            <Typography variant='paragraphsm'
              onClick={() => {
                setForgotPassModal(false)
                setOpenModal(true)
              }}
              sx={{
                cursor: 'pointer',
                '&:hover': {
                  color: theme.palette.primary.main
                }
              }}
            >
              Sign in instead
            </Typography>
          </Box>
        </Box>
      </MModal>

      <MModal
        onClose={handleModalClose3}
        open={successForgotPassModal}
        width={isMobile ? '95%' : '30%'}
        showCloseIcon={true}
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
        onClose={handleModalClose4}
        open={enterResetPasswordModal}
        width={isMobile ? '95%' : '30%'}
        showCloseIcon={false}
        onClickOut={false}
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

      <MModal
        onClose={handleModalRegClose}
        open={openModalReg}
        width={isMobile ? '95%' : '30%'}
        showCloseIcon={true}
        onClickOut={true}
      >
        <Box className="flex flex-col justify-center items-center"
          sx={{
            height: 'auto',
            bgcolor: theme.palette.secondary.lightest,
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
              Be an advocate.
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
              setOpenModalReg(false)
              setOpenModal(true)
            }}
              sx={{
                cursor: 'pointer',
                '&:hover': {
                  color: theme.palette.primary.main
                }
              }}
            >
              Login
            </Typography>
          </Box>
         
        </Box>
      </MModal>

      <MModal
        onClose={()=>setOpenAccountVerifyModal(false)}
        open={openAccountVerifyModal}
        width={isMobile ? '95%' : '30%'}
        showCloseIcon={false}
        onClickOut={false}
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
              value={otp2}
              onChange={setOtp2}
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
        width={isMobile ? '95%' : '30%'}
        showCloseIcon={false}
        onClickOut={false}
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
          <Box width={'100%'}>
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

      <MModal
        onClose={() => setSessionErrorModalOpen(false)}
        open={sessionErrorModalOpen}
        width={isMobile ? '95%' : '30%'}
        showCloseIcon={false}
        onClickOut={false}
        height='260px'
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
          <Typography variant='h5' mt={4}>
            Your session has expired
          </Typography>
          <Typography variant='paragraphsm' color={theme.palette.secondary.light} mb={3}
            sx={{textAlign: 'center'}}
          >
            Please log in to continue.
          </Typography>
          
          <Box mt={4} width='100%' display={'flex'} justifyContent={'center'} alignItems={'center'}>
            <NButton
              textcolor='white'
              bkgcolor={theme.palette.primary.main}
              width='70%'
              onClick={() => {
                setSessionError('')
                setSessionErrorModalOpen(false)
                setOpenModal(true)
                signOut({
                  redirect: false
                })
              }}
            >
              Sign in
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
  );
}
