import express from 'express';
import cors from 'cors';
import pool from './config/database';
import apiRoute from "./routes/apiRoute";

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.use('/api', apiRoute);

const startServer = async (): Promise<void> => {
try {
    await pool.connect();
    console.log('Connected to PostgreSQL');

    app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
    });
} catch (error) {
    console.error('Database connection failed:', error);
}
};

startServer();