import { useContext, useEffect, useState } from "react"
import { useHistory, useParams } from "react-router"
import { Button, Form,FormGroup, Input, Label, Tooltip } from "reactstrap"
import { JobBoardContext } from "../jobBoard/JobBoardProvider"
import { PostWallContext } from "./PostWallProvider"


export const EditPost = () => {
    const {postId} = useParams()
    const [postTitle, setTitle] = useState("")
    const [postDescription, setDescription] = useState("")
    const [postURL, setURL] = useState("")
    const {FetchChurch, church} = useContext(JobBoardContext)
    const [post, setPost] = useState({})
    const {EditWallPost, FetchPosts, FetchPost} = useContext(PostWallContext)
    const churchId = parseInt(localStorage.getItem("waymaker_church"))
    const [tooltipOpen, setTooltipOpen] = useState(false)
    const toggle = () => setTooltipOpen(!tooltipOpen);
    const history = useHistory()
    useEffect(() => {
        FetchPost(postId).then((data)=> setPost(data))
    }, [])
    useEffect(() => {
        FetchChurch(churchId)
        setDescription(post.description)
        setTitle(post.title)
        setURL(post.videoUrl)
    }, [post])
    return(<>
            <Form>
                <h3>{church.name}</h3>
                <FormGroup>
                    <Label for="posttitle">Title of Post</Label>
                    <Input type="text" name="posttitle" defaultValue={post.title}placeholder="Enter Your Title Here" onChange={(event) => {
                        setTitle(event.target.value)
                    }}></Input>
                </FormGroup>
                <FormGroup>
                    <Label for="postdescription">Description of Post</Label>
                    <Input type="textarea" name="postdescription" defaultValue={post.description}placeholder="Enter Your Description Here Here" onChange={(event) => {
                        setDescription(event.target.value)
                    }}></Input>
                </FormGroup>
                <FormGroup>
                    <Label for="posturl">Youtube Embeded URL</Label>
                    <Input id="posturl"type="url" name="posturl" defaultValue={post.videoUrl}placeholder="Enter Your URL Here" onChange={(event) => {
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
                EditWallPost(post.id,postObject).then(()=> FetchPosts()).then(()=> history.push("/"))
            }}>Edit!</Button>
    </>)
}
// {
//     "churchId": 1,
//     "title": "Come on down",
//     "description": "Lets meet the man the myth the legend",
//     "videoUrl": "https://www.youtube.com/embed/BqVziS8LYSQ",
//     "id": 2
//   }