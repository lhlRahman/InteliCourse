import { useState } from "react";
import styles from "../../styles/SidebarSection.module.scss";

export default function SidebarSection({ title, icon, icon1, children }) {
  const [toggled, setToggled] = useState(false);

  return (
    <div className={styles.sidebarSection}>
      <div
        onClick={() => {
          setToggled(!toggled);
        }}
        className={`${styles.containerWrapper} ${
          toggled ? styles.toggled : ""
        }`}
      >
        <div className={styles.left}>
          <div className={styles.iconWrapper}>
            <img src={icon} alt={title} />
            <img src={icon1} alt={title} />
          </div>
          <div className={styles.title}>
            {title.length > 20 ? title.substr(0, 17) + "..." : title}
          </div>
        </div>
        <div className={styles.right}>
          <div className={styles.countWrapper}>{children.length || 1}</div>
          <div className={`${styles.toggle} ${toggled ? styles.toggled : ""}`}>
            <img src="/icons/downIconThickDark.svg" />
          </div>
        </div>
      </div>
      <div
        className={`${styles.itemsWrapper} ${
          toggled || children.length == 1 ? styles.toggled : ""
        }`}
      >
        {children}
      </div>
    </div>
  );
}
