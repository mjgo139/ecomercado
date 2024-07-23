import { useAuth } from "../../context/AuthContext";
import { FaSignOutAlt } from 'react-icons/fa';

export default function Logout() {
    const { logout } = useAuth();

    return (
        <div
            className="flex-none bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded cursor-pointer flex justify-center items-center"
            onClick={logout}
        >
            <FaSignOutAlt size={24} className="mr-2" />
            <span>Cerrar Sesión</span>
        </div>
    );
}
