import { Button,Form, FormGroup, Col, Input, Label } from "reactstrap"
import { useContext, useEffect, useState } from "react"
import { JobBoardContext } from "./JobBoardProvider"
import { useHistory } from "react-router"
export const JobForm = () =>{
    const currentChurch = localStorage.getItem("waymaker_church")
    const {FetchChurch, church, PostJob} = useContext(JobBoardContext)
    const [description, setDescription] = useState("")
    const [position, setPosition] = useState("")
    const history = useHistory()
    useEffect(() => {
        FetchChurch(currentChurch)
    },[])
    return(<><h1>Post Job</h1>
        <Form>
            <h4>Church: {church.name}</h4>
            <h5>Email: {church.email}</h5>
            <h5>Phone: {church.phoneNumber}</h5>
            <FormGroup row>
                <Label for="positionTitle" >Position</Label>
                
                <Input type="text" name="positionTitle" id="" placeholder="Position Needed" onChange={(event) =>{
                    setPosition(event.target.value)
                }}/>
                
            </FormGroup>
            <FormGroup row>
                <Label for="positionDescription" >Job Description</Label>
                
                <Input type="textarea" name="positionDescription" id="" placeholder="Position Details" onChange={(event) =>{
                    setDescription(event.target.value)
                }}/>
                
            </FormGroup>
            
            <Button color="primary" onClick={() => {
                const jobObject = {
                    churchId: parseInt(currentChurch),
                    positionTitle: position,
                    description: description
                }
                PostJob(jobObject).then(()=> history.push("/jobpostings"))
            }}>Post Job</Button>
        </Form>
    </>)
}