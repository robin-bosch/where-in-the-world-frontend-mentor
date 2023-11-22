import getAllCountries from "@/lib/getAllCountries";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
 
    const { searchParams } = new URL(request.url)
    const region = searchParams.get('region')

    const countryList = getAllCountries();


    let resultList: any = [];

    countryList.forEach((country: any) => {
        if(country.region == region) {
            resultList.push(country);
        }
    });


    return new NextResponse(JSON.stringify(resultList), {
        status: 200,
      });
  }