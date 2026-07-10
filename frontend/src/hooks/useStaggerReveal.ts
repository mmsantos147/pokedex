import { useEffect, useRef } from 'react'

/**
 * Revela elementos com a classe `.reveal` conforme entram no viewport,
 * aplicando um atraso escalonado dentro de cada leva observada.
 */
export function useStaggerReveal(deps: unknown[] = []) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting)
        visible.forEach((entry, index) => {
          const el = entry.target as HTMLElement
          el.style.transitionDelay = `${Math.min(index * 45, 400)}ms`
          el.classList.add('is-visible')
          observer.unobserve(el)
        })
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.05 },
    )

    container.querySelectorAll<HTMLElement>('.reveal:not(.is-visible)').forEach((el) => {
      observer.observe(el)
    })

    return () => observer.disconnect()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)

  return containerRef
}
