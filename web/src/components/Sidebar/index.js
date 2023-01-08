import styles from './Sidebar.module.css';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import useGlobalContext from '../../Hooks/useGlobalContext';

import { removeItem } from '../../utils/cookies';

import Image from 'next/image';
import Link from 'next/link';

import { BsPersonFill as IconProfile }  from 'react-icons/bs';
import { 
  AiOutlineEye as EyeIcon, 
  AiFillHome as IconHome, 
  AiOutlineMenu as IconMenu, 
  AiOutlineClose as IconClose,
  AiOutlineLogout as Logout
} from 'react-icons/ai';

export default function Sidebar() {
  const { profile, getProfile } = useGlobalContext();
  const [showSidebarMobile, setShowSidebarMobile] = useState(false);

  const router = useRouter();

  function handleShowSidebarMobile() {
    setShowSidebarMobile(!showSidebarMobile)
  }

  function handleLogout() {
    removeItem('token')
    removeItem('name')
    removeItem('userId')
    removeItem('username')
    router.push('/sign-in')
  }
  
  useEffect(() => {
    getProfile()
  }, [])

   return (
    <>
      <aside className={showSidebarMobile ? styles.sidebarMobile : styles.sidebar}>
        <header className={styles.sidebarHeader}>
          <Image 
            className={styles.avatar}
            src={profile.avatarUrl} 
            alt='Avatar' 
            width={35}
            height={35}
            priority
          />
        </header>

        <nav>
          <button>
            <span>
              <IconHome />
              <span>Home</span>
            </span>
          </button>
  
          <button>
            <span>
              <IconProfile />
              <span>Perfil</span>
            </span>
          </button>

          <button>
            <span>
              <EyeIcon />
              <span>Preview</span>
            </span>
          </button>

          <button 
            onClick={handleLogout}
          >
            <span>
              <Logout />
              <span>Sair</span>
            </span>
          </button>
        </nav>
      </aside>

      <button className={styles.menu}
        onClick={handleShowSidebarMobile}
      >
       { showSidebarMobile ? <IconClose /> : <IconMenu /> } 
      </button>
    </>
   )
}