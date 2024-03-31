
// app/page.js
"use client";
import { useState } from "react";
import { createWorker } from "tesseract.js";
import Chat from "@/components/Chat";
export default function Component() {
  const [fileName, setFileName] = useState('');
  const [textResult, setTextResult] = useState('Nothing yet');

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      setFileName(file.name);

      // Initialize a Tesseract Worker
      const worker = createWorker({
        logger: (m) => console.log(m), // Log progress
        // Example of setting a configuration option:
        // Adjust according to your specific requirements.
    
      });

      try {
        await worker.load();
        await worker.loadLanguage('eng'); // Specify the language
        await worker.initialize('eng');
        await worker.setParameters({
          tessedit_char_whitelist: ' ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789', // Example: Only recognize alphanumeric characters
        });

        // Recognize the text from the image file
        const { data: { text } } = await worker.recognize(file);

        setTextResult(text);

        // Terminate the worker after finishing
        await worker.terminate();
      } catch (error) {
        console.error('OCR Error:', error);
        setTextResult('Failed to recognize text');
      }
    }
  };

  return (
    <div>
      <Chat></Chat>
    </div>
  );
}
