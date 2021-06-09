import { resolve } from 'path'
import { OpenDialogOptions, OpenDialogReturnValue } from 'electron'
import { Suspense, useEffect, useState } from 'react'
import { Canvas, useFrame, useLoader } from '@react-three/fiber'
import { Vector3 } from 'three'
import { VRM, VRMSchema, VRMUtils } from '@pixiv/three-vrm'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

import Box from './Box'
import OrbitControl from './OrbitControl'
import { ipcr } from '@/utils/ipc'
import { CHANNEL } from '@/types/ipc'

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
  const [url, setUrl] = useState<string | undefined>()

  const openFile = async () => {
    const result = await ipcr<OpenDialogOptions, OpenDialogReturnValue>(CHANNEL.openFileDialog, {
      title: 'Select a VRoid model file',
      filters: [{
        name: 'VRoid model (.vrm)',
        extensions: ['vrm']
      }]
    })

    if (result.canceled) {
      return
    }

    setUrl(resolve('file:/', __dirname, result.filePaths[0]))
  }

  return (
    <div style={{
      width: '100vw',
      height: '100vh'
    }}
    >
      <div style={{
        position: 'absolute',
        zIndex: 1000
      }}
      >
        <button
          onClick={() => openFile()}
        >
          open
        </button>
      </div>
      <Suspense fallback={<div>loading...</div>}>
        <Canvas>
          <ambientLight />
          <pointLight color={[0.3, 0.3, 0.3]} position={[10, 10, 10]} />
          <gridHelper />
          <OrbitControl />
          <Box position={[-1.2, 0, 0]} />
          <Box position={[1.2, 0, 0]} />
          {url && <Vrm url={url} />}
        </Canvas>
      </Suspense>
    </div>
  )
}

export default Three
