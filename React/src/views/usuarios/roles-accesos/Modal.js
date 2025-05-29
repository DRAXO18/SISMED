/* eslint-disable prettier/prettier */
import React from 'react';
import { 
  CModal, 
  CModalBody, 
  CModalHeader, 
  CModalTitle,
  CButton
} from '@coreui/react';

const Modal = ({ show, onClose, title, children }) => {
  return (
    <CModal 
      visible={show} 
      onClose={onClose}
      backdrop="static"
      keyboard={false}
    >
      <CModalHeader>
        <CModalTitle>{title}</CModalTitle>
        <CButton
          type="button"
          className="btn-close"
          aria-label="Close"
          onClick={onClose}
        />
      </CModalHeader>
      <CModalBody>
        {children}
      </CModalBody>
    </CModal>
  );
};

export default Modal;