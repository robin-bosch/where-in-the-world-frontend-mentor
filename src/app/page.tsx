"use client"
import styles from './HomePage.module.css'

import SearchForm from '@/components/SearchForm/SearchForm';
import CardDisplay from '@/components/CardDisplay/CardDisplay';

import useSWR from 'swr';
import { useEffect, useState } from 'react';



const fetcher = (url: any) => fetch(url).then(r => r.json())


export default function Home() {
	// const countries = await getData();
	const [currentCountryList, setCurrentCountryList] = useState(null);
	const { data, error } = useSWR('/api/getAllCountries', fetcher)

	

	useEffect(() => {
		if(data !== undefined) {
			console.log("set data")
			setCurrentCountryList(data);
		}
	}, [data])

	

	  const [value, setValue] = useState("");

  const handleChange = (event: any) => {
    setValue(event.target.value);
  };

	useEffect(() => {
		if(value !== "") {
			fetch(`/api/getCountriesInRegion?region=${value}`).then((res) => res.json()).then((data) => {
				setCurrentCountryList(data);
			  })
		}
		else if(value == "" && currentCountryList !== null) {
			setCurrentCountryList(data);
		}
	}, [value])


	return (
		<main className={styles.main}>
			<section className={styles.controls}>
				{currentCountryList && <SearchForm data={currentCountryList} setCurrentCountryList={setCurrentCountryList}/>}
				<select name="" id="" className={styles.sortBy} value={value} onChange={handleChange}>
					<option value="">Filter by region</option>
					<option value="Africa">Africa</option>
					<option value="America">America</option>
					<option value="Asia">Asia</option>
					<option value="Europe">Europe</option>
					<option value="Oceania">Oceania</option>
				</select>
			</section>
			{currentCountryList && <CardDisplay countryList={currentCountryList} setCurrentCountryList={setCurrentCountryList}/>}
		</main>
	)
}
