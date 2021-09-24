import { createContext,  useState} from "react";


export const AuthContext = createContext()

export const AuthProvider = (props) =>{
    const [users, setUsers] = useState([])
    const [churches, setChurches] = useState([])

    const FetchUsers = () =>{
        return fetch("https://waymaker-api-bdy6w.ondigitalocean.app/users")
            .then(res => res.json())
            .then((data) => {
                setUsers(data)
            })
    }
    const FetchChurches = () =>{
        return fetch("https://waymaker-api-bdy6w.ondigitalocean.app/churches")
            .then(res => res.json())
            .then((data) => {
                setChurches(data)
            })
    }
    const PostUser = (object) => {
        const fetchOption = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(object)
        }
        
        return fetch("https://waymaker-api-bdy6w.ondigitalocean.app/users", fetchOption)
            .then((res)=> res.json())
    }
    const PostChurch = (object) => {
        const fetchOption = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(object)
        }
        
        return fetch("https://waymaker-api-bdy6w.ondigitalocean.app/churches", fetchOption)
            .then((res)=> res.json())
    }
    const FetchCurrentUser = (id) => {
        return fetch(`https://waymaker-api-bdy6w.ondigitalocean.app/users/${id}`)
            .then(res => res.json())
            
    }
   return( <AuthContext.Provider value={{
        users, churches, FetchChurches, FetchUsers, PostUser, PostChurch, FetchCurrentUser
    }}>
        {props.children}
    </AuthContext.Provider>
   )
}