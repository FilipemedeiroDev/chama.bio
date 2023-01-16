import '../styles/globals.css';
import 'react-toastify/dist/ReactToastify.css';

import { GlobalProvider } from '../contexts/GlobalContext';
import { ToastContainer } from "react-toastify";


function MyApp({ Component, pageProps}) {
  return (
    <>
      <GlobalProvider>
        <Component {...pageProps} />   
      </GlobalProvider>
      <ToastContainer 
        position="top-right"
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


