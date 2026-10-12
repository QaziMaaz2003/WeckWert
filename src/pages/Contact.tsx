import { brand, contactPage as cp } from '../content/site';
import { Section } from '../components/elementor/Section';
import { Eyebrow, SectionHeader } from '../components/widgets/Heading';
import { FeatureGrid } from '../components/widgets/FeatureGrid';
import { Button } from '../components/widgets/Button';
import { Icon } from '../components/ui/Icon';
import { PageHero } from '../sections/Heroes';
import { FaqBlock } from '../sections/Blocks';
import { ProjectBrief } from '../sections/ProjectBrief';
import { usePageTitle } from '../hooks/usePageTitle';

export default function Contact() {
  usePageTitle('Contact', cp.hero.text);
  return (
    <>
      <PageHero
        eyebrow={cp.hero.eyebrow}
        title={cp.hero.title}
        text={cp.hero.text}
        image={cp.hero.image}
        crumbs={[{ label: 'Home', to: '/' }, { label: 'Contact' }]}
      >
        <div className="wk-quick">
          <a className="wk-quick__item" href={brand.phoneHref}>
            <Icon name="phone" size={20} />
            <span>
              <small>Call</small>
              {brand.phone}
            </span>
          </a>
          <a className="wk-quick__item" href={brand.mapsUrl} target="_blank" rel="noopener noreferrer">
            <Icon name="map-pin" size={20} />
            <span>
              <small>Visit</small>
              {brand.address.join(', ')}
            </span>
          </a>
        </div>
      </PageHero>

      <Section tone="light">
        <ProjectBrief id="project-brief" />
      </Section>

      <Section tone="sand">
        <SectionHeader eyebrow={cp.steps.eyebrow} title={cp.steps.title} />
        <FeatureGrid items={cp.steps.items} cols={3} />
      </Section>

      <Section tone="light" id="visit">
        <div className="wk-visit" data-reveal>
          <div className="wk-visit__info">
            <Eyebrow>Headquarters</Eyebrow>
            <h2 className="wk-h2">Visit us in Thomasville.</h2>
            <address className="wk-visit__address">
              {brand.address.map((l) => (
                <span key={l}>{l}</span>
              ))}
            </address>
            <ul className="wk-visit__list">
              <li>
                <Icon name="phone" size={18} />
                <a href={brand.phoneHref}>{brand.phone}</a>
              </li>
              <li>
                <Icon name="building" size={18} />
                <span>At The Woodlands of Thomas County</span>
              </li>
            </ul>
            <Button href={brand.mapsUrl} variant="green" newTab icon="external-link">
              Get directions
            </Button>
          </div>
          <div className="wk-visit__map">
            <iframe
              title="Map showing 313 Hickory Ridge East, Thomasville, Georgia"
              src={brand.mapsEmbed}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </Section>

      <FaqBlock tone="sand" />
    </>
  );
}
