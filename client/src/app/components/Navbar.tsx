'use client';
import React, { useState } from 'react';
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
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Container from './Container';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import PButton from './PButton';
import PModal from './Modal';
import MenuDropDown from './MenuDropDown';

interface PagesProps {
  id?: number;
  href: string;
  name: string;
}

const pages: PagesProps[] = [
  {
    id: 1,
    name: 'Advocacy',
    href: '/',
  },
  {
    id: 2,
    name: 'Crowdfunding',
    href: '/crowdfunding',
  },
  {
    id: 3,
    name: 'Insight',
    href: '/boarding',
  },
  {
    id: 3,
    name: 'Resources',
    href: '',
  },
];

interface NavbarProps {
  showSearchBar?: boolean;
}
export default function Navbar({ showSearchBar = false }: NavbarProps) {
  const theme = useTheme();
  const router = useRouter();
  const [toggle, setToggle] = useState(false);
  const isMobile = useMediaQuery('(max-width: 959px)');
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [indx, setIndx] = useState(-1);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>, idx: number) => {
    setIndx(idx)
    setAnchorEl(event.currentTarget);
  };

  const handleClick2 = (event: React.MouseEvent<HTMLButtonElement>, idx: number) => {
    setIndx(idx)
  };

  const onToggle = () => setToggle(!toggle);

  return (
    <Box sx={{ backgroundColor: theme.palette.background.white, borderBottom: '2px solid #F3F3F3' }}>
      <Container>
        <Toolbar
          style={{
            display: 'flex',
            justifyContent: isMobile ? 'center' : 'space-between',
            alignItems: 'center',
            width: '100%',
            minHeight: 80,
            margin: 'auto',
            position: 'relative',
            gap: !isMobile ? '' : '50px'
          }}
        >
          <Box className='flex flex-row items-center gap-4'>
            <Link href="/">
              <Image
                src='/logo.png'
                alt='logo'
                height={40}
                width={40}
              />
            </Link>
            <Typography
              fontFamily={theme.fonts}
              sx={{
                fontSize: theme.typography.h5.fontSize,
                fontWeight: theme.typography.h5.fontWeight,
                color: theme.palette.primary.darker
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
                <MenuIcon sx={{ fontSize: 20 }} />
              )}
            </IconButton>
          ) : null}
          {/* Desktop navigation links */}
          {isMobile ? null : (
            <ul style={{ display: 'flex', gap: theme.spacing(4) }}>
              {pages.map((item, index) => (
                <li key={index}>
                  <Link href={item.href} className='flex flex-row items-center' 
                    onClick={(e: any) => {item.name === 'Resources' ? handleClick(e, index) : handleClick2(e, index)}}
                  >
                    <Typography
                      fontFamily={theme.fonts}
                      color={index === indx ? theme.palette.primary.main : theme.palette.secondary.main}
                      fontWeight={theme.typography.labelxl.fontWeight}
                      sx={{
                        '&:hover': { color: theme.palette.primary.main }
                      }}
                    >
                      {item.name}
                    </Typography>
                    {item.name === "Resources" && (<ExpandMoreIcon/>)}
                  </Link>
                </li>
              ))}
            </ul>
          )}

          {!isMobile && (<Box className='flex flex-row gap-1 items-center'>
            <PButton bg={false} transBg={true}>
              Sign Up
            </PButton>
            <PButton bg={true} width='100px' transBg={false}>
              {'Log In'}
            </PButton>
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
                  <Link href={item.href}>
                    <Typography sx={{fontSize: 20}} color={theme.palette.primary.main}>
                      {item.name}
                    </Typography>
                  </Link>
                </li>
              ))}
            </ul>

            <Box className='flex flex-row gap-1 items-center' sx={{mt: '80px'}}>
              <PButton bg={false} transBg={true}>
                Sign Up
              </PButton>
              <PButton bg={true} width='100px' transBg={false}>
                {'Log In'}
              </PButton>
            </Box>
          </List>
        </Drawer>
      </Container>

      {/* <PModal
        onOpen={open}
        onClose={setOpen}
      /> */}
      <MenuDropDown
        anchorEl={anchorEl}
        setAnchorEl={setAnchorEl}
        open={open}
        handleClick={handleClick}
      />
    </Box>
  );
}
