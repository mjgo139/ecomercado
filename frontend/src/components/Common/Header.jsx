import React, { useState } from 'react';
import { FaShoppingCart } from 'react-icons/fa';
import Logout from "./Logout";
import Cart from './Cart';
import { useCart } from '../../context/CartContext';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import logo from '../../assets/ecomercado.png';
export default function Header({ store }) {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const { user } = useAuth();
    const { cart } = useCart();
    const apiUrl = `${import.meta.env.VITE_API_HOST}`;
    const imageUrl = store ? `${apiUrl}/${store.logo}` : logo;

    const handleCartOpen = () => {
        setIsCartOpen(true);
    };

    const handleCartClose = () => {
        setIsCartOpen(false);
    };

    return (
        <header className="bg-gray-900 text-white">
            <section className="p-5 flex flex-col md:flex-row items-center w-full">
                <div className="flex flex-col md:flex-row items-center md:space-x-4 flex-grow-0 md:flex-basis-1/3">
                    <div className="w-40 h-40 rounded-full bg-blue-500 flex justify-center items-center overflow-hidden border mb-4 md:mb-0">
                        <img
                            src={imageUrl}
                            className="object-cover w-full h-full"
                            alt="Imagen de la tienda"
                        />
                    </div>
                </div>
                <div className="flex-grow md:flex-basis-1/3 text-center md:text-left md:ml-4">
                    <h1 className="text-xl font-bold">{store ? store.name : 'EcoMercado'}</h1>
                    <p className="text-lg">Conocé {store ? store.name : 'EcoMercado'}</p>
                    <p className="text-sm max-h-32 overflow-y-auto mt-2">{store ? store.description : 'Ecomercado es una plataforma centralizada que reúne múltiples tiendas en un solo lugar, ofreciendo a los usuarios una experiencia de compra conveniente y variada. Facilita el descubrimiento y compra de nuevos productos!!!'}</p>
                </div>
                <div className="mt-4 md:mt-0 flex space-x-4 flex-grow-0 md:flex-basis-1/3">
                    <button
                        className="flex items-center space-x-2 bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-2 px-4 rounded"
                        onClick={handleCartOpen}
                    >
                        <FaShoppingCart size={24} />
                        <span>Carrito ({cart.length})</span> 
                    </button>
                    {user && (<Logout />)}
                </div>
            </section>
            <nav className="p-5 w-full">
                <ul className="flex flex-col md:flex-row justify-around items-center w-full">
                    <Link to={'/stores'} className="w-full md:w-1/2 h-16 bg-gray-800 hover:bg-gray-700 rounded-full flex justify-center items-center cursor-pointer mb-4 md:mb-0">
                        Inicio
                    </Link>
                    {user ? (
                        user.role === 'Admin' ? (
                            <Link to={'/stores/admin'} className="w-full md:w-1/2 h-16 bg-gray-800 hover:bg-gray-700 rounded-full flex justify-center items-center cursor-pointer mb-4 md:mb-0">
                                Todas las tiendas (Admin)
                            </Link>
                        ) : (
                            <Link to={'/stores/owner'} className="w-full md:w-1/2 h-16 bg-gray-800 hover:bg-gray-700 rounded-full flex justify-center items-center cursor-pointer mb-4 md:mb-0">
                                Mis tiendas
                            </Link>
                        )
                    ) : (
                        <Link to={'/register'} className="w-full md:w-1/2 h-16 bg-gray-800 hover:bg-gray-700 rounded-full flex justify-center items-center cursor-pointer mb-4 md:mb-0">
                            Publicar tienda
                        </Link>
                    )}

                    {user && user.role === 'User' && (
                        <>
                            {store && (user.id === store.owner) ? (
                                <Link
                                    className="w-full md:w-1/2 h-16 bg-gray-800 hover:bg-gray-700 rounded-full flex justify-center items-center cursor-pointer"
                                    to={'/add-product'}
                                >
                                    Agregar Producto
                                </Link>
                            ) : (
                                <Link
                                    className="w-full md:w-1/2 h-16 bg-gray-800 hover:bg-gray-700 rounded-full flex justify-center items-center cursor-pointer"
                                    to={'/add-store'}
                                >
                                    Agregar Tienda
                                </Link>
                            )}
                        </>
                    )}
                </ul>
            </nav>
            {isCartOpen && <Cart onClose={handleCartClose} store={store} />}
        </header>
    );
}
