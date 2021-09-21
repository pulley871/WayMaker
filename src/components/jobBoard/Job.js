import { Badge, Button } from "reactstrap"
import { Link, useHistory } from "react-router-dom"
import { useEffect, useContext, useState } from "react"
import { JobBoardContext } from "./JobBoardProvider"


export const JobLayout = ({job}) =>{
    const currentChurch = localStorage.getItem("waymaker_church")
    const currentUser = localStorage.getItem("waymaker_user")
    const {FetchJobApplications, DeleteJob, FetchJobs } = useContext(JobBoardContext)
    const [jobApplications, setJobApplications] = useState([])
    const [isApplied, setApplied] = useState(false)
    const history = useHistory()
    useEffect(() => {
        
        FetchJobApplications(job.id).then((data)=> setJobApplications(data))
        
    }, [])
    useEffect(() => {
        isAppliedCheck()
    }, [jobApplications])
    const dateConverter = (timeStamp ) =>{
        let date = new Date(timeStamp*1000)
        return`${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}`
    }
    const isAppliedCheck = () => {
        if (jobApplications.length > 0){
            
            const foundApplication = jobApplications.find((app)=>app.userId === parseInt(currentUser))
            return (foundApplication !== undefined ? setApplied(true) : setApplied(false))

        }
    }
    return (<>
        
            
                {console.log(job)}
                <tr>
                    <td>{job.church?.name}</td>
                    <td>{job.church?.zipCode}</td>
                    <td>{job?.positionTitle}</td>
                    <td>{job.church?.email}</td>
                    <td>{job.jobApplications.length}</td>
                    <td>{dateConverter(job.datePosted)}</td>
                    {currentChurch  ? <td>{parseInt(currentChurch) === job.churchId ? 
                    <><Button color="warning"onClick={()=>{
                        history.push(`/jobpostings/edit/${job.id}`)
                    }}>Edit</Button>
                    <Button color="danger"onClick={()=>{
                        DeleteJob(job.id).then(()=>FetchJobs())
                    }}>Delete</Button></>
                    :
                    ""
                    
                }</td>
                        :
                        <td>{isApplied ?  <h5>Applied</h5> : 
                        <Button color="success"onClick={()=> history.push(`/jobpostings/apply/${job.id}`)}>Apply</Button>}</td>   
                }
                </tr>
                
            
            

    </>)
}