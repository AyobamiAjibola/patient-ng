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
  showButton?: boolean;
}

const ImagePreviewSingle: React.FC<ImagePreviewSingleProps> = ({
  image,
  label,
  showButton = true,
  props
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery('(max-width: 900px)');
  const [_, setCampaignImg] = useAtom(selectedImageArrayAtom);

  return (
    <Box sx={{ overflow: 'hidden'}}>
      <Typography color={theme.palette.primary.base}>
        {label}
      </Typography>
        {image instanceof File && (<Box
          sx={{
            // height: 164,
            // display: 'flex',
            // justifyContent: 'center',
            // alignItems: 'center',
            borderRadius: theme.borderRadius.sm,
            position: 'relative'
          }}
        >
          <img
            src={URL.createObjectURL(image)}
            alt="Uploaded"
            style={{
              objectFit: 'fill',
              height: '100%',
              width: '100%',
            }}
          />
          <Box
            sx={{
              position: 'absolute',
              top: 16,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              width: '100%'
            }}
          >
            {showButton && (<Button onClick={() => setCampaignImg([])}
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
            </Button>)}
            
          </Box>
          
        </Box>)}
      {/* )} */}
    </Box>
  );
};
export default ImagePreviewSingle;
