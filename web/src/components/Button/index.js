import styles from './Button.module.css'
import useProfile from '../../Hooks/useProfile';

export default function Button({ text, handle, style, ...props}) {
  const { isLoadingSignIn } = useProfile();

  return (
    <button
      className={styles.button}
      onClick={handle}
      style={style}
    >
     { isLoadingSignIn ? props.children : text }  
    </button>
  )
}