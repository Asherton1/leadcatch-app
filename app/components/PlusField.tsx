'use client'

import { useEffect, useRef } from 'react'
import * as THREE from 'three'

/**
 * The ReCapture mark, built out of light.
 *
 * ~20,000 points are seeded onto an extruded version of the brand plus
 * (M12 4v16 M4 12h16): its two faces, its side walls, and its interior.
 * Roughly a fifth of them are orange, grouped into patches rather than
 * sprinkled, so the colour reads as deliberate from the very top of the
 * page instead of arriving at the end.
 *
 * Scroll runs the whole story and then lets the mark ride:
 *
 *   0.00 - 0.10   the mark, whole and still
 *   0.10 - 0.32   it comes apart, the grey scatters and dies
 *   0.28 - 0.52   the orange is pulled home and the mark reforms
 *   0.52 - 1.00   whole, lit, turning slowly with you to the bottom
 *
 * There is no timed loop. At rest the only motion is a sub-pixel drift on
 * four incommensurate frequencies, so nothing ever visibly repeats while
 * you sit on the hero.
 */

const A = 0.56    // arm half-width
const L = 1.45    // arm half-length
const D = 0.30    // half depth

const VERT = `
  attribute vec3  aHome;
  attribute vec3  aRebuild;   // where it lands when it is recovered
  attribute vec3  aScatter;
  attribute float aKept;
  attribute float aSeed;
  attribute float aSize;

  uniform float uTime;
  uniform float uPixelRatio;
  uniform float uBreak;
  uniform float uReturn;

  varying float vKept;
  varying float vAlpha;
  varying float vHeat;

  void main() {
    vKept = aKept;

    // The recovered points do not go back to where they sat. They are
    // redistributed across the entire mark, so the fifth that comes home
    // rebuilds the whole thing. That is the product, literally.
    vec3 p = mix(aHome, aRebuild, uReturn * aKept);

    // Sub-pixel drift. Four frequencies with no common period, so it never
    // returns to a state you have already seen.
    p.x += sin(uTime * 0.041 + aSeed * 17.0) * 0.009;
    p.y += cos(uTime * 0.029 + aSeed * 23.0) * 0.009;
    p.z += sin(uTime * 0.017 + aSeed * 11.0) * 0.012;

    // The grey is lost for good. The orange is only ever on loan.
    float fly = uBreak * (1.0 - uReturn * aKept);
    float far = mix(2.6, 0.9, aKept);
    p += aScatter * fly * far * (0.5 + aSeed * 1.3);

    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    gl_Position = projectionMatrix * mv;

    // Fewer points are drawing the same shape, so they carry more weight.
    float grow = 1.0 - uReturn * aKept * 0.30;
    gl_PointSize = aSize * uPixelRatio * grow * (58.0 / -mv.z);

    // Grey fades out as it scatters and never fully comes back.
    float greyFade = 1.0 - smoothstep(0.15, 0.95, uBreak) * (1.0 - aKept) * 0.82;
    vAlpha = greyFade;

    vHeat = aKept * (0.45 + uReturn * 0.55);
    vAlpha *= 1.0 + uReturn * aKept * 0.25;
  }
`

const FRAG = `
  precision mediump float;
  uniform float uBoost;
  varying float vKept;
  varying float vAlpha;
  varying float vHeat;

  void main() {
    vec2 c = gl_PointCoord - 0.5;
    float d = dot(c, c);
    if (d > 0.25) discard;
    float soft = pow(1.0 - smoothstep(0.0, 0.25, d), 1.5);

    vec3 grey   = vec3(0.46, 0.47, 0.54);
    vec3 orange = vec3(1.0, 0.40, 0.17);
    vec3 hot    = vec3(1.0, 0.72, 0.42);

    vec3 col = mix(grey, orange, vHeat);
    col = mix(col, hot, vHeat * vHeat * 0.45);

    float a = soft * vAlpha * (0.058 + vHeat * 0.19) * uBoost;
    gl_FragColor = vec4(col, a);
  }
`

export default function PlusField({ driveSelector = '[data-field-drive]' }: { driveSelector?: string }) {
  const hostRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const host = hostRef.current
    if (!host) return

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const small = window.matchMedia('(max-width: 900px)').matches
    const n = small ? 7000 : 16000

    let renderer: THREE.WebGLRenderer
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' })
    } catch { return }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setClearColor(0x000000, 0)

    const scene = new THREE.Scene()
    const FOV = 40
    const camera = new THREE.PerspectiveCamera(FOV, 1, 0.1, 100)
    let baseZ = 5.4
    const fitZ = (aspect: number) => {
      // Half-extent we want visible, so the mark never touches an edge.
      const target = aspect < 1 ? 1.78 : 2.12
      return target / (Math.tan((FOV * Math.PI) / 360) * Math.min(1, aspect))
    }

    const group = new THREE.Group()
    group.rotation.set(0.1, -0.24, 0)
    group.position.x = small ? 0 : 0.78
    scene.add(group)

    // ---- seed the plus ------------------------------------------------
    const inPlus = (x: number, y: number) =>
      (Math.abs(x) <= L && Math.abs(y) <= A) || (Math.abs(x) <= A && Math.abs(y) <= L)

    // 12 corners of the plus, walked for the side walls.
    const poly: [number, number][] = [
      [A, A], [L, A], [L, -A], [A, -A], [A, -L], [-A, -L],
      [-A, -A], [-L, -A], [-L, A], [-A, A], [-A, L], [A, L],
    ]
    const segLen: number[] = []
    let perim = 0
    for (let i = 0; i < poly.length; i++) {
      const a = poly[i], b = poly[(i + 1) % poly.length]
      const d = Math.hypot(b[0] - a[0], b[1] - a[1])
      segLen.push(d); perim += d
    }
    const onPerimeter = (t: number): [number, number] => {
      let d = t * perim
      for (let i = 0; i < poly.length; i++) {
        if (d <= segLen[i]) {
          const a = poly[i], b = poly[(i + 1) % poly.length]
          const f = d / segLen[i]
          return [a[0] + (b[0] - a[0]) * f, a[1] + (b[1] - a[1]) * f]
        }
        d -= segLen[i]
      }
      return poly[0]
    }
    const inPlane = (): [number, number] => {
      for (let g = 0; g < 40; g++) {
        const x = (Math.random() * 2 - 1) * L
        const y = (Math.random() * 2 - 1) * L
        if (inPlus(x, y)) return [x, y]
      }
      return [0, 0]
    }

    // Orange lives in patches, not as sprinkled noise.
    const PATCHES = 18
    const patch: [number, number, number][] = []
    for (let i = 0; i < PATCHES; i++) {
      const [x, y] = inPlane()
      patch.push([x, y, (Math.random() * 2 - 1) * D])
    }
    const PATCH_R2 = 0.285 * 0.285

    const home = new Float32Array(n * 3)
    const rebuild = new Float32Array(n * 3)
    const scatter = new Float32Array(n * 3)
    const keptA = new Float32Array(n)
    const seedA = new Float32Array(n)
    const sizeA = new Float32Array(n)

    // One sample of the mark: faces carry the shape, walls carry the
    // silhouette, the interior gives it body.
    const samplePlus = (): [number, number, number] => {
      const r = Math.random()
      let x: number, y: number, z: number
      if (r < 0.30) {
        ;[x, y] = inPlane()
        z = (Math.random() < 0.5 ? -1 : 1) * D + (Math.random() - 0.5) * 0.015
      } else if (r < 0.56) {
        ;[x, y] = onPerimeter(Math.random())
        x += (Math.random() - 0.5) * 0.034
        y += (Math.random() - 0.5) * 0.034
        z = (Math.random() * 2 - 1) * D
      } else {
        ;[x, y] = inPlane()
        z = (Math.random() * 2 - 1) * D * 0.92
      }
      return [x, y, z]
    }

    // The rebuild is weighted onto the outline. Half as many points are
    // drawing the same mark, so they have to spend themselves on the
    // silhouette rather than spread evenly and read as a blur.
    const samplePlusEdge = (): [number, number, number] => {
      const r = Math.random()
      let x: number, y: number, z: number
      if (r < 0.58) {
        ;[x, y] = onPerimeter(Math.random())
        x += (Math.random() - 0.5) * 0.026
        y += (Math.random() - 0.5) * 0.026
        z = (Math.random() * 2 - 1) * D
      } else if (r < 0.88) {
        ;[x, y] = inPlane()
        z = (Math.random() < 0.5 ? -1 : 1) * D + (Math.random() - 0.5) * 0.012
      } else {
        ;[x, y] = inPlane()
        z = (Math.random() * 2 - 1) * D * 0.9
      }
      return [x, y, z]
    }

    for (let i = 0; i < n; i++) {
      const [x, y, z] = samplePlus()

      home[i * 3] = x; home[i * 3 + 1] = y; home[i * 3 + 2] = z

      const [rx, ry, rz] = samplePlusEdge()
      rebuild[i * 3] = rx; rebuild[i * 3 + 1] = ry; rebuild[i * 3 + 2] = rz

      const sx = x * 1.4 + (Math.random() - 0.5) * 1.5
      const sy = y * 1.4 + (Math.random() - 0.5) * 1.5
      const sz = (Math.random() - 0.5) * 2.2
      const sl = Math.hypot(sx, sy, sz) || 1
      scatter[i * 3] = sx / sl; scatter[i * 3 + 1] = sy / sl; scatter[i * 3 + 2] = sz / sl

      let kept = 0
      for (let k = 0; k < PATCHES; k++) {
        const dx = x - patch[k][0], dy = y - patch[k][1], dz = z - patch[k][2]
        if (dx * dx + dy * dy + dz * dz < PATCH_R2) { kept = 1; break }
      }
      keptA[i] = kept
      seedA[i] = Math.random()
      sizeA[i] = (kept ? 1.35 : 1.0) * (0.85 + Math.random() * 1.15)
    }

    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.BufferAttribute(home.slice(), 3))
    geo.setAttribute('aHome', new THREE.BufferAttribute(home, 3))
    geo.setAttribute('aRebuild', new THREE.BufferAttribute(rebuild, 3))
    geo.setAttribute('aScatter', new THREE.BufferAttribute(scatter, 3))
    geo.setAttribute('aKept', new THREE.BufferAttribute(keptA, 1))
    geo.setAttribute('aSeed', new THREE.BufferAttribute(seedA, 1))
    geo.setAttribute('aSize', new THREE.BufferAttribute(sizeA, 1))

    const mat = new THREE.ShaderMaterial({
      vertexShader: VERT,
      fragmentShader: FRAG,
      uniforms: {
        uTime: { value: 0 },
        uPixelRatio: { value: Math.min(window.devicePixelRatio, 2) },
        uBoost: { value: small ? 2.0 : 1.0 },
        uBreak: { value: 0 },
        uReturn: { value: 0 },
      },
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    })
    group.add(new THREE.Points(geo, mat))

    host.appendChild(renderer.domElement)
    Object.assign(renderer.domElement.style, { width: '100%', height: '100%', display: 'block' })

    const resize = () => {
      const w = host.clientWidth, h = host.clientHeight
      if (!w || !h) return
      renderer.setSize(w, h, false)
      camera.aspect = w / h
      baseZ = fitZ(w / h)
      camera.updateProjectionMatrix()
    }
    resize()
    const ro = new ResizeObserver(resize); ro.observe(host)

    const ptr = { tx: 0, ty: 0, x: 0, y: 0 }
    const onMove = (e: PointerEvent) => {
      ptr.tx = (e.clientX / window.innerWidth - 0.5) * 0.5
      ptr.ty = (e.clientY / window.innerHeight - 0.5) * 0.32
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

    const t0 = performance.now()
    let raf = 0, p = 0
    const clamp01 = (x: number) => Math.min(1, Math.max(0, x))
    const ease = (x: number) => x * x * (3 - 2 * x)
    const smooth = (a: number, b: number, x: number) => ease(clamp01((x - a) / (b - a)))

    const loop = () => {
      raf = requestAnimationFrame(loop)
      if (!visible) return

      const t = (performance.now() - t0) / 1000
      p += (progress - p) * 0.075

      mat.uniforms.uTime.value = reduced ? 0 : t
      mat.uniforms.uBreak.value = smooth(0.10, 0.32, p)
      mat.uniforms.uReturn.value = smooth(0.28, 0.52, p)

      ptr.x += (ptr.tx - ptr.x) * 0.05
      ptr.y += (ptr.ty - ptr.y) * 0.05
      group.rotation.y = -0.24 + ptr.x + p * 1.15
      group.rotation.x = 0.1 + ptr.y * 0.7 - p * 0.14
      camera.position.z = baseZ - p * 0.45

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
