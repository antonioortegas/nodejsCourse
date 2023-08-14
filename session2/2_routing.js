const http = require('node:http')
const laprasJSON = require('./pokemon/lapras.json')

const desiredPort = process.env.PORT ?? 3000

const processRequestMethod = (req, res) => {
    const { url, method } = req
    switch (method) {
    case 'GET':
        return processGetRequest(url, req, res)
    case 'POST':
        return processPostRequest(url, req, res)
    default:
        res.statusCode = 404
        return res.end()
    }
}

const processGetRequest = (url, req, res) => {
    switch (url) {
    case '/':
        return res.end('/')
    case '/about':
        return res.end('/about')
    case '/pokemon/lapras':
        res.setHeader('Content-Type', 'application/json')
        return res.end(JSON.stringify(laprasJSON))
        /*
        To easily test this, you can use the extension "REST Client" for VSCode
        Create a file called "---.http" and put the instructions in there
        */
    default:
        res.statusCode = 404
        return res.end()
    }
}

const processPostRequest = (url, req, res) => {
    switch (url) {
    case '/':
        res.end('/')
        break
    case '/pokemon': {
        let body = ''
        req.on('data', (chunk) => {
            body += chunk.toString() // convert Buffer to string because Buffer are binary data
        })

        req.on('end', () => {
            const data = JSON.parse(body)
            res.writeHead(201, { 'Content-Type': 'application/json' })
            data.timestamp = Date.now()
            res.end(JSON.stringify(data))
        })
        break
    }
    default:
        res.statusCode = 404
        res.end()
    }
}

const server = http.createServer(processRequestMethod)

server.listen(desiredPort, () => {
    console.log(`Server is listening on port http://localhost:${desiredPort}`)
})
