import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const Layout = ({ children }) => {
    return (
        <div>
            <Navbar />
            <div className='w-[70%] mx-auto'>
                {children}
            </div>
            <Footer />
        </div>
    )
}

export default Layout