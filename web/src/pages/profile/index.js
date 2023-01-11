import styles from './Profile.module.css';
import { useEffect, useState } from 'react';
import useGlobalContext from '../../Hooks/useGlobalContext';

import withAuth from '../../components/withAuth';
import Sidebar from '../../components/Sidebar';
import Input from '../../components/Input';
import Button from '../../components/Button';

import Image from 'next/image';
import Link from 'next/link';
import BlankProfile from '../../assets/blank-image-profile.png';

import api from '../../services/api';

import { MdEdit as IconEdit } from 'react-icons/md';

function Profile() {
    const { profile, addAvatarUrl, getUser, user} = useGlobalContext(); 
    const [form, setForm] = useState({
      username: user.username,
      name: user.name,
      email: user.email,
      description: profile.description,
      background_color: profile.background_color,
      background_button_color: profile.background_button_color,
      text_color: profile.text_color,
      button_text_color: profile.button_text_color
    })

    function handleChangeInput(e) {
      setForm({...form, [e.target.name]: e.target.value})
    }

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

      useEffect(() => {
        getUser()
        
      }, [])

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
              <Input 
                type='text'
                name='username'
                placeholder='chama.bio/'
                value={form.username}
                handle={handleChangeInput}
              />
            </div>

            <div className={styles.contentInput}>
              <label>Nome:</label>
              <Input 
                type='text'
                name="name"
                value={form.name}
                handle={handleChangeInput}
              />
            </div>

            <div className={styles.contentInput}>
              <label>E-mail:</label>
              <Input 
                type='text'
                name='email'
                value={form.email}
                handle={handleChangeInput}
              />
            </div>

            <span>Deseja trocar a senha? <Link href={'/teste'} target='_blank'> clique aqui</Link></span>

            <div className={styles.areaDescription}>
              <label>Descrição:</label>
              <textarea 
                  type='text'
                  placeholder='Escreva uma breve descrição...'
                  id='description'
                  name='description'
                  value={form.description}
                  onChange={handleChangeInput}
                  onKeyDown={(e) => setText(e.target.value)}
                  maxLength='150'
              />
            </div>
            
            <h3>Estilo</h3>
              <div className={styles.contentColor}>
                <label>Cor de fundo:</label>
                <input
                  type='color' 
                  name='background_color'
                  value={form.background_color}
                  onChange={handleChangeInput}
                />
              </div>
              <div className={styles.contentColor}>
                <label>Cor do botão:</label>
                <input
                  type='color' 
                  name='background_button_color'
                  value={form.background_button_color}
                  onChange={handleChangeInput}
                />
              </div>
              <div className={styles.contentColor}>
                <label>Cor do texto:</label>
                <input
                  type='color' 
                  name='text_color'
                  value={form.text_color}
                  onChange={handleChangeInput}
                />
              </div>
              <div className={styles.contentColor}>
                <label>Cor do Texto do botão:</label>
                <input
                  type='color' 
                  name='button_text_color'
                  value={form.button_text_color}
                  onChange={handleChangeInput}
                />
              </div>
          
            <Button
              text='Salvar alterações'
            />
        </div>
     </>
    )
}

export default withAuth(Profile)