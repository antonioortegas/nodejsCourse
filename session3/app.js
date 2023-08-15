/* REST API principles
Each RESOURCE has a unique url it is identified by and associated with
Each VERB (GET, POST, PUT, DELETE) has a specific meaning and they define the operations that can be performed on the resource
Each REPRESENTATION is a specific format (JSON, XML, HTML) that is sent to the client, and each resource CAN have !!!MULTIPLE!!! representations (not always, but it can)
STATELESS. Server does not store any state about the client session on the server side
    Each request from any client contains all the information necessary to service the request, and session state is held in the client
    This means that the server does not need to know anything about what state the client is in and vice versa
CLIENT and SERVER can act and evolve independently of each other, as long as the interface between them is not altered

VERY IMPORTANT:
    APIs should work as a funnel.
    The client should be able to get all the information it needs from the API with as few requests as possible.
    This means that the API should be designed in a way that it provides all the information that the client needs in a single request.
    Also, the API should be designed in a way that it is easy to use and understand by the client,
        as well as being able to take in almost ANY request, but then return the appropriate response.
    This means hat the API should be ROBUST and FLEXIBLE.
    You must have systems in place to handle errors and exceptions, and return the appropriate response to the client, even if the request is invalid.
    This way, your API won't break if the client sends an invalid request, and the client will know what went wrong and how to fix it.

REGARDING CORS:
    CORS is a mechanism that allows restricted resources on a web page to be requested from another domain outside the domain from which the first resource was served.
    If we have an API that is hosted on a different domain than the client, we need to enable CORS on the API so that the client can make requests to it.
    This is done manually by adding the following headers to the response: (with res.header())
        Access-Control-Allow-Origin: * (this means that any client can make requests to the API.
            You can also specify a specific domain here instead of * to allow only that domain to make requests to the API)
        Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS (this means that the API allows these methods to be used)
    The quickest way to use the CORS middleware is to enable it for all routes in your app:
        const cors = require('cors')
        app.use(cors())
    You can also enable it for specific routes:
        app.get('/quotes', cors(), (req, res) => {
            ...
        })
    Or domains:
        const corsOptions = {
            origin: 'https://example.com'
        }
        app.get('/quotes', cors(corsOptions), (req, res) => {
            ...
        })
*/

const express = require('express')
const crypto = require('node:crypto')
const z = require('zod')

// This is a schema that defines the shape of the object that we expect to receive in the request body
// It is a good practice to define schemas and validations functions for all the resources that you have in your API in a separate folder/file and then call them here
const quoteSchema = z.object({
    character: z.string().optional(),
    chapter: z.number().positive().int().optional(),
    book: z.string(z.enum(['The Way of Kings', 'Words of Radiance', 'OathBringer', 'Rhythm of War'])),
    extras: z.optional()
})

const app = express()
app.use(express.json()) // this is a middleware that parses the body of the request and adds it to the request object
app.disable('x-powered-by')
const PORT = process.env.PORT || 3000
const quotes = require('./quotes.json')

app.get('/', (req, res) => {
    res.json({
        message: 'Hello World!'
    })
})

// quotes are a resource, so they are identified by a unique url
app.get('/quotes', (req, res) => {
    const { character } = req.query
    if (character) {
        const filteredQuotes = quotes.filter(
            quote => quote.character.toLowerCase().includes(character.toLowerCase())
        )
        return res.json(filteredQuotes)
    }
    res.json(quotes) // if no query param is provided, return all quotes
})

app.get('/quotes/:id', (req, res) => { // You can use REGEXP to validate the id, ie: /.*dev$/ will match any string that ends with dev
    const id = req.params.id
    const quote = quotes.find(quote => quote.id === id)
    if (quote) {
        return res.json(quote)
    }
    res.status(404).json({ message: 'Not found' })
})

app.post('/quotes', (req, res) => {
    /*
    const {
        quote,
        character,
        chapter,
        book
    } = req.body

    const newQuote = {
        id: crypto.randomUUID(), // this is a unique id generator provided by node crypto module
        quote,
        character,
        chapter,
        book
    }
    BUT THIS HAS NO VALIDATION!!! A USER CAN SEND ANYTHING IN THE BODY AND IT WILL BE ADDED TO THE QUOTES ARRAY ANYWAY, EVEN IF IT HAS INVALID PROPERTIES
    You could try to validate requests by manually checking values with if statements, but this is not a good approach
    A good approach is to use a library that does this for you, like Zod (npm install zod)
    */

    function validateQuote (quote) {
        return quoteSchema.safeParse(quote)
    }
    const validationResult = validateQuote(req.body)

    if (validationResult.error) {
        return res.status(400).json({
            message: validationResult.error.message
        })
    }

    // And NOW we can use the validated values to create the new quote
    const newQuote = {
        id: crypto.randomUUID(), // this is a unique id generator provided by node crypto module
        ...validationResult.data
    }

    quotes.push(newQuote)
    res.status(201).json(newQuote)
})

app.put('/quotes/:id', (req, res) => {
    const id = req.params.id
    const result = quoteSchema.partial().safeParse(req.body)
    const quoteIndex = quotes.findIndex(quote => quote.id === id)
    console.log(result)
    console.log(quoteIndex)
    console.log(id)
    if (!result.success) {
        return res.status(404).json({ message: result.error.message })
    }

    if (quoteIndex === -1) {
        return res.status(404).json({ message: 'Quote index Not found' })
    }

    const updatedQuote = {
        ...quotes[quoteIndex],
        ...result.data
    }

    quotes[quoteIndex] = updatedQuote

    return res.json(updatedQuote)
})

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})
