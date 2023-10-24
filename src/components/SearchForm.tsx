"use client"
import styles from "@/styles/SearchForm.module.css"
import { AiOutlineSearch } from 'react-icons/ai';
import { useEffect, useState } from 'react';

export default function SearchForm({data}: any) {
    const [searchValue, setSearchValue] = useState<string>("");


      useEffect(() => {
        const debouncedSearch = setTimeout(search, 1000)
        return () => {
          clearTimeout(debouncedSearch); // Clear the timer when the component unmounts
        };
      }, [searchValue]);

	function search() {
    if(searchValue != "") {
      alert("Searching now")
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