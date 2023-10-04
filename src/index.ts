import express from 'express'

import rateLimiter from '@/lib/rateLimiter'

import { router as productRouter } from '@/routers/product'
import { router as ratingRouter } from '@/routers/rating'
import { router as reviewRouter } from '@/routers/review'
import { router as messageRouter } from '@/routers/message'

const port = process.env.PORT || 8080
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(rateLimiter(60, 60))
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
    next()
})

app.use('/static/public', express.static('./public/uploads/'))

app.use('/product', productRouter)
app.use('/rating', ratingRouter)
app.use('/review', reviewRouter)
app.use('/message', messageRouter)

app.listen(port, () => {
    console.log(`Listening on port ${port}...`)
})

export default app