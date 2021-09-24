import { useContext, useEffect, useState } from "react"
import { useHistory, useParams } from "react-router"
import { Button, Form, FormGroup, Input, Label } from "reactstrap"
import { JobBoardContext } from "../jobBoard/JobBoardProvider"
import { UserContext } from "./UserProvider"

export const UserProfileEdit = () =>{
    const {userId} = useParams()
    const [user, setUser] = useState({})
    
    const [instrument, setInstrument] = useState("")
    const [address, setAddress] = useState("")
    const [description, setDescription] = useState("")
    const [zip, setZip] = useState(0)
    const { EditProfile} = useContext(JobBoardContext)
    const {FetchUser } = useContext(UserContext)
    const history = useHistory()
    
    useEffect(() => {
        
        FetchUser(userId).then((data)=> setUser(data))
    }, [userId])
    useEffect(() =>{
        
        setInstrument(user.instrument)
        setZip(user.zipCode)
        setAddress(user.address)
        setDescription(user.description)
    },[user])
    return(<>
           <h3>Edit Your Contact Info</h3>
           <Form>
               <FormGroup>
                   
                    <Label for="userinstrument">Instrument</Label>
                    <Input type="text" name="userinstrument"defaultValue={user.instrument} onChange={(event)=>{
                        setInstrument(event.target.value)
                    }}></Input>
                    <Label for="useraddress">Address</Label>
                    <Input type="text" name="useraddress"defaultValue={user.address} onChange={(event)=>{
                        setAddress(event.target.value)
                    }}></Input>
                    <Label for="userzip">Zip Code</Label>
                    <Input type="text" name="userzip"defaultValue={user.zipCode} onChange={(event)=>{
                        setZip(event.target.value)
                    }}></Input>
                    <Label for="userdes">About You</Label>
                    <Input type="textarea" name="userdes"defaultValue={user.description} onChange={(event)=>{
                        setDescription(event.target.value)
                    }}></Input>
               </FormGroup>
           </Form>
           <Button color="success"onClick={()=>{
               const object = {
                  
                  instrument: instrument,
                  address: address,
                  zipCode: parseInt(zip),
                  description: description 
               }
               EditProfile(userId, object, true).then(()=> history.push(`/profile/${user.id}`))
           }}>Submit</Button>      
    </>)
}