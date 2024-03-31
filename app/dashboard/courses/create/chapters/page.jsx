"use client";

import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import styles from "../../../../../styles/CreateChapter.module.scss";

export default function CreateChapter({ course = { name: "Course Name" } }) {
  const coursDetail = useSearchParams();

  const title = coursDetail.get("title");
  const units = coursDetail.get("units");

  let retrievedChapters = false;
  useEffect(() => {
    if (title && units && !retrievedChapters) {
      retrievedChapters = true;
      console.log("Retrieved chapters", title, units);
    }
  }, []);

  return (
    <main className="flex flex-col items-start max-w-xl mx-auto my-16">
      <h5 className="text-sm uppercase text-seconday-foreground/60">
        Course Name
      </h5>
      <h1 className="text-5xl font-bold">{course.name}</h1>

      <div className="flex p-4 mt-5 border-none bg-secondary">
        {/* <Info className="w-12 h-12 mr-3 text-blue-400" /> */}
        <div>
          We generated chapters for each of your units. Look over them and then
          click the Button to confirm and continue
        </div>
      </div>
      {/* <ConfirmChapters course={course} /> */}
    </main>
  );
}
