import '../styles/globals.css';

import { useEffect } from 'react';
import { getItem } from '../utils/cookies';
import { useRouter } from 'next/router'

function MyApp({ Component, pageProps }) {

  const router = useRouter();

  useEffect(() => {
    const token = getItem('token')

    if(!token) {
      router.push('/sign-in')
    }
  },[])

  return <Component {...pageProps} />      
}

export default MyApp
