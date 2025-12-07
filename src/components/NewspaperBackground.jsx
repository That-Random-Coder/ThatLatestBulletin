import { useEffect, useRef } from 'react'
import * as THREE from 'three'

const NewspaperBackground = ({ theme }) => {
  const mountRef = useRef(null)

  useEffect(() => {
    const mount = mountRef.current
    if (!mount) return undefined

    const scene = new THREE.Scene()
    scene.fog = new THREE.Fog(theme === 'dark' ? 0x040a05 : 0xf0f4ff, 12, 50)

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.8))
    renderer.setSize(mount.clientWidth, mount.clientHeight)
    renderer.setClearColor(0x000000, 0)
    mount.appendChild(renderer.domElement)

    const camera = new THREE.PerspectiveCamera(
      32,
      mount.clientWidth / mount.clientHeight,
      0.1,
      100,
    )
    camera.position.set(0, 0.6, 12)

    const light = new THREE.PointLight(0x66ffcc, 1.2)
    light.position.set(3, 3, 6)
    scene.add(light)
    scene.add(new THREE.AmbientLight(theme === 'dark' ? 0x0f1f16 : 0xcdd7e5, 0.55))

    const canvas = document.createElement('canvas')
    canvas.width = 512
    canvas.height = 512
    const ctx = canvas.getContext('2d')
    ctx.fillStyle = theme === 'dark' ? '#05100c' : '#f5f5f0'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    ctx.fillStyle = theme === 'dark' ? '#0d2b1f' : '#d7d7cf'
    for (let i = 20; i < 512; i += 40) {
      ctx.fillRect(0, i, 512, 2)
    }
    ctx.fillStyle = theme === 'dark' ? '#1eff9c' : '#0f6c3c'
    ctx.font = 'bold 46px "Space Grotesk", sans-serif'
    ctx.fillText('The Bulletin', 40, 120)
    ctx.font = '24px "Space Grotesk", sans-serif'
    ctx.fillText('Global Dispatch', 40, 180)
    ctx.fillText('Tech / Science / Cities', 40, 230)
    ctx.fillStyle = theme === 'dark' ? '#0a1c14' : '#c2c2b8'
    for (let x = 40; x < 512; x += 120) {
      ctx.fillRect(x, 260, 60, 200)
    }
    const paperTexture = new THREE.CanvasTexture(canvas)
    paperTexture.wrapS = THREE.RepeatWrapping
    paperTexture.wrapT = THREE.RepeatWrapping
    paperTexture.repeat.set(3, 2)

    const plane = new THREE.Mesh(
      new THREE.PlaneGeometry(32, 18, 32, 32),
      new THREE.MeshStandardMaterial({
        map: paperTexture,
        roughness: 0.85,
        metalness: 0.08,
        transparent: true,
        opacity: 0.42,
        color: theme === 'dark' ? 0x0a1913 : 0xffffff,
      }),
    )
    plane.rotation.x = -0.22
    plane.rotation.z = 0.08
    scene.add(plane)

    const clock = new THREE.Clock()
    let frameId
    const animate = () => {
      const t = clock.getElapsedTime()
      plane.rotation.z = 0.08 + Math.sin(t * 0.2) * 0.08
      plane.position.y = Math.sin(t * 0.5) * 0.22
      paperTexture.offset.y = t * 0.05
      renderer.render(scene, camera)
      frameId = requestAnimationFrame(animate)
    }
    animate()

    const handleResize = () => {
      if (!mount) return
      renderer.setSize(mount.clientWidth, mount.clientHeight)
      camera.aspect = mount.clientWidth / mount.clientHeight
      camera.updateProjectionMatrix()
    }
    window.addEventListener('resize', handleResize)

    return () => {
      cancelAnimationFrame(frameId)
      window.removeEventListener('resize', handleResize)
      paperTexture.dispose()
      plane.geometry.dispose()
      plane.material.dispose()
      renderer.dispose()
      mount.removeChild(renderer.domElement)
    }
  }, [theme])

  return <div className="three-bg" ref={mountRef} aria-hidden />
}

export default NewspaperBackground
