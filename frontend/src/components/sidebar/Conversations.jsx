import React from 'react'
import Conversation from './Conversation'
import useGetConversations from '../../hooks/useGetConversation'
import { getRandomEmoji } from '../../utils/emojis'

const Conversations = () => {

  const {loading, conversations} = useGetConversations()

  return (
    <div className='py-2 flex flex-col overflow-auto h-[calc(100%-8rem)]'>

      {conversations.map((conversation, idx)=>(
        <Conversation 
          key={conversation._id}
          conversation={conversation}
          emoji={getRandomEmoji()}
          lastIdx = {idx === Conversations.length-1}
       />
      ))}
    </div>
  )
}

export default Conversations