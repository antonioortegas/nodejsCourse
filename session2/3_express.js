// Using express to simplify last example
// npm install express -E (for exact version, without ^)
const laprasJSON = require('./pokemon/lapras.json')

const express = require('express')
const app = express()

app.disable('x-powered-by') // disable header that shows express is being used
// This CAN be a security risk, as it can show the version of express being used, which may have vulnerabilities that can be exploited

const PORT = process.env.PORT ?? 3000

// This is a middleware function, it will be called first, before any other route and can be used to do things like cookie handling, auth, tracking...
// It will be executed for before every request that matches the route /*

// Every POST request will be parsed as JSON and the body will be added to req.body to create a JSON object
// This whole function is not needed, as express has a built in function to do this, but it is good to know how it works
// app.use(express.json()) // This will parse the body of every request as JSON and add it to req.body
app.use('/*', (req, res, next) => {
    console.log('Middleware')
    if (req.method !== 'POST') {
        return next()
    }
    if (req.headers['content-type'] !== 'application/json') {
        return next()
    }
    let body = ''
    req.on('data', (chunk) => {
        body += chunk
    })

    req.on('end', () => {
        const data = JSON.parse(body)
        req.body = data
    })
    next() // This is important, as it will call the next middleware function or route handler
})

app.get('/', (req, res) => {
    res.send('Hello World!') // send() automatically tries to guess the content type with express
    // When using res.json() it will set the content type to application/json, stringify the object...
})

app.get('/pokemon/lapras', (req, res) => {
    res.json(laprasJSON)
})

app.post('/pokemon', (req, res) => {
    res.json(req.body)
})

// This is a catch all route, if no other route is matched, this will be used
// It is important to put this at the end, as it will match any route
// This is esentially a "middleware" function that will be called last with every request that doesn't match any other route
app.use((req, res) => {
    res.status(404).send('<h1>Not Found<h1>')
})

app.listen(PORT, () => {
    console.log(`Server started on http://localhost:${PORT}`)
})
