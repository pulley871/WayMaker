import { useContext, useState, useEffect } from "react"
import { useParams } from "react-router"
import { Link } from "react-router-dom"
import { Input, Table, Button } from "reactstrap"
import { JobBoardContext } from "../jobBoard/JobBoardProvider"
import { UserContext } from "../user/UserProvider"
import { JobList } from "./ChurchJob"
import "./ChurchProfile.css"
import { ProfilePic } from "./ChurchProfilePic"

export const ChurchProfile = () =>{
    const {FetchJobsByChurch, jobs,FetchChurch, church} = useContext(JobBoardContext)
    const {FetchPictures} = useContext(UserContext)
    const [addressUrl, setUrl] =useState("")
    const {churchId} = useParams()
    
    const checkUser = ()=> {
        if (churchId === localStorage.getItem("waymaker_church") && localStorage.getItem("waymaker_user") === null){
            return true
        }else{
            return false
        }
    }
    const googlifyAddress = (address, zip) =>{
        
        let url= `https://www.google.com/maps/place/`
        
        let arr = address?.split(" ")
        
            if(arr !== undefined){

                for (const word of arr){
                    
                    url += `${word}+`
                }
                url += zip
                return url
            }

        
    }
    useEffect(()=>{
        
        FetchJobsByChurch(parseInt(churchId))
        FetchChurch(churchId)
        FetchPictures(0, true)
    },[])
    useEffect(() => {
         setUrl(googlifyAddress(church?.address, church.zipCode))
    },[church])
    return(<>
            

            <section id={`churchprofile-header`}>
           
                <ProfilePic userId={churchId} check={checkUser}/>
                <h2>{church.name}</h2>
            </section>
            <section id="church-contact-container">
                <div id="church-contact-info">
                    <div id="church-contact-edit">
                        <h3>Contact Information</h3>
                        {checkUser() ? <Link to={`/editchurchprofile/${church.id}`}><span class="material-icons">edit</span></Link>:""}
                    </div>
                    <span className="material-icons">email</span>
                    <a id="church-contact-info_email"href={`mailto:${church.email}`}>{church.email}</a><br/>
                    <span className="material-icons">phone</span>
                    <a id="church-contact-info_email"href={`tel:${church.phoneNumber}`}>{church.phoneNumber}</a><br/>
                    <span className="material-icons">home</span>
                    <a id="church-contact-info_email"href={addressUrl}>{church.address}  || {church.zipCode}</a>

                </div>
                
            </section>
            <section id="church-profile-job-container">
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
            </section>
    </>)
}