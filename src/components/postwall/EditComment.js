import { useContext, useEffect, useState } from "react"
import { useHistory, useParams } from "react-router"
import { Button, Form, FormGroup, Input, Label } from "reactstrap"
import { PostWallContext } from "./PostWallProvider"


export const EditComment = () => {
    const {commentId} = useParams()
    const {FetchCommentForEdit, EditPostComment} = useContext(PostWallContext)
    const [comment, setComment] = useState({})
    const [description, setDescription] = useState("")
    const history = useHistory()
    useEffect(() => {
        FetchCommentForEdit(commentId).then((data) => setComment(data))
    }, [commentId])
    return(<><h1>Edit Post</h1>
            
            <Form>
                <FormGroup>
                    <Label for="comment">Comment Description</Label>
                    <Input name="comment" defaultValue={comment.description} onChange={(event) => setDescription(event.target.value)}></Input>
                </FormGroup>
            </Form>
            <Button size="lg" color="success" onClick={() => {
                EditPostComment( commentId,description).then(() => history.goBack())
            }}>Save!</Button>
    </>)
}