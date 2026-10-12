import { commercialPage as cp } from '../content/site';
import { projectBySlug, projectsOfType } from '../content/projects';
import { Section } from '../components/elementor/Section';
import { Eyebrow, SectionHeader } from '../components/widgets/Heading';
import { FeatureGrid } from '../components/widgets/FeatureGrid';
import { Button } from '../components/widgets/Button';
import { PageHero } from '../sections/Heroes';
import { CtaBand } from '../sections/Blocks';
import { ProjectGrid } from '../sections/Projects';
import { usePageTitle } from '../hooks/usePageTitle';

export default function Commercial() {
  usePageTitle('Commercial', cp.hero.text);
  const list = projectsOfType('commercial');
  const wendys = projectBySlug('wendys')!;
  const colonial = projectBySlug('colonial-square')!;
  // one wide photo + two below (Elementor: Gallery widget, 2 columns, first image spanning both)
  const mosaic = [0, 7, 9].map((i) => wendys.gallery![i]);

  return (
    <>
      <PageHero
        eyebrow={cp.hero.eyebrow}
        title={cp.hero.title}
        text={cp.hero.text}
        image={cp.hero.image}
        stats={cp.hero.stats}
        crumbs={[{ label: 'Home', to: '/' }, { label: 'Commercial' }]}
      />

      <Section tone="light">
        <SectionHeader eyebrow={cp.intro.eyebrow} title={cp.intro.title} text={cp.intro.text} />
        <FeatureGrid items={cp.capabilities} cols={3} />
      </Section>

      <Section tone="forest" id="projects">
        <SectionHeader eyebrow={cp.grid.eyebrow} title={cp.grid.title} text={cp.grid.text} />
        <ProjectGrid projects={list} feature={false} />
      </Section>

      <Section tone="sand">
        <div className="wk-split wk-split--media">
          <div className="wk-prose" data-reveal>
            <Eyebrow>{cp.spotlight.eyebrow}</Eyebrow>
            <h2 className="wk-h2">{cp.spotlight.title}</h2>
            <p>{cp.spotlight.text}</p>
            <ul className="wk-checks">
              {wendys.highlights.map((h) => (
                <li key={h}>{h}</li>
              ))}
            </ul>
            <Button to={cp.spotlight.link.to} variant="green">{cp.spotlight.link.label}</Button>
          </div>
          <div className="wk-mosaic" data-reveal>
            {mosaic.map((m) => (
              <img key={m.src} src={m.src} alt={m.alt} loading="lazy" />
            ))}
          </div>
        </div>
      </Section>

      <Section tone="light">
        <div className="wk-feature" data-reveal>
          <div className="wk-feature__media">
            <img src={colonial.plans?.[0]?.image ?? colonial.cover} alt="Colonial Square plat showing the remaining lots" loading="lazy" />
          </div>
          <div className="wk-feature__panel">
            <Eyebrow>{cp.land.eyebrow}</Eyebrow>
            <h2 className="wk-feature__title">{cp.land.title}</h2>
            <p>{cp.land.text}</p>
            <dl className="wk-feature__facts">
              {colonial.facts.slice(0, 3).map((f) => (
                <div key={f.label}>
                  <dt>{f.label}</dt>
                  <dd>{f.value}</dd>
                </div>
              ))}
            </dl>
            <Button to={cp.land.link.to} variant="gold">{cp.land.link.label}</Button>
          </div>
        </div>
      </Section>

      <CtaBand />
    </>
  );
}
