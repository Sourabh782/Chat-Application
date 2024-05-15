import React, { useEffect } from 'react'
import useConversation from '../../store/useConversation'
import { useSocketContext } from '../../context/SocketContext'

const Conversation = ({conversation, lastIdx, emoji}) => {

  const { selectedConversation, setSelectedConversation } = useConversation()

  const { onlineUsers } = useSocketContext()

  const isOnline = onlineUsers.includes(conversation._id)

  const isSelected = selectedConversation?._id === conversation._id

  useEffect(() => {
    // console.log(selectedConversation)
  }, [selectedConversation])
  

  return <>
    <div className={`flex gap-2 items-center hover:bg-sky-300 rounded p-2 py-1 cursor-pointer ${isSelected ? "bg-sky-500" : ""}`}
      onClick={()=>{
        setSelectedConversation(conversation)
        // setTimeout(()=>{
          console.log(selectedConversation)
        // }, 500)
      }}
    >
      <div className={`avatar ${isOnline ? "online" : ""}`}>
        <div className='w-12 rounded-full'>
          <img src={conversation.profilePic}  alt="user avatar" />
        </div>
      </div>

      <div className='flex flex-1 flex-col'>
        <div className='flex gap-3 justify-between'>
          <p className='font-bold text-gray-200 flex'>{conversation.fullname}</p>
          <span className='text-xl'>{emoji}</span>
        </div>
      </div>
    </div>

    { !lastIdx && <div className='divider my-0 py-0 h-1'></div>}
  </>
  
}

export default Conversation