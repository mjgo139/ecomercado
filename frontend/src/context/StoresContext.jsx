import { createContext, useContext, useState } from "react";
import { createStoreRequest, deleteStoreRequest, getStoreRequest, getStoresAdminRequest, getStoresByOwnerRequest, getStoresRequest, updateStatusRequest, updateStoreRequest } from "../api/stores";

// Crear el contexto de tiendas
const StoreContext = createContext();

// Hook personalizado para usar el contexto de tiendas
export const useStore = () => {
    const context = useContext(StoreContext);

    if (!context) {
        throw new Error('useStore deberia de estar dentro del StoreProvider');
    }

    return context;
}

// Componente proveedor de tiendas
export function StoreProvider({ children }) {
    const [stores, setStores] = useState([]); // Estado de la lista de tiendas

    // Obtener todas las tiendas
    const getStores = async () => {
        try {
            const res = await getStoresRequest();
            setStores(res.data);
        } catch (error) {
            console.log(error);
        }
    }

    // Obtener tiendas para administrador
    const getStoresAdmin = async () => {
        try {
            const res = await getStoresAdminRequest();
            setStores(res.data);
        } catch (error) {
            console.log(error);
        }
    }

    // Obtener tiendas por dueño
    const getStoresByOwner = async () => {
        try {
            const res = await getStoresByOwnerRequest();
            setStores(res.data);
        } catch (error) {
            console.log(error);
        }
    }

    // Crear una nueva tienda
    const createStore = async (store) => {
        try {
            const res = await createStoreRequest(store);
            console.log(res);
        } catch (error) {
            console.log(error);
        }
    }

    // Actualizar una tienda existente
    const updateStore = async (id, store) => {
        try {
            const res = await updateStoreRequest(id, store);
            console.log(res);
        } catch (error) {
            console.log(error);
        }
    }

    // Eliminar una tienda
    const deleteStore = async (id) => {
        try {
            const res = await deleteStoreRequest(id);
            if (res.status === 204) setStores(stores.filter(store => store._id !== id));
        } catch (error) {
            console.log(error);
        }
    }

    // Obtener una tienda por su ID
    const getStore = async (id) => {
        try {
            const res = await getStoreRequest(id);
            return (res.data);
        } catch (error) {
            console.log(error);
        }
    }

    // Actualizar el estado de una tienda
    const statusStore = async (id, status) => {
        try {
            const newStatus = { status: !status };
            console.log(newStatus);
            const res = await updateStatusRequest(id, newStatus);
            console.log(res.data);
            getStoresAdmin();
        } catch (error) {
            console.log(error);
        }
    }

    // Proveer el contexto de tiendas
    return (
        <StoreContext.Provider value={{ stores, createStore, updateStore, deleteStore, getStores, getStore, getStoresByOwner, statusStore, getStoresAdmin }}>
            {children}
        </StoreContext.Provider>
    );
}
