import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useStore } from "../../context/StoresContext";

export default function StoreCard({ store }) {
    const { user } = useAuth();
    const { statusStore } = useStore()
    const imageUrl = `${import.meta.env.VITE_API_HOST}/${store.logo}`;
    return (
        <div className="max-w-[384px] mx-auto flex flex-col justify-between h-full bg-gray-300 hover:bg-gray-400 transition-colors duration-300 rounded-lg shadow-lg p-4">
            <div>
                <div className="w-full max-w-sm aspect-square">
                    <img
                        src={imageUrl}
                        alt={`Imagen de ${store.name}`}
                        className="w-full h-full rounded-xl"
                    />
                </div>
                <div className="mt-5">
                    <h6 className="font-medium text-xl leading-8 text-black mb-2">{store.name}</h6>
                    <p className="text-gray-600">{store.description}</p>


                </div>
            </div>
            <div className="mt-5 flex flex-col space-y-2">
                {store.status ? (
                    <p className="text-green-600 font-bold bg-green-100 p-2 rounded-md">
                        Tienda Aprobada
                    </p>
                ) : (
                    <p className="text-red-600 font-bold bg-red-100 p-2 rounded-md">
                        La tienda aún no ha sido aprobada
                    </p>
                )}
                <Link
                    to={`/products/${store._id}`}
                    className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-md"
                >
                    Explorar tienda
                </Link>

                {user && (user.role === 'User' || user.role === 'Admin') && (
                    <>


                        {store && (user.id === store.owner) && (


                            <Link
                                to={`/edit-store/${store._id}`}
                                className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-md"
                            >
                                Editar tienda
                            </Link>
                        )}

                        {user.role === 'Admin' && (

                            <Link
                                onClick={() => { statusStore(store._id, store.status) }}
                                className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-md"
                            >
                                {store.status ? 'Desaprobar tienda' : 'Aprobar tienda'}
                            </Link>

                        )}
                    </>
                )}
            </div>
        </div>
    );
}
