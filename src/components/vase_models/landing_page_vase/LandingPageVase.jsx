
import { Suspense, useRef, useEffect, useState } from "react"
import { Canvas } from "@react-three/fiber"
import { OrbitControls, useGLTF } from "@react-three/drei"
import audioSrc from "../../assets/audio/audio.wav"

useGLTF.preload("/models/Ancient_Greek_Battle.glb")

const Vase = ({ onLoaded }) => {
  const { scene } = useGLTF("/models/Ancient_Greek_Battle.glb")
  useEffect(() => {
    if (scene) onLoaded()
  }, [scene, onLoaded])
  return <primitive object={scene} />
}

const LandingPageVase = ({ onLoaded = () => {} }) => {
  const controlsRef = useRef(null)
  const audioRef = useRef(null)
  const [isLoading, setIsLoading] = useState(true)

  // Audio fix start -------------------------------------------------
  useEffect(() => {
    const initAudio = () => {
      if (!controlsRef.current || !audioRef.current) return
      
      const controls = controlsRef.current
      const audio = audioRef.current
      
      const handleStart = () => {
        audio.volume = 0.3
        audio.play().catch(error => {
          console.log("Playback prevented:", error)
        })
      }
      
      const handleEnd = () => {
        audio.pause()
        audio.currentTime = 0
      }

      controls.addEventListener("start", handleStart)
      controls.addEventListener("end", handleEnd)

      return () => {
        controls.removeEventListener("start", handleStart)
        controls.removeEventListener("end", handleEnd)
      }
    }

    // Retry initialization every 100ms until controls are ready
    const interval = setInterval(initAudio, 100)
    return () => clearInterval(interval)
  }, [])
  // Audio fix end ---------------------------------------------------

  useEffect(() => {
    if (controlsRef.current) {
      controlsRef.current.enableZoom = false
      controlsRef.current.minPolarAngle = Math.PI / 2
      controlsRef.current.maxPolarAngle = Math.PI / 2
      controlsRef.current.minAzimuthAngle = -Math.PI / 4
      controlsRef.current.maxAzimuthAngle = Math.PI / 4
      controlsRef.current.rotateSpeed = 0.5
      controlsRef.current.autoRotate = true
      controlsRef.current.autoRotateSpeed = 0.5
    }
  }, [])

  return (
    <>
      {isLoading && <div className="loading-indicator">Loading...</div>}
      <audio ref={audioRef} src={audioSrc} preload="auto" />
      
      <Canvas camera={{ position: [0, 1, 3] }} camera={{ position: [0, 0, 4], fov: 40 }}
        style={{
          width: "100vw",
          height: "100vh",
          position: "absolute",
          top: -550,
          left: -800,
        }}>
        <ambientLight intensity={0.8} />
        <directionalLight position={[2, 2, 5]} intensity={1} />
        <Suspense fallback={null}>
          <Vase onLoaded={() => setIsLoading(false)} />
          <OrbitControls ref={controlsRef} />
        </Suspense>
      </Canvas>
    </>
  )
}

export default LandingPageVase
