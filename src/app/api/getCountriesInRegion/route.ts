import getAllCountries from "@/lib/getAllCountries";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    //Get the region parameter and countryList
    const { searchParams } = new URL(request.url)
    const region = searchParams.get('region')

    const countryList = getAllCountries();

    let resultList: any = [];

    // Go through countries in the region requested
    countryList.forEach((country: any) => {
        if(country.region == region) {
            resultList.push(country);
        }
    });

    // Return result list with the countries in region
    return new NextResponse(JSON.stringify(resultList), {
        status: 200,
      });
  }