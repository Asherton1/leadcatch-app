'use client'

import { useEffect, useRef, useState } from 'react'

/**
 * PhantomCapture
 * --------------
 * Ambient background for the ReCapture hero section.
 * Ghost form fragments appear in negative space, type partial data, then
 * either fade (abandoned lead) or get captured by an orange thread (recovered).
 *
 * - Renders ONLY on viewports >= 1440px (large desktop)
 * - Returns null on tablet/mobile/standard desktop (no DOM, no JS work)
 * - Respects prefers-reduced-motion (renders nothing)
 * - Cleans up timers + DOM on unmount
 *
 * Place inside any parent that has `position: relative`.
 * Component is absolute-positioned, pointer-events: none, zIndex 0.
 * Hero content above must have its own position + zIndex >= 1.
 *
 * Tuning knobs at the top of useEffect — adjust MAX_ACTIVE, SPAWN_MS,
 * CAPTURE_PROBABILITY to change density and capture frequency.
 */
export default function PhantomCapture() {
  const phantomsRef = useRef(null)
  const threadsRef = useRef(null)
  const containerRef = useRef(null)
  const [isLargeDesktop, setIsLargeDesktop] = useState(false)

  // Gate at 1440px
  useEffect(() => {
    const check = () => setIsLargeDesktop(window.innerWidth >= 1440)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  useEffect(() => {
    if (!isLargeDesktop) return

    // Respect reduced-motion: render nothing animated
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const phantomHost = phantomsRef.current
    const threadHost = threadsRef.current
    const container = containerRef.current
    if (!phantomHost || !threadHost || !container) return

    const SVG_NS = 'http://www.w3.org/2000/svg'

    // === TUNING KNOBS ===
    const MAX_ACTIVE = 3
    const SPAWN_INTERVAL_MS = 1500
    const CAPTURE_PROBABILITY = 0.45
    // ====================

    // Slot positions are computed as percentages of the container so they
    // scale with hero size. Each slot includes a direction the capture
    // thread should reach in from.
    const getSlots = () => {
      const W = container.offsetWidth
      const H = container.offsetHeight
      return [
        { x: W * 0.025, y: H * 0.06, dir: 'left' }, // top-left
        { x: W * 0.36, y: H * 0.05, dir: 'top' }, // top-mid
        { x: W * 0.78, y: H * 0.06, dir: 'right' }, // top-right
        { x: W * 0.025, y: H * 0.85, dir: 'left' }, // bottom-left
        { x: W * 0.34, y: H * 0.88, dir: 'bottom' }, // bottom-mid
        { x: W * 0.78, y: H * 0.85, dir: 'right' }, // bottom-right
      ]
    }

    const fields = [
      {
        label: 'FULL NAME',
        values: [
          'Sarah M',
          'James R.',
          'Maria Lo',
          'David K.',
          'Aisha P',
          'Tom Walt',
          'Olivia S',
          'Marcus J',
          'Diana R',
          'Ethan B',
        ],
      },
      {
        label: 'EMAIL',
        values: [
          'sarah.m@gma',
          'j.rivera@',
          'maria.lo@y',
          'd.kleinm',
          'aisha.p@',
          'tom.walter',
          'olivia.s@',
          'marcus@me',
          'diana.r@gm',
          'e.bowman',
        ],
      },
      {
        label: 'PHONE',
        values: [
          '(214) 555-',
          '(972) 8',
          '(469) 213',
          '(817) 555',
          '(214) 9',
          '(972) 444-',
          '(469) 8',
          '(214) 6',
          '(214) 555-01',
          '(469) 22',
        ],
      },
      {
        label: 'COMPANY',
        values: [
          'Apex Real',
          'Vanguard H',
          'Skyline P',
          'Crest Cap',
          'Meridian ',
          'Lone Star',
          'Highland',
          'Reserve R',
          'Wells Gro',
          'Pinnacle',
        ],
      },
      {
        label: 'ZIP CODE',
        values: [
          '75201',
          '75205',
          '752',
          '75219',
          '75204',
          '752',
          '75226',
          '75230',
          '752',
          '75240',
        ],
      },
    ]

    const used = new Set()
    const timeouts = new Set()
    let intervalId = 0
    let alive = true

    const setT = (fn, ms) => {
      const id = window.setTimeout(() => {
        timeouts.delete(id)
        if (alive) fn()
      }, ms)
      timeouts.add(id)
      return id
    }

    const freeSlot = () => {
      const slots = getSlots()
      const f = slots.map((_, i) => i).filter((i) => !used.has(i))
      return f.length ? { idx: f[Math.floor(Math.random() * f.length)], slots } : null
    }

    const typeIt = (el, full, i, done) => {
      if (!alive) return
      if (i >= full.length) {
        done && done()
        return
      }
      el.textContent = full.substring(0, i + 1)
      const d = 80 + Math.random() * 95
      const p = Math.random() < 0.07 ? 280 + Math.random() * 420 : 0
      setT(() => typeIt(el, full, i + 1, done), d + p)
    }

    const fade = (el, slotIdx) => {
      el.style.transition = 'opacity 0.85s ease-in'
      el.classList.remove('rc-visible')
      setT(() => {
        el.remove()
        used.delete(slotIdx)
      }, 900)
    }

    const capture = (el, slot, slotIdx) => {
      el.classList.add('rc-captured')
      const W = container.offsetWidth
      const H = container.offsetHeight
      let sx, sy
      if (slot.dir === 'left') {
        sx = -15
        sy = slot.y + 10
      } else if (slot.dir === 'right') {
        sx = W + 15
        sy = slot.y + 10
      } else if (slot.dir === 'top') {
        sx = slot.x + 25
        sy = -15
      } else {
        sx = slot.x + 25
        sy = H + 15
      }
      const ex = slot.x + 8
      const ey = slot.y + 14
      const mx = (sx + ex) / 2 + (Math.random() - 0.5) * 18
      const my = (sy + ey) / 2 + (Math.random() - 0.5) * 18

      const path = document.createElementNS(SVG_NS, 'path')
      path.setAttribute('d', `M ${sx} ${sy} Q ${mx} ${my} ${ex} ${ey}`)
      path.setAttribute('class', 'rc-thread')
      const len = Math.sqrt((sx - ex) ** 2 + (sy - ey) ** 2) * 1.15
      path.style.strokeDasharray = String(len)
      path.style.strokeDashoffset = String(len)
      threadHost.appendChild(path)

      requestAnimationFrame(() => {
        path.style.transition = 'stroke-dashoffset 0.55s cubic-bezier(0.5,0,0.2,1)'
        path.style.strokeDashoffset = '0'
      })

      setT(() => {
        el.style.transition =
          'opacity 0.5s ease-in, transform 0.55s cubic-bezier(0.6,0,1,1)'
        el.style.transform = `translate(${(sx - ex) * 0.55}px, ${
          (sy - ey) * 0.55
        }px) scale(0.82)`
        el.style.opacity = '0'
        path.style.transition = 'opacity 0.4s ease-out 0.2s'
        path.style.opacity = '0'
      }, 650)

      setT(() => {
        el.remove()
        path.remove()
        used.delete(slotIdx)
      }, 1350)
    }

    const abandon = (el, slot, slotIdx) => {
      el.classList.add('rc-no-cursor')
      setT(() => {
        if (Math.random() < CAPTURE_PROBABILITY) capture(el, slot, slotIdx)
        else fade(el, slotIdx)
      }, 550 + Math.random() * 700)
    }

    const spawn = () => {
      const free = freeSlot()
      if (!free) return
      const slot = free.slots[free.idx]
      used.add(free.idx)

      const f = fields[Math.floor(Math.random() * fields.length)]
      const v = f.values[Math.floor(Math.random() * f.values.length)]
      const partial = v.substring(
        0,
        Math.max(3, Math.floor(v.length * (0.4 + Math.random() * 0.5)))
      )

      const el = document.createElement('div')
      el.className = 'rc-frag'
      el.style.left = slot.x + 'px'
      el.style.top = slot.y + 'px'
      el.innerHTML =
        '<div class="rc-flabel">' +
        f.label +
        '</div><div class="rc-finput"><span class="rc-ftext"></span><span class="rc-fcursor"></span></div>'
      phantomHost.appendChild(el)

      requestAnimationFrame(() => el.classList.add('rc-visible'))

      setT(() => {
        const textEl = el.querySelector('.rc-ftext')
        if (textEl) {
          typeIt(textEl, partial, 0, () => {
            setT(() => abandon(el, slot, free.idx), 700 + Math.random() * 900)
          })
        }
      }, 420)
    }

    // Stagger first three spawns
    setT(spawn, 300)
    setT(spawn, 1800)
    setT(spawn, 3300)

    // Continuous lifecycle
    intervalId = window.setInterval(() => {
      if (used.size < MAX_ACTIVE) spawn()
    }, SPAWN_INTERVAL_MS)

    return () => {
      alive = false
      window.clearInterval(intervalId)
      timeouts.forEach((id) => window.clearTimeout(id))
      timeouts.clear()
      // Clean DOM
      while (phantomHost.firstChild) phantomHost.removeChild(phantomHost.firstChild)
      while (threadHost.firstChild) threadHost.removeChild(threadHost.firstChild)
    }
  }, [isLargeDesktop])

  if (!isLargeDesktop) return null

  return (
    <>
      <style jsx>{`
        .rc-bg {
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: 0;
          overflow: hidden;
        }
        :global(.rc-frag) {
          position: absolute;
          opacity: 0;
          transition: opacity 0.7s ease-out;
          will-change: opacity, transform;
        }
        :global(.rc-frag.rc-visible) {
          opacity: 0.34;
        }
        :global(.rc-frag.rc-captured) {
          opacity: 0.92;
        }
        :global(.rc-flabel) {
          font-size: 8.5px;
          letter-spacing: 1.8px;
          color: #ff6b35;
          opacity: 0.6;
          font-weight: 600;
          margin-bottom: 3px;
          font-family: var(--font-geist-sans), -apple-system, system-ui, sans-serif;
        }
        :global(.rc-finput) {
          font-family: 'SF Mono', 'JetBrains Mono', Menlo, Consolas, monospace;
          font-size: 11.5px;
          color: #e8d9c4;
          display: flex;
          align-items: center;
          letter-spacing: 0.4px;
          white-space: nowrap;
        }
        :global(.rc-fcursor) {
          display: inline-block;
          width: 5.5px;
          height: 11px;
          background: #ff6b35;
          margin-left: 2px;
          animation: rc-blink 0.95s steps(2) infinite;
        }
        :global(.rc-frag.rc-captured .rc-finput) {
          color: #ff6b35;
          text-shadow: 0 0 8px rgba(255, 107, 53, 0.5);
        }
        :global(.rc-frag.rc-captured .rc-flabel) {
          color: #ffaa66;
          opacity: 0.9;
        }
        :global(.rc-frag.rc-no-cursor .rc-fcursor) {
          display: none;
        }
        @keyframes rc-blink {
          0%,
          49% {
            opacity: 1;
          }
          50%,
          100% {
            opacity: 0;
          }
        }
        :global(.rc-thread) {
          stroke: #ff6b35;
          stroke-width: 0.9;
          fill: none;
          stroke-linecap: round;
          filter: drop-shadow(0 0 4px rgba(255, 107, 53, 0.7));
        }
      `}</style>
      <div ref={containerRef} className="rc-bg" aria-hidden="true">
        <div ref={phantomsRef} />
        <svg
          ref={threadsRef}
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            overflow: 'visible',
          }}
        />
      </div>
    </>
  )
}
