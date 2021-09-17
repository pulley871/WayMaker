import { useContext, useState, useEffect } from "react"
import { Link, useHistory } from "react-router-dom"
import { Button, CardGroup } from "reactstrap"
import { Post } from "./Post"
import { PostWallContext } from "./PostWallProvider"



export const PostWall = () =>{
    const {FetchPosts, FetchComments, posts} = useContext(PostWallContext)
    
    const[comments, setComments]= useState([])
    const history = useHistory()
    useEffect(() => {
        FetchPosts()
        
    }, [])
    useEffect(() =>{
        FetchComments().then((data)=> setComments(data))
    }, [posts])
    return(<>
            <h1>Welcome Back To WayMaker</h1>
            <h3>Recent Post</h3>
            <Button size="lg"color="primary" onClick={()=> history.push("/newpost")}>Post</Button>
            <CardGroup>
            {posts?.map((post) =>{
                return (<Link id="post-link" to={`/post/${post.id}`}><Post post={post}/></Link>)
            })}
            </CardGroup>
            
    </>)
}