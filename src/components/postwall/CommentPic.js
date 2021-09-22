import { useState, useContext, useEffect } from "react"
import { Input, Button } from "reactstrap"
import { UserContext } from "../user/UserProvider"
import "./PostWall.css"
export const CommentPic = ({id, bool})=>{
    const [profilePic, setProfilePic] = useState({})
    const {FetchPictures}  = useContext(UserContext)

    useEffect(()=>{
        
        FetchPictures(id, bool).then((data)=> setProfilePic(data[0]))
    },[id, bool])
    return(<>{console.log(profilePic)}
            <div id={`comment-pic_${id}`} className="comment-pic">
                {profilePic !== undefined?<img src={profilePic?.pictureURL} alt={profilePic.churchId}/> : ""}
            </div>
            
            </>
    )

}