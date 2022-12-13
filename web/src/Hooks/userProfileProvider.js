import { useState} from "react";
import { toast } from 'react-toastify'
import api from '../services/api';
import { useRouter } from "next/router"; 

function useProfileProvider() {
    const [links, setLinks] = useState([]);
    const [profile, setProfile] = useState({})
    const [isLoading, setIsLoading] = useState(false);
   
    const router = useRouter()

    const getLinks = async () => {
      try {
        const response = await api.get('/links')
        setLinks(response.data)
        
      } catch (error) {
        if(error.response.data.message === 'jwt expired'){
          router.push('/sign-in')
          toast.error('sessão expirada, faça o login novamente!')
          return
        } else {
          console.log(error)
          return
        }
      }
    }
    
    const getProfile = async (setForm) =>{
      try {
        const response = await api.get('/profiles/me')
        const profile = response.data;
        setProfile(profile)
        setForm(prev => {
          return {
            ...prev,
            background_color: profile.background_color,
            background_button_color: profile.background_button_color,
            text_color: profile.text_color,
            description: profile.description,
            button_text_color: profile.button_text_color
          }
        })
      } catch (error) {
        console.log(error.message)
        return
      }
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

    const addLink = (data) => {
      setLinks(prev => [...prev, data])
    }

    const addAvatarUrl = (newAvatarUrl) => {
      setProfile(prev => {
        return {
          ...prev,
          avatarUrl: newAvatarUrl
        }
      })
    }
    
    return {
      links,
      setLinks,
      profile,
      setProfile,
      getLinks,
      getProfile, 
      updateLink,
      deleteLink,
      addLink,
      addAvatarUrl,
      isLoading,
      setIsLoading
    }
}

export default useProfileProvider;