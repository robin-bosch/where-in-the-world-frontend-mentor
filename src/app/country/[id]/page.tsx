import Link from "next/link";

import styles from "./CountryPage.module.css"
import { BsArrowLeft } from 'react-icons/bs';

import getAllCountries from "@/lib/getAllCountries";
import toUrlConverter from "@/lib/toUrlConverter";
import formatToReadableNumber from "@/lib/formatToReadableNumber";


export default async function CountryPage({ params }: { params: { id: string } }) {
    const country = await getData(params.id);

    // Get the first property in an object
    const findFirstProperty = (obj: any) => {
        for (const key in obj) {
          if (obj.hasOwnProperty(key)) {
            return obj[key];
          }
        }
    };


    // Get a list of all the properties in an object
    // Used to make a loopable list for the JSX portion
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
                <div className={styles.flagContainer}>
                    <img src={country.flags.svg} alt="" className={styles.flag}/>
                </div>
                
                <div className={styles.contentText}>
                    <h1 className={styles.contentHeading}>{country.name.common}</h1>
                    <div className={styles.infoContainer}>
                        <div className={styles.infoColumn}>
                            <p><b>Native Name:</b> {findFirstProperty(country.name.nativeName).official}</p>
                            <p><b>Population:</b> {formatToReadableNumber(country.population)}</p>
                            <p><b>Region:</b> {country.region}</p>
                            <p><b>Sub Region:</b> {country.subregion}</p>
                            <p><b>Capital:</b> {country.capital}</p>
                        </div>
                        <div className={styles.infoColumn}>
                            <p><b>Top Level Domain:</b> {country.tld}</p>
                            <p><b>Currencies:</b> {findFirstProperty(country.currencies).name}</p>
                            <p><b>Languages:</b> {getPropertyList(country.languages).map((language) => {
                                return <span key={`${language}`}> {language}</span>
                            })}</p>
                        </div>
                    </div>
                    <div className={styles.borderCountriesContainer}>
                        <p className={styles.borderCountriesLabel}><b>Border Countries: </b></p>
                        <div className={styles.borderCountriesList}>
                            {country.borders.length > 0 ? country.borders.map((border: any) => {
                                return <p key={border} className={styles.borderCountry}>{border}</p>
                            }) : <div>None</div>}
                        </div>
                        
                    </div>
                </div>
            </section>            
        </main>
    )
}


async function getData(id: string) {
    const countryList = getAllCountries();

    let countryReturn = null;

    // Search for country
    for(let i = 0; i < countryList.length; i++) {
        if(toUrlConverter(countryList[i].name.common) == id) {
            countryReturn = countryList[i];
            break;
        }
    }

    // Resolve border countries from cca3 to their common name
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