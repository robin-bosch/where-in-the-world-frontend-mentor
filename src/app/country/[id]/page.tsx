import Link from "next/link";

import styles from "./CountryPage.module.css"
import { BsArrowLeft } from 'react-icons/bs';

import getAllCountries from "@/lib/getAllCountries";


function toUrlConverter(name: string): string {
    return name.toLowerCase().replaceAll(" ", "-");
}

export default async function CountryPage({ params }: { params: { id: string } }) {
    const country = await getData(params.id);

    const findFirstProperty = (obj: any) => {
        for (const key in obj) {
          if (obj.hasOwnProperty(key)) {
            return obj[key];
          }
        }
    };


    const getPropertyList = (obj: any) => {
        let list = []
        for (const key in obj) {
            list.push(obj[key]);

        }
        return list;
    };


    return (
        <main className={styles.main}>
            <Link href="/" className={styles.backBtn}>
                <BsArrowLeft/>
                <span>Back</span>
            </Link>
            <section className={styles.content}>
                <img src={country.flags.svg} alt="" className={styles.flag}/>
                <div className={styles.contentText}>
                    <h1>{country.name.common}</h1>
                    <div className={styles.infoContainer}>
                        <div className={styles.infoColumn}>
                            <p><b>Native Name:</b> {findFirstProperty(country.name.nativeName).official}</p>
                            <p>Population: {country.population}</p>
                            <p>Region: {country.region}</p>
                            <p>Sub Region: {country.subregion}</p>
                            <p>Capital: {country.capital}</p>
                        </div>
                        <div className={styles.infoColumn}>
                            <p>Top Level Domain: {country.tld}</p>
                            <p>Currencies: {findFirstProperty(country.currencies).name}</p>
                            <p>Languages: {getPropertyList(country.languages)}</p>
                        </div>
                    </div>
                    <div className={styles.borderCountriesContainer}>
                        {country.borders.map((border: any) => {
                            return <p key={border} className={styles.borderCountry}>{border}</p>
                        })}
                    </div>
                </div>
            </section>

            
            
            
        </main>
    )
}


async function getData(id: string) {
    const countryList = getAllCountries();

    let countryReturn = null;

    for(let i = 0; i < countryList.length; i++) {
        if(toUrlConverter(countryList[i].name.common) == id) {
            countryReturn = countryList[i];
            break;
        }
    }

    for(let borderIndex = 0; borderIndex < countryReturn.borders.length; borderIndex++) {
        for(let countryIndex = 0; countryIndex < countryList.length; countryIndex++) {
            if(countryReturn.borders[borderIndex] == countryList[countryIndex].cca3) {
                countryReturn.borders[borderIndex] = countryList[countryIndex].name.common;
                break;
            }
        }
    }


    return countryReturn;

}