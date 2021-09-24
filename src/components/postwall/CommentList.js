import React, { useContext, useEffect, useState } from 'react';
import { UncontrolledCollapse, Button, CardBody, Card } from 'reactstrap';
import { Comment } from './Comment';
import { CommentContext } from './CommentProvider';
import "./PostWall.css"
import { PostWallContext} from './PostWallProvider';
export const CommentList = ({update,comments,button, postId}) => {
    
    useEffect(() =>{
        
    }, [button])


return(

    
  <>
  
    {button ? <div className="post-comments-container"><Button  color="link" id="toggler" style={{ marginBottom: '1rem' }}>
      {comments?.length} Comments
    </Button>
    
    <UncontrolledCollapse toggler="#toggler">
      <div>
          {comments?.map((comment)=>{
              return (<Comment comment={comment} update={update}/>)
          })}
      </div>
    </UncontrolledCollapse>
    </div>: <div>
          {comments?.map((comment)=>{
              return (<Comment comment={comment} postId={postId} update={update}/>)
          })}
      </div>}
  </>
);
        }
