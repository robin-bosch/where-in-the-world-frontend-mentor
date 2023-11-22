"use client"

import { createContext, useContext, useEffect, useState } from "react";

export enum Themes {
    Dark = "dark",
    Light = "light",
}

interface ThemeInterface<T = any> {
    theme: Themes,
    switchTheme: () => void;
}

const themeContext = createContext<ThemeInterface>({theme: Themes.Dark, switchTheme: () => {}})

export function ThemeProvider({children}: any): JSX.Element {
    const [theme, setTheme] = useState<Themes>(Themes.Dark);


    // useEffect(() => {
    //     setSavedTheme(theme);
    // }, [theme])

    function switchTheme() {
        setTheme(theme == Themes.Dark ? Themes.Light : Themes.Dark)
        setSavedTheme(theme == Themes.Dark ? Themes.Light : Themes.Dark)
    }

    useEffect(() => {
        setTheme(getSavedTheme());
    }, [])

    /**
     * Returns the saved theme.
     * If the theme is not valid or does not exist the default theme is selected which is based on the user preference for dark or light.
     * @returns - theme that has been saved
     */
function getSavedTheme(): Themes {
    const savedTheme = localStorage.getItem('theme');

    if (savedTheme && Object.values(Themes).includes(savedTheme as Themes)) {
        return savedTheme as Themes;
    }

    else {
        const defaultTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? Themes.Dark : Themes.Light;
        setSavedTheme(defaultTheme);

        return defaultTheme;
    }
}

/**
 * Sets theme in storage
 * @param theme - theme to set in the storage
 */
function setSavedTheme(theme: Themes) {
    localStorage.setItem("theme", theme);
}


    

    const themeValueContext: ThemeInterface = {
        theme,
        switchTheme,
    }


    return <themeContext.Provider value={themeValueContext}>
        <div className={`${theme}-theme`}>{children}</div>
    </themeContext.Provider>;
}

export function useThemeManager<T = any>(): ThemeInterface {
    return useContext(themeContext);
}