"use client"
import { useState } from "react"

type Props = {
  text: string
  label: string
  variant: "full" | "section"
}

export default function CopySection({ text, label, variant }: Props) {
  const [copied, setCopied] = useState(false)

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2500)
    } catch (err) {
      console.error("Copy failed:", err)
    }
  }

  const isFull = variant === "full"

  return (
    <button
      onClick={handleCopy}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "0.5rem",
        background: copied ? "#ff6b35" : isFull ? "#ff6b35" : "transparent",
        color: copied ? "#0a0a0a" : isFull ? "#0a0a0a" : "#ff6b35",
        border: isFull ? "none" : "1px solid rgba(255,107,53,0.4)",
        padding: isFull ? "0.875rem 1.5rem" : "0.5rem 1rem",
        borderRadius: "6px",
        fontSize: isFull ? "0.95rem" : "0.825rem",
        fontWeight: 600,
        cursor: "pointer",
        transition: "all 0.15s ease",
      }}
    >
      {copied ? (
        <>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
          Copied
        </>
      ) : (
        <>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
          </svg>
          {label}
        </>
      )}
    </button>
  )
}
