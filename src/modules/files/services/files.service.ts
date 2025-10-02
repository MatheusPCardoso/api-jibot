import { Injectable } from '@nestjs/common'
import { UploadApiErrorResponse, UploadApiResponse, v2 } from 'cloudinary'
import toStream = require('buffer-to-stream')
import { ImageUploadDto } from '../dtos/image-upload.dto'
import {
  FileUploadError,
  WrongFolderError,
} from '@src/modules/exceptions/modules/files'
import { AVAILABLE_UPLOAD_FOLDERS } from '../constants'

@Injectable()
export class FilesService {
  async uploadImageBuffer(
    file: Express.Multer.File,
  ): Promise<UploadApiResponse | UploadApiErrorResponse> {
    try {
      const result = await new Promise<
        UploadApiResponse | UploadApiErrorResponse
      >((resolve, reject) => {
        const upload = v2.uploader.upload_stream((error, result) => {
          if (error) {
            return reject(error)
          }
          resolve(result)
        })
        toStream(file.buffer).pipe(upload)
      })

      return result
    } catch (error) {
      throw new FileUploadError()
    }
  }

  folderVerification(folder: string) {
    return AVAILABLE_UPLOAD_FOLDERS.includes(folder)
  }

  async uploadImage(
    body: ImageUploadDto,
  ): Promise<UploadApiResponse | UploadApiErrorResponse> {
    try {
      if (body?.folder && !this.folderVerification(body.folder)) {
        throw new WrongFolderError()
      }
      return await v2.uploader.upload(body.src, {
        folder: body?.folder,
        allowed_formats: ['jpg', 'png'],
      })
    } catch (error) {
      throw new FileUploadError()
    }
  }
}
