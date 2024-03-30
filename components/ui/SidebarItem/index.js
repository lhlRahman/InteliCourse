import styles from "../../../styles/SidebarItem.module.scss";
import { useData } from "@/context/DataContext";

export default function SidebarItem({ title, Icon, count, link = "/" }) {
  const { activeSidebar, setActiveSidebar } = useData();

  const onClick = () => {
    if (activeSidebar !== title) {
      setActiveSidebar(title);
      window.location.replace(link);
    }
  };

  return (
    <div
      className={`${styles.sidebarItem} ${
        activeSidebar == title ? styles.active : ""
      }`}
      onClick={onClick}
    >
      <div className={styles.left}>
        <div className={styles.iconWrapper}>
          <Icon />
        </div>
        <div className={styles.titleWrapper}>
          {title.length >= 24 ? title.substr(0, 21) + "..." : title}
        </div>
      </div>
      <div className={styles.right}>
        <div className={styles.countWrapper}>
          <span>{count}</span>
        </div>
      </div>
    </div>
  );
}
