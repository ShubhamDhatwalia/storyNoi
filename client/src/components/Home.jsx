import React, { useEffect, useState } from 'react';

import star from "../assets/star.png";
import bannerimg from "../assets/banner-image.png";
import aboutimg from "../assets/aboutimg.png";
import storyNoiimg from "../assets/storyNoiimg.png";
import whystory1 from "../assets/whystoryNoi-image1.png";
import whystory2 from "../assets/whystoryNoi-image2.png";
import listMark from "../assets/list-mark.png";
import ideaimg from "../assets/idea-img.png";
import topRight from "../assets/top-right.png";
import topleft from "../assets/top-left.png"
import bottomright from "../assets/bottom-right.png"
import bottomleft from "../assets/bottom-left.png";
import topcenter from "../assets/top-center.png";
import center from "../assets/center.png"
import Particle from './Particle';
import { useNavigate } from 'react-router-dom';
import { validateIdea } from './helper/Validation.jsx';
import CountUp from 'react-countup';
import AOS from "aos";
import "aos/dist/aos.css";


function Home() {

    const navigate = useNavigate();

    const [idea, setIdea] = useState("");
    const [isError, setIsError] = useState(false);





    useEffect(() => {
        AOS.init({

            once: true,

        });
        setTimeout(() => {
            AOS.refreshHard();
        },);
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const error = await validateIdea(idea);

        if (error) {
            setIsError(error);
            setIdea("");
        } else {
            setIsError(false);
            navigate("/story", { state: { idea } });
            localStorage.removeItem('generatedStory');
            setIdea("");
        }

    };

    const handleChange = (e) => {
        setIdea(e.target.value);
        setIsError(false);
    }


    return (
        <>

            <div id='top' className="  w-full relative">


                <div className='absolute  overflow-hidden w-[100%] h-[100%]'>

                    <Particle />

                </div>

                <div className="">

                    <img src={topleft} alt="" className='absolute top-0 left-0 z-10' data-aos="fade-right" />

                    <img src={topRight} alt="" className='absolute top-0 right-0 z-10 bottom-0' data-aos="fade-left" />



                    <section id='hero-section' className="container hero-section sm:pt-[200px] pt-[130px] sm:pb-[100px] pb-[50px] flex flex-wrap lg:flex-nowrap items-center gap-[70px]  relative">



                        <div className="content lg:max-w-[656px] md:py-[75px] order-2 lg:order-1 w-full justify-items-center md:justify-items-normal z-10 relative">



                            <h1 className='text-center md:text-left relative z-10' data-aos="fade-right" >Let Gen - AI Turn Your Idea to a  <span className='text-[#FF8E00]'>kid’s Book!</span></h1>
                            <h2 className='sm:mt-[59px] mt-[15px] relative z-10' data-aos="fade-right" >Express your idea in a few words!</h2>

                            <form className="input-group sm:max-w-[646px] w-full relative mt-[33px] z-10" onSubmit={handleSubmit} data-aos="fade-right" data-aos-delay="700">
                                <input id='idea' type="text" placeholder='Share your idea to start the book creation' value={idea} className={`'idea bg-white rounded-[20px] w-full  py-[30px] pl-[30px] pr-[220px] focus:outline-none' ${isError ? 'outline-2 outline-red-500' : 'outline-none '}`} onChange={handleChange} />
                                <button type='submit' className='input-btn btn py-[20px] px-[41px] bg-[#FF8E00] rounded-[12px] absolute right-[9px] top-[10px] !text-white'> create Story</button>
                            </form>

                            <div className='flex w-full sm:gap-[113px] justify-around md:justify-normal  sm:mt-[96px] mt-[50px] relative z-10' data-aos="fade-up" >

                                <div >
                                    <h6>Downloads</h6>
                                    <h1 className='mt-[0px] w-[205px]'> <CountUp start={0} end={12000} duration={5} separator=" " />
                                    </h1>

                                </div>

                                <div>
                                    <h6>Assessment</h6>
                                    <h1 className='flex items-center gap-[6px] mt-[0px] w-[205px]'><CountUp start={0} end={4.8} duration={5} decimals={1} /> <img src={star} alt="" /> </h1>
                                </div>

                            </div>

                            <img src={topcenter} alt="" className='absolute md:top-[-45px] top-[-115px] sm:right-[180px] right-[30%] z-0' data-aos="zoom-in" />

                            <img src={center} alt="" className='absolute md:bottom-[190px] sm:bottom-[100px] bottom-[45px] sm:right-[328px] right-[30%] z-0' data-aos="zoom-in" />





                        </div>

                        <div className="image w-full justify-items-center lg:flex-1/2 order-1 lg:order-2 ">

                            <img src={bannerimg} alt="" className='w-[100%] h-[auto] relative z-20' data-aos="zoom-in" />

                        </div>


                        <img src={bottomright} alt="" className='bottom-0 absolute right-[-60px] z-0' data-aos="fade-left" />
                        <img src={bottomleft} alt="" className='absolute bottom-[20px] left-[-144px]' data-aos="fade-right" />

                    </section>
                </div>



            </div>



            <section id='about' className="bg-[url('./assets/aboutbg.png')] sm:py-[120px] py-[40px] bg-no-repeat bg-cover bg-center">

                <div className='container'>

                    <h2 data-aos="fade-right">About Us</h2>
                    <h1 data-aos="fade-right">The Perfect Storyteller</h1>

                    <div className=' flex-wrap lg:flex-nowrap sm:mt-[36px] mt-[25px] flex items-center lg:gap-[90px] gap-[20px]'>
                        <div className='lg:w-1/2 w-full'>
                            <img src={aboutimg} alt="" className='w-[100%] h-auto ' />
                        </div>

                        <div className='lg:w-1/2 w-full flex flex-col md:gap-[45px] gap-[10px] lg:max-w-[655px] max-w-[100%]' >
                            <p>
                                Is A Genai Powered App That Lets You Create And Share Your Own Stories. With The Help Of Genai, The App Can Generate Stories Based On Your Prompts And Ideas. You Can Then Turn Your Stories Into Books.
                            </p>
                            <p>Once You've Created A Story, You Can Share It With Friends And Family Through The App's Social Media Integration.</p>
                            <p>You Can Also Publish Your Stories Online Through The App's Publishing Pla tform.</p>
                        </div>
                    </div>

                </div>
            </section>

            <section id="storyNoi" className="bg-[url('./assets/storyNoibg.png')] bg-no-repeat bg-cover bg-center ">

                <div className="container flex flex-wrap lg:flex-nowrap relative sm:py-[120px] py-[40px]">
                    <div className='lg:w-1/2 '>
                        <h2 data-aos="fade-right">All One Needs Is An Idea!</h2>
                        <h1 data-aos="fade-right">AI Personalized Stories</h1>

                        <p className='sm:pt-[40px] pt-[20px] lg:max-w-[655px]'>All You Need To Do Is Start By Giving The App A Few Prompts. These Prompts Can Be Anything From A Simple Setting To A Complex Character. Once You've Given The App Some Prompts, It Will Start Generating A Story. You Can Then Follow Along As The Story Unfolds, Or You Can Even Take Control Of The Story And Make Your Own Choices.</p>

                        <p className='lg:pt-[45px] pt-[10px] lg:max-w-[655px]'>You Can Create Stories About Anything You Can Imagine. You Can Create Stories About Your Favorite Characters, Your Favorite Places, Or Even Your Own Lif.</p>

                    </div>

                    <div className='lg:w-1/2 w-full justify-items-center lg:justify-items-normal gap-[20px] '>

                        <div className='lg:absolute top-0 right-[-140px]'>
                            <img src={storyNoiimg} alt="" className=' w-[100%] h-auto  mt-[20px]  rounded-2xl lg:rounded-none lg:mt-[0px] ' />
                        </div>

                    </div>
                </div>
            </section>


            <section id='whystoryNoi' className="bg-[url('./assets/whystoryNoi-bg.png')]  bg-no-repeat bg-cover bg-center sm:py-[120px] py-[40px] ">
                <div className='container flex flex-wrap xl:flex-nowrap sm:gap-[80px] gap-[30px] items-center justify-center'>
                    <div className='xl:w-1/2 order-2 xl:order-1 flex sm:gap-[47px] gap-[20px]' >
                        <div>
                            <img src={whystory1} alt="" className='w-[100%] h-auto mb-[90px]' />
                        </div>
                        <div>
                            <img src={whystory2} alt="" className='w-[100%] h-auto mt-[90px]' />
                        </div>

                    </div>

                    <div className="xl:w-1/2 order-1 xl:order-2">
                        <h2 data-aos="fade-left">Why</h2>
                        <h1 data-aos="fade-left">StoryNoi</h1>

                        <p className='sm:mt-[40px] mt-[20px]' data-aos="fade-left">Create Stories About Anything You Can Imagine. Create & Share Your Stories With Friends And Family Through Social Media. Publish Your Stories Online Or Turn Your Stories Into Books. It Is The Perfect Tool For Anyone Who Loves To Create Stories. It's Easy To Use, Affordable, And Fun. So What Are You Waiting For? Start Creating Your Own Stories Today!</p>

                        <p className='!font-bold lg:mt-[45px] mt-[10px]' data-aos="fade-up">Here Are Some Additional Benefits Of Using Storynoi:</p>

                        <ul className='storNoi-ul lg:mt-[29px] mt-[10px] '>
                            <li data-aos="fade-up"><img src={listMark} alt="" className='mt-[12px]' />It's A Great Way To Relax And Have Fun.</li>
                            <li data-aos="fade-up" data-aos-delay="100"><img src={listMark} alt="" className='mt-[12px]' />It's A Great Way To Express Your Creativity.</li>
                            <li data-aos="fade-up" data-aos-delay="200"><img src={listMark} alt="" className='mt-[12px]' />It's A Great Way To Learn About Different Cultures And Perspectives.</li>
                            <li data-aos="fade-up" data-aos-delay="300"><img src={listMark} alt="" className='mt-[12px]' />It's A Great Way To Connect With Other People Who Love To Create Stories.</li>
                            <li data-aos="fade-up" data-aos-delay="400"><img src={listMark} alt="" className='mt-[12px]' />If You're Looking For A Way To Unleash Your Creativity, Connect With Other People, Or Learn</li>
                            <li data-aos="fade-up" data-aos-delay="500"><img src={listMark} alt="" className='mt-[12px]' />About Different Cultures, Then Storynoi Is The Perfect Tool For You.</li>


                        </ul>
                    </div>
                </div>
            </section>


            <section id='idea' className="bg-[url('./assets/idea-bg.png')] sm:py-[75px] py-[40px]">
                <div className="container flex flex-wrap lg:flex-nowrap items-center">
                    <div className='lg:w-1/2 w-full  '>
                        <h1 data-aos="fade-right" className='!text-white'>Go Live! Create Your Ebook or Print It!</h1>
                        <p data-aos="fade-right" className='!text-white sm:mt-[40px] mt-[20px] lg:max-w-[655px] leading-[32px] '>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                    </div>

                    <div className="lg:w-1/2 w-full justify-items-center">
                        <img src={ideaimg} alt="" className='m-[-30px]' data-aos="fade-left" />
                    </div>
                </div>
            </section>








        </>
    )
}

export default Home