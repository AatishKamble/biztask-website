
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

    const navigate=useNavigate();
    //modal style
    const customStyles = {

        content: {


            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            border: "1px solid #eff6ff",
            transform: 'translate(-50%, -50%)',
            width: "500px",
            height: "680px",
            backgroundColor: '#f0f9ff',
            zIndex: '1000'
        },
    };


    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const [errorMessage, setErrorMessage] = useState(null);
    const [confPass, setConfPass] = useState('');//forsignUp
    const dispatch = useDispatch();
    const auth = useSelector(store => store.auth);


    function confPassHandle(e) {
        setConfPass(e.target.value);
    }//for signup

    function handleChange(e) {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });

    }



    const handleFormData = (e) => {
        e.preventDefault();
        if (type == "login") {
            dispatch(login(formData));
            handleButtonClick();
        
        }
        else if (type == "signup") {

            if (formData.password == confPass) {
                dispatch(register(formData));
             
            handleButtonClick();
            }
            else {
                setFormData({
                    email: '',
                    password: ''
                });
                setConfPass('');
            setErrorMessage("Password and confirm Password should be same");
            }
        }

    }


    const handleGoogle = () => {
        window.location.href = `${API_BASE_URL}/auth/google`; // Redirect to Google authentication URL
    };


    return (
        <>
            <Modal
                isOpen={openState}//change
                style={customStyles}
                onRequestClose={() => handleButtonClick()}//change 
            >
                <div className=' bg-inherit w-full h-20 flex text-[35px] font-extrabold justify-center items-center font-serif text-blue-900'>
                    {type == "login" ? <span>Login</span> : <span>Sign Up</span>}

                </div>
                <div className='flex w-full flex-col h-auto justify-center items-center'>
                <span className='text-[18px] font-serif text-slate-600 '>Continue with</span>
                        <div className='mb-4 mt-2 h-16 w-full flex flex-col justify-center items-center pb-5'>

                            <div className=' w-auto px-5 hover:border-[1px] hover:outline-slate-900 cursor-pointer'>
                                <button onClick={handleGoogle} className='flex items-center py-2 text-[24px] font-serif font-semibold'>
                                    <FcGoogle />
                                    <span className='text-[24px] font-serif font-light ps-2 text-slate-600'>Google</span>
                                </button>
                            </div>
                        </div></div>
                <form onSubmit={handleFormData}>
                    <div className=' bg-inherit w-full h-auto my-2 flex justify-center items-center flex-col px-5' style={type === "login" ? { marginTop: "50px" } : {}}>
                        


                        <div className='bg-[#c5c8cd] h-14 w-full flex justify-center items-center text-slate-600 rounded-md' style={type === "login" ? { marginBottom: "10px" } : {}}>
                            <div className='w-[4rem] h-10 bg-inherit flex justify-center items-center text-[24px] '>
                                <MdOutlineMail />
                            </div>
                            <input type="text" name='email' value={formData.email} onChange={handleChange} placeholder='Enter Email' className='w-full p-2 me-4 h-10 text-[20px] align-middle font-sans font-medium outline-none bg-inherit' />
                        </div>


                        <div className='bg-[#c5c8cd] rounded-md mt-5 h-14 w-full flex justify-center items-center text-slate-600'>
                            <div className='w-[4rem] h-10 bg-inherit flex justify-center items-center text-[24px] '>
                                <GoLock />
                            </div>
                            <input type="password" name='password' value={formData.password} onChange={handleChange} placeholder='password' className='w-full p-2 me-4 h-12 text-[20px] align-middle font-sans font-medium outline-none bg-inherit' autoComplete='false' />
                        </div>

                        {type == "signup" && <div className='bg-[#c5c8cd] rounded-md my-5 h-14 w-full flex justify-center items-center text-slate-600'>
                            <div className='w-[4rem] h-10 bg-inherit flex justify-center items-center text-[24px] '>
                                <GoLock />
                            </div>
                            {/* diff */}
                            <input type="password" name='conPass' value={confPass} onChange={confPassHandle} placeholder='Confirm password' className='w-full p-2 me-4 h-12 text-[20px] align-middle font-sans font-medium outline-none bg-inherit' autoComplete='false' />
                        </div>
                        }


                        <div className='bg-blue-900 hover:bg-[#1e52c3] cursor-pointer rounded-sm my-5 h-16 w-full flex justify-center items-center text-slate-100 hover:text-slate-500' style={type === "login" ? { marginTop: "50px" } : {}}>
                            {/* //diff */}
                            <button type='submit' className='text-[24px] font-serif font-semibold'> {type == "login" ? "Login" : "SignUp"}</button>
                        </div>


                        <div className='w-full flex justify-center items-center text-red-700'>
                            {errorMessage && <span id='error'>{errorMessage}</span>}
                        </div>

                        {/* some diff */}
                        <div className=' rounded-sm mt-2 h-14 w-full flex justify-center items-center text-black '>
                            <span className='text-[18px] font-serif font-normal px-2'>{type == "login" ? "New User ?" : "Already have account ?"}</span>
                            <span className='text-[18px]  font-serif font-normal cursor-pointer text-blue-900 underline hover:text-[#1e52c3]' onClick={() => {
                                if (type == "login") {
                                    handleButtonClick();
                                    handleButtonClick2();
                                }
                                else if (type == 'signup') {
                                    handleButtonClick();
                                    handleButtonClick2();
                                }
                                //    change
                            }}>{type === "login" ? "Sign Up" : "Log In"}</span>

                        </div>

                       { 
                        type==="login" &&
                        <div className='flex justify-center items-center'>
                            <span className='text-blue-950 text-[20px]'><RiLockPasswordFill /></span>
                        
                            <span className='text-[18px] cursor-pointer text-blue-900 hover:text-[#1e52c3] font-serif font-normal px-2' onClick={()=>{
                                 handleButtonClick();
                                 navigate("/forgot-password")
                            }}>Forgot Password ?</span>
                 
                        </div>}

                    </div>
                </form>




            </Modal>


        </>
    )
}

export default FormUI