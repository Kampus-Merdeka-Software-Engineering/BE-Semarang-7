import { NextFunction, Request, Response } from "express"
import fs from "fs"
import { errorResponse } from "@/lib/validatorResponse"
import { prisma } from "@/lib/dbConnector"

/**
 * Export all functions from the product controller under a named export.
 */
export * as productController from "@/controllers/product"

/**
 * The `getProducts` function retrieves products from a database based on a search query and returns
 * them along with their average rating and rating count.
 */
export const getProducts = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { search } = req.query
        const products = await prisma.product.findMany({
            where: {
                name: { contains: search as string ?? "" }
            },
            select: {
                id: true,
                name: true,
                price: true,
                image: true
            },
        })

        if (products.length === 0) {
            return res.status(404).json({ message: "No products found" })
        }

        const ratings = await prisma.rating.groupBy({
            by: ["productId"],
            _avg: {
                rating: true
            },
            _count: {
                rating: true
            }
        })

        res.json(products.map((product) => {
            const rating = ratings.find((rating) => rating.productId === product.id)
            return {
                ...product,
                rating_avg: rating?._avg.rating ?? 0,
                rating_count: rating?._count.rating ?? 0
            }
        }))
    } catch (error) {
        next(error)
    }
}

/**
 * The function `getProductById` retrieves a product and its average rating by its ID from a database
 * using Prisma ORM in a TypeScript application. It returns the product as a JSON response.
 */
export const getProductById = async (req: Request, res: Response, next: NextFunction) => {
    errorResponse(req, res)
    try {
        const { id } = req.params
        const product = await prisma.product.findUnique({
            where: {
                id: parseInt(id)
            }
        })
        const rating = await prisma.rating.aggregate({
            where: {
                productId: parseInt(id)
            },
            _avg: {
                rating: true
            },
            _count: {
                rating: true
            }
        })
        if (!product) {
            return res.status(404).json({ message: "Product not found" })
        }
        res.json({ ...product, rating: rating._avg.rating, rating_count: rating._count.rating })
    } catch (error) {
        next(error)
    }
}


/**
 * The function creates a new product by extracting the name, price, and image from the request body,
 * and then saves it to the database using Prisma.
 * @returns a JSON response with the created product data.
 */
export const createProduct = async (req: Request, res: Response, next: NextFunction) => {

    errorResponse(req, res)

    try {
        const { name, price } = req.body;

        if (!req.file) {
            return res.status(400).json({ message: "Please upload an image file." });
        }

        const product = await prisma.product.create({
            data: {
                name,
                price: parseInt(price),
                image: req.file.filename
            }
        })
        res.status(201).json({ success: true, data: product })
    } catch (error) {
        next(error)
    }
}

/**
 * The `updateProduct` function updates a product in a database using the provided request parameters
 * and body.
 * @returns a JSON response with the updated product data.
 */
export const updateProduct = async (req: Request, res: Response, next: NextFunction) => {

    errorResponse(req, res)

    try {
        const { id } = req.params
        const { name, price } = req.body

        const product = await prisma.product.findUnique({
            where: {
                id: parseInt(id)
            }
        })

        if (!product) {
            if (req.file) {
                fs.unlink(req.file.path, (err) => {
                    if (err) {
                        next(err)
                    }
                })
            }
            return res.status(404).json({ message: "Product not found" })
        }

        const imagePath = req.file ? req.file.path : product?.image
        const updatedProduct = await prisma.product.update({
            where: {
                id: parseInt(id)
            },
            data: {
                name,
                price: parseFloat(price),
                image: imagePath
            }
        })

        if (req.file) {
            fs.access(product.image, (exists) => {
                if (!exists) {
                    fs.unlink(product.image, (err) => {
                        if (err) {
                            next(err)
                        }
                    })
                }
            })
        }
        res.status(200).json({ success: true, data: updatedProduct })
    } catch (error) {
        next(error)
    }
}

/**
 * The `deleteProduct` function is an asynchronous function that deletes a product from the database
 * based on the provided ID.
 * @returns a JSON response with a success message if the product is deleted successfully
 * @returns a JSON response with an error message if the product is not found or if something goes wrong.
 */
export const deleteProduct = async (req: Request, res: Response, next: NextFunction) => {

    errorResponse(req, res)

    try {
        const { id } = req.params

        const product = await prisma.product.findUnique({
            where: {
                id: parseInt(id)
            },
            select: {
                image: true
            }
        })

        if (!product) {
            return res.status(404).json({ message: "Product not found" })
        }

        fs.access(product.image, (exists) => {
            if (exists) {
                fs.unlink(product.image, (err) => {
                    if (err) {
                        next(err)
                    }
                })
            }
        })

        const deletedProduct = await prisma.product.delete({
            where: {
                id: parseInt(id)
            }
        })

        res.json({ success: true, data: deletedProduct })
    } catch (error) {
        next(error)
    }
}