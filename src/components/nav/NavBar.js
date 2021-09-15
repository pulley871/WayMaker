import React from "react"
import { useState } from "react"
import { Link } from "react-router-dom"
import { Nav, Navbar, NavbarBrand, NavbarToggler, NavLink, NavItem, Collapse } from "reactstrap"
import "./NavBar.css"
import { Search } from "./searchbar/Search"
export const NavBar = () =>{
    const currentChurch = localStorage.getItem("waymaker_church")
    const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);
    return (
        
        <Navbar color="light" light-expand="md" >
            
            
            <Nav className="mr-auto" >
                <NavItem>
                    <NavLink className="navlink"href="/jobpostings">Job Postings</NavLink>
                </NavItem>
                <NavItem>
                    {currentChurch ? 
                            <NavLink href={`/churchprofile/${localStorage.getItem("waymaker_church")}`}>Your Church</NavLink>
                            :
                            <NavLink href={`/profile/${localStorage.getItem("waymaker_user")}`}>Your Profile</NavLink>
                }
                </NavItem>
                <NavItem>
                    <NavLink href="/login" onClick={()=>{
                        localStorage.removeItem("waymaker_church")
                        localStorage.removeItem("waymaker_user")}}>
                    Logout</NavLink>
                </NavItem>
                <NavItem>
                    <Search />
                </NavItem>
            </Nav>
            <NavbarBrand href="/">WayMaker</NavbarBrand>
        </Navbar>
        
        // <ul className="navbar navbar-light bg-light navbar-expand-lg">
        //     <li className="navbar__item  btn btn-outline-success me-2">
        //         <Link className="navbar_link" to="/jobpostings" >Job Postings</Link>
        //     </li>
        //     <li className="navbar__item  btn btn-outline-success me-2">
        //         {currentChurch ? 
        //         <Link className="navbar_link" to="/churchprofile">Your Church</Link>
        //         :
        //         <Link className="navbar_link" to="/profile">Your Profile</Link>
                
        //         }
        //     </li>
            
        //     <li className="navbar__item  btn btn-outline-success me-2">
        //         <Link className="navbar_link" to="/search" >Search Users</Link>
        //     </li>
        //     <li className="navbar__item  btn btn-outline-success me-2">
        //         <Link className="navbar_link" to="/login" onClick={()=>{
        //             localStorage.removeItem("waymaker_church")
        //             localStorage.removeItem("waymaker_user")
        //             }}>Logout</Link>
        //     </li>
        // </ul>
    )
}