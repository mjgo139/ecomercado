import express from "express";
import morgan from "morgan";
import cors from 'cors';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

import authRoutes from './routes/auth.routes.js';
import storeRoutes from './routes/store.routes.js';
import productRoutes from './routes/product.routes.js';
import categoryRoutes from './routes/category.routes.js';

const app = express();

// Leer los orígenes permitidos desde la variable de entorno y dividirlos en un array
const allowedOrigins = process.env.ALLOWED_ORIGINS.split(',');

// Configurar CORS
app.use(cors({
    origin: function (origin, callback) {
        console.log(`CORS origin: ${origin}`);
        if (!origin) return callback(null, true);
        if (allowedOrigins.indexOf(origin) === -1) {
            const msg = `The CORS policy for this site does not allow access from the specified origin: ${origin}`;
            console.log(msg);
            return callback(new Error(msg), false);
        }
        return callback(null, true);
    },
    credentials: true, // Permitir el envío de cookies
    allowedHeaders: ['Content-Type', 'Authorization'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
}));

app.use(morgan('dev')); // Middleware de registro de solicitudes HTTP
app.use(express.json()); // Middleware para parsear cuerpos de solicitudes JSON
app.use(express.urlencoded({ extended: true })); // Middleware para parsear cuerpos de solicitudes URL encoded

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Crear el directorio "uploads" en la raíz del proyecto si no existe
const rootDir = path.resolve(__dirname, '../'); // Mover una carpeta hacia arriba
const uploadDir = path.join(rootDir, 'uploads');
if (!fs.existsSync(uploadDir)) {
    console.log(`Creating directory: ${uploadDir}`);
    fs.mkdirSync(uploadDir, { recursive: true });
} else {
    console.log(`Directory already exists: ${uploadDir}`);
}

// Servir archivos estáticos desde el directorio "uploads"
app.use('/uploads', express.static(uploadDir));

// Definir rutas de la API
app.use('/api', authRoutes);
app.use('/api', storeRoutes);
app.use('/api', productRoutes);
app.use('/api', categoryRoutes);

export default app;





/*import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

import authRoutes from './routes/auth.routes.js';
import storeRoutes from './routes/store.routes.js';
import productRoutes from './routes/product.routes.js';
import categoryRoutes from './routes/category.routes.js';

const app = express();

// Leer los orígenes permitidos desde la variable de entorno y dividirlos en un array
const allowedOrigins = process.env.ALLOWED_ORIGINS.split(',');

// Configurar CORS
app.use(cors({
    origin: function (origin, callback) {
        console.log(origin)
        if (!origin) return callback(null, true); 
        if (allowedOrigins.indexOf(origin) === -1) {
            const msg = `The CORS policy for this site does not allow access from the specified origin: ${origin}`;
            return callback(new Error(msg), false);
        }
        return callback(null, true);
    },
    credentials: true, // Permitir el envío de cookies
    allowedHeaders: ['Content-Type', 'Authorization'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
}));

app.use(morgan('dev')); // Middleware de registro de solicitudes HTTP
app.use(express.json()); // Middleware para parsear cuerpos de solicitudes JSON
app.use(cookieParser()); // Middleware para parsear cookies

// Obtener __filename y __dirname en módulos ES
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Servir archivos estáticos desde el directorio "uploads"
app.use('/uploads', express.static(path.join(__dirname, '../uploads'))); 

// Definir rutas de la API
app.use('/api', authRoutes);
app.use('/api', storeRoutes);
app.use('/api', productRoutes);
app.use('/api', categoryRoutes);

export default app;
*/