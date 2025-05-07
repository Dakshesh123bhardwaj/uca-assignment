import React, { useState, useEffect } from "react";
import styles from "./Slide4.module.css";
import pillarImg from "../../assets/images/pillars.png";
import VaseViewer from "../../vase_models/VaseViewer/VaseViewer";

const Slide4 = () => {
    // Use state to track whether components are loaded
    const [loaded, setLoaded] = useState(false);

    // Set loaded to true after component mounts
    useEffect(() => {
        setLoaded(true);
    }, []);

    return (
        <section className={`${styles['slide']} ${styles['slide-4']}`} id='slide4'>
            <div className={styles['title-container-slide-4']}>
                <div className={styles['title-slide-4']}>
                    GREEK<br />POTTERY
                </div>
                <div className={styles['forms-badge']}>FORMS</div>
            </div>
            <div className={styles['pottery-display']}>
                <div className={`${styles['pillar-container']} ${styles['full-pillar']}`}>
                    <div className={`${styles['vase-container']} ${loaded ? styles['vase-loaded'] : ''}`}>
                        <div className={styles['full-vase']}>
                            <VaseViewer modelPath='/models/Ancient_Greek_Battle.glb' />
                        </div>
                    </div>
                    <img src={pillarImg || "/placeholder.svg"} alt="Greek pillar" className={styles['pillar-img']} />
                </div>
                <div className={`${styles['pillar-container']} ${styles['half-pillar']}`}>
                    <div className={`${styles['vase-container']} ${loaded ? styles['vase-loaded'] : ''}`}>
                        <div className={styles['half-vase']}>
                            <VaseViewer modelPath='/models/Ancient_Greek_Vase_wi.glb' />
                        </div>
                    </div>
                    <img src={pillarImg || "/placeholder.svg"} alt="Greek pillar" className={styles['pillar-img']} />
                </div>
                <div className={`${styles['pillar-container']} ${styles['full-pillar']}`}>
                    <div className={`${styles['vase-container']} ${loaded ? styles['vase-loaded'] : ''}`}>
                        <div className={styles['full-vase']}>
                            <VaseViewer modelPath='/models/Ancient_Greek_Vase_Sc.glb' />
                        </div>
                    </div>
                    <img src={pillarImg || "/placeholder.svg"} alt="Greek pillar" className={styles['pillar-img']} />
                </div>
                <div className={`${styles['pillar-container']} ${styles['half-pillar']}`}>
                    <div className={`${styles['vase-container']} ${loaded ? styles['vase-loaded'] : ''}`}>
                        <div className={styles['half-vase']}>
                            <VaseViewer modelPath='/models/Ancient_Greek_Warrior.glb' />
                        </div>
                    </div>
                    <img src={pillarImg || "/placeholder.svg"} alt="Greek pillar" className={styles['pillar-img']} />
                </div>
            </div>
        </section>
    );
};

export default Slide4;
