import Sidebar from '../../components/Sidebar';

import styles from './Preview.module.css';

export default function Preview({ username }) {

    const baseUrl = process.env.NEXT_PUBLIC_APP_HOST;

    return (
    <>
      <Sidebar 
        page='preview'
      />
      <div className={styles.main}>
        <iframe src={`${baseUrl}/${username}`}>

        </iframe>
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
      
    return { props: { username: cookies.username} }
}

 