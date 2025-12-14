import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaCheck, FaShieldAlt, FaCreditCard, FaArrowRight } from 'react-icons/fa';
import { MdPayment, MdClose } from 'react-icons/md';
import QRCode from 'react-qr-code';
import { useSelector } from 'react-redux';

const PaymentModal = ({
    showPaymentModal,
    setShowPaymentModal,
    transactionId,
    setTransactionId,
    verifyPaymentAndSubmit,
    upiID,
    upiName,
    basePackage,
    premiumPackage,
    price,
    setPrice
}) => {

    const isLoading = useSelector(store => store.serviceBookingStore.isLoading);



    return (
        <motion.div
            className="fixed inset-0 font-serif bg-gradient-to-br from-blue-900/40 via-black/60 to-indigo-900/40 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}

        >
            <motion.div
                className="bg-gradient-to-br from-white to-blue-50/30 rounded-3xl max-w-md w-full max-h-[95vh] overflow-auto shadow-2xl"
                initial={{ scale: 0.8, opacity: 0, y: 50 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.8, opacity: 0, y: 50 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}

            >
                {/* Header Section */}
                <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-4 relative overflow-hidden">
                    <div className="absolute inset-0 bg-white/10 backdrop-blur-3xl"></div>

                    <motion.div
                        initial={{ y: -20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.1 }}
                        className="relative z-10 text-center flex flex-col items-center justify-center gap-3"
                    >

                        <h3 className="text-xl font-bold text-white mb-2">Secure Payment</h3>

                        {/* Base Package */}
                        <button
                            className={`inline-flex items-center gap-2 p-3 rounded-xl border backdrop-blur-md w-56 justify-between
      transition-all duration-300
      ${price === basePackage
                                    ? "bg-blue-600 text-white border-blue-300 shadow-lg scale-105"
                                    : "bg-white/20 border-white/30 text-white hover:bg-white/30"
                                }
    `}
                            onClick={() => setPrice(basePackage)}
                        >
                            <span className="text-base font-bold">₹ {basePackage+10}</span>
                            <span className="text-blue-100 text-sm">Base Package</span>
                        </button>

                        {/* Premium Package */}
                        <button
                            className={`inline-flex items-center gap-2 p-3 rounded-xl border backdrop-blur-md w-56 justify-between
      transition-all duration-300
      ${price === premiumPackage
                                    ? "bg-blue-600 text-white border-blue-300 shadow-lg scale-105"
                                    : "bg-white/20 border-white/30 text-white hover:bg-white/30"
                                }
    `}
                            onClick={() => setPrice(premiumPackage)}
                        >
                            <span className="text-base font-bold">₹ {premiumPackage+10}</span>
                            <span className="text-blue-100 text-sm">Premium Package</span>
                        </button>

<p className="text-base font-medium text-white mb-2">₹ 10 Platform price added to packages. </p>

                    </motion.div>

                </div>

                {/* Content Section */}
                <div className="md:p-6 p-4 space-y-6">
                    {/* QR Code Section */}
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="bg-gradient-to-br from-white to-blue-50 rounded-2xl p-6 shadow-lg border-2 border-blue-100"
                    >
                        <div className="flex justify-center mb-4">
                            <div className="bg-white p-4 rounded-2xl shadow-xl border-4 border-blue-500/20">
                                <QRCode
                                    value={`upi://pay?pa=${upiID}&pn=${encodeURIComponent(upiName)}&am=2.00&cu=INR&tn=Unlock%20All%20Contact%20Details`}
                                    size={130}
                                />
                            </div>
                        </div>
                        <div className="text-center space-y-2">
                            <p className="text-sm font-semibold text-gray-700 flex items-center justify-center gap-2">
                                <FaCreditCard className="text-blue-600" />
                                Scan with any UPI app
                            </p>
                            <div className="bg-blue-50 px-4 py-2 rounded-lg border border-blue-200">
                                <p className="text-xs text-gray-600 mb-1">Pay to UPI ID:</p>
                                <p className="font-mono font-semibold text-blue-600">{upiID}</p>
                            </div>
                        </div>
                    </motion.div>

                    {/* Transaction ID Input */}
                    <motion.div
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="space-y-2"
                    >
                        <label className=" text-sm font-bold text-gray-700 flex items-center gap-2">
                            <FaShieldAlt className="text-blue-600" />
                            Transaction ID / Reference Number
                        </label>
                        <div className="relative group">
                            <input
                                type="text"
                                className="w-full px-4 py-3.5 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all outline-none bg-white font-mono text-sm"
                                placeholder="Enter UPI Ref. Number (e.g., 123456789012)"
                                value={transactionId}
                                onChange={(e) => setTransactionId(e.target.value)}
                            />

                        </div>
                    </motion.div>

                    {/* Action Buttons */}
                    <motion.div
                        className="flex flex-col sm:flex-row gap-3 pt-2"
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.4 }}
                    >
                        <button
                            className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-3.5 rounded-xl text-base font-semibold transition-all duration-200 border-2 border-gray-200 hover:border-gray-300 active:scale-95"
                            onClick={() => setShowPaymentModal(false)}
                        >
                            Cancel
                        </button>
                        <button
                            className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white py-3.5 rounded-xl font-semibold text-base flex items-center justify-center gap-2 transition-all duration-200 shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed"
                            onClick={verifyPaymentAndSubmit}
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <>
                                    <motion.div
                                        animate={{ rotate: 360 }}
                                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                        className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                                    />
                                    <span>Submitting...</span>
                                </>
                            ) : (
                                <>
                                    <FaCheck />
                                    <span>Verify & Submit</span>
                                </>
                            )}
                        </button>
                    </motion.div>

                    {/* Security Note */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="bg-blue-50 border-l-4 border-blue-600 rounded-lg p-4"
                    >
                        <div className="flex items-start gap-3">
                            <FaShieldAlt className="text-blue-600 flex-shrink-0 mt-0.5" size={20} />
                            <div>
                                <p className="text-xs font-semibold text-blue-900 mb-1">Secure Payment</p>
                                <p className="text-xs text-blue-700">
                                    Contact details will be sent to your email after payment verification
                                </p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </motion.div>
        </motion.div>
    );
};

export default PaymentModal;