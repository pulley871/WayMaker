import { useHistory, useParams } from "react-router"
import {useState, useEffect, useContext} from "react"
import { JobBoardContext } from "./JobBoardProvider"
import { AuthContext } from "../auth/AuthProvider"
import { Button, Form, FormGroup, Input, Label } from "reactstrap"

export const JobApplicationForm = () =>{
    const {jobId} = useParams()
    const {FetchJob, PostApplication} = useContext(JobBoardContext)
    const {FetchCurrentUser} = useContext(AuthContext)
    const [job, setJob] = useState({})
    const [user, setUser] = useState({})
    const [userDescription, setDescription] = useState("")
    const history = useHistory()
    useEffect(() =>{
        FetchJob(parseInt(jobId)).then((data)=> setJob(data))
        
    },[])
    useEffect(() => {
        FetchCurrentUser(parseInt(localStorage.getItem("waymaker_user"))).then((data)=> setUser(data))
        
    }, [job])
    return (<><h1>Apply Now!</h1>
                <h5>Church Name: {job.church?.name}</h5>
                <h5>Church Contact: {job.church?.email}</h5>
                <h5>Church Address: {job.church?.address} || Zip: {job.church?.zip}</h5>
                <h5>Position: {job.positionTitle}</h5>
                <h5>Description: {job.description}</h5>

                <Form>
                    <FormGroup>
                        <Label for="userName">Your Name</Label>
                        <Input type="text" name="username" value={user.name}></Input>
                    </FormGroup>
                    <FormGroup>
                        <Label for="usercontact">Your Contact Information</Label>
                        <Input type="text" name="usercontact" value={user.email}></Input>
                    </FormGroup>
                    <FormGroup>
                        <Label for="useraddress">Your Address</Label>
                        <Input type="text" name="useraddress" value={user.address}></Input>
                    </FormGroup>
                    <FormGroup>
                        <Label for="userInstrument">Your Instrument</Label>
                        <Input type="text" name="userInstrument" value={user.instrument}></Input>
                    </FormGroup>
                    
                    <FormGroup>
                        <Label for="description">Why you want this Job</Label>
                        <Input type="textarea" name="description" onKeyUp={(event)=> setDescription(event.target.value)}></Input>
                    </FormGroup>
                </Form>
                <Button onClick={()=>{
                    const appObject = {
                        jobPostingId: job.id,
                        userId: user.id,
                        description: userDescription
                    }
                    PostApplication(appObject)
                    .then(()=> history.push("/jobpostings"))
                }}>Apply</Button>
    </>)
}