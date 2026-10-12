import type { ReactNode } from 'react';

/**
 * Outer Elementor Container (full width) + boxed inner container (1280px).
 * `tone` = background preset; each maps to an Elementor Global Color:
 *   light → Background (#fcfaf6) · sand → Surface (#f4f0e7) · green → Primary (#003f20)
 *   forest → Forest (#002a14) · charcoal → Charcoal (#0f1611)
 */
export type Tone = 'light' | 'sand' | 'green' | 'forest' | 'charcoal';

interface Props {
  id?: string;
  tone?: Tone;
  size?: 'lg' | 'md' | 'sm' | 'none';
  className?: string;
  /** Skip the boxed inner container (full-bleed content). */
  bleed?: boolean;
  bordered?: boolean;
  children: ReactNode;
}

export function Section({ id, tone = 'light', size = 'lg', className = '', bleed, bordered, children }: Props) {
  const cls = ['wk-section', `wk-section--${tone}`, `wk-pad--${size}`, bordered ? 'wk-section--bordered' : '', className]
    .filter(Boolean)
    .join(' ');
  return (
    <section id={id} className={cls} data-el="container">
      {bleed ? children : <div className="wk-container">{children}</div>}
    </section>
  );
}
