import styles from '../styles/Home.module.css'
import { useState, useEffect } from 'react';
import useProfile from '../Hooks/useProfile';

import Header from '../components/Header';
import Button from '../components/Button';
import FormLink from '../components/FormLink';

import ContentLink from '../components/ContentLink';

export default function Home() {
  const { links, getLinks } =  useProfile()
  const [showFormNewLink, setShowFormNewLink] = useState(false);


  useEffect(() => {
    getLinks()
  },[])

  return (
    <div className={styles.container}>
        <Header 
          page='home'
        />
        <div className={styles.content}>
          <Button 
            text='Criar novo link +'
            style={{
              maxWidth: '350px',
              height: '50px'
            }}
            handle={() => setShowFormNewLink(true)}
          />
          {
            showFormNewLink &&
            <FormLink 
              setShowFormNewLink={setShowFormNewLink}
            />
          }
          <div className={styles.contentH2}>
            <h2 className={styles.h2}>Meus Links</h2>
          </div>
          {
            links.map(link => (
              <div className={styles.myLink} key={link._id}>
                <ContentLink 
                  link={link}              
                />
              </div>
            ))
          }
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
    
    return { props: {} }
}