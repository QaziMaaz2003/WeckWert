import { useEffect, useState } from 'react';
import { useInView } from '../../hooks/useInView';

interface Props {
  value: number;
  suffix?: string;
  plain?: boolean;
  duration?: number;
}

/** Elementor Counter widget (starting number 0, duration 1600ms). */
export function Counter({ value, suffix = '', plain, duration = 1600 }: Props) {
  const { ref, inView } = useInView<HTMLSpanElement>();
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setN(value);
      return;
    }
    let raf = 0;
    const start = performance.now();
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setN(Math.round(value * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value, duration]);

  const shown = plain ? String(n) : n.toLocaleString('en-US');
  return (
    <span ref={ref} className="wk-counter" data-widget="counter" aria-label={`${plain ? value : value.toLocaleString('en-US')}${suffix}`}>
      <span aria-hidden="true">
        {shown}
        {suffix && <span className="wk-counter__suffix">{suffix}</span>}
      </span>
    </span>
  );
}
