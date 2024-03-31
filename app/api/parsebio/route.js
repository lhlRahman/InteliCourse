// app/api/parsebio/route.js
import { createWorker } from 'tesseract.js';

export const runtime = "edge";

// POST handler function using tesseract.js for OCR
export async function POST(req) {
  try {
    // Parse the incoming request body
    const formData = await req.formData();
    const file = formData.get('file');

    // Create a Tesseract.js worker
    const worker = createWorker({
      logger: m => console.log(m), // Add logger here to monitor progress
    });

    await worker.load();
    await worker.loadLanguage('eng');
    await worker.initialize('eng');

    // Convert the uploaded file to a Buffer for Tesseract.js
    const buffer = await file.arrayBuffer();
    const imageBuffer = Buffer.from(buffer);

    // Recognize text from the image
    const { data: { text } } = await worker.recognize(imageBuffer);

    console.log('Recognized Text:', text);

    // Clean up the worker
    await worker.terminate();

    // Return the recognized text
    return new Response(JSON.stringify({ status: 200, data: text }), {
      status: 200,
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
