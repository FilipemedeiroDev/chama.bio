import styles from '../styles/Username.module.css'
import { toast } from "react-toastify";

import Image from "next/image";
import Link from 'next/link';
import api from '../services/api';

import Button from '../components/Button';

import BlankImageProfile from '../assets/blank-image-profile.png'

import { BsFillShareFill } from 'react-icons/bs'

export default function Username({ user, username }) {

  function copyLink() {
    const linkToCopy = `${window.location.href}`

    window.navigator.clipboard
    .writeText(linkToCopy)
    .then(toast.success('Destino copiado para a área de transferência!'))
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
          onClick={copyLink}
        />
      </div>
      <h2
        style={{
          color: user.profile.text_color,
        }}
      >
        {user.profile.profile_title}
      </h2>
      <div 
        className={styles.description}
        style={{
            color: user.profile.text_color,
          }}
        >
          <p>
          {user.profile.description}
          </p>
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
        user,
        username
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
