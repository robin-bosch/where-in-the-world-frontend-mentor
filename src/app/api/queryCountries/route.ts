import getAllCountries from "@/lib/getAllCountries";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url)


    let query = searchParams.get(`query`)

    if(query == null) {
      return new NextResponse("No query parameter", {
        status: 400,
      });

    }

    query = query.toLowerCase();

    const countryList = getAllCountries();

    let resultList: any = [];

    countryList.forEach((country: any) => {
        if(country.name.common.toLowerCase().includes(query)) {
            resultList.push(country);
        }
    });


    return new NextResponse(JSON.stringify(resultList), {
        status: 200,
      });
  }