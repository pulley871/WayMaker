import React from 'react';
import { UncontrolledCollapse, Button, CardBody, Card } from 'reactstrap';
import { Comment } from './Comment';
import "./PostWall.css"
export const CommentList = ({comments, button}) => (

    
  <>
    {button ? <div className="post-comments-container"><Button  color="link" id="toggler" style={{ marginBottom: '1rem' }}>
      {comments.length} Comments
    </Button>
    
    <UncontrolledCollapse toggler="#toggler">
      <div>
          {comments.map((comment)=>{
              return (<Comment comment={comment} />)
          })}
      </div>
    </UncontrolledCollapse>
    </div>: <div>
          {comments.map((comment)=>{
              return (<Comment comment={comment} />)
          })}
      </div>}
  </>
);

