import React from 'react';
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { useCart } from '../../context/CartContext';

export default function Cart({ onClose }) {
    const { cart, removeFromCart, decreaseQuantity, increaseQuantity } = useCart();
    const apiUrl = `${import.meta.env.VITE_API_HOST}`;
    //Agrupar por tiendas
    const groupedByStore = cart.reduce((acc, item) => {
        if (!acc[item.idStore]) {
            acc[item.idStore] = {
                storeName: item.storeName, 
                storePhone: '595976 470853', 
                items: [],
                total: 0
            };
        }
        acc[item.idStore].items.push(item);
        acc[item.idStore].total += item.price * item.quantity;
        return acc;
    }, {});
    //Manejar la compra por whatsapp
    const handleCheckout = (storeId) => {
        const store = groupedByStore[storeId];
        const items = store.items.map(item => `${item.quantity} x ${item.name} (${item.price.toFixed(2)} Gs)`).join('\n');
        const message = `Hola, me gustaría comprar los siguientes productos de tu tienda:\n\n${items}\n\nTotal: ${store.total.toFixed(2)} Gs`;
        const phoneNumber = store.storePhone.replace(/\s+/g, ''); 
        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

        window.open(whatsappUrl, '_blank');
    };

    return (
        <Dialog open={true} onClose={onClose} className="relative z-10">
            <DialogBackdrop
                transition
                className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity duration-500 ease-in-out"
            />
            <div className="fixed inset-0 overflow-hidden">
                <div className="absolute inset-0 overflow-hidden">
                    <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                        <DialogPanel
                            transition
                            className="pointer-events-auto w-screen max-w-md transform transition duration-500 ease-in-out sm:duration-700"
                        >
                            <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                                <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                                    <div className="flex items-start justify-between">
                                        <DialogTitle className="text-lg font-medium text-gray-900">Mi Carrito</DialogTitle>
                                        <div className="ml-3 flex h-7 items-center">
                                            <button
                                                type="button"
                                                onClick={onClose}
                                                className="relative -m-2 p-2 text-gray-400 hover:text-gray-500"
                                            >
                                                <span className="absolute -inset-0.5" />
                                                <span className="sr-only">Cerrar panel</span>
                                                <XMarkIcon aria-hidden="true" className="h-6 w-6" />
                                            </button>
                                        </div>
                                    </div>

                                    <div className="mt-8">
                                        <div className="flow-root">
                                            {Object.keys(groupedByStore).length === 0 ? (
                                                <p className="text-center text-gray-500">El carrito está vacío</p>
                                            ) : (
                                                Object.keys(groupedByStore).map((storeId) => (
                                                    <div key={storeId} className="mb-8">
                                                        <h2 className="text-xl font-bold text-gray-900 mb-4">
                                                            {groupedByStore[storeId].storeName}
                                                        </h2>
                                                        <ul role="list" className="-my-6 divide-y divide-gray-200">
                                                            {groupedByStore[storeId].items.map((item) => (
                                                                <li key={item._id} className="flex py-6">
                                                                    <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                                                        <img
                                                                            alt={`Imagen de ${item.name}`}
                                                                            src={`${apiUrl}/${item.photo}`}
                                                                            className="h-full w-full object-cover object-center"
                                                                        />
                                                                    </div>

                                                                    <div className="ml-4 flex flex-1 flex-col">
                                                                        <div>
                                                                            <div className="flex justify-between text-base font-medium text-gray-900">
                                                                                <h3>
                                                                                    <a href="#">{item.name}</a>
                                                                                </h3>
                                                                                <p className="ml-4">${item.price.toFixed(2)}</p>
                                                                            </div>
                                                                        </div>
                                                                        <div className="flex flex-1 items-end justify-between text-sm">
                                                                            <p className="text-gray-500">Cant: {item.quantity}</p>
                                                                            <div className="flex space-x-2">
                                                                                <button
                                                                                    type="button"
                                                                                    className="font-medium text-indigo-600 hover:text-indigo-500"
                                                                                    onClick={() => decreaseQuantity(item._id)}
                                                                                >
                                                                                    -
                                                                                </button>
                                                                                <span>{item.quantity}</span>
                                                                                <button
                                                                                    type="button"
                                                                                    className="font-medium text-indigo-600 hover:text-indigo-500"
                                                                                    onClick={() => increaseQuantity(item._id)}
                                                                                >
                                                                                    +
                                                                                </button>
                                                                                <button
                                                                                    className="font-medium text-red-500 hover:text-red-600"
                                                                                    type="button"
                                                                                    onClick={() => removeFromCart(item._id)}
                                                                                >
                                                                                    X
                                                                                </button>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                        <div className="flex justify-between text-base font-medium text-gray-900 mt-4">
                                                            <p>Subtotal</p>
                                                            <p>{groupedByStore[storeId].total.toFixed(2)} Gs</p>
                                                        </div>
                                                        <div className="mt-6">
                                                            <button
                                                                onClick={() => handleCheckout(storeId)}
                                                                className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                                                            >
                                                                Finalizar Compra de {groupedByStore[storeId].storeName}
                                                            </button>
                                                        </div>
                                                    </div>
                                                ))
                                            )}
                                        </div>
                                    </div>
                                </div>

                                <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                                    <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                                        <p>
                                            o{' '}
                                            <button
                                                type="button"
                                                onClick={onClose}
                                                className="font-medium text-indigo-600 hover:text-indigo-500"
                                            >
                                                Continuar comprando
                                                <span aria-hidden="true"> &rarr;</span>
                                            </button>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </DialogPanel>
                    </div>
                </div>
            </div>
        </Dialog>
    );
}
