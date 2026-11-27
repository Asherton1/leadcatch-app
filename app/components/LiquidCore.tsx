'use client'

import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js'

/**
 * The core.
 *
 * A physically shaded object rather than a particle cloud: metal and
 * clearcoat, lit by a generated environment so it actually reflects
 * something, with its surface displaced by animated noise. Scroll drives
 * how violent the surface is and how far the camera sits.
 *
 *   start   calm, slow swell, almost still
 *   middle  the surface tightens and the object pulls in
 *   end     it breaks into turbulence, orange light rips across it
 *
 * Normals are recomputed in the vertex shader from two neighbouring
 * samples, otherwise the lighting stays flat and the whole thing looks
 * like plastic.
 */

const NOISE = `
  vec3 mod289(vec3 x){return x-floor(x*(1.0/289.0))*289.0;}
  vec4 mod289(vec4 x){return x-floor(x*(1.0/289.0))*289.0;}
  vec4 permute(vec4 x){return mod289(((x*34.0)+1.0)*x);}
  vec4 taylorInvSqrt(vec4 r){return 1.79284291400159-0.85373472095314*r;}

  float snoise(vec3 v){
    const vec2 C = vec2(1.0/6.0, 1.0/3.0);
    const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
    vec3 i  = floor(v + dot(v, C.yyy));
    vec3 x0 = v - i + dot(i, C.xxx);
    vec3 g = step(x0.yzx, x0.xyz);
    vec3 l = 1.0 - g;
    vec3 i1 = min(g.xyz, l.zxy);
    vec3 i2 = max(g.xyz, l.zxy);
    vec3 x1 = x0 - i1 + C.xxx;
    vec3 x2 = x0 - i2 + C.yyy;
    vec3 x3 = x0 - D.yyy;
    i = mod289(i);
    vec4 p = permute(permute(permute(
               i.z + vec4(0.0, i1.z, i2.z, 1.0))
             + i.y + vec4(0.0, i1.y, i2.y, 1.0))
             + i.x + vec4(0.0, i1.x, i2.x, 1.0));
    float n_ = 0.142857142857;
    vec3 ns = n_ * D.wyz - D.xzx;
    vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
    vec4 x_ = floor(j * ns.z);
    vec4 y_ = floor(j - 7.0 * x_);
    vec4 x = x_ * ns.x + ns.yyyy;
    vec4 y = y_ * ns.x + ns.yyyy;
    vec4 h = 1.0 - abs(x) - abs(y);
    vec4 b0 = vec4(x.xy, y.xy);
    vec4 b1 = vec4(x.zw, y.zw);
    vec4 s0 = floor(b0) * 2.0 + 1.0;
    vec4 s1 = floor(b1) * 2.0 + 1.0;
    vec4 sh = -step(h, vec4(0.0));
    vec4 a0 = b0.xzyw + s0.xzyw * sh.xxyy;
    vec4 a1 = b1.xzyw + s1.xzyw * sh.zzww;
    vec3 p0 = vec3(a0.xy, h.x);
    vec3 p1 = vec3(a0.zw, h.y);
    vec3 p2 = vec3(a1.xy, h.z);
    vec3 p3 = vec3(a1.zw, h.w);
    vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
    p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
    vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
    m = m * m;
    return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
  }
`

export default function LiquidCore({ driveSelector = '[data-field-drive]' }: { driveSelector?: string }) {
  const hostRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const host = hostRef.current
    if (!host) return

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const small = window.matchMedia('(max-width: 900px)').matches

    let renderer: THREE.WebGLRenderer
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' })
    } catch {
      return
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, small ? 1.5 : 2))
    renderer.setClearColor(0x000000, 0)
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 1.15

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 100)
    camera.position.z = 5.4

    // A generated environment is what makes metal look like metal. Without
    // one, a physical material has nothing to reflect and reads as plastic.
    const pmrem = new THREE.PMREMGenerator(renderer)
    const envRT = pmrem.fromScene(new RoomEnvironment(), 0.04)
    scene.environment = envRT.texture

    const geo = new THREE.IcosahedronGeometry(1.35, small ? 48 : 96)

    const mat = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color('#121216'),
      metalness: 0.92,
      roughness: 0.17,
      clearcoat: 1,
      clearcoatRoughness: 0.12,
      envMapIntensity: 1.25,
    })

    const uniforms = {
      uTime: { value: 0 },
      uAmp: { value: 0.16 },
      uFreq: { value: 1.25 },
      uTurb: { value: 0 },
    }

    mat.onBeforeCompile = shader => {
      shader.uniforms.uTime = uniforms.uTime
      shader.uniforms.uAmp = uniforms.uAmp
      shader.uniforms.uFreq = uniforms.uFreq
      shader.uniforms.uTurb = uniforms.uTurb

      shader.vertexShader = shader.vertexShader
        .replace('#include <common>', `
          #include <common>
          uniform float uTime;
          uniform float uAmp;
          uniform float uFreq;
          uniform float uTurb;
          ${NOISE}

          vec3 displaced(vec3 p) {
            float n = snoise(p * uFreq + vec3(0.0, uTime * 0.22, 0.0));
            float n2 = snoise(p * (uFreq * 2.7) + vec3(uTime * 0.35, 0.0, 0.0));
            float d = n * uAmp + n2 * uAmp * 0.45 * uTurb;
            return p + normalize(p) * d;
          }
        `)
        .replace('#include <beginnormal_vertex>', `
          // Recompute the normal from two neighbours of the displaced
          // surface, or the lighting stays flat and it looks like plastic.
          vec3 dpos = displaced(position);
          vec3 tangent = normalize(abs(normal.y) < 0.99 ? cross(normal, vec3(0.0,1.0,0.0)) : vec3(1.0,0.0,0.0));
          vec3 bitangent = normalize(cross(normal, tangent));
          float eps = 0.035;
          vec3 pa = displaced(position + tangent * eps);
          vec3 pb = displaced(position + bitangent * eps);
          vec3 objectNormal = normalize(cross(pa - dpos, pb - dpos));
          if (dot(objectNormal, normal) < 0.0) objectNormal = -objectNormal;
        `)
        .replace('#include <begin_vertex>', `
          vec3 transformed = dpos;
        `)
    }

    const mesh = new THREE.Mesh(geo, mat)
    scene.add(mesh)

    // Rim lights. The orange is the brand doing the lighting rather than
    // being painted on.
    const key = new THREE.DirectionalLight('#ffffff', 2.1)
    key.position.set(3, 2.5, 4)
    scene.add(key)

    const rim = new THREE.PointLight('#ff6b35', 38, 18, 2)
    rim.position.set(-2.6, 1.4, -1.6)
    scene.add(rim)

    const rim2 = new THREE.PointLight('#ff8a52', 16, 14, 2)
    rim2.position.set(2.4, -2.0, 1.2)
    scene.add(rim2)

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
    const ro = new ResizeObserver(resize)
    ro.observe(host)

    const ptr = { tx: 0, ty: 0, x: 0, y: 0 }
    const onMove = (e: PointerEvent) => {
      ptr.tx = (e.clientX / window.innerWidth - 0.5) * 0.9
      ptr.ty = (e.clientY / window.innerHeight - 0.5) * 0.6
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
    let raf = 0
    let p = 0

    const loop = () => {
      raf = requestAnimationFrame(loop)
      if (!visible) return

      const t = clock.getElapsedTime()
      p += (progress - p) * 0.06

      uniforms.uTime.value = reduced ? 0 : t
      // Calm, then tight, then violent.
      uniforms.uAmp.value = 0.15 + Math.sin(p * Math.PI) * 0.05 + Math.pow(p, 3) * 0.34
      uniforms.uFreq.value = 1.2 + p * 1.9
      uniforms.uTurb.value = Math.pow(p, 2)

      ptr.x += (ptr.tx - ptr.x) * 0.05
      ptr.y += (ptr.ty - ptr.y) * 0.05

      mesh.rotation.y = (reduced ? 0 : t * 0.14) + ptr.x + p * 1.5
      mesh.rotation.x = ptr.y + p * 0.5
      mesh.scale.setScalar(1 + p * 0.22)

      rim.intensity = 38 + p * 70
      rim.position.x = -2.6 + Math.sin(t * 0.4) * 0.6
      camera.position.z = 5.4 - p * 0.9

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
      envRT.texture.dispose()
      pmrem.dispose()
      renderer.dispose()
      if (renderer.domElement.parentNode === host) host.removeChild(renderer.domElement)
    }
  }, [driveSelector])

  return <div ref={hostRef} className="intent-field" aria-hidden="true" />
}
