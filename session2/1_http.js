const http = require('node:http')

const desiredPort = process.env.PORT ?? 3000

// To update the server without restarting it, we can use nodemon. Install it with npm install nodemon -D
// Then, we can run the server with nodemon ./session2/1_http.js

/*
Status codes: http.cat illustrates them nicely :)
100-199: Informational responses
200-299: Successful responses
300-399: Redirects
400-499: Client errors. Client is at fault and should fix the request before retrying
500-599: Server errors. Server is at fault

Most common status codes:
200: OK
301: Moved permanently. The resource has been moved to a new URL
400: Bad request. The server could not understand the request
404: Not found. The resource could not be found
500: Internal server error. Something went wrong on the server !!!
*/

const processRequest = (req, res) => { // node --watch ./session2/1_http.js will restart the server on file change
    console.log('Request received', req.url) // browser will request favicon.ico, so we will see two requests. This won't happen if we fetch or curl
    res.setHeader('Content-Type', 'text/plain')
    if (req.url === '/') {
        res.statusCode = 200
        res.end('Hello World')
    } else if (req.url === '/about') {
        res.statusCode = 200
        res.end('About page')
    } else {
        res.statusCode = 404
        res.end('Page not found')
    }
}

const server = http.createServer(processRequest)

server.listen(desiredPort, () => {
    console.log(`Server is listening on port ${desiredPort}`)
})
