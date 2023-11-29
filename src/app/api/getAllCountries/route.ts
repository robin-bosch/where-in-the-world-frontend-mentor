import getAllCountries from "@/lib/getAllCountries";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url)
    const page = searchParams.get('page');

    const countryList = getAllCountries();

    // Number regex
    const reg = /^\d+$/;

    // Check if the page parameter is given
    if(page !== null && reg.test(page)) {
        const pageNumber = parseInt(page);

        // One page contains 24 items - Divide the amount of items by 24 to get the amount of pages
        // Check if the page parameter is valid between 1 and the max number of pages
        if (pageNumber > 0 && pageNumber < Math.ceil((countryList.length/24)+1)){

            // Return the items on the page by given page parameter
            return new NextResponse(JSON.stringify(countryList.slice((pageNumber-1)*24, pageNumber*24)), {
                status: 200,
            });
        }

        // Return 404 if it is not in Range
        else {
            return new NextResponse(JSON.stringify({
                "message": "Page does not exist"
            }), {
                status: 404,
            });
        }
    }

    //Return all countries without the page parameter
    return new NextResponse(JSON.stringify(getAllCountries()), {
        status: 200,
    });
}