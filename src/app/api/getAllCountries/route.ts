import getAllCountries from "@/lib/getAllCountries";
import { NextResponse } from "next/server";

export async function GET(request: Request) {

    const { searchParams } = new URL(request.url)
    const page = searchParams.get('page');

    

    const countryList = getAllCountries();

    let resultList = [];

    if (page != null && parseInt(page) != null && parseInt(page) > 0 && parseInt(page) < countryList/24){
        return new NextResponse(JSON.stringify(countryList), {
            status: 200,
          });
        }
    else {
        return new NextResponse(JSON.stringify(getAllCountries()), {
            status: 200,
        });
    }
 
    
  }