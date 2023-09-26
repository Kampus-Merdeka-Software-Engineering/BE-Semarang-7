import { Router } from "express"
import { ratingValidator } from "@/validations/rating"
import { ratingController } from "@/controllers/rating"

export const router = Router()

router.post("/", ratingValidator.createValidation, ratingController.createRating)