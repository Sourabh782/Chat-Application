import { create } from "zustand";

const useConversation = create((set)=>(
    {
        selectedConversation: null,
        setSelectedConversation: (selectedConversation)=>set({selectedConversation}),
        messages:[],
        setMessages: (messages)=>set({messages}),
        users: [],
        setUsers: (users)=>set({users}),
        searchActive: false,
        setSearchActive: (searchActive)=>set({searchActive}),
        conversations: [],
        setConversations: (conversations)=>set({conversations})
    }
))

export default useConversation;