import express, { json } from 'express'
import { router } from './routes/quotes.js'
const app = express()
app.use(json())
app.disable('x-powered-by')
const PORT = process.env.PORT || 3000

app.use('/', router)

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})
