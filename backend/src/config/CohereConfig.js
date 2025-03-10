import { CohereClient } from "cohere-ai";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();  


// Initialize Cohere Client
const cohere = new CohereClient({
    token: process.env.COHERE_API_KEY  
});

export default cohere;
