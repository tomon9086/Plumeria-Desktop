import { Suspense, useEffect, useRef, useState } from 'react'
import { Canvas, useFrame, useLoader } from '@react-three/fiber'
import { Mesh, Vector3 } from 'three'
import { VRM, VRMSchema, VRMUtils } from '@pixiv/three-vrm'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

import OrbitControl from './OrbitControl'

const Box = (props: JSX.IntrinsicElements['mesh']) => {
  const mesh = useRef<Mesh>(null!)
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
  const [vrm, setVrm] = useState<VRM | undefined>()
  const gltf = useLoader(GLTFLoader, url)

  useEffect(() => {
    VRMUtils.removeUnnecessaryJoints(gltf.scene)
    VRM.from(gltf)
      .then((vrm) => {
        setVrm(vrm)
        vrm.humanoid
          ?.getBoneNode(VRMSchema.HumanoidBoneName.Hips)
          ?.rotateY(Math.PI)
      })
  }, [gltf, setVrm])

  useFrame((state, delta) => {
    const mouse = state.mouse
    const headBone = vrm?.humanoid?.getBoneNode(VRMSchema.HumanoidBoneName.LeftEye) || undefined
    vrm?.lookAt?.lookAt(new Vector3(
      mouse.x,
      mouse.y + (headBone?.position.y ?? 0),
      1))
    vrm?.update(delta)
  })

  return (
    vrm?.scene
      ? <primitive dispose={null} object={vrm?.scene} />
      : null
  )
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
      <Suspense fallback={<div>loading...</div>}>
        <Canvas>
          <ambientLight />
          <pointLight color={[0.3, 0.3, 0.3]} position={[10, 10, 10]} />
          <gridHelper />
          <OrbitControl />
          <Box position={[-1.2, 0, 0]} />
          <Box position={[1.2, 0, 0]} />
          {/* eslint-disable-next-line node/no-path-concat */}
          <Vrm url={`file://${__dirname}/model/test.vrm`} />
        </Canvas>
      </Suspense>
    </div>
  )
}

export default Three
