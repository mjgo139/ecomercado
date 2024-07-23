import { createContext, useContext, useState, useEffect } from "react";

// Crear el contexto del carrito
const CartContext = createContext();

// Hook personalizado para usar el contexto del carrito
export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart debe estar dentro del CartProvider');
    }
    return context;
}

// Componente proveedor del carrito
export const CartProvider = ({ children }) => {
    // Inicializar el carrito desde localStorage
    const initialCart = () => {
        const localStorageCart = localStorage.getItem('cart');
        return localStorageCart ? JSON.parse(localStorageCart) : [];
    }

    const [cart, setCart] = useState(initialCart); // Estado del carrito

    const MIN_ITEMS = 1; // Cantidad mínima de items permitida
    const MAX_ITEMS = 5; // Cantidad máxima de items permitida

    // Guardar el carrito en localStorage cuando se actualiza
    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    // Función para agregar item al carrito
    const addToCart = (item, store) => {
        const itemExists = cart.find(product => product._id === item._id);
        let updatedCart = [];

        if (itemExists) {
            updatedCart = cart.map(product => {
                if (product._id === item._id) {
                    if (product.quantity < MAX_ITEMS) {
                        return { ...product, quantity: product.quantity + 1 };
                    } else {
                        return product;
                    }
                } else {
                    return product;
                }
            });
        } else {
            const newItem = { ...item, quantity: 1, storeName: store.name };
            updatedCart = [...cart, newItem];
        }

        setCart(updatedCart);
    }

    // Función para eliminar item del carrito
    const removeFromCart = (id) => {
        setCart(prevCart => prevCart.filter(product => product._id !== id));
    }

    // Función para disminuir la cantidad de un item en el carrito
    const decreaseQuantity = (id) => {
        const updatedCart = cart.map(product => {
            if (product._id === id && product.quantity > MIN_ITEMS) {
                return { ...product, quantity: product.quantity - 1 };
            }
            return product;
        });
        setCart(updatedCart);
    }

    // Función para aumentar la cantidad de un item en el carrito
    const increaseQuantity = (id) => {
        const updatedCart = cart.map(product => {
            if (product._id === id && product.quantity < MAX_ITEMS) {
                return { ...product, quantity: product.quantity + 1 };
            }
            return product;
        });
        setCart(updatedCart);
    }

    // Función para vaciar el carrito
    const clearCart = () => {
        setCart([]);
    }

    // Proveer el contexto del carrito
    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, decreaseQuantity, increaseQuantity, clearCart }}>
            {children}
        </CartContext.Provider>
    );
}
