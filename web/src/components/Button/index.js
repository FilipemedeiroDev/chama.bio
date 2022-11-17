import styles from './Button.module.css'

export default function Button({ text, handleSubmit }) {
  return (
    <div>
      <button 
      className={styles.button}
      onClick={handleSubmit}
      >
        {text}
      </button>
    </div>
  )
}