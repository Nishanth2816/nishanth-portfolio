import { Suspense, useEffect, useMemo, useRef, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { AdditiveBlending, Color, DynamicDrawUsage, MathUtils, Object3D, type Group, type InstancedMesh, type Points, type Mesh, type PerspectiveCamera } from 'three';
import type { MutableRefObject } from 'react';

interface SceneProps {
  progress: MutableRefObject<number>;
  motionEnabled: boolean;
  onReady: () => void;
}

const orbitAngles = Array.from({ length: 58 }, (_, index) => (index / 58) * Math.PI * 2);

function SatelliteNodes({ count }: { count: number }) {
  const ref = useRef<InstancedMesh>(null);
  const dummy = useMemo(() => new Object3D(), []);

  useEffect(() => {
    const mesh = ref.current;
    if (!mesh) return;
    for (let i = 0; i < count; i += 1) {
      const angle = orbitAngles[i % orbitAngles.length];
      const tilt = Math.sin(angle * 4) * 0.23;
      const radius = i % 7 === 0 ? 2.58 : 2.07;
      dummy.position.set(Math.cos(angle) * radius, Math.sin(angle * 1.6) * 0.5 + tilt, Math.sin(angle) * radius * 0.55);
      dummy.scale.setScalar(i % 9 === 0 ? 1.9 : 0.75);
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);
    }
    mesh.instanceMatrix.setUsage(DynamicDrawUsage);
    mesh.instanceMatrix.needsUpdate = true;
  }, [count, dummy]);

  return (
    <instancedMesh ref={ref} args={[undefined, undefined, count]}>
      <sphereGeometry args={[0.023, 7, 6]} />
      <meshBasicMaterial color="#7becff" toneMapped={false} />
    </instancedMesh>
  );
}

function ParticleCloud({ count, motionEnabled }: { count: number; motionEnabled: boolean }) {
  const points = useRef<Points>(null);
  const positions = useMemo(() => {
    const coords = new Float32Array(count * 3);
    // Deterministic positions avoid hydration/snapshot instability.
    let seed = 751;
    const random = () => { seed = (seed * 16807) % 2147483647; return seed / 2147483647; };
    for (let i = 0; i < count; i += 1) {
      const distance = 3.4 + random() * 18;
      const theta = random() * Math.PI * 2;
      const height = (random() - 0.5) * 1.9;
      coords[i * 3] = Math.cos(theta) * distance;
      coords[i * 3 + 1] = height * distance * 0.6;
      coords[i * 3 + 2] = Math.sin(theta) * distance - 5;
    }
    return coords;
  }, [count]);

  useFrame((_, delta) => {
    if (motionEnabled && points.current) points.current.rotation.y += delta * 0.0015;
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.025} color="#9bbffa" transparent opacity={0.48} sizeAttenuation depthWrite={false} blending={AdditiveBlending} />
    </points>
  );
}

function EnergyCore({ motionEnabled, compact }: { motionEnabled: boolean; compact: boolean }) {
  const assembly = useRef<Group>(null);
  const outerShell = useRef<Mesh>(null);
  const ringA = useRef<Mesh>(null);
  const ringB = useRef<Mesh>(null);
  const ringC = useRef<Mesh>(null);
  const mouse = useRef({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);

  // Track the pointer at window level: text overlays must not block the 3D parallax.
  useEffect(() => {
    const move = (event: PointerEvent) => {
      mouse.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('pointermove', move, { passive: true });
    return () => { window.removeEventListener('pointermove', move); document.body.style.cursor = ''; };
  }, []);

  useFrame(({ clock }, delta) => {
    if (!assembly.current) return;
    if (!motionEnabled) return;
    const t = clock.elapsedTime;
    const targetX = mouse.current.y * -0.09;
    const targetY = mouse.current.x * 0.15;
    assembly.current.rotation.x = MathUtils.damp(assembly.current.rotation.x, targetX, 2, delta);
    assembly.current.rotation.y = MathUtils.damp(assembly.current.rotation.y, targetY, 2, delta);
    assembly.current.position.y = Math.sin(t * 0.75) * 0.13;
    if (outerShell.current) outerShell.current.rotation.y += delta * 0.10;
    if (ringA.current) ringA.current.rotation.z += delta * 0.045;
    if (ringB.current) ringB.current.rotation.z -= delta * 0.035;
    if (ringC.current) ringC.current.rotation.x += delta * 0.025;
  });

  const shellScale = compact ? 0.82 : 1;
  return (
    <group ref={assembly} scale={shellScale}>
      <pointLight position={[0.2, 0, 0.2]} intensity={hovered ? 36 : 22} color="#5ad5ff" distance={7.5} decay={2} />
      <pointLight position={[-1.4, 1.3, 0.8]} intensity={12} color="#7d6dff" distance={8} />
      <mesh
        onPointerOver={(event) => { event.stopPropagation(); setHovered(true); document.body.style.cursor = 'crosshair'; }}
        onPointerOut={() => { setHovered(false); document.body.style.cursor = ''; }}
        rotation={[0.2, 0.1, 0.3]}
      >
        <icosahedronGeometry args={[1.12, compact ? 2 : 3]} />
        <meshPhysicalMaterial color={new Color('#0d3453')} metalness={0.55} roughness={0.18} transmission={0.22} thickness={1.4} ior={1.5} clearcoat={1} clearcoatRoughness={0.09} emissive={new Color('#0c4280')} emissiveIntensity={hovered ? 1.05 : 0.5} flatShading />
      </mesh>
      <mesh ref={outerShell} scale={1.19} rotation={[0.17, 0.7, 0.2]}>
        <icosahedronGeometry args={[1.12, 2]} />
        <meshBasicMaterial color="#66deff" wireframe transparent opacity={0.19} depthWrite={false} />
      </mesh>
      <mesh scale={0.84}>
        <icosahedronGeometry args={[0.88, 1]} />
        <meshBasicMaterial color="#46d9ff" wireframe transparent opacity={0.28} />
      </mesh>
      <mesh ref={ringA} rotation={[Math.PI / 2.38, 0.35, 0.06]}>
        <torusGeometry args={[2.1, 0.009, 4, 180]} />
        <meshBasicMaterial color="#4ac7ee" transparent opacity={0.85} toneMapped={false} />
      </mesh>
      <mesh ref={ringB} rotation={[Math.PI / 2.7, 0.8, 1.4]}>
        <torusGeometry args={[1.76, 0.006, 4, 170]} />
        <meshBasicMaterial color="#8c7aff" transparent opacity={0.55} toneMapped={false} />
      </mesh>
      <mesh ref={ringC} rotation={[1.68, 0.6, 0.9]}>
        <torusGeometry args={[2.5, 0.003, 3, 180]} />
        <meshBasicMaterial color="#2eaacc" transparent opacity={0.28} toneMapped={false} />
      </mesh>
      <SatelliteNodes count={compact ? 25 : 58} />
      <mesh scale={1.4}>
        <sphereGeometry args={[1.06, 32, 16]} />
        <meshBasicMaterial color="#2869cb" transparent opacity={0.025} blending={AdditiveBlending} depthWrite={false} />
      </mesh>
    </group>
  );
}

function SceneContents({ progress, motionEnabled, onReady }: SceneProps) {
  const stage = useRef<Group>(null);
  const camera = useThree((state) => state.camera as PerspectiveCamera);
  const { size } = useThree();
  const compact = size.width < 820;

  useEffect(() => { onReady(); }, [onReady]);

  useFrame((_, delta) => {
    if (!stage.current) return;
    const t = MathUtils.clamp(progress.current, 0, 1);
    const keyframes = [
      { p: 0, x: 1.48, y: 0.0, z: 0, cameraX: 0, cameraY: 0, cameraZ: 8.8 },
      { p: 0.23, x: 2.45, y: -0.15, z: -1.1, cameraX: -0.5, cameraY: 0.15, cameraZ: 9.3 },
      { p: 0.48, x: -2.5, y: 0.15, z: -1.6, cameraX: 0.4, cameraY: -0.25, cameraZ: 9.5 },
      { p: 0.73, x: 2.4, y: 0.0, z: -2, cameraX: -0.25, cameraY: 0.2, cameraZ: 9.6 },
      { p: 1, x: 0, y: 0.15, z: -0.35, cameraX: 0, cameraY: 0, cameraZ: 8.0 },
    ];
    let index = 0;
    while (index < keyframes.length - 2 && t > keyframes[index + 1].p) index += 1;
    const a = keyframes[index];
    const b = keyframes[index + 1];
    const local = (t - a.p) / (b.p - a.p);
    const eased = local * local * (3 - 2 * local);
    const blend = (key: 'x' | 'y' | 'z' | 'cameraX' | 'cameraY' | 'cameraZ') => MathUtils.lerp(a[key], b[key], eased);
    const targetX = compact ? 0.8 : blend('x');
    const stageScale = compact ? 0.72 : 1;
    stage.current.position.set(
      MathUtils.damp(stage.current.position.x, targetX, 2, delta),
      MathUtils.damp(stage.current.position.y, blend('y'), 2, delta),
      MathUtils.damp(stage.current.position.z, blend('z'), 2, delta)
    );
    stage.current.scale.setScalar(stageScale);
    if (motionEnabled) stage.current.rotation.y = MathUtils.damp(stage.current.rotation.y, t * Math.PI * 1.2, 0.7, delta);
    if (!motionEnabled) return;
    camera.position.x = MathUtils.damp(camera.position.x, compact ? 0 : blend('cameraX'), 1.2, delta);
    camera.position.y = MathUtils.damp(camera.position.y, blend('cameraY'), 1.2, delta);
    camera.position.z = MathUtils.damp(camera.position.z, blend('cameraZ'), 1.2, delta);
    camera.lookAt(0, 0, 0);
  });

  return (
    <>
      <fog attach="fog" args={['#040711', 11, 30]} />
      <ambientLight intensity={0.22} color="#7fb7ff" />
      <directionalLight position={[3, 6, 4]} intensity={1.9} color="#a9d4ff" />
      <pointLight position={[-5, -2, 3]} intensity={20} color="#6340c7" distance={16} decay={2} />
      <group ref={stage} position={[1.48, 0, 0]}>
        <EnergyCore compact={compact} motionEnabled={motionEnabled} />
      </group>
      <ParticleCloud count={compact ? 280 : 950} motionEnabled={motionEnabled} />
      <gridHelper args={[32, 42, '#163453', '#0a1a30']} position={[0, -4.6, -2]} rotation={[0, 0, 0]} />
    </>
  );
}

/** Decorative scene is not essential content; everything is accessible without WebGL. */
export default function NeuralScene({ progress, motionEnabled, onReady }: SceneProps) {
  const [supported, setSupported] = useState<boolean | null>(null);

  useEffect(() => {
    try {
      const canvas = document.createElement('canvas');
      const hasContext = Boolean(canvas.getContext('webgl2') || canvas.getContext('webgl'));
      setSupported(hasContext);
      if (!hasContext) onReady();
    } catch {
      setSupported(false);
      onReady();
    }
  }, [onReady]);

  if (supported === null) return <div className="scene-placeholder" aria-hidden="true" />;
  if (!supported) return <div className="scene-placeholder scene-no-webgl" aria-hidden="true"><div className="fallback-orb" /></div>;
  return (
    <div className="scene-webgl" aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0, 8.8], fov: 48, near: 0.1, far: 65 }}
        dpr={[1, 1.5]}
        gl={{ alpha: true, antialias: true, powerPreference: 'high-performance' }}
        frameloop={motionEnabled ? 'always' : 'demand'}
        onCreated={() => onReady()}
        fallback={<div className="fallback-orb" />}
      >
        <Suspense fallback={null}>
          <SceneContents progress={progress} motionEnabled={motionEnabled} onReady={onReady} />
        </Suspense>
      </Canvas>
    </div>
  );
}
