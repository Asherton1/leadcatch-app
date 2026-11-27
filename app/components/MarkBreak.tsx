'use client'

import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js'
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js'

/**
 * The ReCapture mark, at scale, coming apart and being put back together.
 *
 * The brand plus (M12 4v16 M4 12h16) is rebuilt as 45 chunky beveled blocks
 * on a 9x9 grid, arms three cells wide. Dark physical material, lit almost
 * entirely by a rim light and a room environment, so it reads as a heavy
 * object rather than a graphic.
 *
 * Scroll is the only thing that moves it:
 *
 *   0.00 - 0.26   whole and still. Just the mark, dark on dark.
 *   0.26 - 0.56   it fractures. Blocks push out along their own radius.
 *   0.56 - 0.86   they are pulled back and seat.
 *   0.62 - 0.92   orange fires in the seams as they close.
 *
 * At rest there is NO autonomous animation. It is dead still and responds
 * only to the cursor, so nothing visibly repeats while you sit on the hero.
 */

const G = 9          // grid is 9x9
const ARM = 3        // arms are 3 cells wide
const PITCH = 0.304
const CELL = 0.30
const DEPTH = 0.62
const ORANGE = 0xff6b35   // the mark's own colour

export default function MarkBreak({ driveSelector = '[data-field-drive]' }: { driveSelector?: string }) {
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
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setClearColor(0x000000, 0)
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 1.05

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100)
    camera.position.z = small ? 7.6 : 6.6

    const group = new THREE.Group()
    group.rotation.set(0.10, -0.22, 0)
    group.position.x = small ? 0 : 0.82
    scene.add(group)

    // Studio reflections. Without this the blocks read as flat shapes.
    const pmrem = new THREE.PMREMGenerator(renderer)
    const envRT = pmrem.fromScene(new RoomEnvironment(), 0.04)
    scene.environment = envRT.texture

    const rim = new THREE.DirectionalLight(0xffffff, 2.1)
    rim.position.set(-3.4, 2.6, -2.2)
    scene.add(rim)
    const key = new THREE.DirectionalLight(0xffffff, 0.55)
    key.position.set(2.8, 1.4, 4.2)
    scene.add(key)
    const seamLight = new THREE.PointLight(ORANGE, 0, 6, 2)
    seamLight.position.set(0, 0, 0.1)
    scene.add(seamLight)

    // ---- which cells make the plus -----------------------------------
    const lo = (G - ARM) / 2
    const hi = lo + ARM
    const cells: { x: number; y: number }[] = []
    for (let gy = 0; gy < G; gy++) {
      for (let gx = 0; gx < G; gx++) {
        const inCol = gx >= lo && gx < hi
        const inRow = gy >= lo && gy < hi
        if (inCol || inRow) {
          cells.push({ x: (gx - (G - 1) / 2) * PITCH, y: ((G - 1) / 2 - gy) * PITCH })
        }
      }
    }
    const N = cells.length   // 45

    // Per-cell fracture behaviour.
    const dir: THREE.Vector3[] = []
    const axis: THREE.Vector3[] = []
    const spin = new Float32Array(N)
    const reach = new Float32Array(N)
    const lag = new Float32Array(N)
    for (let i = 0; i < N; i++) {
      const c = cells[i]
      const d = new THREE.Vector3(c.x, c.y, (Math.random() - 0.35) * 0.9)
      if (d.lengthSq() < 1e-6) d.set(0, 0, 1)
      dir.push(d.normalize())
      axis.push(new THREE.Vector3(Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.5).normalize())
      spin[i] = 0.45 + Math.random() * 1.5
      reach[i] = 0.9 + Math.random() * 2.1
      lag[i] = Math.random() * 0.22
    }

    const geo = new RoundedBoxGeometry(CELL, CELL, DEPTH, 3, 0.022)

    const body = new THREE.MeshPhysicalMaterial({
      color: 0x131418,
      roughness: 0.36,
      metalness: 0.52,
      clearcoat: 0.65,
      clearcoatRoughness: 0.28,
      envMapIntensity: 1.15,
    })
    const blocks = new THREE.InstancedMesh(geo, body, N)
    blocks.instanceMatrix.setUsage(THREE.DynamicDrawUsage)
    group.add(blocks)

    // Slightly inflated copies. When the blocks are seated these peek out
    // between them, so the light reads as coming from the seams.
    const seamMat = new THREE.MeshBasicMaterial({
      color: ORANGE,
      transparent: true,
      opacity: 0,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    })
    const seams = new THREE.InstancedMesh(geo, seamMat, N)
    seams.instanceMatrix.setUsage(THREE.DynamicDrawUsage)
    seams.scale.set(1, 1, 1)
    group.add(seams)

    const m = new THREE.Matrix4()
    const q = new THREE.Quaternion()
    const pos = new THREE.Vector3()
    const scl = new THREE.Vector3()

    host.appendChild(renderer.domElement)
    Object.assign(renderer.domElement.style, { width: '100%', height: '100%', display: 'block' })

    const resize = () => {
      const w = host.clientWidth, h = host.clientHeight
      if (!w || !h) return
      renderer.setSize(w, h, false)
      camera.aspect = w / h
      camera.updateProjectionMatrix()
    }
    resize()
    const ro = new ResizeObserver(resize); ro.observe(host)

    const ptr = { tx: 0, ty: 0, x: 0, y: 0 }
    const onMove = (e: PointerEvent) => {
      ptr.tx = (e.clientX / window.innerWidth - 0.5) * 0.46
      ptr.ty = (e.clientY / window.innerHeight - 0.5) * 0.3
    }
    if (!small && !reduced) window.addEventListener('pointermove', onMove, { passive: true })

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

    let raf = 0
    let p = 0
    const clamp01 = (x: number) => Math.min(1, Math.max(0, x))
    const ease = (x: number) => x * x * (3 - 2 * x)
    const smooth = (a: number, b: number, x: number) => ease(clamp01((x - a) / (b - a)))

    const build = () => {
      // Rises during the break, falls back to zero as they reassemble.
      const out = smooth(0.26, 0.56, p)
      const back = smooth(0.56, 0.86, p)
      const seamAmt = smooth(0.62, 0.92, p)

      for (let i = 0; i < N; i++) {
        const c = cells[i]
        // Stagger so they do not all leave and land on the same frame.
        const apart = clamp01(out - lag[i] * out) * (1 - clamp01(back - lag[i] * back))
        const k = ease(apart)

        pos.set(
          c.x + dir[i].x * k * reach[i],
          c.y + dir[i].y * k * reach[i],
          dir[i].z * k * reach[i] * 0.85
        )
        q.setFromAxisAngle(axis[i], k * spin[i] * Math.PI * 0.8)
        scl.setScalar(1)
        m.compose(pos, q, scl)
        blocks.setMatrixAt(i, m)

        // Seam shells only matter once the blocks are close to seated.
        const shell = seamAmt * (1 - k)
        scl.set(1 + 0.075 * shell, 1 + 0.075 * shell, 0.97)
        m.compose(pos, q, scl)
        seams.setMatrixAt(i, m)
      }

      blocks.instanceMatrix.needsUpdate = true
      seams.instanceMatrix.needsUpdate = true
      seamMat.opacity = seamAmt * 0.5
      seamLight.intensity = seamAmt * 3.4
    }

    const loop = () => {
      raf = requestAnimationFrame(loop)
      if (!visible) return

      p += (progress - p) * 0.08
      build()

      ptr.x += (ptr.tx - ptr.x) * 0.055
      ptr.y += (ptr.ty - ptr.y) * 0.055
      group.rotation.y = -0.22 + ptr.x + p * 0.42
      group.rotation.x = 0.10 + ptr.y * 0.7 - p * 0.1
      camera.position.z = (small ? 7.6 : 6.6) - p * 0.5

      renderer.render(scene, camera)
    }
    loop()

    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect(); io.disconnect()
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('scroll', readProgress)
      window.removeEventListener('resize', readProgress)
      geo.dispose(); body.dispose(); seamMat.dispose()
      envRT.texture.dispose(); pmrem.dispose()
      renderer.dispose()
      if (renderer.domElement.parentNode === host) host.removeChild(renderer.domElement)
    }
  }, [driveSelector])

  return <div ref={hostRef} className="intent-field" aria-hidden="true" />
}
