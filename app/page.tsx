"use client";

import { useEffect } from "react";
import { useUser } from "./providers/UserProvider";
import { Flex } from "@chakra-ui/react";

export default function Home() {
  console.log("home page loaded");
  const { user } = useUser();

  useEffect(() => {
    if (!user) {
      throw new Error("User must be provided to Home component");
    }
  }, []);

  return (
    <Flex flex="1" alignItems="center" justifyContent="center">
      <h1>Welcome! {user && user.name}</h1>
    </Flex>
  );
}
