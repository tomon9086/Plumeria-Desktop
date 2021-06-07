import { useRef } from 'react'
import { ReactThreeFiber, extend, useFrame, useThree } from '@react-three/fiber'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

extend({ OrbitControls })

declare global {
  // eslint-disable-next-line no-unused-vars
  namespace JSX {
    // eslint-disable-next-line no-unused-vars
    interface IntrinsicElements {
      readonly orbitControls: ReactThreeFiber.Object3DNode<OrbitControls, typeof OrbitControls>
    }
  }
}

const Controls = (props: ReactThreeFiber.Object3DNode<OrbitControls, typeof OrbitControls>) => {
  const {
    camera,
    gl: { domElement }
  } = useThree()
  const controls = useRef({} as OrbitControls)

  useFrame(() => controls.current.update())

  return <orbitControls {...props} args={[camera, domElement]} ref={controls} />
}

export default Controls
