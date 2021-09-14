import { useContext, useEffect, useState } from "react"
import { useHistory, useParams } from "react-router"
import { Form, FormGroup, Label, Input, Button } from "reactstrap"
import { JobBoardContext } from "./JobBoardProvider"


export const EditJobPosting = () => {
    const {jobId} = useParams()
    const {FetchJob, EditJobPosting} = useContext(JobBoardContext)
    const [job, setJob] = useState({})
    const [description, setDescription] = useState("")
    const [title, setTitle] = useState("")
    const history = useHistory()
    useEffect(() =>{
        FetchJob(jobId).then((data) => setJob(data))
    },[])
    return(<><h1>Edit Job</h1>
            <Form>
                    
                    <FormGroup>
                        <Label for="userInstrument">Edit Position Title</Label>
                        <Input type="text" name="userInstrument" defaultValue={job.positionTitle} onKeyUp={(event)=> setTitle(event.target.value)}></Input>
                    </FormGroup>
                    
                    <FormGroup>
                        <Label for="description">Edit Job Description</Label>
                        <Input type="textarea" name="description" defaultValue={job.description}onKeyUp={(event)=> setDescription(event.target.value)}></Input>
                    </FormGroup>
                </Form>
                <Button onClick={()=>{
                    EditJobPosting(job.id, description, title).then(()=> history.push("/jobpostings"))
                }}>Apply Changes</Button>
            {console.log(job)}
    </>)
}