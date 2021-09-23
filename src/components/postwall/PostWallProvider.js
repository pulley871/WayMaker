import { createContext, useState } from "react";


export const PostWallContext = createContext()

export const PostWallProvider = (props) => {
    const [posts, setPost] = useState([])
    const [comments, setComments] = useState([])
    
    const FetchPost = (id)=>{
        return fetch(`https://waymaker-api-bdy6w.ondigitalocean.app/wallPosts/${id}`)
            .then(res => res.json())
            
    }
    const FetchPosts = ()=>{
        return fetch("https://waymaker-api-bdy6w.ondigitalocean.app/wallPosts")
            .then(res => res.json())
            .then((data)=>setPost(data))
    }
    const FetchComments = (postId) => {
        return fetch(`https://waymaker-api-bdy6w.ondigitalocean.app/comments?wallPostId=${postId}`)
            .then(res => res.json())
            
    }
    const FetchCommentForEdit = (commentId) => {
        return fetch(`https://waymaker-api-bdy6w.ondigitalocean.app/comments/${commentId}`)
            .then(res => res.json())
            
    }
    const PostComments = (object) => {
        const fetchOption = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(object)
        }
        
        return fetch("https://waymaker-api-bdy6w.ondigitalocean.app/comments", fetchOption)
            
    }
    const PostPost = (object) => {
        const fetchOption = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(object)
        }
        
        return fetch("https://waymaker-api-bdy6w.ondigitalocean.app/wallPosts", fetchOption)
            
    }
    const DeletePost = (id) =>{
        return (fetch(`https://waymaker-api-bdy6w.ondigitalocean.app/wallPosts/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        },
        body: null
    }))
    }
    const EditWallPost = (id, object) =>{
        const dataToSend = {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                description: object.description,
                title: object.title,
                videoUrl: object.videoUrl
            })

        }
        return fetch(`https://waymaker-api-bdy6w.ondigitalocean.app/wallPosts/${id}`, dataToSend)
     }
     const DeleteComment = (id) =>{
        return (fetch(`https://waymaker-api-bdy6w.ondigitalocean.app/comments/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        },
        body: null
    }))
    }
     const EditPostComment = (id, string) =>{
        const dataToSend = {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                description: string
            })

        }
        return fetch(`https://waymaker-api-bdy6w.ondigitalocean.app/comments/${id}`, dataToSend)
     }
    return (<PostWallContext.Provider value={{
        FetchPosts, FetchComments,FetchCommentForEdit, FetchPost, PostComments, PostPost, DeletePost,EditWallPost,EditPostComment, DeleteComment, posts, comments
    }}>
        {props.children}
    </PostWallContext.Provider>)
}