import React from 'react';
import { 
  Button, 
  Modal, 
  ModalHeader,
  ModalBody, 
  ModalFooter } from 'reactstrap';

const ReportStatusModal = props => {
    return (
      <Modal isOpen={props.showModal}>
        <ModalHeader>Report Status</ModalHeader>
        <ModalBody>
          {props.message}
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={props.cancelModal}>Cancel</Button>
        </ModalFooter>
      </Modal>  
    );
}

export default ReportStatusModal;