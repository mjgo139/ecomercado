import multer from 'multer';
import path from 'path';

// Configuración de almacenamiento de multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const dir = 'uploads/';
        console.log(`Saving file to: ${dir}`);
        cb(null, dir); // Asegurarse de usar barras inclinadas
    },
    filename: (req, file, cb) => {
        const filename = `${Date.now()}-${file.originalname}`;
        console.log(`Generated filename: ${filename}`);
        cb(null, filename);
    }
});

// Filtrar archivos por tipo
const fileFilter = (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png/;
    const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = fileTypes.test(file.mimetype);

    console.log(`File type check: extname=${extname}, mimetype=${mimetype}`);
    if (extname && mimetype) {
        return cb(null, true);
    } else {
        console.log('File type not allowed');
        cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
    }
};

const upload = multer({
    storage: storage,
    fileFilter: fileFilter
});

export default upload;
