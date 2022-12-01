import styles from './Preview.module.css';
import { useState } from 'react';

import Header from '../../components/Header';
import Button from '../../components/Button';
import ModalProfile from '../../components/ModalProfile';


export default function Preview({ cookies }) {
    const [showModalProfile, setShowModalProfile] = useState(false);
    
    return (
      <div className={styles.container}>
        <Header 
          page='preview'
        />
        <Button 
          text='Editar página'
          style={{
            width: '350px',
            marginTop: '120px'
          }}
          handle={() => setShowModalProfile(true)}
        />
        {showModalProfile && <ModalProfile setShowModalProfile={setShowModalProfile}/>}
          <div className={styles.wrapper}>
            <div className={styles.screen}>
              <iframe 
                className={styles.iframe}
                src={`http://localhost:3000/${cookies.username}`} 
                frameborder='0'
              >
              </iframe>  
            </div>
          </div>
      </div> 
    )
}

export async function getServerSideProps(ctx) {
  const { cookies } = ctx.req
 
  if(!cookies.token) {
    return {
      redirect: {
        destination: '/sign-in',
        permanent: false
      }
    }
  }
  
  return { props: { cookies } }
}