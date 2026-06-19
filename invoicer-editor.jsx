/* Invoicee — Web Editor (real, usable app — keeps the editor+preview idea from the hero window) */
const { useState: useES, useEffect: useEE, useRef: useER, useMemo: useEM, useCallback: useEC } = React;

const EDITOR_LOGO = 'assets/invoicer-logo.png';
const A4_W = 560, A4_H = Math.round(560 * 297 / 210); // 792

/* ── Money / compute helpers ── */
function lineTotal(it) { return (Number(it.quantity) || 0) * (Number(it.unitPrice) || 0); }
function fmt(n, currency = 'CZK') {
  const symbols = { CZK: 'Kč', EUR: '€', USD: '$' };
  const f = new Intl.NumberFormat('cs-CZ', { minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(Math.round(n || 0));
  return currency === 'CZK' ? `${f} Kč` : `${symbols[currency] || currency}${f}`;
}
function czDate(d) {
  if (!d) return '—';
  const p = d.split('-'); if (p.length !== 3) return d;
  return `${+p[2]}. ${+p[1]}. ${p[0]}`;
}

/* ── Editor field (clean inset input) ── */
const fieldShell = {
  height: 38, borderRadius: 9, width: '100%',
  background: 'color-mix(in srgb, var(--ink) 3.5%, transparent)',
  boxShadow: 'inset 0 0 0 1px color-mix(in srgb, var(--ink) 9%, transparent)',
  display: 'flex', alignItems: 'center', padding: '0 12px',
};
function ELabel({ children }) {
  return <div style={{ fontSize: 11, color: 'var(--ink-muted)', marginBottom: 6, fontWeight: 600, letterSpacing: '-0.1px' }}>{children}</div>;
}
function EInput({ value, onChange, placeholder, type = 'text', align = 'left', mono = false }) {
  const [f, setF] = useES(false);
  return (
    <input
      type={type} value={value} placeholder={placeholder}
      onChange={(e) => onChange(e.target.value)}
      onFocus={() => setF(true)} onBlur={() => setF(false)}
      style={{
        ...fieldShell, border: 'none', outline: 'none',
        fontSize: 14, color: 'var(--ink)', textAlign: align,
        fontFamily: mono ? 'ui-monospace, SFMono-Regular, Menlo, monospace' : 'inherit',
        boxShadow: f
          ? 'inset 0 0 0 1.5px var(--primary), 0 0 0 3px var(--primary-15)'
          : fieldShell.boxShadow,
        background: f ? 'var(--canvas)' : fieldShell.background,
        transition: 'box-shadow .16s ease, background .16s ease',
      }}
    />
  );
}
function Field({ label, ...rest }) {
  return (
    <div>
      <ELabel>{label}</ELabel>
      <EInput {...rest} />
    </div>
  );
}

/* ── Card group in the editor column ── */
function Card({ title, right, children }) {
  return (
    <section style={{
      background: 'var(--canvas)', borderRadius: 16, padding: '20px 22px',
      border: '1px solid var(--divider-soft)',
      boxShadow: '0 1px 2px rgba(0,0,0,0.04), 0 1px 0 rgba(255,255,255,0.6) inset',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 18 }}>
        <h2 style={{ fontSize: 13, fontWeight: 700, color: 'var(--ink)', textTransform: 'uppercase', letterSpacing: '0.6px', margin: 0 }}>{title}</h2>
        {right}
      </div>
      {children}
    </section>
  );
}

/* ── The Editor app ── */
function EditorApp() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const [inv, setInv] = useES(() => {
    try { const s = localStorage.getItem('invoicee_editor_v1'); if (s) return JSON.parse(s); } catch (e) {}
    return createSampleInvoice();
  });
  const [saved, setSaved] = useES(false);
  useEE(() => {
    try { localStorage.setItem('invoicee_editor_v1', JSON.stringify(inv)); } catch (e) {}
    setSaved(true); const id = setTimeout(() => setSaved(false), 1400); return () => clearTimeout(id);
  }, [inv]);
  useEE(() => { applyAccent(t.accentColor); }, [t.accentColor]);
  useEE(() => { document.body.classList.toggle('dark-mode', !!t.darkMode); }, [t.darkMode]);
  useEE(() => { document.body.classList.toggle('glassy', !!t.glassmorphism); }, [t.glassmorphism]);
  useEE(() => {
    document.body.style.fontFamily = t.fontFamily === 'inter'
      ? "'Inter', system-ui, -apple-system, sans-serif"
      : 'system-ui, -apple-system, BlinkMacSystemFont, sans-serif';
  }, [t.fontFamily]);

  /* ── Sidebar resize ── */
  const [sidebarW, setSidebarW] = useES(() => {
    const s = localStorage.getItem('invoicee_sidebarW'); return s ? Number(s) : 440;
  });
  const [isDragging, setIsDragging] = useES(false);
  const startDrag = useEC((e) => {
    e.preventDefault();
    const startX = e.clientX, startW = sidebarW;
    setIsDragging(true);
    function onMove(e) {
      const newW = Math.max(300, Math.min(680, startW + e.clientX - startX));
      setSidebarW(newW);
    }
    function onUp() {
      setIsDragging(false);
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseup', onUp);
      document.body.style.cursor = '';
      // Trigger scale recalc after layout settles
      setTimeout(() => {
        const el = previewRef.current;
        if (!el) return;
        const { width, height } = el.getBoundingClientRect();
        if (width < 20 || height < 20) return;
        const s = Math.min((width - 56) / A4_W, (height - 56) / A4_H);
        setA4Scale(Math.max(0.2, s));
      }, 50);
    }
    document.body.style.cursor = 'col-resize';
    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseup', onUp);
  }, [sidebarW]);
  useEE(() => { localStorage.setItem('invoicee_sidebarW', sidebarW); }, [sidebarW]);

  /* ── A4 scale-to-fit ── */
  const previewRef = useER(null);
  const [a4Scale, setA4Scale] = useES(() => {
    // Initial estimate so first render is already correct
    const h = window.innerHeight - 60 - 56;
    const w = (window.innerWidth - (Number(localStorage.getItem('invoicee_sidebarW')) || 440) - 5) - 56;
    return Math.max(0.25, Math.min(1.8, Math.min(h / A4_H, w / A4_W)));
  });

  useEE(() => {
    function calc() {
      const el = previewRef.current;
      if (!el) return;
      const { width, height } = el.getBoundingClientRect();
      if (width < 20 || height < 20) return;
      const s = Math.min((width - 56) / A4_W, (height - 56) / A4_H);
      setA4Scale(Math.max(0.2, s));
    }
    calc();
    const t1 = setTimeout(calc, 60);
    const t2 = setTimeout(calc, 300);
    const obs = new ResizeObserver(calc);
    if (previewRef.current) obs.observe(previewRef.current);
    window.addEventListener('resize', calc);
    return () => { clearTimeout(t1); clearTimeout(t2); obs.disconnect(); window.removeEventListener('resize', calc); };
  }, []);

  const mode = INVOICE_MODES[inv.mode] || INVOICE_MODES.neplatce;
  const set = (patch) => setInv((p) => ({ ...p, ...patch }));
  const setSup = (patch) => setInv((p) => ({ ...p, supplier: { ...p.supplier, ...patch } }));
  const setCus = (patch) => setInv((p) => ({ ...p, customer: { ...p.customer, ...patch } }));
  const setItem = (id, patch) => setInv((p) => ({ ...p, items: p.items.map((it) => it.id === id ? { ...it, ...patch } : it) }));
  const addItem = () => setInv((p) => ({ ...p, items: [...p.items, { id: Date.now(), description: '', quantity: 1, unitPrice: 0 }] }));
  const delItem = (id) => setInv((p) => ({ ...p, items: p.items.filter((it) => it.id !== id) }));

  const subtotal = useEM(() => inv.items.reduce((a, it) => a + lineTotal(it), 0), [inv.items]);
  const vat = mode.showVat ? subtotal * (Number(inv.vatRate) || 0) / 100 : 0;
  const total = subtotal + vat;
  const qrData = `SPD*1.0*ACC:${inv.supplier.bankAccount || ''}*AM:${Math.round(total)}*CC:${inv.currency}*X-VS:${inv.variableSymbol || ''}`;

  return (
    <div className="ed-root">
      {/* ── App bar ── */}
      <header className="ed-bar glass-nav">
        <a href="Invoicee.html" className="ed-brand" title="Zpět na web">
          <img src={EDITOR_LOGO} alt="" width={26} height={26} style={{ borderRadius: 7, display: 'block' }} />
          <span style={{ fontSize: 17, fontWeight: 600, color: 'var(--ink)', letterSpacing: '-0.4px' }}>Invoicee</span>
          <span style={{ fontSize: 13, color: 'var(--ink-muted-48)', fontWeight: 500, marginLeft: 2 }}>Editor</span>
        </a>

        <div className="ed-bar-mid">
          <span style={{ fontSize: 13.5, fontWeight: 600, color: 'var(--ink)' }}>{inv.number || 'Nová faktura'}</span>
          <span className="ed-saved" style={{ opacity: saved ? 1 : 0.45, transition: 'opacity .3s ease' }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--primary)', display: 'inline-block' }}></span>
            {saved ? 'Uloženo' : 'Lokální koncept'}
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <button className="ed-ghost-btn" onClick={() => { if (confirm('Začít novou fakturu? Aktuální koncept se přepíše.')) setInv(createSampleInvoice()); }}>
            {Icons.plus(16, 'currentColor')} Nová
          </button>
          <button className="ed-primary-btn sheen" onClick={() => window.print()}>
            {Icons.download(16, '#fff')} Export PDF
          </button>
        </div>
      </header>

      {/* ── Workspace ── */}
      <main className="ed-work">
        {/* Left: form */}
        <div className="ed-form" style={{ width: sidebarW, minWidth: 300, maxWidth: 680 }}>
          {/* Mode segmented */}
          <div style={{ display: 'flex', gap: 4, background: 'color-mix(in srgb, var(--ink) 5%, transparent)', padding: 4, borderRadius: 12 }}>
            {Object.values(INVOICE_MODES).map((m) => (
              <button key={m.id} onClick={() => set({ mode: m.id })} style={{
                flex: 1, padding: '10px 6px', borderRadius: 9, border: 'none', cursor: 'pointer',
                fontSize: 13, fontWeight: 600, letterSpacing: '-0.1px',
                background: inv.mode === m.id ? 'var(--canvas)' : 'transparent',
                color: inv.mode === m.id ? 'var(--ink)' : 'var(--ink-muted)',
                boxShadow: inv.mode === m.id ? '0 1px 3px rgba(0,0,0,0.12), 0 0 0 0.5px rgba(0,0,0,0.05)' : 'none',
                transition: 'all .18s ease',
              }}>{m.label}</button>
            ))}
          </div>

          <Card title="Základní údaje">
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
              <Field label="Číslo faktury" value={inv.number} onChange={(v) => set({ number: v })} mono />
              <Field label="Variabilní symbol" value={inv.variableSymbol} onChange={(v) => set({ variableSymbol: v })} mono />
              <Field label="Datum vystavení" type="date" value={inv.dateIssued} onChange={(v) => set({ dateIssued: v })} />
              <Field label="Datum splatnosti" type="date" value={inv.dateDue} onChange={(v) => set({ dateDue: v })} />
              {mode.showDuzp && <Field label="DUZP" type="date" value={inv.duzp} onChange={(v) => set({ duzp: v })} />}
              {mode.showVat && <Field label="Sazba DPH (%)" type="number" value={inv.vatRate} onChange={(v) => set({ vatRate: v })} />}
            </div>
          </Card>

          <div className="ed-two">
            <Card title="Dodavatel">
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                <Field label="Jméno / firma" value={inv.supplier.name} onChange={(v) => setSup({ name: v })} />
                <div style={{ display: 'grid', gridTemplateColumns: mode.showDic ? '1fr 1fr' : '1fr', gap: 14 }}>
                  <Field label="IČO" value={inv.supplier.ico} onChange={(v) => setSup({ ico: v })} mono />
                  {mode.showDic && <Field label="DIČ" value={inv.supplier.dic} onChange={(v) => setSup({ dic: v })} mono />}
                </div>
                <Field label="Adresa" value={inv.supplier.address} onChange={(v) => setSup({ address: v })} />
                <Field label="Číslo účtu / IBAN" value={inv.supplier.bankAccount} onChange={(v) => setSup({ bankAccount: v })} mono />
              </div>
            </Card>
            <Card title="Odběratel">
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                <Field label="Jméno / firma" value={inv.customer.name} onChange={(v) => setCus({ name: v })} />
                <div style={{ display: 'grid', gridTemplateColumns: mode.showDic ? '1fr 1fr' : '1fr', gap: 14 }}>
                  <Field label="IČO" value={inv.customer.ico} onChange={(v) => setCus({ ico: v })} mono />
                  {mode.showDic && <Field label="DIČ" value={inv.customer.dic} onChange={(v) => setCus({ dic: v })} mono />}
                </div>
                <Field label="Adresa" value={inv.customer.address} onChange={(v) => setCus({ address: v })} />
                <Field label="E-mail" value={inv.customer.email} onChange={(v) => setCus({ email: v })} />
              </div>
            </Card>
          </div>

          <Card title="Položky" right={<span style={{ fontSize: 12, color: 'var(--ink-muted-48)', fontWeight: 500 }}>{inv.items.length} položek</span>}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 70px 110px 40px', gap: 10, padding: '0 2px 8px', fontSize: 10.5, fontWeight: 600, color: 'var(--ink-muted-48)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              <span>Popis</span><span style={{ textAlign: 'center' }}>Ks</span><span style={{ textAlign: 'right' }}>Cena/ks</span><span></span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
              {inv.items.map((it) => (
                <div key={it.id} style={{ display: 'grid', gridTemplateColumns: '1fr 70px 110px 40px', gap: 10, alignItems: 'center' }}>
                  <EInput value={it.description} placeholder="Popis položky" onChange={(v) => setItem(it.id, { description: v })} />
                  <EInput value={it.quantity} type="number" align="center" onChange={(v) => setItem(it.id, { quantity: v })} />
                  <EInput value={it.unitPrice} type="number" align="right" mono onChange={(v) => setItem(it.id, { unitPrice: v })} />
                  <button onClick={() => delItem(it.id)} title="Smazat" className="ed-del" style={{ width: 36, height: 38, borderRadius: 9, border: 'none', background: 'transparent', color: 'var(--ink-muted-48)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {Icons.trash(16, 'currentColor')}
                  </button>
                </div>
              ))}
            </div>
            <div className="gg-add" onClick={addItem} style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, marginTop: 12,
              padding: '11px', borderRadius: 10, border: '1px dashed color-mix(in srgb, var(--primary) 55%, transparent)',
              background: 'color-mix(in srgb, var(--primary) 7%, transparent)', color: 'var(--primary)', fontSize: 13, fontWeight: 600, cursor: 'pointer',
              transition: 'background .25s ease, box-shadow .25s ease, border-color .25s ease',
            }}>{Icons.plus(15, 'var(--primary)')} Přidat položku</div>
          </Card>

          <Card title="Poznámka">
            <textarea value={inv.note} onChange={(e) => set({ note: e.target.value })} placeholder="Děkujeme za spolupráci."
              style={{ ...fieldShell, height: 'auto', minHeight: 64, padding: '11px 12px', border: 'none', outline: 'none', resize: 'vertical', fontSize: 14, color: 'var(--ink)', lineHeight: 1.5, fontFamily: 'inherit' }} />
          </Card>
        </div>

        {/* Drag resize handle */}
        <div className={`ed-drag${isDragging ? ' dragging' : ''}`} onMouseDown={startDrag}>
          <div className="ed-drag-pip"></div>
        </div>

        {/* Right: live preview — scale-to-fit A4 */}
        <div className="ed-preview">
          <div className="a4-scroll" ref={previewRef}>
            <div style={{ width: A4_W * a4Scale, height: A4_H * a4Scale, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <div className="a4" style={{ width: A4_W, height: A4_H, transform: `scale(${a4Scale})`, transformOrigin: 'center center', flexShrink: 0 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 18 }}>
                <div>
                  <div style={{ fontSize: 24, fontWeight: 800, color: 'var(--primary)', letterSpacing: '-0.6px', lineHeight: 1 }}>{mode.docTitle}</div>
                  <div style={{ fontSize: 12.5, color: '#6e6e73', marginTop: 5, fontFamily: 'ui-monospace, Menlo, monospace' }}>č. {inv.number}</div>
                </div>
                <div style={{ textAlign: 'right', fontSize: 11, color: '#6e6e73', lineHeight: 1.8 }}>
                  <div>Vystaveno: <b style={{ color: '#1d1d1f' }}>{czDate(inv.dateIssued)}</b></div>
                  <div>Splatnost: <b style={{ color: '#1d1d1f' }}>{czDate(inv.dateDue)}</b></div>
                  {mode.showDuzp && <div>DUZP: <b style={{ color: '#1d1d1f' }}>{czDate(inv.duzp)}</b></div>}
                  <div>VS: <b style={{ color: '#1d1d1f' }}>{inv.variableSymbol}</b></div>
                </div>
              </div>
              <div style={{ height: 3, width: 52, background: 'var(--primary)', borderRadius: 2, marginBottom: 22 }}></div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 28, marginBottom: 26 }}>
                {[['Dodavatel', inv.supplier, mode.showDic], ['Odběratel', inv.customer, mode.showDic]].map(([h, p, dic]) => (
                  <div key={h}>
                    <div style={{ fontSize: 9, color: '#86868b', fontWeight: 700, marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.6px' }}>{h}</div>
                    <div style={{ fontSize: 13, color: '#1d1d1f', fontWeight: 600, marginBottom: 4 }}>{p.name || '—'}</div>
                    <div style={{ fontSize: 11, color: '#3a3a3c', lineHeight: 1.7 }}>
                      {p.address}<br />
                      {p.ico && <>IČO: {p.ico}</>}{dic && p.dic ? <><br />DIČ: {p.dic}</> : ''}
                    </div>
                  </div>
                ))}
              </div>

              <div style={{ border: '1px solid #ececef', borderRadius: 9, overflow: 'hidden', marginBottom: 18 }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 44px 96px 104px', background: '#f5f5f7', padding: '9px 14px', fontSize: 9, fontWeight: 700, color: '#86868b', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  <span>Popis</span><span style={{ textAlign: 'center' }}>Ks</span><span style={{ textAlign: 'right' }}>Cena</span><span style={{ textAlign: 'right' }}>Celkem</span>
                </div>
                {inv.items.map((it) => (
                  <div key={it.id} style={{ display: 'grid', gridTemplateColumns: '1fr 44px 96px 104px', padding: '10px 14px', fontSize: 11.5, color: '#1d1d1f', borderTop: '1px solid #f0f0f2', fontVariantNumeric: 'tabular-nums' }}>
                    <span>{it.description || '—'}</span>
                    <span style={{ textAlign: 'center', color: '#6e6e73' }}>{it.quantity}</span>
                    <span style={{ textAlign: 'right', color: '#6e6e73' }}>{fmt(it.unitPrice, inv.currency)}</span>
                    <span style={{ textAlign: 'right', fontWeight: 600 }}>{fmt(lineTotal(it), inv.currency)}</span>
                  </div>
                ))}
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 20 }}>
                <div style={{ width: 220 }}>
                  {mode.showVat && (
                    <>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11.5, color: '#6e6e73', padding: '5px 0' }}><span>Základ daně</span><span>{fmt(subtotal, inv.currency)}</span></div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11.5, color: '#6e6e73', padding: '5px 0' }}><span>DPH {inv.vatRate} %</span><span>{fmt(vat, inv.currency)}</span></div>
                    </>
                  )}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', padding: '11px 14px', marginTop: 7, background: 'var(--primary-light)', borderRadius: 9 }}>
                    <span style={{ fontSize: 12, fontWeight: 700, color: '#1d1d1f' }}>Celkem k úhradě</span>
                    <span style={{ fontSize: 17, fontWeight: 800, color: 'var(--primary)', fontVariantNumeric: 'tabular-nums' }}>{fmt(total, inv.currency)}</span>
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', borderTop: '1px solid #ececef', paddingTop: 16 }}>
                <div style={{ maxWidth: '58%' }}>
                  {inv.note && <div style={{ fontSize: 10.5, color: '#6e6e73', lineHeight: 1.6, marginBottom: 10 }}>{inv.note}</div>}
                  <div style={{ fontSize: 9.5, color: '#a1a1a6' }}>Bankovní účet</div>
                  <div style={{ fontSize: 10.5, fontFamily: 'ui-monospace, Menlo, monospace', color: '#3a3a3c' }}>{inv.supplier.bankAccount}</div>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ padding: 5, background: '#fff', borderRadius: 7, boxShadow: '0 0 0 1px #ececef' }}>
                    <QRCode data={qrData} size={68} />
                  </div>
                  <div style={{ fontSize: 8, color: '#a1a1a6', marginTop: 5, letterSpacing: '0.4px' }}>QR PLATBA</div>
                </div>
              </div>
            </div>
            </div>
          </div>
        </div>
      </main>

      <TweaksPanel title="Tweaks">
        <TweakSection label="Barva značky">
          <TweakColor label="Akcent" value={t.accentColor} options={['#1A7F4B', '#0066CC', '#C27D2E']} onChange={(v) => setTweak('accentColor', v)} />
        </TweakSection>
        <TweakSection label="Vzhled">
          <TweakToggle label="Tmavý režim" value={t.darkMode} onChange={(v) => setTweak('darkMode', v)} />
          <TweakToggle label="Více glassmorphismu" value={t.glassmorphism} onChange={(v) => setTweak('glassmorphism', v)} />
          <TweakRadio label="Písmo" value={t.fontFamily} options={[{ value: 'inter', label: 'Inter' }, { value: 'system', label: 'Systémové' }]} onChange={(v) => setTweak('fontFamily', v)} />
        </TweakSection>
      </TweaksPanel>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<EditorApp />);
