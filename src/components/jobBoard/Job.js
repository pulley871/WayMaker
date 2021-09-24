import { Badge, Button } from "reactstrap"
import { Link, useHistory } from "react-router-dom"
import { useEffect, useContext, useState } from "react"
import { JobBoardContext } from "./JobBoardProvider"
import DescirptionPopUp from "./JobDescriptionPopUp"
import "./JobBoard.css"

export const JobLayout = ({job}) =>{
    const currentChurch = localStorage.getItem("waymaker_church")
    const currentUser = localStorage.getItem("waymaker_user")
    const {FetchApplications, DeleteJob, FetchJobs, applications } = useContext(JobBoardContext)
    const [jobApplications, setJobApplications] = useState([])
    const [isApplied, setApplied] = useState(Boolean)
    const history = useHistory()
    useEffect(() => {
        
        FetchApplications()
        
    }, [job])
    useEffect(() => {
        isAppliedCheck()
    }, [applications])
    const dateConverter = (timeStamp ) =>{
        let date = new Date(timeStamp*1000)
        return`${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}`
    }
    const isAppliedCheck = () => {
        if (applications?.length > 0){
            
            const foundApplication = applications.find((app)=>app.userId === parseInt(currentUser) && app.jobPostingId === job.id)
            return (foundApplication !== undefined ? setApplied(true) : setApplied(false))

        }
    }
    return (<>
        
            
                
                <tr>
                    <td>{job.church?.name}</td>
                    <td>{job.church?.zipCode}</td>
                    <td>{job?.positionTitle}</td>
                    <td><DescirptionPopUp buttonLabel="View Description" className="" job={job}/></td>
                    <td>{job.church?.email}</td>
                    <td>{job.jobApplications?.length}</td>
                    <td>{dateConverter(job.datePosted)}</td>
                    {currentChurch  ? <td>{parseInt(currentChurch) === job.churchId ? 
                    <><Button className="job-button"color="warning"onClick={()=>{
                        history.push(`/jobpostings/edit/${job.id}`)
                    }}>Edit</Button>
                    <Button className="job-button"color="danger"onClick={()=>{
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