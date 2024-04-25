"use client"

import { Dispatch, SetStateAction, createContext, useContext, useMemo, useState } from "react";
import { type GameDetailsProps } from "@/lib/definitions";

type AppProviderProps = {
    children?: React.ReactNode;
}

type AppContext = {
    classes: string[],
    games: GameDetailsProps;
    setClasses: Dispatch<SetStateAction<never[]>>,
    setGames: Dispatch<SetStateAction<{ data: never[]; game_week: never[]; }>>
    updateGameResult: (response: any) => void,
    isFinals: boolean,
    setIsFinals: Dispatch<SetStateAction<boolean>>,
}

const AppContext = createContext<AppContext | null>(null);

export const AppProvider = ({ children }: AppProviderProps) => {
    const [isFinals, setIsFinals] = useState(false);
    const [classes, setClasses] = useState([]);
    const [games, setGames] = useState({
        data: [],
        game_week: []
    });

    const updateGameResult = (response: any) => {
        const { data } = response;
        setGames(state => ({
            ...state,
            data: data
        }))
    }

    const value = useMemo(
        () => ({
            classes,
            games,
            setClasses,
            setGames,
            updateGameResult,
            isFinals,
            setIsFinals,
        }),
        [classes, games, isFinals]
    );
    return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
    const context = useContext(AppContext);

    if (!context) {
        throw new Error('useAppContext must be used with AppContext')
    }

    return context;
};

