import { useParams } from "react-router"
import { JobBoardContext } from "../jobBoard/JobBoardProvider"
import { CommentList } from './CommentList';
import { PostWallContext } from './PostWallProvider';
import React, {useEffect, useState, useContext} from 'react';
import { Card, CardBody, Button, CardTitle, CardText, CardImg, Media, Form, FormGroup, Label, Input } from 'reactstrap';
import "./PostWall.css"
export const SelectedPost = () =>{
    const {postId} = useParams()
    const [comments, setComments] = useState([])
    const [post, setPost] = useState({})
    const [comment, setComment] = useState("")
    const {FetchChurch, church, } = useContext(JobBoardContext)
    const {FetchComments, FetchPost, PostComments} = useContext(PostWallContext)
    const checkUser = ()=>{
        if (localStorage.getItem("waymaker_user") && localStorage.getItem("waymaker_church") === null){
            return true
        }else{
            return false
        }
    }
    useEffect(() =>{
        FetchPost(postId).then((data) =>setPost(data))
    },[postId])
    useEffect(()=>{
        FetchChurch(post.churchId)
        FetchComments(post.id).then((data)=>setComments(data.reverse()))
    },[post])
    useEffect(() =>{
        setComment("")
    },[comments])
    return(
        <div>
        <Card >
            <iframe src="https://www.youtube.com/embed/I6cpY-RY4X8"
            title="YouTube video player" 
            frameBorder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
            allowfullscreen/>
            
            <CardBody>
            <CardTitle tag="h5">{church.name}</CardTitle>
            <CardText>{post.description}</CardText>
            
            </CardBody>
        </Card>
        {checkUser() ?
        <Form id="comment-container">
            <FormGroup>
                <Label for="commenttext">Write Comment</Label>
                <Input name="commenttext" type="textarea" placeholder="Comment Now!" value={comment}onChange={(event)=>{
                    setComment(event.target.value)
                }}></Input>
                 <Button  color="primary"id="comment-button" onClick={()=>{
                    let object = {
                        wallPostId: post.id,
                        userId: parseInt(localStorage.getItem("waymaker_user")),
                        description: comment
                    }
                    
                    PostComments(object).then(()=> FetchComments(post.id).then((data)=>setComments(data)))
                }}>Add Comment</Button>
                
            </FormGroup>
        </Form>
        : ""}
        <div id="comment-list-container">
            <CommentList comments={comments} button={false}/>
        </div>
    </div>
    )
}