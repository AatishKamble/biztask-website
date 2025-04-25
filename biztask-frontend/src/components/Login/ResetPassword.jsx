import React from 'react'
import { useState } from 'react';
import { GoLock } from "react-icons/go";
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { resetPassword } from '../../Redux/Auth/Action';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { GiSwordman } from "react-icons/gi";

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

    const authStore = useSelector(store => store.auth);
    const { id, token } = useParams();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (formData.password === formData.confPassword) {
            dispatch(resetPassword({ password: formData.password }, id, token))
        }
        else {
            setFormData({
                password: "",
                confPassword: ""
            });
            toast.error("Password and confirm Password should be same");
        }
    }

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
            <div className='bg-inherit absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-full h-auto flex justify-center items-center flex-col px-5'>
                {authStore.message ? (
                    <motion.div
                        className='w-[40%] bg-slate-100 flex flex-col justify-center items-center p-10 text-center rounded-2xl shadow-2xl'
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ type: "spring", damping: 25, stiffness: 300 }}
                    >
                        <motion.span
                            className='text-[28px] font-serif font-semibold text-blue-900'
                            initial={{ y: -20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.3 }}
                        >
                            {authStore.message}
                        </motion.span>
                        <motion.div
                            whileHover="hover"
                            whileTap="tap"
                            
                        >
                            <Link to="/" className='my-10 hover:scale-105 transition-transform bg-gradient-to-br from-indigo-700 to-blue-900 flex justify-center items-center font-serif w-[200px] h-[50px] text-white font-bold rounded-xl'>
                                <span>Go to Home</span>
                            </Link>
                        </motion.div>
                    </motion.div>
                ) : (
                    <motion.div
                        className='w-[40%] rounded-2xl shadow-2xl overflow-hidden'
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
                                    type="password"
                                    name='password'
                                    value={formData.password}
                                    onChange={handleInputChange}
                                    placeholder='Password'
                                    className='w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none font-serif'
                                    autoComplete='false'
                                />
                            </motion.div>

                            <motion.div
                                className='relative my-5'
                                variants={itemVariants}
                            >
                                <div className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-slate-600'>
                                    <GoLock className="text-lg" />
                                </div>
                                <input
                                    type="password"
                                    name='confPassword'
                                    value={formData.confPassword}
                                    onChange={handleInputChange}
                                    placeholder='Confirm password'
                                    className='w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none font-serif'
                                    autoComplete='false'
                                />
                            </motion.div>

                            <motion.button
                                type='submit'
                                className='w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 rounded-lg transition duration-200 font-serif text-xl mt-6'
                                variants={itemVariants}
                                whileHover="hover"
                                whileTap="tap"
                            >
                                Reset Password
                            </motion.button>
                        </motion.form>
                    </motion.div>
                )}
            </div>
        </>
    )
}

export default ResetPassword;