'use client'

import { useEffect, useRef } from 'react'
import * as THREE from 'three'

/**
 * The intent field.
 *
 * A fixed WebGL layer that lives behind the top of the page and is driven
 * by scroll rather than sitting still. It tells the product story as an
 * object:
 *
 *   scroll 0.00  a loose cloud, grey, drifting outward and dying
 *   scroll 0.45  the cloud collapses into a dense core, turning orange
 *   scroll 1.00  the core fires outward as a beam, the signal leaving
 *
 * One canvas, one draw call, no react-three-fiber.
 */

type Props = { /** Element whose scroll range drives the field. */ driveSelector?: string }

const VERT = `
  attribute float aSize;
  attribute float aCaught;
  attribute float aSeed;
  attribute vec3  aAxis;

  uniform float uTime;
  uniform float uPixelRatio;
  uniform float uConverge;   // 0 loose cloud .. 1 dense core
  uniform float uRelease;    // 0 held .. 1 fired outward

  varying float vCaught;
  varying float vAlpha;
  varying float vConv;

  void main() {
    vCaught = aCaught;
    vConv = uConverge;

    vec3 p = position;

    // Drift: every point is always escaping a little.
    float drift = mod(uTime * 0.07 + aSeed, 1.0);
    float spread = mix(1.0, 2.4, drift);

    // Convergence pulls everything toward the core. Caught points come
    // in hardest and hold; lost points resist and keep leaking.
    float pull = uConverge * mix(0.55, 1.0, aCaught);
    spread = mix(spread, 0.34 + sin(uTime * 0.8 + aSeed * 6.28) * 0.03, pull);

    p *= spread;

    // Release: the core fires along each point's own axis.
    p += aAxis * uRelease * (2.2 + aSeed * 5.0) * mix(0.35, 1.0, aCaught);

    // Always a little life in it.
    p.x += sin(uTime * 0.33 + aSeed * 9.0) * 0.06 * (1.0 - uConverge);
    p.y += cos(uTime * 0.28 + aSeed * 7.0) * 0.06 * (1.0 - uConverge);

    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    gl_Position = projectionMatrix * mv;
    gl_PointSize = aSize * uPixelRatio * (9.0 / -mv.z) * (1.0 + uConverge * 0.5);

    float fade = 1.0 - smoothstep(0.45, 1.0, drift);
    vAlpha = mix(fade, 1.0, max(aCaught, uConverge));
    vAlpha *= 1.0 - smoothstep(0.55, 1.0, uRelease);
  }
`

const FRAG = `
  precision mediump float;
  varying float vCaught;
  varying float vAlpha;
  varying float vConv;

  void main() {
    vec2 c = gl_PointCoord - vec2(0.5);
    float d = length(c);
    if (d > 0.5) discard;

    float soft = 1.0 - smoothstep(0.16, 0.5, d);

    vec3 lost   = vec3(0.40, 0.40, 0.45);
    vec3 caught = vec3(1.0, 0.42, 0.21);

    // As the field converges, even the lost points warm up: the whole
    // cloud is being understood, not just the ones already scored.
    vec3 col = mix(lost, caught, max(vCaught, vConv * 0.75));

    gl_FragColor = vec4(col, soft * vAlpha * (0.4 + max(vCaught, vConv) * 0.6));
  }
`

export default function IntentField({ driveSelector = '[data-field-drive]' }: Props) {
  const hostRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const host = hostRef.current
    if (!host) return

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const small = window.matchMedia('(max-width: 900px)').matches
    const COUNT = small ? 3200 : 9000

    let renderer: THREE.WebGLRenderer
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' })
    } catch {
      return
    }

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100)
    camera.position.z = 7.4

    const positions = new Float32Array(COUNT * 3)
    const axes = new Float32Array(COUNT * 3)
    const sizes = new Float32Array(COUNT)
    const caught = new Float32Array(COUNT)
    const seeds = new Float32Array(COUNT)

    for (let i = 0; i < COUNT; i++) {
      const u = Math.random()
      const v = Math.random()
      const theta = 2 * Math.PI * u
      const phi = Math.acos(2 * v - 1)
      const r = 1.85 + Math.random() * 0.3

      const x = Math.sin(phi) * Math.cos(theta)
      const y = Math.sin(phi) * Math.sin(theta)
      const z = Math.cos(phi)

      positions[i * 3] = x * r
      positions[i * 3 + 1] = y * r
      positions[i * 3 + 2] = z * r

      axes[i * 3] = x
      axes[i * 3 + 1] = y
      axes[i * 3 + 2] = z

      sizes[i] = 1.0 + Math.random() * 2.2
      caught[i] = Math.random() < 0.2 ? 1 : 0
      seeds[i] = Math.random()
    }

    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    geo.setAttribute('aAxis', new THREE.BufferAttribute(axes, 3))
    geo.setAttribute('aSize', new THREE.BufferAttribute(sizes, 1))
    geo.setAttribute('aCaught', new THREE.BufferAttribute(caught, 1))
    geo.setAttribute('aSeed', new THREE.BufferAttribute(seeds, 1))

    const mat = new THREE.ShaderMaterial({
      vertexShader: VERT,
      fragmentShader: FRAG,
      uniforms: {
        uTime: { value: 0 },
        uPixelRatio: { value: Math.min(window.devicePixelRatio, 2) },
        uConverge: { value: 0 },
        uRelease: { value: 0 },
      },
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    })

    const points = new THREE.Points(geo, mat)
    scene.add(points)

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setClearColor(0x000000, 0)
    host.appendChild(renderer.domElement)
    Object.assign(renderer.domElement.style, { width: '100%', height: '100%', display: 'block' })

    const resize = () => {
      const w = host.clientWidth
      const h = host.clientHeight
      if (!w || !h) return
      renderer.setSize(w, h, false)
      camera.aspect = w / h
      camera.updateProjectionMatrix()
    }
    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(host)

    const pointer = { tx: 0, ty: 0, x: 0, y: 0 }
    const onMove = (e: PointerEvent) => {
      pointer.tx = (e.clientX / window.innerWidth - 0.5) * 0.55
      pointer.ty = (e.clientY / window.innerHeight - 0.5) * 0.55
    }
    if (!small) window.addEventListener('pointermove', onMove, { passive: true })

    // Scroll drives the story. Progress is measured across the element
    // marked data-field-drive, so the narrative and the object stay in
    // step even if sections are reordered later.
    const driver = document.querySelector(driveSelector) as HTMLElement | null
    let progress = 0
    const readProgress = () => {
      if (!driver) { progress = 0; return }
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
    let raf = 0
    let conv = 0
    let rel = 0

    const loop = () => {
      raf = requestAnimationFrame(loop)
      if (!visible) return

      const t = clock.getElapsedTime()
      mat.uniforms.uTime.value = reduced ? 0 : t

      // Converge through the first two thirds, fire in the last third.
      const targetConv = Math.min(1, progress / 0.62)
      const targetRel = Math.max(0, (progress - 0.72) / 0.28)

      conv += (targetConv - conv) * 0.06
      rel += (targetRel - rel) * 0.06
      mat.uniforms.uConverge.value = conv
      mat.uniforms.uRelease.value = rel

      pointer.x += (pointer.tx - pointer.x) * 0.045
      pointer.y += (pointer.ty - pointer.y) * 0.045

      points.rotation.y = (reduced ? 0 : t * 0.05) + pointer.x + progress * 0.9
      points.rotation.x = pointer.y * 0.55 + progress * 0.25

      camera.position.z = 7.4 - conv * 1.6 + rel * 2.2

      renderer.render(scene, camera)
    }
    loop()

    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
      io.disconnect()
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('scroll', readProgress)
      window.removeEventListener('resize', readProgress)
      geo.dispose()
      mat.dispose()
      renderer.dispose()
      if (renderer.domElement.parentNode === host) host.removeChild(renderer.domElement)
    }
  }, [driveSelector])

  return <div ref={hostRef} className="intent-field" aria-hidden="true" />
}
