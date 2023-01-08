import styles from './Button.module.css'
import useGlobalContext  from '../../Hooks/useGlobalContext';

export default function Button({ text, handle, style, ...props}) {
 const { isLoading } = useGlobalContext();


  return (
    <button
      className={styles.button}
      onClick={handle}
      style={style}
    >
     {isLoading ? props.children : text}  
    </button>
  )
}