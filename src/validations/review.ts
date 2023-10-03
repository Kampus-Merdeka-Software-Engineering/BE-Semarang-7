import { body } from "express-validator";

export * as reviewValidator from "@/validations/review"

/**
 * The `createValidation` array contains a set of validation rules for the request body of the
 * `createReview` function.
 */
export const createValidation = [
    body("name").isString().isLength({ max: 250 }).escape(),
    body("email").isEmail().escape(),
    body("rating").isNumeric(),
    body("review").isString().escape()
]