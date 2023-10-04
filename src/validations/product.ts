import { body, param } from "express-validator"

export * as productValidator from "@/validations/product"

export const getValidation = [
    param("id").isNumeric()
]

export const createValidation = [
    body("name").isString().escape(),
    body("price").isNumeric(),
]

export const updateValidation = [
    param("id").isNumeric(),
    body("name").isString().escape(),
    body("price").isNumeric(),
]

export const deleteValidation = [
    param("id").isNumeric()
]