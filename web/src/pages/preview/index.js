import styles from './Preview.module.css';
import { useEffect, useState } from 'react';
import Link from 'next/link';

import Header from '../../components/Header';
import Button from '../../components/Button';
import ModalProfile from '../../components/ModalProfile';


export default function Preview({ cookies }) {
  const [showModalProfile, setShowModalProfile] = useState(false);

  useEffect(() => {
    // Quando o showModalProfile mudar e for verdadeiro, deve colocar o overflow: hidden no body, e quando for falso, colocar overflow: auto
    const overflow = showModalProfile ? 'hidden' : 'auto';
  }, [showModalProfile]);

  return (
    <div className={styles.container}>
      <Header
        page='preview'
      />
      <div className={styles.content}>
        <Button
          text='Editar página'
          style={{
            maxWidth: '350px',
            marginTop: '120px'
          }}
          handle={() => setShowModalProfile(true)}
        />
        <Link href={`https://agregador-de-links-2w6hsraxu-filipemedeirodev.vercel.app/${cookies.username}`} style={{ marginTop: '20px' }} target='_blank'>Ir para a página</Link>
        {showModalProfile && <ModalProfile setShowModalProfile={setShowModalProfile} />}
        <div className={styles.wrapper}>
          <div className={styles.screen}>
            <iframe
              className={styles.iframe}
              src={`https://agregador-de-links-2w6hsraxu-filipemedeirodev.vercel.app/${cookies.username}`}
              frameborder='0'

            >
            </iframe>
          </div>
        </div>
      </div>
    </div>
  )
}

export async function getServerSideProps(ctx) {
  const { cookies } = ctx.req

  if (!cookies.token) {
    return {
      redirect: {
        destination: '/sign-in',
        permanent: false
      }
    }
  }

  return { props: { cookies } }
}