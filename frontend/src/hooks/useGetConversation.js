import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const useGetConversations = ()=>{
    const [loading, setLoading] = useState(false);
    const [conversations, setConversations] = useState([]);

    useEffect(() => {
      const getConversation = async ()=>{
        setLoading(true);
        try {
            const res = await fetch("/api/user");

            const data = await res.json();

            // if(data.error){
            //     throw new Error(data.error)
            // }
            // console.log(res)
            console.log(data.data);

            setConversations(data.data)
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false)
        }
      }

      getConversation();
    }, [])
    
    return { loading, conversations}
}

export default useGetConversations;