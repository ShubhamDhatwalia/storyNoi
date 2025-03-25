import React, { useEffect } from 'react';
import Navigation from './Navigation.jsx'
import Footer from './Footer.jsx';
import { Outlet } from 'react-router-dom';
import AOS from "aos";
import "aos/dist/aos.css";

function Layout() {


     useEffect(() => {
            AOS.init({
                duration: 1000,  
                once: true,       
                easing: "ease-in-out",
            });
        }, []);


    return (
        <>

            <Navigation data-aos="fade-down" />
            <Outlet />
            <Footer />


        </>
    )
}

export default Layout;