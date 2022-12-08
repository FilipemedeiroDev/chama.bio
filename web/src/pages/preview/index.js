import styles from './Preview.module.css';
import useProfile from '../../Hooks/useProfile';
import { useState} from 'react';

import Link from 'next/link';

import Header from '../../components/Header';
import Button from '../../components/Button';
import ModalProfile from '../../components/ModalProfile';

export default function Preview({ cookies }) {
  const [showModalProfile, setShowModalProfile] = useState(false);

  const previewUrl = `${process.env.NEXT_PUBLIC_APP_HOST}/${cookies.username}`;
  
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
        <Link href={previewUrl} style={{ marginTop: '20px' }} target='_blank'>Ir para a página</Link>
        {showModalProfile && <ModalProfile setShowModalProfile={setShowModalProfile} />}
        <div className={styles.wrapper}>
          <div className={styles.screen}>
              <iframe
                className={styles.iframe}
                src={previewUrl}
                frameBorder='0'
                id="iframe"
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