import { useState, createContext} from "react";

export const JobBoardContext = createContext()

export const JobBoardProvider = (props) =>{
    const [jobs, setJobs] = useState([])
    const [applications, setApplications] = useState([])
    const [jobApplications, setJobApplication] = useState([])
    const [church, setChurch] = useState([])
    const [searchTerm, setSearchTerm] = useState("")
    const JsXString = (string) => {
        
        const newString = string.split("\n")
        return (<div>{newString.map((sentence) => {
            return  (<p>{sentence} <br/></p>)
        }).join("")}</div>)
        
    }
    const FetchSearchedJobs = (term) => {
        return fetch(`http://localhost:8088/jobPostings?_expand=church&positionTitle_like=${term}&description_like=${term}&_embed=jobApplications`)
            .then(res => res.json())
            .then((data) => {
                setJobs(data)
            })
    }
    const FetchJobs = ()=>{
        return fetch("http://localhost:8088/jobPostings?_sort=datePosted&_expand=church&_embed=jobApplications")
            .then(res => res.json())
            .then((data) => {
                setJobs(data.reverse())
            })
    }
    const FetchJob = (id)=>{
        return fetch(`http://localhost:8088/jobPostings/${id}?_expand=church`)
            .then(res => res.json())
            
            
    }
    const FetchJobApplications = (id) => {
        return fetch(`http://localhost:8088/jobApplications?jobPostingId=${id}&_expand=user`)
            .then(res => res.json())
            
    }
    const FetchApplications = () => {
        return fetch("http://localhost:8088/applications")
            .then(res => res.json())
            .then((data) => {
                setApplications(data)
            })
    }

    const FetchJobsByChurch = (churchId) =>{
        return fetch(`http://localhost:8088/jobPostings?churchId=${churchId}&_expand=church`)
            .then(res => res.json())
            .then((data) => {
                setJobs(data)
            })
    }
    const FetchChurch = (churchId) => {
        return fetch(`http://localhost:8088/churches/${churchId}`)
            .then(res => res.json())
            .then((data) => {
                setChurch(data)
            })
    }
    const PostJob = (object) =>{
        const fetchOption = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(object)
        }
        
        return fetch(`http://localhost:8088/jobPostings`, fetchOption)
            .then(() => {})
    }
    const PostApplication = (object) =>{
        const fetchOption = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(object)
        }
        
        return fetch(`http://localhost:8088/jobApplications`, fetchOption)
            .then(() => {})
    }
    const RemoveJobApplications = (jobPostingId) =>{
        return fetch(`http://localhost:8088/jobApplications?jobPostingId=${jobPostingId}`)
            .then(res => res.json())
            .then((data) => {
                const applicationDeletes = data.map((app)=>{
                     fetch(`http://localhost:8088/jobApplications/${app.id}`, {
                        method: "DELETE",
                        headers: {
                        "Content-Type": "application/json"
                        },
                        body: null
                    }
                    )
                })
                return(Promise.all(applicationDeletes))
            })
    }
    const DeleteJob = (id) =>{
        return (fetch(`http://localhost:8088/jobPostings/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        },
        body: null
    }))
    }
    const EditJobPosting = (id, description, title) =>{
        const dataToSend = {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                description: description,
                positionTitle: title
            })

        }
        return fetch(`http://localhost:8088/jobPostings/${id}`, dataToSend)
     }
     const EditProfile = (id, object, isUser ) =>{
        const dataToSend = {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(object)

        }
        if (isUser){
            return fetch(`http://localhost:8088/users/${id}`, dataToSend)
        }else{
            return fetch(`http://localhost:8088/churches/${id}`, dataToSend)
        }
        
     }
    return (<JobBoardContext.Provider value={{
        applications,jobs,church,jobApplications,searchTerm,setJobs, setSearchTerm, FetchJobs,FetchJob, FetchApplications, FetchJobsByChurch, FetchChurch,FetchJobApplications, PostJob, PostApplication, DeleteJob, RemoveJobApplications, EditJobPosting,FetchSearchedJobs, JsXString, EditProfile
    }}>
        {props.children}
    </JobBoardContext.Provider>)
}