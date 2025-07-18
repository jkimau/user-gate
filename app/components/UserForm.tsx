"use client";
import React, { useEffect, useState } from "react";
import type { User } from "../providers/UserProvider";
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    FormControl,
    FormLabel,
    Input,
    Button,
    useDisclosure,
    useToast
} from "@chakra-ui/react";

export const UserForm = ({ saveUser, editingUser }: {
    saveUser: (user: User) => void,
    editingUser: boolean
}) => {
    const { isOpen, onClose, onOpen } = useDisclosure({ isOpen: true });
    const [name, setName] = useState("");
    const [jobTitle, setJobTitle] = useState("");
    const [editing, setEditing] = useState(false);
    const toast = useToast();

    const handleSave = () => {
        const newUser: User = { name, jobTitle };
        saveUser(newUser);
        setEditing(false);
        onClose();
        toast({ title: 'User info saved.', status: 'success', duration: 2000 });
    };

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (editingUser && storedUser) {
            const parsedUser = JSON.parse(storedUser);
            if (parsedUser) {
                setName(parsedUser.name);
                setJobTitle(parsedUser.jobTitle);
                setEditing(true);
                onOpen();
            }
        }
    }, [editingUser, onOpen]);

    return (
        <Modal isOpen={isOpen}
            onClose={() => { }}
            closeOnOverlayClick={false}
            closeOnEsc={false}
            isCentered>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>{editing ? 'Edit Your Info' : 'Enter Your Info'}</ModalHeader>
                <ModalBody>
                    <FormControl>
                        <FormLabel>Name</FormLabel>
                        <Input value={name} onChange={(e) => setName(e.target.value)} />
                    </FormControl>
                    <FormControl mt={4}>
                        <FormLabel>Job Title</FormLabel>
                        <Input value={jobTitle} onChange={(e) => setJobTitle(e.target.value)} />
                    </FormControl>
                </ModalBody>
                <ModalFooter>
                    <Button
                        colorScheme="blue"
                        onClick={handleSave}
                        isDisabled={!name || !jobTitle}
                    >
                        Save
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}
