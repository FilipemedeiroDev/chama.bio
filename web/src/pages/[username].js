import styles from '../styles/Username.module.css'

import Image from "next/image";
import Link from 'next/link';
import api from '../services/api';

import Button from '../components/Button';

import BlankImageProfile from '../assets/blank-image-profile.png'

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
            src={!user.profile.avatarUrl ? BlankImageProfile : user.profile.avatarUrl}
            width={150}
            height={150}
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
            color: user.profile.text_color,
            cursor: 'pointer'
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
      <div 
        className={styles.description}
        style={{
            color: user.profile.text_color,
          }}
        >
          <span>
          {user.profile.description}
          </span>
      </div>
      {
        user.links.map(link => (
          <div className={styles.link} key={link._id}>
            <Link  href={link.destination} target='_blank'>
              <Button 
                id='link'
                text={link.title}
                style={{
                  height: '60px',
                  borderRadius: '10px',
                  backgroundColor: user.profile.background_button_color,
                  color: user.profile.button_text_color
                }}
              />
           </Link>
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
      return {
        redirect: {
          destination: '/not-found',
          permanent: false,
        },
      }
    
  }
}
