import { Button,Form, FormGroup, Input, Label, FormFeedback, Row, Col, Alert } from "reactstrap"
import { useContext, useEffect, useState } from "react"
import { AuthContext } from "./AuthProvider"
import { useHistory } from "react-router"
export const RegisterUser = () =>{
    const {users , FetchUsers, PostUser} = useContext(AuthContext)
    const [email, setEmail] = useState("")
    const [emailIsValid, setEmailIsValid] = useState()
    const [name, setName] = useState("")
    const [address, setAddress] = useState("")
    const [zipCode, setZipCode] = useState(0)
    const [instrument, setInstrument] = useState("")
    const [description, setDescription] = useState("")
    const history = useHistory()
    const checkEmail = () =>{
        const foundEmail = users.find((user) => user.email.toLowerCase() === email.toLowerCase())
        return setEmailIsValid(foundEmail ? false : true)
    }
    useEffect(()=>{
        FetchUsers()
    },[])
    useEffect(() => {
        checkEmail()
    },[email])

    return (<>
        <h1>WayMaker User Regristration</h1>
        <Form>
            <FormGroup>
                <Label for="useremail">Your Email </Label>
                {email !== ""  && emailIsValid? 
                <><Input  valid   name="useremail"placeholder="Enter Your Email" onKeyUp={(event)=>{
                    setEmail(event.target.value)
                    
                }}></Input>
                <FormFeedback valid>Sweet! that Email is available</FormFeedback></> : 
                <><Input  invalid   name="useremail"placeholder="Enter Your Email" onKeyUp={(event)=>{
                    setEmail(event.target.value)
                    
                }}></Input>
                <FormFeedback>Oh noes! that Email is already taken</FormFeedback></>
                }
            </FormGroup>
            <FormGroup>
                <Label for="username">Your Full Name </Label>
                {name === "" ? 
                <Input placeholder="Enter Your Name"  invalid name="username"onKeyUp={(event)=>{
                    setName(event.target.value)
                    
                }}>Your Name</Input>
                
                : 
                <Input valid placeholder="Enter Your Name"  name="username" onKeyUp={(event)=>{
                    setName(event.target.value)
                    
                }}>Your Name</Input>   
            }
                
                
            </FormGroup>
            

            
            <FormGroup>
                <Label for="useraddress">Address</Label>
                {address !== "" ? <Input placeholder="Your Address" valid type="text" name="useraddress" id="address" onKeyUp={(event)=>{
                    setAddress(event.target.value)
                }}/>:
                <Input placeholder="Your Address" invalid type="text" name="useraddress" id="address" onKeyUp={(event)=>{
                    setAddress(event.target.value)
                }}/>
                }
                
            </FormGroup>

            <FormGroup>
                <Label for="userzip">Zip Code</Label>
                {zipCode !== 0 ? <Input placeholder="Your Zipcode" valid type="text" name="userzip" id="zipcode" onKeyUp={(event)=>{
                    setZipCode(parseInt(event.target.value))
                }}/>:
                <Input placeholder="Your Zipcode" invalid type="text" name="userzip" id="zipcode" onKeyUp={(event)=>{
                    setZipCode(parseInt(event.target.value))
                }}/>
                }
                        
            </FormGroup>

            <FormGroup>
                <Label for="userinstrument">Instrument</Label>
                {instrument !== "" ? <Input placeholder="What instrument(s) do you play?" valid type="text" name="userinstrument" id="instrument" onKeyUp={(event)=>{
                    setInstrument(event.target.value)
                }}/>:
                <Input placeholder="What instrument(s) do you play?" invalid type="text" name="userinstrument" id="instrument" onKeyUp={(event)=>{
                    setInstrument(event.target.value)
                }}/>
                }
                        
            </FormGroup>

            <FormGroup>
                <Label for="userdescription">Your About Me</Label>
                {description !== "" ? <Input placeholder="What do you want people to know?" valid type="text" name="userdescription" id="instrument" onKeyUp={(event)=>{
                    setDescription(event.target.value)
                }}/>:
                <Input placeholder="What do you want people to know?" invalid type="text" name="userdescription" id="instrument" onKeyUp={(event)=>{
                    setDescription(event.target.value)
                }}/>
                }
                        
            </FormGroup>
                
        </Form>
        <br></br><Button color="primary" size="lg" block onClick={()=>{
            const userObject = {
                name: name,
                email: email,
                address: address,
                zipCode: zipCode,
                instrument: instrument,
                description: description
            }
            if(emailIsValid){
                PostUser(userObject)
                .then(createdUser => {
                    if (createdUser.hasOwnProperty("id")) {
                        localStorage.setItem("waymaker_user", createdUser.id)
                        history.push("/")
                    }
                })
            }else{
                return window.alert("Enter a valid Email")
            }
        }}>Register!</Button>
    
    </>)
}