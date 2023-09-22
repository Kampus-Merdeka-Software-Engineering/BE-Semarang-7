import { body } from "express-validator";

export * as reviewValidator from "@/validations/review"

/**
 * The `createValidation` array contains a set of validation rules for the request body of the
 * `createReview` function.
 */
export const createValidation = [
    body("name").isString(),
    body("email").isEmail(),
    body("rating").isNumeric(),
    body("review").isString()
]