import React from 'react';
import Navigation from './Navigation.jsx'
import Footer from './Footer.jsx';
import { Outlet } from 'react-router-dom';


function Layout() {



    return (
        <>

            <Navigation data-aos="fade-down" />
            <Outlet />
            <Footer />


        </>
    )
}

export default Layout;