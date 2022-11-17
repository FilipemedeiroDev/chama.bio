import styles from './SignIn.module.css'
import { useState } from 'react';

import api from '../../services/api';
import { setItem } from '../../utils/cookies';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

import Input from '../../components/Input';
import Button  from '../../components/Button';

import IconEyeOpen from '../../assets/icon-eye-open.png';
import IconEyeClosed from '../../assets/icon-eye-closed.png';

export default function SignIn() {
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({email: '', password: ''});
  const [errorEmail, setErrorEmail] = useState(false);
  const [errorPassword, setErrorPassword] = useState(false);
  
  const router = useRouter();
  
  function handleShowPassword() {
    setShowPassword(!showPassword)
  }

  function handleChangeInput(e) {
    setForm({...form, [e.target.name]: e.target.value})

    if(form.email || form.password) {
      setErrorEmail(false)
      setErrorPassword(false)
    }

  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      if(!form.email) {
        setErrorEmail(true)
        return
      }

      if(!form.password) {
        setErrorPassword(true)
        return
      }

      const response = await api.post('/login',{
        email: form.email.trim(),
        password: form.password.trim()
      })

      const { token, user } = response.data;
      setItem('token', token);
      setItem('userId', user.id);
      setItem('username', user.username)
      
      router.push('/')
    } catch (error) {
       alert(error.response.data.message)
       return
    }
  }

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit}>
        <div className={styles.content}>
          <h1>Faça o Login</h1>
          <div className={styles.inputContent}>
            <div>
              <label>E-mail</label>
              <Input
                type='email'
                placeholder='Digite seu e-mail'
                name='email'
                value={form.email}
                handleChangeInput={handleChangeInput}
              />
              { errorEmail && <span>O campo e-mail é obrigatório</span> }
            </div>
            <div className={styles.inputPassword}>
                <label>Senha</label>
                <Input 
                  type={showPassword ? 'text' : 'password'}
                  placeholder='****'
                  name='password'
                  value={form.password}
                  handleChangeInput={handleChangeInput}
                />
                 { errorPassword && <span>O campo Senha é obrigatório</span> }
                <Image 
                  className={styles.iconEye}
                  src={showPassword ? IconEyeOpen : IconEyeClosed} 
                  alt='icone olho'
                  width={20}
                  onClick={handleShowPassword}
                />
            </div>
          </div> 
          <div className={styles.forgotLink}>
            <Link href={'/forgot'}>Esqueceu sua senha? clique aqui!</Link>
          </div> 
          <Button 
            text='Entrar'
            handleSubmit={handleSubmit}
          />
          <div className={styles.spanLink}>
            <span>Ainda não é cadastrado? <Link href={'/sign-up'}>Clique aqui!</Link></span>
          </div>
        </div>
      </form>
    </div>
  )
}