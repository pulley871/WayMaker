import { useContext, useState, useEffect } from "react"
import { Link, useHistory } from "react-router-dom"
import { Button, CardGroup } from "reactstrap"
import { Post } from "./Post"
import { PostWallContext } from "./PostWallProvider"



export const PostWall = () =>{
    const {FetchPosts,  posts} = useContext(PostWallContext)
    
    
    const history = useHistory()
    useEffect(() => {
        FetchPosts()
        
    }, [])
   
    return(<>
            <h1 id="home-h1">Welcome Back To WayMaker</h1>
            <h3 id="home-h3">RECENT POST</h3>
            {localStorage.getItem("waymaker_church") !== null ? 
            <Button id="home-postbutton"size="lg"color="primary" onClick={()=> history.push("/newpost")}>Post</Button>:""}  
            <CardGroup>
            {posts?.map((post) =>{
                return (<Link className="post-link"key={`postlink-${post.id}`}id="post-link" to={`/post/${post.id}`}><Post key={`post-${post.id}`}post={post}/></Link>)
            })}
            </CardGroup>
            
    </>)
}