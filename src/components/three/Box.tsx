import { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { Mesh } from 'three'

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

export default Box
