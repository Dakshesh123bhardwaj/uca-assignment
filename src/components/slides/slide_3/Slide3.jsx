import React, { useEffect, useRef, useState } from "react";
import styles from "./Slide3.module.css";

const Slide3 = () => {
    const sectionRef = useRef(null);
    const infoRef = useRef(null);
    const [activeStep, setActiveStep] = useState(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const section = sectionRef.current;
        
        // Intersection observer for section visibility
        const observer = new IntersectionObserver(
            ([entry], observerInstance) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    section.classList.add(styles.visible);
                    observerInstance.unobserve(entry.target);
                    
                    // Trigger sequential step animations after panel is visible
                    setTimeout(() => {
                        animateSteps();
                    }, 800);
                }
            },
            { threshold: 0.3 }
        );
        
        if (section) observer.observe(section);
        
        // Parallax effect on scroll
        const handleScroll = () => {
            if (infoRef.current && isVisible) {
                const scrollY = window.scrollY;
                const panelY = sectionRef.current.offsetTop;
                const distance = scrollY - panelY;
                
                if (Math.abs(distance) < window.innerHeight) {
                    // Apply subtle parallax rotation based on scroll position
                    const rotation = distance * 0.02;
                    const scale = 1 - Math.abs(distance) * 0.0003;
                    infoRef.current.style.transform = `perspective(1000px) rotateX(${rotation}deg) scale(${scale})`;
                }
            }
        };

        // Animate steps sequentially
        const animateSteps = () => {
            const steps = ["SOURCING CLAY", "SHAPING ON THE WHEEL", "DRYING AND DETAILING", "FIRING IN KILNS", "PAINTING STYLES"];
            let delay = 0;
            
            steps.forEach((step, index) => {
                setTimeout(() => {
                    setActiveStep(index);
                    // Add shake effect when step becomes active
                    const stepElement = document.getElementById(`step-${index}`);
                    if (stepElement) {
                        stepElement.classList.add(styles.pulse);
                        setTimeout(() => stepElement.classList.remove(styles.pulse), 1000);
                    }
                }, delay);
                delay += 700; // Stagger the animations
            });
        };

        window.addEventListener("scroll", handleScroll);
        
        return () => {
            observer.disconnect();
            window.removeEventListener("scroll", handleScroll);
        };
    }, [isVisible]);

    const scrollTo = (direction) => {
        if (direction === "up") {
            window.scrollTo({ top: 0, behavior: "smooth" });
        } else if (direction === "down") {
            window.scrollBy({ top: window.innerHeight, behavior: "smooth" });
        }
    };

    // Cursor effect for adding sparkles
    const [sparkles, setSparkles] = useState([]);
    
    const handleMouseMove = (e) => {
        if (Math.random() > 0.8) { // Only create sparkles occasionally
            const rect = infoRef.current.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const newSparkle = {
                id: Date.now(),
                x,
                y,
                size: Math.random() * 8 + 4,
                opacity: 1
            };
            
            setSparkles(prev => [...prev, newSparkle]);
            
            // Remove sparkle after animation
            setTimeout(() => {
                setSparkles(prev => prev.filter(s => s.id !== newSparkle.id));
            }, 1000);
        }
    };

    return (
        <section ref={sectionRef} className={styles['slide-3']}>
            <div 
                ref={infoRef}
                className={styles['info-panel']}
                onMouseMove={handleMouseMove}
            >
                <div className={styles['sparkles-container']}>
                    {sparkles.map(sparkle => (
                        <div
                            key={sparkle.id}
                            className={styles.sparkle}
                            style={{
                                left: `${sparkle.x}px`,
                                top: `${sparkle.y}px`,
                                width: `${sparkle.size}px`,
                                height: `${sparkle.size}px`
                            }}
                        />
                    ))}
                </div>
                
                <button className={styles['arrow-up']} onClick={() => scrollTo("up")}>▲</button>

                <h2 className={styles['title-slide-3']}>
                    <span className={styles['title-words']}>THE PROCESS BEHIND THE BEAUTY</span>
                </h2>

                {["SOURCING CLAY", "SHAPING ON THE WHEEL", "DRYING AND DETAILING", "FIRING IN KILNS", "PAINTING STYLES"]
                    .map((step, index) => (
                        <React.Fragment key={index}>
                            <div 
                                id={`step-${index}`}
                                className={`${styles['process-step']} ${activeStep >= index ? styles.active : ''}`}
                            >
                                <span className={styles.star}>★</span>
                                <span className={styles['step-text']}>{step}</span>
                                <span className={styles.star}>★</span>
                            </div>
                            
                            {index < 4 && <div className={`${styles['three-divider']} ${activeStep > index ? styles.drawn : ''}`} />}
                        </React.Fragment>
                    ))
                }

                <button className={styles['arrow-down']} onClick={() => scrollTo("down")}>▼</button>
            </div>
        </section>
    );
};

export default Slide3;