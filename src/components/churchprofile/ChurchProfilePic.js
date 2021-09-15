import { useState, useContext, useEffect } from "react"
import { Input, Button } from "reactstrap"
import { UserContext } from "../user/UserProvider"
export const ProfilePic = ({userId}) => {
    const [imageSelected, setImageSelected] = useState("")
    const [profilePic, setProfilePic] = useState({})
    const {FetchPictures, UploadPicture } = useContext(UserContext)

    useEffect(()=>{
        FetchPictures(userId, true).then((data)=> setProfilePic(data[0]))
    },[userId])
    return(<>{console.log(profilePic)}
            <div id="profile-pic">
                {profilePic !== undefined?<img src={profilePic?.pictureURL} alt={profilePic.churchId}/> : ""}
            </div>
            <div id="profile-pic__buttons">
                {profilePic !== undefined ? "" :<>
                <Input type="file" onChange={(event)=> setImageSelected(event.target.files[0])}></Input>
                <Button onClick={()=>{
                    
                    UploadPicture(imageSelected, userId, true)
                }}>Submit</Button>
</>}
            </div>
            </>
    )
}