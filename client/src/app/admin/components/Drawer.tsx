'use client';
import { styled, useTheme, Theme, CSSObject } from '@mui/material/styles';
import { Avatar, Box, IconButton, Typography, useMediaQuery } from '@mui/material/';
import MuiDrawer from '@mui/material/Drawer';
import Link from 'next/link';
import { signOut } from 'next-auth/react';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { KeyboardDoubleArrowLeft, KeyboardDoubleArrowRight, LogoutOutlined } from '@mui/icons-material';
import items from './AdminDrawerItems';
import MButtonIcon from './MButtonIcon';
import { createElement, useEffect, useState } from 'react';
import { useAtom } from 'jotai';
import { setDrawerOpen } from '@/lib/atoms';

const openedMixin = (theme: Theme): CSSObject => ({
  width: theme.drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
  backgroundColor: theme.palette.background.default,
  border: 'none',
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  border: 'none',
  width: `calc(${theme.spacing(5)} )`,

  [theme.breakpoints.up('sm')]: {
    width: '70px',
    backgroundColor: '#fff',
  },

  [theme.breakpoints.down('sm')]: {
    width: '60px',
    backgroundColor: '#fff',
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-Start',
  padding: theme.spacing(0, 1),
  backgroundColor: 'white',
  ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  width: theme.drawerWidth,
  borderRight: `1px solid red`,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  zIndex: 10,
  boxSizing: 'border-box',
  ...(open && {
    ...openedMixin(theme),
    '& .MuiDrawer-paper': {
      ...openedMixin(theme),
      overflowY: 'auto',
      borderRight: `1px solid ${theme.palette.background.secondary}`,
      '&::-webkit-scrollbar': {
        width: '7px',
      },
      '&::-webkit-scrollbar-thumb': {
        backgroundColor: theme.palette.primary.main,
      },
      '&::-webkit-scrollbar-track': {
        backgroundColor: theme.palette.border.main,
      },
    },
  }),
  ...(!open && {
    ...closedMixin(theme),
    '& .MuiDrawer-paper': {
      ...closedMixin(theme),
      overflowY: 'auto',
      borderRight: `1px solid ${theme.palette.background.secondary}`,
      '&::-webkit-scrollbar': {
        width: '7px',
      },
      '&::-webkit-scrollbar-thumb': {
        backgroundColor: theme.palette.primary.main,
      },
      '&::-webkit-scrollbar-track': {
        backgroundColor: theme.palette.border.main,
      },
    },
  }),
}));

const DrawerComponent = ({ open, drawerClose }: any) => {
  const theme = useTheme();
  const [activeLink, setActiveLink] = useState('');
  const [isDrawerClosed, setIsDrawerClosed] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const isMobile = useMediaQuery('(max-width: 900px)');
  const [_, setOpen] = useAtom(setDrawerOpen);

  const handleLogout = async () => {
    await signOut();
    router.push(`/`);
    // router.push(`${process.env.NEXT_PUBLIC_CLIENT_URL}/signin`);
  };

  useEffect(() => {
    setIsDrawerClosed(!open);
  }, [open]);

  useEffect(() => {
    if(isMobile) {
      setIsDrawerClosed(true);
      setOpen(false)
    }
  }, [isMobile]);

  useEffect(() => {
    if(pathname) {
      if(pathname === '/admin') {
        setActiveLink('/admin/dashboard')
      } else {
        setActiveLink(pathname)
      }
    }
  },[]);

  return (
    <Drawer variant="permanent" open={open}>
      <DrawerHeader onClick={() => router.push('/')}
        sx={{
          minHeight: 56,
          position: 'fixed',
          px: theme.spacing(2),
          zIndex: 20,
          width: isDrawerClosed ? 50 : theme.drawerWidth,
          backgroundColor: '#fff',
          borderBottom: `1px solid ${theme.palette.background.secondary}`,
          top: 0,
          left: 0,
          gap: 2,
          pl: 4,
          cursor: 'pointer'
        }}
      >
        <Image
          src={'/logo.png'}
          alt="Logo"
          width={30}
          height={30}
        />
        {!isDrawerClosed && (<Typography variant='labellg'
            sx={{
                color: theme.palette.primary.darker
            }}
        >
            Patient.ng
        </Typography>)}
      </DrawerHeader>

      <Box
        sx={{
          px: theme.spacing(3),
          mt: theme.spacing(6),
          width: '100%',
          position: 'relative',
        }}
      >
        {Object.entries(items).map(([category, items]) => (
          <Box key={category}>
            <Box marginTop={theme.spacing(2)} mb={theme.spacing(2)}>
              <Typography
                variant="labelxxs"
                color={theme.palette.secondary.dark}
                textAlign={'left'}
              >
                {category === 'RESOURCES' && isDrawerClosed ? 'RESOU...' : category}
              </Typography>
            </Box>
            <ul
              style={{
                listStyleType: 'none',
                textDecoration: 'none',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: isDrawerClosed ? 'center' : 'start',
              }}
            >
              {items.map(({ link, title, iconName }) => (
                <li
                  key={title}
                  style={{
                    width: '100%',
                    marginBottom: theme.spacing(2),
                    textAlign: isDrawerClosed ? 'center' : 'left',
                  }}
                >
                  <Link href={link}>
                    <Box
                      onClick={() => setActiveLink(link)}
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        p: theme.spacing(2),
                        pr: isDrawerClosed
                          ? theme.spacing(4)
                          : theme.spacing(3),
                        pl: isDrawerClosed ? 2 : theme.spacing(3),
                        mr: isDrawerClosed ? 2 : 0,
                        borderRadius: theme.borderRadius.sm,
                        '&:hover': {
                            bgcolor: theme.palette.primary.lightest
                        },
                      }}
                    >
                      <Box
                        display={'flex'}
                        alignItems={'center'}
                        gap={theme.spacing(2)}
                        width={'100%'}
                      >
                        <Box
                          height={'20px'}
                          display={'flex'}
                          alignItems={'center'}
                          justifyContent={'center'}
                        >
                          {createElement(iconName, {
                            style: {
                                fontSize: '14px',
                                color: activeLink.includes(link)
                                    ? theme.palette.primary.main
                                    : theme.palette.secondary.light
                            }
                          })}
                        </Box>
                        <Typography
                          variant={link === activeLink ? "labelxs" : "paragraphxs"}
                          sx={{
                            display: isDrawerClosed ? 'none' : 'initial',
                            color:
                            activeLink.includes(link)
                              ? theme.palette.primary.main
                              : theme.palette.primary.darker
                          }}
                        >
                          {title}
                        </Typography>
                      </Box>
                    </Box>
                  </Link>
                </li>
              ))}
            </ul>
          </Box>
        ))}
        <Box
          sx={{
            my: theme.spacing(2),
            borderBottom: `1px solid ${theme.palette.background.secondary}`,
            textAlign: isDrawerClosed ? 'left' : 'right',
          }}
        >
          <MButtonIcon onClick={drawerClose}>
            {isDrawerClosed ? (
              <KeyboardDoubleArrowRight
                sx={{
                    color: theme.palette.primary.main,
                    fontSize: theme.iconSize.sm
                }}
              />
            ) : (
              <KeyboardDoubleArrowLeft
                sx={{
                  color: theme.palette.primary.main,
                  fontSize: theme.iconSize.sm
                }}
              />
            )}
          </MButtonIcon>
        </Box>

        <Box
          sx={{
            '&:hover': {
              bgcolor: 'white',
            },
            display: 'flex',
            gap: theme.spacing(1),
            alignItems: 'center',
            justifyContent: 'start',
            width: '100%',
            ml: isDrawerClosed ? '-2px' : '8px',
            mb: theme.spacing(4),
            borderRadius: theme.borderRadius.sm,
          }}
        >
          {!isDrawerClosed && (<Box
            sx={{
              display: 'flex',
              gap: 2
            }}
          >
            <Avatar
              src='/model.png'
              alt='profile image'
              sx={{
                width: 30,
                height: 30
              }}
            />
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                justifyContent: 'flex-start'
              }}
            >
              <Typography variant='labelxxs' color={'black'}>
                Brian Ford
              </Typography>
              <Typography variant='paragraphxxs' color={theme.palette.secondary.light}
                sx={{
                  textTransform: 'none'
                }}
              >
                ford@gmail.com
              </Typography>
            </Box>
          </Box>)}
          <IconButton onClick={handleLogout}>
            <LogoutOutlined
              sx={{
                fontSize: theme.iconSize.lg,
                color: 'red'
              }}
            />
          </IconButton>
        </Box>
      </Box>
    </Drawer>
  );
};

export default DrawerComponent;
