import withAuth from '../components/withAuth'
import styles from '../styles/Home.module.css';
import { useEffect } from 'react';
import useGlobalContext from '../Hooks/useGlobalContext';

import Sidebar from '../components/Sidebar';

function Home() {
  // const { getProfile } = useGlobalContext();

  // useEffect(() => {
  //   getProfile()
  // }, [])
  

  return (
    <>
      <Sidebar />
      <main className={styles.main}>   
      
      </main>
    </>
  )
}

export default withAuth(Home)