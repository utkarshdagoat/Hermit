"use client";

import React, { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Input,
} from "@nextui-org/react";
import { uploadData } from "@/app/lib/ipfs/upload";

function Collaborate() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [file, setFile] = useState<File | null>(null);
  const [address, setAddress] = useState<string>("");

  async function handleVerification(e: React.FormEvent<HTMLFormElement>) {
    if (!file || !address) return;
    e.preventDefault();
    let cid = await uploadData(file);
    console.log("CID: ", cid);
  }


  return (
    <>
      <Button
        onPress={onOpen}
        size="lg"
        radius="full"
        className="bg-primary-red"
      >
        Collaborate
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col text-xl py-6 gap-1">
                Upload files and verify
              </ModalHeader>
              <ModalBody>
                <form onSubmit={handleVerification} className="flex flex-col gap-4">
                  <Input
                    label="File"
                    labelPlacement="outside-left"
                    type="file"
                    className="w-full"
                    variant="bordered"
                    onChange={(e) => {
                      const files = e.target.files;
                      if (files && files.length > 0) {
                        setFile(files[0]);
                        
                      }
                    }}
                    name="file"
                    size="lg"
                  />
                  <Input
                    placeholder="Collaborator's wallet address"
                    size="lg"
                    variant="underlined"
                    name="newAddress"
                    onChange={(e) => setAddress(e.target.value)}
                    required
                    color="danger"
                  />

                  <Button type="submit" color="danger">Notify and Verify</Button>
                </form>
              </ModalBody>
              <ModalFooter>
                <Button
                  color="success"
                  isDisabled
                  radius="full"
                  onPress={onClose}
                >
                  Sign in
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

export default function Page() {
  return (
    <div className="h-screen w-full flex flex-col gap-6 items-center justify-center">
      <h2 className="text-4xl uppercase font-semibold tracking-wider">
        Let's get started :)
      </h2>
      <Collaborate />
    </div>
  );
}
