import styles from './NewLink.module.css';
import { useState  } from 'react';
import { toast } from 'react-toastify';
import withAuth from '../../components/withAuth';
import useGlobalContext from '../../Hooks/useGlobalContext';

import Sidebar from '../../components/Sidebar';
import Input from '../../components/Input';
import Button from '../../components/Button';

import api from '../../services/api';

function NewLink() {
    const { addLink, setIsLoading } = useGlobalContext();

    const [form, setForm] = useState({
        title: '',
        destination: ''
      })

    function handleChangeInput(e) {
        setForm({...form, [e.target.name]: e.target.value})
    }

    async function handleSubmit () {
        setIsLoading(true) 
    
        if(form.title === '' || form.destination === ''){
          toast.error('Preencha todos os campo para continuar')
          setIsLoading(false)
          return
        }
    
        try { 
          const { data } = await api.post('/links', {
            title: form.title.trim(),
            destination: form.destination.trim()
          })

          addLink(data)
          setIsLoading(false)
          setForm({
            title: '',
            destination: ''
          })
          toast.success('Link adicionado com sucesso!')
        } catch (error) {
          setIsLoading(false)
          toast.error(error.message)
          return
        }
      }

    return (
        <>
        <Sidebar
            page='newlink'
        />
        <div className={styles.main}>
            <h2>Criar um novo link +</h2>  
            <div className={styles.contentInput}>
                <label>Título:</label>
                <Input 
                    type='text' 
                    placeholder='Crie um nome para o seu link...' 
                    name='title'
                    value={form.title}
                    onChange={handleChangeInput}/>
            </div>
            <div className={styles.contentInput}>
                <label>Destino:</label>
                <Input 
                    type='text' 
                    placeholder='Digite ou cole aqui sua url...' 
                    name='destination'
                    value={form.destination}
                    onChange={handleChangeInput}/>
            </div>
            <Button 
              text='Criar'
              handle={handleSubmit}
            />
        </div>
     </>
    )
}

export default withAuth(NewLink)