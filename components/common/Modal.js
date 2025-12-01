import React from 'react';
import { Modal as NextUIModal, Button } from '@nextui-org/react';

const Modal = ({ isOpen, onClose, title, children }) => {
  return (
    <NextUIModal open={isOpen} onClose={onClose}>
      <NextUIModal.Header>
        <h2>{title}</h2>
      </NextUIModal.Header>
      <NextUIModal.Body>
        {children}
      </NextUIModal.Body>
      <NextUIModal.Footer>
        <Button auto flat color="error" onClick={onClose}>
          Close
        </Button>
      </NextUIModal.Footer>
    </NextUIModal>
  );
};

export default Modal;