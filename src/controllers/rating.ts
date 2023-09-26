import { NextFunction, Request, Response } from "express";
import { errorResponse } from "@/lib/validatorResponse";
import { prisma } from "@/lib/dbConnector";

export * as ratingController from "@/controllers/rating"

/**
 * The `createRating` function is an asynchronous function that handles the creation of a new rating for a
 * product and returns the created rating.
 */
export const createRating = async (req: Request, res: Response, next: NextFunction) => {
    const errors = errorResponse(req, res)
    const { productId, rating } = req.body
    try {
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
        res.json({ success: true, data: userRating })
    } catch (error) {
        next(error)
        res.status(500).json({ message: "Something went wrong" })
    }
}