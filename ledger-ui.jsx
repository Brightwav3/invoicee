/* Ledger — Shared UI Components */
const { useState, useRef, useEffect, useCallback, createContext, useContext } = React;

/* ─── Theme Context ─── */
const ThemeCtx = createContext({
  accentColor: '#1A7F4B',
  darkMode: true,
  fontFamily: 'system',
  invoiceStyle: 'classic',
  setAccent: () => {},
});

/* ─── Color utilities ─── */
function accentCSS(hex) {
  return {
    '--primary': hex,
    '--primary-hover': hex + 'dd',
    '--primary-on-dark': hex,
    '--primary-light': hex + '18',
    '--primary-15': hex + '1f',
  };
}

/* ─── Icons (simple geometric SVGs) ─── */
const Icons = {
  document: (s = 20, c = 'currentColor') => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"></path>
      <polyline points="14 2 14 8 20 8"></polyline>
      <line x1="9" y1="13" x2="15" y2="13"></line>
      <line x1="9" y1="17" x2="15" y2="17"></line>
    </svg>
  ),
  qr: (s = 20, c = 'currentColor') => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="8" height="8" rx="1"></rect>
      <rect x="14" y="2" width="8" height="8" rx="1"></rect>
      <rect x="2" y="14" width="8" height="8" rx="1"></rect>
      <rect x="14" y="14" width="4" height="4" rx="0.5"></rect>
      <line x1="22" y1="14" x2="22" y2="22"></line>
      <line x1="14" y1="22" x2="22" y2="22"></line>
    </svg>
  ),
  download: (s = 20, c = 'currentColor') => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"></path>
      <polyline points="7 10 12 15 17 10"></polyline>
      <line x1="12" y1="15" x2="12" y2="3"></line>
    </svg>
  ),
  clock: (s = 20, c = 'currentColor') => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"></circle>
      <polyline points="12 6 12 12 16 14"></polyline>
    </svg>
  ),
  shield: (s = 20, c = 'currentColor') => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
    </svg>
  ),
  users: (s = 20, c = 'currentColor') => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"></path>
      <circle cx="9" cy="7" r="4"></circle>
      <path d="M23 21v-2a4 4 0 00-3-3.87"></path>
      <path d="M16 3.13a4 4 0 010 7.75"></path>
    </svg>
  ),
  plus: (s = 20, c = 'currentColor') => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round">
      <line x1="12" y1="5" x2="12" y2="19"></line>
      <line x1="5" y1="12" x2="19" y2="12"></line>
    </svg>
  ),
  trash: (s = 20, c = 'currentColor') => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="3 6 5 6 21 6"></polyline>
      <path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6"></path>
      <path d="M10 11v6"></path>
      <path d="M14 11v6"></path>
    </svg>
  ),
  check: (s = 20, c = 'currentColor') => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12"></polyline>
    </svg>
  ),
  cross: (s = 20, c = 'currentColor') => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
      <line x1="6" y1="6" x2="18" y2="18"></line>
      <line x1="18" y1="6" x2="6" y2="18"></line>
    </svg>
  ),
  chevronRight: (s = 20, c = 'currentColor') => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="9 18 15 12 9 6"></polyline>
    </svg>
  ),
  star: (s = 20, c = 'currentColor') => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill={c} stroke="none">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26"></polygon>
    </svg>
  ),
  settings: (s = 20, c = 'currentColor') => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3"></circle>
      <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"></path>
    </svg>
  ),
  copy: (s = 20, c = 'currentColor') => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
      <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"></path>
    </svg>
  ),
  edit: (s = 20, c = 'currentColor') => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"></path>
      <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"></path>
    </svg>
  ),
  arrowLeft: (s = 20, c = 'currentColor') => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="19" y1="12" x2="5" y2="12"></line>
      <polyline points="12 19 5 12 12 5"></polyline>
    </svg>
  ),
  crown: (s = 20, c = 'currentColor') => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 20h20"></path>
      <path d="M4 16l2-12 5 5 3-7 3 7 5-5 2 12H4z" fill={c} fillOpacity="0.1"></path>
    </svg>
  ),
};

/* ─── Button ─── */
const btnStyles = {
  base: {
    display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8,
    border: 'none', cursor: 'pointer', fontWeight: 400,
    fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'SF Pro Text', system-ui, sans-serif",
    transition: 'background 0.25s cubic-bezier(0.22,1,0.36,1), box-shadow 0.25s cubic-bezier(0.22,1,0.36,1), transform 0.15s cubic-bezier(0.34,1.56,0.64,1)',
    position: 'relative', textDecoration: 'none',
    letterSpacing: '-0.224px',
  },
  /* Bordered - Prominent (Default) */
  primary: {
    background: 'var(--primary)', color: '#fff',
    borderRadius: 'var(--radius-control, 10px)', padding: '11px 22px',
    fontSize: 17, fontWeight: 400,
    boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.28), 0 1px 2px rgba(0,0,0,0.12)',
  },
  /* Bordered - Tinted */
  secondary: {
    background: 'color-mix(in srgb, var(--primary) 12%, transparent)', color: 'var(--primary)',
    border: '0.5px solid color-mix(in srgb, var(--primary) 28%, transparent)',
    borderRadius: 'var(--radius-control, 10px)', padding: '10.5px 21.5px',
    fontSize: 17, fontWeight: 400,
    backdropFilter: 'blur(10px)',
  },
  /* Borderless */
  ghost: {
    background: 'transparent', color: 'var(--primary)',
    borderRadius: 'var(--radius-control, 10px)', padding: '11px 22px',
    fontSize: 17, fontWeight: 400,
  },
  small: {
    padding: '7px 16px', fontSize: 14,
  },
  dark: {
    background: 'var(--ink)', color: 'var(--canvas)',
    borderRadius: 'var(--radius-sm)', padding: '8px 15px',
    fontSize: 14,
  },
};

function LedgerButton({ variant = 'primary', size, children, style, ...props }) {
  const [pressed, setPressed] = useState(false);
  const s = {
    ...btnStyles.base,
    ...btnStyles[variant],
    ...(size === 'small' ? btnStyles.small : {}),
    ...(pressed ? { transform: 'scale(0.97)' } : {}),
    ...style,
  };
  return (
    <button
      style={s}
      onMouseDown={() => setPressed(true)}
      onMouseUp={() => setPressed(false)}
      onMouseLeave={() => setPressed(false)}
      {...props}
    >
      {children}
    </button>
  );
}

/* ─── Input ─── */
const inputStyle = {
  width: '100%', padding: '10px 14px',
  border: '0.5px solid var(--hairline)', borderRadius: 'var(--radius-control, 10px)',
  background: 'color-mix(in srgb, var(--canvas) 92%, transparent)', color: 'var(--ink)',
  fontSize: 15, lineHeight: 1.4, letterSpacing: '-0.2px',
  fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'SF Pro Text', system-ui, sans-serif",
  transition: 'border-color 0.2s cubic-bezier(0.22,1,0.36,1), box-shadow 0.2s cubic-bezier(0.22,1,0.36,1)',
  outline: 'none',
};
const labelStyle = {
  display: 'block', fontSize: 13, fontWeight: 600,
  color: 'var(--ink-muted)', marginBottom: 5,
  letterSpacing: '-0.1px',
};

function LedgerInput({ label, style, ...props }) {
  const [focused, setFocused] = useState(false);
  return (
    <div style={style}>
      {label && <label style={labelStyle}>{label}</label>}
      <input
        style={{
          ...inputStyle,
          borderColor: focused ? 'var(--primary)' : 'var(--hairline)',
          boxShadow: focused ? '0 0 0 3px var(--primary-15)' : 'none',
        }}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        {...props}
      />
    </div>
  );
}

function LedgerSelect({ label, children, style, ...props }) {
  const [focused, setFocused] = useState(false);
  return (
    <div style={style}>
      {label && <label style={labelStyle}>{label}</label>}
      <select
        style={{
          ...inputStyle, appearance: 'none',
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='10' height='6' viewBox='0 0 10 6' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1l4 4 4-4' stroke='%236e6e73' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'no-repeat', backgroundPosition: 'right 12px center',
          paddingRight: 36,
          borderColor: focused ? 'var(--primary)' : 'var(--hairline)',
          boxShadow: focused ? '0 0 0 3px var(--primary-15)' : 'none',
        }}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        {...props}
      >
        {children}
      </select>
    </div>
  );
}

function LedgerTextarea({ label, style, ...props }) {
  const [focused, setFocused] = useState(false);
  return (
    <div style={style}>
      {label && <label style={labelStyle}>{label}</label>}
      <textarea
        style={{
          ...inputStyle, resize: 'vertical', minHeight: 72,
          borderColor: focused ? 'var(--primary)' : 'var(--hairline)',
          boxShadow: focused ? '0 0 0 3px var(--primary-15)' : 'none',
        }}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        {...props}
      />
    </div>
  );
}

/* ─── Badge ─── */
const badgeColors = {
  draft: { bg: 'var(--divider-soft)', color: 'var(--ink-muted)' },
  sent: { bg: '#FFF3E0', color: '#E65100' },
  paid: { bg: 'var(--primary-light)', color: 'var(--primary)' },
};
const badgeLabels = { draft: 'Návrh', sent: 'Odesláno', paid: 'Zaplaceno' };

function StatusBadge({ status }) {
  const c = badgeColors[status] || badgeColors.draft;
  return (
    <span style={{
      display: 'inline-block', padding: '4px 12px',
      borderRadius: 'var(--radius-pill)', fontSize: 12, fontWeight: 600,
      background: c.bg, color: c.color, letterSpacing: '-0.1px',
    }}>
      {badgeLabels[status] || status}
    </span>
  );
}

/* ─── Section divider ─── */
function SectionTitle({ children, style }) {
  return (
    <h3 style={{
      fontSize: 14, fontWeight: 600, color: 'var(--ink)',
      textTransform: 'uppercase', letterSpacing: '0.5px',
      paddingBottom: 12, borderBottom: '1px solid var(--divider-soft)',
      marginBottom: 20, ...style,
    }}>
      {children}
    </h3>
  );
}

/* ─── Modal ─── */
function Modal({ open, onClose, children, title, width = 480 }) {
  if (!open) return null;
  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 1000,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(8px)',
      animation: 'fadeIn 0.2s ease',
    }} onClick={onClose}>
      <div style={{
        background: 'var(--glass-lg, var(--canvas))', borderRadius: 'var(--radius-modal, 20px)',
        backdropFilter: 'blur(30px) saturate(200%)', WebkitBackdropFilter: 'blur(30px) saturate(200%)',
        padding: 20, width, maxWidth: '92vw', maxHeight: '90vh', overflowY: 'auto',
        boxShadow: 'inset 0 1px 0 var(--glass-specular, rgba(255,255,255,0.9)), 0 22px 70px rgba(0,0,0,0.22), 0 0 0 0.5px var(--glass-border, rgba(0,0,0,0.15))',
        animation: 'scaleIn 0.25s cubic-bezier(0.34,1.56,0.64,1)',
      }} onClick={e => e.stopPropagation()}>
        {title && (
          <h2 style={{
            fontSize: 24, fontWeight: 600, letterSpacing: '-0.28px',
            marginBottom: 20, color: 'var(--ink)',
          }}>{title}</h2>
        )}
        {children}
      </div>
    </div>
  );
}

/* ─── Currency formatter ─── */
function formatCZK(n, currency = 'CZK') {
  const symbols = { CZK: 'Kč', EUR: '€', USD: '$' };
  const formatted = new Intl.NumberFormat('cs-CZ', {
    minimumFractionDigits: 2, maximumFractionDigits: 2,
  }).format(n);
  if (currency === 'CZK') return `${formatted} Kč`;
  return `${symbols[currency] || currency} ${formatted}`;
}

function formatDate(d) {
  if (!d) return '';
  const parts = d.split('-');
  if (parts.length !== 3) return d;
  return `${parts[2]}. ${parts[1]}. ${parts[0]}`;
}

/* ─── QR Code generator (visual approximation) ─── */
function generateQRGrid(seed) {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = ((hash << 5) - hash) + seed.charCodeAt(i);
    hash |= 0;
  }
  const size = 21;
  const grid = Array.from({ length: size }, () => Array(size).fill(false));
  const addFinder = (ox, oy) => {
    for (let y = 0; y < 7; y++) {
      for (let x = 0; x < 7; x++) {
        const isBorder = x === 0 || x === 6 || y === 0 || y === 6;
        const isInner = x >= 2 && x <= 4 && y >= 2 && y <= 4;
        if (isBorder || isInner) grid[oy + y][ox + x] = true;
      }
    }
  };
  addFinder(0, 0);
  addFinder(size - 7, 0);
  addFinder(0, size - 7);
  // Timing patterns
  for (let i = 7; i < size - 7; i++) {
    grid[6][i] = i % 2 === 0;
    grid[i][6] = i % 2 === 0;
  }
  // Pseudo-random data
  let rng = Math.abs(hash) || 1;
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      if ((x < 8 && y < 8) || (x >= size - 8 && y < 8) || (x < 8 && y >= size - 8)) continue;
      if (x === 6 || y === 6) continue;
      rng = (rng * 1103515245 + 12345) & 0x7fffffff;
      grid[y][x] = (rng % 3) < 1;
    }
  }
  return grid;
}

function QRCode({ data, size = 80 }) {
  const grid = generateQRGrid(data || 'SPD');
  const cellSize = size / 21;
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <rect width={size} height={size} fill="white" />
      {grid.map((row, y) =>
        row.map((cell, x) =>
          cell ? <rect key={`${x}-${y}`} x={x * cellSize} y={y * cellSize} width={cellSize} height={cellSize} fill="#1d1d1f" /> : null
        )
      )}
    </svg>
  );
}

/* ─── Sample data ─── */
/* Invoice modes */
const INVOICE_MODES = {
  neplatce: { id: 'neplatce', label: 'Neplátce DPH', short: 'Neplátce', showDic: false, showVat: false, showDuzp: false, docTitle: 'FAKTURA' },
  neplatce_ucetnictvi: { id: 'neplatce_ucetnictvi', label: 'Neplátce + účetnictví', short: 'Neplátce+Úč.', showDic: false, showVat: false, showDuzp: true, docTitle: 'FAKTURA' },
  platce: { id: 'platce', label: 'Plátce DPH', short: 'Plátce DPH', showDic: true, showVat: true, showDuzp: true, docTitle: 'DAŇOVÝ DOKLAD' },
};

/* Invoice color presets */
const INVOICE_COLORS = [
  { hex: '#1A7F4B', label: 'Zelená' },
  { hex: '#0066CC', label: 'Modrá' },
  { hex: '#1d1d1f', label: 'Černá' },
  { hex: '#8B5CF6', label: 'Fialová' },
  { hex: '#C27D2E', label: 'Zlatá' },
];

function createSampleInvoice() {
  return {
    id: 'inv-' + Date.now(),
    number: 'FV2025001',
    dateIssued: '2025-05-15',
    dateDue: '2025-06-14',
    duzp: '2025-05-15',
    variableSymbol: '2025001',
    currency: 'CZK',
    vatRate: 21,
    mode: 'neplatce',
    status: 'draft',
    supplier: {
      name: 'Jan Novák',
      ico: '12345678',
      dic: 'CZ12345678',
      address: 'Štefánikova 15, 150 00 Praha 5',
      email: 'jan.novak@email.cz',
      bankAccount: 'CZ6508000000192000145',
      registryText: 'Podnikatel zapsán v živnostenském rejstříku vedeném MÚ Praha 5',
    },
    customer: {
      name: 'Firma ABC s.r.o.',
      ico: '87654321',
      dic: 'CZ87654321',
      address: 'Vodičkova 30, 110 00 Praha 1',
      email: 'info@firmaabc.cz',
    },
    items: [
      { id: 1, description: 'Webový design — homepage', quantity: 1, unitPrice: 25000 },
      { id: 2, description: 'Grafický návrh loga', quantity: 1, unitPrice: 8000 },
      { id: 3, description: 'SEO optimalizace', quantity: 5, unitPrice: 1500 },
    ],
    note: 'Děkujeme za spolupráci.',
  };
}

function createSampleHistory() {
  const base = { registryText: 'Podnikatel zapsán v živnostenském rejstříku vedeném MÚ Praha 5' };
  return [
    {
      id: 'inv-hist-1', number: 'FV2025001', dateIssued: '2025-05-15', dateDue: '2025-06-14', duzp: '2025-05-15',
      variableSymbol: '2025001', currency: 'CZK', vatRate: 21, mode: 'neplatce', status: 'draft',
      supplier: { name: 'Jan Novák', ico: '12345678', dic: 'CZ12345678', address: 'Štefánikova 15, 150 00 Praha 5', email: 'jan.novak@email.cz', bankAccount: 'CZ6508000000192000145', ...base },
      customer: { name: 'Firma ABC s.r.o.', ico: '87654321', dic: 'CZ87654321', address: 'Vodičkova 30, 110 00 Praha 1', email: 'info@firmaabc.cz' },
      items: [{ id: 1, description: 'Webový design — homepage', quantity: 1, unitPrice: 25000 }, { id: 2, description: 'Grafický návrh loga', quantity: 1, unitPrice: 8000 }, { id: 3, description: 'SEO optimalizace', quantity: 5, unitPrice: 1500 }],
      note: 'Děkujeme za spolupráci.',
    },
    {
      id: 'inv-hist-2', number: 'FV2025002', dateIssued: '2025-04-22', dateDue: '2025-05-22', duzp: '2025-04-22',
      variableSymbol: '2025002', currency: 'CZK', vatRate: 21, mode: 'platce', status: 'paid',
      supplier: { name: 'Jan Novák', ico: '12345678', dic: 'CZ12345678', address: 'Štefánikova 15, 150 00 Praha 5', email: 'jan.novak@email.cz', bankAccount: 'CZ6508000000192000145', ...base },
      customer: { name: 'Studio Kreativ s.r.o.', ico: '55667788', dic: 'CZ55667788', address: 'Národní 12, 110 00 Praha 1', email: 'info@studiokreativ.cz' },
      items: [{ id: 1, description: 'Správa sociálních sítí — duben', quantity: 1, unitPrice: 15000 }, { id: 2, description: 'PPC kampaň — Google Ads', quantity: 1, unitPrice: 12000 }],
      note: '',
    },
    {
      id: 'inv-hist-3', number: 'FV2025003', dateIssued: '2025-03-10', dateDue: '2025-04-09', duzp: '2025-03-10',
      variableSymbol: '2025003', currency: 'EUR', vatRate: 0, mode: 'neplatce', status: 'sent',
      supplier: { name: 'Jan Novák', ico: '12345678', dic: 'CZ12345678', address: 'Štefánikova 15, 150 00 Praha 5', email: 'jan.novak@email.cz', bankAccount: 'CZ6508000000192000145', ...base },
      customer: { name: 'GmbH Design Berlin', ico: '', dic: 'DE123456789', address: 'Friedrichstr. 45, 10117 Berlin', email: 'hello@gmbhdesign.de' },
      items: [{ id: 1, description: 'UI/UX Design — Mobile App', quantity: 1, unitPrice: 3500 }],
      note: 'Payment via SEPA transfer.',
    },
  ];
}

/* ─── Export to window ─── */
Object.assign(window, {
  ThemeCtx, accentCSS, Icons,
  LedgerButton, LedgerInput, LedgerSelect, LedgerTextarea,
  StatusBadge, SectionTitle, Modal,
  formatCZK, formatDate,
  generateQRGrid, QRCode,
  createSampleInvoice, createSampleHistory,
  INVOICE_MODES, INVOICE_COLORS,
});
