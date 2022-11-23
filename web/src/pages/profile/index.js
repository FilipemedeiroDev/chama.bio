import styles from './Profile.module.css';
import { useEffect, useState, useRef}  from 'react';
import { FormEncType } from 'react-router-dom'

import Image from 'next/image';

import api from '../../services/api';

import BlankImageProfile from '../../assets/blank-image-profile.png';

export default function Profile() {
  const [profile, setProfile] = useState({})

  const inputFileRef = useRef(null);

  const getProfile = async () =>{
    const response = await api.get('/profiles')
    setProfile(response.data[0])
  }

  useEffect(()=>{
   getProfile()
  },[])

  return (
      <div className={styles.container}>
        <form onSubmit={handleUpload} encType='multiform/form-data'>
            <div className={styles.content}>
              <Image 
                src={!profile.avatarUrl ? BlankImageProfile : profile.avatarUrl}
                width={160}
                height={160}
                style={{
                  borderRadius: '50%',
                  border: '6px solid var(--green)',          
                }}
                 alt='icon profile'
                 priority
                 />
              
                <div className={styles.contentInputFile}>
                  <label
                    htmlFor='inputFile'
                  >
                    Enviar Avatar
                  </label>
                  <input 
                    type='file'
                    id='inputFile'
                    ref={inputFileRef}
                  />
                </div>
                <button 
                  className={styles.button}
                  type='submit'
                  style={{
                    padding: '12px 40px'
                  }}
                
                >
                  Fazer upload
                </button>
            </div>
        </form>
      </div>
  )
}