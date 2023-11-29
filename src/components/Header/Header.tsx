"use client"
import { useThemeManager } from "../ThemeProvider/ThemeProvider";
import styles from "./Header.module.css";
import { IoMdMoon } from "react-icons/io";



export default function Header() {
    const {switchTheme} = useThemeManager();

    return (
        <header className={styles.header}>
            <h1 className={styles.heading}>Where in the world?</h1>
            <div className={styles.modeContainer} onClick={() => {switchTheme()}}>
                <IoMdMoon className={styles.icon}/>
                <p><b>Dark mode</b></p>
            </div>
		</header>
    )
}