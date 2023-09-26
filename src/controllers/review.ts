import { NextFunction, Request, Response } from "express";
import { errorResponse } from "@/lib/validatorResponse";
import { prisma } from "@/lib/dbConnector";

export * as reviewController from "@/controllers/review"

/**
 * The function `getReviews` retrieves all reviews from the database
 * @returns a JSON response.
 */
export const getReviews = async (req: Request, res: Response, next: NextFunction) => {
    const reviews = await prisma.review.findMany()
    res.json(reviews)
}

/**
 * The function `getReviewsById` retrieves a review by its ID and returns it as a JSON response.
 * @returns a JSON response containing the review object if it exists. If the review is not found, a 404 status code and a JSON response with a message "Review not found" is returned.
 */
export const getReviewById = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params
    const review = await prisma.review.findUnique({
        where: {
            id: parseInt(id),
        }
    })

    if (!review) {
        return res.status(404).json({ message: 'Review not found' })
    }

    res.json(review)
}


/**
 * The `addReview` function is an asynchronous function that handles the creation of a new review by
 * validating the request, creating a new review object using the provided data.
 * @returns created review object as a JSON response.
 */
export const createReview = async (req: Request, res: Response, next: NextFunction) => {
    errorResponse(req, res)

    try {
        const { name, email, rating, review } = req.body
        const userReview = await prisma.review.create({
            data: {
                name,
                email,
                rating: parseInt(rating),
                review
            }
        })

        res.json(userReview)
    } catch (error) {
        next(error)
        res.status(500).json({ message: "Something went wrong" })
    }
}