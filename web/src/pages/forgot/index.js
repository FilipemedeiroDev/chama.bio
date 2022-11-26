import styles from './Forgot.module.css'
import { useState } from 'react';
import { useRouter } from 'next/router';

import api from '../../services/api';

import Input from '../../components/Input';
import Button from '../../components/Button';
import Logo from '../../components/Logo';


export default function Forgot() {
  const [form, setForm] = useState({email: ''});
  const [errorEmail, setErrorEmail] = useState(false);

  const router = useRouter();

  function handleChangeInput(e) {
    setForm({...form, [e.target.name]: e.target.value})
    setErrorEmail(false)
  }

  async function handleSubmit(e) {
      e.preventDefault();

      try {
        if(!form.email) {
          setErrorEmail(true)
          return
        }
        
        await api.post('/users/forgot', {
          email: form.email.trim()
        })

        alert('Email enviado com sucesso')

        router.push('/sign-in')
      } catch (error) {
        alert(error.response.data.message)
        return
      }
  }

  return (
    <div className={styles.container}>
      <Logo />
      <form onSubmit={handleSubmit}>
        <div className={styles.content}> 
          <h1 className={styles.title}>Redefinição de Senha</h1>
            <span>Insira o e-mail cadastrado para receber as instruções de redefinição de senha</span>
            <div className={styles.inputContent}>
              <label>E-mail</label>
              <Input 
                  type='email'
                  placeholder='Digite seu email'
                  name='email'
                  value={form.email}
                  handleChangeInput={handleChangeInput}
              />
              { errorEmail && <span>Insira o e-mail cadastrado</span >} 
            </div>
            <Button 
              text='Enviar email'
              handleSubmit={handleSubmit}
            />
        </div>
      </form>
    </div> 
  )
}