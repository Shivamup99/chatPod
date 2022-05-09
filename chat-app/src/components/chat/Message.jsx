 import { useSelector } from 'react-redux'
import { selectUser} from '../../redux/userReducer'

const  Message=(({id,message,timestamp,sender,senderName}) =>
{
  const user = useSelector(selectUser)
  return (
    <div className='message'>
      <div className="message-content">
        <span>{
         user.email !== sender ? <span>
           {senderName}
         </span> : null 
          }
          </span>
        <p>{message}</p>
        {/* <small>{
          new Date(timestamp?.toDate()).toLocaleString}</small> */}
      </div>
    </div>
  )
})

export default Message