import styles from '../styles/Username.module.css'

import Image from "next/image";
import Link from 'next/link';
import api from '../services/api';

import Button from '../components/Button';

import { BsFillShareFill } from 'react-icons/Bs'

export default function Username({ user }) {

  async function share() {
    let shareData = {
      url: window.location.href
    }
    await navigator.share(shareData)
  }

  return (
    <div className={styles.container}
      style={{
        backgroundColor: user.profile.background_color
      }}
    >
      <div className={styles.avatar}>
        <Image 
            src={user.profile.avatarUrl}
            width={190}
            height={190}
            quality={100}
            alt='avatar'  
            priority
            style={{
              border: `6px solid ${user.profile.text_color}` ,
              borderRadius: '50%',
              objectFit: 'cover'
            }}
        />  
        <BsFillShareFill 
          style={{
            position: 'absolute',
            right:'-20px',
            color: user.profile.text_color
          }}
          fontSize='24px'
          onClick={share}
        />
      </div>
      <h2
      style={{
        color: user.profile.text_color
      }}
      >{user.name}</h2>
      <div className={styles.description}>
        <p
        style={{
          color: user.profile.text_color,
          wordBreak: 'break-all',
          padding: 'auto'
        }}
        >
          {user.profile.description}
        </p>
      </div>
      {
        user.links.map(link => (
        <div className={styles.contentLink} key={link._id}>
         <div className={styles.link}>
           <Link href={link.destination} target='_blank'>
             <Button 
               text={link.title}
               style={{
                 width: '300px',
                 borderRadius: '10px',
                 backgroundColor: user.profile.background_button_color,
                 color: user.profile.button_text_color
               }}
             />
           </Link>
         </div>
       </div>

        ))
      }
    </div>
  )
}

export async function getServerSideProps(ctx) {
  const { username } = ctx.query;
  try {
    const { data: user } = await api.get(`/profiles/${username}`)

    return {
      props: {
        user
      }
    }
  } catch (error) {
    if (error) {
      return {
        redirect: {
          destination: '/not-found',
          permanent: false,
        },
      }
    }
  }
}
