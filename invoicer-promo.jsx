/* Invoicee — Promo / marketing site */
const { useState, useEffect, useRef } = React;

/* ─── Accent presets (hover / on-dark / light / ring per brand color) ─── */
const ACCENTS = {
  '#1A7F4B': { hover: '#167A44', onDark: '#3DDC6E', light: '#E8F5ED', ring: 'rgba(26,127,75,0.12)' },
  '#0066CC': { hover: '#0055AA', onDark: '#2997FF', light: '#E5F0FF', ring: 'rgba(0,102,204,0.12)' },
  '#C27D2E': { hover: '#A86A25', onDark: '#F0A848', light: '#FFF3E0', ring: 'rgba(194,125,46,0.12)' }
};
function applyAccent(hex) {
  const a = ACCENTS[hex] || ACCENTS['#1A7F4B'];
  const r = document.documentElement.style;
  r.setProperty('--primary', hex);
  r.setProperty('--primary-hover', a.hover);
  r.setProperty('--primary-on-dark', a.onDark);
  r.setProperty('--primary-light', a.light);
  r.setProperty('--primary-15', a.ring);
}

const PLATFORMS = {
  windows: { label: 'Windows', cta: 'Stáhnout pro Windows', meta: 'Windows 10 / 11 · 12 MB' },
  macos: { label: 'macOS', cta: 'Stáhnout pro macOS', meta: 'macOS 12+ · 14 MB' }
};

const LOGO = 'assets/invoicer-logo.png';

/* ─── Intersection observer hook ─── */
function useInView(threshold = 0.18) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {if (e.isIntersecting) setInView(true);}, { threshold });
    obs.observe(el);
    // Fallback: reveal anyway if the observer never fires (e.g. hidden tab).
    const t = setTimeout(() => setInView(true), 1400);
    return () => {obs.disconnect();clearTimeout(t);};
  }, []);
  return [ref, inView];
}

/* ─── Brand lockup ─── */
function Brand({ size = 28, color = 'var(--ink)' }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
      <img src={LOGO} alt="Invoicee" width={size} height={size}
      style={{ borderRadius: size * 0.26, display: 'block' }} />
      <span style={{ fontSize: size * 0.64, fontWeight: 600, color, letterSpacing: '-0.4px' }}>Invoicee</span>
    </div>);

}

/* ─── Windows-style window controls ─── */
function WinControls() {
  const ico = { width: 11, height: 11, color: 'var(--ink-muted)' };
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 18, color: 'var(--ink-muted)' }}>
      <svg {...ico} viewBox="0 0 12 12"><line x1="2" y1="6" x2="10" y2="6" stroke="currentColor" strokeWidth="1.2" /></svg>
      <svg {...ico} viewBox="0 0 12 12"><rect x="2.5" y="2.5" width="7" height="7" rx="1" fill="none" stroke="currentColor" strokeWidth="1.2" /></svg>
      <svg {...ico} viewBox="0 0 12 12"><line x1="3" y1="3" x2="9" y2="9" stroke="currentColor" strokeWidth="1.2" /><line x1="9" y1="3" x2="3" y2="9" stroke="currentColor" strokeWidth="1.2" /></svg>
    </div>);

}

/* ─── macOS-style traffic lights ─── */
function MacControls() {
  const dot = (bg) => ({
    width: 12, height: 12, borderRadius: '50%', background: bg,
    boxShadow: 'inset 0 0 0 0.5px rgba(0,0,0,0.20), inset 0 1px 0 rgba(255,255,255,0.28)',
  });
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      <span style={dot('#FF5F57')}></span>
      <span style={dot('#FEBC2E')}></span>
      <span style={dot('#28C840')}></span>
    </div>);

}

/* ─── Detect the visitor's OS so the product shot matches their machine ─── */
function detectOS() {
  try {
    const uaPlat = navigator.userAgentData && navigator.userAgentData.platform || '';
    const s = (uaPlat + ' ' + (navigator.platform || '') + ' ' + (navigator.userAgent || '')).toLowerCase();
    if (/mac|iphone|ipad|ipod/.test(s)) return 'macos';
    return 'windows';
  } catch {return 'windows';}
}

/* ─── Nav ─── */
function PromoNav({ onDownload, platform }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', h, { passive: true });
    return () => window.removeEventListener('scroll', h);
  }, []);
  const link = { fontSize: 14, color: 'var(--ink-muted)', fontWeight: 500, letterSpacing: '-0.2px' };
  return (
    <nav className="glass-nav" style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
      height: 56, display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '0 28px',
      background: scrolled ? 'var(--glass, var(--canvas))' : 'transparent',
      backdropFilter: scrolled ? 'saturate(200%) blur(20px)' : 'none',
      WebkitBackdropFilter: scrolled ? 'saturate(200%) blur(20px)' : 'none',
      boxShadow: scrolled ? 'inset 0 -1px 0 var(--glass-border, var(--divider-soft)), inset 0 1px 0 var(--glass-specular, transparent)' : 'none',
      transition: 'all 0.4s cubic-bezier(0.22,1,0.36,1)'
    }}>
      <Brand size={26} />
      <div style={{ display: 'flex', alignItems: 'center', gap: 26 }}>
        <a href="#features" className="nav-link" style={link}>Funkce</a>
        <a href="#how" className="nav-link" style={link}>Jak to funguje</a>
        <a href="#pricing" className="nav-link" style={link}>Ceník</a>
        <a href="#faq" className="nav-link" style={link}>FAQ</a>
        <LedgerButton variant="primary" className="sheen" size="small" onClick={onDownload} style={{ transition: 'box-shadow 0.5s var(--ease-lift), transform 0.2s ease' }}>
          {Icons.download(15, '#fff')} Stáhnout
        </LedgerButton>
      </div>
    </nav>);

}

/* ─── Hero ─── */
function Hero({ onDownload, platform }) {
  const p = PLATFORMS[platform] || PLATFORMS.windows;
  return (
    <section style={{
      minHeight: '100vh', display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      padding: '132px 28px 72px', textAlign: 'center',
      background: 'var(--canvas)'
    }}>
      <Reveal style={{ maxWidth: 760 }}>
        <h1 style={{
          fontSize: 'clamp(40px, 6vw, 68px)', fontWeight: 600,
          lineHeight: 1.04, letterSpacing: '-1.4px',
          margin: '0 auto 22px', fontFamily: "Helvetica", color: 'var(--ink)'
        }}>
          Profesionální faktury.<br />Přímo z&nbsp;vaší plochy.
        </h1>
        <p style={{
          fontSize: 'clamp(17px, 2vw, 21px)', color: 'var(--ink-muted)',
          lineHeight: 1.45, maxWidth: 540, margin: '0 auto 36px',
          fontWeight: 400, letterSpacing: '-0.2px'
        }}>
          Invoicee je nativní fakturační aplikace pro české OSVČ. Funguje offline,
          generuje QR&nbsp;platby a&nbsp;exportuje čisté PDF — vaše data zůstávají u&nbsp;vás.
        </p>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Magnetic>
            <LedgerButton variant="primary" className="sheen" onClick={onDownload} style={{ padding: '13px 26px', fontSize: 17, transition: 'box-shadow 0.5s var(--ease-lift), transform 0.2s ease' }}>
              {Icons.download(18, '#fff')} {p.cta}
            </LedgerButton>
          </Magnetic>
          <Magnetic>
            <a href="Editor.html" style={{ textDecoration: 'none' }}>
              <LedgerButton variant="secondary" style={{ padding: '12px 25px', fontSize: 17 }}>
                Vyzkoušet v prohlížeči
              </LedgerButton>
            </a>
          </Magnetic>
        </div>
        <div style={{ marginTop: 18, fontSize: 13, color: 'var(--ink-muted-48)', letterSpacing: '-0.1px' }}>
          {p.meta} · Zdarma · Bez registrace
        </div>
      </Reveal>

      {/* Desktop app window mockup */}
      <Reveal delay={0.18} style={{ marginTop: 60, maxWidth: 940, width: '100%' }}>
        <TiltCard max={6} parallax={0.05}>
          <AppWindow platform={platform} />
        </TiltCard>
      </Reveal>
    </section>);

}

/* ─── App window mock (the product shot) ─── */
function AppWindow({ platform = 'windows' }) {
  const isMac = true; // always show the macOS window regardless of download platform
  const field = (l, v, primary) => (
  <div style={{ marginBottom: 12 }}>
      <div style={{ fontSize: 9, color: 'var(--ink-muted-48)', marginBottom: 5, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.7px' }}>{l}</div>
      <div style={{
      height: 32, borderRadius: 8, background: 'color-mix(in srgb, var(--ink) 5%, transparent)',
      boxShadow: 'inset 0 1.5px 3px rgba(0,0,0,0.10), inset 0 0 0 0.5px color-mix(in srgb, var(--ink) 7%, transparent), inset 0 1px 0 rgba(255,255,255,0.05)',
      display: 'flex', alignItems: 'center',
      padding: '0 12px', fontSize: 12, color: primary ? 'var(--ink)' : 'var(--ink-muted)'
    }}>{v}</div>
    </div>
  );

  const toolCircle = {
    width: 30, height: 30, borderRadius: '50%', flexShrink: 0,
    background: 'color-mix(in srgb, var(--canvas) 40%, transparent)',
    backdropFilter: 'blur(16px) saturate(190%)', WebkitBackdropFilter: 'blur(16px) saturate(190%)',
    border: '0.5px solid color-mix(in srgb, var(--ink) 14%, transparent)',
    boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.6), inset 0 -1px 1px rgba(0,0,0,0.04), 0 2px 7px rgba(0,0,0,0.13), 0 1px 2px rgba(0,0,0,0.08)',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    color: 'color-mix(in srgb, var(--ink) 78%, transparent)', cursor: 'pointer'
  };
  const tool = (glyph, key) => (
    <span key={key} className="gg-tool" style={toolCircle}>
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">{glyph}</svg>
    </span>
  );

  return (
    <div style={{
      position: 'relative', borderRadius: 18, overflow: 'hidden', isolation: 'isolate',
      boxShadow: '0 60px 120px -40px rgba(0,0,0,0.46), 0 20px 48px -24px rgba(0,0,0,0.28), 0 0 0 0.5px rgba(0,0,0,0.14), inset 0 1px 0 rgba(255,255,255,0.4)',
      background: 'color-mix(in srgb, var(--canvas) 72%, transparent)',
      backdropFilter: 'blur(40px) saturate(150%)', WebkitBackdropFilter: 'blur(40px) saturate(150%)'
    }}>
      {/* Ambient liquid-glass light field — warm golds → cool indigo for the glass to refract */}
      <div aria-hidden style={{
        position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none',
        background:
          'radial-gradient(62% 72% at 84% 10%, rgba(255,196,120,0.22), transparent 60%),' +
          'radial-gradient(58% 66% at 98% 86%, rgba(255,150,92,0.18), transparent 62%),' +
          'radial-gradient(46% 56% at 28% -4%, rgba(120,220,160,0.10), transparent 60%)'
      }}></div>
      {/* Title bar */}
      {isMac ? (
      <div style={{
        position: 'relative', zIndex: 1,
        height: 50, display: 'grid', gridTemplateColumns: '1fr 1fr', alignItems: 'center',
        background: 'transparent'
      }}>
          {/* Left cell — sidebar glass: traffic lights pinned left, document title centered */}
          <div style={{
            position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', padding: '0 16px',
            background: 'color-mix(in srgb, var(--canvas) 42%, transparent)',
            backdropFilter: 'blur(30px) saturate(180%)', WebkitBackdropFilter: 'blur(30px) saturate(180%)',
            borderRight: '1px solid color-mix(in srgb, var(--ink) 7%, transparent)'
          }}>
            <div style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)' }}><MacControls /></div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
              <img src={LOGO} alt="" width={15} height={15} style={{ borderRadius: 4, display: 'block' }} />
              <span style={{ fontSize: 12.5, fontWeight: 600, color: 'var(--ink)', letterSpacing: '-0.2px' }}>Invoicee — FV2025001.pdf</span>
            </div>
          </div>
          {/* Right cell — spacer */}
          <div></div>
        </div>
      ) : (
      <div style={{
        height: 44, background: 'var(--canvas)', display: 'flex', alignItems: 'center',
        justifyContent: 'space-between', padding: '0 16px',
        borderBottom: '1px solid var(--divider-soft)'
      }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <img src={LOGO} alt="" width={18} height={18} style={{ borderRadius: 5, display: 'block' }} />
            <span style={{ fontSize: 12.5, color: 'var(--ink-muted)', letterSpacing: '-0.2px' }}>Invoicee — FV2025001.pdf</span>
          </div>
          <WinControls />
        </div>
      )}
      {/* Body */}
      <div style={{ position: 'relative', zIndex: 1, display: 'grid', gridTemplateColumns: '1fr 1fr', height: 392 }}>
        {/* Editor — frosted acrylic sidebar */}
        <div style={{
          padding: '20px 22px', textAlign: 'left',
          background: 'color-mix(in srgb, var(--canvas) 42%, transparent)',
          backdropFilter: 'blur(30px) saturate(180%)', WebkitBackdropFilter: 'blur(30px) saturate(180%)',
          borderRight: '1px solid color-mix(in srgb, var(--ink) 7%, transparent)',
          boxShadow: 'inset 1px 0 0 rgba(255,255,255,0.12)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 18 }}>
            <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--ink)' }}>Editor faktury</span>
            <span style={{ fontSize: 11, fontWeight: 600, color: 'var(--primary)', background: 'var(--primary-light)', padding: '3px 9px', borderRadius: 'var(--radius-pill)' }}>Návrh</span>
          </div>
          {field('Číslo faktury', 'FV2025001', true)}
          {field('Datum vystavení', '15. 05. 2025')}
          {field('Odběratel', 'Firma ABC s.r.o.')}
          <div style={{ fontSize: 9, color: 'var(--ink-muted-48)', margin: '6px 0 7px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.7px' }}>Položky</div>
          {[['Webový design — homepage', '25 000'], ['Grafický návrh loga', '8 000']].map(([t, v]) =>
          <div key={t} style={{
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            padding: '8px 11px', borderRadius: 8, background: 'color-mix(in srgb, var(--canvas) 55%, transparent)',
            border: '1px solid color-mix(in srgb, var(--ink) 6%, transparent)', boxShadow: '0 1px 2px rgba(0,0,0,0.04)', marginBottom: 6, fontSize: 11.5
          }}>
              <span style={{ color: 'var(--ink)' }}>{t}</span>
              <span style={{ color: 'var(--ink-muted)' }}>{v} Kč</span>
            </div>
          )}
          <div className="gg-add" style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, marginTop: 2,
            padding: '8px', borderRadius: 9, border: '1px dashed color-mix(in srgb, var(--primary) 55%, transparent)',
            background: 'color-mix(in srgb, var(--primary) 7%, transparent)',
            color: 'var(--primary)', fontSize: 11.5, fontWeight: 600, cursor: 'pointer',
            transition: 'background .25s ease, box-shadow .25s ease, border-color .25s ease'
          }}>{Icons.plus(13, 'var(--primary)')} Přidat položku</div>
        </div>
        {/* A4 preview */}
        <div style={{ padding: '30px 26px', background: 'transparent', display: 'flex', justifyContent: 'center', alignItems: 'flex-start' }}>
          <div style={{
            width: '80%', aspectRatio: '210/297', background: '#fff',
            borderRadius: 6, border: '1px solid rgba(0,0,0,0.04)', padding: 18, position: 'relative', textAlign: 'left',
            boxShadow: '0 2px 4px rgba(0,0,0,0.06), 0 10px 24px -6px rgba(0,0,0,0.14), 0 30px 60px -16px rgba(0,0,0,0.22), 0 0 0 0.5px rgba(0,0,0,0.03)'
          }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--primary)', letterSpacing: '-0.3px' }}>FAKTURA</div>
            <div style={{ fontSize: 8, color: '#1d1d1f', marginBottom: 6 }}>FV2025001</div>
            <div style={{ height: 2, background: 'var(--primary)', margin: '6px 0 10px', width: 32 }}></div>
            <div style={{ display: 'flex', gap: 14, marginBottom: 12 }}>
              {[['Dodavatel', 'Jan Novák', 'IČO: 12345678'], ['Odběratel', 'Firma ABC s.r.o.', 'IČO: 87654321']].map(([h, a, b]) =>
              <div key={h} style={{ flex: 1 }}>
                  <div style={{ fontSize: 6, color: '#86868b', fontWeight: 600, marginBottom: 3, textTransform: 'uppercase', letterSpacing: '0.3px' }}>{h}</div>
                  <div style={{ fontSize: 7.5, color: '#1d1d1f', lineHeight: 1.5 }}>{a}<br />{b}</div>
                </div>
              )}
            </div>
            <div style={{ background: '#f5f5f7', borderRadius: 4, padding: '6px 8px', marginBottom: 10 }}>
              {[['Webový design', '25 000'], ['Návrh loga', '8 000'], ['SEO optimalizace', '7 500']].map(([n, v]) =>
              <div key={n} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 6.5, color: '#1d1d1f', padding: '2.5px 0' }}>
                  <span>{n}</span><span>{v} Kč</span>
                </div>
              )}
            </div>
            <div style={{ position: 'absolute', bottom: 14, right: 14 }}>
              <QRCode data="SPD*1.0*ACC:CZ65*AM:40500" size={34} />
            </div>
            <div style={{ position: 'absolute', bottom: 16, left: 18, fontSize: 8.5, fontWeight: 700, color: '#1d1d1f' }}>
              Celkem: <span style={{ color: 'var(--primary)' }}>40 500 Kč</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

}

Object.assign(window, { useInView, Brand, PromoNav, Hero, AppWindow, applyAccent, ACCENTS, PLATFORMS, LOGO, detectOS, MacControls, WinControls });
