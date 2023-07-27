import multer from 'multer';
import multerS3 from 'multer-s3';
import { S3Client } from '@aws-sdk/client-s3';
import dotenv from 'dotenv';

dotenv.config();

const s3 = new S3Client({
    credentials: {
        accessKeyId: process.env.ACCESS_KEY,
        secretAccessKey: process.env.SECRET_KEY,
    },
    region: process.env.REGION,
});

const s3Storage = multerS3({
    s3,
    bucket: process.env.BUCKET_NAME,
    metadata: (req, file, cb) => {
        cb(null, { fieldname: file.fieldname });
    },
    key: (req, file, cb) => {
        const fileName = `${Date.now()}_${file.fieldname}_${file.originalname}`;
        cb(null, fileName);
    },
});

const uploadImage = multer({
    storage: s3Storage,
    limits: {
        fileSize: 1024 * 1024 * 2, // 2mb file size
    },
});

const uploadImageMiddleware = async (req, res, next) => {
    const file = uploadImage.single('file');
    // eslint-disable-next-line consistent-return
    file(req, res, (error) => {
        if (error instanceof multer.MulterError) {
            return res.status(400).json({
                status: 'fail',
                message: 'Invalid Payload',
            });
        }

        if (error) {
            return res.status(500).json({
                status: 'fail',
                message: 'Something wrong in our side',
            });
        }
        next();
    });
};

export default uploadImageMiddleware;
