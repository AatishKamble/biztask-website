import Modal from 'react-modal';
import { MdOutlineMail } from "react-icons/md";
import { GoLock } from "react-icons/go";
import { FcGoogle } from "react-icons/fc";
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { register, getUserProfile, login } from '../../Redux/Auth/Action.js';
import { API_BASE_URL } from "../../configApi/ConfigApi.js";
import { RiLockPasswordFill } from "react-icons/ri";
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { GiSwordman } from "react-icons/gi";
import { toast } from 'react-toastify';
const FormUI = ({ type, openState, handleButtonClick, handleButtonClick2,handleForgotPasswordClick }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const auth = useSelector(store => store.auth);
    
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });
    const [confPass, setConfPass] = useState('');
   

    // Modal style with improved aesthetics
    const getModalStyles = () => {
        const mediaQuery = window.matchMedia('(min-width: 1024px)'); 
        return {
            overlay: {
                zIndex: 999,
                backgroundColor: 'rgba(0, 0, 0, 0.75)'
            },
            content: {
                top: '50%',
                left: '50%',
                right: 'auto',
                bottom: 'auto',
                marginRight: '-50%',
                transform: 'translate(-50%, -50%)',
                width:  "95vw", 
                maxWidth:"480px",
                maxHeight: "95vh",
                overflow: mediaQuery.matches ? "hidden" : "scroll", 
                padding: 0,
                border: "none",
                borderRadius: "16px",
                backgroundColor: 'transparent',
                zIndex: '1000'
            },
        };
    };
    
    const customStyles = getModalStyles();
    

    function handleChange(e) {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    }

    function confPassHandle(e) {
        setConfPass(e.target.value);
    }

    const handleFormData = (e) => {
        e.preventDefault();
        if (type === "login") {
            dispatch(login(formData));
            handleButtonClick();
        }
        else if (type === "signup") {

            if (formData.password.length < 6) {
                toast.error("Password must be at least 6 characters long");
                return;
            }
            if (!/[A-Z]/.test(formData.password)) {
                toast.error("Password must contain at least one uppercase letter");
                return;
            }
            if (!/[a-z]/.test(formData.password)) {
                toast.error("Password must contain at least one lowercase letter");
                return;
            }
            if (!/[0-9]/.test(formData.password)) {
                toast.error("Password must contain at least one number");
                return;
            }
            if (!/[!@#$%^&*]/.test(formData.password)) {
                toast.error("Password must contain at least one special character (!@#$%^&*)");
                return;
            }

            if (formData.password === confPass) {
                dispatch(register(formData));
                handleButtonClick();
            }
            else {
                setFormData({
                    ...formData,
                    [formData.password]: '',
                });
                
                setConfPass('');
                 toast.error("Password and confirm password don't match");
               
            }
        }
    }

    const handleGoogle = () => {
        window.location.href = `${API_BASE_URL}/auth/google`;
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

    const buttonVariants = {
        hover: { 
            scale: 1.03,
            boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.1)"
        },
        tap: { scale: 0.97 }
    };

    return (
        <Modal
            isOpen={openState}
            style={customStyles}
            onRequestClose={handleButtonClick}
            contentLabel={type === "login" ? "Login Form" : "Sign Up Form"}
            ariaHideApp={false}
        >
            <motion.div 
                className="bg-white rounded-2xl shadow-2xl overflow-hidden"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
            >
                {/* Header with local jobs theme */}
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
                        {type === "login" ? "Welcome Back" : "Create Account"}
                    </motion.h2>
                    
                    <motion.p 
                        className="text-blue-100 mt-2 font-serif"
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.4 }}
                    >
                        {type === "login" 
                            ? "Sign in to continue" 
                            : "Join Our Community"}
                    </motion.p>
                </motion.div>

                <motion.div 
                    className="p-8"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    {/* Google Sign-in Button */}
                    <motion.div 
                        className="mb-6"
                        variants={itemVariants}
                    >
                        <motion.button 
                            onClick={handleGoogle}
                            className="w-full flex items-center justify-center gap-3 bg-white border border-gray-300 rounded-lg p-4 hover:bg-gray-50 transition duration-200 font-serif"
                            variants={buttonVariants}
                            whileHover="hover"
                            whileTap="tap"
                        >
                            <FcGoogle className="text-xl" />
                            <span className="font-medium text-gray-700">Continue with Google</span>
                        </motion.button>
                    </motion.div>

                    {/* Divider */}
                    <motion.div 
                        className="flex items-center my-4"
                        variants={itemVariants}
                    >
                        <div className="flex-grow h-px bg-gray-200"></div>
                        <span className="px-3 text-gray-500 text-sm font-serif">or</span>
                        <div className="flex-grow h-px bg-gray-200"></div>
                    </motion.div>

                    {/* Form */}
                    <form onSubmit={handleFormData} className="space-y-4">
                        <motion.div 
                            className="relative"
                            variants={itemVariants}
                        >
                            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-indigo-500">
                                <MdOutlineMail className="text-lg" />
                            </div>
                            <input 
                                type="email" 
                                name="email" 
                                value={formData.email} 
                                onChange={handleChange} 
                                placeholder="Email address" 
                                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none font-serif"
                                required
                            />
                        </motion.div>

                        <motion.div 
                            className="relative"
                            variants={itemVariants}
                        >
                            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-indigo-500">
                                <GoLock className="text-lg" />
                            </div>
                            <input 
                                type="password" 
                                name="password" 
                                value={formData.password} 
                                onChange={handleChange} 
                                placeholder="Password" 
                                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none font-serif"
                                required
                                autoComplete="new-password"
                            />
                        </motion.div>

                        {type === "signup" && (
                            <motion.div 
                                className="relative"
                                variants={itemVariants}
                            >
                                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-indigo-500">
                                    <GoLock className="text-lg" />
                                </div>
                                <input 
                                    type="password" 
                                    name="confPass" 
                                    value={confPass} 
                                    onChange={confPassHandle} 
                                    placeholder="Confirm password" 
                                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none font-serif"
                                    required
                                    autoComplete="new-password"
                                />
                            </motion.div>
                        )}

                        {type === "login" && (
                            <motion.div 
                                className="flex justify-end"
                                variants={itemVariants}
                            >
                                <motion.button 
                                    type="button" 
                                    className="text-sm text-indigo-600 hover:text-indigo-800 font-medium flex items-center gap-1 font-serif"
                                    whileHover={{ scale: 1.05 }}
                                    onClick={() => {
                                       handleForgotPasswordClick();
                                    }}
                                >
                                    <RiLockPasswordFill className="text-sm" />
                                    Forgot password?
                                </motion.button>
                            </motion.div>
                        )}

                      

                        <motion.button 
                            type="submit" 
                            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 rounded-lg transition duration-200 font-serif"
                            variants={itemVariants}
                            whileHover="hover"
                            whileTap="tap"
                        >
                            {type === "login" ? "Sign In" : "Create Account"}
                        </motion.button>
                    </form>

                    {/* Switch between login/signup */}
                    <motion.div 
                        className="text-center mt-6"
                        variants={itemVariants}
                    >
                        <p className="text-gray-600 font-serif">
                            {type === "login" ? "Don't have an account?" : "Already have an account?"}
                            <motion.button
                                className="ml-2 text-indigo-600 hover:text-indigo-800 font-medium font-serif"
                                whileHover={{ scale: 1.05 }}
                                onClick={() => {
                                    handleButtonClick();
                                    handleButtonClick2();
                                }}
                            >
                                {type === "login" ? "Sign Up" : "Sign In"}
                            </motion.button>
                        </p>
                    </motion.div>
                </motion.div>
            </motion.div>
        </Modal>
    );
};

export default FormUI;