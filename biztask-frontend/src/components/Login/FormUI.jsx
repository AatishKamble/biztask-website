import Modal from 'react-modal';
import { MdOutlineMail } from "react-icons/md";
import { GoLock } from "react-icons/go";
import { FcGoogle } from "react-icons/fc";
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { register, getUserProfile, login, sendOtp, verifyOtp } from '../../Redux/Auth/Action.js';
import { API_BASE_URL } from "../../configApi/ConfigApi.js";
import { RiLockPasswordFill } from "react-icons/ri";
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { GiSwordman } from "react-icons/gi";
import { toast } from 'react-toastify';
import { MdClose } from "react-icons/md";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { MdVerifiedUser } from "react-icons/md";
import { IoReturnUpBack } from "react-icons/io5";

const FormUI = ({ type, openState, handleButtonClick, handleButtonClick2, handleForgotPasswordClick }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const auth = useSelector(store => store.auth);

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });
    const [confPass, setConfPass] = useState('');

    //  OTP FLOW STATE ==
    // Tracks which step user is on: 'email' → 'otp' → 'password'
    const [signupStep, setSignupStep] = useState('email'); // 'email', 'otp', 'password'
    const [otp, setOtp] = useState('');
    const [isOtpVerified, setIsOtpVerified] = useState(false);
    const [otpTimer, setOtpTimer] = useState(0); // Countdown timer for resend OTP
    const [canResendOtp, setCanResendOtp] = useState(false);

    // Modal style 
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
                width: "95vw",
                maxWidth: "480px",
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

    // ========== NEW: OTP INPUT HANDLER ==========
    function handleOtpChange(e) {
        const value = e.target.value.replace(/\D/g, ''); // Only allow digits
        if (value.length <= 6) {
            setOtp(value);
        }
    }

    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showCPassword, setShowCPassword] = useState(false);



    // RESEND OTP WITH TIMER 
    const handleResendOtp = async () => {
        if (!canResendOtp) return;

        setIsLoading(true);
        const result = await dispatch(sendOtp(formData.email));

        if (result.success) {
            toast.success(result.message);
            startOtpTimer();
        } else {
            toast.error(result.message);
        }
        setIsLoading(false);
    };

    // START COUNTDOWN TIMER 
    const startOtpTimer = () => {
        setOtpTimer(60); // 60 seconds countdown
        setCanResendOtp(false);

        const interval = setInterval(() => {
            setOtpTimer((prev) => {
                if (prev <= 1) {
                    clearInterval(interval);
                    setCanResendOtp(true);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
    };

    //  HANDLE FORM SUBMISSION
    const handleFormData = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            let result;

            // LOGIN 
            if (type === "login") {
                result = await dispatch(login(formData));

                if (result?.success) {
                    toast.success(result.message || "Login successful!");
                    handleButtonClick();
                } else {
                    toast.error(result?.message || "Invalid email or password!");
                    setFormData({ email: "", password: "" });
                }
            }

            //  SIGNUP WITH OTP FLOW
            else if (type === "signup") {
                // Email Entry - Send OTP
                if (signupStep === 'email') {
                    const { email } = formData;

                    if (!email) {
                        toast.error("Please enter your email");
                        setIsLoading(false);
                        return;
                    }

                    // Send OTP to email

                    result = await dispatch(sendOtp(email));
                    if (result.success) {
                        toast.success(result.message);
                        setSignupStep('otp'); // Move to OTP verification step
                        startOtpTimer();
                    } else {
                        toast.error(result.message);
                    }
                }

                // OTP Verification
                else if (signupStep === 'otp') {
                    if (otp.length !== 6) {
                        toast.error("Please enter a valid 6-digit OTP");
                        setIsLoading(false);
                        return;
                    }

                    // Verify OTP
                    result = await dispatch(verifyOtp(formData.email, otp));

                    if (result.success) {
                        toast.success(result.message);
                        setIsOtpVerified(true);
                        setSignupStep('password'); // Move to password creation step
                    } else {
                        toast.error(result.message);
                        setOtp(''); // Clear OTP field on error
                    }
                }

                //  Password Creation & Account Registration
                else if (signupStep === 'password') {
                    const { password } = formData;

                    // Password validation
                    if (password.length < 6) {
                        toast.error("Password must be at least 6 characters long");
                        setIsLoading(false);
                        return;
                    }
                    if (!/[A-Z]/.test(password)) {
                        toast.error("Password must contain at least one uppercase letter [A-Z]");
                        setIsLoading(false);
                        return;
                    }
                    if (!/[a-z]/.test(password)) {
                        toast.error("Password must contain at least one lowercase letter [a-z]");
                        setIsLoading(false);
                        return;
                    }
                    if (!/[0-9]/.test(password)) {
                        toast.error("Password must contain at least one number");
                        setIsLoading(false);
                        return;
                    }
                    if (!/[!@#$%^&*]/.test(password)) {
                        toast.error("Password must contain at least one special character (!@#$%^&*)");
                        setIsLoading(false);
                        return;
                    }

                    if (password !== confPass) {
                        toast.error("Password and confirm password don't match");
                        setFormData({ ...formData, password: "" });
                        setConfPass("");
                        setIsLoading(false);
                        return;
                    }

                    // Register user 
                    result = await dispatch(register({
                        ...formData
                    }));

                    if (result?.success) {
                        toast.success(result.message || "Account created successfully!");
                        // Reset all states
                        setFormData({ email: "", password: "" });
                        setConfPass("");
                        setOtp("");
                        setSignupStep('email');
                        setIsOtpVerified(false);
                        handleButtonClick();
                    } else {
                        toast.error(result?.message || "Signup failed. Try again!");
                        setFormData({ ...formData, password: "" });
                        setConfPass("");
                    }
                }
            }
        } catch (error) {
            console.error("Form submission error:", error);
            toast.error("Error submitting form. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    //  GOOGLE LOGIN 
    const handleGoogle = () => {
        window.location.href = `${API_BASE_URL}/auth/google`;
    };

    // RESET TO EMAIL 
    const handleBackToEmail = () => {
        setSignupStep('email');
        setOtp('');
        setIsOtpVerified(false);
        setOtpTimer(0);
        setCanResendOtp(false);
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

    // DYNAMIC HEADER TEXT BASED ON SIGNUP STEP 
    const getHeaderText = () => {
        if (type === "login") return { title: "Welcome Back", subtitle: "Sign in to continue" };

        if (signupStep === 'email') {
            return { title: "Create Account", subtitle: "Enter your email to get started" };
        } else if (signupStep === 'otp') {
            return { title: "Verify Email", subtitle: `Code sent to ${formData.email}` };
        } else if (signupStep === 'password') {
            return { title: "Set Password", subtitle: "Create a secure password" };
        }
    };

    const headerText = getHeaderText();

    return (
        <Modal
            isOpen={openState}
            style={customStyles}
            onRequestClose={!isLoading ? handleButtonClick : undefined}
            shouldCloseOnOverlayClick={false}
            shouldCloseOnEsc={false}
            contentLabel={type === "login" ? "Login Form" : "Sign Up Form"}
            ariaHideApp={false}
        >
            <motion.div
                className="bg-white rounded-2xl shadow-2xl overflow-hidden"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
            >
                {/* Header */}
                <motion.div
                    className="bg-gradient-to-br from-indigo-700 to-blue-900 pt-8 pb-10 px-8 text-center relative overflow-hidden"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                >
                    <button
                        type='button'
                        onClick={() => handleButtonClick()}
                        disabled={isLoading}
                        className=" absolute top-4 right-4 bg-white/20 hover:bg-white/30 text-white p-2 rounded-full cursor-pointer transition-all duration-200 backdrop-blur-sm shadow-lg">
                        <MdClose className="text-2xl" />
                    </button>

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
                        {/* Show verified icon when OTP is verified */}
                        {type === "signup" && isOtpVerified ? (
                            <MdVerifiedUser className="text-4xl text-white" />
                        ) : (
                            <GiSwordman className="text-4xl text-white" />
                        )}
                    </motion.div>

                    <motion.h2
                        className="text-3xl font-bold text-white font-serif"
                        initial={{ y: -20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.3 }}
                    >
                        {headerText.title}
                    </motion.h2>

                    <motion.p
                        className="text-blue-100 mt-2 font-serif text-sm"
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.4 }}
                    >
                        {headerText.subtitle}
                    </motion.p>
                </motion.div>

                <motion.div
                    className="p-8"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    {/* GOOGLE SIGN-IN (Only show on login or initial signup step)  */}
                    {(type === "login" || (type === "signup" && signupStep === 'email')) && (
                        <>
                            <motion.div
                                className="mb-6"
                                variants={itemVariants}
                            >
                                <motion.button
                                    onClick={handleGoogle}
                                    disabled={isLoading}
                                    className={`w-full flex items-center justify-center gap-3 bg-white border border-gray-300 rounded-lg p-4 hover:bg-gray-50 transition duration-200 font-serif ${isLoading ? "opacity-70 cursor-not-allowed" : ""
                                        }`}
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
                        </>
                    )}

                    {/*  FORM  */}
                    <form onSubmit={handleFormData} className="space-y-4">
                        {/* EMAIL INPUT (Login or Signup )*/}
                        {(type === "login" || (type === "signup" && signupStep === 'email')) && (
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
                                    disabled={isLoading}
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="Email address"
                                    autoComplete='email'
                                    className={`w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none font-serif ${isLoading ? "opacity-70 cursor-not-allowed" : ""
                                        }`}
                                    required
                                />
                            </motion.div>
                        )}

                        {/* OTP INPUT (Signup ) */}
                        {type === "signup" && signupStep === 'otp' && (
                            <motion.div
                                variants={itemVariants}
                                initial="hidden"
                                animate="visible"
                            >
                                <motion.div className="relative" variants={itemVariants}>
                                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-indigo-500">
                                        <MdVerifiedUser className="text-lg" />
                                    </div>
                                    <input
                                        type="text"
                                        inputMode="numeric"
                                        name="otp"
                                        disabled={isLoading}
                                        value={otp}
                                        onChange={handleOtpChange}
                                        placeholder="Enter 6-digit OTP"
                                        maxLength={6}
                                        className={`w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none font-serif text-center tracking-widest text-lg font-bold ${isLoading ? "opacity-70 cursor-not-allowed" : ""
                                            }`}
                                        required
                                    />
                                </motion.div>

                                {/* Resend OTP / Timer */}
                                <motion.div
                                    className="flex justify-between items-center mt-3"
                                    variants={itemVariants}
                                >
                                    <button
                                        type="button"
                                        onClick={handleBackToEmail}
                                        disabled={isLoading}
                                        className={`text-sm flex gap-1 text-gray-600 hover:text-indigo-600 font-medium font-serif ${isLoading ? "opacity-70 cursor-not-allowed" : ""
                                            }`}
                                    >
                                        <IoReturnUpBack size={20}/> Change email
                                    </button>

                                    {canResendOtp ? (
                                        <button
                                            type="button"
                                            onClick={handleResendOtp}
                                            disabled={isLoading}
                                            className={`text-sm text-indigo-600 hover:text-indigo-800 font-medium font-serif ${isLoading ? "opacity-70 cursor-not-allowed" : ""
                                                }`}
                                        >
                                            Resend OTP
                                        </button>
                                    ) : (
                                        <span className="text-sm text-gray-500 font-serif">
                                            Resend in {otpTimer}s
                                        </span>
                                    )}
                                </motion.div>

                                <motion.p
                                    className="text-xs text-gray-500 mt-2 text-center font-serif"
                                    variants={itemVariants}
                                >
                                    Check your email for the verification code
                                </motion.p>
                            </motion.div>
                        )}

                        {/*  PASSWORD INPUTS  */}
                        {/* Show for login OR signup (after OTP verification) */}
                        {(type === "login" || (type === "signup" && signupStep === 'password')) && (
                            <>
                                <motion.div
                                    className="relative"
                                    variants={itemVariants}
                                >
                                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-indigo-500">
                                        <GoLock className="text-lg" />
                                    </div>
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        name="password"
                                        value={formData.password}
                                        disabled={isLoading}
                                        onChange={handleChange}
                                        placeholder="Password"
                                        className={`w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none font-serif ${isLoading ? "opacity-70 cursor-not-allowed" : ""
                                            }`}
                                        required
                                        autoComplete="new-password"
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

                                {/* Confirm Password (Only for Signup) */}
                                {type === "signup" && signupStep === 'password' && (
                                    <motion.div
                                        className="relative"
                                        variants={itemVariants}
                                    >
                                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-indigo-500">
                                            <GoLock className="text-lg" />
                                        </div>
                                        <input
                                            type={showCPassword ? "text" : "password"}
                                            name="confPass"
                                            value={confPass}
                                            disabled={isLoading}
                                            onChange={confPassHandle}
                                            placeholder="Confirm password"
                                            className={`w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none font-serif ${isLoading ? "opacity-70 cursor-not-allowed" : ""
                                                }`}
                                            required
                                            autoComplete="new-password"
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
                                )}
                            </>
                        )}

                        {/* Forgot Password (Login only) */}
                        {type === "login" && (
                            <motion.div
                                className="flex justify-end"
                                variants={itemVariants}
                            >
                                <motion.button
                                    type="button"
                                    disabled={isLoading}
                                    className={`text-sm text-indigo-600 hover:text-indigo-800 font-medium flex items-center gap-1 font-serif ${isLoading ? "opacity-70 cursor-not-allowed" : ""
                                        }`}
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

                        {/*  SUBMIT BUTTON */}
                        <motion.button
                            type="submit"
                            disabled={isLoading}
                            className={`w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 rounded-lg transition duration-200 font-serif ${isLoading ? "opacity-70 cursor-not-allowed" : ""
                                }`}
                            variants={itemVariants}
                            whileHover="hover"
                            whileTap="tap"
                        >
                            {isLoading ? (
                                <>
                                    <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                                    <span className="text-white text-base font-medium">Please wait...</span>
                                </>
                            ) : (
                                <span className="text-white text-base font-medium">
                                    {type === "login"
                                        ? "Sign In"
                                        : signupStep === 'email'
                                            ? "Continue"
                                            : signupStep === 'otp'
                                                ? "Verify OTP"
                                                : "Create Account"}
                                </span>
                            )}
                        </motion.button>
                    </form>

                    {/*  SWITCH BETWEEN LOGIN/SIGNUP */}

                    {(type === "login" || (type === "signup" && signupStep === 'email')) && (
                        <motion.div
                            className="text-center mt-6"
                            variants={itemVariants}
                        >
                            <p className="text-gray-600 font-serif">
                                {type === "login" ? "Don't have an account?" : "Already have an account?"}
                                <motion.button
                                    disabled={isLoading}
                                    className={`ml-2 text-indigo-600 hover:text-indigo-800 font-medium font-serif ${isLoading ? "opacity-70 cursor-not-allowed" : ""
                                        }`}
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
                    )}
                </motion.div>
            </motion.div>
        </Modal>
    );
};

export default FormUI;