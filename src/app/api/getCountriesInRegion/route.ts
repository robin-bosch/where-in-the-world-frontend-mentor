import getAllCountries from "@/lib/getAllCountries";
import getRegionSort from "@/lib/getRegionSort";
import getSearchResult from "@/lib/getSearchResult";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
 
    const { searchParams } = new URL(request.url)
  const region = searchParams.get('region')


    return new NextResponse(JSON.stringify(getRegionSort(region)), {
        status: 200,
      });
  }