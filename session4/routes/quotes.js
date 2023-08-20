import { Router } from 'express'
import { createRequire } from 'node:module'
import { randomUUID } from 'node:crypto'
import zod from 'zod'
// this is the future version of import for json files
// import quotes from './quotes.json' with {type: 'json'}

const quoteSchema = zod.object({
    character: zod.string().optional(),
    chapter: zod.number().positive().int().optional(),
    book: zod.string(zod.enum(['The Way of Kings', 'Words of Radiance', 'OathBringer', 'Rhythm of War'])),
    extras: zod.optional()
})
const require = createRequire(import.meta.url)
const quotes = require('../quotes.json')

export const router = Router()

router.get('/', (req, res) => {
    res.json({
        message: 'Hello World!'
    })
})

router.get('/quotes', (req, res) => {
    const { character } = req.query
    if (character) {
        const filteredQuotes = quotes.filter(
            quote => quote.character.toLowerCase().includes(character.toLowerCase())
        )
        return res.json(filteredQuotes)
    }
    res.json(quotes)
})

router.get('/quotes/:id', (req, res) => {
    const id = req.params.id
    const quote = quotes.find(quote => quote.id === id)
    if (quote) {
        return res.json(quote)
    }
    res.status(404).json({ message: 'Not found' })
})

router.post('/quotes', (req, res) => {
    function validateQuote (quote) {
        return quoteSchema.safeParse(quote)
    }
    const validationResult = validateQuote(req.body)

    if (validationResult.error) {
        return res.status(400).json({
            message: validationResult.error.message
        })
    }

    const newQuote = {
        id: randomUUID(),
        ...validationResult.data
    }

    quotes.push(newQuote)
    res.status(201).json(newQuote)
})

router.put('/quotes/:id', (req, res) => {
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
