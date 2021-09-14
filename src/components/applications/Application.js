import { JobBoardContext } from "../jobBoard/JobBoardProvider"
import { useContext, useState, useEffect } from "react"
import { useParams } from "react-router"
import { Table } from "reactstrap"
import { ApplicationsList } from "./ApplicationList"



export const Applications = () => {
    const {DeleteJob, FetchJobsByChurch, FetchJobApplications} = useContext(JobBoardContext)
    const [applications, setApplications] = useState([])
    const {jobId} = useParams()

    useEffect(()=>{
        FetchJobApplications(jobId).then((data)=> setApplications(data))
        
    },[])
    return (<><h1>Applications</h1>
                <Table hover>
                    <thead>
                        <th>Applicant Name</th>
                        <th>Applicant Contact</th>
                        <th>Applicant Address</th>
                        <th>Applicant Instrument</th>
                        <th>Applicant Description</th>
                    </thead>
                    <tbody>
                        {applications.map((app)=>{
                            return (<ApplicationsList application={app} />)
                        })}
                    </tbody>
                </Table>
        </>)
}