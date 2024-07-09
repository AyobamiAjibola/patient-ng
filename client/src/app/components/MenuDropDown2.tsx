import { setIndex } from '@/lib/atoms';
import { Logout, Person } from '@mui/icons-material';
import { Box, Typography, useTheme } from '@mui/material';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useAtom } from 'jotai';
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';

interface IProps {
  anchorEl: any;
  setAnchorEl: any;
  open: boolean;
  handleClick: any
}

export default function MenuDropDown2({ anchorEl, setAnchorEl, open, handleClick }: IProps) {
  const theme = useTheme();
  const router = useRouter();
  const [_, setIndx] = useAtom(setIndex);

  const handleClose = (path: string) => {
    setIndx(-1)
    router.push(path)
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    await signOut({
      redirect: true,
      callbackUrl: `${process.env.NEXT_PUBLIC_CLIENT_URL}/signin`
    });
    router.push(`${process.env.NEXT_PUBLIC_CLIENT_URL}/signin`)
  };

  return (
    <Box>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={() => setAnchorEl(null)}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
        PaperProps={{
          sx: {
            width: 200,
            borderRadius: theme.borderRadius.sm
          }
        }}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <MenuItem onClick={() => handleClose('/account')} className='cursor-pointer'>
          <Box className='flex flex-col'>
            <Box className='flex gap-4 justify-start cursor-pointer'>
              <Person/>
              <Typography 
                sx={{
                  color: theme.palette.secondary.main,
                  fontSize: theme.typography.labelsm.fontSize,
                }}
              >
                Profile
              </Typography>
            </Box>
          </Box>
        </MenuItem>
        <MenuItem onClick={handleLogout} className='cursor-pointer'>
          <Box className='flex flex-col'>
            <Box className='flex gap-4 justify-start cursor-pointer'
              onClick={() => router.push('/')}
            >
              <Logout/>
              <Typography 
                sx={{
                  color: theme.palette.secondary.main,
                  fontSize: theme.typography.labelsm.fontSize
                }}
              >
                Logout
              </Typography>
            </Box>
          </Box>
        </MenuItem>
      </Menu>
    </Box>
  );
}
