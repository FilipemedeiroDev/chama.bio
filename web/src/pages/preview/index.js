import Sidebar from '../../components/Sidebar';
import styles from './Preview.module.css';

export default function Preview() {
    return (
    <>
      <Sidebar />
      <div className={styles.main}>
        <h1>Preview</h1>
      </div>
    </>
  )
}