import express from "express"
import { router as productRouter } from '@/routers/product'
import { router as ratingRouter } from '@/routers/rating'
import { router as reviewRouter } from '@/routers/review'
import { router as messageRouter } from '@/routers/message'

const server = () => {
    const app = express()

    app.use(express.json())
    app.use(express.urlencoded({ extended: true }))

    app.use('/static/public', express.static('./public/uploads/'))

    app.use('/product', productRouter)
    app.use('/rating', ratingRouter)
    app.use('/review', reviewRouter)
    app.use('/message', messageRouter)

    return app
}

export default server