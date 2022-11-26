import Button from '../Button';
import styles from './FormLink.module.css';
import { useState } from 'react';

import { FaTimes } from 'react-icons/fa';

import api from '../../services/api';

export default function FormLink({ clickFunction}) {
  const [form, setForm] = useState({
    title: '',
    destination: ''
  })

  function handleChangeInput(e) {
    setForm({...form, [e.target.name]: e.target.value})

  }

  async function handleSubmit () {
    try { 
      const { data } = await api.post('/links', {
        title: form.title.trim(),
        destination: form.destination.trim()
      })
      clickFunction(data)
    } catch (error) {
      alert(error.response.data.message)
      return
    }
  }

  return (
    <div className={styles.contentFormLink}>
      <div 
      className={styles.closeButton} 
      onClick={clickFunction}
      >
      <FaTimes />
      </div>
      <form className={styles.formLink} onSubmit={handleSubmit}>
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
      <Button 
        text='Salvar'
        clickFunction={handleSubmit}
      />
    </div>
  )
}