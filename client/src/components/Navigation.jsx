import { useEffect, useState } from 'react';
import logo from '../assets/logo.png';
import { Menu, X } from 'lucide-react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";

function Navigation() {
    const [isOpen, setOpen] = useState(false);
    const [isScrolled, setScrolled] = useState(false);
    const [activeSection, setActiveSection] = useState(""); // Track active section
    const location = useLocation();
    const navigate = useNavigate();

    const hideMenuPath = ['/story', '/checkout', '/digitalEbook'];



    useEffect(() => {
        AOS.init({ duration: 1000 });
    }, []);

    // Handle smooth scrolling when clicking a menu item
    useEffect(() => {
        const handleSmoothScroll = (event) => {
            if (event.target.classList.contains("scroll-link")) {
                event.preventDefault();

                navigate(window.location.pathname, { replace: true });

                const targetId = event.target.getAttribute("href").replace("/#", "");
                const targetElement = document.getElementById(targetId);

                if (targetElement) {
                    targetElement.scrollIntoView({ behavior: "smooth" });
                }
            }
        };

        document.addEventListener("click", handleSmoothScroll);
        return () => document.removeEventListener("click", handleSmoothScroll);
    }, []);

    // Detect scrolling and update the active section
    useEffect(() => {
        const sections = ["about", "whystoryNoi", "idea"];

        const handleScroll = () => {
            setScrolled(window.scrollY > 0);

            let currentSection = "";
            for (let section of sections) {
                const element = document.getElementById(section);
                if (element) {
                    const rect = element.getBoundingClientRect();
                    if (rect.top <= 150 && rect.bottom >= 150) {
                        currentSection = section;
                        break;
                    }
                }
            }
            setActiveSection(currentSection);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        document.body.classList.toggle('overflow-hidden', isOpen);
    }, [isOpen]);

    return (
        <div className={`fixed right-0 left-0 z-30 transition-all duration-500 
            ${isScrolled ? 'top-0 w-full bg-white/80 backdrop-blur-sm sm:py-3 py-1 shadow-md' : 'sm:top-[40px] top-[20px]'}`}
        >
            <div className='container  flex justify-between items-center' data-aos="fade-down">
                
                {/* ✅ Always Show the Logo */}
                <RouterLink to="/" className='cursor-pointer'>
                    <img src={logo} alt="Logo" className="sm:w-[100%] h-auto w-[100px]" />
                </RouterLink>

                {/* ✅ Hide Only the Navigation, Not the Logo */}
                {!hideMenuPath.includes(location.pathname) && (
                    <>
                        <nav className='hidden lg:block'>
                            <ul className="flex gap-[50px] items-center">
                                <li>
                                    <RouterLink to="/#about" className={`scroll-link ${activeSection === "about" ? "!text-[#FF8E00]" : ""}`}>
                                        About Us
                                    </RouterLink>
                                </li>
                                <li>
                                    <RouterLink to="/#whystoryNoi" className={`scroll-link ${activeSection === "whystoryNoi" ? "!text-[#FF8E00]" : ""}`}>
                                        Why StoryNoi
                                    </RouterLink>
                                </li>
                                <li>
                                    <RouterLink to="/#idea" className={`scroll-link ${activeSection === "idea" ? "!text-[#FF8E00]" : ""}`}>
                                        Idea
                                    </RouterLink>
                                </li>
                                <li>
                                    <RouterLink to="/login" className="btn ml-[30px] font-semibold px-[44px] py-[12px] border-2 border-black rounded-[12px]">
                                        <button type="button">Log In</button>
                                    </RouterLink>
                                </li>
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
                                ${isScrolled ? 'top-0' : 'sm:top-[-40px] top-[-20px]'}`}
                        >
                            <div className='flex justify-between items-center'>
                                <RouterLink to="/" className='cursor-pointer' onClick={() => setOpen(false)}>
                                    <img src={logo} alt="Logo" className="sm:w-[150px] w-[100px]" />
                                </RouterLink>
                                <X size={32} onClick={() => setOpen(false)} />
                            </div>

                            <ul className="flex flex-col gap-[25px] items-center justify-center h-full">
                                <li>
                                    <RouterLink to="/#about" className={`scroll-link ${activeSection === "about" ? "!text-[#FF8E00]" : ""}`}>
                                        About Us
                                    </RouterLink>
                                </li>
                                <li>
                                    <RouterLink to="/#whystoryNoi" className={`scroll-link ${activeSection === "whystoryNoi" ? "!text-[#FF8E00]" : ""}`}>
                                        Why StoryNoi
                                    </RouterLink>
                                </li>
                                <li>
                                    <RouterLink to="/#idea" className={`scroll-link ${activeSection === "idea" ? "!text-[#FF8E00]" : ""}`}>
                                        Idea
                                    </RouterLink>
                                </li>
                                <li>
                                    <RouterLink to="/login" className="btn font-semibold px-[45px] py-[12px] border-2 border-black rounded-[12px]" onClick={() => setOpen(false)}>
                                        <button type="button">Log In</button>
                                    </RouterLink>
                                </li>
                            </ul>
                        </nav>
                    </>
                )}
            </div>
        </div>
    );
}

export default Navigation;
