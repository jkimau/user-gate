"use client";

import { useUser } from "@/providers/UserProvider";
import { Button, Flex, Link } from "@chakra-ui/react"

export const Header = () => {
    const { user, setEditingUser } = useUser();

    const handleEditButtonClick = () => {
        console.log('Edit button clicked');

        setEditingUser(true);
        // This will trigger the UserForm to open
        // The UserForm component will handle the editing logic
    };

    return (
        <header>
            <Flex
                bg="teal.500"
                color="white"
                p={4}
                alignItems="center"
            >

                <Flex
                    as="nav"
                    alignItems="center"
                    width="50%"
                >

                    <Link href="/" px={3}>Home</Link>
                    <Link href="/information" px={3}>Information</Link>
                </Flex>
                <Flex
                    p={2}
                    justifyContent="flex-end"
                    alignItems="center"
                    width="50%"
                >
                    {user ? (
                        <>
                            {user.name} ({user.jobTitle})
                            <Button ml={4} size="sm" onClick={() => handleEditButtonClick()}>
                                Edit
                            </Button>
                        </>
                    ) : null}
                </Flex>
            </Flex>
        </header>
    );
}