import { createContext } from 'react';
import useProfileProvider from '../Hooks/userProfileProvider';

const ProfileContext = createContext({});

export function ProfileProvider(props) {
    const profileProiver = useProfileProvider()

    return (
        <ProfileContext.Provider value={profileProiver}>{props.children}</ProfileContext.Provider>
    );
}

export default ProfileContext;