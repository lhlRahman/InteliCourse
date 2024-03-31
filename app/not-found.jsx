
// app/page.js
"use client";
import { useState } from "react";

export default function Component() {
  const [fileName, setFileName] = useState('');
  const [textResult, setTextResult] = useState('');

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      setFileName(file.name);
      try {
        const formData = new FormData();
        formData.append('file', file);
        const response = await fetch('/api/parsebio', {
          method: 'POST',
          body: formData,
        });
        if (response.ok) {
          const data = await response.json();
          setTextResult(data.data);
        } else {
          console.error('Error:', response.statusText);
        }
      } catch (error) {
        console.error('Error posting data to API:', error);
      }
    }
  };

  const isVideoFile = (fileName) => {
    return fileName.endsWith('.mp4') || fileName.endsWith('.mov');
  };


  return (
    <div>
      <input type="file" accept="image/*,video/*" onChange={handleFileChange} />
      {fileName && (
        <div>
          <p>Selected File: {fileName}</p>
          {isVideoFile(fileName) ? (
            <video controls src={URL.createObjectURL(new Blob([fileName]))} style={{ maxWidth: '100%', height: 'auto' }} />
          ) : (
            <img src={URL.createObjectURL(new Blob([fileName]))} alt="Uploaded" style={{ maxWidth: '100%', height: '90%' }} />
          )}
          {textResult && <p>Text Result: {textResult}</p>}
        </div>
      )}
    </div>
  );
}