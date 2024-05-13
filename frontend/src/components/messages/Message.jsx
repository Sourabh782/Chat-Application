import React from 'react'
import { useAuthContext } from "../../context/AuthContext"
import useConversation from '../../store/useConversation'
import { extractTime } from '../../utils/timeExtraction'

const Message = ({message}) => {

  const {authUser} = useAuthContext()
  const {selectedConversation} = useConversation()

  const formatedTime = extractTime(message.createdAt)
  
  const fromMe = message.senderId === authUser.data._id;

  const bubbleBgColor = fromMe ? "bg-blue-500" : "bg-gray-700"

  const shake = message.shake ? "shake" : "";

  return (
    <div className={`chat ${fromMe ? "chat-end" : "chat-start"}`}>
      <div className='chat-image avatar'>
        <div className='w-10 rounded-full'>
          <img src={fromMe ? authUser.data.profilePic : selectedConversation?.profilePic} alt="" />
        </div>
      </div>

      <div className={`chat-bubble text-white ${bubbleBgColor} ${shake}`}>
        {message.message}
      </div>
      <div className='chat-footer opacity-50 text-xs flex gap-1 items-center'>{formatedTime}</div>
    </div>
  )
}

export default Message