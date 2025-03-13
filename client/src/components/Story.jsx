import React, { useEffect, useState, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import Storyfooter from './Storyfooter';
import { ParseStory } from './ParseStory';
import axios from 'axios';

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
            if (!idea || fetched.current) return;
            fetched.current = true;

            try {
                const response = await axios.post('http://localhost:5000/story/generateStory', { idea });

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
            <div className="bg-[url('./assets/create-story-bg.png')] py-[160px] bg-no-repeat bg-center bg-cover">
                <div className="container">
                    <div id='story' className='bg-[#F6F6F6] h-[100vh] p-[20px] py-[70px] rounded-[22px]'>
                        <div id='story'
                            ref={scrollRef} 
                            className="generatedStory flex flex-col gap-[38px] h-[100%] overflow-y-auto rounded-[10px] px-[50px]"
                        >
                            {storySections.length > 0 ? (
                                storySections.map((section, index) => (
                                    <div key={index} className="bg-white p-[30px] rounded-[10px] shadow-lg">
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

            <Storyfooter isStoryGenerated={isStoryGenerated} />
        </>
    );
}

export default Story;
