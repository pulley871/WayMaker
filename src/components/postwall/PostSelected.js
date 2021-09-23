import { useParams } from "react-router"
import { JobBoardContext } from "../jobBoard/JobBoardProvider"
import { CommentList } from './CommentList';
import { PostWallContext } from './PostWallProvider';
import React, {useEffect, useState, useContext} from 'react';
import { Card, CardBody, Button, CardTitle, CardText, CardImg, Media, Form, FormGroup, Label, Input } from 'reactstrap';
import "./PostWall.css"
import { UserContext } from "../user/UserProvider";
export const SelectedPost = () =>{
    const {postId} = useParams()
    
    const [post, setPost] = useState({})
    const [comment, setComment] = useState("")
    const {FetchChurch, church, } = useContext(JobBoardContext)
    const {FetchComments, FetchPost, PostComments} = useContext(PostWallContext)
    const {FetchPictures}  = useContext(UserContext)
    const [comments, setComments] = useState([])
    const checkUser = ()=>{
        if (localStorage.getItem("waymaker_user") && localStorage.getItem("waymaker_church") === null){
            return true
        }else{
            return false
        }
    }
    const update = () =>{
        FetchPictures(0,false)
        
        FetchComments(postId).then((data) => setComments(data.reverse()))

        
    }
    useEffect(() =>{
        FetchPost(postId).then((data) =>setPost(data))
        update()
    },[postId])
    useEffect(()=>{
        
        if (post.churchId !== undefined){
            FetchChurch(post.churchId)

        }
    },[post])
    useEffect(() =>{
        setComment("")
    },[comments])
    return(
        <div>
        <Card >
            <iframe src={post.videoUrl}
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
                    
                    PostComments(object).then(()=> update())
                }}>Add Comment</Button>
                
            </FormGroup>
        </Form>
        : ""}
        <div id="comment-list-container">
            <CommentList  comments={comments} update={update}button={false} postId={post.id}/>
        </div>
    </div>
    )
}