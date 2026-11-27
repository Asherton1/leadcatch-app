'use client'

import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js'

/**
 * A form coming apart, and the part of it we keep.
 *
 * The object is a form: a grid of polished tiles standing upright. As you
 * scroll it breaks up. Most tiles tumble away and fade, which is the
 * abandonment. About a fifth ignite orange and are pulled back into a
 * dense core, which is the recovery. Same physical material and lighting
 * as before, so it still reads as an object rather than an effect, but
 * now it is a picture of what the product does.
 */

const COLS = 13
const ROWS = 18
const TILE = 0.112
const GAP = 0.03

export default function FormBreak({ driveSelector = '[data-field-drive]' }: { driveSelector?: string }) {
  const hostRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const host = hostRef.current
    if (!host) return

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const small = window.matchMedia('(max-width: 900px)').matches

    let renderer: THREE.WebGLRenderer
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' })
    } catch { return }

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, small ? 1.5 : 2))
    renderer.setClearColor(0x000000, 0)
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 1.1

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 100)
    camera.position.set(0, 0, 6.2)

    const pmrem = new THREE.PMREMGenerator(renderer)
    const envRT = pmrem.fromScene(new RoomEnvironment(), 0.04)
    scene.environment = envRT.texture

    const geo = new THREE.BoxGeometry(TILE, TILE, TILE * 0.42)

    const lostMat = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color('#15151a'),
      metalness: 0.88, roughness: 0.26, clearcoat: 0.8, envMapIntensity: 1.1,
    })
    const keptMat = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color('#2a1208'),
      metalness: 0.75, roughness: 0.18, clearcoat: 1,
      emissive: new THREE.Color('#ff6b35'), emissiveIntensity: 0.35,
      envMapIntensity: 1.3,
    })

    type Tile = {
      home: THREE.Vector3
      dir: THREE.Vector3
      spin: THREE.Vector3
      seed: number
      kept: boolean
      idx: number
    }

    const tiles: Tile[] = []
    const w = COLS * (TILE + GAP)
    const h = ROWS * (TILE + GAP)

    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLS; c++) {
        // Leave a gutter so the slab reads as a form, not a wall.
        const isGutter = r === 2 || r === 7 || r === 12
        if (isGutter && c > 1 && c < COLS - 1 && Math.random() < 0.55) continue

        const x = (c + 0.5) * (TILE + GAP) - w / 2
        const y = h / 2 - (r + 0.5) * (TILE + GAP)
        const kept = Math.random() < 0.2

        tiles.push({
          home: new THREE.Vector3(x, y, 0),
          dir: new THREE.Vector3(x * 1.6 + (Math.random() - 0.5), y * 1.4 + (Math.random() - 0.5), (Math.random() - 0.3) * 3.2).normalize(),
          spin: new THREE.Vector3(Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.5).multiplyScalar(3.4),
          seed: Math.random(),
          kept,
          idx: 0,
        })
      }
    }

    const lost = tiles.filter(t => !t.kept)
    const kept = tiles.filter(t => t.kept)
    lost.forEach((t, i) => (t.idx = i))
    kept.forEach((t, i) => (t.idx = i))

    const lostMesh = new THREE.InstancedMesh(geo, lostMat, lost.length)
    const keptMesh = new THREE.InstancedMesh(geo, keptMat, kept.length)
    lostMesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage)
    keptMesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage)

    const group = new THREE.Group()
    group.add(lostMesh, keptMesh)
    scene.add(group)

    const key = new THREE.DirectionalLight('#ffffff', 2.4)
    key.position.set(3, 3, 5)
    scene.add(key)

    const rim = new THREE.PointLight('#ff6b35', 26, 16, 2)
    rim.position.set(-2.4, 0.8, 1.6)
    scene.add(rim)

    host.appendChild(renderer.domElement)
    Object.assign(renderer.domElement.style, { width: '100%', height: '100%', display: 'block' })

    const resize = () => {
      const cw = host.clientWidth, ch = host.clientHeight
      if (!cw || !ch) return
      renderer.setSize(cw, ch, false)
      camera.aspect = cw / ch
      camera.updateProjectionMatrix()
    }
    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(host)

    const ptr = { tx: 0, ty: 0, x: 0, y: 0 }
    const onMove = (e: PointerEvent) => {
      ptr.tx = (e.clientX / window.innerWidth - 0.5) * 0.8
      ptr.ty = (e.clientY / window.innerHeight - 0.5) * 0.5
    }
    if (!small) window.addEventListener('pointermove', onMove, { passive: true })

    const driver = document.querySelector(driveSelector) as HTMLElement | null
    let progress = 0
    const readProgress = () => {
      if (!driver) return
      const r = driver.getBoundingClientRect()
      const total = r.height - window.innerHeight
      progress = total > 0 ? Math.min(1, Math.max(0, -r.top / total)) : 0
    }
    readProgress()
    window.addEventListener('scroll', readProgress, { passive: true })
    window.addEventListener('resize', readProgress)

    let visible = true
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting }, { threshold: 0 })
    io.observe(host)

    const clock = new THREE.Clock()
    const m = new THREE.Matrix4()
    const q = new THREE.Quaternion()
    const e = new THREE.Euler()
    const pos = new THREE.Vector3()
    const scl = new THREE.Vector3()
    let raf = 0
    let p = 0

    const easeOut = (x: number) => 1 - Math.pow(1 - x, 3)

    const loop = () => {
      raf = requestAnimationFrame(loop)
      if (!visible) return

      const t = reduced ? 0 : clock.getElapsedTime()
      p += (progress - p) * 0.06

      // Break starts a third of the way in; recovery pulls back after that.
      const breakUp = easeOut(Math.min(1, Math.max(0, (p - 0.12) / 0.55)))
      const recover = easeOut(Math.min(1, Math.max(0, (p - 0.5) / 0.5)))

      const write = (list: Tile[], mesh: THREE.InstancedMesh) => {
        for (const tile of list) {
          const wobble = Math.sin(t * 1.1 + tile.seed * 8.0) * 0.012

          if (tile.kept) {
            // Thrown out with everything else, then reeled into the core.
            const fly = breakUp * (1 - recover)
            pos.copy(tile.home)
              .addScaledVector(tile.dir, fly * (1.8 + tile.seed * 1.4))
              .multiplyScalar(1 - recover * 0.82)
            pos.x += Math.sin(t * 0.9 + tile.seed * 6.0) * 0.05 * recover
            pos.y += Math.cos(t * 0.8 + tile.seed * 6.0) * 0.05 * recover
            pos.z += wobble
            const s = 1 + recover * 0.35
            scl.set(s, s, s)
            e.set(tile.spin.x * fly * 2.2, tile.spin.y * fly * 2.2 + t * 0.25 * recover, tile.spin.z * fly * 2.2)
          } else {
            pos.copy(tile.home).addScaledVector(tile.dir, breakUp * (2.4 + tile.seed * 3.6))
            pos.z += wobble
            const s = Math.max(0, 1 - breakUp * (0.55 + tile.seed * 0.5))
            scl.set(s, s, s)
            e.set(tile.spin.x * breakUp * 3.0, tile.spin.y * breakUp * 3.0, tile.spin.z * breakUp * 3.0)
          }

          q.setFromEuler(e)
          m.compose(pos, q, scl)
          mesh.setMatrixAt(tile.idx, m)
        }
        mesh.instanceMatrix.needsUpdate = true
      }

      write(lost, lostMesh)
      write(kept, keptMesh)

      keptMat.emissiveIntensity = 0.3 + recover * 1.5
      rim.intensity = 26 + recover * 55

      ptr.x += (ptr.tx - ptr.x) * 0.05
      ptr.y += (ptr.ty - ptr.y) * 0.05
      group.rotation.y = ptr.x + p * 0.85 + (reduced ? 0 : Math.sin(t * 0.18) * 0.06)
      group.rotation.x = ptr.y * 0.7 + p * 0.18

      camera.position.z = 6.2 - p * 1.3

      renderer.render(scene, camera)
    }
    loop()

    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect(); io.disconnect()
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('scroll', readProgress)
      window.removeEventListener('resize', readProgress)
      geo.dispose(); lostMat.dispose(); keptMat.dispose()
      lostMesh.dispose(); keptMesh.dispose()
      envRT.texture.dispose(); pmrem.dispose(); renderer.dispose()
      if (renderer.domElement.parentNode === host) host.removeChild(renderer.domElement)
    }
  }, [driveSelector])

  return <div ref={hostRef} className="intent-field" aria-hidden="true" />
}
