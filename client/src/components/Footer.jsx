import React, { useState } from 'react';
import logo from "../assets/footer-logo.png";
import { useLocation } from 'react-router-dom';
import sendbtn from '../assets/sendbtn.png'


function Footer() {


    const location = useLocation();
    const isHomePage = location.pathname === '/';





   



    return (
        <>


            {/* Home footer */}

            {isHomePage && (
                <footer className="bg-[url('./assets/footerbg.png')] bg-cover bg-center bg-no-repeat sm:py-[112px] py-[30px]">
                    <div className="container flex flex-col justify-center sm:gap-[36px] gap-[10px] text-center">
                        <img src={logo} alt="" className="mx-auto sm:w-auto w-[120px] h-[auto]" />

                        <p className=' !text-white'>Storynoi © 2023. All Rights Reserved.</p>


                    </div>

                </footer>)}



        </>
    )
}

export default Footer;