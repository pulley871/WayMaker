import { useContext, useEffect, useState } from "react"
import { Input,  Button } from "reactstrap"
import { UserContext } from "./UserProvider";
import "./UserProfile.css"
export const ProfilePic = ({userId, check}) => {
    const [imageSelected, setImageSelected] = useState("")
    const [profilePic, setProfilePic] = useState({})
    const {FetchPictures, UploadPicture } = useContext(UserContext)

    useEffect(()=>{
        FetchPictures(userId, false).then((data)=> setProfilePic(data[0]))
    },[userId])
    return(<>
            <div id="profile-pic">
                {profilePic !== undefined?<img src={profilePic?.pictureURL} alt={profilePic.userId}/> : ""}
            </div>
            <div id="profile-pic__buttons">
                {check() ? <>{profilePic !== undefined ? "" :<>
                <Input type="file" onChange={(event)=> setImageSelected(event.target.files[0])}></Input>
                <Button onClick={()=>{
                    
                    UploadPicture(imageSelected, userId, false)
                }}>Submit</Button>
</>}</>:""}
                
            </div>
            </>
    )
}