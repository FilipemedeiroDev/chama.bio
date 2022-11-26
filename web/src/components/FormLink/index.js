import styles from './FormLink.module.css';

export default function FormLink() {
  return (
    <div className={styles.contentFormLink}>
      <form className={styles.formLink}>
        <div className={styles.input}>
          <label>Titulo</label>
          <input />
        </div>
        <div className={styles.input}>
          <label>Url</label>
          <input />
        </div>
      </form>
    </div>
  )
}