import { Icon } from '../ui/Icon';

interface Item {
  q: string;
  a: string;
}

/**
 * Elementor Accordion widget (it renders native <details>/<summary> too).
 * First item open by default, like the reference design.
 */
export function Accordion({ items }: { items: Item[] }) {
  return (
    <div className="wk-accordion" data-widget="accordion">
      {items.map((item, i) => (
        <details key={item.q} className="wk-accordion__item" open={i === 0}>
          <summary className="wk-accordion__q">
            <span>{item.q}</span>
            <Icon name="chevron-down" size={18} className="wk-accordion__icon" />
          </summary>
          <div className="wk-accordion__a">
            <p>{item.a}</p>
          </div>
        </details>
      ))}
    </div>
  );
}
