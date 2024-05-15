import { useState } from "react";
import toast from "react-hot-toast";
import useConversation from "../store/useConversation";

const useSearchUser = ()=>{
    const {users, setUsers, searchActive, setSearchActive} = useConversation()
    // const [searchActive, setSearchActive] = useState(false)

    const searchUser = async(name)=>{
        // setLoading(true);
        try {
            const res = await fetch("/api/user/search", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({name})
            })
            
            const data = await res.json()
            
            if(data.error){
                throw new Error(data.error)
            }

            console.log(data)
            
            setUsers(data.data)
            
        } catch (error) {
            toast.error(error.message)
        } finally {
            // setLoading(false)
        }
    }

    return { users, searchUser, searchActive, setSearchActive }
}

export default useSearchUser