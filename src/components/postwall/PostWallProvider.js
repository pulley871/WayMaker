import { createContext } from "react";


export const PostWallContext = createContext()

export const PostWallProvider = (props) => {
    const FetchPost = (id)=>{
        return fetch(`http://localhost:8088/wallPosts/${id}`)
            .then(res => res.json())
            
    }
    const FetchPosts = ()=>{
        return fetch("http://localhost:8088/wallPosts")
            .then(res => res.json())
            
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
    return (<PostWallContext.Provider value={{
        FetchPosts, FetchComments, FetchPost, PostComments
    }}>
        {props.children}
    </PostWallContext.Provider>)
}