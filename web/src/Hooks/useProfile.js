import { useContext } from 'react';
import ProfileContext from '../contexts/ProfileContext';

function useProfile() {
    return useContext(ProfileContext)
}

export default useProfile;
