import styles from "@/styles/CountryCard.module.css"
import Link from "next/link"

interface CountryCardProps {
    url: string,
    name: string,
    population: number,
    region: string,
    capital: string,
    flagUrl: string
}

export default function CountryCard({url, name, population, region, capital, flagUrl}: CountryCardProps) {
    return(
        <Link href={`/country/${name}`}>
            <div className={styles.countryCard}>
                <img src={flagUrl} alt={`Flag of ${name}`} className={styles.countryFlag}/>
                {/* <img src={`https://flagcdn.com/w320/${flagUrl.toLowerCase()}.png`} alt={`Flag of ${name}`} className={styles.countryFlag}/> */}
                <div className={styles.informationContainer}>
                    <h2 className={styles.heading}>{name}</h2>
                    <p><b>Population:</b> {population}</p>
                    <p><b>Region:</b> {region}</p>
                    <p><b>Capital:</b> {capital}</p>

                </div>
            </div>
        </Link>
    )
}