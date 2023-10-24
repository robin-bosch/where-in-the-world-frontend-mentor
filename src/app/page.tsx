// "use client"
import Image from 'next/image'
import styles from './page.module.css'

import SearchForm from '@/components/SearchForm';
import CardDisplay from '@/components/CardDisplay';



export default async function Home() {
	// const res = await fetch('https://restcountries.com/v3.1/all')

	const countries = await getData();

	return (
		<main className={styles.main}>
			<section className={styles.controls}>
				<SearchForm data={countries}/>
				<select name="" id="" className={styles.sortBy}>
					<option value="Africa">Africa</option>
					<option value="America">America</option>
					<option value="Asia">Asia</option>
					<option value="Europe">Europe</option>
					<option value="Oceania">Oceania</option>
				</select>
			</section>
			<CardDisplay countries={countries}/>
		</main>
	)
}


async function getData() {
	const res = await fetch('https://restcountries.com/v3.1/all')


	return res.json();
}