import React, { Suspense, useRef, useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import audioSrc from "../../assets/audio/audio.wav"

const Vase = ({ modelPath, scale }) => {
  const { scene } = useGLTF(modelPath);
  return <primitive object={scene} scale={scale} />;
};

useGLTF.preload('/models/Ancient_Greek_Battle.glb');

const VaseViewer = ({
  modelPath = '/models/Ancient_Greek_Battle.glb',
  scale = 1.88,
  enableControls = true,
}) => {
  const [controls, setControls] = useState(null); // State for controls
  const audioRef = useRef(null);
  const hasInteracted = useRef(false);

  useEffect(() => {
    if (!controls || !audioRef.current) return;
  
    const handleStart = () => {
      if (!hasInteracted.current) {
        audioRef.current.volume = 0.01;
        audioRef.current.play().catch((error) => {
          console.error('Audio playback failed:', error);
        });
        hasInteracted.current = true;
      }
    };
  
    const handleEnd = () => {
      if (!audioRef.current.paused) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0; // reset to beginning
      }
      hasInteracted.current = false; // allow playback again on next interaction
    };
  
    controls.addEventListener('start', handleStart);
    controls.addEventListener('end', handleEnd);
  
    return () => {
      controls.removeEventListener('start', handleStart);
      controls.removeEventListener('end', handleEnd);
    };
  }, [controls]);
  

  return (
    <>
      <audio
        ref={audioRef}
        src={audioSrc} // Update path or use import
        preload="auto"
      />
      <Canvas camera={{ position: [0, 1, 3] }} style={{ width: '110%', height: '110%' }}>
        <ambientLight intensity={0.8} />
        <directionalLight position={[2, 2, 5]} intensity={1} />
        <Suspense fallback={null}>
          <Vase modelPath={modelPath} scale={scale} />
          {enableControls && (
            <OrbitControls
              ref={setControls} // Use state-based ref
              enableZoom={true}
            />
          )}
        </Suspense>
      </Canvas>
    </>
  );
};

export default VaseViewer;