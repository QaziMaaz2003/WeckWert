import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import type { IconName } from '../../content/types';
import { Icon } from '../ui/Icon';

/**
 * Elementor Button widget. Variants map to Global Button styles / CSS classes:
 *   gold   → `wk-btn--gold`   (primary on dark)
 *   green  → `wk-btn--green`  (primary on light)
 *   ghost  → `wk-btn--ghost`  (outline, on dark)
 *   line   → `wk-btn--line`   (outline, on light)
 *   text   → `wk-btn--text`   (text link with arrow)
 */
type Variant = 'gold' | 'green' | 'ghost' | 'line' | 'text';

interface Props {
  to?: string;
  href?: string;
  variant?: Variant;
  icon?: IconName | null;
  iconLeft?: IconName;
  block?: boolean;
  type?: 'button' | 'submit';
  onClick?: () => void;
  download?: boolean;
  newTab?: boolean;
  className?: string;
  children: ReactNode;
}

export function Button({ to, href, variant = 'green', icon = 'arrow-right', iconLeft, block, type = 'button', onClick, download, newTab, className = '', children }: Props) {
  const cls = `wk-btn wk-btn--${variant}${block ? ' wk-btn--block' : ''} ${className}`;
  const inner = (
    <>
      {iconLeft && <Icon name={iconLeft} size={17} />}
      <span>{children}</span>
      {icon && <Icon name={icon} size={17} className="wk-btn__icon" />}
    </>
  );

  if (to) {
    return (
      <Link to={to} className={cls} data-widget="button">
        {inner}
      </Link>
    );
  }
  if (href) {
    return (
      <a
        href={href}
        className={cls}
        data-widget="button"
        download={download || undefined}
        target={newTab ? '_blank' : undefined}
        rel={newTab ? 'noopener noreferrer' : undefined}
      >
        {inner}
      </a>
    );
  }
  return (
    <button type={type} className={cls} onClick={onClick} data-widget="button">
      {inner}
    </button>
  );
}
