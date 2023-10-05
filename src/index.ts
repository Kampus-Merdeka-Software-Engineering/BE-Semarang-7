import express from 'express'

import rateLimiter from '@/lib/rateLimiter'

import { router as productRouter } from '@/routers/product'
import { router as ratingRouter } from '@/routers/rating'
import { router as reviewRouter } from '@/routers/review'
import { router as messageRouter } from '@/routers/message'
import cors from 'cors'

const port = process.env.PORT || 8080
const app = express()
const corsOptions = {
    origin: '*',
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept', 'Origin'],
}
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(rateLimiter(60, 60))
app.use(cors(corsOptions))

app.use('/static/public', express.static('./public/uploads/'))

app.use('/product', productRouter)
app.use('/rating', ratingRouter)
app.use('/review', reviewRouter)
app.use('/message', messageRouter)

app.listen(port, () => {
    console.log(`Listening on port ${port}...`)
})

export default app