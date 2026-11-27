'use client'

import { useEffect, useRef } from 'react'
import * as THREE from 'three'

/**
 * A form, drawn in light, that comes apart and is partly recovered.
 *
 * 22,000 points are seeded onto the shape of an actual enquiry form:
 * the card outline, five field rows, their labels, and a submit button.
 * At rest a pulse of light runs down the fields, like someone filling it in.
 *
 * Scroll runs it through the product:
 *
 *   0.00 - 0.30   the form sits there, being filled, grey and quiet
 *   0.30 - 0.65   it comes apart, points scatter and the grey ones die
 *   0.55 - 0.85   a fifth ignite orange and are pulled into a dense core
 *   0.85 - 1.00   the core fires forward as the signal leaving
 *
 * All of it happens in the vertex shader, so 22,000 points cost about the
 * same as one.
 */

const COUNT = 22000

const VERT = `
  attribute vec3  aHome;      // position on the form
  attribute vec3  aScatter;   // direction it flies when abandoned
  attribute vec3  aCore;      // where it lands if it is recovered
  attribute float aKept;      // 1 = recovered, 0 = lost
  attribute float aSeed;
  attribute float aRow;       // 0..1 down the form, drives the fill pulse
  attribute float aSize;

  uniform float uTime;
  uniform float uPixelRatio;
  uniform float uBreak;       // 0 intact .. 1 fully scattered
  uniform float uRecover;     // 0 .. 1 pulled into the core
  uniform float uRelease;     // 0 .. 1 fired forward

  varying float vKept;
  varying float vAlpha;
  varying float vHeat;

  void main() {
    vKept = aKept;

    // A pulse of light running down the fields while the form is intact.
    float fill = smoothstep(0.0, 0.12, fract(uTime * 0.16) - aRow + 0.12);
    float typing = (1.0 - uBreak) * fill;

    vec3 p = aHome;

    // Breathe, so it is never dead still.
    p.z += sin(uTime * 0.9 + aSeed * 8.0) * 0.012 * (1.0 - uBreak);

    // Come apart.
    float fly = uBreak * (1.0 - uRecover * aKept);
    p += aScatter * fly * (1.4 + aSeed * 2.6);
    p.z += fly * (aSeed - 0.5) * 1.6;

    // The recovered ones get reeled into the core.
    vec3 corePos = aCore + vec3(
      sin(uTime * 0.7 + aSeed * 6.283) * 0.05,
      cos(uTime * 0.6 + aSeed * 6.283) * 0.05,
      0.0
    );
    p = mix(p, corePos, uRecover * aKept);

    // Then the core fires forward.
    p += normalize(aCore + vec3(0.001)) * uRelease * aKept * (2.0 + aSeed * 4.5);
    p.z += uRelease * aKept * 3.0;

    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    gl_Position = projectionMatrix * mv;

    float grow = 1.0 + typing * 1.6 + uRecover * aKept * 0.9;
    gl_PointSize = aSize * uPixelRatio * grow * (62.0 / -mv.z);

    // Lost points fade as they scatter. Kept points brighten.
    float lostFade = 1.0 - smoothstep(0.25, 1.0, uBreak) * (1.0 - aKept);
    float releaseFade = 1.0 - smoothstep(0.6, 1.0, uRelease) * aKept;
    vAlpha = lostFade * releaseFade;

    vHeat = max(aKept * max(uRecover, 0.25), typing * 0.85);
  }
`

const FRAG = `
  precision mediump float;
  varying float vKept;
  varying float vAlpha;
  varying float vHeat;

  void main() {
    vec2 c = gl_PointCoord - 0.5;
    float d = dot(c, c);
    if (d > 0.25) discard;

    float soft = 1.0 - smoothstep(0.0, 0.25, d);
    soft = pow(soft, 1.6);

    vec3 grey   = vec3(0.52, 0.53, 0.58);
    vec3 orange = vec3(1.0, 0.44, 0.19);
    vec3 hot    = vec3(1.0, 0.76, 0.52);

    vec3 col = mix(grey, orange, vHeat);
    col = mix(col, hot, vHeat * vHeat * 0.55);

    gl_FragColor = vec4(col, soft * vAlpha * (0.32 + vHeat * 0.68));
  }
`

export default function FormField3D({ driveSelector = '[data-field-drive]' }: { driveSelector?: string }) {
  const hostRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const host = hostRef.current
    if (!host) return

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const small = window.matchMedia('(max-width: 900px)').matches
    const n = small ? 9000 : COUNT

    let renderer: THREE.WebGLRenderer
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' })
    } catch { return }

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setClearColor(0x000000, 0)

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 100)
    camera.position.z = 5.6

    // ---- Seed points onto the shape of a form -------------------------
    const W = 1.95, H = 2.75, R = 0.12
    const home = new Float32Array(n * 3)
    const scatter = new Float32Array(n * 3)
    const core = new Float32Array(n * 3)
    const kept = new Float32Array(n)
    const seed = new Float32Array(n)
    const row = new Float32Array(n)
    const size = new Float32Array(n)

    const FIELDS = [
      { y:  0.86, label: true },
      { y:  0.36, label: true },
      { y: -0.14, label: true },
      { y: -0.64, label: true },
      { y: -1.14, label: false },
    ]

    const onOutline = (t: number) => {
      // Walk the rounded rectangle perimeter.
      const hw = W / 2 - R, hh = H / 2 - R
      const straight = 2 * (hw * 2) + 2 * (hh * 2)
      const arc = 2 * Math.PI * R
      const total = straight + arc
      let d = t * total
      if (d < hw * 2) return [-hw + d, H / 2]
      d -= hw * 2
      if (d < arc / 4) { const a = d / R; return [hw + Math.sin(a) * R, hh + Math.cos(a) * R] }
      d -= arc / 4
      if (d < hh * 2) return [W / 2, hh - d]
      d -= hh * 2
      if (d < arc / 4) { const a = d / R; return [hw + Math.cos(a) * R, -hh - Math.sin(a) * R] }
      d -= arc / 4
      if (d < hw * 2) return [hw - d, -H / 2]
      d -= hw * 2
      if (d < arc / 4) { const a = d / R; return [-hw - Math.sin(a) * R, -hh - Math.cos(a) * R] }
      d -= arc / 4
      if (d < hh * 2) return [-W / 2, -hh + d]
      d -= hh * 2
      const a = d / R
      return [-hw - Math.cos(a) * R, hh + Math.sin(a) * R]
    }

    for (let i = 0; i < n; i++) {
      const r = Math.random()
      let x = 0, y = 0

      if (r < 0.2) {
        // Card outline.
        const [ox, oy] = onOutline(Math.random())
        x = ox + (Math.random() - 0.5) * 0.018
        y = oy + (Math.random() - 0.5) * 0.018
      } else if (r < 0.32) {
        // Field labels: short bars above each input.
        const f = FIELDS[Math.floor(Math.random() * FIELDS.length)]
        x = -W / 2 + 0.16 + Math.random() * 0.46
        y = f.y + 0.17 + (Math.random() - 0.5) * 0.022
      } else if (r < 0.88) {
        // The input rows themselves.
        const f = FIELDS[Math.floor(Math.random() * FIELDS.length)]
        x = -W / 2 + 0.16 + Math.random() * (W - 0.32)
        y = f.y + (Math.random() - 0.5) * 0.13
      } else {
        // Submit button.
        x = -W / 2 + 0.16 + Math.random() * (W - 0.32)
        y = -H / 2 + 0.3 + (Math.random() - 0.5) * 0.16
      }

      const z = (Math.random() - 0.5) * 0.05
      home[i * 3] = x; home[i * 3 + 1] = y; home[i * 3 + 2] = z

      const sx = x * 1.5 + (Math.random() - 0.5) * 1.6
      const sy = y * 1.3 + (Math.random() - 0.5) * 1.6
      const sz = (Math.random() - 0.5) * 2.4
      const sl = Math.hypot(sx, sy, sz) || 1
      scatter[i * 3] = sx / sl; scatter[i * 3 + 1] = sy / sl; scatter[i * 3 + 2] = sz / sl

      // Core: a tight sphere just right of centre.
      const u = Math.random(), v = Math.random()
      const th = 2 * Math.PI * u, ph = Math.acos(2 * v - 1)
      const rad = 0.42 * Math.cbrt(Math.random())
      core[i * 3] = Math.sin(ph) * Math.cos(th) * rad
      core[i * 3 + 1] = Math.sin(ph) * Math.sin(th) * rad
      core[i * 3 + 2] = Math.cos(ph) * rad

      kept[i] = Math.random() < 0.2 ? 1 : 0
      seed[i] = Math.random()
      row[i] = (H / 2 - y) / H
      size[i] = 1.5 + Math.random() * 2.4
    }

    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.BufferAttribute(home.slice(), 3))
    geo.setAttribute('aHome', new THREE.BufferAttribute(home, 3))
    geo.setAttribute('aScatter', new THREE.BufferAttribute(scatter, 3))
    geo.setAttribute('aCore', new THREE.BufferAttribute(core, 3))
    geo.setAttribute('aKept', new THREE.BufferAttribute(kept, 1))
    geo.setAttribute('aSeed', new THREE.BufferAttribute(seed, 1))
    geo.setAttribute('aRow', new THREE.BufferAttribute(row, 1))
    geo.setAttribute('aSize', new THREE.BufferAttribute(size, 1))

    const mat = new THREE.ShaderMaterial({
      vertexShader: VERT,
      fragmentShader: FRAG,
      uniforms: {
        uTime: { value: 0 },
        uPixelRatio: { value: Math.min(window.devicePixelRatio, 2) },
        uBreak: { value: 0 },
        uRecover: { value: 0 },
        uRelease: { value: 0 },
      },
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    })

    const points = new THREE.Points(geo, mat)
    scene.add(points)

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
      ptr.tx = (e.clientX / window.innerWidth - 0.5) * 0.7
      ptr.ty = (e.clientY / window.innerHeight - 0.5) * 0.45
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
    let raf = 0, p = 0
    const seg = (x: number, a: number, b: number) => Math.min(1, Math.max(0, (x - a) / (b - a)))
    const ease = (x: number) => x * x * (3 - 2 * x)

    const loop = () => {
      raf = requestAnimationFrame(loop)
      if (!visible) return

      const t = clock.getElapsedTime()
      p += (progress - p) * 0.065

      mat.uniforms.uTime.value = reduced ? 0 : t
      mat.uniforms.uBreak.value = ease(seg(p, 0.30, 0.65))
      mat.uniforms.uRecover.value = ease(seg(p, 0.55, 0.85))
      mat.uniforms.uRelease.value = ease(seg(p, 0.86, 1.0))

      ptr.x += (ptr.tx - ptr.x) * 0.05
      ptr.y += (ptr.ty - ptr.y) * 0.05

      points.rotation.y = ptr.x + p * 0.5 + (reduced ? 0 : Math.sin(t * 0.15) * 0.05)
      points.rotation.x = ptr.y * 0.6 + p * 0.1

      camera.position.z = 5.6 - p * 0.8

      renderer.render(scene, camera)
    }
    loop()

    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect(); io.disconnect()
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('scroll', readProgress)
      window.removeEventListener('resize', readProgress)
      geo.dispose(); mat.dispose(); renderer.dispose()
      if (renderer.domElement.parentNode === host) host.removeChild(renderer.domElement)
    }
  }, [driveSelector])

  return <div ref={hostRef} className="intent-field" aria-hidden="true" />
}
