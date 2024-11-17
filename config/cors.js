import dotenv from "dotenv";

dotenv.config();

const corsOptions = {
    origin: process.env.API_URL,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
};

export default corsOptions;
