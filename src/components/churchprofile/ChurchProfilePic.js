import { useState, useContext, useEffect } from "react"
import { Input, Button } from "reactstrap"
import { UserContext } from "../user/UserProvider"
import "./ChurchProfile.css"
export const ProfilePic = ({userId, check}) => {
    const [imageSelected, setImageSelected] = useState("")
    const [profilePic, setProfilePic] = useState({})
    const {churchPics, UploadPicture } = useContext(UserContext)

    useEffect(()=>{
        
        const foundPic = churchPics.find((pic) => pic.churchId === parseInt(userId))
        setProfilePic(foundPic)
    },[churchPics])
    return(<>
            <div id="churchProfile-pic">
                {profilePic !== undefined?<img src={profilePic?.pictureURL} alt={profilePic.churchId}/> : ""}
            </div>
            <div id="churchProfile-pic__buttons">
                {check() ? <>{profilePic !== undefined ?
                 "" :
                 <>
                <Input type="file" onChange={(event)=> setImageSelected(event.target.files[0])}></Input>
                <Button onClick={()=>{
                    
                    UploadPicture(imageSelected, userId, true)
                }}>Submit</Button>
                </>}</>
                : ""}
                
            </div>
            </>
    )
}