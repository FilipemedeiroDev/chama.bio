import styles from './Input.module.css';

export default function Input({ type, placeholder, name, value, handleChangeInput}) {
  return (
    <div>
      <input 
        className={styles.input}
        type={ type }
        placeholder={ placeholder }
        name={name}
        value={value}
        onChange={handleChangeInput}
      />
    </div>
  )
}