import { NextFunction, Request, Response } from "express";
import { errorResponse } from "@/lib/validatorResponse";
import { prisma } from "@/lib/dbConnector";

export * as messageController from "@/controllers/message"

/**
 * The function `getMessages` retrieves all messages from the database and sends them as a JSON
 * response.
 */
export const getMessages = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const messages = await prisma.message.findMany()
        res.json(messages)
    } catch (error) {
        next(error)
    }
}

/**
 * The function retrieves a message by its ID from a database and returns it as a JSON response.
 * @returns a JSON response containing the message object if it is found. If the message is not found,
 * a 404 status code and a JSON response with the message "Message not found" is returned.
 */
export const getMessageById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params
        const message = await prisma.message.findUnique({
            where: {
                id: parseInt(id),
            }
        })
    
        if (!message) {
            return res.status(404).json({ message: 'Message not found' })
        }
    
        res.json(message)
    } catch (error) {
        next(error)
    }
}

/**
 * The `createMessage` function is an asynchronous function that handles the creation of a new message in
 * a database. 
 * @returns a JSON response with the created message data.
 */
export const createMessage = async (req: Request, res: Response, next: NextFunction) => {
    errorResponse(req, res)

    try {
        const { name, email, message } = req.body
        const userMessage = await prisma.message.create({
            data: {
                name,
                email,
                message
            }
        })
        res.json({ success: true, data: userMessage })
    } catch (error) {
        next(error)
    }
}

/**
 * The `deleteMessage` function is an asynchronous function that deletes a message from the database
 * based on the provided ID and returns the deleted message or an error message if the message is not
 * found or if something goes wrong.
 * @returns a JSON response with the deleted message if it exists.
 * @returns a JSON response with an error message if the message is not found or if there is an error.
 */
export const deleteMessage = async (req: Request, res: Response, next: NextFunction) => {
    errorResponse(req, res)

    try {
        const { id } = req.params
        const message = await prisma.message.delete({
            where: {
                id: parseInt(id)
            }
        })
        if (!message) {
            return res.status(404).json({ message: "Message not found" })
        }
        res.json({ success: true })
    } catch (error) {
        next(error)
    }
}