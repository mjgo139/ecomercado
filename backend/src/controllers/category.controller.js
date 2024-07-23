import categoryModel from "../models/category.model.js"

export const getCategories = async (req, res) => {
    try {
        const categories = await categoryModel.find();

        res.status(200).json(categories)
    } catch (error) {
        res.status(500).json({ message: 'Error interno del Servidor' });
    }
}

export const getCategory = async (req, res) => {
    const {id} = req.params;
    try {
        const category = await categoryModel.findById(id);

        res.status(200).json(category)
    } catch (error) {
        res.status(500).json({ message: 'Error interno del Servidor' });
    }
}

export const createCategory = async (req, res) => {
    const { description } = req.body;
    try {

        const existingCategory = await categoryModel.findOne({ description });

        if (existingCategory) {
            return res.status(400).json({ message: 'La categoria ya existe' });
        }

        const newCategory = new categoryModel({
            description
        });

        await newCategory.save()

        res.status(200).json(newCategory);
    } catch (error) {
        res.status(500).json({ message: 'Error interno del Servidor' })
    }
}

export const updateCateory = async (req, res) => {
    const {id} = req.params;
    const {description} = req.body;
    try {

        if(!description){
            return res.status(400).json({message:'Se requiere al menos un campo para actualizar'});
        }

        const updatedCategory = await categoryModel.findByIdAndUpdate(id,
            {$set:{description}},
            {new:true}
        );

        if(!updatedCategory){
            return res.status(400).json({message:'No existe una categoria con ese ID'});
        }

        res.status(200).json({ message: 'Producto actualizada correctamente', updatedCategory });
    } catch (error) {
        res.status(500).json({ message: 'Error interno del Servidor' });
    }
}

export const deleteCategory = async (req, res) => {
    const { id } = req.params;
    try {
        const deleteCategory = await categoryModel.findByIdAndDelete(id);

        if (!deleteCategory) {
            return res.status(400).json({ message: 'Categoria no encontrada' });
        }

        res.status(204).json({ message: 'Categoria eliminada correctamente', deleteCategory });
    } catch (error) {
        res.status(500).json({ message: 'Error interno del Servidor' });
    }
}