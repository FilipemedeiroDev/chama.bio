import styles from '../styles/Home.module.css'
import { useRouter } from 'next/router';

import Header from '../components/Header'

import { removeItem } from '../utils/cookies';

export default function Home() {

  const router = useRouter();
  
  function handleLogout() {
    removeItem('token')
    router.push('/sign-in')
  }

  return (
    <div className={styles.container}>
        <Header 
          page='home'
        />
        <h1>Home</h1>
        <button
        onClick={handleLogout}
        >
        Sair
      </button>
    </div>
  )
}
