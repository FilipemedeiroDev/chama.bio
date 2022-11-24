import styles from './Input.module.css';

export default function Input({ type, placeholder, name, value, handleChangeInput, style, id}) {
  return (
    <div>
      <input 
        className={styles.input}
        type={ type }
        placeholder={ placeholder }
        name={name}
        value={value}
        onChange={handleChangeInput}
        style={style}
        id={id}
      />
    </div>
  )
}