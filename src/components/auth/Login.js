import React, { useState, useContext, useEffect } from 'react';
import { Alert,Button, Modal, ModalHeader, ModalBody, ModalFooter, Label, Col, Input,Form, FormGroup } from 'reactstrap';
import { AuthContext } from './AuthProvider';
import { useHistory } from 'react-router';
const ModalExample = (props) => {
  const {
    buttonLabel,
    className
  } = props;
  const {users, churches, FetchChurches, FetchUsers} = useContext(AuthContext)
  const [modal, setModal] = useState(false);
  const [userEmail, setUserEmail] = useState("")
  const [error, setError] = useState(false)
  const toggle = () => setModal(!modal);
  const history = useHistory()
  useEffect(() => {
      FetchUsers()
      .then(FetchChurches())
      console.log(users, churches)
  },[])
  useEffect(()=>{
    setError(false)
  },[userEmail])
  const checkUsers = () =>{
      debugger
      const foundUser = users.find((user)=> user.email.toLowerCase() === userEmail.toLowerCase())
      const foundChurch = churches.find((church) => church.email.toLowerCase() === userEmail.toLowerCase())
      if (foundUser) {
          localStorage.setItem("waymaker_user", foundUser.id)
          toggle()
          history.push("/")
      } else if (foundChurch){
            localStorage.setItem("waymaker_church", foundChurch.id)
            toggle()
            history.push("/")
      }else{
            setError(true)
      }
  }
  return (
    <div>
      <Button color="primary" size="lg"onClick={toggle}>{buttonLabel}</Button>
      <Modal isOpen={modal} toggle={toggle} className={className}>
        <ModalHeader toggle={toggle}>Please Login</ModalHeader>
        <ModalBody>
        <FormGroup row>
        <Label for="exampleEmail" sm={2}>Email</Label>
        <Col sm={10}>
          <Input type="email" name="email" id="exampleEmail" placeholder="Enter Your Email" onKeyUp={(event)=>{
              setUserEmail(event.target.value)
          }}/>
        </Col>
        {error ? <Alert color="danger">
        Invalid Email
      </Alert> : ""}
      </FormGroup>
        </ModalBody>
        <ModalFooter>
            <Col >

          <Button color="primary" onClick={()=>{
              checkUsers()
              }}>Login!</Button>{' '}
            </Col>
          
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default ModalExample;