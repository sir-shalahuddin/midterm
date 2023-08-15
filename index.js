import express from 'express';
import mongoose from 'mongoose';
// eslint-disable-next-line import/no-extraneous-dependencies
import dotenv from 'dotenv';
import cors from 'cors';
import expressWs from 'express-ws';
import { handleWebSocketConnection } from './controllers/comments.js';
import router from './routers/routes.js';

dotenv.config();

const app = express();
expressWs(app);

mongoose.connect(process.env.DATABASE_URL)
    .then(() => {
        // eslint-disable-next-line no-console
        console.log('Connected to MongoDB');
    })
    .catch((err) => {
        // eslint-disable-next-line no-console
        console.error('Error connecting to MongoDB:', err);
    });

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', router);

app.ws('/comments-ws', handleWebSocketConnection);

app.listen(process.env.APP_PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`server running on port ${process.env.APP_PORT}`);
});
