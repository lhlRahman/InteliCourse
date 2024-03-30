"use client";

import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import styles from "../../../../../styles/CreateChapter.module.scss";

export default function CreateChapter() {
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
    <main id={styles.createChapter}>
      <div className={styles.title}>
        <div className={styles.small}>COURSE NAME</div>
        <div className={styles.big}>Calculus</div>
      </div>
      <div className={styles.info}>
        We generated chapters for each of your units. Look over them and then
        click the "Generate" button to confirm and continue.
      </div>
    </main>
  );
}
