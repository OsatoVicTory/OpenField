"use client";

import { DBUserType, DEFAULT_USER } from '@/types/app';
import React, { createContext, useState } from 'react';


const AppContext = createContext<{
    user: DBUserType,
    wallet: any[],
    setUser: React.Dispatch<DBUserType>,
    setWallet: React.Dispatch<any[]>,
}>({
    user: DEFAULT_USER,
    setUser: (prev: DBUserType) => {},
    wallet: [],
    setWallet: (prev: any[]) => {},
});

const AppProvider = ({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) => {
    // const [socket, setSocket] = useState<Socket | null>(null);
    const [user, setUser] = useState<DBUserType>(DEFAULT_USER);
    const [wallet, setWallet] = useState<any[]>([]);

    return (
        <AppContext.Provider value={{ 
            user, setUser, wallet, setWallet }}>
            {children}
        </AppContext.Provider>
    );
};

export { AppContext, AppProvider };