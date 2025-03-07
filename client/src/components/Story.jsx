import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import axios from 'axios';

function story() {


    const [story, setStory] = useState()


    const location = useLocation();
    const idea = location.state?.idea;
    console.log(idea);



    //  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
    // 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

    useEffect(() => {


        const fetchStory = async () => {

            try {
                const response = await axios.post('https://openrouter.ai/api/v1/chat/completions',
                    {
                        model: "google/gemini-2.0-pro-exp-02-05:free",
                        "messages": [
                            {
                                "role": "user",
                                "content": [
                                    {
                                        "type": "text",
                                        "text": `write a story on topic :${idea}  title of story should be in <h1> tag and  sub heading ahould be in h2 tag and subheadings content should be in p tag `
                                    },

                                ]

                            }
                        ]
                    },
                    {
                        headers: {
                            Authorization: "Bearer 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",
                            "Content-Type": "application/json"
                        }
                    }

                );

                console.log(response)

                setStory(response.data.choices[0].message.content)
            }

            catch {
                console.log("error");
            }


        }


        fetchStory();

    }, [idea])


    return (
        <>
            <div className="bg-[url('./assets/create-story-bg.png')] py-[200px] bg-no-repeat bg-center bg-cover ">





                <div>
                    {story}
                </div>





            </div>
        </>
    )
}

export default story