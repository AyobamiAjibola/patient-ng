import { useMediaQuery, useTheme, Typography } from '@mui/material';
import dynamic from 'next/dynamic';
import React, { useState, useEffect, useRef } from 'react';
// const Jodit = dynamic(() => import('jodit-react'), { ssr: false });

const HtmlToText = ({ htmlString, mx }: any) => {
  const theme = useTheme();
  const isMobile = useMediaQuery('(max-width: 900px)');
  
  return (
    <Typography
        sx={{
          mx: mx,
          color: theme.palette.secondary.light,
          fontSize: theme.typography.labelsm.fontSize,
          whiteSpace: isMobile ? 'pre-wrap' : 'none',
        }}
    >{htmlString}</Typography>)
};

export const HtmlToText2 = ({ htmlString, mx, my }: any) => {
  const theme = useTheme();

  return (
    <Typography
      sx={{
        mx: mx,
        color: theme.palette.secondary.light,
        fontSize: theme.typography.labelsm.fontSize,
        whiteSpace: 'pre-wrap',
        my: my
      }}
    > {htmlString}</Typography>)
};

export default HtmlToText;
