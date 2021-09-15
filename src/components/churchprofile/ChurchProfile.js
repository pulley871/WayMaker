import { useContext, useState, useEffect } from "react"
import { useParams } from "react-router"
import { Input, Table, Button } from "reactstrap"
import { JobBoardContext } from "../jobBoard/JobBoardProvider"
import { JobList } from "./ChurchJob"
import { CloudinaryContext, Image, Transformation } from 'cloudinary-react';
import axios from "axios"
import "./ChurchProfile.css"
import { ProfilePic } from "./ChurchProfilePic"
export const ChurchProfile = () =>{
    const {FetchJobsByChurch, jobs,FetchChurch} = useContext(JobBoardContext)
    const [church, setChurch] = useState({})
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
        FetchChurch(churchId).then(data=>setChurch(data))
         console.log(church)
    },[churchId])
    return(<>Your Church
            


            {/* PROFILE PICTURE AREA */}
            <ProfilePic userId={churchId} />
            <h4>{console.log(church)}</h4>

            
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