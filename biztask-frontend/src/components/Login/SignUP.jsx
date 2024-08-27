import Modal from 'react-modal';
import { MdOutlineMail } from "react-icons/md";
import { GoLock } from "react-icons/go";
import { FcGoogle } from "react-icons/fc";
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { register,getUserProfile } from '../../Redux/Auth/Action.js';
import { useEffect } from 'react';
const SignUP = ({ signUp, handleSignUpButtonClick, handleLogInButtonClick }) => {
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
            height: "700px",
            backgroundColor: '#f0f9ff',

        },
    }; //modal styling

    //data related logic ans states

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const [confPass, setConfPass] = useState('');

    const dispatch = useDispatch();
    const auth = useSelector(store => store.auth);

    useEffect(()=>{

        if(auth.jwt){
      alert(jwt)
            dispatch(getUserProfile(auth.jwt));
            }
    },[auth.jwt]);


    
    //handle inpput change

    function handleChange(e) {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    }

    function confPassHandle(e) {
        setConfPass(e.target.value);
    }

    //form submit
    const handleForm = (e) => {
        e.preventDefault();

        if(formData.password==confPass){
           dispatch(register(formData));
        }
        else{
           setFormData({
            email: '',
            password: ''
        });
        setConfPass('');

        document.getElementById('error').innerHTML="Password and confirm password should be same";

        }

    }











    return (
        <>


            <Modal
                isOpen={signUp}
                style={customStyles}
                onRequestClose={() => handleSignUpButtonClick()}
            >

                <div className=' bg-inherit w-full h-20 flex text-[35px] font-extrabold justify-center items-center font-serif text-blue-900'>
                    <span>Sign Up</span>

                </div>
                <form onSubmit={handleForm}>
                    <div className=' bg-inherit w-full h-auto my-2 flex justify-center items-center flex-col px-5'>
                        <span className='text-[18px] font-serif text-slate-600'>Continue with</span>
                        <div className='mb-4 mt-2 h-16 w-full flex flex-col justify-center items-center pb-5'>

                            <div className=' w-auto px-5 hover:border-[1px] hover:outline-slate-900 cursor-pointer'>
                                <div className='flex items-center py-2 text-[24px] font-serif font-semibold'>
                                    <FcGoogle />
                                    <span className='text-[24px] font-serif font-light ps-2 text-slate-600'>Google</span>
                                </div>
                            </div>
                        </div>


                        <div className='bg-[#c5c8cd] h-14 w-full flex justify-center items-center text-slate-600 rounded-md'>
                            <div className='w-[4rem] h-10 bg-inherit flex justify-center items-center text-[24px] '>
                                <MdOutlineMail />
                            </div>
                            <input type="text" name='email' value={formData.email} onChange={handleChange} placeholder='Enter Email' className='w-full p-2 me-4 h-10 text-[20px] align-middle font-sans font-medium outline-none bg-inherit' />
                        </div>
                        <div className='bg-[#c5c8cd] rounded-md mt-5 h-14 w-full flex justify-center items-center text-slate-600'>
                            <div className='w-[4rem] h-10 bg-inherit flex justify-center items-center text-[24px] '>
                                <GoLock />
                            </div>
                            <input type="password" name='password' value={formData.password} onChange={handleChange} placeholder='Create password' className='w-full p-2 me-4 h-12 text-[20px] align-middle font-sans font-medium outline-none bg-inherit' autoComplete='false' />
                        </div>
                        <div className='bg-[#c5c8cd] rounded-md my-5 h-14 w-full flex justify-center items-center text-slate-600'>
                            <div className='w-[4rem] h-10 bg-inherit flex justify-center items-center text-[24px] '>
                                <GoLock />
                            </div>
                            <input type="password" name='conPass' value={confPass} onChange={confPassHandle} placeholder='Confirm password' className='w-full p-2 me-4 h-12 text-[20px] align-middle font-sans font-medium outline-none bg-inherit' autoComplete='false' />
                        </div>

                        <div className='bg-blue-900 hover:bg-[#1e52c3] cursor-pointer rounded-sm my-5 h-16 w-full flex justify-center items-center text-slate-100 hover:text-slate-500'>
                            <button type='submit' className='text-[24px] font-serif font-semibold'>Sign Up</button>
                        </div>
                        <div className='w-full flex justify-center items-center text-red-700'>
                            <span id='error'></span>
                        </div>

                        <div className=' rounded-sm mt-2 h-14 w-full flex justify-center items-center text-black '>
                            <span className='text-[18px] font-serif font-normal px-2'>Already have account ?</span>
                            <span className='text-[18px]  font-serif font-normal cursor-pointer text-blue-900 underline hover:text-[#1e52c3]' onClick={() => {
                                handleLogInButtonClick();
                                handleSignUpButtonClick();
                            }}>Log In</span>

                        </div>

                    </div>
                    </form>


            </Modal >


        </>
    )
}

export default SignUP