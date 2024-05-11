'use client'
import { Close } from '@mui/icons-material';
import { Box, Button, Typography, useMediaQuery, useTheme } from '@mui/material';
import React from 'react';
import { useAtom } from 'jotai';
import { selectedImageArrayAtom } from '@/lib/atoms';

interface ImagePreviewSingleProps {
  image?: File;
  label?: string;
  props?: any;
}

const ImagePreviewSingle: React.FC<ImagePreviewSingleProps> = ({
  image,
  label,
  props,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery('(max-width: 900px)');
  const [_, setCampaignImg] = useAtom(selectedImageArrayAtom);

  return (
    <Box sx={{ overflow: 'hidden'}}>
      <Typography color={theme.palette.primary.base}>
        {label}
      </Typography>
      {/* {!image ? (
        <Box
          sx={{
            mb: theme.spacing(3),
            mt: theme.spacing(2),
            backgroundColor: theme.palette.background.secondary,
            height: 164,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: theme.borderRadius.sm,
            ...props,
          }}
          margin={'dense'}
        >
          <Image
            src='/photo.png'
            alt='photo'
            width={40}
            height={40}
          />
        </Box>
      ) : ( */}
        {image instanceof File && (<Box
          sx={{
            mb: theme.spacing(3),
            mt: theme.spacing(2),
            // height: 164,
            // display: 'flex',
            // justifyContent: 'center',
            // alignItems: 'center',
            borderRadius: theme.borderRadius.sm
          }}
        >
          <img
            src={URL.createObjectURL(image)}
            alt="Uploaded"
            style={{
              objectFit: 'cover',
              height: '100%',
              width: '100%',
              aspectRatio: 5/2,
            }}
          />
          <Box
            sx={{
              position: 'absolute',
              mt: '-40px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              width: isMobile ? '90%' : '65%'
            }}
          >
            <Button onClick={() => setCampaignImg([])}
              sx={{
                textTransform: 'none',
                borderRadius: theme.borderRadius.xs,
                backgroundColor: 'white',
                color: 'red',
                width: 'auto',
                border: `1px solid red`,
                px: theme.spacing(3),
                '&:hover': {
                  color: 'white',
                  backgroundColor: 'red'
                }
              }}
            >
              Remove <Close sx={{fontSize: '16px'}}/>
            </Button>
            
          </Box>
          
        </Box>)}
      {/* )} */}
    </Box>
  );
};
export default ImagePreviewSingle;
