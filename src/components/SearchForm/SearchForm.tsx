"use client"
import styles from "./SearchForm.module.css"
import { AiOutlineSearch } from 'react-icons/ai';
import { useEffect, useState } from 'react';
import useSWR from "swr";


const fetcher = (url: any) => fetch(url).then(r => r.json())

export default function SearchForm({data, setCurrentCountryList}: any) {
  const [searchValue, setSearchValue] = useState<string>("");


      useEffect(() => {
        const debouncedSearch = setTimeout(search, 1000)
        return () => {
          clearTimeout(debouncedSearch); // Clear the timer when the component unmounts
        };
      }, [searchValue]);

	function search() {
    if(searchValue != "") {
      fetch(`/api/queryCountries?query=${searchValue}`).then((res) => res.json()).then((data) => {
        setCurrentCountryList(data);
      })
    }
		
	}




    return (
        <form className={styles.searchForm}>
            <AiOutlineSearch className={styles.searchIcon}/>
            <input 
                type="text" 
                placeholder="Search for a country" 
                onChange={(e) => setSearchValue(e.target.value)}
                className={styles.searchInput}
            />

		</form>
    )
}