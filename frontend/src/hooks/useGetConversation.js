import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import useConversation from "../store/useConversation";

const useGetConversations = ()=>{
    const [loading, setLoading] = useState(false);
    // const [conversations, setConversations] = useState([]);
    const {conversations, setConversations} = useConversation()

    const getConversation = async ()=>{
      setLoading(true);
      try {
          const res = await fetch("/api/user");

          const data = await res.json();

          if(data.error){
              throw new Error(data.error)
          }

          setConversations(data.data)
      } catch (error) {
          toast.error(error.message);
      } finally {
          setLoading(false)
      }
    }

    useEffect(() => {
      getConversation();
    }, [])
    
    return { loading, conversations}
}

export default useGetConversations;