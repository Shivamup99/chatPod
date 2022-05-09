import {Input } from '@material-ui/core'
import { Add } from '@material-ui/icons'
import React from 'react'

function ModalBox({chatInput,imageUrl, setChatInput, setImageUrl, handleChat}) {
  return (
    <>
    <h3 className='modal-h3'>Add New Chat</h3>
    <Input required className='name-input' type='text' placeholder='Enter New Chat Name'
    value={chatInput == null ? '' : chatInput} onChange={(e)=>setChatInput(e.target.value)} 
    />
    <Input required className='name-input'  type='text' placeholder='Enter Chat Image Url'
     value={imageUrl} onChange={(e)=>setImageUrl(e.target.value)} 
    />
    
    <Add 
    onClick={handleChat}
    style={{fontSize:'38px',cursor:'pointer',color:"white",backgroundColor:'brown',borderRadius:'50%',padding:'8px'}} className='add-icon'/>

  
    </>
  )
}

export default ModalBox