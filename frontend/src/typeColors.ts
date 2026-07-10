export interface TypeTheme {
  color: string
  glow: string
}

export const TYPE_THEMES: Record<string, TypeTheme> = {
  Normal: { color: '#a8a878', glow: 'rgba(168, 168, 120, 0.35)' },
  Fire: { color: '#ff7b45', glow: 'rgba(255, 123, 69, 0.35)' },
  Water: { color: '#4d9df5', glow: 'rgba(77, 157, 245, 0.35)' },
  Grass: { color: '#5dc264', glow: 'rgba(93, 194, 100, 0.35)' },
  Electric: { color: '#f6c840', glow: 'rgba(246, 200, 64, 0.35)' },
  Ice: { color: '#7dd4ce', glow: 'rgba(125, 212, 206, 0.35)' },
  Fighting: { color: '#d4455b', glow: 'rgba(212, 69, 91, 0.35)' },
  Poison: { color: '#b466cf', glow: 'rgba(180, 102, 207, 0.35)' },
  Ground: { color: '#d8a35c', glow: 'rgba(216, 163, 92, 0.35)' },
  Flying: { color: '#98a8f0', glow: 'rgba(152, 168, 240, 0.35)' },
  Psychic: { color: '#f26b8b', glow: 'rgba(242, 107, 139, 0.35)' },
  Bug: { color: '#a3bc2d', glow: 'rgba(163, 188, 45, 0.35)' },
  Rock: { color: '#c2ab61', glow: 'rgba(194, 171, 97, 0.35)' },
  Ghost: { color: '#8571bd', glow: 'rgba(133, 113, 189, 0.35)' },
  Dragon: { color: '#8258f5', glow: 'rgba(130, 88, 245, 0.35)' },
  Dark: { color: '#8d7566', glow: 'rgba(141, 117, 102, 0.35)' },
  Steel: { color: '#a8b8c8', glow: 'rgba(168, 184, 200, 0.35)' },
  Fairy: { color: '#f0a3bd', glow: 'rgba(240, 163, 189, 0.35)' },
}

export const FALLBACK_THEME: TypeTheme = {
  color: '#8892a6',
  glow: 'rgba(136, 146, 166, 0.35)',
}

export function themeFor(type: string | null | undefined): TypeTheme {
  if (!type) return FALLBACK_THEME
  return TYPE_THEMES[type] ?? FALLBACK_THEME
}

export const ALL_TYPES = Object.keys(TYPE_THEMES)
