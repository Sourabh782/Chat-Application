import React from 'react'
import Message from "./Message"
import useGetMessages from '../../hooks/useGetMessages';
import MessageSkeleton from '../skeletons/messageSkeleton';

const Messages = () => {
  const {loading, messages} = useGetMessages();
  return (
    <div className='px-4 flex-1 overflow-auto'>

        {!loading && (messages.length > 0) && messages.map((message)=>(
          <Message key={message._id} message={message} />
        ))}

        { loading && [...Array(4)].map((_, idx)=> <MessageSkeleton key={idx} />)}

        {!loading && messages.length === 0 && (
          <p className='text-center'>Send a message to start conversation</p>
        )}
    </div>
  )
}

export default Messages