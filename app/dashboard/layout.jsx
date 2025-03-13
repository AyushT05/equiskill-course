import React from 'react'
import SideBar from './_components/SideBar'
import Header from './_components/Header'

const Dashboardlayout = ({ children }) => {
    return (
        <div>
            <div className='md:w-64 hidden md:block'>
                <SideBar />
            </div>

            <div className='md:ml-64 '>
                <Header/>
                {children}
            </div>
        </div>
    )
}

export default Dashboardlayout