import { createContext, useState } from "react";


export const PostWallContext = createContext()

export const PostWallProvider = (props) => {
    const [posts, setPost] = useState([])
    const [comments, setComments] = useState([])
    
    const FetchPost = (id)=>{
        return fetch(`https://wayaker-api.herokuapp.com/wallPosts/${id}`)
            .then(res => res.json())
            
    }
    const FetchPosts = ()=>{
        return fetch("https://wayaker-api.herokuapp.com/wallPosts")
            .then(res => res.json())
            .then((data)=>setPost(data))
    }
    const FetchComments = (postId) => {
        return fetch(`https://wayaker-api.herokuapp.com/comments?wallPostId=${postId}`)
            .then(res => res.json())
            
    }
    const FetchCommentForEdit = (commentId) => {
        return fetch(`https://wayaker-api.herokuapp.com/comments/${commentId}`)
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
        
        return fetch("https://wayaker-api.herokuapp.com/comments", fetchOption)
            
    }
    const PostPost = (object) => {
        const fetchOption = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(object)
        }
        
        return fetch("https://wayaker-api.herokuapp.com/wallPosts", fetchOption)
            
    }
    const DeletePost = (id) =>{
        return (fetch(`https://wayaker-api.herokuapp.com/wallPosts/${id}`, {
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
        return fetch(`https://wayaker-api.herokuapp.com/wallPosts/${id}`, dataToSend)
     }
     const DeleteComment = (id) =>{
        return (fetch(`https://wayaker-api.herokuapp.com/comments/${id}`, {
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
        return fetch(`https://wayaker-api.herokuapp.com/comments/${id}`, dataToSend)
     }
    return (<PostWallContext.Provider value={{
        FetchPosts, FetchComments,FetchCommentForEdit, FetchPost, PostComments, PostPost, DeletePost,EditWallPost,EditPostComment, DeleteComment, posts, comments
    }}>
        {props.children}
    </PostWallContext.Provider>)
}