import type { ReactNode } from 'react';

/** Elementor Heading widget (h6 size, CSS class `wk-eyebrow`). */
export function Eyebrow({ children, line, className = '' }: { children: ReactNode; line?: boolean; className?: string }) {
  return <p className={`wk-eyebrow${line ? ' wk-eyebrow--line' : ''} ${className}`}>{children}</p>;
}

interface Props {
  eyebrow?: string;
  title: string;
  text?: ReactNode;
  as?: 'h1' | 'h2' | 'h3';
  align?: 'left' | 'center';
  /** Max width of the block: narrow (720) or wide (880). */
  width?: 'narrow' | 'wide' | 'full';
  className?: string;
  children?: ReactNode;
}

/**
 * Section intro — Elementor: Heading (eyebrow) + Heading (title) + Text Editor.
 * Save once as a Global Widget / template "Section Header".
 */
export function SectionHeader({ eyebrow, title, text, as: Tag = 'h2', align = 'left', width = 'wide', className = '', children }: Props) {
  return (
    <header className={`wk-head wk-head--${align} wk-head--${width} ${className}`} data-reveal>
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <Tag className="wk-head__title">{title}</Tag>
      {text && <p className="wk-head__text">{text}</p>}
      {children}
    </header>
  );
}
