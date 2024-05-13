import React, { useEffect, useRef } from 'react'
import Message from "./Message"
import useGetMessages from '../../hooks/useGetMessages';
import MessageSkeleton from '../skeletons/messageSkeleton';
import useListenMessages from '../../hooks/useListenMessages';

const Messages = () => {
  const {loading, messages} = useGetMessages();
  const lastMessageRef = useRef()
  useListenMessages()

  useEffect(() => {
    setTimeout(()=>{
      lastMessageRef.current?.scrollIntoView({behavior: 'smooth'})
    }, 50)
  }, [messages])
  

  return (
    <div className='px-4 flex-1 overflow-auto'>

        {!loading && (messages.length > 0) && messages.map((message)=>(
          <div key={message._id} ref={lastMessageRef}>
            <Message message={message} />
          </div>
        ))}

        { loading && [...Array(4)].map((_, idx)=> <MessageSkeleton key={idx} />)}

        {!loading && messages.length === 0 && (
          <p className='text-center'>Send a message to start conversation</p>
        )}
    </div>
  )
}

export default Messages