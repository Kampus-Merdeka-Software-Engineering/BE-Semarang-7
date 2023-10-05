import { NextFunction, Request, Response } from "express";
import { errorResponse } from "@/lib/validatorResponse";
import { prisma } from "@/lib/dbConnector";

export * as ratingController from "@/controllers/rating"

/**
 * The `createRating` function is an asynchronous function that handles the creation of a new rating for a
 * product and returns the created rating.
 */
export const createRating = async (req: Request, res: Response, next: NextFunction) => {
    errorResponse(req, res)
    try {
        const { productId, rating } = req.body
        const product = await prisma.product.findUnique({
            where: {
                id: parseInt(productId)
            }
        })

        if (!product) {
            return res.status(404).json({ message: "Product not found" })
        }

        const userRating = await prisma.rating.create({
            data: {
                rating: parseInt(rating),
                product: {
                    connect: {
                        id: parseInt(productId)
                    }
                }
            }
        })
        res.status(201).json({ success: true, data: userRating })
    } catch (error) {
        next(error)
    }
}