import { Button } from '../components/widgets/Button';
import { Eyebrow } from '../components/widgets/Heading';
import { usePageTitle } from '../hooks/usePageTitle';

/** Elementor Pro Theme Builder → Single → 404 Page. */
export default function NotFound() {
  usePageTitle('Page not found');
  return (
    <section className="wk-404" data-el="container">
      <div className="wk-container wk-404__inner">
        <img src="/brand/mark-light.png" alt="" className="wk-404__mark" width={120} height={114} />
        <Eyebrow line>Error 404</Eyebrow>
        <h1 className="wk-404__title">This page isn’t on the plans.</h1>
        <p className="wk-404__text">The page you’re looking for may have moved. Try one of these instead.</p>
        <div className="wk-404__actions">
          <Button to="/" variant="gold">Back to home</Button>
          <Button to="/residential" variant="ghost" icon={null}>Residential</Button>
          <Button to="/commercial" variant="ghost" icon={null}>Commercial</Button>
        </div>
      </div>
    </section>
  );
}
