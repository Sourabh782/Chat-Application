import React, { useState } from 'react'
import GenderCheckbox from './genderCheckbox'
import { Link } from 'react-router-dom'
import useSignup from '../../hooks/useSignup'

const Signup = () => {

    const {signup, loading} = useSignup()

    const [inputs, setInputs] = useState({
        fullname: "",
        username: "",
        password: "",
        confirmPassword: "",
        gender: ""
    })

    const handelSubmit = async (e)=>{
        e.preventDefault();
        await signup(inputs)
    }

    const handleCheckboxChange = (gender)=>{
        setInputs({...inputs, gender})
    }

  return (
    <div className='flex flex-col items-center justify-center min-w-96 mx-auto'>
        <div className='w-full p-6 rounded-lg shadow-md bg-white bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-10'>
            <h1 className='text-3xl font-semibold text-center text-gray-300'> 
                Signup
                <span className='text-blue-500 px-4'>ChatApp</span>
            </h1>

            <form onSubmit={handelSubmit}>
                <div>
                    <label htmlFor="" className='label p-2'>
                        <span className='text-base label-text'>Fullname</span>
                    </label>
                    <input type="text" value={inputs.fullname} placeholder='Enter Fullname' className='w-full input input-bordered h-10'
                        onChange={(e)=> setInputs({...inputs, fullname: e.target.value})}
                    />
                </div>

                <div>
                    <label htmlFor="" className='label p-2'>
                        <span className='text-base label-text'>Username</span>
                    </label>
                    <input type="text" value={inputs.username} placeholder='Enter Username' className='w-full input input-bordered h-10'
                        onChange={(e)=> setInputs({...inputs, username: e.target.value})}
                    />
                </div>

                <div>
                    <label htmlFor="" className='label p-2'>
                        <span className='text-base label-text'>Password</span>
                    </label>
                    <input type="password" value={inputs.password} placeholder='Enter Password' className='w-full input input-bordered h-10' 
                        onChange={(e)=> setInputs({...inputs, password: e.target.value})}
                    />
                </div>

                <div>
                    <label htmlFor="" className='label p-2'>
                        <span className='text-base label-text'>Confirm password</span>
                    </label>
                    <input type="password" value={inputs.confirmPassword} placeholder='Enter Password' className='w-full input input-bordered h-10' 
                        onChange={(e)=> setInputs({...inputs, confirmPassword: e.target.value})}
                    />
                </div>

                {/* gender checkbox */}
                <GenderCheckbox onCheckboxChange={handleCheckboxChange} selectedGender={inputs.gender} />

                <Link to="/login" className='text-sm hover:underline hover:text-blue-600 mt-2 text-center inline-block'> Already have an account?</Link>

                <div>
                    <button className='btn btn-block sm mt-2' disabled={loading} >
                        {loading ? <span className='loading loading-spinner'></span> :"Sign Up"}
                    </button>
                </div>

            </form>
        </div>

    </div>
  )
}

export default Signup