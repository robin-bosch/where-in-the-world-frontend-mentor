"use client"
import styles from './HomePage.module.css'

import SearchForm from '@/components/SearchForm/SearchForm';
import CardDisplay from '@/components/CardDisplay/CardDisplay';

import { useEffect, useState } from 'react';
import CountrySelect from '@/components/CountrySelect/CountrySelect';


export default function Home() {
	const [countryList, setCountryList] = useState(null);
	const [currentDisplayList, setCurrentDisplayList] = useState(null);

	useEffect(() => {
		fetch(`/api/getAllCountries?page=1`).then((res) => res.json()).then((data) => {
			setCurrentDisplayList(data);
			setCountryList(data);
		  })
	}, [])

	return (
		<main className={styles.main}>
			<div className={styles.controls}>
				{countryList && <SearchForm setCurrentDisplayList={setCurrentDisplayList} countryList={countryList}/>}

				<CountrySelect setCurrentDisplayList={setCurrentDisplayList} countryList={countryList} currentDisplayList={currentDisplayList}/>
			</div>
			{countryList && currentDisplayList && 
				<CardDisplay
					countryList={countryList} 
					currentDisplayList={currentDisplayList} 
					setCurrentDisplayList={setCurrentDisplayList} 
					setCountryList={setCountryList}
				/>}
		</main>
	)
}
