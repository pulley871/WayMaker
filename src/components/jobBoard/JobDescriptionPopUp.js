
import React, { useContext, useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { JobBoardContext } from './JobBoardProvider';
import "./JobBoard.css"
const DescirptionPopUp = (props) => {
    const {JsXString} = useContext(JobBoardContext)
  const {
    buttonLabel,
    className,
    job
  } = props;

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  return (
    <div>
      <Button color="primary"  size="sm" onClick={toggle}>{buttonLabel}</Button>
      <Modal isOpen={modal} toggle={toggle} className={className}>
        <ModalHeader toggle={toggle}>{job.church.name}'s Job Post for a {job.positionTitle}</ModalHeader>
        <ModalBody>
            <p className="white-space">{job?.description}</p>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={toggle}>Close</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default DescirptionPopUp;