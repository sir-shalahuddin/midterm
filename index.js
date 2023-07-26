import express from 'express';
import mongoose from 'mongoose';
// eslint-disable-next-line import/no-extraneous-dependencies
import dotenv from 'dotenv';
import router from './routers/routes.js';

dotenv.config();

const app = express();
mongoose.connect(process.env.DATABASE_URL)
    .then(() => {
        // eslint-disable-next-line no-console
        console.log('Connected to MongoDB');
    })
    .catch((err) => {
        // eslint-disable-next-line no-console
        console.error('Error connecting to MongoDB:', err);
    });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', router);

app.listen(process.env.APP_PORT, () => {
    // eslint-disable-next-line no-console
    console.log('server running on port 3000');
});
