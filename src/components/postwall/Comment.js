

import React, { useContext, useEffect, useState } from 'react';
import { Card, Button, CardTitle, CardText } from 'reactstrap';
import { UserContext } from '../user/UserProvider';

export const Comment = ({comment}) => {
    const [user, setUser] = useState({})
    const {FetchUser} = useContext(UserContext)
    const checkUser = ()=>{
        if (comment.userId === localStorage.getItem("waymaker_user") && localStorage.getItem("waymaker_church") === null){
            return true
        }else{
            return false
        }
    }
    
    useEffect(() =>{
        FetchUser(comment.userId).then((data) => setUser(data))
    },[comment])
  return (
    <div>
      <Card body>
        <CardTitle tag="h5">{user.name}</CardTitle>
        <CardText>{comment.description}</CardText>
        {checkUser() ?<Button>Go somewhere</Button>:""}
      </Card>
     
    </div>
  );
};