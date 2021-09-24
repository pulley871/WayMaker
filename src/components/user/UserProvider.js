import { createContext, useState } from "react";


export const UserContext = createContext()

export const UserProvider = (props) =>{
    const [userPics, setUserPics] = useState([])
    const [churchPics, setChurchPics] = useState([])
    const FetchUser = (id)=>{
        return fetch(`https://waymaker-api-bdy6w.ondigitalocean.app/users/${id}`)
            .then(res => res.json())
            
    }
    
    const FetchUserApplications = (id)=>{
        return fetch(`https://waymaker-api-bdy6w.ondigitalocean.app/jobApplications?userId=${id}`)
            .then(res => res.json())
            
    }
    const FetchApplicationDetails = (id) =>{
        return fetch(`https://waymaker-api-bdy6w.ondigitalocean.app/jobPostings/${id}?_expand=church`)
            .then(res => res.json())
            
    }
    const FetchSpecificApplication = (id) =>{
        return fetch(`https://waymaker-api-bdy6w.ondigitalocean.app/jobApplications/${id}`)
            .then(res => res.json())
           
    }
    const FetchPictures = (userId, boolean) =>{
        if (boolean){
            return fetch(`https://waymaker-api-bdy6w.ondigitalocean.app/churchPictures`)
            .then(res => res.json()).then((data) => setChurchPics(data))
        }
        return fetch(`https://waymaker-api-bdy6w.ondigitalocean.app/userPictures`)
            .then(res => res.json()).then((data) => setUserPics(data))
            
    }
    const PostUserPictureToJson = (object, isChurch)=>{
        const fetchOption = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(object)
        }
        if (isChurch){
            return fetch("https://waymaker-api-bdy6w.ondigitalocean.app/churchPictures/", fetchOption)
        }else{

            return fetch("https://waymaker-api-bdy6w.ondigitalocean.app/userPictures/", fetchOption)
        }
    }
    const UploadPicture = (data, id, boolean) =>{
        const formData = new FormData()
        formData.append("file",data)
        formData.append("upload_preset", "ubjoump8")
        const fetchOption = {
            method: "POST",
            body: formData
        }
        
        return fetch("https://api.cloudinary.com/v1_1/dcaryjezn/image/upload", fetchOption)
        .then(res => res.json())
        .then((data)=>{
            
            if (boolean){
                const picObj = {
                    churchId: id,
                    pictureURL: data.secure_url
                }
                PostUserPictureToJson(picObj, boolean)
            }else{
                const picObj = {
                    userId: id,
                    pictureURL: data.secure_url
                }
                PostUserPictureToJson(picObj, boolean)

            }
        })
            
    }
    const DeleteApplication = (id) =>{
        return (fetch(`https://waymaker-api-bdy6w.ondigitalocean.app/jobApplications/${id}`, {
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
        return fetch(`https://waymaker-api-bdy6w.ondigitalocean.app/jobApplications/${id}`, dataToSend)
     }
    return (<UserContext.Provider value={{
        churchPics,userPics,FetchPictures,UploadPicture, FetchUser,FetchUserApplications, FetchApplicationDetails, DeleteApplication,FetchSpecificApplication, EditApplication
           }}>
        {props.children}</UserContext.Provider>)
}