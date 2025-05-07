import React, { useEffect, useState, useRef } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Autoplay, Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/autoplay';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import styles from "./Slide2.module.css";

// Import your vase images
import vase1 from "../../assets/images/vases/pj1.png";
import vase2 from "../../assets/images/vases/pj2.png";
import vase3 from "../../assets/images/vases/pj3.png";
import vase4 from "../../assets/images/vases/pj4.png";
import vase5 from "../../assets/images/vases/pj1.png"; // Added duplicates for more carousel items
import vase6 from "../../assets/images/vases/pj2.png"; // Feel free to replace with actual different vases

const Slide2 = () => {
    const [isVisible, setIsVisible] = useState(false);
    const slideRef = useRef(null);
    const titleRef = useRef(null);
    const descriptionRef = useRef(null);
    const lineRef = useRef(null);
    const swiperRef = useRef(null);

    // Setup intersection observer for scroll animations
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        setIsVisible(true);
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.3 }
        );

        if (slideRef.current) {
            observer.observe(slideRef.current);
        }

        return () => {
            if (slideRef.current) {
                observer.unobserve(slideRef.current);
            }
        };
    }, []);

    // Animation sequence timing
    useEffect(() => {
        if (isVisible) {
            // Staggered animation timeline
            setTimeout(() => {
                if (lineRef.current) lineRef.current.classList.add(styles.animateLine);
            }, 300);
            
            setTimeout(() => {
                if (titleRef.current) titleRef.current.classList.add(styles.animateTitle);
            }, 600);
            
            setTimeout(() => {
                if (descriptionRef.current) descriptionRef.current.classList.add(styles.animateDescription);
            }, 900);
        }
    }, [isVisible]);

    // Array of vase images for easier mapping
    const vaseImages = [vase1, vase2, vase3, vase4, vase5, vase6];

    return (
        <div ref={slideRef} className={styles.slide2}>
            <div className={`${styles.potteryDisplay} ${isVisible ? styles.visible : ''}`}>
                <Swiper
                    modules={[FreeMode, Autoplay, Navigation, Pagination]}
                    spaceBetween={20}
                    slidesPerView={3}
                    centeredSlides={true}
                    loop={true}
                    loopAdditionalSlides={2}
                    autoplay={{
                        delay: 2500,
                        disableOnInteraction: false,
                    }}
                    speed={800}
                    navigation={true}
                    pagination={{ 
                        clickable: true,
                        dynamicBullets: true 
                    }}
                    className={styles.potterySwiper}
                    grabCursor={true}
                    onSwiper={(swiper) => {
                        swiperRef.current = swiper;
                    }}
                >
                    {vaseImages.map((vase, index) => (
                        <SwiperSlide key={index} className={styles.swiperSlide}>
                            <div className={styles.vaseContainer}>
                                <img 
                                    src={vase} 
                                    alt={`Greek pottery ${index + 1}`} 
                                    className={`${styles.potteryItem} ${isVisible ? styles.animatePottery : ''}`}
                                    style={{ animationDelay: `${index * 150}ms` }}
                                />
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>

            <div className={styles.contentContainer}>
                <div className={styles.titleContainerSlide2}>
                    <span className={`${styles.xDecoration} ${styles.xLeft}`}>
                        <i>✕</i>
                    </span>
                    
                    <div ref={lineRef} className={styles.blueLine}></div>
                    
                    <h1 ref={titleRef} className={styles.titleSlide2}>
                        AN INTRODUCTION<br />TO GREEK POTTERY
                    </h1>
                    
                    <span className={`${styles.xDecoration} ${styles.xRight}`}>
                        <i>✕</i>
                    </span>
                </div>

                <p ref={descriptionRef} className={styles.descriptionSlide2}>
                    Greek pottery refers to hand-crafted vessels made from clay, often
                    painted and fired to create functional and decorative items. More than
                    mere containers, these pots were storytellers—depicting myths,
                    battles, and everyday life in ancient Greece.
                </p>
            </div>
        </div>
    );
};

export default Slide2;