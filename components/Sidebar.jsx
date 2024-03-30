import { useState } from "react";
import styles from "../styles/Sidebar.module.scss";
import { useData } from "@/context/DataContext";
import { FaCaretDown } from "react-icons/fa";

export default function Sidebar({ children }) {
  const { setSidebarShow, sidebarShow } = useData();

  return (
    <aside
      id={styles.sidebar}
      className={`${sidebarShow ? styles.toggled : ""}`}
    >
      <div className={styles.sectionsWrapper}>{children}</div>
      <div
        className={`${styles.toggle} ${sidebarShow ? styles.toggled : ""}`}
        onClick={() => {
          setSidebarShow(!sidebarShow);
        }}
      >
        <FaCaretDown />
      </div>
    </aside>
  );
}
