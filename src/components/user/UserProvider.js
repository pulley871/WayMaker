import { createContext } from "react";


export const UserContext = createContext()

export const UserProvider = (props) =>{
    const FetchUser = (id)=>{
        return fetch(`http://localhost:8088/users/${id}`)
            .then(res => res.json())
            
    }
    const FetchChurch = (id)=>{
        return fetch(`http://localhost:8088/churches/${id}`)
            .then(res => res.json())
            
    }
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
    const FetchPictures = (userId, boolean) =>{
        if (boolean){
            return fetch(`http://localhost:8088/churchPictures?churchId=${userId}`)
            .then(res => res.json())
        }
        return fetch(`http://localhost:8088/userPictures?userId=${userId}`)
            .then(res => res.json())
            
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
            return fetch("http://localhost:8088/churchPictures/", fetchOption)
        }else{

            return fetch("http://localhost:8088/userPictures/", fetchOption)
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
            console.log(data)
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
        FetchChurch,FetchPictures,UploadPicture, FetchUser,FetchUserApplications, FetchApplicationDetails, DeleteApplication,FetchSpecificApplication, EditApplication
           }}>
        {props.children}</UserContext.Provider>)
}