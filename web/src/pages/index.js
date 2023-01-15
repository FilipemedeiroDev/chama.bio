import styles from '../styles/Home.module.css';
import { useEffect } from 'react';

import useGlobalContext from '../Hooks/useGlobalContext';

import { getItem } from '../utils/cookies';
import { toast } from 'react-toastify';

import Sidebar from '../components/Sidebar';
import ContentLink from '../components/ContentLink';

import Link from 'next/link';

export default function Home() {
  const { links, getLinks, getUser } =  useGlobalContext()

  let name = getItem('name')
  name = String(name).split(' ');
  const firstName = name[0];
  const username = getItem('username');

  async function share() {
    let shareData = {
      url: `https://chama.bio/${username}`
    }
    await navigator.share(shareData)
  }

  useEffect(() => {
    getLinks()
    getUser()
  },[])

  return (
    <>
      <Sidebar 
        page='home'
      />
      <main className={styles.main}>   
        <h2>Olá, <span>{firstName}!</span></h2>
        <div className={styles.contentShareLink}>
          <p>Seu link:</p>
          <div className={styles.shareLink}>
            <div className={styles.url}>
              <Link href={`/${username}`} target='_blank'>chama.bio/{username}</Link>
            </div>
            <button onClick={share}>Compartilhar</button>
          </div>
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
      </main>
    </>
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