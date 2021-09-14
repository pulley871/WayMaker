import { createContext } from "react";


export const UserContext = createContext()

export const UserProvider = (props) =>{
    const FetchUserApplications = (id)=>{
        return fetch(`http://localhost:8088/jobApplications?userId=${id}`)
            .then(res => res.json())
            
    }
    const FetchApplicationDetails = (id) =>{
        return fetch(`http://localhost:8088/jobPostings/${id}?_expand=church`)
            .then(res => res.json())
            
    }
    const FetchSpecificApplication = (id) =>{
        return fetch(`http://localhost:8088/jobApplications/${id}`)
            .then(res => res.json())
           
    }
    const DeleteApplication = (id) =>{
        return (fetch(`http://localhost:8088/jobApplications/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        },
        body: null
    }))
    }
     const EditApplication = (id, string) =>{
        const dataToSend = {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                description: string
            })

        }
        return fetch(`http://localhost:8088/jobApplications/${id}`, dataToSend)
     }
    return (<UserContext.Provider value={{
        FetchUserApplications, FetchApplicationDetails, DeleteApplication,FetchSpecificApplication, EditApplication
           }}>
        {props.children}</UserContext.Provider>)
}