import { createContext, useState } from "react";


export const PostWallContext = createContext()

export const PostWallProvider = (props) => {
    const [posts, setPost] = useState([])
    const FetchPost = (id)=>{
        return fetch(`http://localhost:8088/wallPosts/${id}`)
            .then(res => res.json())
            
    }
    const FetchPosts = ()=>{
        return fetch("http://localhost:8088/wallPosts")
            .then(res => res.json())
            .then((data)=>setPost(data.reverse()))
    }
    const FetchComments = (postId) => {
        return fetch(`http://localhost:8088/comments?wallPostId=${postId}`)
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
    return (<PostWallContext.Provider value={{
        FetchPosts, FetchComments, FetchPost, PostComments, PostPost, DeletePost, posts
    }}>
        {props.children}
    </PostWallContext.Provider>)
}