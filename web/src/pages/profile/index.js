import styles from './Profile.module.css';

import Sidebar from '../../components/Sidebar';
import withAuth from '../../components/withAuth';

function Profile() {
    return (
     <>
        <Sidebar 
            page='profile'
        />
        <div className={styles.main}>
            <h1>Profile</h1>  
        </div>
     </>
    )
}

export default withAuth(Profile)