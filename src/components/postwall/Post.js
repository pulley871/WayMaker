import React, {useEffect, useState, useContext} from 'react';
import { Card, CardBody, Button, CardTitle, CardText, CardImg, Media } from 'reactstrap';
import { JobBoardContext } from "../jobBoard/JobBoardProvider"
import { CommentList } from './CommentList';
import { PostWallContext } from './PostWallProvider';
import "./PostWall.css"
import { Link } from 'react-router-dom';
import { CommentProvider } from './CommentProvider';
export const Post = ({post}) => {
    const [comments, setComments] = useState([])
    const {FetchChurches } = useContext(JobBoardContext)
    const [church,  setChurch] = useState({})
    const {FetchComments, DeletePost, FetchPosts} = useContext(PostWallContext)
    const update = () =>{
        FetchComments(post.id).then((data) => setComments(data.reverse()))
    }
    useEffect(()=>{
        FetchChurches().then((data) =>{
            const found = data.find((church) => church.id === post.churchId)
            setChurch(found)
        })
        update()
        
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
                <CardTitle tag="h5">{church?.name}</CardTitle>
                <CardText>{post.description}</CardText>
                </article>
            </div>
            
            <CardText>
                <CommentProvider>
                    <CommentList update={update}comments={comments}postId={post.id} button={true}/>
                </CommentProvider>
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