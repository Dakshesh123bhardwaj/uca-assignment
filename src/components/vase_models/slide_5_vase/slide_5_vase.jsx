import React, { Suspense, useEffect, useRef, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF, Html } from '@react-three/drei';
import audioSrc from '../../assets/audio/audio.wav'; // Import your audio file

const MODEL_PATH = '/models/Ancient_Greek_Vase_Sc.glb';
useGLTF.preload(MODEL_PATH);

const LoadingFallback = () => {
  return (
    <Html center>
      <div style={{
        color: 'white',
        background: 'rgba(0,0,0,0.5)',
        padding: '10px 15px',
        borderRadius: '4px',
        fontSize: '14px'
      }}>
        Loading...
      </div>
    </Html>
  );
};

const Vase = () => {
  const { scene } = useGLTF(MODEL_PATH);
  return <primitive object={scene} scale={1.5} position={[0, 0, 0]} />;
};

const Slide5Vase = () => {
  const [controls, setControls] = useState(null);
  const audioRef = useRef(null);
  const hasInteracted = useRef(false);

  useEffect(() => {
    if (!controls || !audioRef.current) return;

    const handleStart = () => {
      if (!hasInteracted.current) {
        audioRef.current.volume = 0.1;
        audioRef.current.play().catch(err => {
          console.error('Audio playback failed:', err);
        });
        hasInteracted.current = true;
      }
    };

    const handleEnd = () => {
      if (!audioRef.current.paused) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
      hasInteracted.current = false;
    };

    controls.addEventListener('start', handleStart);
    controls.addEventListener('end', handleEnd);

    return () => {
      controls.removeEventListener('start', handleStart);
      controls.removeEventListener('end', handleEnd);
    };
  }, [controls]);

  return (
    <div style={{ position: 'absolute', width: '200%', height: '150%', zIndex: '10', bottom: '-180px', right: '-200px' }}>
      <audio ref={audioRef} src={audioSrc} preload="auto" />
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        style={{ width: '100%', height: '100%' }}
      >
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} intensity={1} />
        <directionalLight position={[-5, 5, 5]} intensity={0.5} />
        <Suspense fallback={<LoadingFallback />}>
          <Vase />
          <OrbitControls
            ref={setControls}
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
