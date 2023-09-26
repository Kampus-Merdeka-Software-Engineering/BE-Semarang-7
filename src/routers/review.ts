import { Router } from 'express'
import { reviewValidator } from '@/validations/review'
import { reviewController } from '@/controllers/review'

export const router = Router()

router.get('/', reviewController.getReviews)
router.get('/:id', reviewController.getReviewById)
router.post('/', reviewValidator.createValidation, reviewController.createReview)