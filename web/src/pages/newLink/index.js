import styles from './NewLink.module.css';
import withAuth from '../../components/withAuth';

import Sidebar from '../../components/Sidebar';

function NewLink() {
    return (
        <>
        <Sidebar
            page='newlink'
        />
        <div className={styles.main}>
            <h1>New Link</h1>  
        </div>
     </>
    )
}

export default withAuth(NewLink)