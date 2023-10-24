import Link from "next/link";

import styles from "@/styles/CountryPage.module.css"
import { BsArrowLeft } from 'react-icons/bs';

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

    console.log(country[0].languages)

    return (
        <main className={styles.main}>
            <Link href="/" className={styles.backBtn}>
                <BsArrowLeft/>
                <span>Back</span>
            </Link>
            <section className={styles.content}>
                <img src={country[0].flags.svg} alt="" className={styles.flag}/>
                <div className={styles.contentText}>
                    <h1>{country[0].name.common}</h1>
                    <div className={styles.infoContainer}>
                        <div className={styles.infoColumn}>
                            <p>Native Name: {findFirstProperty(country[0].name.nativeName).official}</p>
                            <p>Population: {country[0].population}</p>
                            <p>Region: {country[0].region}</p>
                            <p>Sub Region: {country[0].population}</p>
                            <p>Capital: {country[0].capital}</p>
                        </div>
                        <div className={styles.infoColumn}>
                            <p>Top Level Domain: {country[0].tld}</p>
                            <p>Currencies: {findFirstProperty(country[0].currencies).name}</p>
                            <p>Languages: {getPropertyList(country[0].languages)}</p>
                        </div>
                    </div>
                    <div className={styles.borderCountriesContainer}>

                    </div>
                </div>
            </section>

            
            
            
        </main>
    )
}


async function getData(id: string) {
    console.log(`https://restcountries.com/v3.1/name/${id}`);
    const res = await fetch(`https://restcountries.com/v3.1/name/${id}`)

    const json = res.json();
    const obj = json[0];
    console.log(obj);

	return json;

}