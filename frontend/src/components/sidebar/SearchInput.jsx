import React, { useState } from 'react'
import { FaSearch } from "react-icons/fa";
import useConversation from "../../store/useConversation"
import useGetConversations from "../../hooks/useGetConversation"
import toast from 'react-hot-toast';

const SearchInput = () => {

  const [search, setSearch] = useState("");
  const { setSelectedConversation } = useConversation()
  const { conversations } = useGetConversations()

  const handleSubmit = (e)=>{
    e.preventDefault();

    if(!search){
      return;
    }

    if(search.length<3){
      toast.error("search term must be 3 characters long");
      return
    }

    const conversation = conversations.find((c)=> c.fullname.toLowerCase().includes(search.toLowerCase()));

    if(conversation){
      setSelectedConversation(conversation);
      setSearch("")
    } else {
      toast.error("No user found!")
    }

  }

  return (
    <form onSubmit={handleSubmit} action="" className='flex gap-2 items-center'>
        <input type="text" placeholder='Search..' className='input input-bordered rounded-full'
          value={search}
          onChange={(e)=>setSearch(e.target.value)}
        />

        <button type='submit' className='btn btn-circle bg-sky-500 text-white'>
            <FaSearch  className='w-6 h-6 outline-none'/>
        </button>
    </form>
  )
}

export default SearchInput