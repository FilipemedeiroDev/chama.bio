import styles from './Button.module.css'

export default function Button({ text, handleSubmit, style}) {
  return (
    <div>
      <button 
      className={styles.button}
      onClick={handleSubmit}
      style={style}
      >
        {text}
      </button>
    </div>
  )
}