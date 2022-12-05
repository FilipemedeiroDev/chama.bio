import styles from './ContentLink.module.css';
import { useState } from 'react';
import { toast } from "react-toastify";

import api from '../../services/api';

import Input from '../Input';

import { RiDeleteBin5Line } from "react-icons/Ri";
import { MdEdit } from 'react-icons/Md';
import { GiCancel } from 'react-icons/Gi';
import { MdOutlineContentCopy } from 'react-icons/Md'
import useProfile from '../../Hooks/useProfile';


export default function ContentLink({ link }) {
  const { updateLink, deleteLink } = useProfile()
  const [isTitleEditable, setIsTitleEditable] = useState(false);
  const [isDestinationEditable, setIsDestinationEditable] = useState(false);
  const [form, setForm] = useState({
    title: link.title,
    destination: link.destination
  })
  
  function copyLink() {
    const linkToCopy = link.destination

    window.navigator.clipboard
    .writeText(linkToCopy)
    .then(toast.success('Destino opiado com sucesso!'))
  }

  function handleChangeInput(e) {
    setForm({...form, [e.target.name]: e.target.value})
   }

  async function handleDelete(linkId) {
    try {
      await api.delete(`/links/${linkId}`);
      deleteLink(linkId)
     
    } catch (error) {
      console.log(error.message)
      return
    }
  }

  async function handleSubmit() {

    if(!form.title) {
      form.title = link.title
    }

    if(!form.destination) {
      form.destination = link.destination
    }

    try {
      await api.patch(`/links/${link._id}/title`, {
        title: form.title
      })
  

      await api.patch(`/links/${link._id}/destination`, {
        destination: form.destination
      })
      updateLink({
        ...link,
        title: form.title,
        destination: form.destination
      })
      
    } catch (error) {
      toast.error(error.message)
      return
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.contentTitle}>
          <label>
            Titulo 
            {
              !isTitleEditable ? (
                <MdEdit 
                  style={{
                    cursor: 'pointer',
                    marginLeft: '6px'
                  }}
                  onClick={() => setIsTitleEditable(!isTitleEditable)}
                />
              ) : (
                <GiCancel 
                style={{
                  cursor: 'pointer',
                  marginLeft: '6px'
                }}
                onClick={() => setIsTitleEditable(!isTitleEditable)}
                />
              )
            }  
          </label>
          {
            isTitleEditable ? (
              <Input 
                value={form.title}
                name='title'
                style={{
                  height: '12px',
                }}
                handle={handleChangeInput}
                handleBlur={handleSubmit}
              />
            ) : (
              <p>{form.title}</p>  
            )
          }
        </div>

        <div className={styles.contentDestination}>
          <label>
            Destino
            {
              !isDestinationEditable ? (
                <MdEdit 
                  style={{
                    cursor: 'pointer',
                    marginLeft: '6px'
                  }}
                  onClick={() => setIsDestinationEditable(!isDestinationEditable)}
                />
              ) : (
                <GiCancel 
                  style={{
                    cursor: 'pointer',
                    marginLeft: '6px'
                  }}
                  onClick={() => setIsDestinationEditable(!isDestinationEditable)}
                />
              )
            }  
          </label>
          {
            isDestinationEditable ? (
              <Input 
                value={form.destination}
                name='destination'
                style={{
                  height: '12px',
                }}
                handle={handleChangeInput}
                handleBlur={handleSubmit}
              />
            ) : (
              <p>{form.destination}</p>
            )
          }
        </div>

        <div className={styles.deleteIcon}>
            <RiDeleteBin5Line 
              fontSize='22px'
              cursor='pointer'
              onClick={() => handleDelete(link._id)}
            />
        </div>
        <div className={styles.copyIcon}>
          <MdOutlineContentCopy 
             fontSize='20px'
             cursor='pointer'
             onClick={copyLink}
          />
        </div>
      </div>
    </div>
  )
}