import styles from './Header.module.css';

import { FaBars, FaTimes } from 'react-icons/fa';

import Link from 'next/link';
import { useState } from 'react';

export default function Header({ page }) {
  const [sidebar, setSidebar] = useState(false);

  const handleShowSiderbar = () => {
    setSidebar(true)
  } 

  const handleCloseSidebar = () => {
    if (sidebar) {
        setSidebar(false)
    }
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
          <Link href='/profile'>
            <li className={page === 'profile' ? styles.liActive : styles.li}>
              Configurações
            </li>
          </Link>
        </ul>
        <div className={styles.closeSideBar}>
          <FaTimes
            onClick={handleCloseSidebar}
          />
        </div>
      </nav>
      <div className={styles.menu}>
        <FaBars
          color='black'
          fontSize={'24px'}
          onClick={handleShowSiderbar}
        />
      </div>
    </header>
  )
}