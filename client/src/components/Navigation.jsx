import { useEffect, useState } from 'react';
import logo from '../assets/logo.png';
import { Menu, X } from 'lucide-react';
import { Link } from 'react-scroll';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import AOS from "aos";
import "aos/dist/aos.css";

function Navigation() {
    const [isOpen, setOpen] = useState(false);
    const [isScrolled, setScrolled] = useState(false);
    const location = useLocation();

    // List of paths where the menu should be hidden
    const hideMenuPath = ['/story', '/checkout', '/digitalEbook'];


    useEffect(() => {
        AOS.init({
            duration: 1000,
            once: true,
            easing: "ease-in-out",
        });
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 0);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        document.body.classList.toggle('overflow-hidden', isOpen);
    }, [isOpen]);

    return (
        <div className={`fixed right-0 left-0 z-30 transition-all duration-500 
            ${isScrolled ? 'top-0 w-full bg-white/80 backdrop-blur-sm sm:py-3 py-1 shadow-md' : 'sm:top-[40px] top-[20px]'}
        `} >
            <div className='container flex justify-between items-center ' data-aos="fade-down">
                <RouterLink to="/" className='cursor-pointer'>
                    <img src={logo} alt="Logo" className="sm:w-[100%] h-auto w-[100px]" />
                </RouterLink>

                {/* Hide menu if the current page is in hideMenuPath */}
                {!hideMenuPath.includes(location.pathname) && (
                    <>
                        {/* Desktop Navigation */}
                        <nav className='hidden lg:block'>
                            <ul className="flex gap-[50px] items-center">
                                <li>
                                    <Link to='about' smooth={true} duration={500} spy={true} offset={-87} activeClass="!text-[#FF8E00]">
                                        About Us
                                    </Link>
                                </li>
                                <li>
                                    <Link to='whystoryNoi' smooth={true} duration={500} spy={true} offset={-87} activeClass="!text-[#FF8E00]">
                                        Why StoryNoi
                                    </Link>
                                </li>
                                <li>
                                    <Link to='idea' smooth={true} duration={500} spy={true} offset={-87} activeClass="!text-[#FF8E00]">
                                        Idea
                                    </Link>
                                </li>
                                <RouterLink to="/login" className="btn ml-[30px] font-semibold px-[44px] py-[12px] border-2 border-black rounded-[12px]">
                                    <button type="button">Log In</button>
                                </RouterLink>
                            </ul>
                        </nav>

                        {/* Mobile Menu Button */}
                        <button className="lg:hidden relative w-[52px] h-[52px] flex items-center justify-end" onClick={() => setOpen(!isOpen)}>
                            <Menu size={32} />
                        </button>

                        {/* Mobile Navigation */}
                        <nav
                            className={`lg:hidden bg-white backdrop-blur-xs absolute right-0 p-[20px] w-full h-screen overflow-hidden duration-500 
                                ${isOpen ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0 pointer-events-none'} 
                                ${isScrolled ? 'top-0' : 'sm:top-[-40px] top-[-20px]'}
                            `}
                        >
                            <div className='flex justify-between items-center'>
                                <RouterLink to="/" className='cursor-pointer' onClick={() => setOpen(false)}>
                                    <img src={logo} alt="Logo" className="sm:w-[150px] w-[100px]" />
                                </RouterLink>
                                <X size={32} onClick={() => setOpen(false)} />
                            </div>

                            <ul className="flex flex-col gap-[25px] items-center justify-center h-full">
                                <li>
                                    <Link to='about' smooth={true} duration={500} spy={true} offset={-60} onClick={() => setOpen(false)} activeClass="!text-[#FF8E00]">
                                        About Us
                                    </Link>
                                </li>
                                <li>
                                    <Link to='whystoryNoi' smooth={true} duration={500} spy={true} offset={-60} onClick={() => setOpen(false)} activeClass="!text-[#FF8E00]">
                                        Why StoryNoi
                                    </Link>
                                </li>
                                <li>
                                    <Link to='idea' smooth={true} duration={500} spy={true} offset={-60} onClick={() => setOpen(false)} activeClass="!text-[#FF8E00]">
                                        Idea
                                    </Link>
                                </li>
                                <RouterLink to="/login" className="btn font-semibold px-[45px] py-[12px] border-2 border-black rounded-[12px]" onClick={() => setOpen(false)}>
                                    <button type="button">Log In</button>
                                </RouterLink>
                            </ul>
                        </nav>
                    </>
                )}
            </div>
        </div>
    );
}

export default Navigation;
