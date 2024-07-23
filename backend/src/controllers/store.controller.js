import storeModel from "../models/store.model.js"

// Obtener todas las tiendas activas
export const getStores = async (req, res) => {
    try {
        const stores = await storeModel.find({status:true});
        res.status(200).json(stores);
    } catch (error) {
        res.status(500).json({ message: 'Error interno del Servidor' });
    }
}

// Obtener todas las tiendas (administrador)
export const getStoresAdmin = async (req, res) => {
    try {
        const stores = await storeModel.find();
        res.status(200).json(stores);
    } catch (error) {
        res.status(500).json({ message: 'Error interno del Servidor' });
    }
}

// Obtener una tienda por su ID
export const getStore = async (req, res) => {
    const { id } = req.params;
    try {
        const store = await storeModel.findById(id);
        res.status(200).json(store);
    } catch (error) {
        res.status(500).json({ message: 'Error interno del Servidor' });
    }
}

// Obtener tiendas por propietario
export const getStoresByOwner = async (req, res) => {
    try {
        const stores = await storeModel.find({ owner: req.user.id });
        if (stores.length === 0) {
            return res.status(400).json({ message: 'No se encontraron tiendas para este propietario' });
        }
        res.status(200).json(stores);
    } catch (error) {
        res.status(500).json({ message: 'Error interno del Servidor' });
    }
}

export const createStore = async (req, res) => {
    try {
        const { name, description, phone } = req.body;
        const logo = req.file ? req.file.path.replace(/\\/g, '/') : '';

        const newStore = new storeModel({
            name,
            description,
            owner: req.user.id,
            logo,
            phone
        });
        await newStore.save();
        res.status(200).json(newStore);
    } catch (error) {
        console.error('Error creating store:', error);
        res.status(500).json({ message: 'Error al crear la tienda', error });
    }
};

// Actualizar una tienda existente
export const updateStore = async (req, res) => {
    try {
        const { name, description, phone } = req.body;
        const logo = req.file ? req.file.path.replace(/\\/g, '/') : undefined;
        console.log(`Updating store with logo: ${logo}`);

        const updatedStoreData = {
            name,
            description,
            phone
        };

        if (logo) {
            updatedStoreData.logo = logo;
        }

        const updatedStore = await storeModel.findByIdAndUpdate(
            req.params.id,
            updatedStoreData,
            { new: true }
        );

        if (!updatedStore) {
            return res.status(404).json({ message: 'Tienda no encontrada' });
        }

        res.status(200).json(updatedStore);
    } catch (error) {
        console.error('Error updating store:', error);
        res.status(500).json({ message: 'Error al actualizar la tienda', error });
    }
};

// Actualizar el estado de una tienda
export const updateStatusStore = async (req, res) => {
    try {
        const { status } = req.body;

        const updatedStore = await storeModel.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true }
        );

        if (!updatedStore) {
            return res.status(404).json({ message: 'Tienda no encontrada' });
        }

        res.status(200).json(updatedStore);
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar el estado de la tienda', error });
    }
};

// Eliminar una tienda
export const deleteStore = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedStore = await storeModel.findByIdAndDelete(id);

        if (!deletedStore) {
            return res.status(400).json({ message: 'Tienda no encontrada' });
        }

        res.status(204).json({ message: 'Tienda eliminada correctamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error interno del Servidor' });
    }
}
