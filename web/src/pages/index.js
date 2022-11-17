import styles from '../styles/Home.module.css'
import { useEffect } from 'react';
import { useRouter } from 'next/router';

import { getItem, removeItem } from '../utils/cookies';


export default function Home() {

  const router = useRouter()

  useEffect(() => {
    const token = getItem('token')
    
    if(!token) {
      router.push('/sign-in')
    }
  },[])

  function handleLogout() {
    removeItem('token')
    router.push('/sign-in')
  }

  return (
    <div className={styles.container}>
        <h1>Home</h1>
        <button
        onClick={handleLogout}
        >
        Sair
      </button>
    </div>
  )
}
