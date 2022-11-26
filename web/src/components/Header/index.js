import styles from './Header.module.css';
import { useState } from 'react';
import { useRouter } from 'next/router';

import { FaBars, FaTimes } from 'react-icons/fa';
import { BsFillArrowRightSquareFill } from "react-icons/bs";

import { removeItem } from '../../utils/cookies';

import Link from 'next/link';

export default function Header({ page }) {
  const [sidebar, setSidebar] = useState(false);

  const router = useRouter();

  const handleShowSiderbar = () => {
    setSidebar(true)
  } 

  const handleCloseSidebar = () => {
    if (sidebar) {
        setSidebar(false)
    }
  }

  const handleLogout = () => {
    removeItem('token')
    router.push('/sign-in')
  }

  return (
    <header className={styles.header}>
      <div className={styles.contentLogo}>
        <h1>Chama.<span>bio</span></h1>
      </div>
      <nav className={sidebar ? styles.sideBar : styles.nav}>
        <ul className={styles.ul}>
          <Link href='/'>
            <li className={page === 'home' ? styles.liActive : styles.li}>
              Links
            </li>
          </Link>
        </ul>
        <ul className={styles.ul}>
          <Link href='/preview'>
            <li className={page === 'preview' ? styles.liActive : styles.li}>
              Configurações
            </li>
          </Link>
        </ul>
        <div className={styles.closeSideBar}>
          <FaTimes
            onClick={handleCloseSidebar}
          />
        </div>
        <div className={styles.logout} onClick={handleLogout}>
         <BsFillArrowRightSquareFill 
          fontSize='18px'
          onClick={handleLogout}
         />
         Sair
        </div>
      </nav>
      <div className={styles.menu}>
        <FaBars
          color='black'
          fontSize='24px'
          onClick={handleShowSiderbar}
        />
      </div>
    </header>
  )
}