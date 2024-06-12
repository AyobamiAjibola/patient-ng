import React, { useEffect } from 'react';
import { notification } from 'antd';

interface IProp {
  open: boolean;
  onClose: any;
  message?: string;
  error?: boolean;
  success?: boolean;
}

const Toastify = ({
  open,
  onClose,
  message,
  error = false,
  success = false,
}: IProp) => {

  useEffect(() => {
    if (open) {
      if (error) {
        notification.error({
          message: 'Error',
          description: message,
          placement: 'topRight',
          onClose: onClose,
        });
      } else if (success) {
        notification.success({
          message: 'Success',
          description: message,
          placement: 'topRight',
          onClose: onClose,
        });
      } else {
        notification.info({
          message: 'Info',
          description: message,
          placement: 'topRight',
          onClose: onClose,
        });
      }
    }
  }, [open, message, error, success, onClose]);

  return null;
};

export default Toastify;
