import styles from './Reset.module.css';
import {  useState } from 'react';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';

import api from '../../services/api'

import Image from 'next/image';

import Input from '../../components/Input';
import Button from '../../components/Button';


import IconEyeOpen from '../../assets/icon-eye-open.png';
import IconEyeClosed from '../../assets/icon-eye-closed.png';

export default function Reset() {
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({newPassword: ''});
  const [errorPassword, setErrorPassword] = useState(false);

  const router = useRouter();
  const { code } =  router.query

    
  function handleShowPassword() {
    setShowPassword(!showPassword)
  }

  function handleChangeInput(e) {
    setForm({...form, [e.target.name]: e.target.value})
    setErrorPassword(false)
  }
  
  async function handleSubmit(e) {
    e.preventDefault();
   
    try {
  
      if(form.newPassword === '') {
       setErrorPassword(true)
       return
      }

      if(form.newPassword.length < 6){
        alert('A senha deve ter no mínimo 6 caracteres')
        return
      }
      await api.post(`/users/reset/${code}`, {
        newPassword: form.newPassword.trim()
      })

      router.push('/sign-in')
    } catch (error) {
      console.log(error)
      toast.error(error.response.data.message)
      router.push('sign-in')
      return
    }
  }

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit}>
        <div className={styles.content}>
          <div className={styles.inputContent}>
            <div className={styles.inputPassword}>
              <label>Nova Senha</label>
              <Input 
                type={showPassword ? 'text' : 'password'}
                placeholder='*******'
                name='newPassword'
                value={form.newPassword}
                handleChangeInput={handleChangeInput}
              />
              {errorPassword && <span>Insira a nova senha!</span>}
              <Image 
                  className={styles.iconEye}
                  src={showPassword ? IconEyeOpen : IconEyeClosed} 
                  alt='icone olho'
                  width={20}
                  onClick={handleShowPassword}
               />
            </div>
          </div>
          <Button 
            text='Redefinir senha'
            handleSubmit={handleSubmit}
          />
        </div>
      </form>
    </div>
  )
}