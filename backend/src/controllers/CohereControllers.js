import cohere from '../config/CohereConfig.js';

let previousStory = "";

async function generateStory(req, res) {
    try {
        const { idea, prompt, continueStory } = req.body;

        let fullPrompt;

        if (continueStory && previousStory) {
            // Append to the existing story
            fullPrompt = `Continue the story while maintaining the same style, tone, and structure as the previous content. 
            The new content must seamlessly extend the existing story without breaking its flow Previous Story: ${previousStory}
            
            Now, modify the story strictly based on this instruction: ${prompt}
            - Keep the story format exactly as it was.
            - Modify only the relevant parts as per the given instruction.
            - Return the full story with the applied changes.
            - Do not add any extra messages like "updated version" or explanations—just return the updated story.`;
        } else {
            // Start a new story
            fullPrompt = `Write a structured long story on ${idea} with at least 20000 words.
            - Title inside <h1> tag
            - Sections inside <h2> tag
            - Any Section should not be empty
            - Paragraphs inside <p> tag
            Make it detailed and engaging.`;
            previousStory = ""; // Reset previous story when starting fresh
        }

        const response = await cohere.generate({
            model: "command",
            prompt: fullPrompt,
            max_tokens: 10000, // Adjust based on your needs
        });

        const newStoryPart = response.generations[0].text;
        previousStory = newStoryPart; // Append new content

        res.json({ story: previousStory });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export default generateStory;
