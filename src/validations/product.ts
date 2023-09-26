import { body, param } from "express-validator"

export * as productValidator from "@/validations/product"

export const createValidation = [
    body("name").isString(),
    body("price").isNumeric(),
]

export const updateValidation = [
    param("id").isNumeric(),
    body("name").isString(),
    body("price").isNumeric(),
]

export const deleteValidation = [
    param("id").isNumeric()
]