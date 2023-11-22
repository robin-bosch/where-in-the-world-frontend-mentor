"use client"
import { Themes, useThemeManager } from "../ThemeProvider/ThemeProvider";
import styles from "./Header.module.css";
import { IoMdMoon } from "react-icons/io";



export default function Header() {
    const {theme, setTheme} = useThemeManager();

    function switchTheme() {
        
    }
    return (
        <header className={styles.header}>
            <h1 className={styles.heading}>Where in the world?</h1>
            <div className={styles.modeContainer} onClick={() => {setTheme(theme == Themes.Dark ? Themes.Light : Themes.Dark)}}>
                <IoMdMoon className={styles.icon}/>
                <p>Dark mode</p>
            </div>
		</header>
    )
}