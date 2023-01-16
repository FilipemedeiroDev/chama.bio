import { createContext, useState } from 'react';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';

import api from '../services/api';

const GlobalContext = createContext({});

export function GlobalProvider({ children }) {
    const [isLoading, setIsLoading] = useState(false);
    const [profile, setProfile] = useState({});
    const [links, setLinks] = useState([]);
    const [user, setUser ] = useState({});
    
    
    const router = useRouter()

    const getLinks = async () => {
      try {
        const response = await api.get('/links')
        setLinks(response.data)
        
      } catch (error) {
        if(error.response.data.message === 'jwt expired'){
          router.push('/sign-in')
          toast.error('sessão expirada, faça o login novamente!')
        } else {
          console.log(error)
          return
        }
      }
    }

    const getUser = async () => {
      try {
        const response = await api.get('/users/me');
        const user = response.data;
        setUser(user)
      } catch (error) {
        console.log(error.message)
        return
      }
    }

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

      const addLink = (data) => {
        setLinks(prev => [...prev, data])
      }

      const updateLink = (link) => {
        const newLinks = [...links]
        const foundIndex = newLinks.findIndex((item) => item._id === link._id)
        if (foundIndex >= 0) {
          const newLink = {
            ...newLinks[foundIndex],
            ...link
          }
  
          newLinks[foundIndex] = newLink
          setLinks(newLinks)
        }
      }
  
      const deleteLink = (linkId) => {
        setLinks(prev => prev.filter(links => links._id !== linkId))
      }

      const addAvatarUrl = (newAvatarUrl) => {
        setProfile(prev => {
          return {
            ...prev,
            avatarUrl: newAvatarUrl
          }
        })
      }

     
    return (
        <GlobalContext.Provider
            value={{
                isLoading,
                setIsLoading,
                getProfile,
                profile,
                updateLink,
                deleteLink,
                getLinks,
                links,
                addLink,
                addAvatarUrl,
                getUser,
                user,
            }}
        >
            {children}
        </GlobalContext.Provider>
    );
}

export default GlobalContext;