// ── VARIANT 3 · FLAT / NO CONTAINERS ──────────────────────────────────────
// No cards, borders, or shadows. Pure editorial: oversized type, hairline
// rules, generous whitespace, one accent. Same Flow-3 data & 3-column layout.
const { useState: fS, useEffect: fE, useRef: fR } = React;

const F_INK = '#191714';
const F_ACCENT = '#E14328';
const F_MUTED = '#8c877e';
const F_LINE = '#e7e4dd';
const Hair = ({ className }) => <div className={cn('h-px w-full', className)} style={{ background: F_LINE }} />;

function FlatProductCard({ p }) {
  const tilt = useTilt(8, 1.02);
  return (
    <div className="w-1/2 min-w-0 shrink-0 pr-3">
      <div ref={tilt.ref} onMouseMove={tilt.onMouseMove} onMouseLeave={tilt.onMouseLeave} style={tilt.style} className="relative">
        <ImagePlaceholder tone={p.tone} rounded="rounded-sm" className="aspect-[4/5] w-full" label="product" />
        {p.best && <span className="absolute left-0 top-2 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white" style={{ background: F_ACCENT }}>Best Seller</span>}
      </div>
      <p className="mt-2 truncate text-[13px] font-bold" style={{ color: F_INK }}>{p.name}</p>
      <p className="text-[13px]"><span className="font-bold" style={{ color: F_INK }}>{fmtINR(p.price)}</span> <span className="line-through" style={{ color: F_MUTED }}>{fmtINR(p.mrp)}</span> <span className="font-bold" style={{ color: F_ACCENT }}>-{p.off}%</span></p>
    </div>
  );
}

function FlatHeader({ delivered, setDelivered }) {
  return (
    <header className="sticky top-0 z-40" style={{ background: 'rgba(255,255,255,.82)', backdropFilter: 'blur(10px)', borderBottom: `1px solid ${F_LINE}` }}>
      <div className="mx-auto flex max-w-[1180px] items-center justify-between gap-4 px-8 py-4">
        <span className="text-lg font-extrabold tracking-[0.04em]" style={{ color: F_INK }}>{ORDER.brand}<span style={{ color: F_ACCENT }}>.</span></span>
        <div className="flex items-center gap-5">
          <div className="tp-preview items-center gap-4 text-xs font-bold uppercase tracking-wide">
            {[['In Transit', false], ['Delivered', true]].map(([lbl, val]) => (
              <button key={lbl} onClick={() => setDelivered(val)} className="relative py-1" style={{ color: delivered === val ? F_INK : F_MUTED }}>
                {lbl}{delivered === val && <span className="absolute inset-x-0 -bottom-px h-[2px]" style={{ background: F_ACCENT }} />}
              </button>
            ))}
          </div>
          <button className="flex items-center gap-1.5 text-sm font-bold" style={{ color: F_INK }}><Icons.Help size={16} /> Help</button>
        </div>
      </div>
    </header>
  );
}

function FlatHero({ order, delivered }) {
  const total = order.timeline.length;
  const idx = delivered ? total - 1 : 2;
  const frac = delivered ? 1 : idx / (total - 1);
  const [w, setW] = fS(0);
  fE(() => { const t = setTimeout(() => setW(frac), 200); return () => clearTimeout(t); }, [frac]);
  return (
    <ParallaxScene className="relative overflow-hidden pb-2 pt-1">
      {/* giant parallax background word */}
      <Parallax s={26} className="pointer-events-none absolute -right-4 -top-6 select-none text-[120px] font-extrabold leading-none tracking-tight"
        style={{ color: F_ACCENT, opacity: 0.07, whiteSpace: 'nowrap' }}>{delivered ? 'HERE' : 'ETA'}</Parallax>
      <div className="relative">
        <div className="flex items-center gap-2.5">
          <span className="relative flex h-2.5 w-2.5">{!delivered && <span className="absolute inline-flex h-full w-full animate-ping rounded-full" style={{ background: F_ACCENT, opacity: .6 }} />}<span className="relative h-2.5 w-2.5 rounded-full" style={{ background: F_ACCENT }} /></span>
          <span className="text-xs font-bold uppercase tracking-[0.22em]" style={{ color: F_MUTED }}>{order.status}</span>
        </div>
        <p className="mt-5 text-xs font-bold uppercase tracking-[0.2em]" style={{ color: F_MUTED }}>{delivered ? 'Delivered on' : 'Estimated delivery'}</p>
        <Parallax s={-8} className="mt-1">
          <h1 className="text-[58px] font-extrabold leading-[0.94] tracking-[-0.03em]" style={{ color: F_INK }}>
            <Reveal as="span" className="block">{order.estDelivery.day}</Reveal>
            <Reveal as="span" delay={90} className="block" style={{ color: F_ACCENT }}>{order.estDelivery.date}</Reveal>
          </h1>
        </Parallax>
        {/* flat progress line with dots */}
        <div className="relative mt-8">
          <div className="absolute left-0 right-0 top-1/2 h-[2px] -translate-y-1/2" style={{ background: F_LINE }} />
          <div className="absolute left-0 top-1/2 h-[2px] -translate-y-1/2 transition-[width] duration-[1300ms] ease-out" style={{ width: `${w * 100}%`, background: F_ACCENT }} />
          <div className="relative flex justify-between">
            {order.timeline.map((s, i) => (
              <span key={i} className="h-3 w-3 rounded-full transition-colors duration-500" style={{ background: (delivered || i <= idx) ? F_ACCENT : '#fff', border: `2px solid ${(delivered || i <= idx) ? F_ACCENT : F_LINE}` }} />
            ))}
          </div>
        </div>
      </div>
    </ParallaxScene>
  );
}

function FlatDetailed({ subEvents }) {
  const [open, setOpen] = fS(false);
  return (
    <div className="mt-3">
      {open && (
        <div className="mt-1 space-y-3">
          {subEvents.map((s, i) => (
            <Reveal key={i} delay={i * 80} y={8} className="flex gap-3">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: F_ACCENT }} />
              <div><p className="text-[13px] font-bold" style={{ color: F_INK }}>{s.location}</p><p className="text-xs" style={{ color: F_MUTED }}>{s.time} · {s.remark}</p></div>
            </Reveal>
          ))}
        </div>
      )}
      <button onClick={() => setOpen(o => !o)} className="mt-2 inline-flex items-center gap-1 text-[13px] font-bold" style={{ color: F_ACCENT }}>
        {open ? 'Hide detailed journey' : 'See detailed journey'} <Icons.Chevron size={14} className={cn('transition-transform', open && 'rotate-180')} />
      </button>
    </div>
  );
}

function FlatTimeline({ order, delivered }) {
  const steps = order.timeline;
  const idx = delivered ? steps.length - 1 : 2;
  return (
    <div>
      <p className="mb-1 text-xs font-bold uppercase tracking-[0.2em]" style={{ color: F_MUTED }}>Shipment progress</p>
      {steps.map((s, i) => {
        const done = delivered || i < idx, cur = !delivered && i === idx;
        const Icon = Icons[{ placed: 'Package', dispatched: 'Truck', transit: 'Route', ofd: 'Truck', delivered: 'Home' }[s.key]];
        return (
          <div key={s.key}>
            <Hair className="my-0" />
            <div className="flex items-start gap-4 py-4">
              <span className="mt-0.5" style={{ color: done ? F_ACCENT : cur ? F_INK : '#c9c4bb' }}>{done ? <Icons.Check size={20} /> : <Icon size={19} />}</span>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <p className="whitespace-nowrap text-[17px] font-bold tracking-tight" style={{ color: done || cur ? F_INK : '#b5b0a7' }}>{s.label}</p>
                  {cur && <span className="text-[10px] font-bold uppercase tracking-wide" style={{ color: F_ACCENT }}>● Now</span>}
                </div>
                <p className="mt-0.5 text-[13px]" style={{ color: F_MUTED }}>{s.date}{s.time && ` · ${s.time}`}</p>
                {s.subEvents && cur && <FlatDetailed subEvents={s.subEvents} />}
              </div>
            </div>
          </div>
        );
      })}
      <Hair />
    </div>
  );
}

function FlatSidebar({ s }) {
  const total = useCountUp(s.orderTotal, true);
  const Row = ({ label, value, mono, big }) => (
    <div className="py-3.5">
      <p className="text-[10px] font-bold uppercase tracking-[0.18em]" style={{ color: F_MUTED }}>{label}</p>
      <p className={cn(big ? 'text-2xl font-extrabold tracking-tight' : 'text-[15px] font-bold', mono && !big && 'font-mono tracking-tight')} style={{ color: F_INK }}>{value}</p>
    </div>
  );
  return (
    <div>
      <p className="mb-1 text-xs font-bold uppercase tracking-[0.2em]" style={{ color: F_MUTED }}>Order details</p>
      <div className="divide-y" style={{ borderColor: F_LINE }}>
        {[['Tracking ID', s.trackingId, true], ['Order ID', s.orderId, true], ['Courier', s.courier], ['Order Date', s.orderDate]].map(([l, v, m]) => <div key={l} style={{ borderTop: `1px solid ${F_LINE}` }}><Row label={l} value={v} mono={m} /></div>)}
        <div style={{ borderTop: `1px solid ${F_LINE}` }}><Row label="Order Total" value={fmtINR(total)} big /></div>
        <div style={{ borderTop: `1px solid ${F_LINE}` }}><Row label="Mobile No." value={s.mobile} mono /></div>
        <div style={{ borderTop: `1px solid ${F_LINE}`, borderBottom: `1px solid ${F_LINE}` }} className="py-3.5">
          <p className="text-[10px] font-bold uppercase tracking-[0.18em]" style={{ color: F_MUTED }}>Delivery Address</p>
          <p className="mt-1 text-[14px] font-medium leading-relaxed" style={{ color: F_INK }}>{s.address}</p>
        </div>
      </div>
    </div>
  );
}

function FlatPromo({ promo }) {
  const [copied, setCopied] = fS(false);
  const [page, setPage] = fS(0);
  const pages = Math.ceil(promo.products.length / 2);
  fE(() => { if (prefersReduced) return; const id = setInterval(() => setPage(p => (p + 1) % pages), 3800); return () => clearInterval(id); }, [pages]);
  const copy = () => { try { navigator.clipboard?.writeText(promo.coupon.code); } catch {} setCopied(true); setTimeout(() => setCopied(false), 1500); };
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <p className="text-xs font-bold uppercase tracking-[0.2em]" style={{ color: F_MUTED }}>For you</p>
        <span className="text-[10px] font-medium uppercase tracking-wider" style={{ color: '#bdb8af' }}>Sponsored</span>
      </div>
      {/* full-bleed flat color banner (no border/shadow) */}
      <ParallaxScene className="relative -mx-1 overflow-hidden">
        <div className="relative overflow-hidden rounded-sm" style={{ background: F_ACCENT, minHeight: 230 }}>
          <Parallax s={20} className="pointer-events-none absolute -right-6 -top-8 text-[120px] font-extrabold leading-none" style={{ color: '#fff', opacity: 0.1 }}>%</Parallax>
          <Parallax s={-10} className="pointer-events-none absolute -bottom-10 -left-6 h-32 w-32 rounded-full" style={{ background: 'rgba(255,255,255,.12)' }} />
          <div className="relative p-6 text-white">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em]" style={{ opacity: .85 }}>{promo.bannerKicker}</span>
            <h4 className="mt-2 max-w-[14ch] text-[26px] font-extrabold leading-[1.02] tracking-tight">{promo.bannerTitle}</h4>
            <p className="mt-1.5 text-[13px] font-medium" style={{ opacity: .9 }}>{promo.bannerSub}</p>
            <button className="mt-4 inline-flex items-center gap-2 bg-white px-4 py-2.5 text-sm font-bold transition-transform hover:gap-3" style={{ color: F_ACCENT }}>Shop Now <Icons.ArrowRight size={16} /></button>
          </div>
        </div>
      </ParallaxScene>
      {/* coupon — flat, hairline rule + accent text */}
      <div>
        <Hair />
        <div className="flex items-center justify-between gap-3 py-3.5">
          <div className="min-w-0"><p className="truncate text-sm font-bold" style={{ color: F_INK }}>{promo.coupon.text}</p><p className="truncate text-xs" style={{ color: F_MUTED }}>{promo.coupon.sub}</p></div>
          <button onClick={copy} className="flex shrink-0 items-center gap-1.5 text-xs font-extrabold uppercase tracking-wide" style={{ color: F_ACCENT }}>
            {copied ? <><Icons.Check size={14} /> Copied</> : <><Icons.Tag size={13} /> {promo.coupon.code}</>}
          </button>
        </div>
        <Hair />
      </div>
      {/* products — image + text, no card */}
      <div>
        <div className="mb-3 flex items-center justify-between">
          <p className="text-sm font-bold" style={{ color: F_INK }}>{promo.recTitle}</p>
          <div className="flex gap-3">{[0, 1].map(d => <button key={d} onClick={() => setPage(p => (p + (d ? 1 : -1) + pages) % pages)} style={{ color: F_MUTED }}><Icons.Chevron size={16} className={d ? '-rotate-90' : 'rotate-90'} /></button>)}</div>
        </div>
        <div className="overflow-hidden">
          <div className="flex transition-transform duration-500 ease-out" style={{ transform: `translateX(-${page * 100}%)` }}>
            {promo.products.map((p, i) => <FlatProductCard key={i} p={p} />)}
          </div>
        </div>
        <div className="mt-4 flex gap-1.5">{Array.from({ length: pages }).map((_, i) => <button key={i} onClick={() => setPage(i)} className="h-1 rounded-full transition-all duration-300" style={{ width: i === page ? 22 : 8, background: i === page ? F_ACCENT : F_LINE }} />)}</div>
      </div>
    </div>
  );
}

function FlatFooter() {
  return (
    <footer className="mt-4">
      <Hair />
      <div className="tp-foot py-8">
        <div>
          <span className="text-base font-extrabold tracking-[0.04em]" style={{ color: F_INK }}>{ORDER.brand}<span style={{ color: F_ACCENT }}>.</span></span>
          <p className="mt-3 text-[13px]" style={{ color: F_MUTED }}>{ORDER.support.email}</p>
          <p className="text-[13px]" style={{ color: F_MUTED }}>{ORDER.support.phone}</p>
        </div>
        <div>
          <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.18em]" style={{ color: F_MUTED }}>Help & Policies</p>
          <ul className="space-y-2 text-[13px] font-medium" style={{ color: F_INK }}>{ORDER.policies.map(p => <li key={p}>{p}</li>)}</ul>
        </div>
        <div>
          <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.18em]" style={{ color: F_MUTED }}>Get the app</p>
          <div className="flex flex-col gap-2 text-[13px] font-bold" style={{ color: F_INK }}><span>App Store →</span><span>Google Play →</span></div>
        </div>
      </div>
      <Hair />
      <div className="tp-foot-bottom flex items-center justify-between gap-2 py-5 text-xs" style={{ color: F_MUTED }}>
        <span>© 2026 {ORDER.brand}. All rights reserved.</span>
        <span>Powered by <span className="font-bold" style={{ color: F_INK }}>ClickPost</span></span>
      </div>
    </footer>
  );
}

function FlatPage({ minH = 1620 }) {
  const [delivered, setDelivered] = fS(false);
  const ref = fR(null);
  const order = delivered ? deliveredOrder(ORDER) : ORDER;
  fE(() => { if (delivered) { const t = setTimeout(() => fireConfetti(ref.current), 250); return () => clearTimeout(t); } }, [delivered]);
  return (
    <div ref={ref} className="tp-root relative flex flex-col font-sans antialiased" style={{ minHeight: minH, background: '#fffdfa', color: F_INK }}>
      <FlatHeader delivered={delivered} setDelivered={setDelivered} />
      <main className="mx-auto w-full max-w-[1180px] flex-1 px-8 py-10">
        <div className="tp-grid" style={{ columnGap: '3rem', rowGap: '2.5rem' }}>
          <div className="flex min-w-0 flex-col gap-7">
            <Reveal><FlatHero order={order} delivered={delivered} /></Reveal>
            <Reveal delay={140} className="flex items-start gap-3">
              <span className="mt-0.5" style={{ color: F_ACCENT }}>{delivered ? <Icons.Sparkles size={18} /> : <Icons.Info size={18} />}</span>
              <p className="text-[15px] font-medium leading-relaxed" style={{ color: F_INK }}>{order.banner}</p>
            </Reveal>
            <Reveal delay={200}><FlatTimeline order={order} delivered={delivered} /></Reveal>
          </div>
          <Reveal delay={120} className="min-w-0"><FlatSidebar s={order.sidebar} /></Reveal>
          <Reveal delay={260} className="tp-col3 min-w-0"><FlatPromo promo={order.promo} /></Reveal>
        </div>
        <FlatFooter />
      </main>
    </div>
  );
}

Object.assign(window, { FlatPage });
