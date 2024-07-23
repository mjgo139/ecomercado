import { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from '../../context/CartContext';
import { useAuth } from "../../context/AuthContext";
import { useProduct } from "../../context/ProductsContext";
import logo from '../../assets/ecomercado.png';

export default function ProductCard({ product, store }) {
    const { deleteProduct } = useProduct();
    const { user } = useAuth();
    const { addToCart } = useCart();
    const imageUrl = `${import.meta.env.VITE_API_HOST}/${product.photo}`;
    
    const [showMessage, setShowMessage] = useState(false);

    const handleAddToCart = (product, store) => {
        addToCart(product, store);
        setShowMessage(true);
        setTimeout(() => setShowMessage(false), 3000); // El mensaje se oculta después de 3 segundos
    };

    return (
        <div className="max-w-[384px] mx-auto flex flex-col justify-between h-full bg-gray-300 hover:bg-gray-400 transition-colors duration-300 rounded-lg shadow-lg p-4">
            <div>
                <div className="w-full max-w-sm aspect-square">
                    <img
                        src={imageUrl}
                        alt={`Imagen de ${product.name}`}
                        className="w-full h-full rounded-xl"
                    />
                </div>
                <div className="mt-5">
                    <h6 className="font-medium text-xl leading-8 text-black mb-2">{product.name}</h6>
                    <h6 className="font-semibold text-xl leading-8 text-indigo-600">{product.price} Gs</h6>
                </div>
            </div>
            <div className="mt-5 flex flex-col space-y-2">
                {user && user.role === 'User' && (
                    <>
                        {store && (user.id === store.owner) && (
                            <>
                                <Link
                                    to={`/edit-product/${product._id}`}
                                    className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-md"
                                >
                                    Editar Producto
                                </Link>
                                <button
                                    onClick={() => deleteProduct(product._id)}
                                    className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-md"
                                >
                                    Eliminar Producto
                                </button>
                            </>
                        )}
                    </>
                )}

                <button
                    onClick={() => handleAddToCart(product, store)}
                    className="bg-green-500 hover:bg-green-600 text-white p-2 rounded-md"
                >
                    Añadir al Carrito
                </button>
            </div>
            {showMessage && (
                <div className="mt-3 p-2 bg-green-200 text-green-800 rounded-md text-center">
                    Producto añadido al carrito!
                </div>
            )}
        </div>
    );
}
