"use client";
import React, { createContext, useEffect, useState, useContext } from "react";
import { UserForm } from "../components/UserForm";

export type User = { name: string; jobTitle: string };
type UserContextType = {
    user: User | null;
    saveUser: (user: User) => void;
    setEditingUser: (editing: boolean) => void;
    editingUser: boolean;
};

export const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) throw new Error("useUser must be used within UserProvider");
    return context;
}


export const UserProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [editingUser, setEditingUser] = useState(false);

    useEffect(() => {
        const stored = localStorage.getItem("user");

        if (stored) {
            setUser(JSON.parse(stored));
        }
    }, [editingUser]);

    const saveUser = (user: User) => {
        setUser(user);
        localStorage.setItem("user", JSON.stringify(user));
        setEditingUser(false);
    };

    return (
        <UserContext.Provider value={{ user, saveUser, editingUser, setEditingUser }}>
            {user && children}
            {(!user || editingUser) && <UserForm saveUser={saveUser} editingUser={editingUser} />}
        </UserContext.Provider>
    );
}