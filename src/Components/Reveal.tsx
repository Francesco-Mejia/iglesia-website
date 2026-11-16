import React, { useEffect, useRef } from 'react';

type RevealProps = {
  id?: string;
  className?: string;
  immediate?: boolean;
  children: React.ReactNode;
};

export function Reveal({ id, className = '', immediate = false, children }: RevealProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const show = () => {
      el.classList.remove('is-hiding');
      el.classList.remove('is-shown');
      void el.offsetHeight;
      el.classList.add('is-shown');
    };

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (immediate || reduce) {
      show();
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          show();
          observer.disconnect();
        }
      },
      { threshold: 0.22 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [immediate]);

  return (
    <section id={id} ref={ref} className={`chapter t-stagger ${className}`.trim()}>
      {children}
    </section>
  );
}
