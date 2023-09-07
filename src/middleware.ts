import { NextResponse } from "next/server";

// allowed origins - this means; client side requests that are allowed to access our api
const allowedOrigins = process.env.NODE_ENV === 'production' 
? ['https://www.mysite.com', 'https://mysite.com'] 
:['http://localhost:300', 'https://localhost:300', 'https://www.google.com']

export function middleware (request: Request){
    // using conditionals to apply middleware
    // using regex too
    // const regex = new RegExp('/api/*')
    // if (regex.test(request.url)){

    // }

    // conditional for our origins
    const origin = request.headers.get('origin')
    console.log(origin)

    if (origin && !allowedOrigins.includes(origin)){
        return new NextResponse(null, {
            status: 400,
            statusText: "Bad Request",
            headers: {
                'Content-Type': 'text/plain'
            }
        })
    }


    console.log("Middleware!")

    console.log(request.method)
    console.log(request.url)


    return NextResponse.next()
}

// applying a matcher
// this means that any route in the api folder will be caught and the middleware file will be applied to it
export const config = {
    matcher: '/api/:path*',
}