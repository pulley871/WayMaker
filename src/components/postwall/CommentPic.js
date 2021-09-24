import { useState, useContext, useEffect } from "react"
import { Input, Button } from "reactstrap"
import { UserContext } from "../user/UserProvider"
import "./PostWall.css"
export const CommentPic = ({id, bool, comment})=>{
    const [profilePic, setProfilePic] = useState({})
    const {userPics, FetchPictures}  = useContext(UserContext)

    useEffect(()=>{
        
        if (userPics.length === 0){
            FetchPictures()
            
        }else{
            const foundPic = userPics?.find((pic) => pic.userId === id)
            setProfilePic(foundPic)
        }
        
    },[id, bool])
    useEffect(() => {
        const foundPic = userPics?.find((pic) => pic.userId === id)
        setProfilePic(foundPic)
    },[userPics])
    return(<>
            <div id={`comment-pic_${id}`} className="comment-pic">
                {profilePic !== undefined?<img src={profilePic?.pictureURL} alt={profilePic.churchId}/> : ""}
            </div>
            
            </>
    )

}