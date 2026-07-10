import { STAT_MAX } from '../types'

interface StatBarProps {
  label: string
  value: number
  accent: string
  delay: number
}

export function StatBar({ label, value, accent, delay }: StatBarProps) {
  const percent = Math.min((value / STAT_MAX) * 100, 100)

  return (
    <div className="stat">
      <span className="stat__label">{label}</span>
      <span className="stat__value">{value}</span>
      <div className="stat__track">
        <div
          className="stat__fill"
          style={{
            '--w': `${percent}%`,
            background: accent,
            animationDelay: `${delay}ms`,
          } as React.CSSProperties}
        />
      </div>
    </div>
  )
}
