import Modal from 'react-modal';
import { MdOutlineMail } from "react-icons/md";
import { GoLock } from "react-icons/go";
import { FcGoogle } from "react-icons/fc";
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { register, getUserProfile, login } from '../../Redux/Auth/Action.js';
import { API_BASE_URL } from "../../configApi/ConfigApi.js";
import { RiLockPasswordFill } from "react-icons/ri";
import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const FormUI = ({ type, openState, handleButtonClick, handleButtonClick2 }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const auth = useSelector(store => store.auth);
    
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });
    const [confPass, setConfPass] = useState('');
    const [errorMessage, setErrorMessage] = useState(null);

    // Modal style with improved aesthetics
    const customStyles = {
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
            width: "450px",
            maxHeight: "95vh",
            overflow: "auto",
            padding: 0,
            border: "none",
            borderRadius: "16px",
            backgroundColor: 'transparent',
            zIndex: '1000'
        },
    };

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
            if (formData.password === confPass) {
                dispatch(register(formData));
                handleButtonClick();
            }
            else {
                setFormData({
                    email: '',
                    password: ''
                });
                setConfPass('');
                setErrorMessage("Password and confirm password don't match");
            }
        }
    }

    const handleGoogle = () => {
        window.location.href = `${API_BASE_URL}/auth/google`;
    };

    return (
        <Modal
            isOpen={openState}
            style={customStyles}
            onRequestClose={handleButtonClick}
            contentLabel={type === "login" ? "Login Form" : "Sign Up Form"}
            ariaHideApp={false}
        >
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                {/* Header */}
                <div className="bg-gradient-to-r from-blue-600 to-blue-800 py-6 px-8 text-center">
                    <h2 className="text-3xl font-bold text-white">
                        {type === "login" ? "Welcome Back" : "Create Account"}
                    </h2>
                    <p className="text-blue-100 mt-2">
                        {type === "login" ? "Sign in to continue" : "Join our community today"}
                    </p>
                </div>

                <div className="p-8">
                    {/* Google Sign-in Button */}
                    <div className="mb-6">
                        <button 
                            onClick={handleGoogle}
                            className="w-full flex items-center justify-center gap-3 bg-white border border-gray-300 rounded-lg p-3 hover:bg-gray-50 transition duration-200"
                        >
                            <FcGoogle className="text-xl" />
                            <span className="font-medium text-gray-700">Continue with Google</span>
                        </button>
                    </div>

                    {/* Divider */}
                    <div className="flex items-center my-4">
                        <div className="flex-grow h-px bg-gray-200"></div>
                        <span className="px-3 text-gray-500 text-sm">or</span>
                        <div className="flex-grow h-px bg-gray-200"></div>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleFormData} className="space-y-4">
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-500">
                                <MdOutlineMail className="text-lg" />
                            </div>
                            <input 
                                type="email" 
                                name="email" 
                                value={formData.email} 
                                onChange={handleChange} 
                                placeholder="Email address" 
                                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none"
                                required
                            />
                        </div>

                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-500">
                                <GoLock className="text-lg" />
                            </div>
                            <input 
                                type="password" 
                                name="password" 
                                value={formData.password} 
                                onChange={handleChange} 
                                placeholder="Password" 
                                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none"
                                required
                                autoComplete="new-password"
                            />
                        </div>

                        {type === "signup" && (
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-500">
                                    <GoLock className="text-lg" />
                                </div>
                                <input 
                                    type="password" 
                                    name="confPass" 
                                    value={confPass} 
                                    onChange={confPassHandle} 
                                    placeholder="Confirm password" 
                                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none"
                                    required
                                    autoComplete="new-password"
                                />
                            </div>
                        )}

                        {type === "login" && (
                            <div className="flex justify-end">
                                <button 
                                    type="button" 
                                    className="text-sm text-blue-600 hover:text-blue-800 font-medium flex items-center gap-1"
                                    onClick={() => {
                                        handleButtonClick();
                                        navigate("/forgot-password");
                                    }}
                                >
                                    <RiLockPasswordFill className="text-sm" />
                                    Forgot password?
                                </button>
                            </div>
                        )}

                        {errorMessage && (
                            <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm">
                                {errorMessage}
                            </div>
                        )}

                        <button 
                            type="submit" 
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-lg transition duration-200"
                        >
                            {type === "login" ? "Sign In" : "Create Account"}
                        </button>
                    </form>

                    {/* Switch between login/signup */}
                    <div className="text-center mt-6">
                        <p className="text-gray-600">
                            {type === "login" ? "Don't have an account?" : "Already have an account?"}
                            <button
                                className="ml-2 text-blue-600 hover:text-blue-800 font-medium"
                                onClick={() => {
                                    handleButtonClick();
                                    handleButtonClick2();
                                }}
                            >
                                {type === "login" ? "Sign Up" : "Sign In"}
                            </button>
                        </p>
                    </div>
                </div>
            </div>
        </Modal>
    );
};

export default FormUI;