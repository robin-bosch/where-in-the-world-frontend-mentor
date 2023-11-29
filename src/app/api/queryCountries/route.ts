import getAllCountries from "@/lib/getAllCountries";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    
    // Get search parameter check, if it exists and normalize it
    const { searchParams } = new URL(request.url)
    let query = searchParams.get(`query`)

    if(query == null) {
        // Error response for no query parameter
        return new NextResponse("No query parameter", {
            status: 400,
        });
    }

    query = query.toLowerCase();

    // Get all countries and look through if the common name includes the query
    const countryList = getAllCountries();

    let resultList: any = [];

    countryList.forEach((country: any) => {
        if(country.name.common.toLowerCase().includes(query)) {
            resultList.push(country);
        }
    });

    // Response with search result
    return new NextResponse(JSON.stringify(resultList), {
        status: 200,
    });
}