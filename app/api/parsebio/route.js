// app/api/parsebio/route.js
import { GoogleGenerativeAI } from "@google/generative-ai";
import fs from 'fs/promises';
import path from 'path';
import os from 'os';

// Helper function to convert file information to a GoogleGenerativeAI.Part object
async function fileToGenerativePart(file) {
  const tempFilePath = await saveTempFile(file);
  const data = await fs.readFile(tempFilePath);
  const base64EncodedData = data.toString('base64');
  await fs.unlink(tempFilePath);
  return {
    inlineData: { data: base64EncodedData, mimeType: file.type },
  };
}

// Helper function to save the uploaded file to a temporary location
async function saveTempFile(file) {
    const tempDir = os.tmpdir();
    const tempFilePath = path.join(tempDir, file.name);
    const buffer = Buffer.from(await file.arrayBuffer());
    await fs.writeFile(tempFilePath, buffer);
    return tempFilePath;
  }

// POST handler function
export async function POST(req) {
  try {
    // Parse the incoming request body
    const formData = await req.formData();
    const file = formData.get('file');

    // Initialize Google Generative AI with the API key
    const genAI = new GoogleGenerativeAI('AIzaSyAPoDWdkaGlS7JicKYvH-7v6cMKbNc8PxM');

    // Define the prompt for generative AI
    const prompt = "Extract and parse all visible text from the provided image. Ensure that the extracted content includes every piece of text visible in the image without omission or addition.";

    // Prepare the image data
    const imagePart = await fileToGenerativePart(file);

    // Invoke the generative model
    const model = genAI.getGenerativeModel({ model: "gemini-pro-vision" });
    const result = await model.generateContent([prompt, imagePart]);

    // Process the result
    const response = await result.response;
    const textResult = await response.text();
    console.log('Text result:', textResult);

    // Return the processed result
    return new Response(JSON.stringify({ status: 201, data: textResult }), {
      status: 201,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error:', error);
    return new Response(JSON.stringify({ status: 500, message: "Internal server error" }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
