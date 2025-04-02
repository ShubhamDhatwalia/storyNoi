import React, { useEffect, useState, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import Storyfooter from './Storyfooter';
import { ParseStory } from './ParseStory';
import axios from 'axios';
import storyTopCenter from "../assets/story-top-center.png";
import storyLeft from "../assets/story-left.png";
import stroyTopRight from "../assets/story-top-right.png"



axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL;


function Story() {
    const [storySections, setStorySections] = useState([]);
    const [isStoryGenerated, setIsStoryGenerated] = useState(false);
    const location = useLocation();
    const idea = location.state?.idea;
    const fetched = useRef(false);
    const scrollRef = useRef(null);



    // Load story from localStorage
    useEffect(() => {
        const savedStory = localStorage.getItem('generatedStory');
        if (savedStory) {
            const parsedStory = JSON.parse(savedStory);
            setStorySections(parsedStory);
            setIsStoryGenerated(parsedStory.length > 0);
        } else {
            setIsStoryGenerated(false);
        }
    }, []);

    // Fetch new story if not in localStorage
    useEffect(() => {
        const fetchStory = async () => {
            if (!idea || fetched.current) return; // Prevent duplicate fetch calls

            // Check if story already exists in localStorage
            const savedStory = localStorage.getItem('generatedStory');
            if (savedStory) {
                const parsedStory = JSON.parse(savedStory);
                if (parsedStory.length > 0) {
                    setStorySections(parsedStory);
                    setIsStoryGenerated(true);
                    return; // Stop further execution, no need to fetch
                }
            }

            fetched.current = true;

            try {
                const response = await axios.post(`/story/generateStory`, { idea });

                const formattedStory = ParseStory(response.data.story);
                setStorySections(formattedStory);

                if (formattedStory.length > 0) {
                    setIsStoryGenerated(true);
                    localStorage.setItem('generatedStory', JSON.stringify(formattedStory));
                } else {
                    setIsStoryGenerated(false);
                }
            } catch (error) {
                console.error("Error fetching story:", error);
                setIsStoryGenerated(false);
            }
        };

        fetchStory();
    }, [idea]);


    // Auto-scroll to latest section
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [storySections]);

    // Handle localStorage updates (sync across tabs)
    useEffect(() => {
        const handleStorageChange = () => {
            const savedStory = localStorage.getItem('generatedStory');
            if (savedStory) {
                const updatedStory = JSON.parse(savedStory);
                console.log("Loaded Story Data:", updatedStory);
                setStorySections(updatedStory);
                setIsStoryGenerated(updatedStory.length > 0);
            } else {
                setStorySections([]);
                setIsStoryGenerated(false);
            }
        };

        window.addEventListener("storage", handleStorageChange);
        return () => window.removeEventListener("storage", handleStorageChange);
    }, []);

    return (
        <>
            <div className="bg-[url('./assets/create-story-bg.png')] md:py-[160px] py-[100px] bg-no-repeat bg-center bg-cover relative">


                <img src={storyTopCenter} alt="" className='absolute right-[40%] top-0' />
                <img src={storyLeft} alt="" className='absolute left-0 top-[270px]' />
                <img src={stroyTopRight} alt="" className='absolute right-0 top-0' />

                <div className="container">
                    <div className='bg-[#F6F6F6] h-[100vh] p-[20px] md:py-[70px] rounded-[22px] relative z-10'>
                        <div id='story'
                            ref={scrollRef}
                            className="generatedStory flex flex-col sm:gap-[38px] gap-[20px] h-[100%] overflow-y-auto rounded-[10px] md:px-[50px]"
                        >
                            <div className='printable-content' >
                                {storySections.length > 0 ? (
                                    storySections.map((section, index) => (
                                        <div key={index} className="bg-white sm:p-[30px] p-[10px] rounded-[10px] shadow-lg" >
                                            {section.imageURL && (
                                                <img
                                                    src={section.imageURL}
                                                    alt="Story Section Image"
                                                    className="w-full h-auto rounded-lg mb-4"
                                                />
                                            )}
                                            <div className="text-xl font-bold" dangerouslySetInnerHTML={{ __html: section.heading }} />
                                            <div className="text-base" dangerouslySetInnerHTML={{ __html: section.content.join("") }} />
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-lg font-semibold">Generating story...</p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Storyfooter isStoryGenerated={isStoryGenerated} />
        </>
    );
}

export default Story;
