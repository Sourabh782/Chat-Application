import { useState } from "react"
import toast from "react-hot-toast"
import { useAuthContext } from "../context/AuthContext";

const useSignup = () => {
    const [loading, setLoading] = useState(false);
    const { setAuthUser } = useAuthContext();

    const signup = async({fullname, username, password, confirmPassword, gender})=>{
        const success = handleInputErrors({fullname, username, password, confirmPassword, gender})

        setLoading(true);
        if(!success) return;

        try {
            const res = await fetch("/api/auth/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({fullname, username, password, confirmPassword, gender})
            })

            const data = await res.json()

            if(data.error){
                throw new Error(data.error);
            }
            
            localStorage.setItem("chat-user", JSON.stringify(data))

            setAuthUser(data);

        } catch (error) {
            toast.error(error.message)
        } finally {
            setLoading(false)
        }
    }

    return { loading, signup }  
}

export default useSignup

function handleInputErrors({fullname, username, password, confirmPassword, gender}){
    if(!fullname || !username || !password || !confirmPassword || !gender){
        toast.error("Please fill all the fields");
        return false;
    }

    if(password !== confirmPassword){
        toast.error("Passwords not matched");
        return false
    }

    if(password.length < 6){
        toast.error("Password length must be 6");
        return false;
    }

    return true;
}