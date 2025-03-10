import React, { useEffect, useState, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

function Story() {
    const [storySections, setStorySections] = useState([]);
    const location = useLocation();
    const idea = location.state?.idea;
    const fetched = useRef(false); // Prevent duplicate calls


    useEffect(() => {
        const fetchStory = async () => {
            if (!idea || fetched.current) return; // Prevent duplicate call
            fetched.current = true; // Set flag to true after first call

            try {
                const response = await axios.post('http://localhost:5000/story/generateStory', { idea });

                // Parse the response into structured sections
                const formattedStory = parseStory(response.data.story);
                setStorySections(formattedStory);

            } catch (error) {
                console.error("Error fetching story:", error);
            }
        };

        fetchStory();
    }, [idea]);

    // Function to parse story and group headings with related content
    const parseStory = (storyText) => {
        if (!storyText) return [];

        const lines = storyText.split(/\n+/); // Split by new lines
        const sections = [];
        let currentSection = null;

        lines.forEach((line) => {
            if (line.match(/^<h[1-6]>.*<\/h[1-6]>$/)) {
                // If the line is a heading, start a new section
                if (currentSection) sections.push(currentSection);
                currentSection = { heading: line, content: [] };
            } else if (currentSection) {
                // If it's content, add it to the current section
                currentSection.content.push(line);
            }
        });

        if (currentSection) sections.push(currentSection); // Push last section

        return sections;
    };

    return (
        <div className="bg-[url('./assets/create-story-bg.png')] py-[160px] bg-no-repeat bg-center bg-cover ">
            <div className="container">
                <div className='bg-[#F6F6F6] h-[80vh] p-[20px] py-[70px] rounded-[22px] '>
                    <div className="generatedStory flex flex-col gap-[38px] h-[100%] overflow-y-auto rounded-[10px] px-[50px]">
                        {storySections.length > 0 ? (
                            storySections.map((section, index) => (
                                <div key={index} className="bg-white p-[30px] rounded-[10px] shadow-lg">
                                    <div className="text-xl font-bold " dangerouslySetInnerHTML={{ __html: section.heading }} />
                                    <div className="text-base" dangerouslySetInnerHTML={{ __html: section.content.join("") }} />
                                </div>
                            ))
                        ) : (
                            <p>Generating story...</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Story;
