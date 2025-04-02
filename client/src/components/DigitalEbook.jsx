import React from "react";
import HTMLFlipBook from "react-pageflip";
import storyTopCenter from "../assets/story-top-center.png";
import storyLeft from "../assets/story-left.png";
import stroyTopRight from "../assets/story-top-right.png"

const DigitalEbook = () => {
    // Retrieve and parse story data from localStorage
    const storyData = JSON.parse(localStorage.getItem("generatedStory")) || [];

    return (

        <>

            <div className="bg-[url('./assets/create-story-bg.png')]  bg-no-repeat bg-center bg-cover relative">

                <img src={storyTopCenter} alt="" className='absolute right-[40%] top-0' />
                <img src={storyLeft} alt="" className='absolute left-0 top-[270px]' />
                <img src={stroyTopRight} alt="" className='absolute right-0 top-0' />


                <div className="book-container !py-[170px]">
                    <HTMLFlipBook
                        width={720} // Default width
                        height={1000} // Default height
                        size="stretch" // Stretch to fit container
                        minWidth={425} // Minimum width
                        maxWidth={720} // Maximum width
                        minHeight={1000}
                        maxHeight={1500}
                        className="flipbook"
                    >
                        {storyData.map((page, index) => (
                            <div key={index} className="page">


                                {/* Render Image (if available) */}
                                {page.imageURL && <img src={page.imageURL} alt="Story Image" className="page-image" />}

                                {/* Render Heading */}
                                <div dangerouslySetInnerHTML={{ __html: page.heading }} />

                                {/* Render Content */}
                                {page.content && (
                                    <div>
                                        {page.content.map((para, i) => (
                                            <p key={i} dangerouslySetInnerHTML={{ __html: para }} className="!px-[20px] !py-[10px]" />
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                    </HTMLFlipBook>
                </div>
            </div>

        </>
    );
};

export default DigitalEbook;
