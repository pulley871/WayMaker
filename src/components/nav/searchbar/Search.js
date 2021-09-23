import { useState, useEffect, useContext } from "react"
import "./Search.css" 
import { CloudinaryContext, Image, Transformation } from 'cloudinary-react';
import { SearchPic } from "./SearchProfilePic";
import { UserContext } from "../../user/UserProvider";

export const Search =() => {
    const[searchTerm, setSearchTerm] = useState("")
    const searchUsers = document.querySelector("#searchUsers")
    const [searchResults, setSearchResults] = useState([])
    const {FetchPictures, }  = useContext(UserContext)
    // setTimeout(()=>{ functionToDelay()}, millaseconds(500))
    



    const search = ()=>{
        let arr = []
        if (searchTerm !== ""){
             fetch(`https://waymaker-api-bdy6w.ondigitalocean.app/users?name_like=${encodeURI(searchTerm)}`)
                    .then(res => res.json())
                    .then((data) => {
                        const stuff = data.map((item)=> {
                            item.isChurch = false
                            arr.push(item)})
                        return Promise.all(stuff)
                    })
            
            .then(fetch(`https://waymaker-api-bdy6w.ondigitalocean.app/churches?name_like=${encodeURI(searchTerm)}`)
                    .then(res => res.json())
                    .then((data) => {
                        const stuff = data.map((item)=> {
                        item.isChurch = true
                        arr.push(item)})
                        return Promise.all(stuff)
                    })
            
                )
            .then( ()=> setSearchResults(arr))       
        }else if (searchTerm === ""){
            setSearchResults([])
        }
    }
    useEffect(() =>{
        FetchPictures(0, true)
        FetchPictures(0, false)
    },[])
    useEffect(()=>{
        search()
        
    },[searchTerm])
    return(
            <div id="searchUsers" className="instant-search">
                <div className="instant-search__input-container ">
                    <input type="text" className="instant-search__input" spellCheck="false" placeholder="Search Users" onKeyUp={(event)=> setSearchTerm(event.target.value)}/>
                    <span className="material-icons instant-search__icon">search</span>
                </div>
                <div className={searchResults !== [] ? "instant-search__results-container--visible": "instant-search__results-container"}>
                    
                    {searchResults.map((result)=>{
                        return(<a key={`result-${result.name}`} href={result.isChurch ? `/churchprofile/${result.id}` : `/profile/${result.id}`}className="instant-search__result">
                        
                        <SearchPic id={result?.id} bool={result?.isChurch} />
                        <section>
                        <div key={result.name}className="instant-search__title">{result.name}</div>
                        <p key={`result-${result.name}-${result.instrument} `} className="instant-search__paragraph">{result.instrument}</p>
                        </section>
                    </a>)
                    })}
                    
                    
                </div>
            </div>
            )
}