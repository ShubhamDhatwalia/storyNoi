import cohere from 'cohere-ai';
import dotenv from 'dotenv';

dotenv.config();

cohere.init(process.env.COHERE_API_KEY);

export default CohereConfig; 