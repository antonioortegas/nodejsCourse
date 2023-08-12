const http = require('node:http')

const port = 0 // 0 means it looks for a free port

const server = http.createServer((req, res) => {
    console.log('Request received')
    res.end('Hello World')
})

server.listen(port, () => {
    console.log(`Server running on port http://localhost:${server.address().port}`)
})
