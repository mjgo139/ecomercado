import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const port = process.env.PORT || 3000;

// Obtener __filename y __dirname en módulos ES
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Sirve los archivos estáticos generados por Vite en la carpeta 'dist'
app.use(express.static(path.join(__dirname, 'dist')));

// Redirige todas las rutas al archivo 'index.html'
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(port, () => {
    console.log(`Servidor corriendo en el puerto ${port}`);
});
