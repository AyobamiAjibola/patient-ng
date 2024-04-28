import { Box, Typography, useTheme } from '@mui/material';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

interface IProps {
  anchorEl: any;
  setAnchorEl: any;
  open: boolean;
  handleClick: any
}

export default function MenuDropDown({ anchorEl, setAnchorEl, open, handleClick }: IProps) {
  const theme = useTheme();
  const router = useRouter();
  const handleClose = (path: string) => {
    router.push(path)
    setAnchorEl(null);
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
            width: 336,
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
        <MenuItem onClick={() => handleClose('/')} className='cursor-pointer'>
          <Box className='flex flex-col'>
            <Box className='flex gap-4 justify-start cursor-pointer'
              onClick={() => router.push('/')}
            >
              <Image
                src='/blog.png'
                alt='blog'
                height={18}
                width={25}
              />
              <Typography 
                sx={{
                  color: theme.palette.secondary.main,
                  fontSize: theme.typography.labelbase.fontSize,
                  fontWeight: 500//theme.typography.labelsm.fontWeight,
                }}
              >
                Blog
              </Typography>
            </Box>
            <Box className='flex gap-5 justify-start'>
              <Box sx={{width: 20, height: 20}}/>
              <Typography 
                sx={{
                  color: theme.palette.secondary.light,
                  fontSize: theme.typography.paragraphsm,
                  whiteSpace: 'pre-line'
                }}
              >
                The latest industry news, updates and info.
              </Typography> 
            </Box>
          </Box>
        </MenuItem>
        <MenuItem onClick={() => handleClose('/patient-stories')}>
          <Box className='flex flex-col'>
            <Box className='flex gap-4 justify-start'>
              <Image
                src='/patient.png'
                alt='blog'
                height={18}
                width={25}
              />
              <Typography 
                sx={{
                  color: theme.palette.secondary.main,
                  fontSize: theme.typography.labelbase.fontSize,
                  fontWeight: 500//theme.typography.labelsm.fontWeight,
                }}
              >
                Patient stories
              </Typography>
            </Box>
            <Box className='flex gap-5 justify-start'>
              <Box sx={{width: 20, height: 20}}/>
              <Typography 
                sx={{
                  color: theme.palette.secondary.light,
                  fontSize: theme.typography.paragraphsm,
                  whiteSpace: 'pre-line'
                }}
              >
                The latest industry news, updates and info.
              </Typography> 
            </Box>
          </Box>
        </MenuItem>
        <MenuItem onClick={() => handleClose('/webinar')}>
          <Box className='flex flex-col'>
            <Box className='flex gap-4 justify-start'>
              <Image
                src='/webinar.png'
                alt='blog'
                height={18}
                width={25}
              />
              <Typography 
                sx={{
                  color: theme.palette.secondary.main,
                  fontSize: theme.typography.labelbase.fontSize,
                  fontWeight: 500//theme.typography.labelsm.fontWeight,
                }}
              >
                Webinar
              </Typography>
            </Box>
            <Box className='flex gap-5 justify-start'>
              <Box sx={{width: 20, height: 20}}/>
              <Typography 
                sx={{
                  color: theme.palette.secondary.light,
                  fontSize: theme.typography.paragraphsm,
                  whiteSpace: 'pre-line'
                }}
              >
                The latest industry news, updates and info.
              </Typography> 
            </Box>
          </Box>
        </MenuItem>
        <MenuItem onClick={() => handleClose('/podcast')}>
          <Box className='flex flex-col'>
            <Box className='flex gap-4 justify-start'>
              <Image
                src='/podcast.png'
                alt='blog'
                height={18}
                width={25}
              />
              <Typography 
                sx={{
                  color: theme.palette.secondary.main,
                  fontSize: theme.typography.labelbase.fontSize,
                  fontWeight: 500//theme.typography.labelsm.fontWeight,
                }}
              >
                Podcast
              </Typography>
            </Box>
            <Box className='flex gap-5 justify-start'>
              <Box sx={{width: 20, height: 20}}/>
              <Typography 
                sx={{
                  color: theme.palette.secondary.light,
                  fontSize: theme.typography.paragraphsm,
                  whiteSpace: 'pre-line'
                }}
              >
                The latest industry news, updates and info.
              </Typography> 
            </Box>
          </Box>
        </MenuItem>
        <MenuItem onClick={() => handleClose('award')}>
          <Box className='flex flex-col'>
            <Box className='flex gap-4 justify-start'>
              <Image
                src='/award.png'
                alt='blog'
                height={18}
                width={25}
              />
              <Typography 
                sx={{
                  color: theme.palette.secondary.main,
                  fontSize: theme.typography.labelbase.fontSize,
                  fontWeight: 500//theme.typography.labelsm.fontWeight,
                }}
              >
                Award
              </Typography>
            </Box>
            <Box className='flex gap-5 justify-start'>
              <Box sx={{width: 20, height: 20}}/>
              <Typography 
                sx={{
                  color: theme.palette.secondary.light,
                  fontSize: theme.typography.paragraphsm,
                  whiteSpace: 'pre-line'
                }}
              >
                The latest industry news, updates and info.
              </Typography> 
            </Box>
          </Box>
        </MenuItem>
      </Menu>
    </Box>
  );
}
