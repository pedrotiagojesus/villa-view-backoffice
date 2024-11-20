import dotenv from "dotenv";

dotenv.config();

const corsOptions = {
    origin: [
        "http://localhost:5173",
        "http://192.168.50.104:5173",
        process.env.API_URL,
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
};

export default corsOptions;
