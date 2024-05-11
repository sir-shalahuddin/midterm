import multer from 'multer';
import { Storage } from '@google-cloud/storage';
import dotenv from 'dotenv';

dotenv.config();

const storage = new Storage();
// Konfigurasi multer storage untuk Google Cloud Storage
const gcsStorage = multer.memoryStorage();

// Fungsi untuk mengatur nama file yang akan diunggah
const generateFileName = (file) => {
    const fileName = `${Date.now()}_${file.originalname}`;
    return fileName;
};

// Fungsi untuk mengunggah file ke GCS
const uploadFileToGCS = (file) => {
    const bucket = storage.bucket(process.env.GCS_BUCKET_NAME);
    const fileName = generateFileName(file);
    const fileToUpload = bucket.file(fileName);

    const stream = fileToUpload.createWriteStream({
        metadata: {
            contentType: file.mimetype,
        },
        resumable: false,
    });

    return new Promise((resolve, reject) => {
        stream.on('error', (error) => {
            reject(error);
        });

        stream.on('finish', () => {
            // Setelah file selesai diunggah, dapatkan URL file yang diunggah
            const publicUrl = `https://storage.googleapis.com/${bucket.name}/${fileToUpload.name}`;
            resolve(publicUrl);
        });

        stream.end(file.buffer);
    });
};

// Middleware untuk mengelola proses upload ke GCS
const uploadImageMiddleware = async (req, res, next) => {
    const multerUpload = multer({ storage: gcsStorage }).single('file');

    multerUpload(req, res, async (error) => {
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

        try {
            // Upload file ke GCS
            req.file.publicUrl = await uploadFileToGCS(req.file);
            next();
        } catch (uploadError) {
            console.error('Error uploading file to GCS:', uploadError);
            return res.status(500).json({
                status: 'fail',
                message: 'Failed to upload file to Google Cloud Storage',
            });
        }
    });
};

export default uploadImageMiddleware;
