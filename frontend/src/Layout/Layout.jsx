import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const Layout = ({ children }) => {
    return (
        <div className=" flex flex-col">
            <Navbar />
            <div className='w-[90%] md:w-[70%] mx-auto flex-grow'>
                {children}
            </div>
            <Footer />
        </div>
    )
}

export default Layout