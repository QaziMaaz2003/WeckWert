import { useState } from 'react';
import { home, regions } from '../content/site';
import { Section } from '../components/elementor/Section';
import { SectionHeader } from '../components/widgets/Heading';
import { Icon } from '../components/ui/Icon';

/**
 * Regional reach — Elementor Tabs widget (horizontal, styled as state tiles) whose
 * content is the green "map card". Static fallback: four Icon Boxes.
 */
export function Regions() {
  const [active, setActive] = useState(0);
  const r = regions[active];
  return (
    <Section tone="sand" id="regions">
      <div className="wk-split wk-split--regions">
        <div>
          <SectionHeader eyebrow={home.regions.eyebrow} title={home.regions.title} text={home.regions.text} width="narrow" />
          <div className="wk-states" role="tablist" aria-label="States" data-reveal>
            {regions.map((s, i) => (
              <button
                key={s.code}
                type="button"
                role="tab"
                id={`wk-state-${s.code}`}
                aria-selected={active === i}
                aria-controls="wk-state-panel"
                className={`wk-states__tile${active === i ? ' is-active' : ''}`}
                onClick={() => setActive(i)}
              >
                <span className="wk-states__code">{s.code}</span>
                <span className="wk-states__note">{s.note}</span>
              </button>
            ))}
          </div>
        </div>
        <div id="wk-state-panel" role="tabpanel" aria-labelledby={`wk-state-${r.code}`} className="wk-mapcard" data-reveal>
          <Icon name="map-pin" size={34} strokeWidth={1.4} className="wk-mapcard__pin" />
          <p className="wk-mapcard__code" key={r.code}>
            {r.code}
          </p>
          <h3 className="wk-mapcard__state">{r.state}</h3>
          <p className="wk-mapcard__text">{r.text}</p>
          <ul className="wk-mapcard__projects">
            {r.projects.map((p) => (
              <li key={p}>{p}</li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}
