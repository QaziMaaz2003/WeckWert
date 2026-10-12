import { capabilities, home } from '../content/site';
import { featuredProjects } from '../content/projects';
import { Section } from '../components/elementor/Section';
import { SectionHeader } from '../components/widgets/Heading';
import { FeatureGrid } from '../components/widgets/FeatureGrid';
import { Button } from '../components/widgets/Button';
import { HomeHero } from '../sections/Heroes';
import { CtaBand, FaqBlock, Marquee, StatsStrip } from '../sections/Blocks';
import { ProjectGrid } from '../sections/Projects';
import { ProcessTabs } from '../sections/ProcessTabs';
import { ProjectBrief } from '../sections/ProjectBrief';
import { Leadership } from '../sections/Team';
import { Regions } from '../sections/Regions';
import { usePageTitle } from '../hooks/usePageTitle';

export default function Home() {
  usePageTitle();
  return (
    <>
      <HomeHero />
      <StatsStrip />

      <Section tone="light" id="capabilities">
        <SectionHeader eyebrow={home.capabilities.eyebrow} title={home.capabilities.title} text={home.capabilities.text} />
        <FeatureGrid items={capabilities} cols={3} />
      </Section>

      <Section tone="forest" id="work">
        <SectionHeader eyebrow={home.work.eyebrow} title={home.work.title} text={home.work.text} />
        <ProjectGrid projects={featuredProjects()} filter limit={8} />
        <div className="wk-work__links" data-reveal>
          <Button to="/residential" variant="ghost">All residential projects</Button>
          <Button to="/commercial" variant="ghost">All commercial projects</Button>
        </div>
      </Section>

      <Section tone="sand" id="process">
        <SectionHeader eyebrow={home.process.eyebrow} title={home.process.title} text={home.process.text} />
        <ProcessTabs />
      </Section>

      <Marquee />

      <Section tone="light" id="start">
        <ProjectBrief />
      </Section>

      <Leadership />
      <Regions />
      <FaqBlock tone="light" />
      <CtaBand />
    </>
  );
}
