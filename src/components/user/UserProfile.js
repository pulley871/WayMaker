import { useContext, useEffect, useState } from "react"
import { useParams } from "react-router"
import { Table } from "reactstrap"
import { ProfilePic } from "./ProfilePic"
import { UserApplicationList } from "./UserApplicationList"
import { UserContext } from "./UserProvider"
import "./UserProfile.css"
import { Link } from "react-router-dom"
export const Profile = () => {
    const {FetchUserApplications, FetchUser} = useContext(UserContext)
    const [applications, setApplications] = useState([])
    const [user, setUser] = useState({})
    const {userId} = useParams()
    const [userUrl, setUrl] = useState("")
    const checkUser = ()=>{
        if (userId === localStorage.getItem("waymaker_user") && localStorage.getItem("waymaker_church") === null){
            return true
        }else{
            return false
        }
    }
    const googlifyAddress = (address, zip) =>{
        
        let url= `https://www.google.com/maps/place/`
        
        let arr = address?.split(" ")
        
            if(arr !== undefined){

                for (const word of arr){
                    
                    url += `${word}+`
                }
                url += zip
                return url
            }

        
    }
    const profileData = () =>{
        FetchUserApplications(userId).then((data) => setApplications(data))
        FetchUser(userId).then((data)=>setUser(data))
        
    }
    useEffect(() => {
        profileData()

        
    },[])
    useEffect(() =>{
        setUrl(googlifyAddress(user?.address, user?.zipCode))

    },[user])
    return (<>
    
            
            <ProfilePic userId={user.id} check={checkUser}/>
            <h1 id="profile-user-name">{user.name}</h1>
            
            <section id="user-contact-container">
                <div id="user-about-container">
                    <h3>About {user.name}</h3>
                    <p>{user.description}</p>
                </div>
                <div id="user-contact-info">
                    <div id="user-contact-edit">
                    <h3>Contact Information</h3>
                    {checkUser() ? <Link to={`/edituserprofile/${user.id}`}><span class="material-icons">edit</span></Link>:""}
                    </div>
                    <span className="material-icons">email</span>
                    <a id="user-contact-info_email"href={`mailto:${user.email}`}>{user.email}</a><br/>
                    <span className="material-icons">music_note</span>
                    <a id="user-contact-info_email"href={`#`}>{user.instrument}</a><br/>
                    <span className="material-icons">home</span>
                    <a id="user-contact-info_email"href={`${userUrl}`}>{user.address}  || {user.zipCode}</a>

                </div>
                
            </section>
            <section id="user-job-apps">
            <h3>{user.name}'s Job Applications</h3>
            <Table hover>
                <thead>
                    <th>Church</th>
                    <th>Zip Code</th>
                    <th>Position</th>
                    <th>Contact Info</th>
                    <th>Users Description</th>
                    {checkUser()?<th>Edit Application</th>: ""}
                    {checkUser()?<th>Withdraw Application</th>: ""}
                </thead>
                <tbody>
                    {applications.map((app) => {
                        return (<UserApplicationList jobId= {app.jobPostingId} applicationId= {app.id} description={app.description}updateUI={profileData} userCheck={checkUser}/>)
                    })}
                </tbody>
            </Table>
            </section>
    </>)
}