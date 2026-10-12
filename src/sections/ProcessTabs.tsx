import { useState } from 'react';
import type { KeyboardEvent } from 'react';
import { processSteps } from '../content/site';
import { Icon } from '../components/ui/Icon';

/**
 * Elementor Tabs widget (vertical layout). Tab titles = left list, tab content = green panel.
 * Uses the WAI-ARIA tabs pattern; arrow keys move between phases.
 */
export function ProcessTabs() {
  const [active, setActive] = useState(0);
  const step = processSteps[active];

  const onKey = (e: KeyboardEvent, i: number) => {
    const n = processSteps.length;
    let next: number | null = null;
    if (e.key === 'ArrowDown' || e.key === 'ArrowRight') next = (i + 1) % n;
    if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') next = (i - 1 + n) % n;
    if (next !== null) {
      e.preventDefault();
      setActive(next);
      document.getElementById(`wk-phase-tab-${next}`)?.focus();
    }
  };

  return (
    <div className="wk-tabs" data-widget="tabs" data-reveal>
      <div className="wk-tabs__list" role="tablist" aria-label="Project phases" aria-orientation="vertical">
        {processSteps.map((s, i) => (
          <button
            key={s.title}
            id={`wk-phase-tab-${i}`}
            role="tab"
            type="button"
            aria-selected={active === i}
            aria-controls="wk-phase-panel"
            tabIndex={active === i ? 0 : -1}
            className={`wk-tabs__tab${active === i ? ' is-active' : ''}`}
            onClick={() => setActive(i)}
            onKeyDown={(e) => onKey(e, i)}
          >
            <span className="wk-tabs__num">{String(i + 1).padStart(2, '0')}</span>
            <span>{s.title}</span>
          </button>
        ))}
      </div>
      <div id="wk-phase-panel" role="tabpanel" aria-labelledby={`wk-phase-tab-${active}`} className="wk-tabs__panel" key={active}>
        <Icon name={step.icon} size={40} strokeWidth={1.3} className="wk-tabs__icon" />
        <p className="wk-tabs__phase">Phase {String(active + 1).padStart(2, '0')}</p>
        <h3 className="wk-tabs__title">{step.title}</h3>
        <p className="wk-tabs__text">{step.text}</p>
        <ul className="wk-tabs__points">
          {step.points.map((p) => (
            <li key={p}>
              <Icon name="check" size={16} />
              {p}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
