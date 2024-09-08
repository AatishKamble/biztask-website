import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {Provider} from "react-redux";
import App from './App.jsx'
import {store} from "./Redux/store.js";
import './index.css'
import Modal from 'react-modal';
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

Modal.setAppElement('#root');
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>

   
    <App />
    
   
     </Provider>
     <ToastContainer 
     position="top-center"
     autoClose={3000}
     hideProgressBar={false}
     newestOnTop={false}
     closeOnClick
     rtl={false}
     pauseOnFocusLoss
     draggable
     pauseOnHover
     theme="light"
     />
  </StrictMode>,
)
