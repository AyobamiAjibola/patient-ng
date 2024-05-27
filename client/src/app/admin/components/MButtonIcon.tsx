import React, { PropsWithChildren } from 'react';
import IconButton from '@mui/material/IconButton';
import { IconButtonProps } from '@mui/material/IconButton';

interface MIconButtonProps extends IconButtonProps {
  testId?: string;
}

const MButtonIcon: React.FC<PropsWithChildren<MIconButtonProps>> = (props) => {
  return <IconButton {...props}>{props.children}</IconButton>;
};

export default MButtonIcon;
