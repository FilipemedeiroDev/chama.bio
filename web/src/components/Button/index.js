import styles from './Button.module.css'

export default function Button({ text, clickFunction, style}) {
  return (
    <div>
      <button 
      className={styles.button}
      onClick={clickFunction}
      style={style}
      >
        {text}
      </button>
    </div>
  )
}