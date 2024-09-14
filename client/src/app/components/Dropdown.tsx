import React from 'react';
import { Select, MenuItem, useTheme, Typography, Box } from '@mui/material';
import DropDownArrow from './svg/DropDownArrow';

interface DropdownFieldProps {
  value?: any;
  onChange?: any;
  label?: string;
  options: any;
  placeholder?: string;
  multiple?: boolean;
}

const DropdownField: React.FC<DropdownFieldProps> = ({
  value,
  onChange,
  label,
  options,
  placeholder,
  multiple = false,
}) => {
  const theme = useTheme();

  return (
    <Box>
      <Box mb={theme.spacing(2)}>
        <Typography variant="labelsm" color={theme.palette.primary.base}>
          {label}
        </Typography>
      </Box>
      <Box
        sx={{
          position: 'relative',
          width: '100%',
          border: `1px solid ${theme.palette.border.main}`,
          borderRadius: theme.borderRadius.sm,
        }}
        className="custom-scrollbar"
      >
        <Select
          multiple={multiple}
          value={value}
          onChange={onChange}
          IconComponent={DropDownArrow}
          sx={{
            '& fieldset': { border: 'none' },
            width: '100%',
            p: 0,
            fontSize: '14px',
            // fontWeight: 400,
            height: '35px',
            backgroundColor: 'transparent',
            color: value ? 'inherit' : theme.palette.primary.base,
            overflow: 'hidden',
            whiteSpace: 'nowrap',
          }}
          MenuProps={{
            PaperProps: {
              sx: {
                mt: theme.spacing(2),
                overflowY: 'auto',
                maxHeight: '150px',
                boxShadow: 'none',
                border: `1px solid ${theme.palette.border.main}`,
                bgcolor: '#fff',
                borderRadius: theme.borderRadius.sm,
                '&::-webkit-scrollbar': {
                  width: '8px',
                  py: 4,
                },
                '&::-webkit-scrollbar-thumb': {
                  backgroundColor: theme.palette.primary.main,
                  borderRadius: theme.borderRadius.sm,
                  py: 4,
                },
                '&::-webkit-scrollbar-track': {
                  backgroundColor: 'transparent',
                  py: 4,
                  borderRadius: '0px 10px 10px 0',
                },
              },
            },
          }}
        >
          {options?.map((option: any) => (
            <MenuItem
              sx={{
                display: 'flex',
                alignItems: 'center',
                overflowY: 'auto',
                gap: theme.spacing(2),
                '&:hover': {
                  backgroundColor: 'transparent',
                },
              }}
              key={option.value}
              value={option.value}
            >
              <Typography variant="labelsm" color={theme.palette.primary.base}>
                {option.label}
              </Typography>
              <Typography
                variant="paragraphsm"
                color={theme.palette.secondary.light}
              >
                {option.quantity}
              </Typography>
            </MenuItem>
          ))}
        </Select>
        {value === '' && (
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: theme.spacing(2),
              bottom: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              pointerEvents: 'none',
              color: theme.palette.primary.base,
            }}
          >
            <Typography
              variant="paragraphsm"
              color={theme.palette.secondary.light}
            >
              {placeholder}
            </Typography>
          </div>
        )}
      </Box>
    </Box>
  );
};

export default DropdownField;
