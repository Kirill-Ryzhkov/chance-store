import React from "react";
import styles from "./Loader.module.css";
import blackImage from "../../assets/letter_shh_black.png";
import whiteImage from "../../assets/letter_shh_white.png";

const Loader = () => {
  return (
    <div className="bg-background min-h-screen text-colorPrimary flex">
      <div className={styles.overlay}>
        <div className={styles.loaderContainer}>
          <img
            src={blackImage}
            alt="Black Loader"
            className={`${styles.loaderImage} ${styles.fadeInOut}`}
          />
          <img
            src={whiteImage}
            alt="White Loader"
            className={`${styles.loaderImage} ${styles.fadeInOutDelay}`}
          />
        </div>
      </div>{" "}
    </div>
  );
};

export default Loader;
