import styles from './Profile.module.css';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import useGlobalContext from '../../Hooks/useGlobalContext';

import Sidebar from '../../components/Sidebar';
import Input from '../../components/Input';
import Button from '../../components/Button';
import Loading from '../../components/Loading';

import Image from 'next/image';
import Link from 'next/link';
import BlankProfile from '../../assets/blank-image-profile.png';

import api from '../../services/api';

import { MdEdit as IconEdit } from 'react-icons/md';

export default function Profile() {
    const { profile, addAvatarUrl, user, getUser , setIsLoading } = useGlobalContext(); 
    const [formUSer, setFormUser] = useState({
      username: user.username,
      name: user.name,
      email: user.email,
    })
    const [formProfile, setFormProfile] = useState({
      description: profile.description,
      background_color: profile.background_color,
      background_button_color: profile.background_button_color,
      text_color: profile.text_color,
      button_text_color: profile.button_text_color
    })

    
    function handleChangeInput(e) {
      setFormUser({...formUSer, [e.target.name]: e.target.value})
      setFormProfile({...formProfile, [e.target.name]: e.target.value})
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
          return
        }
      }

      async function handleSubmit(e) {
        e.preventDefault();
        setIsLoading(true);

        if(!formUSer.name) {
          formUSer.name = user.name
        }

        if(!formUSer.email) {
          formUSer.email = user.email
        }

         if(!formUSer.username) {
          formUSer.username = user.username
        }

        if(!formProfile.description) {
          formProfile.description = profile.description
        }

        if(!formProfile.background_color) {
          formProfile.background_color = profile.background_color
        }
       
        if(!formProfile.background_button_color) {   
          formProfile.background_button_color = profile.background_button_color
        }
       
        if(!formProfile.text_color) {
          formProfile.text_color = profile.text_color
        }
     
        try {
          if(formUSer.username !== user.username) {
            const { data: userUpdated } = await api.put('/users/edit', {
              name: formUSer.name.trim(),
              email: formUSer.email.trim(),
              username: formUSer.username.trim()
            })  
            setFormUser({...prev => userUpdated})
          }
        } catch (error) {
          setIsLoading(false);
          console.log(error.message)
          toast.error(error.response.data.message)
          return
        } finally {
          setIsLoading(false);
        }

        try {
          const { data: profileUpdated } = await api.post('/profiles/update', {
            description: formProfile.description.trim(),
            background_color: formProfile.background_color,
            background_button_color: formProfile.background_button_color,
            text_color: formProfile.text_color,
            button_text_color: formProfile.button_text_color
          })
          setFormProfile({...prev => profileUpdated})
          setIsLoading(false);
        } catch (error) {
          setIsLoading(false)
          console.log(error.message)
          return
        } finally {
          setIsLoading(false)
        }
        
        toast.success('Alterações salvas com sucesso!')
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
                value={formUSer.username}
                handle={handleChangeInput}
              />
            </div>

            <div className={styles.contentInput}>
              <label>Nome:</label>
              <Input 
                type='text'
                name='name'
                value={formUSer.name}
                handle={handleChangeInput}
              />
            </div>

            <div className={styles.contentInput}>
              <label>E-mail:</label>
              <Input 
                type='text'
                name='email'
                value={formUSer.email}
                handle={handleChangeInput}
              />
            </div>

            <span>Deseja trocar a senha? <Link href={'/changePassword'}> clique aqui</Link></span>

            <div className={styles.areaDescription}>
              <label>Descrição:</label>
              <textarea 
                  type='text'
                  placeholder='Escreva uma breve descrição...'
                  name='description'
                  value={formProfile.description}
                  onChange={handleChangeInput}
                  maxLength='150'
              />
            </div>
            
            <h3>Estilo</h3>
              <div className={styles.contentColor}>
                <label>Cor de fundo:</label>
                <input
                  type='color' 
                  name='background_color'
                  value={formProfile.background_color}
                  onChange={handleChangeInput}
                />
              </div>
              <div className={styles.contentColor}>
                <label>Cor do botão:</label>
                <input
                  type='color' 
                  name='background_button_color'
                  value={formProfile.background_button_color}
                  onChange={handleChangeInput}
                />
              </div>
              <div className={styles.contentColor}>
                <label>Cor do texto:</label>
                <input
                  type='color' 
                  name='text_color'
                  value={formProfile.text_color}
                  onChange={handleChangeInput}
                />
              </div>
              <div className={styles.contentColor}>
                <label>Cor do Texto do botão:</label>
                <input
                  type='color' 
                  name='button_text_color'
                  value={formProfile.button_text_color}
                  onChange={handleChangeInput}
                />
              </div>
          
            <Button
              text='Salvar alterações'
              handle={handleSubmit}
              style={{
                marginBottom: '20px'
              }}
            >
              <Loading />
            </Button>
        </div>
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

      
    return { props: { } }
}