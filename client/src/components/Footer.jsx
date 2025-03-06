import React from 'react';
import logo from "../assets/footer-logo.png";


function Footer() {
    return (
        <>
            <div className="bg-[url('./assets/footerbg.png')] bg-cover bg-center bg-no-repeat sm:py-[112px] py-[30px]">
                <div className="container flex flex-col justify-center sm:gap-[36px] gap-[10px] text-center">
                    <img src={logo} alt="" className="mx-auto sm:w-auto w-[120px] h-[auto]" />

                    <p className=' !text-white'>Storynoi © 2023. All Rights Reserved.</p>

                   
                </div>

            </div>
        </>
    )
}

export default Footer;