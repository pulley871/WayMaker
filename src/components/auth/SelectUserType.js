import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { useHistory } from 'react-router';
const SelectUserType = (props) => {
  const {
    buttonLabel,
    className
  } = props;
  const history = useHistory()
  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  return (
    <div>
      <Button color="primary" size="lg"onClick={toggle}>{buttonLabel}</Button>
      <Modal isOpen={modal} toggle={toggle} className={className}>
        
        <ModalBody>
            <h1>Are You A Church or Musician?</h1>
            <p>Please Select One</p>
            <br></br>
            <Button color="primary" onClick={()=>{
                toggle()
                history.push("/registerchurch")
                }}>Church</Button>{' '}
            <Button color="primary" onClick={()=>{
                toggle()
                history.push("/registeruser")
                }}>Musician</Button>{' '}
        </ModalBody>
        
      </Modal>
    </div>
  );
}

export default SelectUserType;