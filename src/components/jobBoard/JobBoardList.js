import { useState, useContext, useEffect } from "react"
import { Link } from "react-router-dom"
import { Table } from "reactstrap"
import { JobLayout } from "./Job"
import "./JobBoard.css"
export const JobList= ({alljobs, setJobs}) =>{
    const currentChurch = localStorage.getItem("waymaker_church")
    const [upDownArrow, setArrow] = useState("up")
    
    
    return (<>
        <Table hover id="job-board-table">
            <thead>
                <th>Church</th>
                <th> Zip Code </th>
                <th>Position</th>
                <th>Job Description</th>
                <th>Contact Info</th>
                <th>Total Applicants</th>
                <th><Link to="#"onClick={()=>{
                    switch(upDownArrow){
                        case "down": {
                            setArrow("up")
                            setJobs(alljobs.sort((a,b) => {return a.datePosted - b.datePosted}))
                        }
                        break;
                        case "up": {
                            setArrow("down")
                            setJobs(alljobs.sort((a,b) => {return b.datePosted - a.datePosted}))
                        }
                        break;
                    }
                }}>Post Date{upDownArrow === "down"? <span class="material-icons">
                keyboard_arrow_down
                </span>: <span class="material-icons">
                expand_less
                </span>}</Link></th>
                {currentChurch ? <th>Edit/Delete</th> : <th>Application Status</th>}
            </thead>
            <tbody>
                {alljobs.map((job)=>{
                    return (<JobLayout job = {job} /> )
                })}
            </tbody>
        </Table>
     </>)
}