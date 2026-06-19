/* Invoicer — motion primitives: scroll reveals, 3D tilt, parallax,
   magnetic CTAs, count-up, scroll-progress. All GPU-friendly + reduced-motion safe. */
const { useState: useMo, useEffect: useMoE, useRef: useMoR } = React;

const REDUCED = typeof window !== 'undefined' &&
  window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const lerp = (a, b, t) => a + (b - a) * t;
const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v));

/* ─── Scroll-reveal hook: returns [ref, inView] and stays in view once shown ─── */
function useReveal(opts = {}) {
  const { threshold = 0.16, rootMargin = '0px 0px -8% 0px', once = true } = opts;
  const ref = useMoR(null);
  const [inView, setInView] = useMo(false);
  useMoE(() => {
    const el = ref.current;
    if (!el || REDUCED) { setInView(true); return; }
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setInView(true); if (once) obs.disconnect(); }
      else if (!once) setInView(false);
    }, { threshold, rootMargin });
    obs.observe(el);
    const t = setTimeout(() => setInView(true), 1600); // safety
    return () => { obs.disconnect(); clearTimeout(t); };
  }, []);
  return [ref, inView];
}

/* ─── Reveal wrapper: fades + rises + de-blurs into place, with stagger delay ─── */
function Reveal({ children, delay = 0, as = 'div', className = '', style, ...rest }) {
  const [ref, inView] = useReveal();
  const [done, setDone] = useMo(false);
  useMoE(() => {
    if (!inView) return;
    const ms = delay * 1000 + 1150;
    const t = setTimeout(() => setDone(true), ms);
    return () => clearTimeout(t);
  }, [inView]);
  const Tag = as;
  return (
    <Tag ref={ref}
      className={'rv' + (inView ? ' in' : '') + (done ? ' done' : '') + (className ? ' ' + className : '')}
      style={{ '--rv-delay': delay + 's', ...style }} {...rest}>
      {children}
    </Tag>
  );
}

/* ─── 3D tilt + scroll parallax for the hero product shot ─── */
function TiltCard({ children, max = 7, parallax = 0, style }) {
  const wrapRef = useMoR(null);
  const innerRef = useMoR(null);
  const state = useMoR({ rx: 0, ry: 0, trx: 0, try: 0, py: 0, tpy: 0, hover: 0, thover: 0, raf: 0 });

  useMoE(() => {
    return; // cursor tilt + parallax disabled — product shot sits still
    /* eslint-disable no-unreachable */
    const s = state.current;
    const inner = innerRef.current;

    const onScroll = () => {
      const el = wrapRef.current; if (!el) return;
      const r = el.getBoundingClientRect();
      const center = r.top + r.height / 2 - window.innerHeight / 2;
      s.tpy = clamp(-center * parallax, -80, 80);
      kick();
    };
    const onMove = (e) => {
      const el = wrapRef.current; if (!el) return;
      const r = el.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      s.try = clamp(px * max * 2, -max, max);
      s.trx = clamp(-py * max * 2, -max, max);
      s.thover = 1;
      kick();
    };
    const onLeave = () => { s.try = 0; s.trx = 0; s.thover = 0; kick(); };

    const tick = () => {
      s.rx = lerp(s.rx, s.trx, 0.09); s.ry = lerp(s.ry, s.try, 0.09);
      s.py = lerp(s.py, s.tpy, 0.12); s.hover = lerp(s.hover, s.thover, 0.1);
      const sc = 1 + s.hover * 0.012;
      if (inner) inner.style.transform =
        `perspective(1400px) translateY(${s.py.toFixed(2)}px) rotateX(${s.rx.toFixed(2)}deg) rotateY(${s.ry.toFixed(2)}deg) scale(${sc.toFixed(4)})`;
      const moving = Math.abs(s.rx - s.trx) + Math.abs(s.ry - s.try) + Math.abs(s.py - s.tpy) + Math.abs(s.hover - s.thover);
      if (moving > 0.01) s.raf = requestAnimationFrame(tick); else s.raf = 0;
    };
    const kick = () => { if (!s.raf) s.raf = requestAnimationFrame(tick); };

    const el = wrapRef.current;
    el.addEventListener('mousemove', onMove);
    el.addEventListener('mouseleave', onLeave);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => {
      el.removeEventListener('mousemove', onMove);
      el.removeEventListener('mouseleave', onLeave);
      window.removeEventListener('scroll', onScroll);
      if (s.raf) cancelAnimationFrame(s.raf);
    };
  }, []);

  return (
    <div ref={wrapRef} style={{ ...style, perspective: 1400 }}>
      <div ref={innerRef} style={{ transformStyle: 'preserve-3d', willChange: 'transform' }}>
        {children}
      </div>
    </div>
  );
}

/* ─── Magnetic + lifting CTA wrapper (wrap a LedgerButton or link) ─── */
function Magnetic({ children, strength = 0.32, style }) {
  const ref = useMoR(null);
  const s = useMoR({ x: 0, y: 0, tx: 0, ty: 0, raf: 0 });
  useMoE(() => {
    return; // magnetic cursor-pull disabled
    /* eslint-disable no-unreachable */
    const el = ref.current; const st = s.current;
    const tick = () => {
      st.x = lerp(st.x, st.tx, 0.18); st.y = lerp(st.y, st.ty, 0.18);
      el.style.transform = `translate(${st.x.toFixed(2)}px, ${st.y.toFixed(2)}px)`;
      if (Math.abs(st.x - st.tx) + Math.abs(st.y - st.ty) > 0.05) st.raf = requestAnimationFrame(tick);
      else st.raf = 0;
    };
    const kick = () => { if (!st.raf) st.raf = requestAnimationFrame(tick); };
    const onMove = (e) => {
      const r = el.getBoundingClientRect();
      st.tx = (e.clientX - (r.left + r.width / 2)) * strength;
      st.ty = (e.clientY - (r.top + r.height / 2)) * strength;
      kick();
    };
    const onLeave = () => { st.tx = 0; st.ty = 0; kick(); };
    el.addEventListener('mousemove', onMove);
    el.addEventListener('mouseleave', onLeave);
    return () => { el.removeEventListener('mousemove', onMove); el.removeEventListener('mouseleave', onLeave); if (st.raf) cancelAnimationFrame(st.raf); };
  }, []);
  return <span ref={ref} style={{ display: 'inline-flex', willChange: 'transform', ...style }}>{children}</span>;
}

/* ─── Count-up number that animates when scrolled into view ─── */
/* Driven by setTimeout (not rAF) so it still reaches its target even when the
   tab/iframe throttles animation frames — falls back gracefully to the value. */
function CountUp({ to, duration = 1600, format = (n) => Math.round(n).toLocaleString('cs-CZ'), style }) {
  const [ref, inView] = useReveal({ threshold: 0.35 });
  const [val, setVal] = useMo(0);
  useMoE(() => {
    if (!inView) return;
    if (REDUCED) { setVal(to); return; }
    const steps = 48, interval = duration / steps;
    let i = 0, timer;
    const tick = () => {
      i++;
      const p = Math.min(i / steps, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(to * eased);
      if (p < 1) timer = setTimeout(tick, interval);
    };
    timer = setTimeout(tick, interval);
    return () => clearTimeout(timer);
  }, [inView]);
  return <span ref={ref} style={style}>{format(val)}</span>;
}

/* ─── Top scroll-progress bar ─── */
function ScrollProgress() {
  const ref = useMoR(null);
  useMoE(() => {
    const bar = ref.current; let raf = 0;
    const update = () => {
      raf = 0;
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      const p = max > 0 ? clamp(h.scrollTop / max, 0, 1) : 0;
      bar.style.transform = `scaleX(${p})`;
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    window.addEventListener('scroll', onScroll, { passive: true });
    update();
    return () => { window.removeEventListener('scroll', onScroll); if (raf) cancelAnimationFrame(raf); };
  }, []);
  return <div id="scroll-progress" ref={ref}></div>;
}

Object.assign(window, { useReveal, Reveal, TiltCard, Magnetic, CountUp, ScrollProgress });
