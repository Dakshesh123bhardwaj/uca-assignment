import React, { useEffect, useState, useRef } from "react";
import styles from "./Slide1.module.css";
import LandingPageVase from "../../vase_models/landing_page_vase/LandingPageVase";

const Slide1 = () => {
    // State management
    const [animateOnLoad, setAnimateOnLoad] = useState(false);
    const [revisit, setRevisit] = useState(false);
    const [birdsActive, setBirdsActive] = useState(false);
    const [buttonClicked, setButtonClicked] = useState(false);
    
    // Refs for parallax elements
    const titleRef = useRef(null);
    const descriptionRef = useRef(null);
    const containerRef = useRef(null);

    useEffect(() => {
        // Check if the user has visited before
        const hasVisited = localStorage.getItem("hasVisitedSlide1");
        if (hasVisited) {
            setRevisit(true);
        } else {
            localStorage.setItem("hasVisitedSlide1", "true");
        }

        // Animate birds after a delay
        const birdTimer = setTimeout(() => {
            setBirdsActive(true);
        }, 1500);

        // Trigger animations
        setAnimateOnLoad(true);
        
        // Initialize parallax effect
        const handleMouseMove = (e) => {
            if (!titleRef.current || !descriptionRef.current) return;
            
            const xAxis = (window.innerWidth / 2 - e.pageX) / 25;
            const yAxis = (window.innerHeight / 2 - e.pageY) / 25;
            
            titleRef.current.style.transform = `translateX(${xAxis * 0.5}px) translateY(${yAxis * 0.5}px)`;
            descriptionRef.current.style.transform = `translateX(${xAxis * 0.2}px) translateY(${yAxis * 0.2}px)`;
        };
        
        window.addEventListener('mousemove', handleMouseMove);
        
        // Cleanup
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            clearTimeout(birdTimer);
        };
    }, []);
    
    // Handle CTA button click
    const handleBeginClick = () => {
        setButtonClicked(true);
        
        setTimeout(() => {
            window.scrollTo({
                top: window.innerHeight,
                behavior: 'smooth'
            });
        }, 500);
    };

    // Generate particles with unique keys
    const particles = Array.from({ length: 20 }, (_, i) => ({
        id: `particle-${i}`,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 50}%`,
        delay: `${Math.random() * 5}s`,
        duration: `${10 + Math.random() * 20}s`
    }));
    
    // Generate birds with unique keys
    const birds = Array.from({ length: 8 }, (_, i) => ({
        id: `bird-${i}`,
        top: `${10 + Math.random() * 25}%`,
        left: `${70 + Math.random() * 30}%`,
        delay: `${Math.random() * 2}s`,
        scale: `${0.6 + Math.random() * 0.5}`
    }));
    

    return (
        <section ref={containerRef} className={`${styles["slide-1"]} ${styles["slide"]} ${animateOnLoad ? styles["animate-bg"] : ""}`}>
            {/* Sky particles */}
            <div className={styles["particles-container"]}>
                {particles.map((particle) => (
                    <div 
                        key={particle.id}
                        className={styles["particle"]} 
                        style={{
                            left: particle.left,
                            top: particle.top,
                            animationDelay: particle.delay,
                            animationDuration: particle.duration
                        }}
                    />
                ))}
            </div>
            
            {/* Flying birds */}
            <div className={`${styles["birds-container"]} ${birdsActive ? styles["birds-active"] : ""}`}>
                {birds.map((bird) => (
                    <div 
                        key={bird.id}
                        className={styles["bird"]} 
                        style={{
                            top: bird.top,
                            left: bird.left,
                            animationDelay: bird.delay,
                            transform: `scale(${bird.scale})`
                        }}
                    />
                ))}
            </div>
            
            <div className={styles["slide-1-container"]}>
                <div
                    className={`${styles["slide-1-content"]} ${
                        animateOnLoad ? styles["animate-load"] : ""
                    } ${revisit ? styles["revisit-animation"] : ""}`}
                >
                    <div className={styles["slide-1-header"]}>
                        <div className={`${styles["slide-1-logo"]} ${animateOnLoad ? styles["logo-animate"] : ""}`}>
                            <i className="fa-solid fa-xmark"></i>
                        </div>
                        <h1 
                            ref={titleRef}
                            className={`${styles["slide-1-title"]} ${animateOnLoad ? styles["title-animate"] : ""}`}
                        >
                            <span className={styles["letter-container"]}>
                                {"ANCIENT".split('').map((letter, index) => (
                                    <span 
                                        key={`first-${index}`} 
                                        className={styles["title-letter"]}
                                        style={{ animationDelay: `${0.1 + index * 0.1}s` }}
                                    >
                                        {letter}
                                    </span>
                                ))}
                            </span>
                            <br />
                            <span className={styles["letter-container"]}>
                                {"ECHOES".split('').map((letter, index) => (
                                    <span 
                                        key={`second-${index}`} 
                                        className={styles["title-letter"]}
                                        style={{ animationDelay: `${0.7 + index * 0.1}s` }}
                                    >
                                        {letter}
                                    </span>
                                ))}
                            </span>
                        </h1>
                        <div className={`${styles["slide-1-subtitle"]} ${animateOnLoad ? styles["subtitle-animate"] : ""}`}>
                            GREEK POTTERY
                        </div>
                    </div>
                    
                    {/* 3D Vase - now positioned absolutely via CSS */}
                    <div className={`${styles["header-vase-container"]} ${animateOnLoad ? styles["vase-animate"] : ""}`}>
                        <div className={styles["vase-glow"]}></div>
                        <LandingPageVase />
                    </div>
                    
                    <div 
                        ref={descriptionRef}
                        className={`${styles["slide-1-description"]} ${animateOnLoad ? styles["description-animate"] : ""}`}
                    >
                        <span className={styles["text-reveal"]}>
                            Discover the timeless craftsmanship and stories etched in clay.
                        </span>
                        <div className={styles["underline"]}></div>
                    </div>
                    
                    <button 
                        className={`${styles["slide-1-cta"]} ${animateOnLoad ? styles["cta-animate"] : ""} ${buttonClicked ? styles["clicked"] : ""}`}
                        onClick={handleBeginClick}
                    >
                        BEGIN
                        <span className={styles["cta-icon"]}>
                            <svg viewBox="0 0 24 24" width="24" height="24">
                                <path fill="currentColor" d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z" />
                            </svg>
                        </span>
                        <span className={styles["circle"]}></span>
                    </button>
                </div>
            </div>
        </section>
    );
};

export default Slide1;