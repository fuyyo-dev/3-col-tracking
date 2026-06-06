// ── shadcn/ui-style primitives + animation helpers. Themed entirely through
// CSS variables (set per-direction on a wrapping .theme-* class).
const cn = (...a) => a.filter(Boolean).join(' ');
const { useState, useEffect, useRef, useCallback } = React;

const prefersReduced = typeof window !== 'undefined' &&
  window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// ── Card family ───────────────────────────────────────────────
const Card = ({ className, children, ...p }) => (
  <div className={cn('rounded-lg border border-border bg-card text-card-foreground shadow-sm', className)} {...p}>{children}</div>
);
const CardHeader = ({ className, children }) => (
  <div className={cn('flex flex-col gap-1.5 p-6', className)}>{children}</div>
);
const CardTitle = ({ className, children }) => (
  <h3 className={cn('font-semibold leading-none tracking-tight', className)}>{children}</h3>
);
const CardContent = ({ className, children }) => (
  <div className={cn('p-6 pt-0', className)}>{children}</div>
);

// ── Badge ─────────────────────────────────────────────────────
const Badge = ({ variant = 'default', className, children }) => {
  const v = {
    default: 'border-transparent bg-primary text-primary-foreground',
    secondary: 'border-transparent bg-secondary text-secondary-foreground',
    outline: 'text-foreground border-border',
    brand: 'border-transparent bg-brand text-brand-foreground',
    soft: 'border-transparent bg-brand/10 text-brand',
    highlight: 'border-transparent bg-highlight text-highlight-foreground',
  }[variant];
  return <span className={cn('inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold tracking-wide', v, className)}>{children}</span>;
};

// ── Button ────────────────────────────────────────────────────
const Btn = ({ variant = 'default', size = 'default', className, children, ...p }) => {
  const base = 'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 active:scale-[.98]';
  const variants = {
    default: 'bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm',
    brand: 'bg-brand text-brand-foreground hover:brightness-110 shadow-sm',
    secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
    outline: 'border border-border bg-card hover:bg-secondary text-foreground',
    ghost: 'hover:bg-secondary text-foreground',
    link: 'text-brand underline-offset-4 hover:underline p-0 h-auto font-semibold',
  };
  const sizes = { default: 'h-10 px-4 py-2', sm: 'h-9 px-3', lg: 'h-11 px-6 text-[15px]', icon: 'h-9 w-9' };
  return <button className={cn(base, variants[variant], variant !== 'link' && sizes[size], className)} {...p}>{children}</button>;
};

const Separator = ({ className }) => <div className={cn('h-px w-full bg-border', className)} />;

// ── Tooltip (lightweight) ─────────────────────────────────────
const Tooltip = ({ label, children }) => {
  const [show, setShow] = useState(false);
  return (
    <span className="relative inline-flex" onMouseEnter={() => setShow(true)} onMouseLeave={() => setShow(false)}>
      {children}
      <span className={cn('pointer-events-none absolute bottom-full left-1/2 z-30 mb-2 -translate-x-1/2 whitespace-nowrap rounded-md bg-primary px-2.5 py-1.5 text-xs font-medium text-primary-foreground shadow-lg transition-all duration-150',
        show ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-1')}>{label}</span>
    </span>
  );
};

// ── Reveal — mount-in fade/slide with optional stagger delay ───
const Reveal = ({ delay = 0, y = 14, className, as: Tag = 'div', children, ...p }) => {
  const [on, setOn] = useState(prefersReduced);
  useEffect(() => {
    if (prefersReduced) return;
    const t = setTimeout(() => setOn(true), 40 + delay);
    return () => clearTimeout(t);
  }, [delay]);
  return (
    <Tag className={cn('transition-all duration-700 ease-out will-change-transform', className)}
      style={{ opacity: on ? 1 : 0, transform: on ? 'none' : `translateY(${y}px)` }} {...p}>{children}</Tag>
  );
};

// ── Count-up number ───────────────────────────────────────────
function useCountUp(target, run = true, dur = 1100) {
  const [v, setV] = useState(prefersReduced || !run ? target : 0);
  useEffect(() => {
    if (prefersReduced || !run) { setV(target); return; }
    let raf, start;
    const tick = (t) => {
      if (!start) start = t;
      const p = Math.min(1, (t - start) / dur);
      const e = 1 - Math.pow(1 - p, 3);
      setV(Math.round(target * e));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    const safety = setTimeout(() => setV(target), dur + 250); // rAF can throttle in bg iframes
    return () => { cancelAnimationFrame(raf); clearTimeout(safety); };
  }, [target, run]);
  return v;
}

// ── Image placeholder — soft tonal gradient + mono caption. Tone key picks a
// hue so the promo grid reads as distinct products without faking real shots.
const TONES = {
  a: ['215 35% 88%', '215 30% 72%'], b: ['28 45% 88%', '24 40% 74%'],
  c: ['265 30% 89%', '262 28% 75%'], d: ['150 28% 86%', '155 26% 70%'],
  hero: ['var(--promo-h1)', 'var(--promo-h2)'],
};
const ImagePlaceholder = ({ label, tone = 'a', className, rounded = 'rounded-lg', children, kicker }) => {
  const [c1, c2] = TONES[tone] || TONES.a;
  return (
    <div className={cn('relative overflow-hidden', rounded, className)}
      style={{ background: `linear-gradient(135deg, hsl(${c1}), hsl(${c2}))` }}>
      <div className="absolute inset-0 opacity-[0.5]" style={{
        backgroundImage: 'repeating-linear-gradient(135deg, rgba(255,255,255,.18) 0 2px, transparent 2px 11px)' }} />
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-1 px-3 text-center">
        {kicker && <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-black/45">{kicker}</span>}
        {label && <span className="font-mono text-[10px] uppercase tracking-wider text-black/55">{label}</span>}
      </div>
      {children}
    </div>
  );
};

// ── Confetti — hand-rolled canvas burst inside a container. Respects reduced
// motion (no-op). Auto-removes after the run.
function fireConfetti(container) {
  if (prefersReduced || !container) return;
  const rect = container.getBoundingClientRect();
  const W = rect.width, H = rect.height;
  const cv = document.createElement('canvas');
  cv.width = W; cv.height = H;
  Object.assign(cv.style, { position: 'absolute', inset: '0', width: '100%', height: '100%', pointerEvents: 'none', zIndex: '60' });
  container.appendChild(cv);
  const ctx = cv.getContext('2d');
  const cols = ['#16a34a', '#f59e0b', '#6366f1', '#ec4899', '#06b6d4', '#84cc16'];
  const N = 150;
  const parts = Array.from({ length: N }, () => {
    const fromLeft = Math.random() < 0.5;
    return {
      x: fromLeft ? W * 0.08 : W * 0.92,
      y: H * 0.22,
      vx: (fromLeft ? 1 : -1) * (3 + Math.random() * 7),
      vy: -(6 + Math.random() * 9),
      g: 0.22 + Math.random() * 0.12,
      s: 4 + Math.random() * 6,
      rot: Math.random() * 6.28,
      vr: (Math.random() - 0.5) * 0.4,
      c: cols[(Math.random() * cols.length) | 0],
      shape: Math.random() < 0.5 ? 'rect' : 'circ',
    };
  });
  let frame = 0;
  const run = () => {
    frame++;
    ctx.clearRect(0, 0, W, H);
    let alive = false;
    for (const p of parts) {
      p.vy += p.g; p.x += p.vx; p.y += p.vy; p.vx *= 0.99; p.rot += p.vr;
      const op = Math.max(0, 1 - frame / 130);
      if (p.y < H + 30 && op > 0) alive = true;
      ctx.save(); ctx.globalAlpha = op; ctx.translate(p.x, p.y); ctx.rotate(p.rot); ctx.fillStyle = p.c;
      if (p.shape === 'rect') ctx.fillRect(-p.s / 2, -p.s / 2, p.s, p.s * 0.6);
      else { ctx.beginPath(); ctx.arc(0, 0, p.s / 2, 0, 6.28); ctx.fill(); }
      ctx.restore();
    }
    if (alive && frame < 150) requestAnimationFrame(run);
    else cv.remove();
  };
  requestAnimationFrame(run);
}

// ── Parallax engine ──────────────────────────────────────────
// ParallaxScene tracks pointer position within its bounds (normalized -1..1)
// and shares it via context. Children opt in with <Parallax s={strength}>.
// Scoped per-scene so re-renders stay local (don't wrap a whole page).
const ParallaxCtx = React.createContext({ x: 0, y: 0, on: false });
const ParallaxScene = ({ className, style, children, as: Tag = 'div', ...p }) => {
  const ref = useRef(null);
  const [pt, setPt] = useState({ x: 0, y: 0, on: false });
  const onMove = (e) => {
    if (prefersReduced || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    setPt({ x: ((e.clientX - r.left) / r.width - 0.5) * 2, y: ((e.clientY - r.top) / r.height - 0.5) * 2, on: true });
  };
  return (
    <Tag ref={ref} onMouseMove={onMove} onMouseLeave={() => setPt({ x: 0, y: 0, on: false })} className={className} style={style} {...p}>
      <ParallaxCtx.Provider value={pt}>{children}</ParallaxCtx.Provider>
    </Tag>
  );
};
// s = px translate strength (can be negative for opposite-direction depth);
// rot = deg of rotation coupled to x; z adds a subtle scale on hover.
const Parallax = ({ s = 16, rot = 0, z = 0, className, style, children, as: Tag = 'div' }) => {
  const p = React.useContext(ParallaxCtx);
  const scale = z && p.on ? ` scale(${1 + z})` : '';
  const rotate = rot ? ` rotate(${(p.x * rot).toFixed(2)}deg)` : '';
  return (
    <Tag className={className} style={{
      transform: `translate3d(${(p.x * s).toFixed(2)}px, ${(p.y * s).toFixed(2)}px, 0)${rotate}${scale}`,
      transition: 'transform .28s cubic-bezier(.2,.8,.2,1)', ...style }}>{children}</Tag>
  );
};
// Pointer tilt for cards/images (local state, no context).
function useTilt(max = 9, scale = 1.03) {
  const ref = useRef(null);
  const [st, setSt] = useState({});
  const onMove = (e) => {
    if (prefersReduced || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5, py = (e.clientY - r.top) / r.height - 0.5;
    setSt({ transform: `perspective(700px) rotateX(${(-py * max).toFixed(2)}deg) rotateY(${(px * max).toFixed(2)}deg) scale(${scale})` });
  };
  const onLeave = () => setSt({ transform: 'perspective(700px) rotateX(0deg) rotateY(0deg) scale(1)' });
  return { ref, style: { transformStyle: 'preserve-3d', transition: 'transform .25s ease', ...st }, onMouseMove: onMove, onMouseLeave: onLeave };
}

Object.assign(window, { cn, prefersReduced, Card, CardHeader, CardTitle, CardContent, Badge, Btn, Separator, Tooltip, Reveal, useCountUp, ImagePlaceholder, fireConfetti, ParallaxScene, Parallax, useTilt });
