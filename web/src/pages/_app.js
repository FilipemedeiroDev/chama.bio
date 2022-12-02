import '../styles/globals.css';
import 'react-toastify/dist/ReactToastify.css';

import { ToastContainer } from "react-toastify";

function MyApp({ Component, pageProps }) {
  
  return (
    <>
    <Component {...pageProps} />   
    <ToastContainer 
       position="top-center"
       autoClose={8000}
       hideProgressBar={false}
       newestOnTop={false}
       draggable={false}
       pauseOnVisibilityChange
       closeOnClick
       pauseOnHover
    /> 
    </>
  ) 
}


export default MyApp

