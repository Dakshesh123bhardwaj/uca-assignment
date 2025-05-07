import React, { Suspense, useRef, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';

const Vase = () => {
    // Increased the scale from 1.5 to 2.5 to make the model bigger
    const { scene } = useGLTF('/models/Ancient_Greek_Battle.glb');
    return <primitive object={scene} scale={2.5} position={[0, -0.5, 0]} />;
};

const LandingPageVase = () => {
    const controlsRef = useRef();
    useEffect(() => {
        if (controlsRef.current) {
            controlsRef.current.enableZoom = false;
            controlsRef.current.minPolarAngle = Math.PI / 2;
            controlsRef.current.maxPolarAngle = Math.PI / 2;
            
            // Optional: limit horizontal rotation if desired
            controlsRef.current.minAzimuthAngle = -Math.PI / 4; // -45 degrees
            controlsRef.current.maxAzimuthAngle = Math.PI / 4;  // 45 degrees
            
            // Apply slower rotation speed
            controlsRef.current.rotateSpeed = 0.5;
            
            // Auto-rotate for subtle movement
            controlsRef.current.autoRotate = true;
            controlsRef.current.autoRotateSpeed = 0.5;
        }
    }, [controlsRef]);

    return (
        <Canvas 
            camera={{ position: [0, 0, 4], fov: 40 }}
            style={{ width: '100%', height: '100%' }}
        >
            {/* Adjusted lighting for better visibility */}
            <ambientLight intensity={0.8} />
            <directionalLight position={[2, 2, 5]} intensity={1.2} />
            <directionalLight position={[-2, -2, 3]} intensity={0.3} color="#ffe0bd" />
            
            <Suspense fallback={null}>
                <Vase />
                <OrbitControls 
                    ref={controlsRef}
                    enablePan={false}
                />
            </Suspense>
        </Canvas>
    );
};

// Add preload for the model to improve loading performance
useGLTF.preload('/models/Ancient_Greek_Battle.glb');

export default LandingPageVase;