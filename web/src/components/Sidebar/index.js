import styles from './Sidebar.module.css';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import useGlobalContext from '../../Hooks/useGlobalContext';

import { removeItem } from '../../utils/cookies';

import Image from 'next/image';
import Link from 'next/link';

import BlankProfile from '../../assets/blank-image-profile.png';

import { BsPersonFill as IconProfile }  from 'react-icons/bs';
import { 
  AiOutlineEye as EyeIcon, 
  AiFillHome as IconHome, 
  AiOutlineMenu as IconMenu, 
  AiOutlineClose as IconClose,
  AiOutlineLogout as Logout,
  AiOutlineLink as IconLink
} from 'react-icons/ai';

export default function Sidebar({ page }) {
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
            src={profile.avatarUrl ? profile.avatarUrl : BlankProfile} 
            alt='Avatar' 
            width={35}
            height={35}
            priority
          />
        </header>

        <nav>
        <Link href={'/'}>
          <button>
            <span style={{
            background: page === 'home' && 'whitesmoke'
            }}>
              <IconHome />
              <span>Home</span>
            </span>
          </button>
        </Link>

        <Link href={'/newLink'}>
          <button>
            <span style={{
            background: page === 'newlink' && 'whitesmoke'
            }}>
              <IconLink />
              <span>Link +</span>
            </span>
          </button>
        </Link>

        <Link href='/profile'>
          <button>
            <span style={{
            background: page === 'profile' && 'whitesmoke'
            }}>
              <IconProfile />
              <span>Perfil</span>
            </span>
          </button>
        </Link>
        
        <Link href='/preview'>
          <button>
            <span style={{
            background: page === 'preview' && 'whitesmoke'
            }}>
              <EyeIcon />
              <span>Preview</span>
            </span>
          </button>
        </Link>

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