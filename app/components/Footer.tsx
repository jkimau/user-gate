"use client";

import { Flex } from "@chakra-ui/react"

export const Footer = () => {
    return (
        <Flex
            as="footer"
            bg="teal.500"
            color="white"
            p={4}
            justifyContent="flex-end"
            alignItems="center"
        >
            V3.5
        </Flex>
    );
}