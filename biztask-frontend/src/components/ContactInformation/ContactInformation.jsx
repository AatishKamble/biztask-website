import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaUserSecret, FaPhone, FaLock, FaCheck, FaRupeeSign } from 'react-icons/fa';
import { MdEmail, MdPayment } from 'react-icons/md';
import QRCode from 'react-qr-code';
import uploadPhoto from "../../assets/uploadPhoto.jpg"
const ContactInformation = ({ serviceDetails, userDetails }) => {
    // States for payment flow
    const [hasPaid, setHasPaid] = useState(false);
    const [showPaymentModal, setShowPaymentModal] = useState(false);
    const [transactionId, setTransactionId] = useState('');
    const [isVerifying, setIsVerifying] = useState(false);


    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                when: "beforeChildren",
                staggerChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { type: "spring", stiffness: 300 }
        }
    };

    // Function to handle payment initiation
    const handlePaymentInitiation = () => {
        setShowPaymentModal(true);
    };


    // Function to verify payment
    const verifyPayment = () => {
        if (!transactionId.trim()) {
            alert("Please enter transaction ID");
            return;
        }

        setIsVerifying(true);
        setTimeout(() => {
            setIsVerifying(false);
            setShowPaymentModal(false);
            setTransactionId('');
            setHasPaid(true);
            alert("Payment verified successfully! All contact details unlocked.");
        }, 2000);
    };

    const upiID = "XXXX123@oksbi";
    const upiName = "XXXXXXXX XXXXX";

    return (
        <>
            {userDetails?._id === serviceDetails?.user?._id || hasPaid &&
                <div className="w-[140px] h-[160px] sm:w-[160px] sm:h-[200px] rounded-xl overflow-hidden border-2 border-blue-300 flex-shrink-0">
                    <img
                        src={serviceDetails?.user?.profileImage?.ImageUrl || uploadPhoto}
                        alt="Owner"
                        className="w-full h-full object-cover"
                    />
                </div>}
            <motion.div
                className="flex flex-col flex-1 text-blue-900 text-[18px] font-serif space-y-5 w-full"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                {/* Heading */}
                <motion.div
                    className="text-[20px] font-semibold border-b border-blue-300 pb-2"
                    variants={itemVariants}
                >
                    Contact Information
                </motion.div>
                { !hasPaid &&
                <button
                    className="bg-blue-600 h-12 hover:bg-blue-700 text-white px-3 py-1 rounded-lg flex items-center justify-center gap-1 text-base transition-colors duration-200"
                    onClick={handlePaymentInitiation}
                >

                    <span className='flex items-center justify-center '>Unlock All for <FaRupeeSign  className='ms-2'/> 2</span>
                </button>
}
                {/* Info Boxes */}
                <div className="space-y-4 text-[16px]">
                    {/* Name */}
                    <motion.div
                        className="relative flex gap-3 items-start bg-blue-50/60 border border-blue-200 p-3 rounded-xl overflow-hidden"
                        variants={itemVariants}
                        whileHover={{ scale: 1.01 }}
                        transition={{ type: "spring", stiffness: 400 }}
                    >
                        <FaUserSecret className="text-sky-600 mt-[4px]" />
                        <AnimatePresence>
                            {userDetails?._id === serviceDetails?.user?._id || hasPaid ? (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="flex-1 break-words break-all font-medium"
                                >
                                    {serviceDetails?.user?.name || "Not Available"}
                                </motion.div>
                            ) : (
                                <motion.div
                                    className="flex-1 flex justify-between items-center"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                >
                                    <div className="flex items-center">
                                        <FaLock className="text-orange-500 mr-2" />
                                        <span className="text-gray-600">Contact name is hidden</span>
                                    </div>

                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>


                    {/* Phone */}
                    <motion.div
                        className="relative flex gap-3 items-start bg-blue-50/60 border border-blue-200 p-3 rounded-xl overflow-hidden"
                        variants={itemVariants}
                        whileHover={{ scale: 1.01 }}
                        transition={{ type: "spring", stiffness: 400 }}
                    >
                        <FaPhone className="text-sky-600 mt-[4px]" />
                        <AnimatePresence>
                            {userDetails?._id === serviceDetails?.user?._id || hasPaid ? (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="flex-1 break-words break-all font-medium"
                                >
                                    {serviceDetails?.user?.mobileNumber || "Not Available"}
                                </motion.div>
                            ) : (
                                <motion.div
                                    className="flex-1 flex justify-between items-center"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                >
                                    <div className="flex items-center">
                                        <FaLock className="text-orange-500 mr-2" />
                                        <span className="text-gray-600">Phone number is hidden</span>
                                    </div>
                                    
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>


                    {/* Email */}
                    <motion.div
                        className="relative flex gap-3 items-start bg-blue-50/60 border border-blue-200 p-3 rounded-xl overflow-hidden"
                        variants={itemVariants}
                        whileHover={{ scale: 1.01 }}
                        transition={{ type: "spring", stiffness: 400 }}
                    >
                        <MdEmail className="text-sky-600 mt-[4px]" />
                        <AnimatePresence>
                            {userDetails?._id === serviceDetails?.user?._id || hasPaid ? (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="flex-1 break-words break-all font-medium"
                                >
                                    {serviceDetails?.user?.email || "Not Available"}
                                </motion.div>
                            ) : (
                                <motion.div
                                    className="flex-1 flex justify-between items-center"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                >
                                    <div className="flex items-center">
                                        <FaLock className="text-orange-500 mr-2" />
                                        <span className="text-gray-600">Email address is hidden</span>
                                    </div>
                                   

                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>

                </div>
            </motion.div>

            {/* Payment Modal */}
            <AnimatePresence>
                {showPaymentModal && (
                    <motion.div
                        className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setShowPaymentModal(false)}
                    >
                        <motion.div
                            className="bg-white rounded-xl max-w-md w-full p-6"
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="text-center mb-4">
                                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <MdPayment className="text-blue-600 text-3xl" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900">Payment Required</h3>
                                <p className="text-gray-500 mt-1">
                                    Pay ₹2 to unlock
                                </p>
                            </div>

                            <div className="mb-6">
                                <div className="flex justify-center mb-4">
                                    <div className="bg-white p-2 rounded-lg border border-gray-200">
                                        <QRCode
                                            value={`upi://pay?pa=${upiID}&pn=${encodeURIComponent(upiName)}&am=2.00&cu=INR&tn=Unlock%20All%20Contact%20Details`}
                                            size={180}
                                        />



                                    </div>
                                </div>
                                <div className="text-center text-sm text-gray-600 mb-4">
                                    <p>Scan the QR code with any UPI app</p>
                                    <p>or pay to: <span className="font-medium">{upiID}</span></p>

                                </div>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Enter Transaction ID/Reference Number
                                    </label>
                                    <input
                                        type="text"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        placeholder="e.g., UPI Ref. Number"
                                        value={transactionId}
                                        onChange={(e) => setTransactionId(e.target.value)}
                                    />
                                </div>

                                <div className="flex gap-3">
                                    <button
                                        className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 rounded-lg font-medium transition-colors duration-200"
                                        onClick={() => setShowPaymentModal(false)}
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-medium flex items-center justify-center gap-2 transition-colors duration-200"
                                        onClick={verifyPayment}
                                        disabled={isVerifying}
                                    >
                                        {isVerifying ? (
                                            <>
                                                <motion.div
                                                    animate={{ rotate: 360 }}
                                                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                                    className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                                                />
                                                <span>Verifying...</span>
                                            </>
                                        ) : (
                                            <>
                                                <FaCheck />
                                                <span>Verify Payment</span>
                                            </>
                                        )}
                                    </button>
                                </div>
                            </div>

                            <div className="mt-4 text-xs text-center text-gray-500">
                                Note: Contact details will be unlocked immediately after payment verification
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default ContactInformation;