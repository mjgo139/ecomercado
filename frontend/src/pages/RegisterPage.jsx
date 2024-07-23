import { useForm } from 'react-hook-form'
import { useAuth } from '../context/AuthContext';
import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function RegisterPage() {
    const { register, handleSubmit, formState: {
        errors
    } } = useForm();
    const { signup, isAuthenticated, errors: registerErrors } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (isAuthenticated) navigate('/stores/');
    }, [isAuthenticated]);

    const onSubmit = handleSubmit(async (values) => {
        signup(values);
    })

    return (
        <div className='flex h-[calc(100vh-100px)] items-center justify-center'>
            <div className='bg-zinc-800 max-w-md w-full p-10 rounded-md'>
                {
                    registerErrors.map((error, i) => (
                        <div className='bg-red-500 p-2 text-white  text-center my-2' key={i}>
                            {error}
                        </div>
                    ))
                }
                <h1 className='text-2xl font-bold'>Register</h1>

                <form onSubmit={onSubmit}>
                    <input type="text" {...register('username', { required: true })} className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2' placeholder='Nombre de Usuario' />
                    {errors.username && (
                        <p className='text-red-500'>Nombre de Usuario requerido</p>
                    )}
                    <input type="email" {...register('email', { required: true })} className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2' placeholder='Email' />
                    {errors.email && (
                        <p className='text-red-500'>Email requerido</p>
                    )}
                    <input type="password" {...register('password', { required: true })} className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2' placeholder='Contraseña' />
                    {errors.password && (
                        <p className='text-red-500'>Contraseña es requerida</p>
                    )}
                    <button type="submit">Registrar</button>
                </form>
                <p className='flex gap-x-2 justify-between'>
                    Ya tienes una cuenta? <Link to='/login' className='text-sky-500'>Inicia sesión</Link>
                </p>

            </div>

        </div>
    )
}

export default RegisterPage