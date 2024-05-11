'use client';
import React from 'react';
import { Snackbar, SnackbarContent, useTheme } from '@mui/material';

interface IProp {
  open: boolean;
  onClose: any;
  message?: string;
  error?: boolean;
  success?: boolean;
}

const ToastifySnack = ({
  open,
  onClose,
  message,
  error = false,
  success = false,
}: IProp) => {
  const theme = useTheme();

  return (
    <Snackbar
      open={open}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      autoHideDuration={4000}
      onClose={onClose}
    >
      <SnackbarContent
        style={{
          backgroundColor: '#fff',
          borderRadius: theme.borderRadius.sm,
          color: error ? 'red' : success ? theme.palette.primary.main : '',
          fontSize: 12,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
        message={message}
      />
    </Snackbar>
  );
};

export const Toastify = ({
  open,
  onClose,
  message,
  error = false,
  success = false,
}: IProp) => {
  const theme = useTheme();

  return (
    <Snackbar
      open={open}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      autoHideDuration={4000}
      onClose={onClose}
    >
      <SnackbarContent
        style={{
          backgroundColor: '#fff',
          borderRadius: theme.borderRadius.sm,
          color: error ? theme.palette.primary.main : success ? '#004c00' : '',
          fontSize: 12,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
        message={message}
      />
    </Snackbar>
  );
};
export default ToastifySnack;
