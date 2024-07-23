
import jwt from "jsonwebtoken";
import dotenv from 'dotenv';

dotenv.config();

export const authRequired = (req, res, next) => {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(" ")[1]; // Extraer el token del encabezado de autorización
    console.log('Token recibido:', token);

    if (!token) {
        console.log('No hay token, autorización denegada');
        return res.status(401).json({ message: "No hay token, autorización denegada" });
    }

    jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
        if (err) {
            console.log('Token inválido');
            return res.status(403).json({ message: "Token inválido" });
        }
        console.log('Usuario autenticado:', user);
        req.user = user;
        next();
    });
};



/*export const authRequired = (req, res, next) => {
    const { token } = req.cookies;
    console.log('Token recibido:', token);

    if (!token) {
        console.log('No hay token, autorización denegada');
        return res.status(401).json({ message: "No hay token, autorización denegada" });
    }

    jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
        if (err) {
            console.log('Token inválido');
            return res.status(403).json({ message: "Token inválido" });
        }
        console.log('Usuario autenticado:', user);
        req.user = user;
        next();
    });
};*/
