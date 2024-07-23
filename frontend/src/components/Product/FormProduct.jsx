import { useForm } from "react-hook-form";
import { useProduct } from "../../context/ProductsContext";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Header from "../Common/Header";

export default function FormProduct() {
    const { register, handleSubmit, setValue, formState: { errors } } = useForm();
    const { createProduct, updateProduct, getProduct } = useProduct();
    const navigate = useNavigate();
    const params = useParams();
    const [file, setFile] = useState(null);
    const [preview, setPreview] = useState(null);

    useEffect(() => {
        async function load() {
            if (params.id) {
                const product = await getProduct(params.id);
                setValue('name', product.name);
                setValue('description', product.description);
                setValue('price', product.price);
                setValue('availability', product.availability);
                setPreview(`${import.meta.env.VITE_API_HOST}/${product.photo}`);
            }
        }
        load();
    }, [params.id, getProduct, setValue]);

    const onSubmit = handleSubmit((data) => {
        const idStore = localStorage.getItem('idStore');
        const formData = new FormData();
        formData.append('name', data.name);
        formData.append('description', data.description);
        formData.append('price', parseFloat(data.price)); // Convertir el precio a número
        if (file) {
            formData.append('photo', file); // Añadir el archivo solo si se selecciona uno nuevo
        }
        formData.append('availability', data.availability ? true : false); // Añadir disponibilidad
        formData.append('idStore', idStore);

        if (params.id) {
            updateProduct(params.id, formData);
        } else {
            createProduct(formData);
        }
        navigate(`/products/${idStore}`);
    });

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        setFile(selectedFile);
        setPreview(URL.createObjectURL(selectedFile));
    };

    const handleDragOver = (event) => {
        event.preventDefault();
    };

    const handleDrop = (event) => {
        event.preventDefault();
        const droppedFile = event.dataTransfer.files[0];
        setFile(droppedFile);
        setPreview(URL.createObjectURL(droppedFile));
    };

    return (
        
        <div className="flex items-center justify-center p-12">
            <div className="mx-auto w-full max-w-[550px] bg-white shadow-md rounded-lg">
                <form
                    className="py-6 px-9"
                    onSubmit={onSubmit}
                    encType="multipart/form-data"
                >
                    <div className="mb-5">
                        <label className="mb-3 block text-base font-medium text-[#07074D]">
                            Nombre:
                        </label>
                        <input
                            type="text"
                            placeholder="Nombre del Producto"
                            className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                            {...register('name', { required: 'El nombre es obligatorio' })}
                        />
                        {errors.name && <p className="text-red-600 mt-1">{errors.name.message}</p>}
                    </div>
                    <div className="mb-5">
                        <label className="mb-3 block text-base font-medium text-[#07074D]">
                            Descripción:
                        </label>
                        <input
                            type="text"
                            placeholder="Descripción del Producto"
                            className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                            {...register('description', { required: 'La descripción es obligatoria' })}
                        />
                        {errors.description && <p className="text-red-600 mt-1">{errors.description.message}</p>}
                    </div>
                    <div className="mb-5">
                        <label className="mb-3 block text-base font-medium text-[#07074D]">
                            Precio:
                        </label>
                        <input
                            type="number"
                            placeholder="Precio del Producto"
                            className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                            {...register('price', {
                                required: 'El precio es obligatorio',
                                min: { value: 0.01, message: 'El precio debe ser mayor que 0' }
                            })}
                        />
                        {errors.price && <p className="text-red-600 mt-1">{errors.price.message}</p>}
                    </div>
                    <div className="mb-5">
                        <label className="mb-3 block text-base font-medium text-[#07074D]">
                            Disponibilidad:
                        </label>
                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500"
                                {...register('availability')}
                            />
                            <span className="ml-2 text-base font-medium text-[#6B7280]">Disponible</span>
                        </div>
                    </div>
                    <div className="mb-6 pt-4">
                        <label className="mb-5 block text-xl font-semibold text-[#07074D]">
                            Seleccionar Imagen del Producto
                        </label>
                        <div
                            className="mb-8"
                            onDragOver={handleDragOver}
                            onDrop={handleDrop}
                        >
                            <input
                                type="file"
                                accept="image/png, image/jpeg"
                                id="file"
                                className="sr-only"
                                onChange={handleFileChange}
                            />
                            <label
                                htmlFor="file"
                                className="relative flex min-h-[200px] items-center justify-center rounded-md border border-dashed border-[#e0e0e0] p-12 text-center cursor-pointer"
                            >
                                <div>
                                    <span className="mb-2 block text-xl font-semibold text-[#07074D]">
                                        Arrastrar el archivo aquí
                                    </span>
                                    <span className="mb-2 block text-base font-medium text-[#6B7280]">
                                        O
                                    </span>
                                    <span className="inline-flex rounded border border-[#e0e0e0] py-2 px-7 text-base font-medium text-[#07074D]">
                                        Buscar
                                    </span>
                                </div>
                            </label>
                        </div>
                        {preview && (
                            <div className="mb-8">
                                <img src={preview} alt="Vista previa" className="w-full rounded-md" />
                            </div>
                        )}
                    </div>
                    <div>
                        <button
                            className="hover:shadow-form w-full rounded-md bg-[#6A64F1] py-3 px-8 text-center text-base font-semibold text-white outline-none"
                        >
                            Cargar Producto
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
