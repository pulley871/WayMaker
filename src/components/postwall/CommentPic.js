import { useState, useContext, useEffect } from "react"
import { Input, Button } from "reactstrap"
import { UserContext } from "../../user/UserProvider"
import "./Search.css"
export const SearchPic = ({id, bool})=>{
    const [profilePic, setProfilePic] = useState({})
    const {FetchPictures}  = useContext(UserContext)

    useEffect(()=>{
        console.log(id, bool)
        FetchPictures(id, bool).then((data)=> setProfilePic(data[0]))
    },[id, bool])
    return(<>{console.log(profilePic)}
            <div id={`search-pic_${id}`} className="search-pic">
                {profilePic !== undefined?<img src={profilePic?.pictureURL} alt={profilePic.churchId}/> : ""}
            </div>
            
            </>
    )

}