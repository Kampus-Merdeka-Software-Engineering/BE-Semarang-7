import { body, param } from "express-validator";

export * as messageValidator from "@/validations/message"

/**
 * The `createValidation` array contains a set of validation rules for the request body of the
 * `createMessage` function.
 */
export const createValidation = [
    body("name").isString().escape(),
    body("email").isEmail().escape(),
    body("message").isString().escape()
]

/**
 * The `deleteValidation` array contains a set of validation rules for the request parameters of the
 * `deleteMessage` function.
 */
export const deleteValidation = [
    param("id").isNumeric()
]