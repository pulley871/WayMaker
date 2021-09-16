import { useContext, useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { CardGroup } from "reactstrap"
import { Post } from "./Post"
import { PostWallContext } from "./PostWallProvider"



export const PostWall = () =>{
    const {FetchPosts, FetchComments} = useContext(PostWallContext)
    const[posts, setPost]=useState([])
    const[comments, setComments]= useState([])

    useEffect(() => {
        FetchPosts().then((data)=> setPost(data))
        FetchComments().then((data)=> setComments(data))
    }, [])
    return(<>
            <h1>Church Posts</h1>
            
            <CardGroup>
            {posts.map((post) =>{
                return (<Link id="post-link" to={`/post/${post.id}`}><Post post={post}/></Link>)
            })}
            </CardGroup>
            
    </>)
}