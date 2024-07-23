import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useStore } from "../../context/StoresContext";
import { useNavigate, useParams } from "react-router-dom";

export default function FormStore() {
    const { register, handleSubmit, setValue, formState: { errors } } = useForm();
    const { createStore, updateStore, getStore } = useStore();
    const navigate = useNavigate();
    const params = useParams();
    const [file, setFile] = useState(null);
    const [preview, setPreview] = useState(null);

    useEffect(() => {
        async function loadTask() {
            if (params.id) {
                const store = await getStore(params.id);
                setValue('name', store.name);
                setValue('description', store.description);
                setValue('phone', store.phone);
                setPreview(`${import.meta.env.VITE_API_HOST}/${store.logo}`);
            }
        }
        loadTask();
    }, [params.id, getStore, setValue]);

    const onSubmit = handleSubmit((data) => {
        const formData = new FormData();
        formData.append('name', data.name);
        formData.append('description', data.description);
        formData.append('phone', data.phone);
        if (file) {
            formData.append('logo', file); // Añadir el archivo solo si se selecciona uno nuevo
        }

        if (params.id) {
            updateStore(params.id, formData);
        } else {
            createStore(formData);
        }
        navigate('/stores/owner');
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
                            placeholder="Nombre de la Tienda"
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
                            placeholder="Descripción de la Tienda"
                            className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                            {...register('description', { required: 'La descripción es obligatoria' })}
                        />
                        {errors.description && <p className="text-red-600 mt-1">{errors.description.message}</p>}
                    </div>
                    <div className="mb-5">
                        <label className="mb-3 block text-base font-medium text-[#07074D]">
                            Número de Teléfono:
                        </label>
                        <input
                            type="text"
                            placeholder="Número de Teléfono"
                            className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                            {...register('phone', {
                                required: 'El número de teléfono es obligatorio',
                                pattern: {
                                    value: /^\d{7,14}$/,
                                    message: 'El número debe estar en formato internacional, por ejemplo: 595971123456'
                                }
                            })}
                        />
                        {errors.phone && <p className="text-red-600 mt-1">{errors.phone.message}</p>}
                        <p className="mt-2 text-sm text-[#6B7280]">
                            Este número será utilizado para que los usuarios finalicen la compra.
                        </p>
                    </div>
                    <div className="mb-6 pt-4">
                        <label className="mb-5 block text-xl font-semibold text-[#07074D]">
                            Seleccionar Logo de la Tienda
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
                            {preview && (
                                <div className="mt-4">
                                    <img src={preview} alt="Previsualización del Logo" className="w-full h-auto rounded-md" />
                                </div>
                            )}
                        </div>
                    </div>
                    <div>
                        <button
                            className="hover:shadow-form w-full rounded-md bg-[#6A64F1] py-3 px-8 text-center text-base font-semibold text-white outline-none"
                        >
                            Guardar Tienda
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
