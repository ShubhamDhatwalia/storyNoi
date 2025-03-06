import { useEffect, useState } from 'react';
import logo from '../assets/logo.png';
import { Menu, X } from 'lucide-react';
import { Link } from 'react-scroll';

function Navbar() {

    const [isOpen, setOpen] = useState(false);
    const [isScrolled, setScrolled] = useState(false);


    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY ) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        }
        window.addEventListener('scroll', handleScroll);

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);




    useEffect(()=>{
        if(isOpen){
            document.body.classList.add('overflow-hidden');
        }else{
            document.body.classList.remove('overflow-hidden');
            
        }
    }, [isOpen]);




    return (
        <div className={`fixed right-0 left-0 z-10 transition-all duration-500 
            ${isScrolled ? 'top-0 w-full bg-white/80 backdrop-blur-sm py-3 shadow-md' : 'top-[40px]  '}
        `}>


            <div className='container flex justify-between items-center'>
                <Link to='top' smooth={true} duration={500} className='cursor-pointer'>
                    <img src={logo} alt="Logo" className="w-[150px]" />
                </Link>




                <nav className='hidden lg:block' >
                    <ul className="flex gap-[50px] items-center">
                        <li>

                            <Link to='about' smooth={true} duration={500} spy={true} offset={-87}
                                activeClass="!text-[#FF8E00]">About Us</Link>

                        </li>
                        <li>

                            <Link to='storyNoi' smooth={true} duration={500} spy={true} offset={-87}
                                activeClass="!text-[#FF8E00]">Why StoryNoi</Link>

                        </li>
                        <li>

                            <Link to='idea' smooth={true} duration={500} spy={true} offset={-87}
                                activeClass="!text-[#FF8E00]">Idea</Link>

                        </li>
                        <a
                            href="#login"
                            className="btn ml-[80px] font-semibold px-[45px] py-[18px] border-2 border-black rounded-[12px] border-solid "
                        >
                            <button type="button">Login</button>
                        </a>
                    </ul>
                </nav>


                <button className="lg:hidden relative w-[52px] h-[52px]" onClick={() => setOpen(!isOpen)}>
                    {/* Menu Icon */}
                    <Menu
                        size={42}
                        className={`absolute inset-0 transition-all duration-500 ease-in-out transform
                                ${isOpen ? 'opacity-0 scale-75 rotate-45' : 'opacity-100 scale-100 rotate-0'}`}
                    />

                   
                </button>


                {/* mobile navigation  */}

                <nav
                    className={`lg:hidden bg-white  backdrop-blur-xs  top-[-40px] absolute right-0 p-[40px]  w-full h-screen   overflow-hidden duration-500 
                    
                    ${isOpen ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0 pointer-events-none'}`}
                >

                     {/* Close Icon */}
                     <X
                        size={42}
                        className={`absolute right-[20px]  transition-all duration-500 ease-in-out transform`}
                        onClick={()=> setOpen(!isOpen)}
                    />

                    <ul className="flex flex-col gap-[25px] items-center justify-center h-full">
                        <li>
                            <Link to='about' smooth={true} duration={500} spy={true} offset={-87}
                                activeClass="!text-[#FF8E00]">About Us</Link>
                        </li>
                        <li>
                            <Link to='storyNoi' smooth={true} duration={500} spy={true} offset={-87}
                                activeClass="!text-[#FF8E00]">Why StoryNoi</Link>
                        </li>
                        <li>
                            <Link to='idea' smooth={true} duration={500} spy={true} offset={-87}
                                activeClass="!text-[#FF8E00]">Idea</Link>
                        </li>
                        <a
                            href="#login"
                            className="btn font-semibold px-[45px] py-[18px] border-2 border-black rounded-[12px] border-solid "
                        >
                            <button type="button">Login</button>
                        </a>
                    </ul>
                </nav>
            </div>

        </div>
    );
}

export default Navbar;
