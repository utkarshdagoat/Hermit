import React from "react";
import {Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button} from "@nextui-org/react";
import Profile from "./profile";

interface NavBarProps {
  email: string;
  logout: () => void;
}

export default function NavBar(props:NavBarProps ) {
  return (
    <Navbar className="fixed" isBordered>
      <NavbarBrand>
        <p className="font-bold text-inherit">HERMIT</p>
      </NavbarBrand>
      
      <NavbarContent justify="end">
        <NavbarItem className="hidden lg:flex">
          <Profile {...props}/>
        </NavbarItem> 
      </NavbarContent>
    </Navbar>
  )
}
