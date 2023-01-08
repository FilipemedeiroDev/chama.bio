import withAuth from '../components/withAuth'
import styles from '../styles/Home.module.css'

function Home() {

  return (
    <div className={styles.container}>
      <h1>Logado</h1>
    </div>
  )
}

export default withAuth(Home)