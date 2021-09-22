import React from "react"
import { useState } from "react"
import { Link } from "react-router-dom"
import { Nav, Navbar, NavbarBrand, NavbarToggler, NavLink, NavItem, Collapse } from "reactstrap"
import { UserProvider } from "../user/UserProvider"
import "./NavBar.css"
import { Search } from "./searchbar/Search"
import Logo from "../../images/Logo.png"

export const NavBar = () =>{
    const currentChurch = localStorage.getItem("waymaker_church")
    const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);
    return (
        
        <Navbar color="light" light-expand="md" >
            
            <NavbarBrand href="/" className="navlogo">
            <img id="navpic"src={Logo}></img>
            WayMaker
            </NavbarBrand>
            <Nav className="mr-auto" >
                <NavItem>
                    {currentChurch ? 
                            <NavLink href={`/churchprofile/${localStorage.getItem("waymaker_church")}`}>Your Church</NavLink>
                            :
                            <NavLink href={`/profile/${localStorage.getItem("waymaker_user")}`}>Your Profile</NavLink>
                }
                </NavItem>
                <NavItem >
                    <NavLink href="/jobpostings">Job Postings</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink href="/login" onClick={()=>{
                        localStorage.removeItem("waymaker_church")
                        localStorage.removeItem("waymaker_user")}}>
                    Logout</NavLink>
                </NavItem>
                <NavItem>
                    <UserProvider>
                        <Search />

                    </UserProvider>
                </NavItem>
            </Nav>
            
        </Navbar>
        
     
    )
}