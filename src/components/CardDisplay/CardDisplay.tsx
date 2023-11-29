"use client"
import styles from "./CardDisplay.module.css"
import CountryCard from "../CountryCard/CountryCard";
import { useState } from "react";


interface CardDisplay {
    countryList: any[],
    currentDisplayList: any[],
    setCurrentDisplayList: (prevArray: any) => void,
    setCountryList: (prevArray: any) => void,
}

export default function CardDisplay({countryList, currentDisplayList, setCurrentDisplayList, setCountryList}: CardDisplay) {
	const [showLoadBtn, setShowLoadBtn] = useState(true);
	const [isLoading, setIsLoading] = useState(false);

	function loadMore() {
		setIsLoading(true);
		fetch(`/api/getAllCountries?page=${Math.ceil(countryList.length/24)+1}`).then((response) => {

			if(response.ok) {
				return response.json();
			}
			throw new Error("No pages left")
		
		}).then((data) => {
			setCountryList((prevArray: any[]) => [...prevArray, ...data]);
			setCurrentDisplayList((prevArray: any[]) => [...prevArray, ...data]);
		}).catch(() => {
			setShowLoadBtn(false);
		}).finally(() => {
			setIsLoading(false);
		})
	}

    return (
        <section className={styles.countriesDisplayContainer}>
			<div className={styles.countriesContainer}>
			{currentDisplayList.length > 0 ? currentDisplayList.map((country: any) => {
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
			</div>
			{isLoading && <div className={styles.ldsEllipsis}><div></div><div></div><div></div><div></div></div>}
			{JSON.stringify(currentDisplayList) === JSON.stringify(countryList) && showLoadBtn ? !isLoading && <div className={styles.moreBtn} onClick={loadMore}>Load more</div> : <div>End of page</div>}
		</section>
    )
}