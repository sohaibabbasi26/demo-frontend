import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(req: NextRequest) {
    try{

        const body = await req?.json();
        console.log("[body]:",req?.body);
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/admin/log-in`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify(body),
            duplex: 'half' 
        });
    
        console.log("[NEXT API RESPONSE]:", response);
    
        const data = await response.json();
        const cookiesResponse = response.headers.getSetCookie(); 
        console.log("[cookies]:", cookiesResponse);

        const nextResponse = NextResponse.json(data, { status: response.status });

        if (cookiesResponse) {
            cookiesResponse.forEach((cookie) => {
                nextResponse.headers.append("Set-Cookie", cookie);
            });
        }

        const allCookies = (await cookies()).getAll();
        console.log("[COOKIES]:", allCookies);


        console.log("[response]:", data);
        return nextResponse;    

    } catch (err) {
        console.log("[ERROR]:",err);
        return Response.json(err);
    }
}