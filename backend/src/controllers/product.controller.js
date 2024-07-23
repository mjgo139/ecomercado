import productModel from "../models/product.model.js"

// Obtener productos por tienda
export const getProductsByStore = async (req, res) => {
    const { id } = req.params;
    try {
        const products = await productModel.find({ idStore: id });
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: 'Error interno del Servidor' });
    }
}

// Obtener productos por categoría
export const getProductsByCategory = async (req, res) => {
    const { id } = req.params;
    try {
        const products = await productModel.find({ idCategory: id });
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: 'Error interno del Servidor' });
    }
}

// Obtener un producto por su ID
export const getProductsById = async (req, res) => {
    const { id } = req.params;
    try {
        const product = await productModel.findById(id);
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: 'Error interno del Servidor' });
    }
}

// Crear un nuevo producto
export const createProduct = async (req, res) => {
    try {
        const { name, description, price, idStore, availability } = req.body;
        // Obtener la ruta de la foto si está presente
        const photo = req.file ? req.file.path.replace(/\\/g, '/') : '';

        const newProduct = new productModel({
            name,
            description,
            price: parseFloat(price), // Asegurar que el precio sea un número
            photo,
            idStore,
            availability
        });

        await newProduct.save();
        res.status(201).json(newProduct);
    } catch (error) {
        res.status(500).json({ message: 'Error al crear el producto', error });
    }
}

// Actualizar un producto existente
export const updateProduct = async (req, res) => {
    try {
        const { name, description, price, idStore, availability } = req.body;
        const photo = req.file ? req.file.path.replace(/\\/g, '/') : undefined;

        const updatedProductData = {
            name,
            description,
            price: parseFloat(price),
            availability: availability === 'true', // Convertir a booleano
            idStore
        };

        if (photo) {
            updatedProductData.photo = photo;
        }

        const updatedProduct = await productModel.findByIdAndUpdate(
            req.params.id,
            updatedProductData,
            { new: true } // Devolver el documento actualizado
        );

        if (!updatedProduct) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }

        res.status(200).json(updatedProduct);
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar el producto', error });
    }
}

// Eliminar un producto
export const deleteProduct = async (req, res) => {
    const { id } = req.params;
    try {
        const deleteProduct = await productModel.findByIdAndDelete(id);

        if (!deleteProduct) {
            return res.status(400).json({ message: 'Producto no encontrada' });
        }

        res.status(204).json({ message: 'Producto eliminada correctamente', deleteProduct });
    } catch (error) {
        res.status(500).json({ message: 'Error interno del Servidor' });
    }
}
