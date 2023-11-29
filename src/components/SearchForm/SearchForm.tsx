"use client"
import styles from "./SearchForm.module.css"
import { AiOutlineSearch } from 'react-icons/ai';
import { useEffect, useState } from 'react';


export default function SearchForm({setCurrentDisplayList, countryList}: any) {
	const [searchValue, setSearchValue] = useState<string>("");

	//Delay the search by one second to make sure there are no unnecessary server requests
	useEffect(() => {
        const debouncedSearch = setTimeout(search, 1000)

		return () => {
			clearTimeout(debouncedSearch);
		};
      }, [searchValue]);

	
	/**
	 * Requesting a search on the server by given value if value is zero it resets to the currently cached countries
	 */
	function search() {
		if(searchValue != "") {
			fetch(`/api/queryCountries?query=${searchValue}`).then((res) => res.json()).then((data) => {
				setCurrentDisplayList(data);
			})
		}
		else {
			setCurrentDisplayList(countryList);
		}
	}

    return (
        <form className={styles.searchForm} onSubmit={(e) => {e.preventDefault()}}>
            <AiOutlineSearch className={styles.searchIcon}/>
            <input 
                type="text" 
                placeholder="Search for a country"
				aria-label="Search input" 
                onChange={(e) => setSearchValue(e.target.value)}
                className={styles.searchInput}
            />

		</form>
    )
}