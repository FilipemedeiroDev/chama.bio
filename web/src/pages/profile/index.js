import styles from './Profile.module.css';
import { useEffect, useState, useRef}  from 'react';

import Image from 'next/image';
import Button from '../../components/Button'

import api from '../../services/api';

import BlankImageProfile from '../../assets/blank-image-profile.png';

export default function Profile() {
  const [profile, setProfile] = useState({})
  const [image, setImage] = useState('');
  const [text, setText] = useState('');
  const [form, setForm] = useState({
    description: '',
    background_color:'',
    background_button_color: '',
    text_color: ''
  })
  
  const length = 150 - text.length

  const inputFileRef = useRef(null);

   function handleChangeInput(e) {
    setForm({...form, [e.target.name]: e.target.value})
   }

    async function handleUpload(e) {
      e.preventDefault();

      try {
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
      } catch (error) {
        console.log(error.message)
        return
      }
  
    }

    async function handleSubmit(e) {
        e.preventDefault();

        try {
          await api.post('/profiles/update', {
            description: form.description,
            background_color: form.background_color,
            background_button_color: form.background_button_color,
            text_color: form.text_color
          })
        } catch (error) {
          alert(error.response.data.message)
        return
        }
    }

    const getProfile = async () =>{
      try {
        const response = await api.get('/profiles')
        setProfile(response.data[0])
        
      } catch (error) {
        console.log(error.message)
        return
      }
    }

    useEffect(()=>{
    getProfile()
    },[])

  return (
      <div className={styles.container}>
        <form>
          <div className={styles.content}>
            <div className={styles.contentProfile}>
              <div className={styles.contentUpload}>
                <div className={styles.avatar}>
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
                      onChange={e => setImage(e.target.files[0])}
                    />
                  </div>
                  <button 
                    className={styles.button}
                    type='button'
                    style={{
                     padding: '12px 40px'
                    }}
                    onClick={handleUpload}
                  >
                   Fazer upload
                  </button>
                </div>
              </div>
              <div className={styles.contentForm}>
                <label htmlFor='description'>Descrição</label>
                <textarea 
                  type='text'
                  id='description'
                  name='description'
                  style={{
                    height: '60px',
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
                        value={form.background_color ? form.background_color : '#bdbbc7'}
                        id='inputColor'
                        name='background_color'
                        onChange={handleChangeInput}
                        style={{
                          width: '250px',
                          margin: 0, 
                        }}
                      />
                  </div>   
                  <div className={styles.inputColor}>
                    <label htmlFor='inputColor'>Cor do botão</label>
                    <input 
                      type='color'
                      value={form.background_button_color ? form.background_button_color : '#bdbbc7'}
                      id='inputColor'
                      name='background_button_color'
                      onChange={handleChangeInput}
                      placement='rigth'
                      style={{
                      width: '250px',
                      margin: 0, 
                      }}
                    />
                  </div>
                  <div className={styles.inputColor}>
                    <label htmlFor='inputColor'>Cor do texto</label>
                    <input 
                      type='color'
                      value={form.text_color ? form.text_color : '#bdbbc7'}
                      id='inputColor'
                      name='text_color'
                      onChange={handleChangeInput}
                      style={{
                      width: '250px',
                      margin: 0, 
                      }}
                    />
                  </div>
                </div>
                <Button 
                  text='Salvar'
                  handleSubmit={handleSubmit}
                />
              </div>
           </div>
          </div>
        </form>
      </div>
  )
}

