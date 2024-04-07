import React from "react";
import {Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button} from "@nextui-org/react";
import Profile from "./profile";

export default function NavBar() {
  return (
    <Navbar isBordered>
      <NavbarBrand>
        <p className="font-bold text-inherit">HERMIT</p>
      </NavbarBrand>
      
      <NavbarContent justify="end">
        <NavbarItem className="hidden lg:flex">
          <Profile />
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
