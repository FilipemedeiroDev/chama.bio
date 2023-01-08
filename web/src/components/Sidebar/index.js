import styles from './Sidebar.module.css';
import { useEffect, useState } from 'react';
import useGlobalContext from '../../Hooks/useGlobalContext';

import Image from 'next/image';
import Link from 'next/link';

import { BsPersonFill as IconProfile }  from 'react-icons/bs';
import { 
  AiOutlineEye as EyeIcon, 
  AiFillHome as IconHome, 
  AiOutlineMenu as IconMenu, 
  AiOutlineClose as IconClose 
} from 'react-icons/ai';

export default function Sidebar() {
  const { profile, getProfile } = useGlobalContext();
  const [showSidebarMobile, setShowSidebarMobile] = useState(false)

  function handleShowSidebarMobile() {
    setShowSidebarMobile(!showSidebarMobile)
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
          <Link href={'/forgot'}>
            <button>
              <span>
                <IconHome />
                <span>Home</span>
              </span>
            </button>
          </Link>

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