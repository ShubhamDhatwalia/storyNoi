import express from 'express';
import generateStory from '../controllers/CohereControllers.js';

const cohereRouter = express.Router();


cohereRouter.post('/generateStory', generateStory);

export default cohereRouter;