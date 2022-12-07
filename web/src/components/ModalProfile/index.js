import styles from './ModalProfile.module.css';
import { useEffect, useState, useRef}  from 'react';
import { toast } from 'react-toastify';
import useProfile	 from '../../Hooks/useProfile';

import Image from 'next/image';
import Button from '../Button';

import api  from '../../services/api'

import BlankImageProfile from '../../assets/blank-image-profile.png';
import { FaTimes } from 'react-icons/fa';

export default function ModalProfile({ setShowModalProfile }) {
  const { profile, getProfile, addAvatarUrl } = useProfile();
  
  const [text, setText] = useState('');
  const [form, setForm] = useState({
    description: '',
    background_color: '',
    background_button_color: '',
    text_color:'',
    button_text_color: ''
  })
  
  const length = 150 - text.length

  const inputFileRef = useRef(null);

    function handleCloseModal(){
      setShowModalProfile(false)
    }

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

    async function handleSubmit() {
        
        if(!form.background_color) {
          form.background_color = profile.background_color
        }
       
        if(!form.background_button_color) {   
          form.background_button_color = profile.background_button_color
        }
       
        if(!form.text_color) {
          form.text_color = profile.text_color
        }
       
       
        try {

          const { data } = await api.post('/profiles/update', {
            description: form.description.trim(),
            background_color: form.background_color,
            background_button_color: form.background_button_color,
            text_color: form.text_color,
            button_text_color: form.button_text_color
          })

          setForm({...prev => data})
          setShowModalProfile(false)

        } catch (error) {
          toast.error(error.message)
        return
        }
    }


  useEffect(()=>{
    getProfile(setForm)
  },[])

  return (
      <div className={styles.container}>
        <form>
          <div className={styles.content}>
            <div className={styles.closeModal}>
              <FaTimes 
                color='black'
                fontSize={'24px'}
                onClick={handleCloseModal}
              />
            </div>
            <div className={styles.contentProfile}>
              <div className={styles.contentUpload}>
                <div className={styles.avatar}>
                  <Image 
                      src={!profile.avatarUrl ? BlankImageProfile : profile.avatarUrl}
                      fill
                      sizes='(max-width: 1200px) 50vw,'
                      quality={100}
                      style={{
                        borderRadius: '50%',
                        objectFit: 'cover',
                        
                      }}
                      alt='icon profile'
                      priority
                    />
                </div>
                <div className={styles.boxButton}>
                  <div className={styles.inputFile}>
                    <label
                      htmlFor='inputFile'
                    >
                        Escolher Imagem
                    </label>
                    <input 
                      type='file'
                      id='inputFile'
                      ref={inputFileRef}
                      onChange={handleUpload}
                    />
                  </div>
                </div>
              </div>
              <div className={styles.contentForm}>
                <label htmlFor='description'>Descrição</label>
                <textarea 
                  type='text'
                  id='description'
                  name='description'
                  value={form.description}
                  style={{
                    height: '90px',
                    padding: '12px',
                    borderRadius: '10px',
                    resize: 'none',
                  }}
                  maxLength='150'
                  onKeyDown={e => setText(e.target.value)}
                  onChange={handleChangeInput}
                />
                <span>{length} caracteres restantes</span>
                <div className={styles.boxColor}>
                  <div className={styles.inputColor}>
                    <label htmlFor='inputColor'>Cor de fundo</label>
                      <input 
                        type='color'
                        value={form.background_color}
                        id='inputColor'
                        name='background_color'
                        onChange={handleChangeInput}
                        style={{
                          margin: 0, 
                        }}
                        
                      />
                  </div>   
                  <div className={styles.inputColor}>
                    <label htmlFor='inputColor'>Cor do botão</label>
                    <input 
                      type='color'
                      value={form.background_button_color}
                      id='inputColor'
                      name='background_button_color'
                      onChange={handleChangeInput}
                      style={{
                      margin: 0,
                      }}
                    />
                  </div>
                  <div className={styles.inputColor}>
                    <label htmlFor='inputColor'>Cor do texto</label>
                    <input 
                      type='color'
                      value={form.text_color}
                      id='inputColor'
                      name='text_color'
                      onChange={handleChangeInput}
                      style={{
                      margin: 0, 
                      }}
                    />
                  </div>
                  <div className={styles.inputColor}>
                    <label htmlFor='inputColor'>Cor do texto do botão</label>
                    <input 
                      type='color'
                      value={form.button_text_color}
                      id='inputColor'
                      name='button_text_color'
                      onChange={handleChangeInput}
                      style={{
                      margin: 0, 
                      }}
                    />
                  </div>
                </div>
                <Button 
                  text='Salvar'
                  handle={handleSubmit}
                  style={{
                    height: '40px'
                  }}
                />
              </div>
           </div>
          </div>
        </form>
      </div>
  )
}

