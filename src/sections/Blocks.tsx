import { brand, cta, faqs, home, stats as defaultStats } from '../content/site';
import type { Stat } from '../content/site';
import { Section } from '../components/elementor/Section';
import { Button } from '../components/widgets/Button';
import { Counter } from '../components/widgets/Counter';
import { Accordion } from '../components/widgets/Accordion';
import { Eyebrow, SectionHeader } from '../components/widgets/Heading';

/** Stats strip — Grid Container (5 / 3 / 2 cols) of Counter widgets with hairline dividers. */
export function StatsStrip({ items = defaultStats }: { items?: Stat[] }) {
  return (
    <section className="wk-stats" data-el="container" aria-label="Company facts">
      <div className="wk-container">
        <dl className="wk-stats__grid">
          {items.map((s) => (
            <div key={s.label} className="wk-stats__item" data-reveal>
              <dd className="wk-stats__value">
                <Counter value={s.value} suffix={s.suffix} plain={s.plain} />
              </dd>
              <dt className="wk-stats__label">{s.label}</dt>
              <dd className="wk-stats__note">{s.note}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

/** Scrolling name band — Elementor: Container + Text Editor with class `wk-marquee` (CSS-only animation). */
export function Marquee() {
  const m = home.marquee;
  const row = (hidden: boolean) => (
    <ul className="wk-marquee__row" aria-hidden={hidden || undefined}>
      {m.names.map((n) => (
        <li key={n}>{n}</li>
      ))}
    </ul>
  );
  return (
    <section className="wk-marquee" data-el="container">
      <p className="wk-marquee__label">{m.eyebrow}</p>
      <div className="wk-marquee__track">
        {row(false)}
        {row(true)}
      </div>
    </section>
  );
}

/** FAQ — two columns: Section Header + Accordion. */
export function FaqBlock({ tone = 'sand' as const }: { tone?: 'sand' | 'light' }) {
  const f = home.faq;
  return (
    <Section tone={tone} id="faq">
      <div className="wk-split wk-split--faq">
        <SectionHeader eyebrow={f.eyebrow} title={f.title} text={f.text} width="narrow" />
        <div data-reveal>
          <Accordion items={faqs} />
        </div>
      </div>
    </Section>
  );
}

/** Closing call to action — green band, saved as a Global template and placed on every page. */
export function CtaBand() {
  return (
    <section className="wk-cta" data-el="container">
      <div className="wk-container wk-cta__inner">
        <div className="wk-cta__copy" data-reveal>
          <Eyebrow>{cta.eyebrow}</Eyebrow>
          <h2 className="wk-cta__title">{cta.title}</h2>
          <p className="wk-cta__text">{cta.text}</p>
        </div>
        <div className="wk-cta__actions" data-reveal>
          <Button to={cta.primary.to} variant="gold" block>
            {cta.primary.label}
          </Button>
          <Button href={brand.phoneHref} variant="ghost" iconLeft="phone" icon={null} block>
            Call {brand.phone}
          </Button>
          <Button href={brand.mapsUrl} variant="text" iconLeft="map-pin" icon={null} newTab>
            {brand.address.join(', ')}
          </Button>
        </div>
      </div>
    </section>
  );
}
