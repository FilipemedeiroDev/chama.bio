import styles from './Input.module.css';

export default function Input({ type, placeholder, name, value, handle, style, id, handleBlur}) {
  return (
    <div>
      <input 
        className={styles.input}
        type={ type }
        placeholder={ placeholder }
        name={name}
        value={value}
        onChange={handle}
        onBlur={handleBlur}
        style={style}
        id={id}
      />
    </div>
  )
}