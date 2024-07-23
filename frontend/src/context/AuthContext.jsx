
import { createContext, useState, useContext, useEffect } from "react";
import { loginRequest, registerRequest, verityTokenRequet } from '../api/auth';

// Crear el contexto de autenticación
export const AuthContext = createContext();

// Hook personalizado para usar el contexto de autenticación
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth deberia de estar dentro del Provider');
    }
    return context;
}

// Componente proveedor de autenticación
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null); // Estado para el usuario
    const [isAuthenticated, setIsAuthenticated] = useState(false); // Estado de autenticación
    const [errors, setErrors] = useState([]); // Estado para errores
    const [loading, setLoading] = useState(true); // Estado de carga

    // Función para registro de usuario
    const signup = async (user) => {
        try {
            const res = await registerRequest(user);
            console.log(res.data);
            localStorage.setItem('token', res.data.token); // Guardar el token en localStorage
            setUser(res.data.user);
            setIsAuthenticated(true);
        } catch (error) {
            if (Array.isArray(error.response.data)) {
                return setErrors(error.response.data);
            }
            setErrors([error.response.data.message]);
        }
    }

    // Función para inicio de sesión
    const signin = async (user) => {
        try {
            const res = await loginRequest(user);
            console.log(res);
            localStorage.setItem('token', res.data.token); // Guardar el token en localStorage
            setUser(res.data.user);
            setIsAuthenticated(true);
        } catch (error) {
            if (Array.isArray(error.response.data)) {
                return setErrors(error.response.data);
            }
            setErrors([error.response.data.message]);
        }
    }

    // Función para cerrar sesión
    const logout = () => {
        setIsAuthenticated(false);
        setUser(null);
        localStorage.removeItem('token'); // Eliminar el token de localStorage
        localStorage.removeItem('cart');
    }

    // Manejo de errores, se limpia después de 5 segundos
    useEffect(() => {
        if (errors.length > 0) {
            const timer = setTimeout(() => {
                setErrors([]);
            }, 5000);

            return () => clearTimeout(timer);
        }
    }, [errors]);

    // Verificación del estado de autenticación al cargar el componente
    useEffect(() => {
        async function checkLogin() {
            const token = localStorage.getItem('token');

            if (!token) {
                setIsAuthenticated(false);
                setLoading(false);
                return setUser(null);
            }
            try {
                const res = await verityTokenRequet(token);
                console.log(res);
                if (!res.data) {
                    setIsAuthenticated(false);
                    setLoading(false);
                    return;
                }
                setIsAuthenticated(true);
                setUser(res.data);
                setLoading(false);
            } catch (error) {
                setIsAuthenticated(false);
                setUser(null);
                setLoading(false);
            }
        }
        checkLogin();
    }, []);

    // Proveer el contexto de autenticación
    return (
        <AuthContext.Provider value={{ signup, signin, logout, loading, user, isAuthenticated, errors }}>
            {children}
        </AuthContext.Provider>
    );
}

/*
import { createContext, useState, useContext, useEffect } from "react";
import { loginRequest, registerRequest, verityTokenRequet } from '../api/auth';
import Cookies from 'js-cookie';

// Crear el contexto de autenticación
export const AuthContext = createContext();

// Hook personalizado para usar el contexto de autenticación
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth deberia de estar dentro del Provider');
    }
    return context;
}

// Componente proveedor de autenticación
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null); // Estado para el usuario
    const [isAuthenticated, setIsAuthenticated] = useState(false); // Estado de autenticación
    const [errors, setErrors] = useState([]); // Estado para errores
    const [loading, setLoading] = useState(true); // Estado de carga

    // Función para registro de usuario
    const signup = async (user) => {
        try {
            const res = await registerRequest(user);
            console.log(res.data);
            setUser(res.data);
            setIsAuthenticated(true);
        } catch (error) {
            if (Array.isArray(error.response.data)) {
                return setErrors(error.response.data);
            }
            setErrors([error.response.data.message]);
        }
    }

    // Función para inicio de sesión
    const signin = async (user) => {
        try {
            const res = await loginRequest(user);
            console.log(res);
            setUser(res.data);
            setIsAuthenticated(true);
        } catch (error) {
            if (Array.isArray(error.response.data)) {
                return setErrors(error.response.data);
            }
            setErrors([error.response.data.message]);
        }
    }

    // Función para cerrar sesión
    const logout = () => {
        setIsAuthenticated(false);
        setUser(null);
        localStorage.removeItem('cart');
        Cookies.remove('token');
    }

    // Manejo de errores, se limpia después de 5 segundos
    useEffect(() => {
        if (errors.length > 0) {
            const timer = setTimeout(() => {
                setErrors([]);
            }, 5000);

            return () => clearTimeout(timer);
        }
    }, [errors]);

    // Verificación del estado de autenticación al cargar el componente
    useEffect(() => {
        async function checkLogin() {
            const cookies = Cookies.get();

            if (!cookies.token) {
                setIsAuthenticated(false);
                setLoading(false);
                return setUser(null);
            }
            try {
                const res = await verityTokenRequet(cookies.token);
                console.log(res);
                if (!res.data) {
                    setIsAuthenticated(false);
                    setLoading(false);
                    return;
                }
                setIsAuthenticated(true);
                setUser(res.data);
                setLoading(false);
            } catch (error) {
                setIsAuthenticated(false);
                setUser(null);
                setLoading(false);
            }
        }
        checkLogin();
    }, []);

    // Proveer el contexto de autenticación
    return (
        <AuthContext.Provider value={{ signup, signin, logout, loading, user, isAuthenticated, errors }}>
            {children}
        </AuthContext.Provider>
    );
}
*/