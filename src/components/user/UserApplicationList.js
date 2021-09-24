import { useContext, useState, useEffect } from "react"
import { Button } from "reactstrap"
import { UserContext } from "./UserProvider"
import { useHistory } from "react-router"

export const UserApplicationList = ({jobId, applicationId, description,updateUI, userCheck }) =>{
    const {FetchApplicationDetails, DeleteApplication, FetchUserApplications} = useContext(UserContext)
    
    const history = useHistory()
    const [applicationDetail, setAppDetail] = useState({})
    
    useEffect(() => {
        FetchApplicationDetails(jobId).then((data)=> setAppDetail(data))
    }, [])
 
    return (<>
            <tr>
                
                    <td>{applicationDetail.church?.name}</td>
                    <td>{applicationDetail.church?.zipCode}</td>
                    <td>{applicationDetail?.positionTitle}</td>
                    <td>{applicationDetail.church?.email}</td>
                    <td>{description}</td>
                    {userCheck() ? <td><Button color="warning"onClick={()=>{
                        history.push(`/applications/edit/${applicationId}`)
                    }}>Edit</Button></td>: ""}
                    {userCheck() ? <td><Button color="danger"onClick={()=>{
                        DeleteApplication(applicationId).then(()=>updateUI())
                    }}>Delete</Button></td>: ""}
                </tr>
    </>)
}