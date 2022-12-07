import styles from './Button.module.css'

export default function Button({ text, handle, style }) {
  return (
    <button
      className={styles.button}
      onClick={handle}
      style={style}
    >
      {text}
    </button>
  )
}