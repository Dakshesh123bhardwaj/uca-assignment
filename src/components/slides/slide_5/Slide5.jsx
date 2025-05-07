import React, { useEffect, useState, useRef } from "react";
import styles from "./Slide5.module.css";
import Slide5Vase from "../../vase_models/slide_5_vase/slide_5_vase";

const Slide5 = () => {
    const [visible, setVisible] = useState(false);
    const [activeArtist, setActiveArtist] = useState(null);
    const sectionRef = useRef(null);
    const vaseRef = useRef(null);
    
    // Detect when slide enters viewport to trigger animations
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    setVisible(true);
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

    // Add mouse parallax effect to vase
    useEffect(() => {
        const handleMouseMove = (e) => {
            if (!vaseRef.current || !visible) return;
            
            const xAxis = (window.innerWidth / 2 - e.pageX) / 25;
            const yAxis = (window.innerHeight / 2 - e.pageY) / 25;
            
            vaseRef.current.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
        };

        window.addEventListener('mousemove', handleMouseMove);
        
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, [visible]);

    // Artist information with additional details
    const artistInfo = [
        {
            id: 1,
            name: "Exekias",
            description: "Known for his mastery of the black-figure technique, with dramatic storytelling in his designs.",
            additionalInfo: "Active around 550-525 BCE, Exekias created some of the most famous vases including the 'Achilles and Ajax Playing a Board Game' amphora. His work featured precise detail and dramatic compositions."
        },
        {
            id: 2,
            name: "Andokides Painter",
            description: "Introduced the red-figure style, which allowed for more realistic human forms.",
            additionalInfo: "Working around 530-515 BCE, this innovative artist pioneered the red-figure technique that would dominate Greek pottery for centuries. His figures showed unprecedented anatomical detail and natural movement."
        },
        {
            id: 3,
            name: "Sophilos",
            description: "One of the first potters to sign his name, marking a shift toward individual artistic identity.",
            additionalInfo: "Active around 580 BCE, Sophilos signed at least four surviving works. His most famous piece is a dinos showing the wedding procession of Peleus and Thetis, decorated with multiple friezes of mythological figures."
        }
    ];

    const handleArtistClick = (id) => {
        setActiveArtist(activeArtist === id ? null : id);
    };

    // Create decorative patterns for background
    const renderGreekPatterns = () => {
        const patterns = [];
        for (let i = 0; i < 12; i++) {
            patterns.push(
                <div 
                    key={i}
                    className={styles["greek-pattern"]}
                    style={{
                        top: `${Math.random() * 100}%`,
                        left: `${Math.random() * 100}%`,
                        animationDelay: `${Math.random() * 8}s`,
                        opacity: Math.random() * 0.3 + 0.1
                    }}
                >
                    {["∞", "⊗", "≈", "⋈", "⊛"][Math.floor(Math.random() * 5)]}
                </div>
            );
        }
        return patterns;
    };

    return (
        <section 
            ref={sectionRef}
            className={`${styles["slide-5"]} ${styles["slide"]} ${visible ? styles["visible"] : ""}`}
        >
            {renderGreekPatterns()}
            
            <div className={styles["backdrop-overlay"]}></div>
            
            <div className={styles["slide-5-content"]}>
                <h2 className={`${styles["title-slide-5"]} ${visible ? styles["animate-title"] : ""}`}>
                    <span className={styles["title-char"]}>W</span>
                    <span className={styles["title-char"]}>H</span>
                    <span className={styles["title-char"]}>E</span>
                    <span className={styles["title-char"]}>R</span>
                    <span className={styles["title-char"]}>E</span>
                    <span className={styles["title-char"]}> </span>
                    <span className={styles["title-char"]}>C</span>
                    <span className={styles["title-char"]}>L</span>
                    <span className={styles["title-char"]}>A</span>
                    <span className={styles["title-char"]}>Y</span>
                    <span className={styles["title-char"]}> </span>
                    <span className={styles["title-char"]}>F</span>
                    <span className={styles["title-char"]}>O</span>
                    <span className={styles["title-char"]}>U</span>
                    <span className={styles["title-char"]}>N</span>
                    <span className={styles["title-char"]}>D</span>
                    <span className={styles["title-char"]}> </span>
                    <span className={styles["title-char"]}>I</span>
                    <span className={styles["title-char"]}>T</span>
                    <span className={styles["title-char"]}>S</span>
                    <span className={styles["title-char"]}> </span>
                    <span className={styles["title-char"]}>V</span>
                    <span className={styles["title-char"]}>O</span>
                    <span className={styles["title-char"]}>I</span>
                    <span className={styles["title-char"]}>C</span>
                    <span className={styles["title-char"]}>E</span>
                </h2>

                <p className={`${styles["info-text"]} ${visible ? styles["info-visible"] : ""}`}>
                    Most ancient Greek pottery was made in Athens, the main center of
                    pottery production, along with other cities like Corinth. These places were home to
                    skilled artisans who worked in small, often family-run workshops.
                </p>

                <p className={`${styles["info-text"]} ${visible ? styles["info-visible"]: ""} ${styles["delay-1"]}`}>
                    Pottery-making was a specialized craft passed down through
                    generations. Artisans used potter's wheels and kilns to shape and fire the clay, while painters
                    added detailed scenes of mythology, daily life, and rituals.
                </p>

                <div className={`${styles["notable-artists-card"]} ${visible ? styles["card-visible"] : ""}`}>
                    <div className={styles["card-header"]}>
                        <span className={`${styles["star"]} ${styles["star-left"]}`}>★</span>
                        <h3 className={styles["card-title"]}>Notable Artists</h3>
                        <span className={`${styles["star"]} ${styles["star-right"]}`}>★</span>
                    </div>

                    {artistInfo.map((artist, index) => (
                        <div 
                            key={artist.id}
                            className={`${styles["artist-info"]} ${visible ? styles["artist-visible"] : ""} ${styles[`delay-${index + 1}`]} ${activeArtist === artist.id ? styles["artist-active"] : ""}`}
                            onClick={() => handleArtistClick(artist.id)}
                            style={{ animationDelay: `${1.1 + (index * 0.2)}s` }}
                        >
                            <div className={styles["artist-content"]}>
                                <p className={styles["artist-name"]}>{artist.name} –</p>
                                <p className={styles["artist-description"]}>{artist.description}</p>
                                
                                {activeArtist === artist.id && (
                                    <div className={styles["additional-info"]}>
                                        <p>{artist.additionalInfo}</p>
                                    </div>
                                )}
                            </div>
                            <div className={styles["click-indicator"]}>
                                <span>{activeArtist === artist.id ? "▲" : "▼"}</span>
                            </div>
                        </div>
                    ))}

                    <p className={`${styles["card-footer"]} ${visible ? styles["footer-visible"] : ""}`}>
                        These artists helped turn everyday vessels into works of art, many
                        of which are preserved in museums today.
                    </p>
                </div>

                <div className={`${styles["vase-container"]} ${visible ? styles["vase-visible"] : ""}`}>
                    <div className={styles["vase-highlight"]}></div>
                    <div 
                        ref={vaseRef} 
                        id="vase-3d-container-2" 
                        className={`${styles["vase-3d"]} ${visible ? styles["vase-loaded"] : ""}`}
                    >
                        <Slide5Vase />
                        <div className={styles["vase-shadow"]}></div>
                    </div>
                    <div className={styles["vase-spinner"]}>
                        <div className={styles["spinner-text"]}>Hover to explore</div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Slide5;