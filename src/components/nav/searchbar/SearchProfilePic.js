import { useState, useContext, useEffect } from "react"
import { Input, Button } from "reactstrap"
import { UserContext } from "../../user/UserProvider"
import "./Search.css"
export const SearchPic = ({id, bool})=>{
    const [profilePic, setProfilePic] = useState({})
    const {churchPics, userPics }  = useContext(UserContext)

    useEffect(()=>{
        if(bool === true){
            const foundPic = churchPics.find((pic) => pic.churchId === id)
            return setProfilePic(foundPic)
        }else{
            const foundPic = userPics.find((pic) => pic.userId === id)
            return setProfilePic(foundPic)
        }
        
    },[id, bool])
    return(<>
            <div id={`search-pic_${id}`} className="search-pic">
                {profilePic !== undefined?<img src={profilePic?.pictureURL} alt={profilePic.churchId}/> : ""}
            </div>
            
            </>
    )

}