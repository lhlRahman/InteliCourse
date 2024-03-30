import { useEffect, useState } from "react";
import styles from "../../styles/ModalText.module.scss";

export default function ModalText({ message, type, time }) {
  const [active, setActive] = useState(false);
  const [display, setDisplay] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setActive(true);
    }, 250);
  }, [setActive]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDisplay(false);
    }, time);

    return () => {
      clearTimeout(timeout);
    };
  }, [time]);

  const typeMap = (type) => {
    type = type.toString().toLowerCase();
    if (type == "success") {
      return styles.success;
    }
    if (type == "error") {
      return styles.error;
    }
    if (type == "warning") {
      return styles.warning;
    }
    if (type == "info") {
      return styles.info;
    }
    return "";
  };
  return (
    <div
      className={`${styles.modalText} ${typeMap(type)} ${
        active ? styles.active : ""
      }`}
      style={{ display: display ? "inline-block" : "none" }}
    >
      <div className={styles.messageWrapper}>
        <h3>{type}</h3>
        <p>{message}</p>
      </div>
    </div>
  );
}
