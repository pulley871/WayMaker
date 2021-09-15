import { useContext, useState, useEffect } from "react"
import { useParams } from "react-router"
import { Input, Table, Button } from "reactstrap"
import { JobBoardContext } from "../jobBoard/JobBoardProvider"
import { JobList } from "./ChurchJob"
import { CloudinaryContext, Image, Transformation } from 'cloudinary-react';
import axios from "axios"
import "./ChurchProfile.css"
export const ChurchProfile = () =>{
    const {FetchJobsByChurch, jobs} = useContext(JobBoardContext)
    const [imageSelected, setImageSelected] = useState("")
    const {churchId} = useParams()
    const uploadImage = () =>{
        
        const formData = new FormData()
        formData.append("file",imageSelected)
        formData.append("upload_preset", "ubjoump8")
        formData.append("public_id", `churchpic--${churchId}`)
        axios.post("https://api.cloudinary.com/v1_1/dcaryjezn/image/upload", formData)
        .then((response)=>console.log(response))
    }
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


            {/* PROFILE PICTURE AREA */}
            <CloudinaryContext cloudName="dcaryjezn">
                <div id="churchProfilePic">
                    <Image publicId={`churchpic--${churchId}`} width="100" />
                    <Transformation fetchFormat="auto"/>
                </div>
                    
            {console.log(imageSelected)}
            </CloudinaryContext>
            <div>
                <Input type="file" onChange={(event)=> setImageSelected(event.target.files[0])}></Input>
                <Button onClick={()=>{
                    uploadImage()
                }}>Submit</Button>
            </div>


            {/* Profile Picture End */}
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