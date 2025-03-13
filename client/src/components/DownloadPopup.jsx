import React from 'react';
import topLeft from '../assets/top-left.png';
import topRight from "../assets/top-right.png";
import { X } from 'lucide-react';
import { generatePDF } from './GeneratePdf';

function downloadPopup({ onClose }) {


    const handleDownload = () => {
        console.log("download without watermark");
        generatePDF();

        onClose();
    }



    return (
        <>

            <div className='fixed w-[100vw]
     h-[100vh] top-0 bottom-0 z-40 bg-[rgba(255,142,0,0.8)] flex items-center justify-center p-[50px] '>


                <div className='bg-[white] rounded-[10px] xl:p-[200px] p-[100px] relative'>

                    <img src={topLeft} alt="" className='absolute left-[20px] top-0' />
                    <img src={topRight} alt="" className='absolute right-0 bottom-[40px]' />


                    <X size={32} className='absolute top-[30px] right-[30px]' onClick={onClose} />




                    <h1 className='xl:!text-[52px] md:!text-[42px] !text-[25px] text-center'>Are you sure to download ebook</h1>

                    <div className='flex gap-[14px] mt-[48px] px-[50px]'>
                        <button className={`storybtn hover:bg-[#69d8db] bg-[#5CE1E6] rounded-[12px] w-1/2 whitespace-nowrap`} onClick={handleDownload} >
                            Download with watermark
                        </button>

                        <button className={`storybtn hover:bg-[#f38f14] bg-[#FF8E00] rounded-[12px] w-1/2 !text-white whitespace-nowrap`} onClick={onClose}>
                            Download without Watermark
                        </button>
                    </div>
                </div>

            </div>

        </>
    )
}

export default downloadPopup