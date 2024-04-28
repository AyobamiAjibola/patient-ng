'use client';
import { useState } from 'react';
import { Button, Modal } from 'antd';

interface IModal {
    onOpen: boolean,
    onClose: React.Dispatch<React.SetStateAction<boolean>>;
}

const PModal = ({onOpen, onClose}: IModal) => {

  const handleOk = () => {
    onClose(false);
  };

  const handleCancel = () => {
    onClose(false);
  };

  return (
    <>
      <Modal title="Basic Modal" open={onOpen} onOk={handleOk} onCancel={handleCancel}>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
    </>
  );
};

export default PModal;