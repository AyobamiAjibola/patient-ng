'use client';

import { InputAdornment, TextField, Typography, useTheme } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

interface InputFieldProps {
    type?: string;
    placeholder?: string;
    startAdornment?: React.ReactElement;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    value?: string;
    helperText?: string;
    register?: UseFormRegisterReturn;
    accept?: string;
    error?: boolean;
    errorMessage?: string;
    onFileChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    label?: string;
    disabled?: boolean;
    endAdornment?: React.ReactElement;
    readOnly?: boolean;
    labelStyle?: any;
    multiline?: boolean;
    isBorder?: boolean;
    rows?: number;
    showBorder?: boolean;
    bgcolor?: boolean;
}

const InputField: React.FC<InputFieldProps> = ({
    type,
    placeholder,
    startAdornment,
    register,
    onChange,
    value,
    accept,
    error,
    errorMessage,
    onFileChange,
    label,
    disabled,
    endAdornment,
    labelStyle,
    multiline = false,
    isBorder = false,
    rows = 0,
    showBorder = true,
    bgcolor = true,
    ...rest
  }) => {
    const theme = useTheme();
    const inputPlaceholder = error ? errorMessage : placeholder;
    const [errorMsg, setErrorMsg] = useState<string>('');

    useEffect(() => {
      let intervalId: NodeJS.Timeout;
      if(errorMsg) {
        intervalId = setTimeout(() => {
          setErrorMsg('')
        },4000)
      }
      
      return () => {
        clearInterval(intervalId)
      }
    },[errorMsg]);

    useEffect(() => {
      if(error) {
        setErrorMsg(errorMessage as string)
      }
    },[error])

    return (
      <label>
        {label && (
          <Typography
            // variant="labelsm"
            color={theme.palette.primary.base}
            sx={labelStyle}
          >
            {label}
          </Typography>
        )}
        <TextField
          type={type}
          value={value}
          fullWidth
          variant="standard"
          placeholder={inputPlaceholder}
          margin="dense"
          disabled={disabled}
          multiline={multiline}
          rows={rows}
          InputProps={{
            style: {
              fontSize: '14px',
              fontWeight: 400,
              borderRadius: isBorder ? theme.borderRadius.sm : theme.borderRadius.none,
              color: error
                ? theme.palette.primary.main
                : theme.palette.primary.base,
              minHeight: '40px',
              paddingLeft: theme.spacing(2),
              paddingRight: theme.spacing(2),
              border: showBorder ? `1px solid ${
                error 
                  ? theme.palette.state.error 
                  : theme.palette.border.main
              }` : 'none',
              backgroundColor: bgcolor ? 'white' : 'transparent'
            },
            autoComplete: 'off',
            onChange: onChange,
            disableUnderline: true,
            startAdornment: startAdornment && (
              <InputAdornment position="start">
                {React.cloneElement(startAdornment, {
                  width: theme.iconSize.md,
                  color: theme.palette.primary.main,
                })}
              </InputAdornment>
            ),
            endAdornment: endAdornment && (
              <InputAdornment position="end" sx={{ width: 100 }}>
                {React.cloneElement(endAdornment)}
              </InputAdornment>
            ),
          }}
          sx={{
            mb: label ? theme.spacing(3) : theme.spacing(1),
          }}
          {...register}
          {...rest}
        />
        {errorMsg && (
          <Typography
            color={'red'}
            sx={{
              fontSize: '12px',
              mt: -3
            }}
          >
            {errorMsg}
          </Typography>
        )}
      </label>
    );
};

export default InputField;