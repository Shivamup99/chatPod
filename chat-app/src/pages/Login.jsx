import React from 'react'
import {auth,provider} from '../firebase'
function Login() {
    const signIn =()=>{
     auth.signInWithPopup(provider).then((res)=>
     console.log(res.user)).catch((error)=>alert(error.message))
    }
  return (
      <>
      <div className='login'>
          <img src='https://www.nicepng.com/png/detail/4-44517_nepa-phoenix-group-banner-royalty-free-stock-phoenix.png' alt='google' className='login-img'/>
          <button onClick={signIn} type='button'>Sign in with Google</button>
     
    </div>
   
      </>
  )
}

export default Login