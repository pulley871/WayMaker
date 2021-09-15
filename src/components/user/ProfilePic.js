import { useState } from "react"
import { CloudinaryContext, Image, Transformation } from 'cloudinary-react';
import axios from "axios"
import { Input,  Button } from "reactstrap"

export const ProfilePic = ({userId}) => {
    const [imageSelected, setImageSelected] = useState("")

    const uploadImage = () =>{
        
        const formData = new FormData()
        formData.append("file",imageSelected)
        formData.append("upload_preset", "ubjoump8")
        formData.append("public_id", `userpic--${userId}`)
        axios.post("https://api.cloudinary.com/v1_1/dcaryjezn/image/upload", formData)
        .then((response)=>console.log(response))
    }
    return(<>{console.log(userId)}
        <CloudinaryContext cloudName="dcaryjezn">
                <div id="churchProfilePic">
                    <Image publicId={`userpic--${userId}`} width="100" />
                    <Transformation fetchFormat="auto"/>
                </div>
                    
            {console.log(imageSelected)}
            </CloudinaryContext>
            <div>
                <Input type="file" onChange={(event)=> setImageSelected(event.target.files[0])}></Input>
                <Button onClick={()=>{
                    uploadImage()
                }}>Submit</Button>
            </div>
            </>
    )
}