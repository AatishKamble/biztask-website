import Modal from 'react-modal';
import { MdOutlineMail } from "react-icons/md";
import { GoLock } from "react-icons/go";
import { FcGoogle } from "react-icons/fc";

const Login = (props) => {

  const customStyles = {

    content: {
  
  
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
    border:"1px solid #eff6ff",
      transform: 'translate(-50%, -50%)',
      width: "500px",
      height: "700px",
      backgroundColor: '#f0f9ff',
    zIndex: '1000'
    },
  };
  return (
    <>


      <Modal
        isOpen={props.longState}
        style={customStyles}
        onRequestClose={() => props.handleLogInButtonClick()}
      >

        <div className='  w-full h-20 flex text-[35px] font-extrabold justify-center items-center font-serif text-blue-900'>
          <span>Login</span>

        </div>
        <div className='  w-full h-auto my-6 flex justify-center items-center flex-col px-5'>
          <span className='text-[18px] font-serif text-slate-600'>Continue with</span>
          <div className='mb-4 mt-2 h-16 w-full flex flex-col justify-center items-center pb-5'>

            <div className=' w-auto px-5 hover:border-[1px] hover:outline-slate-900 cursor-pointer'>
              <div className='flex items-center py-2 text-[24px] font-serif font-semibold'>
                <FcGoogle />
                <span className='text-[24px] font-serif font-light ps-2 text-slate-600'>Google</span>
              </div>
            </div>
          </div>
          <div className='bg-[#c5c8cd] h-16 w-full flex justify-center items-center text-slate-600 rounded-md'>
            <div className='w-[4rem] h-12 bg-inherit flex justify-center items-center text-[30px] '>
              <MdOutlineMail />
            </div>
            <input type="text" placeholder='Email' className='w-full p-5 me-4 h-12 text-[20px] align-middle font-sans font-medium outline-none bg-inherit' />
          </div>
          <div className='bg-[#c5c8cd] rounded-md my-5 h-16 w-full flex justify-center items-center text-slate-600'>
            <div className='w-[4rem] h-12 bg-inherit flex justify-center items-center text-[30px] '>
              <GoLock />
            </div>
            <input type="password" placeholder='Password' className='w-full p-5 me-4 h-12 text-[20px] align-middle font-sans font-medium outline-none bg-inherit' autoComplete='false' />
          </div>

          <div className='bg-blue-900 hover:bg-[#1e52c3] cursor-pointer rounded-sm my-5 h-16 w-full flex justify-center items-center text-slate-100 hover:text-slate-500'>
            <span className='text-[24px] font-serif font-semibold'>Login</span>
          </div>

          <div className=' rounded-sm mt-5 h-16 w-full flex justify-center items-center text-black '>
            <span className='text-[18px] font-serif font-normal px-2'>New User ?</span>
            <span className='text-[18px]  font-serif font-normal cursor-pointer text-blue-900 underline hover:text-[#1e52c3]' onClick={() => {

              props.handleSignUpButtonClick();
              props.handleLogInButtonClick();
            }}>Sign Up</span>

          </div>
        </div>



      </Modal>


    </>
  )
}

export default Login