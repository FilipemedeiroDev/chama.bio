import styles from './ChangePassword.module.css';
import { useState } from 'react';
import useGlobalContext from '../../Hooks/useGlobalContext';
import { toast } from 'react-toastify';

import Sidebar from '../../components/Sidebar';
import Input from '../../components/Input';
import Button from '../../components/Button';
import Loading from '../../components/Loading';

import Image from 'next/image';
import IconEyeOpen from '../../assets/icon-eye-open.png';
import IconEyeClosed from '../../assets/icon-eye-closed.png';

import api from '../../services/api';

export default function ChangePassword() {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);

  const { setIsLoading } = useGlobalContext();

  const [form, setForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: ''
  })

  function handleChangeInput(e) {
    setForm({...form, [e.target.name]: e.target.value})
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);

    if(!form.currentPassword || !form.newPassword || !form.confirmNewPassword) {
      setIsLoading(false);
      toast.error('Preencha todos os campos para continuar')
      return
    }

    if(form.newPassword !== form.confirmNewPassword) {
      setIsLoading(false);
      toast.error('As senhas não coincidem.')
    }

    if(form.newPassword.length < 6 || form.confirmNewPassword.length < 6 ) {
      setIsLoading(false);
      toast.error('A senha deve ter no mínimo 6 caracteres')
      return
    }
    try {
      await api.patch('/users/change-password', {
        currentPassword: form.currentPassword.trim(),
        newPassword: form.newPassword.trim()
      })
      
      toast.success('Senha alterada com sucesso!')
      setForm({
        currentPassword: '',
        newPassword: '',
        confirmNewPassword: ''
      })
    } catch (error) {
      setIsLoading(false)
      toast.error(error.response.data.message)
      return
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <Sidebar />
      <div className={styles.main}>
        <h2>Trocar Senha</h2>
        <div className={styles.inputPassword}>
          <label>Senha atual:</label>
          <Input 
            type={showCurrentPassword ? 'text' : 'password'}
            placeholder='****'
            name='currentPassword'
            value={form.currentPassword}
            handle={handleChangeInput}
          />
          <Image 
            className={styles.iconEye}
            src={showCurrentPassword ? IconEyeOpen : IconEyeClosed} 
            alt='icone olho'
            width={20}
            onClick={() => setShowCurrentPassword(!showCurrentPassword)}
          />
        </div>
        <div className={styles.inputPassword}>
          <label>Nova senha:</label>
          <Input 
            type={showNewPassword ? 'text' : 'password'}
            placeholder='****'
            name='newPassword'
            value={form.newPassword}
            handle={handleChangeInput}
          />
                
          <Image 
            className={styles.iconEye}
            src={showNewPassword ? IconEyeOpen : IconEyeClosed} 
            alt='icone olho'
            width={20}
            onClick={() => setShowNewPassword(!showNewPassword)}
          />
        </div>
        <div className={styles.inputPassword}>
          <label>Confirme a nova senha:</label>
          <Input 
            type={showConfirmNewPassword ? 'text' : 'password'}
            placeholder='****'
            name='confirmNewPassword'
            value={form.confirmNewPassword}
            handle={handleChangeInput}
          />
                
          <Image 
            className={styles.iconEye}
            src={showConfirmNewPassword ? IconEyeOpen : IconEyeClosed} 
            alt='icone olho'
            width={20}
            onClick={() => setShowConfirmNewPassword(!showConfirmNewPassword)}
          />
        </div>
        <Button 
          text='Trocar'
          handle={handleSubmit}
        >
          <Loading />
        </Button>
      </div>
    </>
  )
}