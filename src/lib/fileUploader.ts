import multer from "multer"

export * as fileUploader from "@/lib/fileUploader"

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./public/uploads")
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9)
        cb(null, file.fieldname + "-" + uniqueSuffix + "-" + file.originalname)
    },
})

const filter = (req: any, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
    const allowedMimes = ["image/jpeg", "image/png"]
    if (allowedMimes.includes(file.mimetype)) {
        cb(null, true)
    } else {
        cb(new Error("Invalid file type. Only JPEG and PNG files are allowed."))
    }
}

/**
 * The `imageUploader` function is a Multer middleware that handles file uploads.
 * @returns a Multer middleware.
 */
export const imageUploader = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5,
    },
    fileFilter: filter,
})
