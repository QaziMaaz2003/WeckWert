import type { IconName } from '../../content/types';
import { Icon } from '../ui/Icon';

interface Item {
  icon: IconName;
  title: string;
  text: string;
}

interface Props {
  items: Item[];
  /** Desktop columns (tablet drops to 2, mobile to 1). */
  cols?: 2 | 3 | 4;
  numbered?: boolean;
  compact?: boolean;
}

/**
 * Bordered "ledger" grid of Icon Boxes.
 * Elementor: Grid Container (cols 3/2/1, gap 0, border 1px Border colour) with one
 * Icon Box widget per cell; cell class `wk-cell` adds the inner hairlines.
 */
export function FeatureGrid({ items, cols = 3, numbered = true, compact }: Props) {
  return (
    <div className={`wk-ledger wk-ledger--${cols}${compact ? ' wk-ledger--compact' : ''}`} data-el="grid">
      {items.map((item, i) => (
        <article key={item.title} className="wk-cell" data-widget="icon-box" data-reveal style={{ transitionDelay: `${(i % cols) * 70}ms` }}>
          <Icon name={item.icon} size={30} strokeWidth={1.4} className="wk-cell__icon" />
          {numbered && <span className="wk-cell__num">{String(i + 1).padStart(2, '0')}</span>}
          <h3 className="wk-cell__title">{item.title}</h3>
          <p className="wk-cell__text">{item.text}</p>
        </article>
      ))}
    </div>
  );
}
