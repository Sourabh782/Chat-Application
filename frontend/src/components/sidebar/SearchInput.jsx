import React, { useState } from 'react'
import { FaSearch } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import useConversation from "../../store/useConversation"
import useGetConversations from "../../hooks/useGetConversation"
import toast from 'react-hot-toast';
import useSearchUser from '../../hooks/useSearchUser';

const SearchInput = () => {

  const [search, setSearch] = useState("");
  // const { setSelectedConversation } = useConversation()
  // const { conversations } = useGetConversations()
  const { searchUser, users, setSearchActive, searchActive } = useSearchUser()

  const handleSubmit = async (e)=>{
    e.preventDefault();

    if(!search){
      return;
    }

    if(search.length<3){
      toast.error("search term must be 3 characters long");
      return
    }

    // const conversation = conversations.find((c)=> c.fullname.toLowerCase().includes(search.toLowerCase()));

    // if(conversation){
    //   setSelectedConversation(conversation);
    //   setSearch("")
    // } else {
    //   toast.error("No user found!")
    // }

    // console.log(search)

    searchUser(search)

    if(users?.length === 0){
      toast.error("no user found")
    }

    // console.log(users);
    // setLoading(true)
    setSearch("")
  }

  return (
    <form onSubmit={handleSubmit} action="" className='flex gap-2 items-center'>
        <input type="text" placeholder='Search..' className='input input-bordered rounded-full'
          value={search}
          onChange={(e)=>setSearch(e.target.value)}
          onFocus={()=>setSearchActive(true)}
          // onBlur={() => setTimeout(setSearchActive(false), 1000)}
        />

        <button type='submit' className={`btn btn-circle ${searchActive ? "bg-red-500" : "bg-sky-500"} text-white`}>
            {!searchActive && <FaSearch  className='w-6 h-6 outline-none'/>}
            {searchActive && <IoMdClose className='w-8 h-8 outline-none' onClick={()=>setSearchActive(false)}/>}
        </button>
    </form>
  )
}

export default SearchInput