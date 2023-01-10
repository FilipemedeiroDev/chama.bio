import styles from './Profile.module.css';
import useGlobalContext from '../../Hooks/useGlobalContext';

import withAuth from '../../components/withAuth';
import Sidebar from '../../components/Sidebar';
import Input from '../../components/Input';

import Image from 'next/image';
import Link from 'next/link';
import BlankProfile from '../../assets/blank-image-profile.png';

import api from '../../services/api';

import { MdEdit as IconEdit } from 'react-icons/md';

function Profile() {
    const { profile, addAvatarUrl} = useGlobalContext();

    async function handleUpload(e) {
        e.preventDefault();
        const image = e.target.files[0];
  
        try {
          const formData = new FormData();
          formData.append('avatar', image, image.name)
          
          const { data } = await api.patch('/profiles/avatar', formData, {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            }
          })
          
          addAvatarUrl(data.avatarUrl)
        } catch (error) {
          console.log(error.message)
        }
      }

    return (
     <>
        <Sidebar 
            page='profile'
        />
        <div className={styles.main}>
            <h2>Editar</h2>
            <div className={styles.avatar}>
                <Image 
                    src={profile.avatarUrl ? profile.avatarUrl : BlankProfile} 
                    alt='Avatar' 
                    width={100}
                    height={100}
                    priority
                />
                <div className={styles.editIcon}>
                    <label htmlFor='inputFile'>
                        <IconEdit />
                    </label>
                    <input 
                        type='file' 
                        accept="image/png, image/jpeg, image/jpg, image/webp"  
                        id='inputFile' 
                        onChange={handleUpload}
                    />
                </div>
            </div>
            <small>{!profile.avatarUrl ? 'Adicione sua foto de perfil' : 'Troque sua foto de perfil'}</small>

            <div className={styles.contentInput}>
              <label>Username:</label>
              <Input />
            </div>

            <div className={styles.contentInput}>
              <label>Nome:</label>
              <Input />
            </div>

            <div className={styles.contentInput}>
              <label>Email:</label>
              <Input />
            </div>

            <span>Deseja trocar a senha? <Link href={'/teste'} target='_blank'> clique aqui</Link></span>

            <div className={styles.areaDescription}>
              <label>Descrição:</label>
              <textarea 
                  type='text'
                  id='description'
                  name='description'
              />
            </div>
        </div>
     </>
    )
}

export default withAuth(Profile)