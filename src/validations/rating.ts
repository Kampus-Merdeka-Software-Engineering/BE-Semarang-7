import { body } from "express-validator";

export * as ratingValidator from "@/validations/rating"

/** 
 * The code is exporting an array called `createValidation` which contains validation rules for
 * creating a rating.
*/
export const createValidation = [
    body("productId").isNumeric().escape(),
    body("rating").isNumeric(),
]