import { Suspense, useEffect, useRef, useState } from 'react'
import { Canvas, useFrame, useLoader } from '@react-three/fiber'
import { Group, Scene, THREE } from 'three'
import { VRM, VRMUtils } from '@pixiv/three-vrm'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

import OrbitControl from './OrbitControl'

const Box = (props: JSX.IntrinsicElements['mesh']) => {
  const mesh = useRef<THREE.Mesh>(null!)
  const [hovered, setHover] = useState(false)
  const [active, setActive] = useState(false)

  useFrame((_state, _delta) => {
    mesh.current.rotation.x += 0.01
    mesh.current.rotation.y += 0.01
    mesh.current.rotation.z += 0.01
  })

  return (
    <mesh
      {...props}
      onClick={(_event) => setActive(!active)}
      onPointerOut={(_event) => setHover(false)}
      onPointerOver={(_event) => setHover(true)}
      ref={mesh}
      scale={active ? 1.5 : 1}
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
    </mesh>
  )
}

interface Props {
  url: string
}

const Vrm = ({ url }: Props) => {
  const [scene, setScene] = useState<Scene | Group | null>(null)
  const gltf = useLoader(GLTFLoader, url)

  useEffect(() => {
    VRMUtils.removeUnnecessaryJoints(gltf.scene)
    VRM.from(gltf)
      .then((vrm) => {
        setScene(vrm.scene)
        // const boneNode = vrm.humanoid?.getBoneNode(VRMSchema.HumanoidBoneName.Hips)
        // boneNode?.rotateY(Math.PI)
      })
  }, [gltf, setScene])

  if (scene === null) {
    return null
  }

  return <primitive dispose={null} object={scene} />
}

const Three = () => {
  return (
    <div style={{
      width: '100vw',
      height: '100vh'
    }}
    >
      <h1 style={{
        position: 'absolute'
      }}
      >
        Three!
      </h1>
      <Suspense fallback={<div>loading @three</div>}>
        <Canvas>
          <ambientLight />
          <pointLight color={[0.3, 0.3, 0.3]} position={[10, 10, 10]} />
          <gridHelper />
          <OrbitControl />
          <Box position={[-1.2, 0, 0]} />
          <Box position={[1.2, 0, 0]} />
          {/* <Vrm url='/model/test.vrm' /> */}
        </Canvas>
      </Suspense>
    </div>
  )
}

export default Three
