"use client"
import { useState } from "react";

import styles from "@/styles/CardDisplay.module.css"
import CountryCard from "./CountryCard";


export default function CardDisplay({countries}) {
    const fullCountryList = countries;

    const [countriesDisplayed, setCountriesDisplayed] = useState(fullCountryList);



    function filterCountry(filter: string) {
        const newCountriesList = [];

        countries.forEach((country: any) => {
            if(country.name.common.includes(filter)) {
                newCountriesList.push(country);
            }
        })

        setCountriesDisplayed(countriesDisplayed);
    }

    return (
        <section className={styles.countriesContainer}>
				{countriesDisplayed.length > 0 ? countriesDisplayed.map((country: any) => {
					return (
						<CountryCard 
							key={country.name.common}
							url="none"
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