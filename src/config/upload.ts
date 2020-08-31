import path from 'path';
import crypto from 'crypto';
import multer from 'multer';

const uploadPath = path.resolve(__dirname, '..', '..', 'tmp');

export default {
  storage: multer.diskStorage({
    destination: uploadPath,
    filename(request, file, callback) {
      return callback(
        null,
        `${crypto.randomBytes(10).toString('HEX')}-${file.originalname}`,
      );
    },
  }),
  uploadPath,
};
