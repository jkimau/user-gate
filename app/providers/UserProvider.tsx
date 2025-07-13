"use client";
import React, { createContext, useEffect, useState } from "react";
import { UserForm } from "../components/UserForm";

export type User = { name: string; jobTitle: string };
type UserContextType = {
    user: User | null;
    setUser: (user: User) => void;
};

export const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const stored = localStorage.getItem("user");

        if (stored) {
            setUser(JSON.parse(stored));
        }
    }, []);

    const saveUser = (user: User) => {
        setUser(user);
        localStorage.setItem("user", JSON.stringify(user));
    };

    return (
        <UserContext.Provider value={{ user, setUser: saveUser }}>
            {user ? children : <UserForm saveUser={saveUser} />}
        </UserContext.Provider>
    );
}