import { Button } from "reactstrap"
import { useHistory} from "react-router"
import { JobBoardContext } from "./JobBoardProvider"
import { useContext } from "react"
import { JobList } from "./JobBoardList"
import {useEffect} from "react"
import "./JobBoard.css"
export const JobBoard = () => {
    const history = useHistory()
    const currentUser = localStorage.getItem("waymaker_user")
    const currentChurch = localStorage.getItem("waymaker_church")
    const {jobs, FetchJobs, searchTerm, setSearchTerm,FetchSearchedJobs, setJobs} = useContext(JobBoardContext)
    useEffect(() => {
        FetchJobs()
        
    }, [])
    useEffect(() => {
        FetchSearchedJobs(searchTerm)
    }, [searchTerm])
    return (<section id="job-board-container"><h1 id="jobboard-h1">JobBoard</h1>
    
                <div id="joboard-search-button">
                    
                    <input type="text"  spellCheck="false" placeholder="Search by Position" onKeyUp={(event)=> setSearchTerm(event.target.value)}/>
                    <span className="material-icons instant-search__icon">search</span>
                    {currentChurch ? <Button color="success"onClick={() => history.push("/jobpostings/post")}>Post Job</Button> : ""}
                </div>
                <JobList alljobs={jobs} setJobs={setJobs}/>
                

    </section>)
}