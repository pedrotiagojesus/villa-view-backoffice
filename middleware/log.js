const logMiddleware = (req, res, next) => {
    console.log("Headers:", req.headers); // Log dos headers da requisição
    console.log("Método:", req.method); // Log do método HTTP (GET, POST, etc.)
    next(); // Chama o próximo middleware ou rota
};

export default logMiddleware;
