import styles from '../styles/Home.module.css'
import { useState, useEffect } from 'react';

import Header from '../components/Header';
import Button from '../components/Button';
import FormLink from '../components/FormLink';

import api from '../services/api';
import Link from 'next/link';

import { RiDeleteBin5Line } from "react-icons/Ri";

export default function Home() {
  const [showFormNewLink, setShowFormNewLink] = useState(false);
  const [links, setLinks] = useState([]);
  const [profile, setProfile] = useState({});


  async function handleDelete(linkId) {
    try {
      await api.delete(`/links/${linkId}`);
      setLinks(prev => prev.filter(link => link._id !== linkId))
    } catch (error) {
      console.log(error.message)
      return
    }
  }

  const getLinks = async () => {
    try {
      const response = await api.get('/links')
      setLinks(response.data)
      
    } catch (error) {
      console.log(error.message)
      return
    }
  }

  const getProfile = async () =>{
    try {
      const response = await api.get('/profiles')
      setProfile(response.data[0])
      
    } catch (error) {
      console.log(error.message)
      return
    }
  }


  useEffect(() => {
    getLinks()
    getProfile()
  },[])


  return (
    <div className={styles.container}>
        <Header 
          page='home'
        />
        <div className={styles.content}>
          <Button 
            text='Criar novo link +'
            style={{
              width: '350px',
              height: '50px'
            }}
            handle={() => setShowFormNewLink(true)}
          />
          {
            showFormNewLink &&
            <div className={styles.contentFormLink}>
              <FormLink 
                setShowFormNewLink={setShowFormNewLink}
                setLinks={setLinks}
              />
            </div>
          }
          <div className={styles.contentH2}>
            <h2 className={styles.h2}>Meus Links</h2>
          </div>
          {
            links.map(link => (
              <div className={styles.contentLink} key={link._id}>
                <div className={styles.link}>
                  <Link href={link.destination} target='_blank'>
                    <Button 
                      text={link.title}
                      style={{
                        width: '300px',
                        borderRadius: '50px',
                        backgroundColor: !profile.background_button_color  ?
                        '#000000' : profile.background_button_color,
                        color: !profile.text_color ?
                        '#00000' : profile.text_color
                      }}
                    />
                  </Link>
                </div>
                <div className={styles.deleteIcon}>
                  <RiDeleteBin5Line 
                    fontSize='24px'
                    cursor='pointer'
                    onClick={() => handleDelete(link._id)}
                  />
                </div>
              </div>
            ))
          }
        </div>
       
    </div>
  )
}
