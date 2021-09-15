import { useState, useEffect } from "react"
import "./Search.css" 
import { CloudinaryContext, Image, Transformation } from 'cloudinary-react';

export const Search =() => {
    const[searchTerm, setSearchTerm] = useState("")
    const searchUsers = document.querySelector("#searchUsers")
    const [searchResults, setSearchResults] = useState([])
    // setTimeout(()=>{ functionToDelay()}, millaseconds(500))




    const search = ()=>{
        let arr = []
        if (searchTerm !== ""){
             fetch(`http://localhost:8088/users?name_like=${encodeURI(searchTerm)}`)
                    .then(res => res.json())
                    .then((data) => {
                        const stuff = data.map((item)=> arr.push(item))
                        return Promise.all(stuff)
                    })
            
            .then(fetch(`http://localhost:8088/churches?name_like=${encodeURI(searchTerm)}`)
                    .then(res => res.json())
                    .then((data) => {
                        const stuff = data.map((item)=> {
                        item.isChurch = true
                        arr.push(item)})
                        return Promise.all(stuff)
                    })
            
                )
            .then( ()=> setTimeout(()=>{setSearchResults(arr)}, 100))       
        }else if (searchTerm === ""){
            setSearchResults([])
        }
    }
    useEffect(()=>{
        setTimeout(()=>{search()}, 200)
        console.log(searchResults)
        console.log(searchTerm)
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
                        <CloudinaryContext cloudName="dcaryjezn">
                            <div id="churchProfilePic">
                                <Image publicId={result.isChurch ? `churchpic--${result.id}`:`userpic--${result.id}`} width="40" />
                                <Transformation fetchFormat="auto" crop="scale"/>

                            </div>
                    
            
                        </CloudinaryContext>
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