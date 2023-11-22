"use client"


import styles from "./CardDisplay.module.css"
import CountryCard from "../CountryCard/CountryCard";


export default function CardDisplay({countryList}: any) {

    return (
        <section className={styles.countriesContainer}>
				{countryList.length > 0 ? countryList.map((country: any) => {
					return (
						<CountryCard 
							key={country.name.common}
							name={country.name.common}
							population={country.population}
							region={country.region}
							capital={country.capital}
							flagUrl={country.flags.png}
						/>
					);
				}) : <h2>No countries to display</h2>
            }
		</section>
    )
    
}