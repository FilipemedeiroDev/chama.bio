import styles from './Profile.module.css';

import Sidebar from '../../components/Sidebar';

export default function Profile() {
    return (
     <>
        <Sidebar />
        <div className={styles.main}>
            <h1>Profile</h1>  
        </div>
     </>
    )
}