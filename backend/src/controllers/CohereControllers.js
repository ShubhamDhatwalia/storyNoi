import cohere from '../config/CohereConfig.js';

let previousStory = "";

async function generateStory(req, res) {
    try {
        const { idea, prompt, continueStory } = req.body;

        let fullPrompt;

        if (continueStory && previousStory) {
            // Append to the existing story
            fullPrompt = `Continue the story while maintaining the style, tone, and structure of the previous content. Ensure that the new content smoothly extends the existing story.
             Previous Story:\n${previousStory}\n\n
             Now, continue by strictly following this instruction: ${prompt} 
             - Maintain story format as it was.
             - Do changes only in that story whatever you want.
             - return full story with changes in it.`;
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
