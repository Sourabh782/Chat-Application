import { useState } from "react"
import toast from "react-hot-toast"
import useConversation from "../store/useConversation"

const useSendMessage = () => {
  const [loading, setLoading] = useState(false)
  const {messages, setMessages, selectedConversation, setSearchActive, conversations, setConversations } = useConversation()

  const sendMessage = async(message)=>{
    setLoading(true)
    try {
        console.log(selectedConversation?._id)

        const res = await fetch(`/api/message/send/${selectedConversation?._id}`, {
            method: "POST",
            headers: {"Content-Type" : "application/json"},
            body: JSON.stringify({message})
        })

        const data = await res.json();

        if(data.error){
            throw new Error(data.error)
        }

        setMessages([...messages, data.data])

        const present = conversations?.find((c)=> c._id === selectedConversation._id)

        setSearchActive(false);
        
        if(!present){
            console.log("hoii");
            setConversations([...conversations, selectedConversation])
        }

    } catch (error) {
        toast.error(error.message)
    } finally {
        setLoading(false)
    }
  }

  return {loading, sendMessage}
}

export default useSendMessage