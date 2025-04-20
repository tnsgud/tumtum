'use client'
import { useEffect, useRef } from "react"

export function EmotionStats() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // 캔버스 크기 설정
    const setCanvasSize = () => {
      const parent = canvas.parentElement
      if (!parent) return

      canvas.width = parent.clientWidth
      canvas.height = 300
    }

    setCanvasSize()
    window.addEventListener("resize", setCanvasSize)

    // 감정 데이터 (예시)
    const emotions = [
      { name: "신남", emoji: "😄", count: 8, color: "#fbbf24" },
      { name: "행복", emoji: "🙂", count: 12, color: "#10b981" },
      { name: "보통", emoji: "😐", count: 5, color: "#94a3b8" },
      { name: "피곤", emoji: "😩", count: 3, color: "#a855f7" },
      { name: "슬픔", emoji: "😢", count: 1, color: "#3b82f6" },
      { name: "스트레스", emoji: "😠", count: 1, color: "#f43f5e" },
    ]

    const totalCount = emotions.reduce((sum, emotion) => sum + emotion.count, 0)

    // 원형 차트 그리기
    const drawPieChart = () => {
      if (!ctx) return

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const centerX = canvas.width / 2
      const centerY = 150
      const radius = 100

      let startAngle = 0

      for(const emotion of emotions) {
        const sliceAngle = (2 * Math.PI * emotion.count) / totalCount

        ctx.beginPath()
        ctx.moveTo(centerX, centerY)
        ctx.arc(centerX, centerY, radius, startAngle, startAngle + sliceAngle)
        ctx.closePath()

        ctx.fillStyle = emotion.color
        ctx.fill()

        // 레이블 위치 계산
        const labelAngle = startAngle + sliceAngle / 2
        const labelRadius = radius * 0.7
        const labelX = centerX + Math.cos(labelAngle) * labelRadius
        const labelY = centerY + Math.sin(labelAngle) * labelRadius

        // 이모지 그리기
        ctx.font = "20px Arial"
        ctx.fillText(emotion.emoji, labelX - 10, labelY + 7)

        startAngle += sliceAngle
      }

      // 범례 그리기
      const legendY = centerY + radius + 30
      const legendWidth = 100
      const legendHeight = 25
      const legendsPerRow = Math.floor(canvas.width / legendWidth)

      emotions.forEach((emotion, index) => {
        const row = Math.floor(index / legendsPerRow)
        const col = index % legendsPerRow
        const legendX = (canvas.width / legendsPerRow) * col + 20

        ctx.fillStyle = emotion.color
        ctx.fillRect(legendX, legendY + row * legendHeight, 15, 15)

        ctx.fillStyle = "#000000"
        ctx.font = "12px Arial"
        ctx.fillText(`${emotion.name} (${emotion.count})`, legendX + 20, legendY + row * legendHeight + 12)
      })
    }

    drawPieChart()

    return () => {
      window.removeEventListener("resize", setCanvasSize)
    }
  }, [])

  return (
    <div className="w-full h-[300px]">
      <canvas ref={canvasRef} className="w-full h-full" />
    </div>
  )
}
