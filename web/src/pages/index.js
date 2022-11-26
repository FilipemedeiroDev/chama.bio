import styles from '../styles/Home.module.css'

import Header from '../components/Header';
import Button from '../components/Button';
import FormLink from '../components/FormLink';

export default function Home() {
  return (
    <div className={styles.container}>
        <Header 
          page='home'
        />
        <div className={styles.content}>
          <Button 
            text='Criar novo link +'
            style={{
              width: '300px',
              height: '50px'
            }}
          />
          <div className={styles.contentLinks}>
            <FormLink />
          </div>
        </div>
       
    </div>
  )
}
