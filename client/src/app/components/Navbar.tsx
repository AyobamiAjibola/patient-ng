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
} from '@mui/material';
import Link from 'next/link';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { useMediaQuery } from '@mui/material';
import { useRouter, usePathname } from 'next/navigation';
import Image from 'next/image';
import Container from './Container';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { NButton } from './PButton';
import MenuDropDown from './MenuDropDown';
import { useAtom } from 'jotai';
import { sessionErrorModal, sessionErrorMsg, setIndex } from '@/lib/atoms';
import { KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material';
import MenuDropDown2 from './MenuDropDown2';
import MModal from './Modal';
import { signOut, useSession } from 'next-auth/react';
import { useFetchSingleUser, useSiteVisit } from '../admin/hooks/userHook/useUser';
import capitalize from 'capitalize';
import useUpdate from '../hooks/useUpdate';

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
    name: 'Patient Feedback',
    link: '/patient-feedback',
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
  const [showResources, setShowResources] = useState(false);
  const { data: session } = useSession();
  const [sessionError, setSessionError] = useAtom(sessionErrorMsg)
  const [sessionErrorModalOpen, setSessionErrorModalOpen] = useAtom(sessionErrorModal);
  const getUserMutation = useFetchSingleUser();
  const [image, setImage] = useState<string>('');
  const siteVisitMutation = useSiteVisit();

  const fetchSingleUser = async (id: any) => {
    await getUserMutation.mutateAsync(id, {
      onSuccess: (response: any) => {
        setImage(response.result.image)
      }
    })
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

  const onToggle = () => setToggle(!toggle);

  useEffect(() => {
    fetchSingleUser(session?.user.userId)
  },[session]);

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
    } else if (pathname.includes('/patient-feedback')) {
      setIndx(2)
    } else if(pathname === '/') {
      setIndx(-1)
    }
  },[pathname]);

  useEffect(() => {
    if(sessionError !== '') {
      setSessionErrorModalOpen(true)
    }
  },[sessionError]);

  useUpdate(() => {
    const logVisit = async () => {
      const lastVisit: any = localStorage.getItem('lastVisit');
      const now: any = new Date().getTime();

      const threshold = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

      if (!lastVisit || now - lastVisit > threshold) {
        try {
          await siteVisitMutation.mutateAsync({});
          localStorage.setItem('lastVisit', now);
        } catch (error) {
          console.error('Failed to log visit:', error);
        }
      }
    };

    logVisit();
  }, []);

  return (
    <Box 
      sx={{ 
        backgroundImage: pathname === '/' ? 'url(/home-img.jpg)' : 'none',
        backgroundColor: pathname === '/' ? 'transparent' : theme.palette.background.white, 
        borderBottom: pathname === '/' ? 'none' : '2px solid #F3F3F3',
        position: 'fixed', width: '100%', zIndex: 1,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
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
              height={isMobile ? 30 : 50}
              width={isMobile ? 30 : 50}
            />
            {isMobile && (<Typography variant={isMobile ? 'h6' : 'h5'}
              fontFamily={theme.fonts}
              sx={{
                color: pathname === '/' ? 'black' : theme.palette.primary.darker
              }}
            >
              Patient.ng
            </Typography>)}
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
                <MenuIcon sx={{ fontSize: 20, color: pathname === '/' ? 'black' : 'black' }} />
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
                                ? 'black'
                                : theme.palette.secondary.main
                            }
                      fontWeight={theme.typography.labelxl.fontWeight}
                      sx={{
                        '&:hover': { color: theme.palette.primary.main }
                      }}
                    >
                      {item.name}
                    </Typography>
                    {item.name === "Resources" && (<ExpandMoreIcon sx={{color: pathname === '/' ? 'black' : theme.palette.secondary.main}}/>)}
                  </Link>
                </li>
              ))}
            </ul>
          )}

          {!isMobile && !session?.user && (<Box className='flex flex-row gap-1 items-center'>
              <NButton 
                bkgcolor={theme.palette.primary.main}
                textcolor='white'
                width='100px'
                onClick={()=>router.push('/signin')}
              >
                Login
              </NButton>
              <NButton 
                bkgcolor='transparent'
                textcolor={theme.palette.primary.main}
                bordercolor={theme.palette.primary.main}
                onClick={()=>router.push('/signup')}
                hoverbordercolor={theme.palette.primary.main}
              >
                Sign Up
              </NButton>
                
              </Box>
          )}
          {!isMobile && session?.user && (<Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              cursor: 'pointer'
            }}
          >
            <img
              src={image
                    ? image.includes('uploads/photo')
                      ? `${process.env.NEXT_PUBLIC_SERVER_URL}/${image}` 
                      : image
                    : '/person.png'}
              alt='profile image'
              style={{
                width: '40px',
                height: '40px',
                marginRight: 12,
                borderRadius: '50%'
              }}
              crossOrigin='anonymous'
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
                  color: pathname === '/' ? 'black' : 'black'
                }}
              >
                {capitalize.words(session?.user?.fullName)}
              </Typography>
              <Typography
                sx={{
                  fontSize: theme.typography.labelxs.fontSize,
                  color: pathname === '/' ? 'black' : theme.palette.secondary.light, 
                  mt: -1
                }}
              >
                {session?.user?.email}
              </Typography>
            </Box>

            <IconButton onClick={(e: any) => handleClick2(e)}>
              {open2 ? <KeyboardArrowUp sx={{color: 'black'}}/> : <KeyboardArrowDown sx={{color: pathname === '/' ? 'black' : 'black'}}/>}
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
                  width: '50%',
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

            {!session?.user
              ? (<Box className='flex flex-row gap-1 items-center' sx={{mt: '80px'}}>
                  <NButton 
                    bkgcolor={theme.palette.primary.main}
                    textcolor='white'
                    width='100px'
                    onClick={()=>router.push('/signin')}
                  >
                    Login
                  </NButton>
                  <NButton 
                    bkgcolor='transparent'
                    textcolor={theme.palette.primary.main}
                    bordercolor={theme.palette.primary.main}
                    onClick={()=>router.push('/signup')}
                    hoverbordercolor={theme.palette.primary.main}
                  >
                    Sign Up
                  </NButton>
                </Box>
              ) : (
              <Box
                sx={{
                  display: 'flex',
                  gap: 2,
                  alignItems: 'center', mt: 6
                }}
              >
                <img
                  src={image
                        ? image.includes('uploads/photo')
                          ? `${process.env.NEXT_PUBLIC_SERVER_URL}/${image}` 
                          : image
                        : '/person.png'}
                  alt='profile image'
                  style={{
                    width: '30px',
                    height: '30px',
                    borderRadius: '50%'
                  }}
                  crossOrigin='anonymous'
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
                    {capitalize.words(session?.user?.fullName)}
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: theme.typography.labelxs.fontSize,
                      color: theme.palette.secondary.light
                    }}
                  >
                    {session?.user?.email}
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
        onClose={() => setSessionErrorModalOpen(false)}
        open={sessionErrorModalOpen}
        width={isMobile ? '95%' : '40%'}
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
                signOut({
                  redirect: true,
                  callbackUrl: `${process.env.NEXT_PUBLIC_CLIENT_URL}/signin`
                })
              }}
            >
              Sign in
            </NButton>
          </Box>
        </Box>
      </MModal>
    </Box>
  );
}
