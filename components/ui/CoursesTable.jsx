// import styles from "../../styles/JobsJobPoster.module.scss";

import React from "react";
import { BentoGrid, BentoGridItem } from "./bento-grid";

export default function CoursesTable({ items }) {
  return (
    <BentoGrid className="max-w-4xl mx-auto">
      {items.map((item, i) => (
        <BentoGridItem
          key={i}
          title={item.title}
          description={item.description}
          header={item.header}
          icon={item.icon}
          completed={item.completed}
          id={item.data.id}
        />
      ))}
    </BentoGrid>
  );
}
