import Sidebar from '../../components/Sidebar';
import withAuth from '../../components/withAuth';
import styles from './Preview.module.css';

function Preview() {
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

 export default withAuth(Preview)