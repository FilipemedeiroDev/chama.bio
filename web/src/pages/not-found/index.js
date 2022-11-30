import styles from './Notfound.module.css';

import Image from 'next/image';
import Link from 'next/link';

import NotFoundImage  from '../../assets/not-found.png';

export default function NotFound() {
  return (
    <div className={styles.container}>
      <Image 
        src={NotFoundImage}
        alt='background Not Found'
      />
      <h1>Página não encontrada</h1>
      <span>Faça o cadastro em nossa plataforma!<br/><Link href='/sign-up'>Clique aqui</Link></span>
    </div>
  )
}