import userModel from "../models/user.model.js";
import bcrypt from "bcryptjs/dist/bcrypt.js";
import { createAccessToken } from "../libs/jwt.js";
import jwt from "jsonwebtoken";
import dotenv from 'dotenv';

dotenv.config(); // Cargar variables de entorno

// Registrar un nuevo usuario
export const register = async (req, res) => {
    const { username, email, role, password } = req.body;
    try {
        // Verificar si el usuario ya existe
        const existUser = await userModel.findOne({ email });
        if (existUser) {
            return res.status(400).json(['Ya existe un usuario con ese Email']);
        }
        
        // Hashear la contraseña
        const passwordHash = await bcrypt.hash(password, 10);

        // Crear un nuevo usuario
        const newUser = new userModel({
            username,
            email,
            role,
            password: passwordHash
        });

        await newUser.save();

        // Crear token de acceso
        const token = await createAccessToken({ id: newUser._id });

        // Responder con el token y los datos del nuevo usuario
        res.status(200).json({
            token,
            user: {
                id: newUser._id,
                username: newUser.username,
                email: newUser.email,
                role: newUser.role
            }
        });

    } catch (error) {
        res.status(500).json({ message: error.message }); // Manejo de errores
    }
}

// Iniciar sesión de un usuario
export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        // Verificar si el usuario existe
        const existUser = await userModel.findOne({ email });

        if (!existUser) {
            return res.status(400).json(['No existe un usuario con ese email']);
        }

        // Comparar la contraseña
        const isMatch = await bcrypt.compare(password, existUser.password);

        if (!isMatch) {
            return res.status(400).json(['Contraseña invalida']);
        }

        // Crear token de acceso
        const token = await createAccessToken({ id: existUser._id });

        // Responder con el token y los datos del usuario
        res.status(200).json({
            token,
            user: {
                id: existUser._id,
                username: existUser.username,
                email: existUser.email,
                role: existUser.role
            }
        });

    } catch (error) {
        res.status(500).json({ message: error.message }); // Manejo de errores
    }
}

// Cerrar sesión de un usuario
export const logout = (req, res) => {
    // No es necesario hacer nada en el servidor, ya que el cliente eliminará el token de localStorage
    return res.sendStatus(200); // Responder con estado 200 OK
}

// Obtener el perfil de un usuario
export const profile = async (req, res) => {
    const user = await userModel.findById(req.user.id);

    if (!user) {
        return res.status(400).json(['Usuario no encontrado']);
    }

    // Responder con los datos del usuario
    return res.json({
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role
    });
}

// Middleware para verificar el token de acceso
export const authRequired = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];
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



/*import userModel from "../models/user.model.js";
import bcrypt from "bcryptjs/dist/bcrypt.js";
import { createAccessToken } from "../libs/jwt.js";
import jwt from "jsonwebtoken";
import dotenv from 'dotenv';

dotenv.config(); // Cargar variables de entorno

// Registrar un nuevo usuario
export const register = async (req, res) => {
    const { username, email, role, password } = req.body;
    try {
        // Verificar si el usuario ya existe
        const existUser = await userModel.findOne({ email });
        if (existUser) {
            return res.status(400).json(['Ya existe un usuario con ese Email']);
        }
        
        // Hashear la contraseña
        const passwordHash = await bcrypt.hash(password, 10);

        // Crear un nuevo usuario
        const newUser = new userModel({
            username,
            email,
            role,
            password: passwordHash
        });

        await newUser.save();

        // Crear token de acceso
        const token = await createAccessToken({ id: newUser._id });
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', // Asegúrate de que esto es true en producción
            sameSite: 'Strict'
        });

        // Responder con los datos del nuevo usuario
        res.status(200).json({
            id: newUser._id,
            username: newUser.username,
            email: newUser.email,
            role: newUser.role
        });

    } catch (error) {
        res.status(500).json({ message: error.message }); // Manejo de errores
    }
}

// Iniciar sesión de un usuario
export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        // Verificar si el usuario existe
        const existUser = await userModel.findOne({ email });

        if (!existUser) {
            return res.status(400).json(['No existe un usuario con ese email']);
        }

        // Comparar la contraseña
        const isMatch = await bcrypt.compare(password, existUser.password);

        if (!isMatch) {
            return res.status(400).json(['Contraseña invalida']);
        }

        // Crear token de acceso
        const token = await createAccessToken({ id: existUser._id });
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', // Asegúrate de que esto es true en producción
            sameSite: 'Strict'
        });

        // Responder con los datos del usuario
        res.status(200).json({
            id: existUser._id,
            username: existUser.username,
            email: existUser.email,
            role: existUser.role
        });

    } catch (error) {
        res.status(500).json({ message: error.message }); // Manejo de errores
    }
}

// Cerrar sesión de un usuario
export const logout = (req, res) => {
    res.cookie('token', '', {
        expires: new Date(0) // Expirar la cookie inmediatamente
    });
    return res.sendStatus(200); // Responder con estado 200 OK
}

// Obtener el perfil de un usuario
export const profile = async (req, res) => {
    const user = await userModel.findById(req.user.id);

    if (!user) {
        return res.status(400).json(['Usuario no encontrado']);
    }

    // Responder con los datos del usuario
    return res.json({
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role
    });
}

// Verificar el token de acceso
export const verifyToken = async (req, res) => {
    const { token } = req.cookies;

    if (!token) return res.status(401).json({ message: 'No autorizado' });

    jwt.verify(token, process.env.TOKEN_SECRET, async (err, user) => {
        if (err) return res.status(401).json({ message: 'No autorizado' });

        const userFound = await userModel.findById(user.id);

        if (!userFound) return res.status(401).json({ message: 'No autorizado' });

        // Responder con los datos del usuario
        return res.json({
            id: userFound._id,
            username: userFound.username,
            email: userFound.email,
            role: userFound.role
        });
    });
}
*/