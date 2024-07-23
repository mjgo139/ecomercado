import { createContext, useContext, useState } from "react";
import { createProductRequest, deleteProductRequest, getProductRequest, getProductsByCategoryRequest, getProductsByStoreRequest, updateProductRequest } from "../api/products";

// Crear el contexto de productos
const ProductContext = createContext();

// Hook personalizado para usar el contexto de productos
export const useProduct = () => {
    const context = useContext(ProductContext);

    if (!context) {
        throw new Error('useProduct deberia de estar dentro del ProductProvider');
    }

    return context;
}

// Componente proveedor de productos
export function ProductProvider({ children }) {
    const [products, setProducts] = useState([]); // Estado de la lista de productos
    const [idStore, setIdStore] = useState(''); // Estado del ID de la tienda

    // Obtener productos por tienda
    const getProductsByStore = async (id) => {
        try {
            const res = await getProductsByStoreRequest(id);
            setProducts(res.data);
        } catch (error) {
            console.log(error);
        }
    }

    // Obtener productos por categoría
    const getProductsByCategory = async (id) => {
        try {
            const res = await getProductsByCategoryRequest(id);
            setStores(res.data);
        } catch (error) {
            console.log(error);
        }
    }

    // Obtener un producto por su ID
    const getProduct = async (id) => {
        try {
            const res = await getProductRequest(id);
            return (res.data);
        } catch (error) {
            console.log(error);
        }
    }

    // Crear un nuevo producto
    const createProduct = async (product) => {
        try {
            const res = await createProductRequest(product);
            console.log(res);
        } catch (error) {
            console.log(error);
        }
    }

    // Actualizar un producto existente
    const updateProduct = async (id, product) => {
        try {
            const res = await updateProductRequest(id, product);
            console.log(res);
        } catch (error) {
            console.log(error);
        }
    }

    // Eliminar un producto
    const deleteProduct = async (id) => {
        try {
            const res = await deleteProductRequest(id);
            if (res.status === 204) setProducts(products.filter(product => product._id !== id));
        } catch (error) {
            console.log(error);
        }
    }

    // Proveer el contexto de productos
    return (
        <ProductContext.Provider value={{ setIdStore, idStore, products, createProduct, updateProduct, deleteProduct, getProduct, getProductsByStore, getProductsByCategory }}>
            {children}
        </ProductContext.Provider>
    );
}
