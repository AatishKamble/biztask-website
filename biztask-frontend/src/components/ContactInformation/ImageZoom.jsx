import React from 'react';
import { motion } from 'framer-motion';
import { FaTimes } from 'react-icons/fa';

const ImageZoom = ({ setShowImageModal, profileImage }) => {
    // Modal animation variants
    const modalVariants = {
        hidden: { opacity: 0, scale: 0.8 },
        visible: { 
            opacity: 1, 
            scale: 1,
            transition: { type: "spring", damping: 25, stiffness: 300 }
        },
        exit: { 
            opacity: 0, 
            scale: 0.8,
            transition: { duration: 0.2 } 
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4">
            <motion.div 
                className="relative max-w-4xl max-h-screen"
                variants={modalVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                onClick={(e) => e.stopPropagation()}
            >
               
                <img 
                    src={profileImage} 
                    alt="Service Provider" 
                    className="max-w-full max-h-screen h-[90vh] object-contain rounded-lg shadow-xl"
                />
            </motion.div>
            
            {/* Background overlay click to close */}
            <div 
                className="absolute inset-0 z-40" 
                onClick={() => setShowImageModal(false)}
            ></div>
        </div>
    );
};

export default ImageZoom;