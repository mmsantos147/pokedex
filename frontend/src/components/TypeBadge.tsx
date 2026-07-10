import { themeFor } from '../typeColors'

interface TypeBadgeProps {
  type: string
  size?: 'sm' | 'md'
}

export function TypeBadge({ type, size = 'sm' }: TypeBadgeProps) {
  const theme = themeFor(type)
  return (
    <span
      className={`type-badge type-badge--${size}`}
      style={{ '--accent': theme.color, '--glow': theme.glow } as React.CSSProperties}
    >
      {type}
    </span>
  )
}
