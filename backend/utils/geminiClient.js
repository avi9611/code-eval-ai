import dotenv from 'dotenv';
dotenv.config();

import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize Gemini API
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY || '');

// Evaluate code with Gemini
export async function evaluateCodeWithGemini(taskName, codeSnippet) {
  try {
    // Use text-only model for code evaluation
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    const prompt = `
      You are an expert code evaluator. Please evaluate the following code for the task: "${taskName}".
      
      Code:
      \`\`\`
      ${codeSnippet}
      \`\`\`
      
      Provide a thorough evaluation with the following:
      1. Overall score (0-100)
      2. Detailed feedback on:
         - Code quality and readability
         - Efficiency and performance
         - Best practices followed
         - Potential improvements
      
      Format your response as follows:
      SCORE: [number between 0-100]
      FEEDBACK: [your detailed feedback]
    `;

    const result = await model.generateContent({
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
    });
    const response = result.response.text();
    
    // Parse response
    const scoreMatch = response.match(/SCORE:\s*(\d+)/i);
    const feedbackMatch = response.match(/FEEDBACK:\s*([\s\S]+)/i);
    
    const score = scoreMatch ? parseInt(scoreMatch[1], 10) : 50;
    const feedback = feedbackMatch ? feedbackMatch[1].trim() : 'No detailed feedback available.';
    
    return { score, feedback };
  } catch (error) {
    console.error('Error evaluating code with Gemini:', error);
    return { 
      score: 0, 
      feedback: 'An error occurred during evaluation. Please try again later.' 
    };
  }
}

// Evaluate screenshot with Gemini
export async function evaluateScreenshotWithGemini(taskName, imageBuffer) {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    const imageBase64 = imageBuffer.toString('base64');

    const prompt = `
      You are an expert UI/UX evaluator. Please evaluate the screenshot for the task: "${taskName}".

      Provide a thorough evaluation with the following:
      1. Overall score (0-100)
      2. Detailed feedback on:
         - Visual design and aesthetics
         - User experience and usability
         - Accessibility considerations
         - Potential improvements

      Format your response as follows:
      SCORE: [number between 0-100]
      FEEDBACK: [your detailed feedback]
    `;

    const result = await model.generateContent({
      contents: [
        {
          role: 'user',
          parts: [
            { text: prompt },
            {
              inlineData: {
                mimeType: 'image/jpeg',
                data: imageBase64,
              },
            },
          ],
        },
      ],
    });

    const response = await result.response.text();

    const scoreMatch = response.match(/SCORE:\s*(\d+)/i);
    const feedbackMatch = response.match(/FEEDBACK:\s*([\s\S]+)/i);

    const score = scoreMatch ? parseInt(scoreMatch[1], 10) : 50;
    const feedback = feedbackMatch ? feedbackMatch[1].trim() : 'No detailed feedback available.';

    return { score, feedback };
  } catch (error) {
    console.error('Error evaluating screenshot with Gemini:', error);
    return {
      score: 0,
      feedback: 'An error occurred during screenshot evaluation. Please try again later.',
    };
  }
}