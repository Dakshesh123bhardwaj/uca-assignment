// src/components/VaseModel.jsx
import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';

const Vase = () => {
    const { scene } = useGLTF('/models/Ancient_Greek_Warrior.glb');
    return <primitive object={scene} scale={1.5} />;
};

const Vase4 = () => {
    return (
        <Canvas camera={{ position: [0, 1, 3] }}>
            <ambientLight intensity={0.8} />
            <directionalLight position={[2, 2, 5]} intensity={1} />
            <Suspense fallback={null}>
                <Vase />
                <OrbitControls enableZoom={true} />
            </Suspense>
        </Canvas>
    );
};

export default Vase4;