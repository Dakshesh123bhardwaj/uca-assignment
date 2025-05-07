import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';

// Vase model component
const Vase = () => {
  const { scene } = useGLTF('/models/Ancient_Greek_Vase_Sc.glb');
  return <primitive object={scene} scale={1.5} position={[0, 0, 0]} />;
};

// Main component that renders the 3D vase
const Slide5Vase = () => {
  return (
    <div style={{ position: 'absolute', width: '200%', height: '150%', zIndex: '10', bottom: '-180px', right: '-200px'}}>
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        style={{ width: '100%', height: '100%' }}
      >
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} intensity={1} />
        <directionalLight position={[-5, 5, 5]} intensity={0.5} />
        <Suspense fallback={null}>
          <Vase />
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            minPolarAngle={Math.PI / 3}
            maxPolarAngle={Math.PI / 1.5}
            rotateSpeed={0.5}
          />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default Slide5Vase;