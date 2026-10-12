import { Outlet, Route, Routes } from 'react-router-dom';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { ScrollManager } from './components/layout/ScrollManager';
import { useReveal } from './hooks/useReveal';
import Home from './pages/Home';
import Residential from './pages/Residential';
import Commercial from './pages/Commercial';
import ProjectDetail from './pages/ProjectDetail';
import About from './pages/About';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';

// URL structure mirrors the planned WordPress permalinks (see docs/ELEMENTOR-MAPPING.md).
function Layout() {
  useReveal();
  return (
    <>
      <a className="wk-skip" href="#main">
        Skip to content
      </a>
      <ScrollManager />
      <Header />
      <main id="main">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="residential" element={<Residential />} />
        <Route path="commercial" element={<Commercial />} />
        <Route path="projects/:slug" element={<ProjectDetail />} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
