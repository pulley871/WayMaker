import React, {useEffect, useState, useContext} from 'react';
import { Card, CardBody, Button, CardTitle, CardText, CardImg, Media } from 'reactstrap';
import { JobBoardContext } from "../jobBoard/JobBoardProvider"
import { CommentList } from './CommentList';
import { PostWallContext } from './PostWallProvider';
import "./PostWall.css"
import { Link } from 'react-router-dom';
export const Post = ({post}) => {
    const [comments, setComments] = useState([])
    const {FetchChurch, church, } = useContext(JobBoardContext)
    const {FetchComments, DeletePost, FetchPosts} = useContext(PostWallContext)
    useEffect(()=>{
        FetchChurch(post.churchId)
        FetchComments(post.id).then((data)=>setComments(data))
    },[post])
  return (
    <div>
        
        <Card >
            <div className="post-container">
            <iframe src={post.videoUrl}
            title="YouTube video player" 
            frameBorder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
            allowfullscreen/>
            
                <article className="post-container_info">
                <CardTitle tag="h5">{church.name}</CardTitle>
                <CardText>{post.description}</CardText>
                </article>
            </div>
            
            <CardText>
                <CommentList comments={comments} button={true}/>
                
            </CardText>
            {post.churchId === parseInt(localStorage.getItem("waymaker_church")) ?
            <div id="postcardbuttons">
                <Link to="#" onClick={()=>{
                    DeletePost(post.id).then(()=>FetchPosts())
                }}>
                    <span class="material-icons">delete</span>
                </Link>
                <Link to={`/editpost/${post.id}`}>
                    <span class="material-icons">edit</span>
                </Link>
            </div>:""}
        </Card>
    </div>)
}