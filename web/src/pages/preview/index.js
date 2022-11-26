import styles from './Preview.module.css';
import { useState } from 'react';

import Header from '../../components/Header';
import Button from '../../components/Button';
import ModalProfile from '../../components/ModalProfile';


export default function Preview() {
    const [showModalProfile, setShowModalProfile] = useState(false);

    const handleCloseModal = () => {
      setShowModalProfile(false)
    }

    return (
      <div className={styles.container}>
        <Header 
          page='preview'
        />
        <Button 
          text='Editar página'
          style={{
            width: '350px',
            marginTop: '120px'
          }}
          clickFunction={() => setShowModalProfile(true)}
        />
        {showModalProfile && <ModalProfile clickFunction={handleCloseModal}/>}
      </div> 
    )
}