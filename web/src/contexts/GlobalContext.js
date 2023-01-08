import { createContext, useState } from 'react';

import api from '../services/api';

const GlobalContext = createContext({});

export function GlobalProvider({ children }) {
    const [isLoading, setIsLoading] = useState(false);
    const [profile, setProfile] = useState({})

    const getProfile = async () => {
        try {
          const response = await api.get('/profiles/me')
          const profile = response.data;
          setProfile(profile)
        } catch (error) {
          console.log(error.message)
          return
        }
      }

    return (
        <GlobalContext.Provider
            value={{
                isLoading,
                setIsLoading,
                getProfile,
                profile
            }}
        >
            {children}
        </GlobalContext.Provider>
    );
}

export default GlobalContext;