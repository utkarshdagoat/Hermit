"use client";

import React from "react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@nextui-org/react";
import { useAccount, useDisconnect } from "wagmi";
import { Input } from "@nextui-org/react";

interface ProfileProps {
  email: string;
  logout: () => void;
}

export default function Profile(props: ProfileProps) {
  const { address } = useAccount();
  const {disconnect} = useDisconnect()
  const handleClick = async () => {
    disconnect();
    await props.logout()
  }

  return (
    <Dropdown>
      <DropdownTrigger>
        <Button variant="light">Profile</Button>
      </DropdownTrigger>
      <DropdownMenu>
        <DropdownItem key="email" className="inline-flex">
          <span>{props.email}</span>
        </DropdownItem>
        <DropdownItem key="address">
          <Input readOnly value={address}></Input>
        </DropdownItem>
        <DropdownItem
          key="logout"
          className="text-danger"
          color="danger"
          onClick={handleClick}
        >
          Logout
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}
