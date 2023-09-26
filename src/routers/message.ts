import { Router } from "express"
import { messageValidator } from "@/validations/message"
import { messageController } from "@/controllers/message"

export const router = Router()

router.get("/", messageController.getMessages)
router.get("/:id", messageController.getMessageById)
router.post("/", messageValidator.createValidation, messageController.createMessage)
router.delete("/:id", messageValidator.deleteValidation, messageController.deleteMessage)
