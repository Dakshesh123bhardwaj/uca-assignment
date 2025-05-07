import React from "react";
import styles from "./Slide4.module.css";
import pillarImg from "../../assets/images/pillars.png";
import vaseImg from "../../assets/images/vases/vase_1.png";
import Vase1 from "../../vase_models/other_vases/Vase1";
import Vase2 from "../../vase_models/other_vases/Vase2";
import Vase3 from "../../vase_models/other_vases/Vase3";
import Vase4 from "../../vase_models/other_vases/Vase4";

const Slide4 = () => {
    return (
        <section className={`${styles["slide-4"]} ${styles["slide"]}`}>
            <div className={styles["title-container-slide-4"]}>
                <div className={styles["title-slide-4"]}>GREEK<br />POTTERY</div>
                <div className={styles["forms-badge"]}>FORMS</div>
            </div>

            <div className={styles["pottery-display"]}>
                {/* Full Pillar with Vase */}
                <div className={`${styles["pillar-container"]} ${styles["full-pillar"]}`}>
                    <img 
                        src={pillarImg} 
                        alt="Greek pillar"
                        className={styles["pillar-img"]}
                    />
                    <div className={styles["vase-container"]}>
                        <Vase1/>
                    </div>
                </div>

                {/* Half Pillar with Vase */}
                <div className={`${styles["pillar-container"]} ${styles["half-pillar"]}`}>
                    <img 
                        src={pillarImg} 
                        alt="Greek pillar"
                        className={styles["pillar-img"]}
                    />
                    <div className={styles["vase-container"]}>
                         <Vase2/>
                    </div>
                </div>

                {/* Repeat pattern */}
                <div className={`${styles["pillar-container"]} ${styles["full-pillar"]}`}>
                    <img 
                        src={pillarImg}  
                        alt="Greek pillar"
                        className={styles["pillar-img"]}
                    />
                    <div className={styles["vase-container"]}>
                        <Vase3/>
                    </div>
                </div>

                <div className={`${styles["pillar-container"]} ${styles["half-pillar"]}`}>
                    <img 
                        src={pillarImg} 
                        alt="Greek pillar"
                        className={styles["pillar-img"]}
                    />
                    <div className={styles["vase-container"]}>
                        <Vase4/>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Slide4;