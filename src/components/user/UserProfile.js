import { useContext, useEffect, useState } from "react"
import { useParams } from "react-router"
import { Table } from "reactstrap"
import { UserApplicationList } from "./UserApplicationList"
import { UserContext } from "./UserProvider"

export const Profile = () => {
    const {FetchUserApplications} = useContext(UserContext)
    const [applications, setApplications] = useState([])
    const {userId} = useParams()
    const checkUser = ()=>{
        if (userId === localStorage.getItem("waymaker_user") && localStorage.getItem("waymaker_church") === null){
            return true
        }else{
            return false
        }
    }
    const profileData = () =>{
        FetchUserApplications(userId).then((data) => setApplications(data))
        console.log(localStorage.getItem("waymaker_church"))
    }
    useEffect(() => {
        profileData()
    },[])
    return (<>
    <h1>Profile</h1>
            <h1>Applications</h1>
            <Table hover>
                <thead>
                    <th>Church</th>
                    <th>Zip Code</th>
                    <th>Position</th>
                    <th>Contact Info</th>
                    {checkUser()?<th>Edit Application</th>: ""}
                    {checkUser()?<th>Withdraw Application</th>: ""}
                </thead>
                <tbody>
                    {applications.map((app) => {
                        return (<UserApplicationList jobId= {app.jobPostingId} applicationId= {app.id} updateUI={profileData} userCheck={checkUser}/>)
                    })}
                </tbody>
            </Table>
    </>)
}