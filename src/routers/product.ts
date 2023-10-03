import { Router } from "express"
import { productValidator } from "@/validations/product"
import { productController } from "@/controllers/product"
import { fileUploader } from "@/lib/fileUploader"

export const router = Router()

router.get("/", productController.getProducts)
router.get("/:id", productValidator.getValidation, productController.getProductById)
router.post("/", fileUploader.imageUploader.single('image'), productValidator.createValidation, productController.createProduct)
router.put("/:id", fileUploader.imageUploader.single('image'), productValidator.updateValidation, productController.updateProduct)
router.delete("/:id", productValidator.deleteValidation, productController.deleteProduct)
