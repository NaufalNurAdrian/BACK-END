import {Request } from "express"
import multer from "multer"
import path from "path"

type DestinationCallBack = (error: Error | null, destination: string) => void
type FileNameCallBack = (error: Error | null, destination: string) => void

export const Uploader = (type: "memoryStorage" | "diskStorage" = "memoryStorage", filePrefix: string, folderName: string) => {
    const defaultDir = path.join(__dirname, "../../public")

    const storage = type == "memoryStorage" ? multer.memoryStorage() :
    multer.diskStorage({
        destination: (req: Request, file: Express.Multer.File, cb: DestinationCallBack) => {
            const Destination = folderName ? defaultDir + folderName : defaultDir;
            cb(null, Destination);
        },
        filename: (req: Request, file: Express.Multer.File, cb: FileNameCallBack) => {
            const originalNameParts = file.originalname.split(".")
            const fileExtension = originalNameParts[originalNameParts.length - 1]
            const newFileName = filePrefix + Date.now() + "." + fileExtension
            cb(null, newFileName)
        },
    });
    return multer({storage})
}

