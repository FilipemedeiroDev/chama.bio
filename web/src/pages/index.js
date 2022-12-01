import styles from '../styles/Home.module.css'
import { useState, useEffect } from 'react';

import Header from '../components/Header';
import Button from '../components/Button';
import FormLink from '../components/FormLink';

import api from '../services/api';

import ContentLink from '../components/ContentLink';

export default function Home() {
  const [showFormNewLink, setShowFormNewLink] = useState(false);
  const [links, setLinks] = useState([]);
  
  const getLinks = async () => {
    try {
      const response = await api.get('/links')
      setLinks(response.data)
      
    } catch (error) {
      console.log(error.message)
      return
    }
  }

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
              width: '350px',
              height: '50px'
            }}
            handle={() => setShowFormNewLink(true)}
          />
          {
            showFormNewLink &&
            <div className={styles.contentFormLink}>
              <FormLink 
                setShowFormNewLink={setShowFormNewLink}
                setLinks={setLinks}
              />
            </div>
          }
          <div className={styles.contentH2}>
            <h2 className={styles.h2}>Meus Links</h2>
          </div>
          {
            links.map(link => (
              <div className={styles.myLink} key={link._id}>
                <ContentLink 
                  link={link}
                  setLinks={setLinks}                
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