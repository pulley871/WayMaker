import { useContext, useState, useEffect } from "react"
import { useParams } from "react-router"
import { Table } from "reactstrap"
import { JobBoardContext } from "../jobBoard/JobBoardProvider"
import { JobList } from "./ChurchJob"

export const ChurchProfile = () =>{
    const {FetchJobsByChurch, jobs} = useContext(JobBoardContext)
    const {churchId} = useParams()
    const checkUser = ()=>{
        if (churchId === localStorage.getItem("waymaker_church") && localStorage.getItem("waymaker_user") === null){
            return true
        }else{
            return false
        }
    }
    useEffect(()=>{
        
        FetchJobsByChurch(parseInt(churchId))
    },[])
    return(<>Your Church
            <h3>Your Job Posting</h3>
            
            <Table hover>
                <thead>
                    <th>Church</th>
                    <th>Zip Code</th>
                    <th>Position</th>
                    <th>Contact Info</th>
                    <th>Total Applications</th>
                    {checkUser() ? <th>Edit Job</th>:""}
                    {checkUser() ? <th>Remove Job</th>:""}
                    
                </thead>
                <tbody>
                    {jobs.map((job) =>{
                        return <JobList job={job} userCheck={checkUser}/>
                    })}
                    
                </tbody>
            </Table>
    </>)
}