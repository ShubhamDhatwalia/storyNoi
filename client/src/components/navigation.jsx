import React from 'react';
import logo from "../assets/logo.png";

function navigation() {
    return (
        <>
            <div className='container flex justify-between items-center fixed top-[40px] right-0 left-0 bg-transparent'>
                <a href="#"><img src={logo} alt="" /></a>

                <nav>
                    <ul className='flex gap-[50px] items-center'>
                        <li>
                            <a href="#aboutUs" className='font-'>About Us</a>
                        </li>
                        <li>
                            <a href="#storyNoi">Why StoryNoi</a>
                        </li>
                        <li>
                            <a href="#idea">Idea</a>
                        </li>

                        <a href="#login" className='btn ml-[80px] font-semibold px-[45px] py-[18px] border-2 border-black rounded-[12px] border-solid'><button type='button'>Login</button></a>
                    </ul>
                </nav>
            </div>
        </>
    )
}

export default navigation