'use client';

import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { Backdrop, IconButton, useTheme } from '@mui/material';
import { Close } from '@mui/icons-material';

const MModal = ({ onClose, open, width, children, props }: any) => {
  const theme = useTheme();

  return (
    <Modal
      open={open}
      onClose={onClose}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: width,
          backgroundColor: '#fff',
          boxShadow: theme.shadows[5],
          p: theme.spacing(2),
          borderRadius: theme.borderRadius.sm,
          ...props,
        }}
      >
        <Box width={'100%'} textAlign={'right'}>
          <IconButton onClick={onClose} aria-label="close">
            <Close
              sx={{
                color: 'red'
              }}
            />
          </IconButton>
        </Box>
        <Box>{children}</Box>
      </Box>
    </Modal>
  );
};
export default MModal;
