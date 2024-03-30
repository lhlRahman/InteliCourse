"use client";
import { useRef } from "react";
import styles from "../../styles/UploadFile.module.scss";
import { FaCloudUploadAlt } from "react-icons/fa";
import { useData } from "@/context/DataContext";
import axios from "axios";

export default function UploadFile({
  setResume,
  setIsUploadingDone,
  isUploadingDone,
}) {
  const { addAlert } = useData();
  const inputFileRef = useRef(null);

  const onUpload = (event) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = new File(
        [event.target.files[0]],
        event.target.files[0].name,
        {
          type: event.target.files[0].type,
        }
      );

      if (file.type !== "application/pdf" && file.type !== "video/mp4") {
        addAlert({
          message: "File type not supported.",
          type: "error",
        });
        return;
      }

      if (file.size > 10000000) {
        addAlert({
          message: "File size must be less than 10MB.",
          type: "error",
        });
        return;
      }

      setIsUploadingDone(false);
      setResume(null);

      // encode file to base64 string
      const reader = new FileReader();
      reader.readAsDataURL(file);

      // api call here to do
      // TODO: upload file to server
      axios
        .post("/api/users/create", reader.result)
        .then((res) => {
          if (res.data.status === 201) {
            setIsUploadingDone(true);
            // TODO
            setResume(reader.result);
          } else {
            setIsUploadingDone(null);
            setResume(null);
            addAlert({ message: res.data.message, type: "error" });
          }
        })
        .catch((err) => {
          setIsUploadingDone(null);
          setResume(null);
          console.log(err);
        });
    } else {
      setIsUploadingDone(null);
      setResume(null);
      console.error("No file selected.");
    }
    if (inputFileRef.current) inputFileRef.current.value = "";
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
          accept="image/pdf"
          onChange={onUpload}
        />
      </label>
      <div
        className="flex justify-between text-xs"
        style={{ color: "#9394A5" }}
      >
        <span className="">Supported: PDF, MP4</span>
        <span>Maximum size: 10MB</span>
      </div>
    </div>
  );
}
