import { useMediaQuery, useTheme, Typography } from '@mui/material';
import React, { useState, useEffect } from 'react';

const HtmlToText = ({ htmlString, mx }: any) => {
  const [textContent, setTextContent] = useState('');
  const theme = useTheme();
  const isMobile = useMediaQuery('(max-width: 900px)');

  useEffect(() => {
    const tempElement = document.createElement('div');
    tempElement.innerHTML = htmlString;
    setTextContent(tempElement.textContent || tempElement.innerText || '');
  }, [htmlString]);

  return (
    <Typography
        sx={{
          mx: mx,
          color: theme.palette.secondary.light,
          fontSize: theme.typography.labelsm.fontSize,
          whiteSpace: isMobile ? 'pre-wrap' : 'none',
        }}
    >{textContent}</Typography>)
};

export default HtmlToText;
