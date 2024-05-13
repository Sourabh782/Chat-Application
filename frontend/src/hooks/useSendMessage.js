import { useState } from "react"
import toast from "react-hot-toast"
import useConversation from "../store/useConversation"

const useSendMessage = () => {
  const [loading, setLoading] = useState(false)
  const {messages, setMessages, selectedConversation, changed, setChanged} = useConversation()

  const sendMessage = async(message)=>{
    setLoading(true)
    try {
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
    } catch (error) {
        toast.error(error.message)
    } finally {
        setLoading(false)
    }
  }

  return {loading, sendMessage}
}

export default useSendMessage