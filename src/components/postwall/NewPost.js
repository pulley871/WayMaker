import { useContext, useEffect, useState } from "react"
import { useHistory } from "react-router"
import { Button, Form,FormGroup, Input, Label, Tooltip } from "reactstrap"
import { JobBoardContext } from "../jobBoard/JobBoardProvider"
import { PostWallContext } from "./PostWallProvider"


export const NewPostForm = () => {
    const [postTitle, setTitle] = useState("")
    const [postDescription, setDescription] = useState("")
    const [postURL, setURL] = useState("")
    const {FetchChurch, church} = useContext(JobBoardContext)
    const {PostPost, FetchPosts} = useContext(PostWallContext)
    const churchId = parseInt(localStorage.getItem("waymaker_church"))
    const [tooltipOpen, setTooltipOpen] = useState(false)
    const toggle = () => setTooltipOpen(!tooltipOpen);
    const history = useHistory()
    useEffect(() => {
        FetchChurch(churchId)
    }, [])
    return(<>
            <Form>
                <h3>{church.name}</h3>
                <FormGroup>
                    <Label for="posttitle">Title of Post</Label>
                    <Input type="text" name="posttitle" placeholder="Enter Your Title Here" onChange={(event) => {
                        setTitle(event.target.value)
                    }}></Input>
                </FormGroup>
                <FormGroup>
                    <Label for="postdescription">Description of Post</Label>
                    <Input type="textarea" name="postdescription" placeholder="Enter Your Description Here Here" onChange={(event) => {
                        setDescription(event.target.value)
                    }}></Input>
                </FormGroup>
                <FormGroup>
                    <Label for="posturl">Youtube Embeded URL</Label>
                    <Input id="posturl"type="url" name="posturl" placeholder="Enter Your URL Here" onChange={(event) => {
                        setURL(event.target.value)
                    }}></Input>
                    <Tooltip placement="bottom" isOpen={tooltipOpen} autohide={false} target="posturl" toggle={toggle}>Please Use EMBEDED Youtube URL!</Tooltip>
                </FormGroup>
            </Form>
            <Button size="lg" color="success" onClick={()=>{
                const postObject = {
                    churchId: churchId,
                    title: postTitle,
                    description: postDescription,
                    videoUrl: postURL
                }
                PostPost(postObject).then(()=> FetchPosts()).then(()=> history.push("/"))
            }}>POST!</Button>
    </>)
}
// {
//     "churchId": 1,
//     "title": "Come on down",
//     "description": "Lets meet the man the myth the legend",
//     "videoUrl": "https://www.youtube.com/embed/BqVziS8LYSQ",
//     "id": 2
//   }