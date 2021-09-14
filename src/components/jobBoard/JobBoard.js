import { Button } from "reactstrap"
import { useHistory} from "react-router"
import { JobBoardContext } from "./JobBoardProvider"
import { useContext } from "react"
import { JobList } from "./JobBoardList"
import {useEffect} from "react"
export const JobBoard = () => {
    const history = useHistory()
    const currentUser = localStorage.getItem("waymaker_user")
    const currentChurch = localStorage.getItem("waymaker_church")
    const {jobs, FetchJobs} = useContext(JobBoardContext)
    useEffect(() => {
        FetchJobs()
        
    }, [])
    return (<><h1>JobBoard</h1>
                
                <JobList alljobs={jobs} />
                {currentChurch ? <Button color="success"onClick={() => history.push("/jobpostings/post")}>Post Job</Button> : ""}

    </>)
}