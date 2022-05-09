import React, { useEffect, useState } from 'react'
import '../css/sidebar.css'
import {Avatar} from '@material-ui/core'
import {Search , Add, SpeakerNotes} from '@material-ui/icons'
import SidebarChat from './SidebarChat'
import { useSelector } from 'react-redux'
import { selectUser } from '../../redux/userReducer'
import db, { auth } from '../../firebase'
import Modal from 'react-modal'
import ModalBox from '../chat/ModalBox'
import firebase from 'firebase/compat/app';
 import 'firebase/compat/auth';
 import 'firebase/compat/firestore';
function Sidebar() {
  const user = useSelector(selectUser);
  const [chatInput , setChatInput] = useState(null)
  const [imageUrl,setImageUrl] = useState('https://static.remove.bg/remove-bg-web/a8b5118d623a6b3f4b7813a78c686de384352145/assets/start-1abfb4fe2980eabfbbaaa4365a0692539f7cd2725f324f904565a9a744f8e214.jpg')
  // console.log(user)
  // console.log(user.displayName)
  // console.log(user.photo)
  const serverStamp = firebase.firestore.Timestamp
  const [openModal,setOpenModal] = useState(false)
  const handleChat =()=>{
    if(chatInput){
      db.collection('chats').add({
        chatName:chatInput,
        chatImage : imageUrl,
         timestamp: serverStamp.now()
      })
    }
    setChatInput();
    setOpenModal(false)
  }
  const [chats,setChats]= useState([])
  useEffect(()=>{
    db.collection('chats').orderBy('timestamp','desc').onSnapshot((snapshot)=>
    setChats(snapshot.docs.map((doc)=>({
      id:doc.id,
      chatName:doc.data()
  })))
    )
  },[])
  return (
    <div className='sidebar'>
        <div className="side_head">
            <Avatar style={{color:'	#1f52b9',cursor:'pointer'}}
              src={user?.photo}
              onClick ={()=>auth.signOut()}
            />
        <div className="side_search">
            <Search  style={{color:'grey'}}/>
            <input type='text'  placeholder='Search'/>
            </div>
            <Add  
            style={{color:'#445f93',cursor:'pointer',marginLeft:'2px',fontSize:'20px'}}
            onClick={()=>setOpenModal(true)}
            />
            <Modal isOpen={openModal} onRequestClose={()=>setOpenModal(false)} ariaHideApp={false} 
            style={{overlay:{
              height:400,width:500,zIndex:'9999',borderBlockColor:'rgba(0,0,0,0.9)', marginTop:'4rem' , marginLeft:'29rem'
            }}}
            >
               <div className="modal-info">
                 <ModalBox  chatInput={chatInput} imageUrl={imageUrl} setChatInput={setChatInput} setImageUrl={setImageUrl} handleChat={handleChat}/>
                 <button onClick={()=>setOpenModal(false)} className='close-btn'>Close</button>
               </div>
            </Modal>
        </div>
        <div className="side_chat">
          {
            chats.map(({id,chatName})=>(
              <SidebarChat key={id} id={id} name={chatName.chatName} chatImage={chatName.chatImage} timestamp={chatName.timestamp}/>
            ))
          }
         
          
        </div>
        <div className="side-note">
            <div className="side-note-icon">
            <SpeakerNotes/>
            </div>
            <p>Note to self</p>
        </div>
    </div>
  )
}

export default Sidebar