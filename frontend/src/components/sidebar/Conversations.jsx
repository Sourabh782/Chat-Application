import React from 'react'
import Conversation from './Conversation'
import useGetConversations from '../../hooks/useGetConversation'
import { getRandomEmoji } from '../../utils/emojis'

import useSearchUser from '../../hooks/useSearchUser'

const Conversations = () => {
  const {loading, conversations} = useGetConversations()
  const {users, searchActive, setSearchActive} = useSearchUser()

  return (
    <div className={`py-2 flex flex-col overflow-auto h-[calc(100%-8rem)] `}>

      {!searchActive && conversations?.map((conversation, idx)=>(
        <Conversation 
          key={conversation._id}
          conversation={conversation}
          emoji={getRandomEmoji()}
          lastIdx = {idx === Conversations.length-1}
       />
      ))}

        {searchActive && users.map((user, idx)=>(
          <div onClick={()=>setSearchActive(true)}>
            <Conversation 
              key={idx}
              conversation={user}
              emoji={getRandomEmoji()}
              lastIdx = {idx === users.length-1}
            />
          </div>
        ))}

        {searchActive && users.length === 0 && (
          <p className='text-center'>Search your friend's name</p>
        )}

      {loading ? <span className='loading loading-spinner mx-auto'></span> : null}
    </div>
  )
}

export default Conversations

