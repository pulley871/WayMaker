import { useParams, useHistory } from "react-router"
import {useState, useContext, useEffect} from "react"
import { UserContext } from "./UserProvider"
import { Form, FormGroup, Label, Input, Button } from "reactstrap"
export const EditApplication = () =>{
    const {applicationId} = useParams()
    const {FetchSpecificApplication, EditApplication} = useContext(UserContext)
    const [application, setApp] = useState({})
    const [description, setDescription] = useState("")
    const history = useHistory()
    useEffect(()=>{
        FetchSpecificApplication(applicationId).then((data)=>setApp(data))
    },[])
    
    return (<>
            <Form>
                    
                    
                    <FormGroup>
                        <Label for="description">Why you want this Job</Label>
                        <Input type="textarea" name="description" defaultValue={application.description}onKeyUp={(event)=> setDescription(event.target.value)}></Input>
                    </FormGroup>
                </Form>
                <Button color="success"onClick={() => EditApplication(applicationId, description).then(()=>history.push(`/profile/${localStorage.getItem("waymaker_user")}`))}>Apply Edits</Button>
    </>)
}