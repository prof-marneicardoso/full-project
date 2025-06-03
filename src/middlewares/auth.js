import jwt from "jsonwebtoken";

export default (request, response, next) => {
    const token = request.headers.authorization;

    if (!token) {
        return response.status(401).json({
            mensagem: "Token não fornecido"
        });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        request.userID = decoded.id;
        next();
    
    } catch (error) {
        response.status(401).json({
            mensagem: "Token não fornecido"
        });
    }
};
