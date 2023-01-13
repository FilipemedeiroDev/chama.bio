import Sidebar from '../../components/Sidebar';

import styles from './Preview.module.css';

export default function Preview() {
    return (
    <>
      <Sidebar 
        page='preview'
      />
      <div className={styles.main}>
        <h1>Preview</h1>
      </div>
    </>
  )
}

export async function getServerSideProps(ctx) {
  const { cookies } = ctx.req
    
    if(!cookies.token) {
        return {
          redirect: {
            destination: '/sign-in',
            permanent: false
          }
        }
      }
      
    return { props: {} }
}

 