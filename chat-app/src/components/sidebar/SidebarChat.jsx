import { Avatar } from '@material-ui/core'
import React, {  useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import db from '../../firebase'
import { setChatInfo } from '../../redux/chatSlice'
import '../css/sidebar.css'
// import * as timeago from 'timeago.js'
const SidebarChat=(({id,name,chatImage,timestamp})=> {
  const dispatch = useDispatch()
  const [lastMessage,setLastMessage] = useState('');
  useEffect(()=>{
    db.collection('chats').doc(id).collection('message').orderBy('timestamp','doc')
    .onSnapshot((snapshot)=> setLastMessage(snapshot.docs.map((doc) => doc.data())))
  })
  return (
    <div className='sidebar-chat' onClick={()=>
      dispatch(setChatInfo({
        chatId:id,
        chatName:name,
        chatImage:chatImage
      }))
    }>
        <Avatar src={chatImage}/>
        <div className="sideChat-info">
          {/* <small>{timestamp}</small> */}
            {/* <small>{timeago.format(lastMessage[0]?.timestamp?.toDate())}</small> */}
            <h3>{name}</h3>
            <p>{lastMessage[0]?.message}</p>
        </div>
    </div>
  )
})

export default SidebarChat