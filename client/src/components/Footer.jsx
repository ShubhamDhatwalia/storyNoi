import React from 'react';
import logo from "../assets/footer-logo.png";
import { useLocation } from 'react-router-dom';


function Footer() {


    const location = useLocation();
    const isStoryPage = location.pathname === '/story';

    return (
        <>


            {/* Home footer */}

            {!isStoryPage && (
                <footer className="bg-[url('./assets/footerbg.png')] bg-cover bg-center bg-no-repeat sm:py-[112px] py-[30px]">
                    <div className="container flex flex-col justify-center sm:gap-[36px] gap-[10px] text-center">
                        <img src={logo} alt="" className="mx-auto sm:w-auto w-[120px] h-[auto]" />

                        <p className=' !text-white'>Storynoi © 2023. All Rights Reserved.</p>


                    </div>

                </footer>)}


            {/* Story footer  */}
            {isStoryPage && (
                <footer className='bg-[#5CE1E6] py-[32px] fixed bottom-0 left-0 right-0 px-[70px]'>

                    <div className='container '>

                        <div className='rounded-[20px] border border-[rgba(0,0,0,0.10)] bg-white shadow-md max-w-[1300px] mx-auto p-[10px] flex gap-[16px]'>

                            <button className=' storybtn bg-[#5CE1E6] rounded-[12px] w-1/2 '>Prefer any changes</button>

                            <button className='storybtn bg-[#FF8E00] rounded-[12px] w-1/2 !text-white'>Generate pics</button>


                        </div>

                    </div>

                </footer>
            )}


        </>
    )
}

export default Footer;