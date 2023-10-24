import styles from "@/styles/Header.module.css";


export default function Header() {
    return (
        <header className={styles.header}>
            <h1 className={styles.heading}>Where in the world?</h1>
            <div className={styles.modeContainer}>
                <p>Icon</p>
                <p>Dark mode</p>
            </div>
		</header>
    )
}