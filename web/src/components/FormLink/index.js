import Button from '../Button';
import styles from './FormLink.module.css';
import { useState } from 'react';
import { toast } from 'react-toastify';

import { FaTimes } from 'react-icons/fa';

import Loading from '../Loading';

import api from '../../services/api';
import useProfile from '../../Hooks/useProfile';

export default function FormLink({ setShowFormNewLink }) {
  const { addLink, setIsLoading } = useProfile()
  const [errorFormLink, setErrorFormLink] = useState(false)
  const [form, setForm] = useState({
    title: '',
    destination: ''
  })

  const handleCloseModal = () => {
    setShowFormNewLink(false)
  }

  function handleChangeInput(e) {
    setForm({...form, [e.target.name]: e.target.value})
    setErrorFormLink(false)
  }

  async function handleSubmit () {
    setIsLoading(true) 

    if(form.title === '' || form.destination === ''){
      setErrorFormLink(true)
      setIsLoading(false)
      return
    }

    try { 
      const { data } = await api.post('/links', {
        title: form.title.trim(),
        destination: form.destination.trim()
      })
      addLink(data)
      setShowFormNewLink(false);
      setIsLoading(false)
    } catch (error) {
      setIsLoading(false)
      toast.error(error.message)
      return
    }
  }

 
  return (
    <div className={styles.contentFormLink}>
      <div 
      className={styles.closeButton} 
      >
      <FaTimes 
        onClick={handleCloseModal}
        
      />
      </div>
      <form className={styles.formLink}>
        <div className={styles.input}>
          <label htmlFor='inputTitle'>Titulo</label>
          <input 
            id='inputTitle'
            name='title'
            value={form.title}
            onChange={handleChangeInput}
          />
        </div>
        <div className={styles.input}>
          <label htmlFor='inputDestination'>Destino</label>
          <input 
            id='inputDestination'
            name='destination'
            value={form.destination}
            onChange={handleChangeInput}
          />
        </div>
      </form>
      <Button className={styles.button}
        text='Salvar'
        handle={handleSubmit}
      >
        <Loading />
      </Button>
  
      {errorFormLink && <span>Preencha todos os campos para criar um novo link</span>}
    </div>
  )
}