import React from 'react'
import PayPal from '..//assets/logos_paypal.png'
import appleLogo from '../assets/apple-logo.png';
import Select from "react-select";
import ebook from "../assets/ebook.png";
import storyTopCenter from "../assets/story-top-center.png";
import storyLeft from "../assets/story-left.png";
import stroyTopRight from "../assets/story-top-right.png";
import { generatePDF } from './GeneratePdf';

function Checkout() {


    const months = [
        { value: "01", label: "Jan" }, { value: "02", label: "Feb" }, { value: "03", label: "Mar" },
        { value: "04", label: "Apr" }, { value: "05", label: "May" }, { value: "06", label: "Jun" },
        { value: "07", label: "Jul" }, { value: "08", label: "Aug" }, { value: "09", label: "Sep" },
        { value: "10", label: "Oct" }, { value: "11", label: "Nov" }, { value: "12", label: "Dec" }
    ];


    const years = Array.from({ length: 10 }, (_, i) => {
        const year = new Date().getFullYear() + i;
        return { value: year, label: year };
    });

    const customStyles = {
        control: (base, state) => ({
            ...base,
            borderRadius: "10px",

            padding: window.matchMedia("(max-width: 648px)").matches ? "2px 2px" : "7px 10px",
        }),
        menu: (base) => ({
            ...base,
            borderRadius: "10px",

        }),
        option: (base, state) => ({
            ...base,

            padding: "15px 20px",
        }),
        indicatorSeparator: () => ({
            display: "none",
        }),
        placeholder: (base) => ({
            ...base,
            color: "#aaa",
            fontSize: "16px",
        }),
    };


    const handleSubmit = (e) => {
        e.preventDefault();
        generatePDF();
        
    }


    return (
        <div className="bg-[url('./assets/create-story-bg.png')] md:py-[160px] py-[80px] bg-no-repeat bg-center bg-cover h-[100%] relative">

            <img src={storyTopCenter} alt="" className='absolute right-[40%] top-0' />
            <img src={storyLeft} alt="" className='absolute left-0 top-[270px]' />
            <img src={stroyTopRight} alt="" className='absolute right-0 top-0' />

            <div className="container">

                <div className=' bg-white rounded-[22px]  flex flex-wrap z-10 relative'>

                    <div className='xl:w-[60%] w-[100%] md:py-[70px] p-[20px] md:px-[60px]'>

                        <h2 className='!font-semibold'>Payment Method</h2>

                        <div className=' sm:p-[30px] p-[10px] flex sm:flex-nowrap flex-wrap sm:gap-[20px] gap-[10px] w-full mt-[30px] rounded-[12px] border !border-black/10 !shadow-md'>

                            <button className='storybtn bg-[#F6B71E] rounded-[10px] flex gap-[12px] w-full justify-center items-center '> <img src={PayPal} alt="" className='sm:w-auto h-auto' />PayPal</button>
                            <button className='storybtn bg-[#000] rounded-[10px] flex gap-[12px] w-full justify-center  ' > <img src={appleLogo} alt="" /></button>

                        </div>

                        <h3 className="relative mt-[45px] text-center flex items-center before:content-[''] after:content-[''] before:flex-1 after:flex-1 before:h-[1px] after:h-[1px] before:bg-black/10 after:bg-black/10 before:mr-[16px] after:ml-[16px]">
                            Or Continue Below to Pay with a Credit Card
                        </h3>



                        <form className='sm:p-[30px] p-[20px] md:pb-[60px] mt-[30px] rounded-[12px] border !border-black/10 !shadow-md' id='paymentForm'>


                            <div className="cardNumber-group ">
                                <h5>Card Number</h5>
                                <label >The digits on the front of your card</label>
                                <input type='text' placeholder='2224-1222-1223-3355' />
                            </div>


                            <div className="cardName-group sm:mt-[30px] mt-[20px]">
                                <h5>Card Holder Name</h5>
                                <label >The name on the  front of your card</label>
                                <input type='text' placeholder='Rakhi Gupta' />
                            </div>


                            <div className='sm:mt-[30px] mt-[20px] md:flex gap-[40px]'>

                                <div className="cardExpiry-group  md:w-[60%]">
                                    <h5>Expiration  date</h5>
                                    <label >The date your credit card expires</label>
                                    <div className='flex gap-[12px] mt-[14px]'>
                                        <Select options={months} placeholder="Month" styles={customStyles} className='w-full' />
                                        <Select options={years} placeholder="Year" styles={customStyles} className='w-full' />
                                    </div>
                                </div>



                                <div className="cardCvv-group  md:w-[40%] md:mt-[0px] sm:mt-[30px] mt-[20px] ">
                                    <h5>CVV</h5>
                                    <label >Find this on the back of your card</label>
                                    <input type='text' placeholder='225' />
                                </div>


                            </div>

                        </form>



                    </div>

                    <div className='xl:w-[40%] w-[100%] md:py-[70px] md:px-[60px] p-[20px] bg-[#F9F9F9] xl:rounded-r-[22px] rounded-b-[22px]'>
                        <h2 className='!font-semibold pb-[30px] border-b border-black/10'>Summary</h2>

                        <div className='sm:py-[35px] py-[20px] flex items-center justify-between border-b border-black/10 gap-[20px]'>
                            <div className='flex items-center'>
                                <img src={ebook} alt="" className='sm:w-auto sm:h-auto w-[50px] h-[50px]' />
                                <h5 className='max-w-[206px] ml-[20px]'>Mama Get New Skates: A Heartwarming Story About Parenthood</h5>
                            </div>

                            <h3>$25</h3>
                        </div>

                        <div className='flex items-center justify-between sm:mt-[20px] mt-[10px]'>
                            <h5>Subtotal</h5>
                            <h5>$25:00</h5>
                        </div>

                        <div className='flex items-center justify-between sm:mt-[20px] mt-[10px] sm:pb-[10px] pb-[10px] border-b border-black/10'>
                            <h5>Tax</h5>
                            <h5>-</h5>
                        </div>

                        <div className='flex items-center justify-between sm:mt-[20px] mt-[10px]'>
                            <h5>Total</h5>
                            <h5>USD <span className='font-bold text-[20px]'>$25:00</span></h5>
                        </div>



                        <button type='submit' form='paymentForm1' className='storybtn bg-[#FF8E00] !text-[18px] !text-white rounded-[10px]  w-full mt-[50px] cursor-pointer' onClick={handleSubmit}>Finish & Pay</button>

                    </div>

                </div>

            </div>




        </div>
    )
}

export default Checkout