import React, { useEffect, useState, useRef } from "react";
import styles from "./Slide6.module.css";

const Slide6 = () => {
    const [visible, setVisible] = useState(false);
    const [paragraphsVisible, setParagraphsVisible] = useState([false, false, false, false]);
    const [headlineVisible, setHeadlineVisible] = useState(false);
    const [ctaBadgeVisible, setCtaBadgeVisible] = useState(false);
    const [imageVisible, setImageVisible] = useState(false);
    const sectionRef = useRef(null);

    // Intersection Observer to trigger animations when slide comes into view
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    setVisible(true);
                    
                    // Start paragraph animations with delays
                    const paragraphTimers = paragraphsVisible.map((_, index) => {
                        return setTimeout(() => {
                            setParagraphsVisible(prev => {
                                const newState = [...prev];
                                newState[index] = true;
                                return newState;
                            });
                        }, 600 + (index * 400)); // Staggered delay for each paragraph
                    });
                    
                    // Headline and badge animations
                    setTimeout(() => setHeadlineVisible(true), 2200);
                    setTimeout(() => setCtaBadgeVisible(true), 2700);
                    setTimeout(() => setImageVisible(true), 3000);
                    
                    return () => {
                        paragraphTimers.forEach(timer => clearTimeout(timer));
                    };
                }
            },
            { threshold: 0.2 }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => {
            if (sectionRef.current) {
                observer.unobserve(sectionRef.current);
            }
        };
    }, []);

    // Random sparkle positions generator
    const generateSparkles = (count) => {
        const sparkles = [];
        for (let i = 0; i < count; i++) {
            sparkles.push({
                top: Math.random() * 120 + "%",
                left: Math.random() * 90 + "%",
                animationDelay: Math.random() * 3 + "s",
                fontSize: Math.random() * 10 + 15 + "px",
            });
        }
        return sparkles;
    };

    const sparkles = generateSparkles(8);

    return (
        <section 
            ref={sectionRef}
            className={`${styles["slide"]} ${styles["slide-6"]} ${styles["greek-info-slide"]} ${visible ? styles["visible"] : ""}`}
        >
            <div className={styles["info-content"]}>
                {paragraphsVisible.map((isVisible, index) => (
                    <p 
                        key={index}
                        className={`${styles["info-paragraph"]} ${isVisible ? styles["fade-in"] : ""}`}
                    >
                        {index === 0 && (
                            "Greek pottery began over three thousand years ago—around One Thousand BCE—as simple, functional vessels used for storage, transport, and daily tasks. But over time, it became something more: a canvas for creativity, storytelling, and cultural identity."
                        )}
                        {index === 1 && (
                            "As the skills of potters and painters evolved, so did the pottery itself. Artists began decorating vases with scenes of mythology, battles, rituals, and everyday life, transforming everyday objects into lasting works of art."
                        )}
                        {index === 2 && (
                            "These vessels didn't stay in Greece. Through trade and conquest, they traveled across the ancient world—influencing Roman pottery, inspiring Renaissance artists, and shaping how we understand classical art today."
                        )}
                        {index === 3 && (
                            "Now, centuries later, Greek pottery is displayed in major museums across the globe. It connects us to a world long gone—but not forgotten."
                        )}
                    </p>
                ))}
            </div>

            <div className={styles["star-divider"]}>
                <div className={`${styles["star"]} ${styles["pulse-star"]}`}>✦</div>
                <div className={styles["line"]}></div>
                <div className={`${styles["star"]} ${styles["pulse-star"]}`}>✦</div>
                <div className={styles["line"]}></div>
                <div className={`${styles["star"]} ${styles["pulse-star"]}`}>✦</div>
                <div className={`${styles["star"]} ${styles["pulse-star"]}`}>✦</div>
            </div>

            <div className={styles["headline-section"]}>
                <div className={styles["headline-content"]}>
                    <div className={`${styles["sparkle"]} ${styles["sparkle-1"]}`}>✧</div>
                    
                    {/* Background sparkles */}
                    {sparkles.map((sparkle, index) => (
                        <div 
                            key={index}
                            className={styles["background-sparkle"]}
                            style={{
                                top: sparkle.top,
                                left: sparkle.left,
                                animationDelay: sparkle.animationDelay,
                                fontSize: sparkle.fontSize
                            }}
                        >
                            ✧
                        </div>
                    ))}
                    
                    <h2 className={`${styles["headline"]} ${headlineVisible ? styles["slide-in"] : ""}`}>
                        THE GREEK VASE -<br />A LIVING ARTIFACT
                    </h2>
                    <div className={`${styles["cta-badge"]} ${ctaBadgeVisible ? styles["bounce-in"] : ""}`}>
                        WANNA SEE IT UPCLOSE?
                    </div>
                </div>
                <div 
                    className={`${styles["image-placeholder"]} ${imageVisible ? styles["fade-rotate-in"] : ""}`}
                ></div>
            </div>
        </section>
    );
};

export default Slide6;