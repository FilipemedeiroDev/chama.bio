import styles from './Profile.module.css';
import { useEffect, useState, useRef}  from 'react';


import Image from 'next/image';

import api from '../../services/api';

import BlankImageProfile from '../../assets/blank-image-profile.png';

export default function Profile() {
  const [profile, setProfile] = useState({})
  const [image, setImage] = useState('');

  const inputFileRef = useRef(null);

  async function handleUpload(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append('avatar', image, image.name)
    
    const { data }= await api.patch('/profiles/avatar', formData, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })

    setProfile(prev => {
      return {
        ...prev,
        avatarUrl: data.avatarUrl
      }
    })
  }

  const getProfile = async () =>{
    const response = await api.get('/profiles')
    setProfile(response.data[0])
  }

  useEffect(()=>{
   getProfile()
  },[])

  return (
      <div className={styles.container}>
        <form onSubmit={handleUpload}>
            <div className={styles.content}>
              <div className={styles.contentImage}>
                <Image 
                  src={!profile.avatarUrl ? BlankImageProfile : profile.avatarUrl}
                  fill
                  objectFit='cover'
                  style={{
                    borderRadius: '50%',
                    border: '6px solid var(--green)',
                    
                  }}
                  alt='icon profile'
                  priority
                  />
              </div>
              
                <div className={styles.contentInputFile}>
                  <label
                    htmlFor='inputFile'
                  >
                    Escolher Imagem
                  </label>
                  <input 
                    type='file'
                    id='inputFile'
                    ref={inputFileRef}
                    onChange={e => setImage(e.target.files[0])}
                  />
                </div>
                <button 
                  className={styles.button}
                  type='submit'
                  style={{
                    padding: '12px 40px'
                  }}
                >
                  Salvar
                </button>
            </div>
        </form>
      </div>
  )
}

