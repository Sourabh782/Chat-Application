import { useEffect, useState } from "react"
import useConversation from "../store/useConversation"
import toast from "react-hot-toast"

const useGetMessages = () => {
  const [loading, setLoading] = useState(false)
  const {messages, setMessages, selectedConversation } = useConversation()

  
  useEffect(() => {
      const getMessages = async()=>{
          setLoading(true);
          try {
              setMessages([])
              const res = await fetch(`/api/message/${selectedConversation._id}`)
    
              const data = await res.json();
    
              if(data.error){
                  throw new Error(data.error)
              }
    
              setMessages(data.data)
              
          } catch (error) {
              toast.error(error.message)
          } finally {
              setLoading(false)
          }
      }

    if(selectedConversation?._id){
        getMessages()
    }
  }, [ setMessages, selectedConversation?._id])
  
  return { messages, loading }
}

export default useGetMessages