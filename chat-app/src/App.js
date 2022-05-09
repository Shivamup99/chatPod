import React, { useEffect } from 'react'
import Sidebar from './components/sidebar/Sidebar'
import {useDispatch, useSelector} from 'react-redux'
import {login, logout, selectUser} from './redux/userReducer'
import Login from './pages/Login'
import { auth } from './firebase'
import Chat from './components/chat/Chat'
import './App.css'
function App() {
  const user = useSelector(selectUser)
  const dispatch = useDispatch()
  useEffect(()=>{
    auth.onAuthStateChanged((authUser)=>{
      if(authUser){
        dispatch(login({
          uid:authUser.uid,
          photo:authUser.photoURL,
          displayName:authUser.displayName,
          email:authUser.email
        }))
      } 
      else{
          dispatch(logout())
      }
       
    })
  },[dispatch])
  return (
    <div className='home'>
      {
        user ? <>
           <Sidebar/>
           <Chat/>
        </> :( <Login />)
      }
    </div>
  )
}

export default App