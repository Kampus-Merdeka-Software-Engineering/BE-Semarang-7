import { validationResult } from "express-validator"
import { Request, Response } from "express"
import fs from "fs"

/**
 * The function checks for validation errors in a request and returns a response with the errors if
 * any.
 * @param {Request} req - The `req` parameter represents the HTTP request object, which contains
 * information about the incoming request such as headers, query parameters, and request body.
 * @param {Response} res - The `res` parameter is an object representing the HTTP response that will be
 * sent back to the client. It is used to set the status code and send the response body.
 * @returns If there are no errors, nothing is being returned. If there are errors, a response with
 * status code 400 and a JSON object containing the properties "success" set to false and "errors" set
 * to the array of errors is being returned.
 */
export const errorResponse = (req: Request, res: Response) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        if (req.file) {
            fs.unlink(
                req.file.path,
                (err) => console.log(err)
            );
        }
        return res.status(400).json({ success: false, errors: errors.array() })
    }
}