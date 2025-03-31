import React from 'react';
import topLeft from '../assets/top-left.webp';
import topRight from "../assets/top-right.webp";
import { X } from 'lucide-react';

import { WithWatermark } from './WithWatermark';

import { useNavigate } from 'react-router-dom';

function downloadPopup({ onClose }) {


    const navigate = useNavigate();



    const downloadWithWatermark = () => {

        WithWatermark();

        onClose();

    }


    const handleDownload = () => {

        navigate('/checkout');
        onClose();
    }



    return (
        <>

            <div className='fixed w-[100vw]
     h-[100vh] top-0 bottom-0 z-40 bg-[rgba(255,142,0,0.8)] flex items-center justify-center p-[50px] '>


                <div className='bg-[white] rounded-[10px] xl:p-[200px] md:p-[100px] sm:p-[50px] p-[30px] py-[80px]  relative'>

                    <img src={topLeft} alt="" className='sm:block absolute hidden left-[20px] top-0' />
                    <img src={topRight} alt="" className='sm:block absolute hidden right-0 bottom-[40px]' />


                    <X size={32} className='absolute sm:top-[30px] top-[10px] sm:right-[30px] right-[10px] z-10' onClick={onClose} />




                    <h1 className='xl:!text-[52px] md:!text-[42px] !text-[20px] text-center relative z-10'>Are you sure to download ebook</h1>

                    <div className='flex lg:flex-nowrap flex-wrap justify-center gap-[14px] mt-[48px] sm:px-[50px] relative z-10'>
                        <button className={`storybtn hover:bg-[#69d8db] bg-[#5CE1E6] rounded-[12px] lg:w-1/2 w-full whitespace-nowrap`} onClick={downloadWithWatermark}  >
                            Download with watermark
                        </button>

                        <button className={`storybtn hover:bg-[#f38f14] bg-[#FF8E00] rounded-[12px] w-full lg:w-1/2 !text-white whitespace-nowrap`} onClick={handleDownload} >
                            Download without Watermark
                        </button>
                    </div>
                </div>

            </div>

        </>
    )
}

export default downloadPopup