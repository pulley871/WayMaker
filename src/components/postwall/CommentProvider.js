import { createContext, useState } from "react";


export const CommentContext = createContext()

export const CommentProvider = (props) =>{
    const [comments, setComments] = useState([])
    const FetchComments = (postId) => {
        return fetch(`http://localhost:8088/comments?wallPostId=${postId}`)
            .then(res => res.json())
            
    }

    return(<CommentContext.Provider value={{
        FetchComments, comments
    }}>
        {props.children}
    </CommentContext.Provider>)
}