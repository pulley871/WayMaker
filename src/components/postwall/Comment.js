

import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, Button, CardTitle, CardText } from 'reactstrap';
import { UserContext } from '../user/UserProvider';
import { CommentPic } from './CommentPic';
import { PostWallContext } from './PostWallProvider';
import "./PostWall.css"
export const Comment = ({comment, postId, update}) => {
    const [user, setUser] = useState({})
    const {FetchUser} = useContext(UserContext)
    const {DeleteComment, FetchComments} = useContext(PostWallContext)
    const checkUser = ()=>{
        if (comment.userId === parseInt(localStorage.getItem("waymaker_user")) && localStorage.getItem("waymaker_church") === null){
            return true
        }else{
            return false
        }
    }
    
    useEffect(() =>{
        FetchUser(comment.userId).then((data) => setUser(data))
    },[])
  return (
      
    <div className="comment-container">

      <Card body  >
          <article>
          <div>
          <CommentPic id={user.id} bool={false} />
          </div>
          <div>
        <CardTitle tag="h5">{user.name}</CardTitle>
        <CardText>{comment.description}</CardText>
        </div>
        <div>
        {checkUser() ?
            <div id="postcardbuttons">
                <Link to="#" onClick={()=>{
                    DeleteComment(comment?.id).then(()=> update())
                }}>
                    <span class="material-icons">delete</span>
                </Link>
                <Link to={`/editcomment/${comment.id}`}>
                    <span class="material-icons">edit</span>
                </Link>
            </div>:""}
            </div>
            </article>
      </Card>
     
    </div>
  );
};