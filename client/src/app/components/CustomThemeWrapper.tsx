'use client';
import React from 'react';
import { ThemeProvider } from '@mui/material';
import ipatientTheme from '@/themes/CustomThemes';

interface ThemeProviderWrapperProps {
  children: React.ReactNode;
}

const CustomThemeWrapper: React.FC<ThemeProviderWrapperProps> = ({
  children,
}) => {
  return <ThemeProvider theme={ipatientTheme}>{children}</ThemeProvider>;
};

export default CustomThemeWrapper;
