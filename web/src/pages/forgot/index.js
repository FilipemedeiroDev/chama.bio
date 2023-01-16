import styles from './Forgot.module.css'
import { useState } from 'react';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import useGlobalContext from '../../Hooks/useGlobalContext';

import api from '../../services/api';

import Input from '../../components/Input';
import Button from '../../components/Button';
import Logo from '../../components/Logo';
import Loading from '../../components/Loading';

import Link from 'next/link';


export default function Forgot() {
  const [form, setForm] = useState({email: ''});
  const [errorEmail, setErrorEmail] = useState(false);

  const { setIsLoading } = useGlobalContext();

  const router= useRouter();


  function handleChangeInput(e) {
    setForm({...form, [e.target.name]: e.target.value})
    setErrorEmail(false)
  }

  async function handleSubmit(e) {
      e.preventDefault();
      setIsLoading(true)

      try {
        if(!form.email) {
          setErrorEmail(true)
          setIsLoading(false)
          return
        }
        
        await api.post('/users/forgot', {
          email: form.email.trim()
        })

        toast.success('Email enviado com sucesso')

        router.push('/sign-in')
        setIsLoading(false)
      } catch (error) {
        setIsLoading(false)
        toast.error(error.response.data.message)
        return
      } finally {
        setIsLoading(false)
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
                  handle={handleChangeInput}
              />
              { errorEmail && <span>Insira o e-mail cadastrado</span >} 
            </div>
            <Button 
              text='Enviar email'
              handleSubmit={handleSubmit}
            >
              <Loading />
            </Button>
          <div className={styles.Link}>
            <Link href={'/sign-in'}>Voltar para o Login</Link>
          </div> 
        </div>
      </form>
    </div> 
  )
}