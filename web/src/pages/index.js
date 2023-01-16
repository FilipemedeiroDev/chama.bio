import styles from '../styles/Home.module.css';
import { useEffect } from 'react';
import { toast } from "react-toastify";

import useGlobalContext from '../Hooks/useGlobalContext';

import Sidebar from '../components/Sidebar';
import ContentLink from '../components/ContentLink';

import Link from 'next/link';

export default function Home({ username, cookieName}) {
  const { links, getLinks, getUser, getProfile} =  useGlobalContext()

  let name = cookieName
  name = String(name).split(' ');
  const firstName = name[0];

  function copyLink() {
    const linkToCopy = `${window.location.href}/${username}`

    window.navigator.clipboard
    .writeText(linkToCopy)
    .then(toast.success('Destino copiado para a área de transferência!'))
  }


  useEffect(() => {
    getLinks()
    getUser()
    getProfile()
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
            <button onClick={copyLink}>Compartilhar</button>
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

    return { props: { username: cookies.username, cookieName: cookies.name} }
}