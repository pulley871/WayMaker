import { createContext, useState } from "react";


export const CommentContext = createContext()

export const CommentProvider = (props) =>{
    const [comments, setComments] = useState([])
    const FetchComments = (postId) => {
        return fetch(`https://waymaker-api-bdy6w.ondigitalocean.app/comments?wallPostId=${postId}`)
            .then(res => res.json())
            
    }

    return(<CommentContext.Provider value={{
        FetchComments, comments
    }}>
        {props.children}
    </CommentContext.Provider>)
}