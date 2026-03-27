import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { toast } from 'react-toastify';

const Login = () => {
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm();

    const onSubmit = async (data) => {
        try {
            const res = await fetch("http://localhost:8000/api/authenticate", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            });

            const result = await res.json();

            if (result.status) {
                toast.success(result.message);

                const userInfo = {
                    id: result.id,
                    token: result.token
                };

                localStorage.setItem('userInfo', JSON.stringify(userInfo));

                setTimeout(() => {
                    navigate("/admin/dashboard");
                }, 1000);

            } else {
                toast.error(result.message);
            }

        } catch (error) {
            toast.error("Server error. Try again!");
            console.error(error);
        }
    };

    return (
        <section className="w-full h-screen flex items-center justify-center bg-gray-50">

            <div className="w-[90%] sm:w-100 bg-white rounded-xl shadow-lg border border-gray-200 p-8">

                <h2 className="text-2xl font-semibold text-gray-800 mb-6">
                    Login Here
                </h2>

                <form onSubmit={handleSubmit(onSubmit)}>

                    {/* Email */}
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-1">Email</label>
                        <input
                            {...register("email", {
                                required: "Email is required"
                            })}
                            type="email"
                            placeholder="Email"
                            className={`w-full px-4 py-2 border rounded-md outline-none focus:ring-2 
                            ${errors.email 
                                ? 'border-red-500 focus:ring-red-400' 
                                : 'border-gray-300 focus:ring-pink-400'}`}
                        />
                        {errors.email && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.email.message}
                            </p>
                        )}
                    </div>

                    {/* Password */}
                    <div className="mb-6">
                        <label className="block text-gray-700 mb-1">Password</label>
                        <input
                            {...register("password", {
                                required: "Password is required"
                            })}
                            type="password"
                            placeholder="Password"
                            className={`w-full px-4 py-2 border rounded-md outline-none focus:ring-2 
                            ${errors.password 
                                ? 'border-red-500 focus:ring-red-400' 
                                : 'border-gray-300 focus:ring-pink-400'}`}
                        />
                        {errors.password && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.password.message}
                            </p>
                        )}
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-pink-500 text-white py-2 rounded-md font-semibold hover:bg-amber-300 transition cursor-pointer"
                    >
                        LOGIN
                    </button>

                </form>
            </div>
        </section>
    );
};

export default Login;