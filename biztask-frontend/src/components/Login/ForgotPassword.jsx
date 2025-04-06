import React, { useState } from 'react';
import { MdOutlineMail } from "react-icons/md";
import { useDispatch } from 'react-redux';
import { forgotPassword } from "../../Redux/Auth/Action.js";
import { Link } from 'react-router-dom';

const ForgotPassword = () => {
  const [emailInput, setEmailInput] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = { email: emailInput };
    dispatch(forgotPassword(formData));
    setEmailInput("");
  };

  return (
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-md px-4">
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 py-6 px-8 text-center">
          <h2 className="text-3xl font-bold text-white">Forgot Password</h2>
          <p className="text-blue-100 mt-2">
            Enter your email to get a reset link
          </p>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
              <MdOutlineMail className="text-xl" />
            </div>
            <input
              type="email"
              name="email"
              value={emailInput}
              onChange={(e) => setEmailInput(e.target.value)}
              placeholder="Enter your email"
              required
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-gray-700"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-lg transition duration-200 text-lg"
          >
            Send Email
          </button>

          <div className="text-center">
  <Link
    to="/"
    className="inline-flex items-center gap-2 mt-4 bg-gray-100 text-blue-800 hover:bg-blue-100 border border-blue-300 font-semibold py-2 px-6 rounded-full transition-all duration-200 shadow-sm"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.8}
      stroke="currentColor"
      className="w-5 h-5"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 9.75L12 4.5l9 5.25M4.5 10.5V19.5a1.5 1.5 0 001.5 1.5h3v-6h6v6h3a1.5 1.5 0 001.5-1.5V10.5" />
    </svg>
    Go to Home
  </Link>
</div>

        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
