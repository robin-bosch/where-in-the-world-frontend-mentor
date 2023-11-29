import toUrlConverter from "@/lib/toUrlConverter"
import styles from "./CountryCard.module.css"
import Link from "next/link"
import formatToReadableNumber from "@/lib/formatToReadableNumber"

interface CountryCardProps {
    name: string,
    population: number,
    region: string,
    capital: string,
    flagUrl: string
}

export default function CountryCard({name, population, region, capital, flagUrl}: CountryCardProps) {
    return(
        <Link href={`/country/${toUrlConverter(name)}`}>
            <div className={styles.countryCard}>
                <img src={flagUrl} alt={`Flag of ${name}`} className={styles.countryFlag}/>
                <div className={styles.informationContainer}>
                    <h2 className={styles.heading}>{name}</h2>
                    <p><b>Population:</b> {formatToReadableNumber(population)}</p>
                    <p><b>Region:</b> {region}</p>
                    <p><b>Capital:</b> {capital}</p>
                </div>
            </div>
        </Link>
    )
}