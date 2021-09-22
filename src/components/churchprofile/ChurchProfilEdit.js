import { useContext, useEffect, useState } from "react"
import { useHistory, useParams } from "react-router"
import { Button, Form, FormGroup, Input, Label } from "reactstrap"
import { JobBoardContext } from "../jobBoard/JobBoardProvider"

export const ChurchProfileEdit = () =>{
    const {churchId} = useParams()
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("")
    const [address, setAddress] = useState("")
    const [zip, setZip] = useState(0)
    const {church, FetchChurch, EditProfile} = useContext(JobBoardContext)
    const history = useHistory()
    
    useEffect(() => {
        
        FetchChurch(churchId).then(() =>{
            setEmail(church.email)
            setPhone(church.phoneNumber)
            setZip(church.zipCode)
            setAddress(church.address)
        })
    }, [churchId])
    return(<>
           <h3>Edit Your Contact Info</h3>
           <Form>
               <FormGroup>
                   <Label for="churchemail">Email</Label>
                    <Input type="text" name="churchemail"defaultValue={church.email} onChange={(event)=>{
                        setEmail(event.target.value)
                    }}>
                    </Input>
                    <Label for="churchnumber">Phone Number</Label>
                    <Input type="text" name="churchnumber"defaultValue={church.phoneNumber} onChange={(event)=>{
                        setPhone(event.target.value)
                    }}>                      
                    </Input>
                    <Label for="churchaddress">Address</Label>
                    <Input type="text" name="churchaddress"defaultValue={church.address} onChange={(event)=>{
                        setAddress(event.target.value)
                    }}>                       
                    </Input>
                    <Label for="churchzip">Zip Code</Label>
                    <Input type="text" name="churchzip"defaultValue={church.zipCode} onChange={(event)=>{
                        setZip(event.target.value)
                    }}>                       
                    </Input>
               </FormGroup>
           </Form>
           <Button color="success"onClick={()=>{
               const object = {
                  email: email,
                  phoneNumber: parseInt(phone),
                  address: address,
                  zipCode: parseInt(zip) 
               }
               EditProfile(churchId, object, false).then(()=> history.push(`/churchprofile/${church.id}`))
           }}>Submit</Button>      
    </>)
}