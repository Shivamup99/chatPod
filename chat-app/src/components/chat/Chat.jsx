import React, { useEffect, useState } from 'react'
import '../css/chat.css'
import {Avatar} from '@material-ui/core'
import {EmojiEmotions, MicNone, MoreHoriz, Search, Style,Add} from '@material-ui/icons'
import Message from './Message'
import { useSelector } from 'react-redux'
import { selectChatId, selectChatImage, selectChatName } from '../../redux/chatSlice'
import db from '../../firebase'
import { selectUser } from '../../redux/userReducer'
import firebase from 'firebase/compat/app';
 import 'firebase/compat/auth';
 import 'firebase/compat/firestore';
function Chat() {
    const serverStamp = firebase.firestore.Timestamp
    const user = useSelector(selectUser)
    const chatImage = useSelector(selectChatImage)
    const chatId = useSelector(selectChatId)
    const chatName = useSelector(selectChatName)
    const [input,setInput] = useState('')
    const handleMessage=(e)=>{
        e.preventDefault()
        if(input){
            db.collection('chats').doc(chatId).collection('message').add({
                user:user,
                message:input,
                timestamp: serverStamp.now()
            })
        }
        setInput('')
    }
    const [messages,setMessages] = useState([]) 
    useEffect(()=>{
        if(chatId){
            db.collection('chats').doc(chatId).collection('message').orderBy('timestamp','desc').onSnapshot((snapshot)=>
            setMessages(snapshot.docs.map((doc)=>({
                id:doc.id,
                message:doc.data()
            })))
            )
        }
    },[chatId])
  return (
    <div className='chat'>
        <div className="chat-head">
            <div className="chat-head-left">
                <Avatar  src={chatImage}/>
                {/* <img src={user.photo} alt='dd'/> */}
                <h5>{chatName}</h5>
            </div>
            <div className="chat-head-right">
                <Search />
                <MoreHoriz/>
            </div>
        </div>
        <div className="chat-body">
            <div className="message-head">
                <Avatar src={chatImage}/>
                <h4>{chatName}</h4>
            </div>
            {
                messages.map(({id,message})=>(
                    <Message key={id} id={id} message={message.message} timestamp={message.timestamp}
                    sender={message.user.email} senderName={message.user.displayName}/>
                ))
            }
           
        </div>
        <div className="chat-footer">
            <EmojiEmotions />
            <form>
                <input placeholder='send a message' type='text' required
                value={input} onChange={(e)=>setInput(e.target.value)}
                />
                <button type='submit' onClick={handleMessage}>Send</button>
            </form>
            <div className="chat-footer-icon">
                <Style/>
                <MicNone/>
                <Add/>
            </div>
        </div>
    </div>
  )
}

export default Chat