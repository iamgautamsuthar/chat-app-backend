import { server } from './app.js';
import { PORT } from './constant.js';
import { connectDB } from './db/db.js';
import dotenv from 'dotenv';
dotenv.config();

connectDB()
    .then(() => {
        server.listen(PORT, () =>
            console.log(`Server is running http://localhost:${PORT}`)
        );
    })
    .catch((error) => console.log(`Mongo DB connection error: ${error}`));
