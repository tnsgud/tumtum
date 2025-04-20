'use client'

import { useEffect, useRef } from 'react'

export function AchievementStats() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // 캔버스 크기 설정
    const setCanvasSize = () => {
      const parent = canvas.parentElement
      if (!parent) return

      canvas.width = parent.clientWidth
      canvas.height = 200
    }

    setCanvasSize()
    window.addEventListener('resize', setCanvasSize)

    // 데이터 (예시)
    const days = 30
    const achievementData = Array.from({ length: days }, () =>
      Math.floor(Math.random() * 100),
    )

    // 그래프 그리기
    const drawGraph = () => {
      if (!ctx) return

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const width = canvas.width
      const height = canvas.height
      const padding = 20
      const graphWidth = width - padding * 2
      const graphHeight = height - padding * 2

      // 그리드 그리기
      ctx.strokeStyle = '#e5e7eb'
      ctx.lineWidth = 1

      // 수평선
      for (let i = 0; i <= 4; i++) {
        const y = padding + (graphHeight / 4) * i
        ctx.beginPath()
        ctx.moveTo(padding, y)
        ctx.lineTo(width - padding, y)
        ctx.stroke()
      }

      // 데이터 그리기
      const barWidth = graphWidth / days - 4
      const maxValue = 100

      // 그라데이션 설정
      const gradient = ctx.createLinearGradient(0, padding, 0, height - padding)
      gradient.addColorStop(0, '#f43f5e') // rose-500
      gradient.addColorStop(1, '#fda4af') // rose-300

      ctx.fillStyle = gradient

      achievementData.forEach((value, index) => {
        const x = padding + (graphWidth / days) * index
        const barHeight = (value / maxValue) * graphHeight
        const y = height - padding - barHeight

        ctx.fillRect(x, y, barWidth, barHeight)
      })

      // 선 그리기
      ctx.strokeStyle = '#f43f5e' // rose-500
      ctx.lineWidth = 2
      ctx.beginPath()

      achievementData.forEach((value, index) => {
        const x = padding + (graphWidth / days) * index + barWidth / 2
        const y = height - padding - (value / maxValue) * graphHeight

        if (index === 0) {
          ctx.moveTo(x, y)
        } else {
          ctx.lineTo(x, y)
        }
      })

      ctx.stroke()
    }

    drawGraph()

    return () => {
      window.removeEventListener('resize', setCanvasSize)
    }
  }, [])

  return (
    <div className="w-full h-[200px]">
      <canvas ref={canvasRef} className="w-full h-full" />
    </div>
  )
}
