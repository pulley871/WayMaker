import React, {useEffect, useState, useContext} from 'react';
import { Card, CardBody, Button, CardTitle, CardText, CardImg, Media } from 'reactstrap';
import { JobBoardContext } from "../jobBoard/JobBoardProvider"
import { CommentList } from './CommentList';
import { PostWallContext } from './PostWallProvider';
import "./PostWall.css"
export const Post = ({post}) => {
    const [comments, setComments] = useState([])
    const {FetchChurch, church, } = useContext(JobBoardContext)
    const {FetchComments} = useContext(PostWallContext)
    useEffect(()=>{
        FetchChurch(post.churchId)
        FetchComments(post.id).then((data)=>setComments(data))
    },[post])
  return (
    <div>
        
        <Card >
            <div className="post-container">
            <iframe src="https://www.youtube.com/embed/I6cpY-RY4X8"
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
            
        </Card>
    </div>)
}