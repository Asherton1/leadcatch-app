'use client'

import { useEffect, useRef } from 'react'
import * as THREE from 'three'

/**
 * Traffic, leaking away, and the part of it that gets pulled back.
 *
 * Thousands of particles stream left to right through a curl-noise field,
 * each dragging a fading tail. Most drift off the right edge and die grey:
 * that is the 97% who fill in a form and vanish. A fifth are caught by an
 * attractor, ignite orange, spiral into a core and get re-emitted upstream.
 * That is the product.
 *
 * Scroll does not break or rebuild anything. It turns the recovery on:
 *
 *   0.00 - 0.35   grey stream, nothing caught, attractor cold
 *   0.35 - 0.78   the attractor spins up, orange return arcs appear
 *   0.78 - 1.00   dense recirculation, hot core, the grey thins out
 *
 * Nothing here loops. The field is driven by four mutually incommensurate
 * time frequencies and every particle respawns on its own clock, so there
 * is no cycle to notice while you sit on the hero.
 */

const FOCAL_X = 1.05
const FOCAL_Y = 0.02
const TAIL = 7
const SEG = TAIL - 1
const VERTS = SEG * 2
const X_MIN = -3.35
const X_MAX = 3.3
const Y_SPAN = 1.95

const GREY = [0.42, 0.43, 0.48]
const ORANGE = [1.0, 0.42, 0.16]
const HOT = [1.0, 0.74, 0.47]

function glowTexture() {
  const c = document.createElement('canvas')
  c.width = c.height = 128
  const g = c.getContext('2d')!
  const grad = g.createRadialGradient(64, 64, 0, 64, 64, 64)
  grad.addColorStop(0, 'rgba(255,180,120,1)')
  grad.addColorStop(0.25, 'rgba(255,110,40,0.45)')
  grad.addColorStop(1, 'rgba(255,90,20,0)')
  g.fillStyle = grad
  g.fillRect(0, 0, 128, 128)
  const t = new THREE.CanvasTexture(c)
  t.colorSpace = THREE.SRGBColorSpace
  return t
}

export default function StreamField({ driveSelector = '[data-field-drive]' }: { driveSelector?: string }) {
  const hostRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const host = hostRef.current
    if (!host) return

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const small = window.matchMedia('(max-width: 900px)').matches
    const N = small ? 1000 : 2400

    let renderer: THREE.WebGLRenderer
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' })
    } catch { return }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setClearColor(0x000000, 0)

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 100)
    camera.position.z = 5.2

    const group = new THREE.Group()
    scene.add(group)

    const px = new Float32Array(N)
    const py = new Float32Array(N)
    const pz = new Float32Array(N)
    const kept = new Uint8Array(N)
    const speed = new Float32Array(N)
    const seed = new Float32Array(N)
    const hist = new Float32Array(N * TAIL * 3)

    const spawn = (i: number, spread = false) => {
      px[i] = spread ? X_MIN + Math.random() * (X_MAX - X_MIN) : X_MIN - Math.random() * 0.5
      py[i] = (Math.random() * 2 - 1) * Y_SPAN
      pz[i] = (Math.random() * 2 - 1) * 0.55
      speed[i] = 0.72 + Math.random() * 0.78
      seed[i] = Math.random()
      kept[i] = Math.random() < 0.21 ? 1 : 0
      const b = i * TAIL * 3
      for (let k = 0; k < TAIL; k++) {
        hist[b + k * 3] = px[i]
        hist[b + k * 3 + 1] = py[i]
        hist[b + k * 3 + 2] = pz[i]
      }
    }
    for (let i = 0; i < N; i++) spawn(i, true)

    const tailPos = new Float32Array(N * VERTS * 3)
    const tailCol = new Float32Array(N * VERTS * 3)
    const tailGeo = new THREE.BufferGeometry()
    tailGeo.setAttribute('position', new THREE.BufferAttribute(tailPos, 3))
    tailGeo.setAttribute('color', new THREE.BufferAttribute(tailCol, 3))
    const tailMat = new THREE.LineBasicMaterial({
      vertexColors: true, transparent: true, opacity: 0.92,
      depthWrite: false, blending: THREE.AdditiveBlending,
    })
    group.add(new THREE.LineSegments(tailGeo, tailMat))

    const headPos = new Float32Array(N * 3)
    const headCol = new Float32Array(N * 3)
    const headGeo = new THREE.BufferGeometry()
    headGeo.setAttribute('position', new THREE.BufferAttribute(headPos, 3))
    headGeo.setAttribute('color', new THREE.BufferAttribute(headCol, 3))
    const headMat = new THREE.PointsMaterial({
      size: small ? 0.032 : 0.026, vertexColors: true, transparent: true,
      depthWrite: false, sizeAttenuation: true, blending: THREE.AdditiveBlending,
    })
    group.add(new THREE.Points(headGeo, headMat))

    const glowTex = glowTexture()
    const glowMat = new THREE.SpriteMaterial({
      map: glowTex, transparent: true, depthWrite: false,
      blending: THREE.AdditiveBlending, opacity: 0,
    })
    const glow = new THREE.Sprite(glowMat)
    glow.position.set(FOCAL_X, FOCAL_Y, -0.1)
    glow.scale.setScalar(2.4)
    group.add(glow)

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
      ptr.tx = (e.clientX / window.innerWidth - 0.5) * 0.5
      ptr.ty = (e.clientY / window.innerHeight - 0.5) * 0.38
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
    let raf = 0, p = 0, colTick = 0
    const seg = (x: number, a: number, b: number) => Math.min(1, Math.max(0, (x - a) / (b - a)))
    const ease = (x: number) => x * x * (3 - 2 * x)
    const smooth = (a: number, b: number, x: number) => ease(seg(x, a, b))

    const step = (dt: number, t: number) => {
      const t1 = t * 0.071, t2 = t * 0.053, t3 = t * 0.037, t4 = t * 0.029
      const A = 0.46, a = 0.85, b = 1.28
      const B = 0.34, c = 1.62, d = 1.07
      const recover = smooth(0.35, 0.78, p)

      for (let i = 0; i < N; i++) {
        const x = px[i], y = py[i]
        const sax = Math.sin(a * x + t1), cax = Math.cos(a * x + t1)
        const sby = Math.sin(b * y + t2), cby = Math.cos(b * y + t2)
        const scy = Math.sin(c * y + t3), ccy = Math.cos(c * y + t3)
        const sdx = Math.sin(d * x + t4), cdx = Math.cos(d * x + t4)

        const dpdy = -A * b * sax * sby + B * c * ccy * cdx
        const dpdx = A * a * cax * cby - B * d * scy * sdx

        let vx = dpdy + 0.66 * speed[i]
        let vy = -dpdx

        if (kept[i] && recover > 0.01) {
          const ddx = FOCAL_X - x, ddy = FOCAL_Y - y
          const dist = Math.hypot(ddx, ddy) || 1e-4
          const onset = smooth(-0.5, 0.6, x)
          const pull = (recover * onset * 2.05) / (0.38 + dist)
          vx += (ddx / dist) * pull - (ddy / dist) * pull * 0.9
          vy += (ddy / dist) * pull + (ddx / dist) * pull * 0.9
          if (dist < 0.19) { spawn(i); continue }
        }

        px[i] = x + vx * dt
        py[i] = y + vy * dt
        pz[i] += Math.sin(t * 0.21 + seed[i] * 6.283) * dt * 0.06

        if (px[i] > X_MAX || py[i] > Y_SPAN + 0.6 || py[i] < -Y_SPAN - 0.6) { spawn(i); continue }

        const base = i * TAIL * 3
        hist.copyWithin(base, base + 3, base + TAIL * 3)
        hist[base + (TAIL - 1) * 3] = px[i]
        hist[base + (TAIL - 1) * 3 + 1] = py[i]
        hist[base + (TAIL - 1) * 3 + 2] = pz[i]
      }

      const greyThin = 1 - p * 0.42
      const writeCol = (colTick++ % 2) === 0

      for (let i = 0; i < N; i++) {
        const hb = i * TAIL * 3
        const vb = i * VERTS * 3

        for (let s = 0; s < SEG; s++) {
          const o = vb + s * 6, h0 = hb + s * 3, h1 = h0 + 3
          tailPos[o] = hist[h0]; tailPos[o + 1] = hist[h0 + 1]; tailPos[o + 2] = hist[h0 + 2]
          tailPos[o + 3] = hist[h1]; tailPos[o + 4] = hist[h1 + 1]; tailPos[o + 5] = hist[h1 + 2]
        }

        headPos[i * 3] = px[i]; headPos[i * 3 + 1] = py[i]; headPos[i * 3 + 2] = pz[i]

        if (!writeCol) continue

        let r: number, g: number, bl: number, bright: number
        if (kept[i]) {
          const dist = Math.hypot(FOCAL_X - px[i], FOCAL_Y - py[i])
          const heat = recover * (1 - smooth(0.2, 1.9, dist))
          const mix = recover * 0.85 + heat * 0.15
          r = GREY[0] + (ORANGE[0] - GREY[0]) * mix
          g = GREY[1] + (ORANGE[1] - GREY[1]) * mix
          bl = GREY[2] + (ORANGE[2] - GREY[2]) * mix
          r += (HOT[0] - r) * heat * 0.55
          g += (HOT[1] - g) * heat * 0.55
          bl += (HOT[2] - bl) * heat * 0.55
          bright = 0.5 + recover * 0.42 + heat * 0.5
        } else {
          r = GREY[0]; g = GREY[1]; bl = GREY[2]
          bright = (1 - smooth(1.2, 3.1, px[i])) * greyThin * 0.78
        }
        bright *= smooth(X_MIN, X_MIN + 0.75, px[i])

        for (let s = 0; s < SEG; s++) {
          const o = vb + s * 6
          const f0 = (s / SEG) * 0.9, f1 = ((s + 1) / SEG) * 0.9
          const b0 = bright * f0 * f0, b1 = bright * f1 * f1
          tailCol[o] = r * b0; tailCol[o + 1] = g * b0; tailCol[o + 2] = bl * b0
          tailCol[o + 3] = r * b1; tailCol[o + 4] = g * b1; tailCol[o + 5] = bl * b1
        }

        const hbr = Math.min(1.6, bright * 1.5)
        headCol[i * 3] = r * hbr; headCol[i * 3 + 1] = g * hbr; headCol[i * 3 + 2] = bl * hbr
      }

      tailGeo.attributes.position.needsUpdate = true
      headGeo.attributes.position.needsUpdate = true
      if (writeCol) {
        tailGeo.attributes.color.needsUpdate = true
        headGeo.attributes.color.needsUpdate = true
      }

      glowMat.opacity = recover * 0.85
      glow.scale.setScalar(1.9 + recover * 1.5)
    }

    let last = 0
    const loop = () => {
      raf = requestAnimationFrame(loop)
      if (!visible) { last = clock.getElapsedTime(); return }
      const t = clock.getElapsedTime()
      const dt = Math.min(0.05, t - last || 0.016)
      last = t
      p += (progress - p) * 0.07
      step(reduced ? 0.016 : dt, t)
      ptr.x += (ptr.tx - ptr.x) * 0.05
      ptr.y += (ptr.ty - ptr.y) * 0.05
      group.rotation.y = ptr.x * 0.5
      group.rotation.x = ptr.y * 0.42
      camera.position.z = 5.2 - p * 0.55
      renderer.render(scene, camera)
    }
    loop()

    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect(); io.disconnect()
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('scroll', readProgress)
      window.removeEventListener('resize', readProgress)
      tailGeo.dispose(); tailMat.dispose()
      headGeo.dispose(); headMat.dispose()
      glowTex.dispose(); glowMat.dispose()
      renderer.dispose()
      if (renderer.domElement.parentNode === host) host.removeChild(renderer.domElement)
    }
  }, [driveSelector])

  return <div ref={hostRef} className="intent-field" aria-hidden="true" />
}
