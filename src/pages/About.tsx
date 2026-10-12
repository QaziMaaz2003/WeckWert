import { aboutPage as ap, advantages } from '../content/site';
import { Section } from '../components/elementor/Section';
import { Eyebrow, SectionHeader } from '../components/widgets/Heading';
import { FeatureGrid } from '../components/widgets/FeatureGrid';
import { Button } from '../components/widgets/Button';
import { Icon } from '../components/ui/Icon';
import { PageHero } from '../sections/Heroes';
import { CtaBand, StatsStrip } from '../sections/Blocks';
import { TeamBios } from '../sections/Team';
import { usePageTitle } from '../hooks/usePageTitle';

export default function About() {
  usePageTitle('About', ap.hero.text);
  return (
    <>
      <PageHero
        eyebrow={ap.hero.eyebrow}
        title={ap.hero.title}
        text={ap.hero.text}
        image={ap.hero.image}
        crumbs={[{ label: 'Home', to: '/' }, { label: 'About' }]}
      />

      <Section tone="light">
        <div className="wk-split wk-split--media">
          <div className="wk-prose" data-reveal>
            <Eyebrow>{ap.intro.eyebrow}</Eyebrow>
            <h2 className="wk-h2">{ap.intro.title}</h2>
            {ap.intro.paragraphs.map((p, i) => (
              <p key={i} className={i === 0 ? 'wk-lead' : undefined}>
                {p}
              </p>
            ))}
          </div>
          <figure className="wk-frame" data-reveal>
            <img src={ap.intro.image} alt={ap.intro.imageAlt} loading="lazy" />
          </figure>
        </div>
      </Section>

      <StatsStrip />

      <Section tone="sand">
        <div className="wk-ledger wk-ledger--2" data-el="grid">
          {ap.focus.map((f) => (
            <article key={f.title} className="wk-cell wk-cell--focus" data-reveal>
              <Icon name={f.icon} size={30} strokeWidth={1.4} className="wk-cell__icon" />
              <h2 className="wk-cell__title wk-cell__title--lg">{f.title}</h2>
              <p className="wk-cell__text">{f.text}</p>
              <Button to={f.link.to} variant="text">{f.link.label}</Button>
            </article>
          ))}
        </div>
      </Section>

      <Section tone="light">
        <SectionHeader eyebrow={ap.advantages.eyebrow} title={ap.advantages.title} />
        <FeatureGrid items={advantages} cols={3} />
      </Section>

      <Section tone="forest" id="history">
        <SectionHeader eyebrow={ap.timeline.eyebrow} title={ap.timeline.title} />
        <ol className="wk-timeline">
          {ap.timeline.items.map((t, i) => (
            <li key={t.year} className="wk-timeline__item" data-reveal style={{ transitionDelay: `${(i % 4) * 70}ms` }}>
              <span className="wk-timeline__year">{t.year}</span>
              <h3 className="wk-timeline__title">{t.title}</h3>
              <p className="wk-timeline__text">{t.text}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section tone="light" id="team">
        <SectionHeader eyebrow={ap.team.eyebrow} title={ap.team.title} text={ap.team.text} />
        <TeamBios />
      </Section>

      <Section tone="sand">
        <SectionHeader eyebrow={ap.community.eyebrow} title={ap.community.title} />
        <FeatureGrid items={ap.community.items} cols={3} numbered={false} />
      </Section>

      <CtaBand />
    </>
  );
}
