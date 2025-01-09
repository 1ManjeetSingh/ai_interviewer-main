import express from 'express';
import connectDB from './config/db.js';
import alljobspostedRoute from './routes/alljobsposted.js';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
// const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:5178';

app.use(express.json());
app.use(cors());

app.use(morgan('dev'));

// Database connection with error handling
connectDB()
    .then(() => {
        app.use('/api/alljobsposted', alljobspostedRoute);

        // Start server
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch(error => {
        console.error('Database connection error:', error);
        process.exit(1);
    });
