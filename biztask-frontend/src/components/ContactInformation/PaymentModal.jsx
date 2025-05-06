import React from 'react';
import { motion } from 'framer-motion';
import { FaCheck } from 'react-icons/fa';
import { MdPayment } from 'react-icons/md';
import QRCode from 'react-qr-code';

const PaymentModal = ({ 
    showPaymentModal, 
    setShowPaymentModal, 
    transactionId, 
    setTransactionId, 
    isVerifying, 
    verifyPayment, 
    upiID, 
    upiName 
}) => {
    return (
        <motion.div
            className="fixed inset-0 font-serif bg-black/50 flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowPaymentModal(false)}
        >
            <motion.div
                className="bg-white rounded-xl xl:max-w-md w-[80%] p-6"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
            >
                <div className="text-center mb-4">
                    <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                        <MdPayment className="text-blue-600 text-3xl" />
                    </div>
                    <h3 className="xl:text-xl text-2xl font-bold text-gray-900">Payment Required</h3>
                    <p className="text-gray-500 xl:text-base text-lg mt-1">
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
                    <div className="text-center xl:text-sm text-gray-600 mb-4">
                        <p>Scan the QR code with any UPI app</p>
                        <p>or pay to: <span className="font-medium">{upiID}</span></p>
                    </div>
                </div>

                <div className="space-y-4">
                    <div>
                        <label className="block xl:text-sm  font-medium text-gray-700 mb-1">
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
                            className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 rounded-lg text-lg xl:text-base font-medium transition-colors duration-200"
                            onClick={() => setShowPaymentModal(false)}
                        >
                            Cancel
                        </button>
                        <button
                            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-medium text-lg xl:text-base flex items-center justify-center gap-2 transition-colors duration-200"
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

                <div className="mt-4 xl:text-xs text-base  text-center text-gray-500">
                    Note: Contact details will be unlocked immediately after payment verification
                </div>
            </motion.div>
        </motion.div>
    );
};

export default PaymentModal;