// UploadFile.js
"use client";
import { useRef } from "react";
import styles from "../../styles/UploadFile.module.scss";
import { FaCloudUploadAlt } from "react-icons/fa";
import { useData } from "../../context/DataContext";
import { createWorker } from "tesseract.js";

export default function UploadFile({
  handleResume,
  setIsUploadingDone,
  isUploadingDone,
}) {
  const { addAlert } = useData();
  const inputFileRef = useRef(null);

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (!file) {
      return;
    }
    setIsUploadingDone(false);
    event.preventDefault();
    const worker = createWorker({
      logger: (m) => console.log(m),
    });
    try {
      await worker.load();
      await worker.loadLanguage("eng");
      await worker.initialize("eng");
      const {
        data: { text },
      } = await worker.recognize(file);
      console.log("Recognized Text:", text);
      handleResume(text); // Set the OCR result to the resume state in the parent component
      setIsUploadingDone(true);
    } catch (error) {
      console.error("OCR Error:", error);
      setIsUploadingDone(null);
      addAlert({ message: "Error processing the resume.", type: "error" });
    } finally {
      await worker.terminate();
    }
  };

  return (
    <div className="flex flex-col justify-center column w-full gap-2">
      <label
        htmlFor="dropzone-file"
        className={`${styles.filePlaceholder} flex flex-col items-center justify-center min-h-32 w-full cursor-pointer`}
      >
        {isUploadingDone !== null && isUploadingDone !== true ? (
          <div className="text-lg" style={{ color: "#484B6A" }}>
            Analyzing...
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center pt-6 pb-6 gap-1">
            <div className={styles.iconWrapper}>
              <FaCloudUploadAlt />
            </div>
            <p className="text-sm" style={{ color: "#484B6A" }}>
              Drag and drop your file here
            </p>
            <p className="text-sm" style={{ color: "#9394A5" }}>
              -or-
            </p>
            <p
              className="text-sm"
              style={{
                color: "#A220BC",
                textDecoration: "underline",
              }}
            >
              Browse files
            </p>
          </div>
        )}
        <input
          ref={inputFileRef}
          id="dropzone-file"
          type="file"
          className="hidden"
          onChange={handleFileChange}
        />
      </label>
      <div
        className="flex justify-between text-xs"
        style={{ color: "#9394A5" }}
      >
        <span className="">Supported: PDF, PNG, JPG</span>
        <span>Maximum size: 10MB</span>
      </div>
    </div>
  );
}