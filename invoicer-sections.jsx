/* Invoicer — Promo sections (features → footer) + App shell */
const { useState: useS2, useEffect: useE2, useRef: useR2 } = React;

/* ─── Features ─── */
function Features() {
  const mk = (paths) => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">{paths}</svg>
  );
  const W = 'rgba(255,255,255,0.78)';

  /* Base card — icon + text top-aligned, close together */
  const base = (extra = {}) => ({
    padding: '26px', borderRadius: 'var(--radius-lg)', height: '100%',
    background: 'var(--surface-tile-2)', border: '1px solid rgba(255,255,255,0.06)',
    display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', gap: 0,
    ...extra
  });

  /* Wide card inner layout — icon left, text right */
  const wideCard = (ic, t, d, bExtra = {}) => (
    <div style={{ ...base({ flexDirection: 'row', alignItems: 'flex-start', gap: 20, ...bExtra }) }}>
      <div style={{ flexShrink: 0, marginTop: 3 }}>{ic}</div>
      <div>
        <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 7, letterSpacing: '-0.3px', lineHeight: 1.2 }}>{t}</h3>
        <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.44)', lineHeight: 1.6, letterSpacing: '-0.1px' }}>{d}</p>
      </div>
    </div>
  );

  /* Small card inner layout — icon top, text below */
  const smallCard = (ic, t, d) => (
    <div style={base()}>
      <div>{ic}</div>
      <h3 style={{ fontSize: 14.5, fontWeight: 600, marginTop: 14, marginBottom: 5, letterSpacing: '-0.2px', lineHeight: 1.2 }}>{t}</h3>
      <p style={{ fontSize: 12.5, color: 'rgba(255,255,255,0.42)', lineHeight: 1.55 }}>{d}</p>
    </div>
  );

  return (
    <section id="features" className="glass-sec" style={{ background: 'var(--surface-tile-1)', color: 'var(--ink-on-dark)', padding: '80px 28px' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <Reveal style={{ textAlign: 'center', marginBottom: 48 }}>
          <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--primary-on-dark)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: 12 }}>Funkce</div>
          <h2 style={{ fontSize: 'clamp(28px, 4vw, 40px)', fontWeight: 600, lineHeight: 1.08, letterSpacing: '-0.6px', marginBottom: 12 }}>
            Vše, co OSVČ potřebuje.
          </h2>
          <p style={{ fontSize: 17, color: 'rgba(255,255,255,0.50)', maxWidth: 420, margin: '0 auto', letterSpacing: '-0.2px' }}>
            Žádné zbytečné funkce. Jen to, co denně používáte.
          </p>
        </Reveal>

        {/*
          Diagonal wide-card bento — 4 cols × 3 rows, 2-col wide card shifts right each row:
          Row 1: [Offline wide col1-2] [QR small col3] [ARES small col4]
          Row 2: [Databáze small col1] [Editor wide col2-3] [DPH small col4]
          Row 3: [Export small col1] [Připomínky small col2] [Sync wide col3-4]
        */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gridTemplateRows: 'repeat(3, 186px)',
          gap: 12
        }}>

          {/* Row 1 */}
          <Reveal delay={0.04} style={{ gridColumn: '1 / 3' }}>
            {wideCard(Icons.shield(22, 'rgba(255,255,255,0.92)'),
              'Funguje offline',
              'Nativní desktopová aplikace. Žádné připojení, žádné čekání, žádný cizí server.',
              { border: '1px solid rgba(255,255,255,0.10)' })}
          </Reveal>
          <Reveal delay={0.06} style={{ gridColumn: '3' }}>
            {smallCard(Icons.qr(20, 'rgba(255,255,255,0.88)'), 'QR platba', 'SPD kód generovaný automaticky — klient zaplatí na jedno cvaknutí.')}
          </Reveal>
          <Reveal delay={0.08} style={{ gridColumn: '4' }}>
            {smallCard(mk(<><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></>), 'ARES auto-fill', 'IČO → firma vyplněna z veřejného rejstříku.')}
          </Reveal>

          {/* Row 2 */}
          <Reveal delay={0.10} style={{ gridColumn: '1' }}>
            {smallCard(Icons.users(20, W), 'Databáze klientů', 'Odběratelé jedním kliknutím. Žádné přepisování IČO.')}
          </Reveal>
          <Reveal delay={0.12} style={{ gridColumn: '2 / 4' }}>
            {wideCard(Icons.document(22, W), 'Editor s živým náhledem', 'Formulář a A4 náhled vedle sebe. Vidíte přesně to, co vytisknete — žádná překvapení v PDF.')}
          </Reveal>
          <Reveal delay={0.14} style={{ gridColumn: '4' }}>
            {smallCard(mk(<><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/></>), 'Podpora DPH', 'Neplátce, účetnictví i plátce DPH.')}
          </Reveal>

          {/* Row 3 */}
          <Reveal delay={0.16} style={{ gridColumn: '1' }}>
            {smallCard(Icons.download(20, W), 'Export do PDF', 'Print-ready PDF jedním klikem. V Pro verzi bez vodoznaku.')}
          </Reveal>
          <Reveal delay={0.17} style={{ gridColumn: '2' }}>
            {smallCard(Icons.clock(20, W), 'Připomínky', 'Upozornění na faktury po splatnosti.')}
          </Reveal>
          <Reveal delay={0.18} style={{ gridColumn: '3 / 5' }}>
            {wideCard(mk(<><path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/></>), 'Synchronizace Pro', 'Faktury na každém Macu a iPhonu. Zabezpečená záloha v cloudu.')}
          </Reveal>

        </div>
      </div>
    </section>
  );
}
/* ─── How it works ─── */
function HowItWorks({ onDownload }) {
  const steps = [
    { num: '01', title: 'Stáhněte', desc: 'Nainstalujte Invoicer do svého počítače během pár vteřin. Žádná registrace.' },
    { num: '02', title: 'Vyplňte', desc: 'Zadejte dodavatele, odběratele a položky faktury. Náhled se aktualizuje živě.' },
    { num: '03', title: 'Exportujte', desc: 'Stáhněte PDF s QR kódem pro platbu — a pošlete klientovi. Hotovo.' },
  ];
  return (
    <section id="how" style={{ background: 'var(--canvas)', padding: '108px 28px' }}>
      <div style={{ maxWidth: 980, margin: '0 auto', textAlign: 'center' }}>
        <Reveal as="h2" style={{
          fontSize: 'clamp(30px, 4vw, 44px)', fontWeight: 600, lineHeight: 1.08,
          letterSpacing: '-0.6px', color: 'var(--ink)', marginBottom: 56,
        }}>
          Tři kroky. To je&nbsp;vše.
        </Reveal>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))', gap: 44, marginBottom: 52 }}>
          {steps.map((s, i) => (
            <Reveal key={s.num} delay={0.12 + i * 0.12} style={{ textAlign: 'left' }}>
              <div style={{ fontSize: 15, fontWeight: 600, color: 'var(--primary)', marginBottom: 14, letterSpacing: '0.5px' }}>{s.num}</div>
              <div style={{ height: 1, background: 'var(--divider-soft)', marginBottom: 18 }}></div>
              <h3 style={{ fontSize: 22, fontWeight: 600, marginBottom: 10, letterSpacing: '-0.4px', color: 'var(--ink)' }}>{s.title}</h3>
              <p style={{ fontSize: 16, color: 'var(--ink-muted)', lineHeight: 1.55, letterSpacing: '-0.2px' }}>{s.desc}</p>
            </Reveal>
          ))}
        </div>
        <Magnetic>
          <LedgerButton variant="primary" className="sheen" onClick={onDownload} style={{ padding: '13px 28px', transition: 'box-shadow 0.5s var(--ease-lift), transform 0.2s ease' }}>
            {Icons.download(18, '#fff')} Stáhnout zdarma
          </LedgerButton>
        </Magnetic>
      </div>
    </section>
  );
}

/* ─── Pricing ─── */
function Pricing({ onDownload }) {
  const [annual, setAnnual] = useS2(false);

  const monthlyPrice = 149;
  const annualPrice  = 119; // per month, billed annually
  const displayPrice = annual ? annualPrice : monthlyPrice;

  const allFeatures = [
    { label: 'Desktop i webová verze',          free: true,  pro: true  },
    { label: 'Neomezené faktury',                free: true,  pro: true  },
    { label: 'PDF export + QR platba',           free: true,  pro: true  },
    { label: 'IČO, DIČ, režimy DPH',            free: true,  pro: true  },
    { label: 'Lokální historie faktur',          free: true,  pro: true  },
    { label: 'Bez vodoznaku v PDF',              free: false, pro: true  },
    { label: 'Databáze klientů (auto-fill)',     free: false, pro: true  },
    { label: 'Synchronizace mezi zařízeními',    free: false, pro: true  },
    { label: 'Export do CSV',                    free: false, pro: true  },
    { label: 'Přednostní podpora',               free: false, pro: true  },
  ];

  /* SF-style check circle */
  const CheckCircle = ({ on, dark }) => on ? (
    <svg width="17" height="17" viewBox="0 0 17 17" fill="none" style={{ flexShrink: 0 }}>
      <circle cx="8.5" cy="8.5" r="8.5" fill={dark ? 'rgba(61,220,110,0.18)' : 'rgba(26,127,75,0.12)'} />
      <path d="M5 8.6L7.2 11L12 6" stroke={dark ? 'var(--primary-on-dark)' : 'var(--primary)'} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ) : (
    <svg width="17" height="17" viewBox="0 0 17 17" fill="none" style={{ flexShrink: 0 }}>
      <circle cx="8.5" cy="8.5" r="8.25" stroke={dark ? 'rgba(255,255,255,0.16)' : 'var(--divider-soft)'} strokeWidth="1" />
      <path d="M6 6l5 5M11 6l-5 5" stroke={dark ? 'rgba(255,255,255,0.22)' : 'var(--hairline)'} strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );

  const freeRow = (f) => (
    <li key={f.label} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '5px 0', fontSize: 14.5, color: f.free ? 'var(--ink)' : 'var(--ink-muted-48)', letterSpacing: '-0.2px' }}>
      <CheckCircle on={f.free} dark={false} />
      <span>{f.label}</span>
    </li>
  );

  const proRow = (f) => (
    <li key={f.label} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '5px 0', fontSize: 14.5, color: f.pro ? 'rgba(255,255,255,0.88)' : 'rgba(255,255,255,0.28)', letterSpacing: '-0.2px' }}>
      <CheckCircle on={f.pro} dark={true} />
      <span>{f.label}</span>
    </li>
  );

  return (
    <section id="pricing" style={{ background: 'var(--canvas)', padding: '108px 28px' }}>
      <div style={{ maxWidth: 820, margin: '0 auto', textAlign: 'center' }}>

        {/* ── Header ── */}
        <Reveal>
          <h2 style={{
            fontSize: 'clamp(32px, 4.5vw, 52px)',
            fontWeight: 700, lineHeight: 1.05, letterSpacing: '-1px',
            color: 'var(--ink)', marginBottom: 14,
          }}>
            Jednoduché ceny.
          </h2>
          <p style={{ fontSize: 19, color: 'var(--ink-muted)', letterSpacing: '-0.3px', marginBottom: 40, lineHeight: 1.45 }}>
            Začněte zdarma. Na Pro přejděte, až budete potřebovat&nbsp;víc.
          </p>

          {/* ── macOS segmented billing toggle ── */}
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 12, marginBottom: 56 }}>
            <div style={{
              display: 'inline-flex', padding: 3, gap: 0,
              background: 'rgba(0,0,0,0.065)', borderRadius: 11,
            }}>
              {[{ label: 'Měsíčně', value: false }, { label: 'Ročně', value: true }].map(opt => {
                const active = annual === opt.value;
                return (
                  <button key={opt.label} onClick={() => setAnnual(opt.value)} style={{
                    padding: '8px 22px', borderRadius: 8, border: 'none',
                    background: active ? 'white' : 'transparent',
                    color: active ? 'var(--ink)' : 'var(--ink-muted)',
                    fontSize: 14.5, fontWeight: active ? 600 : 400,
                    cursor: 'pointer', letterSpacing: '-0.2px',
                    transition: 'background 0.18s ease, color 0.18s ease, box-shadow 0.18s ease',
                    boxShadow: active ? '0 1px 4px rgba(0,0,0,0.13), 0 0 0 0.5px rgba(0,0,0,0.07)' : 'none',
                  }}>
                    {opt.label}
                  </button>
                );
              })}
            </div>
            <span style={{
              fontSize: 12, fontWeight: 700, padding: '4px 11px', borderRadius: 999,
              background: annual ? 'var(--primary-light)' : 'transparent',
              color: annual ? 'var(--primary)' : 'transparent',
              letterSpacing: '0.1px',
              transition: 'background 0.22s ease, color 0.22s ease',
              pointerEvents: 'none',
            }}>Ušetříte 20 %</span>
          </div>
        </Reveal>

        {/* ── Cards ── */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(310px, 1fr))', gap: 16, textAlign: 'left' }}>

          {/* Free */}
          <Reveal delay={0.1} style={{ display: 'flex' }}>
            <div style={{
              flex: 1, borderRadius: 22, padding: '34px 30px',
              background: 'var(--canvas-parchment)',
              border: '1px solid var(--divider-soft)',
              boxShadow: '0 2px 16px rgba(0,0,0,0.055), 0 1px 3px rgba(0,0,0,0.04)',
              display: 'flex', flexDirection: 'column',
              transition: 'transform 0.45s var(--ease-lift), box-shadow 0.45s var(--ease-lift)',
            }}
            onMouseEnter={e => { e.currentTarget.style.transform='translateY(-4px)'; e.currentTarget.style.boxShadow='0 12px 36px rgba(0,0,0,0.10), 0 3px 8px rgba(0,0,0,0.06)'; }}
            onMouseLeave={e => { e.currentTarget.style.transform=''; e.currentTarget.style.boxShadow='0 2px 16px rgba(0,0,0,0.055), 0 1px 3px rgba(0,0,0,0.04)'; }}>

              <div style={{ fontSize: 11.5, fontWeight: 700, letterSpacing: '0.9px', textTransform: 'uppercase', color: 'var(--ink-muted)', marginBottom: 20 }}>Free</div>

              <div style={{ display: 'flex', alignItems: 'baseline', gap: 3, marginBottom: 5 }}>
                <span style={{ fontSize: 58, fontWeight: 700, letterSpacing: '-2.5px', color: 'var(--ink)', lineHeight: 1 }}>0</span>
                <span style={{ fontSize: 22, fontWeight: 600, color: 'var(--ink-muted)', letterSpacing: '-0.3px' }}> Kč</span>
              </div>
              <div style={{ fontSize: 13.5, color: 'var(--ink-muted)', marginBottom: 28, letterSpacing: '-0.1px' }}>navždy zdarma</div>

              <LedgerButton variant="secondary" onClick={onDownload} style={{ width: '100%', marginBottom: 30 }}>
                Stáhnout zdarma
              </LedgerButton>

              <ul style={{ listStyle: 'none', padding: 0, margin: 0, flex: 1 }}>
                {allFeatures.map(freeRow)}
              </ul>
            </div>
          </Reveal>

          {/* Pro */}
          <Reveal delay={0.2} style={{ display: 'flex' }}>
            <div style={{
              flex: 1, borderRadius: 22, padding: '34px 30px',
              background: '#141917',
              border: '1px solid rgba(255,255,255,0.07)',
              boxShadow: '0 20px 64px rgba(0,0,0,0.26), 0 4px 16px rgba(0,0,0,0.18)',
              display: 'flex', flexDirection: 'column',
              color: 'rgba(255,255,255,0.9)',
              position: 'relative', overflow: 'hidden',
              transition: 'transform 0.45s var(--ease-lift), box-shadow 0.45s var(--ease-lift)',
            }}
            onMouseEnter={e => { e.currentTarget.style.transform='translateY(-4px)'; e.currentTarget.style.boxShadow='0 28px 72px rgba(0,0,0,0.34), 0 6px 20px rgba(0,0,0,0.22)'; }}
            onMouseLeave={e => { e.currentTarget.style.transform=''; e.currentTarget.style.boxShadow='0 20px 64px rgba(0,0,0,0.26), 0 4px 16px rgba(0,0,0,0.18)'; }}>


              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
                <div style={{ fontSize: 11.5, fontWeight: 700, letterSpacing: '0.9px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.48)' }}>Pro</div>
                <span style={{
                  fontSize: 11, fontWeight: 700, padding: '3px 10px',
                  borderRadius: 999, background: 'var(--primary-on-dark)',
                  color: '#04210f', letterSpacing: '0.2px',
                }}>Oblíbené</span>
              </div>

              <div style={{ display: 'flex', alignItems: 'baseline', gap: 3, marginBottom: 5 }}>
                <span style={{ fontSize: 58, fontWeight: 700, letterSpacing: '-2.5px', lineHeight: 1 }}>{displayPrice}</span>
                <span style={{ fontSize: 22, fontWeight: 600, color: 'rgba(255,255,255,0.4)', letterSpacing: '-0.3px' }}> Kč</span>
                <span style={{ fontSize: 15, color: 'rgba(255,255,255,0.36)', letterSpacing: '-0.2px' }}> /měs.</span>
              </div>
              <div style={{ fontSize: 13.5, color: 'rgba(255,255,255,0.38)', marginBottom: 28, letterSpacing: '-0.1px', minHeight: 20 }}>
                {annual ? `Účtováno ${annualPrice * 12} Kč ročně · zrušíte kdykoliv` : 'vyžaduje účet · zrušíte kdykoliv'}
              </div>

              <LedgerButton variant="primary" className="sheen" onClick={onDownload} style={{
                width: '100%', marginBottom: 30,
                transition: 'box-shadow 0.5s var(--ease-lift), transform 0.2s ease',
              }}>
                Vyzkoušet Pro 14 dní zdarma
              </LedgerButton>

              <ul style={{ listStyle: 'none', padding: 0, margin: 0, flex: 1 }}>
                {allFeatures.map(proRow)}
              </ul>
            </div>
          </Reveal>

        </div>
      </div>
    </section>
  );
}

/* ─── Reviews ─── */
function Reviews() {
  const data = [
    { quote: 'Konečně fakturační appka, co nepotřebuje připojení. Vystavím fakturu i ve vlaku a ráno ji jen pošlu.', name: 'Petra Dvořáková', role: 'Grafička na volné noze', initials: 'PD' },
    { quote: 'Z Excelu jsem přešel za jedno odpoledne. QR platba mi ušetřila desítky dotazů „kam mám poslat peníze".', name: 'Martin Sýkora', role: 'Truhlář, OSVČ', initials: 'MS' },
    { quote: 'Živý náhled je přesně to, co jsem potřebovala. Vidím PDF dřív, než ho vytvořím. Žádné překvapení u klienta.', name: 'Klára Benešová', role: 'Konzultantka', initials: 'KB' },
  ];
  return (
    <section className="glass-sec" style={{ background: 'var(--canvas-parchment)', padding: '108px 28px' }}>
      <div style={{ maxWidth: 1080, margin: '0 auto' }}>
        <Reveal style={{ textAlign: 'center', marginBottom: 56 }}>
          <h2 style={{ fontSize: 'clamp(30px, 4vw, 44px)', fontWeight: 600, lineHeight: 1.08, letterSpacing: '-0.6px', color: 'var(--ink)', marginBottom: 12 }}>
            Oblíbený mezi&nbsp;OSVČ.
          </h2>
          <p style={{ fontSize: 18, color: 'var(--ink-muted)', letterSpacing: '-0.2px' }}>
            Slyšíme vás.
          </p>
        </Reveal>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 22 }}>
          {data.map((r, i) => (
            <Reveal key={r.name} delay={0.08 + i * 0.1} style={{ display: 'flex' }}>
              <div className="glass hov" style={{
                padding: 30, borderRadius: 'var(--radius-lg)', background: 'var(--canvas)',
                border: '1px solid var(--divider-soft)', width: '100%',
                display: 'flex', flexDirection: 'column',
              }}>
                <div style={{ display: 'flex', gap: 2, marginBottom: 16 }}>
                  {[0, 1, 2, 3, 4].map(n => <span key={n} style={{ display: 'flex' }}>{Icons.star(15, '#F0A848')}</span>)}
                </div>
                <p style={{ fontSize: 16.5, color: 'var(--ink)', lineHeight: 1.5, letterSpacing: '-0.3px', flex: 1, marginBottom: 22 }}>
                  „{r.quote}"
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{
                    width: 42, height: 42, borderRadius: '50%', background: 'var(--primary-light)',
                    color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 14, fontWeight: 600, letterSpacing: '0.2px',
                  }}>{r.initials}</div>
                  <div>
                    <div style={{ fontSize: 15, fontWeight: 600, color: 'var(--ink)', letterSpacing: '-0.2px' }}>{r.name}</div>
                    <div style={{ fontSize: 13.5, color: 'var(--ink-muted)' }}>{r.role}</div>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── FAQ ─── */
function FAQItem({ q, a, open, onToggle }) {
  return (
    <div style={{ borderBottom: '1px solid var(--divider-soft)' }}>
      <button onClick={onToggle} style={{
        width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16,
        padding: '22px 4px', background: 'transparent', border: 'none', cursor: 'pointer',
        textAlign: 'left', color: 'var(--ink)', fontSize: 18, fontWeight: 500, letterSpacing: '-0.3px',
      }}>
        <span>{q}</span>
        <span style={{ flexShrink: 0, transition: 'transform 0.25s ease', transform: open ? 'rotate(90deg)' : 'none', display: 'flex' }}>
          {Icons.chevronRight(20, 'var(--ink-muted)')}
        </span>
      </button>
      <div style={{
        maxHeight: open ? 240 : 0, overflow: 'hidden',
        transition: 'max-height 0.3s ease, opacity 0.3s ease', opacity: open ? 1 : 0,
      }}>
        <p style={{ padding: '0 4px 24px', fontSize: 16, color: 'var(--ink-muted)', lineHeight: 1.6, letterSpacing: '-0.2px', maxWidth: 680 }}>{a}</p>
      </div>
    </div>
  );
}

function FAQ() {
  const [open, setOpen] = useS2(0);
  const items = [
    { q: 'Funguje Invoicee offline?', a: 'Ano. Desktopová aplikace běží kompletně lokálně ve vašem počítači — bez připojení k internetu, bez čekání na server. Faktury vystavíte kdekoliv.' },
    { q: 'Pro jaké systémy je dostupný?', a: 'Pro Windows 10 a 11, macOS 12 a novější, a navíc existuje webová verze, kterou spustíte přímo v prohlížeči bez instalace.' },
    { q: 'Kde se ukládají moje data?', a: 'Veškerá data zůstávají lokálně ve vašem zařízení. Nic neposíláme na cizí servery. S účtem Pro si můžete volitelně zapnout zabezpečenou synchronizaci mezi zařízeními.' },
    { q: 'Potřebuji k používání účet?', a: 'Ne. Free verze funguje úplně bez registrace. Účet je potřeba jen pro Pro funkce, jako je synchronizace mezi zařízeními.' },
    { q: 'Můžu fakturovat jako plátce DPH?', a: 'Ano. Invoicee podporuje tři režimy: Neplátce DPH, Neplátce s účetnictvím a Plátce DPH (daňový doklad) — se správnými poli pro DIČ, DUZP a sazby DPH.' },
    { q: 'Jak přejdu na Pro?', a: 'Přímo v aplikaci. Pro stojí 149 Kč měsíčně, prvních 14 dní je zdarma a předplatné zrušíte kdykoliv jedním klikem.' },
  ];
  return (
    <section id="faq" style={{ background: 'var(--canvas)', padding: '108px 28px' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <Reveal as="h2" style={{ fontSize: 'clamp(30px, 4vw, 44px)', fontWeight: 600, lineHeight: 1.08, letterSpacing: '-0.6px', color: 'var(--ink)', marginBottom: 40, textAlign: 'center' }}>
          Časté otázky
        </Reveal>
        <Reveal delay={0.08}>
          {items.map((it, i) => (
            <FAQItem key={i} q={it.q} a={it.a} open={open === i} onToggle={() => setOpen(open === i ? -1 : i)} />
          ))}
        </Reveal>
      </div>
    </section>
  );
}

/* ─── Final CTA ─── */
function FinalCTA({ onDownload, platform }) {
  const p = PLATFORMS[platform] || PLATFORMS.windows;
  return (
    <section className="glass-sec" style={{ background: 'var(--surface-tile-1)', color: 'var(--ink-on-dark)', padding: '112px 28px', textAlign: 'center' }}>
      <div style={{ maxWidth: 620, margin: '0 auto' }}>
        <img src={LOGO} alt="" width={64} height={64} style={{ borderRadius: 16, marginBottom: 28, animation: 'floaty 5s ease-in-out infinite' }} />
        <h2 style={{ fontSize: 'clamp(30px, 4vw, 46px)', fontWeight: 600, lineHeight: 1.08, letterSpacing: '-0.7px', marginBottom: 16 }}>
          Připraveni fakturovat?
        </h2>
        <p style={{ fontSize: 18, color: 'rgba(255,255,255,0.55)', marginBottom: 34, letterSpacing: '-0.2px' }}>
          Stáhněte Invoicer zdarma a&nbsp;vystavte první fakturu za&nbsp;minutu.
        </p>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Magnetic>
            <LedgerButton variant="primary" className="sheen" onClick={onDownload} style={{ padding: '14px 30px', fontSize: 17, transition: 'box-shadow 0.5s var(--ease-lift), transform 0.2s ease' }}>
              {Icons.download(18, '#fff')} {p.cta}
            </LedgerButton>
          </Magnetic>
          <Magnetic>
            <a href="Editor.html" style={{ textDecoration: 'none' }}>
              <LedgerButton variant="secondary" style={{ padding: '13px 29px', fontSize: 17, borderColor: 'rgba(255,255,255,0.28)', color: '#fff' }}>
                Vyzkoušet v prohlížeči
              </LedgerButton>
            </a>
          </Magnetic>
        </div>
        <div style={{ marginTop: 18, fontSize: 13, color: 'rgba(255,255,255,0.4)' }}>{p.meta} · Zdarma · Bez registrace</div>
      </div>
    </section>
  );
}

/* ─── Footer ─── */
function Footer() {
  const col = (title, links) => (
    <div>
      <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--ink)', marginBottom: 14, letterSpacing: '-0.1px' }}>{title}</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {links.map(l => <a key={l} href="#" style={{ fontSize: 14, color: 'var(--ink-muted)', letterSpacing: '-0.2px' }}>{l}</a>)}
      </div>
    </div>
  );
  return (
    <footer style={{ background: 'var(--canvas-parchment)', padding: '56px 28px 36px', borderTop: '1px solid var(--divider-soft)' }}>
      <div style={{ maxWidth: 1080, margin: '0 auto' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 48, justifyContent: 'space-between', marginBottom: 44 }}>
          <div style={{ maxWidth: 280 }}>
            <Brand size={26} />
            <p style={{ marginTop: 14, fontSize: 14, color: 'var(--ink-muted)', lineHeight: 1.55, letterSpacing: '-0.2px' }}>
              Nativní fakturační aplikace pro české OSVČ. Vaše data zůstávají u&nbsp;vás.
            </p>
          </div>
          <div style={{ display: 'flex', gap: 56, flexWrap: 'wrap' }}>
            {col('Produkt', ['Funkce', 'Ceník', 'Stáhnout', 'Webová verze'])}
            {col('Podpora', ['FAQ', 'Kontakt', 'Návody'])}
            {col('Právní', ['Ochrana údajů', 'Podmínky'])}
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12, paddingTop: 24, borderTop: '1px solid var(--divider-soft)' }}>
          <div style={{ fontSize: 13, color: 'var(--ink-muted-48)' }}>© 2026 Invoicee. Vytvořeno pro české OSVČ.</div>
          <div style={{ fontSize: 13, color: 'var(--ink-muted-48)' }}>Windows · macOS · web</div>
        </div>
      </div>
    </footer>
  );
}

/* ─── Download modal ─── */
function DownloadModal({ open, onClose, platform }) {
  const p = PLATFORMS[platform] || PLATFORMS.windows;
  return (
    <Modal open={open} onClose={onClose} width={440}>
      <div style={{ textAlign: 'center' }}>
        <div style={{ width: 60, height: 60, borderRadius: 16, background: 'var(--primary-light)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', marginBottom: 18 }}>
          {Icons.download(28, 'var(--primary)')}
        </div>
        <h2 style={{ fontSize: 22, fontWeight: 600, letterSpacing: '-0.4px', marginBottom: 8, color: 'var(--ink)' }}>Stahování spuštěno</h2>
        <p style={{ fontSize: 15, color: 'var(--ink-muted)', lineHeight: 1.5, marginBottom: 22, letterSpacing: '-0.2px' }}>
          Soubor <strong style={{ color: 'var(--ink)' }}>InvoicerSetup ({p.label})</strong> se začal stahovat. Po instalaci můžete rovnou vystavit první fakturu.
        </p>
        <div style={{ background: 'var(--canvas-parchment)', borderRadius: 'var(--radius-md)', padding: '12px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 22 }}>
          <span style={{ fontSize: 13.5, color: 'var(--ink-muted)' }}>{p.meta} · Zdarma</span>
          <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--primary)' }}>{Icons.check(15, 'var(--primary)')}</span>
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <a href="Editor.html" style={{ flex: 1, textDecoration: 'none' }}>
            <LedgerButton variant="secondary" style={{ width: '100%' }}>Zatím v prohlížeči</LedgerButton>
          </a>
          <LedgerButton variant="primary" onClick={onClose} style={{ flex: 1 }}>Rozumím</LedgerButton>
        </div>
      </div>
    </Modal>
  );
}

/* ─── App shell ─── */
function PromoApp() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const [dl, setDl] = useS2(false);
  useE2(() => { applyAccent(t.accentColor); }, [t.accentColor]);
  // Match the product shot + download CTA to the visitor's actual OS on load.
  useE2(() => { setTweak('platform', detectOS()); }, []);
  useE2(() => { document.body.classList.toggle('dark-mode', !!t.darkMode); }, [t.darkMode]);
  useE2(() => { document.body.classList.toggle('glassy', !!t.glassmorphism); }, [t.glassmorphism]);
  useE2(() => {
    document.body.style.fontFamily = t.fontFamily === 'system'
      ? 'system-ui, -apple-system, BlinkMacSystemFont, sans-serif'
      : "'Inter', system-ui, -apple-system, BlinkMacSystemFont, sans-serif";
  }, [t.fontFamily]);
  const onDownload = () => setDl(true);
  return (
    <div>
      <ScrollProgress />
      <PromoNav onDownload={onDownload} platform={t.platform} />
      <Hero onDownload={onDownload} platform={t.platform} />
      <Features />
      <HowItWorks onDownload={onDownload} />
      <Pricing onDownload={onDownload} />
      <Reviews />
      <FAQ />
      <FinalCTA onDownload={onDownload} platform={t.platform} />
      <Footer />
      <DownloadModal open={dl} onClose={() => setDl(false)} platform={t.platform} />
      <TweaksPanel title="Tweaks">
        <TweakSection label="Barva značky">
          <TweakColor label="Akcent" value={t.accentColor}
            options={['#1A7F4B', '#0066CC', '#C27D2E']}
            onChange={(v) => setTweak('accentColor', v)} />
        </TweakSection>
        <TweakSection label="Vzhled">
          <TweakToggle label="Tmavý režim" value={t.darkMode} onChange={(v) => setTweak('darkMode', v)} />
          <TweakToggle label="Více glassmorphismu" value={t.glassmorphism} onChange={(v) => setTweak('glassmorphism', v)} />
          <TweakRadio label="Písmo" value={t.fontFamily} options={[{ value: 'inter', label: 'Inter' }, { value: 'system', label: 'Systémové' }]} onChange={(v) => setTweak('fontFamily', v)} />
        </TweakSection>
        <TweakSection label="Platforma">
          <TweakRadio label="Stáhnout pro" value={t.platform} options={[{ value: 'windows', label: 'Windows' }, { value: 'macos', label: 'macOS' }]} onChange={(v) => setTweak('platform', v)} />
        </TweakSection>
      </TweaksPanel>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<PromoApp />);
