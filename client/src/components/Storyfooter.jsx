import React, { useEffect, useState } from 'react';
import sendbtn from '../assets/sendbtn.png';
import axios from 'axios';
import { validateIdea } from './helper/Validation';
import { ParseStory } from './ParseStory';
import DownloadPopup from './downloadPopup';
import  {blobToBase64}  from './blobtobase64';



function Storyfooter({ isStoryGenerated }) {
    const [startConversation, setConversation] = useState(false);
    const [isError, setIsError] = useState(false);
    const [prompt, setPrompt] = useState("");
    const [story, setStory] = useState([]);
    const [isGeneratingImages, setIsGeneratingImages] = useState(false);
    const [imagesGenerated, setImagesGenerated] = useState(false);
    const [showPopup, setShowPopup] = useState(false);




    const handlePopup = () => {
        setShowPopup(true);

    }

    useEffect(()=>{
        if(showPopup){
            document.body.style.overflow = 'hidden';
        }else{
            document.body.style.overflow = 'auto';

        }
    })


    useEffect(() => {
        const loadStoryData = () => {
            const storyData = localStorage.getItem('generatedStory');

            if (storyData) {
                setStory(JSON.parse(storyData));

            }
        };

        window.addEventListener("storage", loadStoryData);
        loadStoryData();

        return () => window.removeEventListener("storage", loadStoryData);
    }, [isStoryGenerated]);


    const handleImageGeneration = async () => {

        localStorage.removeItem('generatedStory');
        window.dispatchEvent(new Event("storage"));



        if (!story.length) {
            console.log("No story found");
            return;
        }

        setIsGeneratingImages(true);


        let tempStory = [...story];

        let updatedStory = [];


        for (let i = 0; i < tempStory.length; i++) {
            const section = tempStory[i];
            console.log(section.content[0]);

            const prompt = `Create an artistic image for book : ${section.content}`;

            try {
                const response = await axios.post(
                    "https://router.huggingface.co/hf-inference/models/black-forest-labs/FLUX.1-dev",
                    { inputs: prompt },
                    {
                        headers: {
                            Authorization: `Bearer ${import.meta.env.VITE_IMG_GENERATION_KEY}`,
                            "Content-Type": "application/json",
                        },
                        responseType: 'blob'
                    }
                );

                const imageURL = await blobToBase64(response.data);
                console.log(response);
                updatedStory[i] = { imageURL, ...section };
                localStorage.setItem('generatedStory', JSON.stringify(updatedStory));
                window.dispatchEvent(new Event("storage"));


            } catch (error) {
                console.log(`Error generating image for section ${i}:`, error.response?.data || error.message);
            }
        }

        // Save updated story with images in localStorage
        localStorage.setItem('generatedStory', JSON.stringify(updatedStory));
        setStory(updatedStory);
        window.dispatchEvent(new Event("storage"));

        setStory(updatedStory);
        setIsGeneratingImages(false);
        setImagesGenerated(true);
        console.log(imagesGenerated);
    };


    const handleSubmit = async (e) => {
        e.preventDefault();

        const tempPrompt = prompt;

        if (!tempPrompt.trim()) return;

        setPrompt("");

        const error = await validateIdea(tempPrompt);

        if (error) {
            setIsError(error);
        } else {
            setIsError(false);
            try {
                localStorage.removeItem('generatedStory');
                window.dispatchEvent(new Event("storage"));


                axios.post('http://localhost:5000/story/generateStory', {
                    prompt: tempPrompt,
                    continueStory: true
                }).then(response => {
                    const formattedStory = ParseStory(response.data.story);
                    localStorage.setItem('generatedStory', JSON.stringify(formattedStory));

                    window.dispatchEvent(new Event("storage"));
                }).catch(error => {
                    console.error("Error fetching story:", error);
                });

            } catch (error) {
                console.error("Unexpected error:", error);
            }
        }
    };

    const handleChange = (e) => {
        setPrompt(e.target.value);
        setIsError(false);
    };

    return (
        <>
            <footer className='bg-[#5CE1E6] py-[32px] fixed bottom-0 left-0 right-0 px-[70px]'>
                <div className='container'>
                    <div className={`rounded-[20px] border border-[rgba(0,0,0,0.10)] bg-white shadow-md max-w-[1300px] mx-auto p-[10px] ${isError ? 'border-2 border-red-500' : 'border-2 border-white '}`}>
                        {!startConversation && !imagesGenerated && (
                            <div className='flex gap-[16px]'>
                                <button
                                    className={`storybtn hover:bg-[#69d8db] bg-[#5CE1E6] rounded-[12px] w-1/2 ${!isStoryGenerated || isGeneratingImages ? "opacity-50 !cursor-not-allowed" : ""}`}
                                    onClick={() => isStoryGenerated && setConversation(true)}
                                    
                                >
                                    Prefer any changes
                                </button>

                                <button className={`storybtn hover:bg-[#f38f14] bg-[#FF8E00] rounded-[12px] w-1/2 !text-white ${!isStoryGenerated ||  isGeneratingImages ? "opacity-50 !cursor-not-allowed" : ""} `} onClick={handleImageGeneration}>
                                    Generate pics
                                </button>
                            </div>
                        )}

                        {startConversation && !imagesGenerated && (
                            <form className='relative' onSubmit={handleSubmit}>
                                <input id='changesInput' type="text" value={prompt} className="bg-none w-full py-[15px] pl-[30px] pr-[320px] focus:outline-none" placeholder='Continue the Conversation...' onChange={handleChange} />

                                <div className='absolute flex gap-[30px] top-[50%] right-[0px] transform -translate-y-[50%] '>
                                    <button type='submit'>
                                        <img src={sendbtn} alt="" className={`w-[74px] h-[60px] ${!isStoryGenerated || isGeneratingImages ? "opacity-50 !cursor-not-allowed" : ""}`} />
                                    </button>

                                    <button className={`storybtn hover:bg-[#f38f14] bg-[#FF8E00] rounded-[12px] !text-white ${!isStoryGenerated || isGeneratingImages ? "opacity-50 !cursor-not-allowed" : ""} `} onClick={handleImageGeneration}>
                                        Generate pics
                                    </button>
                                </div>
                            </form>
                        )}


                        {imagesGenerated && (
                            <div className='flex gap-[16px]'>
                                <button
                                    className={`storybtn hover:bg-[#69d8db] bg-[#5CE1E6] rounded-[12px] w-1/2 `} onClick={handlePopup}

                                >
                                    Download ebook
                                </button>

                                <button className={`storybtn hover:bg-[#f38f14] bg-[#FF8E00] rounded-[12px] w-1/2 !text-white `}>
                                    Print the book
                                </button>
                            </div>
                        )}


                    </div>
                </div>
            </footer>





            {showPopup && (
                <DownloadPopup onClose={()=> setShowPopup(false)} />
            )}
        </>
    );
}

export default Storyfooter;
