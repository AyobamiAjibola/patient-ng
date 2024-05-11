'use client';
import { Button, ButtonProps, useTheme } from '@mui/material';

interface PButtonProps extends ButtonProps {
  testId?: string;
  bg: boolean;
  width?: string;
  transBg: boolean;
}

const PButton: React.FC<React.PropsWithChildren<PButtonProps>> = (props) => {
  const theme = useTheme();
  
  return (
    <Button
      sx={{
        textTransform: 'none',
        borderRadius: theme.borderRadius.sm,
        backgroundColor: props.bg ? theme.palette.background.main : '',
        color: props.transBg ? theme.palette.primary.main : 'white',
        width: props.width,
        border: `1px solid ${theme.palette.primary.main}`,
        '&:hover': {
          color: theme.palette.primary.main,
          border: `1px solid ${theme.palette.primary.main}`,
        },
        px: theme.spacing(3),
      }}
      {...props}
    >
      {props.children}
    </Button>
  );
};

export const PButton2: React.FC<React.PropsWithChildren<PButtonProps>> = (props) => {
  const theme = useTheme();
  
  return (
    <Button
      sx={{
        textTransform: 'none',
        borderRadius: theme.borderRadius.xs,
        backgroundColor: props.bg ? theme.palette.background.main : '',
        color: props.transBg ? theme.palette.secondary.main : 'white',
        width: props.width,
        border: `1px solid ${theme.palette.border.main}`,
        '&:hover': {
          color: theme.palette.primary.main,
          border: `1px solid ${theme.palette.primary.main}`,
        },
        px: theme.spacing(3),
      }}
      {...props}
    >
      {props.children}
    </Button>
  );
};

export default PButton;