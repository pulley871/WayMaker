import { createContext, useState } from "react";


export const PostWallContext = createContext()

export const PostWallProvider = (props) => {
    const [posts, setPost] = useState([])
    const [comments, setComments] = useState([])
    
    const FetchPost = (id)=>{
        return fetch(`http://localhost:8088/wallPosts/${id}`)
            .then(res => res.json())
            
    }
    const FetchPosts = ()=>{
        return fetch("http://localhost:8088/wallPosts")
            .then(res => res.json())
            .then((data)=>setPost(data))
    }
    const FetchComments = (postId) => {
        return fetch(`http://localhost:8088/comments?wallPostId=${postId}`)
            .then(res => res.json())
            
    }
    const FetchCommentForEdit = (commentId) => {
        return fetch(`http://localhost:8088/comments/${commentId}`)
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
        
        return fetch("http://localhost:8088/comments", fetchOption)
            
    }
    const PostPost = (object) => {
        const fetchOption = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(object)
        }
        
        return fetch("http://localhost:8088/wallPosts", fetchOption)
            
    }
    const DeletePost = (id) =>{
        return (fetch(`http://localhost:8088/wallPosts/${id}`, {
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
                videoUrl: object.url
            })

        }
        return fetch(`http://localhost:8088/wallPosts/${id}`, dataToSend)
     }
     const DeleteComment = (id) =>{
        return (fetch(`http://localhost:8088/comments/${id}`, {
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
        return fetch(`http://localhost:8088/comments/${id}`, dataToSend)
     }
    return (<PostWallContext.Provider value={{
        FetchPosts, FetchComments,FetchCommentForEdit, FetchPost, PostComments, PostPost, DeletePost,EditWallPost,EditPostComment, DeleteComment, posts, comments
    }}>
        {props.children}
    </PostWallContext.Provider>)
}