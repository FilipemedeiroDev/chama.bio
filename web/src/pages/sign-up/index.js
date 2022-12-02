import styles from './SignUp.module.css';
import { useState } from 'react';
import { toast } from 'react-toastify';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

import  api from '../../services/api'

import Input from '../../components/Input';
import Button from '../../components/Button';
import Logo from '../../components/Logo';

import IconEyeOpen from '../../assets/icon-eye-open.png';
import IconEyeClosed from '../../assets/icon-eye-closed.png'

export default function SignUp() {
  const [form, setForm] =useState({
    name: '',
    email: '',
    password: '',
    username: ''
  });  
  const [errorName, setErrorName] = useState(false);
  const [errorEmail, setErrorEmail] = useState(false);
  const [errorPassword, setErrorPassword] = useState(false);
  const [errorUsername, setErrorUsername] = useState(false);

  const [showPassword, setShowPassword] = useState(false);

  const route = useRouter();

    function handleShowPassword() {
      setShowPassword(!showPassword)
    }

    function handleChangeInput(e) {
      setForm({...form, [e.target.name]: e.target.value.replace(/\s\s+/g, ' ')})

      if(form.name ) {
        setErrorName(false)
      }

      if(form.email ) {
        setErrorEmail(false)
      }

      if(form.password ) {
        setErrorPassword(false)
      }

      if(form.username ) {
        setErrorUsername(false)
      }

    }

    async function handleSubmit(e) {
        e.preventDefault();

        if(!form.name) {
          setErrorName(true)
          return
        }

        if(!form.email) {
          setErrorEmail(true)
          return
        }

        if(!form.password) {
          setErrorPassword(true)
          return
        }

        if(!form.username) {
          setErrorUsername(true)
          return
        }

        try {
          const response = await api.post('/users', {
            name: form.name.trim(),
            email: form.email.trim(),
            password: form.password.trim(),
            username: form.username.trim()
          })

          toast.success(response.data.message)
          route.push('sign-in')
        } catch (error) {
          console.log(error)
          toast.error(error.response.data.message)
          return
        }
    }

    return (
      <div className={styles.container}>
        <Logo />
        <form>
          <div className={styles.content}>
            <h1>Cadastre-se</h1>
            <div className={styles.inputContent}>
              <div>
                <label>Nome</label>
                <Input 
                  type='text'
                  placeholder='Digite seu nome'
                  name='name'
                  value={form.name}
                  handle={handleChangeInput}
                />
                {errorName && <span>O campo nome é obrigatório</span>}
              </div>
              <div>
                <label>E-mail</label>
                <Input 
                  type='email'
                  placeholder='Digite seu e-mail'
                  name='email'
                  value={form.email}
                  handle={handleChangeInput}
                />
                {errorEmail && <span>O campo e-mail é obrigatório</span>}
              </div>
              <div className={styles.inputPassword}>
                <label>Senha</label>
                <Input 
                  type={showPassword ? 'text' : 'password'}
                  placeholder='****'
                  name='password'
                  value={form.password}
                  handle={handleChangeInput}
                />
                {errorPassword && <span>O campo senha é obrigatório</span>}
                <Image 
                  className={styles.iconEye}
                  src={showPassword ? IconEyeOpen : IconEyeClosed} 
                  alt='icone olho'
                  width={20}
                  onClick={handleShowPassword}
                />
              </div>
              <div>
                <label>Username</label>
                <Input 
                  type='text'
                  placeholder='Escolha um nome de usuário'
                  name='username'
                  value={form.username}
                  handle={handleChangeInput}
                />
                {errorUsername && <span>O campo username é obrigatório</span>}
              </div>
            </div>
            <Button 
              text='Cadastrar'
              handle={handleSubmit}
            />
            <div className={styles.spanLink}>
              <span>Já é cadastrado? <Link href={'/sign-in'}>Clique aqui!</Link></span>
            </div>
          </div>
        </form>
      </div>
    )
}