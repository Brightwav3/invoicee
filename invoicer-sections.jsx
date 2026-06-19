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
  // Full feature matrix — every plan shows ALL features; only the
  // tick/cross differs so the user can compare at a glance.
  const features = [
    { label: 'Desktop i webová verze', free: true, pro: true },
    { label: 'Neomezené faktury', free: true, pro: true },
    { label: 'PDF export + QR platba', free: true, pro: true },
    { label: 'IČO, DIČ, režimy DPH', free: true, pro: true },
    { label: 'Lokální historie faktur', free: true, pro: true },
    { label: 'Bez vodoznaku v PDF', free: false, pro: true },
    { label: 'Databáze klientů (auto-fill)', free: false, pro: true },
    { label: 'Synchronizace mezi zařízeními', free: false, pro: true },
    { label: 'Export do CSV', free: false, pro: true },
    { label: 'Přednostní podpora', free: false, pro: true },
  ];
  const li = (f, included) => (
    <li key={f.label} style={{ display: 'flex', alignItems: 'center', gap: 11, padding: '8px 0', fontSize: 15.5, color: included ? 'rgba(255,255,255,0.86)' : 'rgba(255,255,255,0.38)', letterSpacing: '-0.2px' }}>
      <span style={{ flexShrink: 0, display: 'flex', width: 16 }}>
        {included ? Icons.check(16, 'var(--primary-on-dark)') : Icons.cross(15, 'rgba(255,255,255,0.32)')}
      </span>
      <span style={{ textDecoration: included ? 'none' : 'none' }}>{f.label}</span>
    </li>
  );
  return (
    <section id="pricing" className="glass-sec" style={{ background: 'var(--surface-tile-1)', color: 'var(--ink-on-dark)', padding: '108px 28px' }}>
      <div style={{ maxWidth: 880, margin: '0 auto', textAlign: 'center' }}>
        <Reveal>
          <h2 style={{ fontSize: 'clamp(30px, 4vw, 44px)', fontWeight: 600, lineHeight: 1.08, letterSpacing: '-0.6px', marginBottom: 14 }}>
            Jednoduché ceny.
          </h2>
          <p style={{ fontSize: 18, color: 'rgba(255,255,255,0.55)', marginBottom: 52, letterSpacing: '-0.2px' }}>
            Začněte zdarma. Na Pro přejděte, až budete potřebovat&nbsp;víc.
          </p>
        </Reveal>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 22, textAlign: 'left' }}>
          {/* Free */}
          <Reveal delay={0.14} style={{ display: 'flex' }}>
            <div className="glass-dark hov-d" style={{ padding: 34, borderRadius: 'var(--radius-lg)', background: 'var(--surface-tile-2)', border: '1px solid rgba(255,255,255,0.06)', width: '100%' }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: 'rgba(255,255,255,0.6)', marginBottom: 10, textTransform: 'uppercase', letterSpacing: '0.6px' }}>Free</div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 5, marginBottom: 4 }}>
                <span style={{ fontSize: 42, fontWeight: 600, letterSpacing: '-1.4px' }}>0 Kč</span>
              </div>
              <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.4)', marginBottom: 26 }}>navždy zdarma</div>
              <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 28px' }}>{features.map(f => li(f, f.free))}</ul>
              <LedgerButton variant="secondary" onClick={onDownload} style={{ width: '100%', borderColor: 'rgba(255,255,255,0.25)', color: '#fff' }}>
                Stáhnout zdarma
              </LedgerButton>
            </div>
          </Reveal>
          {/* Pro */}
          <Reveal delay={0.24} style={{ display: 'flex' }}>
            <div className="glass-dark glass-pro hov-d" style={{ padding: 34, borderRadius: 'var(--radius-lg)', background: 'var(--surface-tile-2)', border: '1px solid rgba(255,255,255,0.14)', position: 'relative', width: '100%' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 9, marginBottom: 10 }}>
                <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--primary-on-dark)', textTransform: 'uppercase', letterSpacing: '0.6px' }}>Pro</span>
                <span style={{ fontSize: 11, padding: '2px 9px', borderRadius: 'var(--radius-pill)', background: 'var(--primary-on-dark)', color: '#04210f', fontWeight: 700 }}>Oblíbené</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 5, marginBottom: 4 }}>
                <span style={{ fontSize: 42, fontWeight: 600, letterSpacing: '-1.4px' }}>149 Kč</span>
                <span style={{ fontSize: 15, color: 'rgba(255,255,255,0.45)' }}>/měs.</span>
              </div>
              <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.4)', marginBottom: 26 }}>vyžaduje účet · zrušíte kdykoliv</div>
              <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 28px' }}>{features.map(f => li(f, f.pro))}</ul>
              <LedgerButton variant="primary" className="sheen" onClick={onDownload} style={{ width: '100%', transition: 'box-shadow 0.5s var(--ease-lift), transform 0.2s ease' }}>
                Vyzkoušet Pro 14 dní zdarma
              </LedgerButton>
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
