import cohere from '../config/CohereConfig.js';

async function generateStory(req, res) {
    try {

        const { idea } = req.body;

        const response = await cohere.generate({
            model: "command",
            prompt: `Write a structured long story on ${idea} with at least 20000 words.
    - Title inside <h1> tag
    - Sections inside <h2> tag
    - Paragraphs inside <p> tag
    Make it detailed and engaging.`,
            max_tokens: 50000,
        });

        const story = response.generations[0].text;
        res.json({ story });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export default generateStory;



// COHERE_API_KEY=fKtVTWyarIjzRCZ6Nl5gVvnAlXA8H31MbQVgTLJ9