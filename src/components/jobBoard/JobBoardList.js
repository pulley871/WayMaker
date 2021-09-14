import { useState, useContext, useEffect } from "react"
import { Table } from "reactstrap"
import { JobLayout } from "./Job"

export const JobList= ({alljobs}) =>{
    const currentChurch = localStorage.getItem("waymaker_church")
    
    return (<>
        <Table hover>
            <thead>
                <th>Church</th>
                <th>Zip Code</th>
                <th>Position</th>
                <th>Contact Info</th>
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