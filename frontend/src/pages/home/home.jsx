import React from 'react'
import Sidebar from '../../components/sidebar/Sidebar'
import MessageContainer from '../../components/messages/MessageContainer'

const Home = () => {
  return (
    <div className='flex overflow-hidden sm:h-[450px] md:h-[550px] rounded-lg shadow-md bg-white bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-10'>
        <Sidebar />
        <MessageContainer />
    </div>
  )
}

export default Home