import React from 'react'
import { useState } from 'react';
import { GoLock } from "react-icons/go";
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { resetPassword } from '../../Redux/Auth/Action';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { GiSwordman } from "react-icons/gi";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const ResetPassword = () => {
    const [formData, setFormData] = useState({
        password: "",
        confPassword: ""
    });

    const dispatch = useDispatch();
    const handleInputChange = (e) => {
        const value = e.target.value;
        const name = e.target.name;
        setFormData({
            ...formData,
            [name]: value
        });
    }
    const navigate = useNavigate();

    const { id, token } = useParams();

    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showCPassword, setShowCPassword] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setIsLoading(true);

            if (formData.password !== formData.confPassword) {
                toast.error("Password and Confirm Password must match!");
                setFormData({ password: "", confPassword: "" });
                return;
            }
            if (formData.password.length < 6) {
                toast.error("Password must be at least 6 characters long");
                setFormData({ password: "", confPassword: "" });
                return;
            }

            if (!/[A-Z]/.test(formData.password)) {
                toast.error("Password must contain at least one uppercase letter");
                setFormData({ password: "", confPassword: "" });
                return;
            }

            if (!/[a-z]/.test(formData.password)) {
                toast.error("Password must contain at least one lowercase letter");
                setFormData({ password: "", confPassword: "" });
                return;
            }

            if (!/[0-9]/.test(formData.password)) {
                toast.error("Password must contain at least one number");
                setFormData({ password: "", confPassword: "" });
                return;
            }

            if (!/[!@#$%^&*]/.test(formData.password)) {
                toast.error("Password must contain at least one special character (!@#$%^&*)");
                setFormData({ password: "", confPassword: "" });
                return;
            }

            const result = await dispatch(resetPassword({ password: formData.password }, id, token));

            if (result?.success) {
                toast.success(result?.message || "Password reset successful!");
                setFormData({ password: "", confPassword: "" });
                navigate("/")
            } else {
                toast.error(result?.message || "Something went wrong!");
                setFormData({ password: "", confPassword: "" });
            }
        } catch (error) {
            toast.error("Error submitting form. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };


    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                when: "beforeChildren",
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { type: "spring", stiffness: 300, damping: 24 }
        }
    };


    return (
        <>
            <div className='bg-inherit absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-full h-auto flex justify-center items-center flex-col px-5 z-50'>

                <motion.div
                    className='md:w-[40%] w-full  rounded-2xl shadow-2xl overflow-hidden'
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ type: "spring", damping: 25, stiffness: 300 }}
                >
                    <motion.div
                        className="bg-gradient-to-br from-indigo-700 to-blue-900 pt-8 pb-10 px-8 text-center relative overflow-hidden"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                    >
                        <motion.div
                            className="absolute -bottom-8 right-0 left-0 h-16 bg-white rounded-t-full opacity-10"
                            initial={{ scaleX: 0 }}
                            animate={{ scaleX: 1 }}
                            transition={{ delay: 0.5, duration: 0.8 }}
                        />

                        <motion.div
                            className="flex justify-center mb-4"
                            animate={{ rotate: [0, -5, 5, -5, 0] }}
                            transition={{ delay: 0.8, duration: 1, ease: "easeInOut" }}
                        >
                            <GiSwordman className="text-4xl text-white" />
                        </motion.div>

                        <motion.h2
                            className="text-3xl font-bold text-white font-serif"
                            initial={{ y: -20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.3 }}
                        >
                            Reset Password
                        </motion.h2>

                        <motion.p
                            className="text-blue-100 mt-2 font-serif"
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.4 }}
                        >
                            to continue with bizTask
                        </motion.p>
                    </motion.div>

                    <motion.form
                        onSubmit={handleSubmit}
                        className='bg-white px-8 py-8'
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        <motion.div
                            className='relative my-5'
                            variants={itemVariants}
                        >
                            <div className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-slate-600'>
                                <GoLock className="text-lg" />
                            </div>
                            <input
                                type={showPassword ? "text" : "password"}
                                name='password'
                                value={formData.password}
                                onChange={handleInputChange}
                                disabled={isLoading}
                                placeholder='Password'
                                className={`w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none font-serif ${isLoading ? 'opacity-60 cursor-not-allowed' : ''}`}
                                autoComplete='false'
                            />

                            <button
                                type="button"
                                disabled={isLoading}
                                onClick={() => setShowPassword((prev) => !prev)}
                                className={`absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-indigo-600 transition ${isLoading ? 'opacity-60 cursor-not-allowed' : ''}`}
                                tabIndex={-1}
                            >
                                {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
                            </button>
                        </motion.div>

                        <motion.div
                            className='relative my-5'
                            variants={itemVariants}
                        >
                            <div className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-slate-600'>
                                <GoLock className="text-lg" />
                            </div>
                            <input
                                type={showCPassword ? "text" : "password"}
                                name='confPassword'
                                value={formData.confPassword}
                                disabled={isLoading}
                                onChange={handleInputChange}
                                placeholder='Confirm password'
                                className={`w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none font-serif ${isLoading ? 'opacity-60 cursor-not-allowed' : ''}`}
                                autoComplete='false'
                            />
                            <button
                                type="button"
                                disabled={isLoading}
                                onClick={() => setShowCPassword((prev) => !prev)}
                                className={`absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-indigo-600 transition ${isLoading ? 'opacity-60 cursor-not-allowed' : ''}`}
                                tabIndex={-1}
                            >
                                {showCPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
                            </button>
                        </motion.div>

                        <motion.button
                            type="submit"
                            disabled={isLoading}
                            variants={itemVariants}
                            whileHover="hover"
                            whileTap="tap"
                            className={`w-full flex items-center justify-center gap-2 bg-indigo-600 
                                hover:bg-indigo-700 text-white font-medium py-3 rounded-lg 
                                transition duration-200 font-serif ${isLoading ? "opacity-70 cursor-not-allowed" : ""
                                }`}
                        >
                            {isLoading ? (
                                <>
                                    {/* Loader spinner */}
                                    <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                                    <span className="text-white text-base font-medium">Please wait...</span>
                                </>
                            ) : (
                                <>

                                    <span className="text-white text-base font-medium">Reset Password</span>
                                </>
                            )}
                        </motion.button>
                    </motion.form>
                </motion.div>

            </div>
        </>
    )
}

export default ResetPassword;