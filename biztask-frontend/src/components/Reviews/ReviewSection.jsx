
import Star from "./Star.jsx";
import { FaStar } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { IoIosAddCircle } from "react-icons/io";
import Review from "./Review.jsx";
//new
import { toast } from "react-toastify";
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { FaArrowDown, FaArrowUp, FaStarHalfStroke } from "react-icons/fa6";
import { addReview, getAllReviews, removeReview, updateReview } from "../../Redux/Review/Action.js";
import { IoWarningOutline } from "react-icons/io5";
import { TiTick } from "react-icons/ti";
import { MdOutlineRateReview } from "react-icons/md";

const ReviewSection = ({ userDetails, serviceDetails, onReviewSubmitted }) => {


    //component states

    const [currentValue, setCurrentValue] = useState(0);
    const [hoverValue, setHoverValue] = useState(undefined);
    const [input, setInput] = useState("");
    const [deleteLoading, setDeleteLoading] = useState(false);
    const [wordCount, setWordCount] = useState(0);
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);
    const [visibleReviews, setVisibleReviews] = useState(10);
    const [reviewsLoading, setReviewsLoading] = useState(true);
    const [isEditMode, setIsEditMode] = useState(false);
    const [editingReviewId, setEditingReviewId] = useState(null);



    const jwt = localStorage.getItem("jwt");

    const reviewStore = useSelector(store => store.reviewStore);

    const dispatch = useDispatch();


    useEffect(() => {
        if (!serviceDetails?._id) return;

        const loadReviews = async () => {
            setReviewsLoading(true);
            await dispatch(getAllReviews(serviceDetails._id));
            setReviewsLoading(false);
        };

        loadReviews();
    }, [serviceDetails?._id, dispatch]);


    // Animation Variant
    const fadeUp = {
        hidden: { opacity: 0, y: 50 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6 }
        }
    };
    const handleClick = (value) => {
        setCurrentValue(value);
    }

    //rating star effect 
    const handleMouseHover = (value) => {
        setHoverValue(value);
    }
    const handleMouseLeave = (value) => {
        setHoverValue(undefined);
    }
    //handling review visible
    const handleViewMore = () => {

        setVisibleReviews((prevVisibleReviews) => prevVisibleReviews + 10);
    };
    //review input box
    const handleInputChange = (e) => {
        const text = e.target.value;
        const words = text.trim().split(/\s+/);  // Split by spaces, tabs, and newlines
        const wordCount = words.filter(word => word).length;

        if (wordCount <= 20) {
            setInput(text);
            setWordCount(wordCount);
        }
        else {
            toast.error('Maximum word has reached');
            return;
        }
    }


    //review delete
    const handleReviewDelete = async (id) => {
        if (!window.confirm("Deleting this review will also delete your uploaded work images. Continue?")) return;
        try {
            setDeleteLoading(true);


            const result = await dispatch(removeReview(id, jwt));

            if (result?.success) {
                toast.success(result?.message || "Review deleted successfully!");

                onReviewSubmitted(false);
            } else {
                toast.error(result?.message || "Failed to delete review.");
            }
        } catch (error) {
            toast.error("Something went wrong while deleting the review.");
        } finally {
            setDeleteLoading(false);
        }
    };

    //submit review
    const handleSubmitReview = async () => {
        if (input.trim() === "") {
            toast.error("Please enter at least one character.");
            return;
        }

        if (currentValue === 0) {
            toast.error("Rating should be between 1 to 5");
            return;
        }

        const formData = new FormData();
        formData.append("rating", currentValue);
        formData.append("review", input);


        try {
            setIsButtonDisabled(true);
            let result;


            if (isEditMode && editingReviewId) {
                // Update existing review

                result = await dispatch(updateReview(formData, editingReviewId, jwt));

            } else {
                // Add new review
                formData.append("serviceId", serviceDetails?._id);

                result = await dispatch(addReview(formData, jwt));
            }



            if (result?.success) {
                toast.success(result?.message || `Review ${isEditMode ? 'updated' : 'submitted'} successfully!`);



                onReviewSubmitted(true);

            } else {
                toast.error(result?.message || `Failed to ${isEditMode ? 'update' : 'submit'} review!`);
            }

        } catch (error) {
            toast.error("Something went wrong. Please try again.");
        } finally {
            // Reset fields
            setCurrentValue(0);
            setHoverValue(undefined);
            setInput("");
            setWordCount(0);
            setIsEditMode(false);
            setEditingReviewId(null);
            setIsButtonDisabled(false);
        }
    };

    //review update
    const handleEditReview = (review) => {
        setIsEditMode(true);
        setEditingReviewId(review._id);
        setCurrentValue(review.rating);
        setInput(review.ReviewMessage);
        const words = review.ReviewMessage.trim().split(/\s+/);
        setWordCount(words.filter(word => word).length);
        // Scroll to form
        document.getElementById('review-form').scrollIntoView({ behavior: 'smooth' });
    };

    // Cancel edit 
    const handleCancelEdit = () => {
        setIsEditMode(false);
        setEditingReviewId(null);
        setCurrentValue(0);
        setHoverValue(undefined);
        setInput("");
        setWordCount(0);
    };

    return (
        <>



            <div className='w-full h-auto relative  flex flex-col bg-white rounded-xl '>

                {/* Header Section */}

                <div className="w-full md:px-6 px-4 md:py-6 py-2 mb-4 sm:md-2">
                    <div className="xl:max-w-6xl max-w-4xl mx-auto flex flex-col md:flex-row justify-between items-center">

                        <div className="text-blue-800 mb-6 md:mb-0 text-center md:text-left">
                            <div className="text-center mb-4">
                                <h2 className="font-serif font-bold text-4xl  z-10 mb-3">
                                    Customer Reviews
                                </h2>
                                <motion.div
                                    initial={{ width: 0 }}
                                    whileInView={{ width: "100%" }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.5, duration: 0.6 }}
                                    className="h-1 max-w-xs mx-auto bg-gradient-to-r from-transparent via-blue-500 to-transparent rounded-full mb-4"
                                />
                                 <p className="text-gray-600 text-base font-serif mb-2 ">
                                Trusted by customers across the country
                            </p>
                            </div>
    
                            {/* Rating stats */}
                            {reviewStore?.reviews.length > 0 ? (
                                <div className="flex items-center font-serif justify-center md:justify-start gap-4">
                                    <div className="flex items-center gap-2 bg-white shadow-indigo-600 p-4 rounded-xl shadow-sm border border-gray-100">
                                        <span className="font-serif font-bold md:text-3xl text-xl text-blue-800">
                                            {(reviewStore.reviews.reduce((acc, review) => acc + review.rating, 0) / reviewStore.reviews.length).toFixed(1)}
                                        </span>
                                        <div className="flex flex-col items-start">
                                            <div className="flex">
                                                <Star star={(reviewStore.reviews.reduce((acc, review) => acc + review.rating, 0) / reviewStore.reviews.length).toFixed(1)} />
                                            </div>
                                            <span className="text-gray-600 text-sm">
                                                ({reviewStore.reviews.length} {reviewStore.reviews.length === 1 ? "review" : "reviews"})
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="flex items-center justify-center md:justify-start">
                                    <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-center">
                                        <div className="flex">
                                            {[1, 2, 3, 4, 5].map((star) => (
                                                <FaStar key={star} size={18} className="text-blue-200" />
                                            ))}
                                        </div>
                                        <span className="ml-2 text-blue-400 text-sm">No reviews yet</span>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Card */}
                        <motion.div

                            whileTap={{ scale: 0.98 }}
                            className="bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700 p-6 rounded-xl shadow-lg shadow-indigo-400 max-w-md text-center relative overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full transform translate-x-8 -translate-y-8"></div>
                            <div className="absolute bottom-0 left-0 w-16 h-16 bg-white/5 rounded-full transform -translate-x-6 translate-y-6"></div>

                            <div className="relative z-10">
                                <h3 className="text-white font-serif font-semibold text-lg mb-1">
                                    Had an experience with this service?
                                </h3>
                                <p className="text-blue-100 text-sm mb-2">
                                    Your feedback helps others make better choices
                                </p>
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="flex items-center justify-center gap-2 mx-auto h-11 w-36 bg-white text-blue-700 font-serif font-semibold rounded-lg shadow-md transition-all duration-300 hover:shadow-lg"
                                    onClick={() => document.getElementById('review-form').scrollIntoView({ behavior: 'smooth' })}
                                >
                                    <IoIosAddCircle size={20} />
                                    <span>Add Review</span>
                                </motion.button>
                            </div>
                        </motion.div>
                    </div>
                </div>

                {/* Reviews Section */}
                <div className="w-full md:px-6 px-4 mb-8">
                    <div className="xl:max-w-6xl max-w-4xl mx-auto">

                        {/* Filter tabs */}
                        <div className="flex flex-wrap justify-center md:justify-start gap-2 mb-6">
                            <button className="px-4 py-2 bg-blue-600 text-white rounded-full text-sm font-serif shadow-sm hover:shadow-md transition-all duration-300">
                                All Reviews ({reviewStore?.reviews.length})
                            </button>
                            {/* <button className="px-4 py-2 bg-white hover:bg-gray-50 text-gray-700 rounded-full text-sm font-serif shadow-sm border border-gray-200 transition-all duration-300" onClick={handleMostRecentReviews}>
                                    Most Recent
                                </button> */}
                        </div>

                        {reviewsLoading ? (<div className='w-full h-auto my-10 mt-0 flex flex-col bg-gray-50 rounded-xl py-4'>



                            <div className="w-full md:px-6 px-4 mb-8">
                                <div className="xl:max-w-6xl max-w-4xl mx-auto">

                                    {/* Reviews Grid */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        {[...Array(4)].map((_, index) => (
                                            <div key={index} className="bg-gray-200 rounded-lg p-4">
                                                <div className="flex items-center mb-3">
                                                    <div className="w-12 h-12 bg-gray-300 rounded-full mr-3"></div>
                                                    <div>
                                                        <div className="h-4 bg-gray-300 rounded w-24 mb-1"></div>
                                                        <div className="flex gap-1">
                                                            {[...Array(5)].map((_, i) => (
                                                                <div key={i} className="w-3 h-3 bg-gray-300 rounded"></div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="space-y-2">
                                                    <div className="h-3 bg-gray-300 rounded w-full"></div>
                                                    <div className="h-3 bg-gray-300 rounded w-4/5"></div>
                                                    <div className="h-3 bg-gray-300 rounded w-3/5"></div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                        </div>
                        ) :
                            <>
                                {/* Reviews grid */}
                                {reviewStore?.reviews.length > 0 ? (
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        {reviewStore?.reviews.slice(0, visibleReviews).map((review, index) => (
                                            <motion.div
                                                key={index}
                                                initial={{ opacity: 0, y: 30 }}
                                                whileInView={{ opacity: 1, y: 0 }}
                                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                                viewport={{ once: true }}
                                            >
                                                <Review review={review} userDetails={userDetails} handleReviewDelete={handleReviewDelete} handleEditReview={handleEditReview} deleteLoading={deleteLoading} />
                                            </motion.div>
                                        ))}
                                    </div>
                                ) : (
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ duration: 0.8 }}
                                        className="text-center p-10 bg-white rounded-xl shadow-sm border border-gray-100"
                                    >
                                        <div className="text-blue-300 mb-4">
                                            <svg className="w-20 h-20 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zM7 8H5v2h2V8zm2 0h2v2H9V8zm6 0h-2v2h2V8z" clipRule="evenodd"></path>
                                            </svg>
                                        </div>
                                        <h3 className="text-xl font-serif font-medium text-gray-700 mb-2">No reviews yet</h3>
                                        <p className="text-gray-500 font-serif mb-4">Be the first to share your experience with this service provider!</p>
                                        <button
                                            onClick={() => document.getElementById('review-form').scrollIntoView({ behavior: 'smooth' })}
                                            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg text-base font-serif transition-colors duration-300 shadow-sm hover:shadow-md"
                                        >
                                            <IoIosAddCircle size={20} />
                                            <span>Write a Review</span>
                                        </button>
                                    </motion.div>
                                )}
                            </>
                        }



                        {/* Load more button */}
                        {visibleReviews < reviewStore?.reviews.length && (
                            <div className='w-full flex justify-center mt-8'>
                                <button className='bg-white border border-blue-600 text-blue-700 hover:bg-blue-50 px-6 py-2 rounded-lg text-lg font-serif font-medium shadow-sm hover:shadow-md transition-all duration-300'
                                    onClick={handleViewMore}>
                                    View More Reviews
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                {/* Review form  */}
                <div id="review-form" className="w-full sm:px-6 px-2 pt-4 border-t border-gray-200 bg-white">
                    <motion.div
                        variants={fadeUp}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="max-w-2xl mx-auto flex flex-col items-center gap-6 py-8"
                    >
                        {/*  Header */}
                        <div className="text-center mb-2">
                            <h2 className="text-blue-950 font-serif font-bold text-3xl inline-block bg-gradient-to-r from-blue-600 via-blue-500 to-purple-600 bg-clip-text text-transparent mb-3">
                                {isEditMode ? 'Update Your Experience' : 'Share Your Experience'}
                            </h2>
                            <motion.div
                                initial={{ width: 0 }}
                                whileInView={{ width: "100%" }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.5, duration: 0.6 }}
                                className="h-1 max-w-xs mx-auto bg-gradient-to-r from-transparent via-blue-500 to-transparent rounded-full mb-4"
                            />    <p className="text-gray-600 font-serif text-base mt-3">{isEditMode ? 'Modify your feedback to help us serve you better' : 'Your feedback helps us serve you better'}
                            </p>
                        </div>

                        {/*  Rating Section */}
                        <div className="flex flex-col items-center gap-3 p-8 rounded-2xl shadow-lg border border-gray-200 bg-gradient-to-br from-white to-blue-50 w-full max-w-lg backdrop-blur-sm">
                            <label htmlFor="star-rating" className="text-lg font-serif font-medium text-gray-800">
                                How would you rate this service?
                            </label>
                            <div className="flex items-center gap-4">
                                <div id="star-rating" className="flex gap-2 relative p-2 bg-white rounded-xl shadow-sm">
                                    {[...Array(5)].map((_, index) => {
                                        const leftValue = index + 0.5;
                                        const rightValue = index + 1;

                                        return (
                                            <div key={index} className="relative opacity-100 transform transition-transform hover:scale-110">
                                                {/* Base star */}
                                                <FaStar className="text-gray-200 w-7 h-7 drop-shadow-sm" />

                                                {/* Left half */}
                                                <div
                                                    className={`absolute top-0 left-0 w-1/2 h-full z-10 
                        ${isButtonDisabled ? "cursor-not-allowed" : "cursor-pointer"}
                      `}
                                                    onClick={() => !isButtonDisabled && handleClick(leftValue)}
                                                    onMouseOver={() => !isButtonDisabled && handleMouseHover(leftValue)}
                                                    onMouseLeave={() => !isButtonDisabled && handleMouseLeave()}
                                                />

                                                {/* Right half */}
                                                <div
                                                    className={`absolute top-0 right-0 w-1/2 h-full z-10 
                        ${isButtonDisabled ? "cursor-not-allowed" : "cursor-pointer"}
                      `}
                                                    onClick={() => !isButtonDisabled && handleClick(rightValue)}
                                                    onMouseOver={() => !isButtonDisabled && handleMouseHover(rightValue)}
                                                    onMouseLeave={() => !isButtonDisabled && handleMouseLeave()}
                                                />

                                                {/* Half star */}
                                                {(hoverValue || currentValue) >= leftValue &&
                                                    (hoverValue || currentValue) < rightValue && (
                                                        <FaStarHalfStroke
                                                            className="absolute top-0 left-0 text-yellow-400 w-7 h-7 drop-shadow-md"
                                                        />
                                                    )}

                                                {/* Full star */}
                                                {(hoverValue || currentValue) >= rightValue && (
                                                    <FaStar className="absolute top-0 left-0 text-yellow-400 w-7 h-7 drop-shadow-md" />
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>

                                <div className="ml-2 flex items-center justify-center min-w-12 h-10 px-3 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full shadow-md">
                                    <span className="font-serif font-bold text-white text-lg">
                                        {currentValue ? currentValue.toFixed(1) : "-"}
                                    </span>
                                </div>
                            </div>

                            <div className="flex items-center gap-2 mt-1">
                                {currentValue === 0 ? (
                                    <p className="text-amber-600 text-sm font-serif flex items-center gap-1">
                                        <IoWarningOutline className="text-amber-500" />Please select a rating
                                    </p>
                                ) : (
                                    <p className="text-green-600 text-sm font-serif flex items-center gap-1">
                                        <TiTick className="text-green-500" /> Thank you for {currentValue.toFixed(1)} rating
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* Review Input Section */}
                        <div className="w-full flex flex-col items-center gap-2">
                            <div className="bg-white p-6 rounded-2xl shadow-lg border-2 border-indigo-200 w-full backdrop-blur-sm">
                                <label htmlFor="review" className="xl:text-lg text-xl font-serif font-medium text-gray-800 flex items-center gap-2 mb-3">
                                    <span className="text-blue-500"><MdOutlineRateReview /></span>
                                    Your Review
                                </label>
                                <textarea
                                    name="review"
                                    id="review"
                                    disabled={isButtonDisabled}
                                    placeholder="What did you like or dislike? What was your experience with this service provider?"
                                    className={`text-base h-[150px] text-gray-700 font-serif outline-none p-4 w-full border-2 border-gray-200 bg-gradient-to-br from-gray-100 to-white rounded-xl shadow-sm focus:ring-1 focus:ring-blue-300 focus:border-blue-400 transition-all duration-200 ${isButtonDisabled ? "opacity-80 cursor-not-allowed" : ""
                                        }`}
                                    style={{ resize: "none" }}
                                    rows={5}
                                    value={input}
                                    onChange={handleInputChange}
                                ></textarea>
                                <div className="w-full flex justify-between items-center px-2 py-3 gap-1 ">
                                    <div className="flex items-center gap-2">
                                        <p className={`font-serif text-sm  font-medium ${wordCount >= 20 ? 'text-green-600' : 'text-gray-500'
                                            }`}>
                                            {wordCount} / 20 words
                                        </p>
                                        {wordCount >= 20 && <span className="text-green-500 text-xs">✓</span>}
                                    </div>
                                    <div className="flex gap-2">
                                        {isEditMode && (
                                            <motion.button
                                                disabled={isButtonDisabled}
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                                onClick={handleCancelEdit}
                                                className={`flex items-center justify-center gap-2 h-11 px-6 bg-gray-500 hover:bg-gray-600 text-white font-serif font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 ${isButtonDisabled ? "opacity-80 cursor-not-allowed" : ""
                                                    }`}
                                            >
                                                Cancel
                                            </motion.button>
                                        )}
                                        <motion.button
                                            disabled={isButtonDisabled}
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            onClick={handleSubmitReview}
                                            className={`flex items-center justify-center gap-2 h-11 px-6 bg-gradient-to-r from-blue-500 via-blue-600 to-purple-600 hover:from-blue-600 hover:via-blue-700 hover:to-purple-700 text-white font-serif font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 ${isButtonDisabled ? "opacity-80 cursor-not-allowed" : ""
                                                }`}
                                        >
                                            {isButtonDisabled ? (
                                                <>
                                                    <span className="animate-spin border-2 border-white border-t-transparent rounded-full w-5 h-5"></span>
                                                    <span className="px-1">wait...</span>
                                                </>
                                            ) : (
                                                <>
                                                    <IoIosAddCircle size={22} />
                                                    <span>{isEditMode ? 'Update' : 'Submit Review'}</span>
                                                </>
                                            )}
                                        </motion.button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>

        </>
    )
}
export default ReviewSection;