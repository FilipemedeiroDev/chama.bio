import styles from '../styles/Home.module.css';
import { useEffect } from 'react';

import withAuth from '../components/withAuth';
import useGlobalContext from '../Hooks/useGlobalContext';
import getFirstName from '../utils/getFirstName';

import { getItem } from '../utils/cookies';
import { toast } from 'react-toastify';

import Sidebar from '../components/Sidebar';
import ContentLink from '../components/ContentLink';

import Link from 'next/link';

function Home() {
  const { links, getLinks, setIsLoading } =  useGlobalContext()

  const firstName = getFirstName();
  const username = getItem('username');

  async function share() {
    let shareData = {
      url: `https://chama.bio/${username}`
    }
    await navigator.share(shareData)
  }

  useEffect(() => {
    getLinks()
    setIsLoading(false)
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

export default withAuth(Home);