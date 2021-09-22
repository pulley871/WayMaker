import { Badge, Button } from "reactstrap"
import { useContext, useState, useEffect } from "react"
import { JobBoardContext } from "../jobBoard/JobBoardProvider"
import { useHistory } from "react-router"
import { Link } from "react-router-dom"


export const JobList = ({job, userCheck}) =>{
    const {DeleteJob, FetchJobsByChurch, FetchJobApplications,RemoveJobApplications} = useContext(JobBoardContext)
    const [applications, setApplications] = useState([])
    const history = useHistory()
    useEffect(()=>{
        FetchJobApplications(job.id).then((data)=> setApplications(data))
        
    },[])
    return(<>
    
                <tr>
                    <td>{job.church?.name}</td>
                    <td>{job.church?.zipCode}</td>
                    <td>{job?.positionTitle}</td>
                    <td>{job.church?.email}</td>
                    
                    <td><Button color="primary" onClick={ () => {
                        history.push(`/applications/${job.id}`)
                    }}><Badge  info>{applications.length}</Badge></Button></td>
                    {userCheck() ? 
                    <td> <Button color="warning"onClick={ () => {
                        history.push(`/jobpostings/edit/${job.id}`)
                    }}>Edit</Button></td>
                    :""}
                    {userCheck() ? 
                    <td><Button color="danger"onClick={ () =>
                       RemoveJobApplications(job.id).then( () => DeleteJob(job.id)).then(()=>FetchJobsByChurch(parseInt(localStorage.getItem("waymaker_church"))))
                        }>Delete</Button></td>
                        :""}
                    
                </tr>
    </>)
}