import dotenv from "dotenv";

dotenv.config();

// Função para conectar ao MySQL
async function connectToMySQL() {
    console.log("connectToMySQL");
}

// Função para conectar ao Firebase
function connectToFirebase() {
    console.log("connectToFirebase");
}

async function connectToDatabase() {
    const dbType = process.env.DB_TYPE;

    if (dbType === "mysql") {
        return await connectToMySQL();
    } else if (dbType === "firebase") {
        return connectToFirebase();
    } else {
        throw new Error(
            "Tipo de base de dados desconhecido. Configure DB_TYPE no .env."
        );
    }
}

export { connectToDatabase };
