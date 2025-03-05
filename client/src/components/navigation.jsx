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
    }, [])

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

                    {/* Close Icon */}
                    <X
                        size={52}
                        className={`absolute inset-0  bg-yellow-200/40 backdrop-blur-xs rounded-t-2xl p-1 transition-all duration-500 ease-in-out transform
                                ${isOpen ? 'opacity-100 scale-100 rotate-0' : 'opacity-0 scale-75 rotate-45'}`}
                    />
                </button>


                {/* mobile navigation  */}

                <nav
                    className={`lg:hidden bg-gradient-to-tr from-sky-500/40 to-yellow-200/40  backdrop-blur-xs absolute top-[54px] right-0 p-[40px] rounded-tl-4xl rounded-bl-4xl w-full sm:w-[500px]  overflow-hidden duration-500 
                    
                    ${isOpen ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0 pointer-events-none'}`}
                >
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
