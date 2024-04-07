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

export default function Profile() {
  const { address } = useAccount();
  const { disconnect } = useDisconnect();
  return (
    <Dropdown>
      <DropdownTrigger>
        <Button variant="light">Profile</Button>
      </DropdownTrigger>
      <DropdownMenu>
        <DropdownItem key="email" className="inline-flex">
          <span>abcd@gmail.com</span>
        </DropdownItem>
        <DropdownItem key="copy">
          <Input readOnly value={address}></Input>
        </DropdownItem>
        <DropdownItem
          key="logout"
          className="text-danger"
          color="danger"
          onClick={() => {
            disconnect();
          }}
        >
          Logout
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}
