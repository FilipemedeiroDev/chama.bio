import styles from './Loading.module.css';

import { FaSpinner } from 'react-icons/fa';

export default function Loading() {
    return (
        <FaSpinner 
            className={styles.spinner}   
       />
    )
}