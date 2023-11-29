"use client"
import { useEffect, useRef, useState } from "react";
import styles from "./CountrySelect.module.css"
import { IoIosArrowDown } from "react-icons/io";


/* 
Extendable select options, extending needs the server to have another region too 
otherwise it returns nothing 
*/
const SelectOptions = [
	{
		"label": "Worldwide",
		"value": ""
	},
	{
		"label": "Africa",
		"value": "Africa"
	},
	{
		"label": "Americas",
		"value": "Americas"
	},
	{
		"label": "Asia",
		"value": "Asia"
	},
	{
		"label": "Europe",
		"value": "Europe"
	},
	{
		"label": "Oceania",
		"value": "Oceania"
	},
]


export default function CountrySelect({setCurrentDisplayList, countryList, currentDisplayList}: any) {
    const [value, setValue] = useState("");
    const [showSelect, setShowSelect] = useState(false);
    const selectRef = useRef<HTMLDivElement>(null);

    /* Update displayed countries in selected region */
    useEffect(() => {
		if(value !== "") {
			fetch(`/api/getCountriesInRegion?region=${value}`).then((res) => res.json()).then((data) => {
				setCurrentDisplayList(data);
			  })
		}
		else if(value == "" && currentDisplayList !== null) {
			setCurrentDisplayList(countryList);
		}
	}, [value])

    /* Clicking outside the select makes it disappear like the regular select */
    const handleClickOutside = (event: MouseEvent) => {
		if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
		  setShowSelect(false);
		}
	};

	/* Attach and dettach eventhandler for clicking outside the select box */
	useEffect(() => {
		document.addEventListener('mousedown', handleClickOutside);
	
		return () => {
		  document.removeEventListener('mousedown', handleClickOutside);
		};
	}, []);

    return(
        <div className={styles.selectContainer} ref={selectRef}>
            <div className={styles.selectBox} onClick={() => showSelect ? setShowSelect(false): setShowSelect(true)}>
                <span>{value == "" ? "Filter by region" : value}</span>
                <span><IoIosArrowDown /></span>
            </div>
			{showSelect && <ul className={styles.selectList}>
                {SelectOptions.map((selectItem) => {
                    return <li value={selectItem.value} onClick={() => {setValue(selectItem.value);setShowSelect(false)}} className={styles.selectItem} key={selectItem.value}>{selectItem.label}</li>
                })}
			</ul>}
		</div>
    )
}