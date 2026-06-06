// ── VARIANT 7 · SINGLE-TIER 3-COLUMN ─────────────────────────────────────
// Col 1: EDD hero (V5 drama) + Shipment progress
// Col 2: Your order + Order total + Order details + Delivering to
// Col 3: For you (promo banner + coupon + recs)
// Footer: full-width below all 3 cols
// Flat / no-container language. Plus Jakarta Sans. Spacing tuned for premium.
const { useState: wS, useEffect: wE, useRef: wR } = React;

const W_INK = '#191714', W_ACC = '#E14328', W_MUT = '#8c877e', W_LINE = '#e8e5de', W_BG = '#fffdfa';
const WHair = ({ className }) => <div className={cn('h-px w-full', className)} style={{ background: W_LINE }} />;
const WKicker = ({ children, className }) => (
  <p className={cn('text-[11px] font-bold uppercase tracking-[0.2em]', className)} style={{ color: W_MUT }}>{children}</p>
);
const STEP_ICON_W = { placed: 'Package', dispatched: 'Truck', transit: 'Route', ofd: 'Truck', delivered: 'Home' };

// ── Header ────────────────────────────────────────────────────
function V7Header({ delivered, setDelivered }) {
  return (
    <header className="sticky top-0 z-40" style={{ background: 'rgba(255,253,250,.82)', backdropFilter: 'blur(10px)', borderBottom: `1px solid ${W_LINE}` }}>
      <div className="mx-auto flex max-w-[1280px] items-center justify-between gap-4 px-8 py-4">
        <span className="text-lg font-extrabold tracking-[0.04em]" style={{ color: W_INK }}>{ORDER.brand}<span style={{ color: W_ACC }}>.</span></span>
        <div className="flex items-center gap-5">
          <button className="flex items-center gap-1.5 text-sm font-bold" style={{ color: W_INK }}><Icons.Help size={16} /> Help</button>
        </div>
      </div>
    </header>
  );
}

// ── COL 1a · EDD Hero (V5 drama + V6 pill status + aurora bg) ─
function V7Hero({ order, delivered }) {
  const grainSvg = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='220' height='220'%3E%3Cfilter id='g'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.72' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='220' height='220' filter='url(%23g)' opacity='1'/%3E%3C/svg%3E")`;
  return (
    <ParallaxScene className="relative overflow-hidden rounded-sm pb-2" style={{ background: '#fffdfa' }}>
      {/* ── aurora orbs ── */}
      <div className="v7-orb1 pointer-events-none absolute -right-16 -top-20 h-[420px] w-[420px] rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(225,67,40,0.13) 0%, rgba(225,67,40,0.04) 55%, transparent 75%)',
          animation: 'auroraFloat1 13s ease-in-out infinite', filter: 'blur(8px)' }} />
      <div className="v7-orb2 pointer-events-none absolute -bottom-24 -left-16 h-[360px] w-[360px] rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(245,158,11,0.11) 0%, rgba(245,158,11,0.04) 55%, transparent 75%)',
          animation: 'auroraFloat2 17s ease-in-out infinite', filter: 'blur(12px)' }} />
      <div className="v7-orb3 pointer-events-none absolute left-1/3 top-1/4 h-[280px] w-[280px] rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(225,67,40,0.07) 0%, transparent 70%)',
          animation: 'auroraFloat3 11s ease-in-out infinite reverse', filter: 'blur(16px)' }} />
      {/* ── grain overlay ── */}
      <div className="v7-grain pointer-events-none absolute inset-0"
        style={{ backgroundImage: grainSvg, backgroundRepeat: 'repeat', backgroundSize: '220px 220px',
          opacity: 0.038, mixBlendMode: 'multiply',
          animation: 'grainShift 8s steps(1) infinite' }} />
      {/* ── large filled parallax watermark ── */}
      <Parallax s={32} className="pointer-events-none absolute -left-4 -top-8 select-none text-[200px] font-extrabold leading-none tracking-tight"
        style={{ color: W_ACC, opacity: 0.07, whiteSpace: 'nowrap' }}>{delivered ? 'HERE' : 'ETA'}</Parallax>
      {/* ── soft radial blob ── */}
      <Parallax s={-14} className="pointer-events-none absolute -right-2 bottom-10 h-32 w-32 rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(225, 67, 40, 0.08), transparent 70%)' }} />
      <div className="relative px-8 py-8">
        {/* V6 pill badge */}
        <span className="inline-flex items-center gap-2 rounded-full py-1.5 pl-2.5 pr-3.5" style={{ background: 'rgba(225, 67, 40, 0.10)' }}>
          <span className="relative flex h-2 w-2">
            {!delivered && <span className="absolute inline-flex h-full w-full animate-ping rounded-full" style={{ background: W_ACC, opacity: .6 }} />}
            <span className="relative h-2 w-2 rounded-full" style={{ background: W_ACC }} />
          </span>
          <span className="whitespace-nowrap text-[11px] font-bold uppercase tracking-[0.16em]" style={{ color: W_ACC }}>{order.status}</span>
        </span>
        <p className="mt-10 text-xs font-bold uppercase tracking-[0.2em]" style={{ color: W_MUT }}>{delivered ? 'Delivered on' : 'Estimated delivery'}</p>
        <Parallax s={-7} className="mt-2">
          <h1 className="text-[88px] font-extrabold leading-[0.88] tracking-[-0.03em]" style={{ color: W_INK }}>
            <Reveal as="span" className="block">{order.estDelivery.day}</Reveal>
            <Reveal as="span" delay={90} className="block" style={{ color: W_ACC }}>{order.estDelivery.date}</Reveal>
          </h1>
        </Parallax>
        <div className="mt-8 flex items-start gap-2.5">
          <span className="mt-0.5 shrink-0" style={{ color: W_ACC }}>{delivered ? <Icons.Sparkles size={18} /> : <Icons.Info size={18} />}</span>
          <p className="text-[15px] font-medium leading-relaxed" style={{ color: W_INK }}>{order.banner}</p>
        </div>
      </div>
    </ParallaxScene>
  );
}

// ── COL 1b · Shipment Progress ────────────────────────────────
function V7Detailed({ subEvents }) {
  const [open, setOpen] = wS(false);
  return (
    <div className="mt-2.5">
      {open && (
        <div className="mt-2 space-y-2.5">
          {subEvents.map((s, i) => (
            <Reveal key={i} delay={i * 80} y={8}>
              <div className="border-l-[2px] pl-3" style={{ borderColor: W_ACC }}>
                <p className="text-[12px] font-bold leading-tight" style={{ color: W_INK }}>{s.location}</p>
                <p className="mt-0.5 text-[11px]" style={{ color: W_MUT }}>{s.time}</p>
                <p className="text-[11px]" style={{ color: W_MUT }}>{s.remark}</p>
              </div>
            </Reveal>
          ))}
        </div>
      )}
      <button onClick={() => setOpen(o => !o)} className="mt-2 inline-flex items-center gap-1 text-[12px] font-bold" style={{ color: W_ACC }}>
        {open ? 'Hide journey' : 'See detailed journey'} <Icons.Chevron size={13} className={cn('transition-transform', open && 'rotate-180')} />
      </button>
    </div>
  );
}

function V7Timeline({ order, delivered }) {
  const steps = order.timeline;
  const idx = delivered ? steps.length - 1 : 2;
  return (
    <div className="flex h-full flex-col">
      <div>
        <WKicker className="mb-5">Shipment progress</WKicker>
        {steps.map((s, i) => {
        const done = delivered || i < idx, cur = !delivered && i === idx;
        const Icon = Icons[STEP_ICON_W[s.key]];
        const isLast = i === steps.length - 1;
        return (
          <div key={s.key} className="flex gap-3.5">
            <div className="relative flex w-9 shrink-0 flex-col items-center">
              <span className="z-10 flex h-9 w-9 items-center justify-center">
                {done ? (
                  <span className="flex h-8 w-8 items-center justify-center rounded-full transition-colors duration-500" style={{ background: W_ACC, color: '#fff' }}>
                    <Icons.Check size={17} />
                  </span>
                ) : cur ? (
                  <span className="relative flex h-9 w-9 items-center justify-center rounded-full ring-pulse-coral" style={{ background: W_BG, border: `2.5px solid ${W_ACC}`, color: W_ACC }}>
                    <Icon size={15} />
                  </span>
                ) : (
                  <span className="flex h-8 w-8 items-center justify-center rounded-full" style={{ background: W_BG, border: `2px solid ${W_LINE}`, color: '#c9c4bb' }}>
                    <Icon size={14} />
                  </span>
                )}
              </span>
              {!isLast && (
                <span className="relative my-1.5 w-[2.5px] flex-1 overflow-hidden rounded-full" style={{ background: W_LINE }}>
                  <span className="absolute inset-x-0 top-0 h-full origin-top rounded-full transition-transform duration-[900ms] ease-out"
                    style={{ background: W_ACC, transform: done ? 'scaleY(1)' : 'scaleY(0)', transitionDelay: `${i * 180 + 400}ms` }} />
                </span>
              )}
            </div>
            <div className={cn('min-w-0 flex-1', isLast ? 'pb-2' : 'pb-10')}>
              <div className="flex items-center gap-2">
                <p className="whitespace-nowrap text-[15px] font-bold tracking-tight" style={{ color: done || cur ? W_INK : '#b5b0a7' }}>{s.label}</p>
                {cur && <span className="text-[10px] font-bold uppercase tracking-wide" style={{ color: W_ACC }}>● Now</span>}
              </div>
              <p className="mt-0.5 text-[12px]" style={{ color: W_MUT }}>{s.date}{s.time && ` · ${s.time}`}</p>
              {s.subEvents && cur && <V7Detailed subEvents={s.subEvents} />}
            </div>
          </div>
        );
      })}
      </div>
      {/* fading spine tail — visual close to the timeline */}
      <div className="flex gap-3.5">
        <div className="flex w-9 shrink-0 flex-col items-center">
          <div className="w-[2.5px] rounded-full" style={{ height: 48, background: `linear-gradient(to bottom, ${W_ACC}55, transparent)` }} />
        </div>
        <div className="flex-1" />
      </div>
      {/* support block — mt-auto pushes it to bottom of the flex-col */}
      <div className="mt-auto pt-6 flex items-start gap-3">
        <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full" style={{ background: `rgba(225,67,40,0.08)`, color: W_ACC }}>
          <Icons.Help size={15} />
        </span>
        <div>
          <p className="text-[13px] font-bold" style={{ color: W_INK }}>Need help with this order?</p>
          <p className="mt-0.5 text-[12px]" style={{ color: W_MUT }}>{ORDER.support.email}</p>
          <p className="text-[12px]" style={{ color: W_MUT }}>{ORDER.support.phone}</p>
          <button className="mt-2 inline-flex items-center gap-1 text-[12px] font-bold" style={{ color: W_ACC }}>
            Contact support <Icons.ArrowRight size={13} />
          </button>
        </div>
      </div>
    </div>
  );
}

// ── COL 2 · Your order + total + order details + delivering to ─
function V7OrderItem({ it }) {
  const tilt = useTilt(7, 1.03);
  return (
    <div className="flex items-center gap-3.5">
      <div ref={tilt.ref} onMouseMove={tilt.onMouseMove} onMouseLeave={tilt.onMouseLeave} style={tilt.style} className="shrink-0">
        <ImagePlaceholder tone={it.tone} rounded="rounded-md" className="h-[60px] w-[60px]" label="" />
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-[14px] font-bold leading-tight" style={{ color: W_INK }}>{it.name}</p>
        <p className="mt-0.5 text-[12px]" style={{ color: W_MUT }}>Size {it.size} · Qty {it.qty}</p>
      </div>
      <p className="shrink-0 text-[14px] font-bold tabular-nums" style={{ color: W_INK }}>{fmtINR(it.price * it.qty)}</p>
    </div>
  );
}

function V7Col2({ order }) {
  const s = order.sidebar;
  const total = useCountUp(s.orderTotal, true);
  const [copied, setCopied] = wS(false);
  const copy = () => { try { navigator.clipboard?.writeText(s.trackingId); } catch {} setCopied(true); setTimeout(() => setCopied(false), 1500); };

  return (
    <div className="flex flex-col gap-0">
      {/* Your order */}
      <div>
        <WKicker className="mb-5">Your order</WKicker>
        <div className="flex flex-col gap-4">
          {order.items.map((it, i) => <V7OrderItem key={i} it={it} />)}
        </div>
      </div>

      {/* Order total */}
      <div className="mt-6">
        <WHair />
        <div className="flex items-end justify-between py-4">
          <span className="text-[11px] font-bold uppercase tracking-[0.18em]" style={{ color: W_MUT }}>Order Total</span>
          <span className="text-[28px] font-extrabold tracking-tight tabular-nums" style={{ color: W_INK }}>{fmtINR(total)}</span>
        </div>
        <WHair />
      </div>

      {/* Order details */}
      <div className="mt-7">
        <WKicker className="mb-4">Order details</WKicker>
        <div className="grid grid-cols-2 gap-x-5 gap-y-4">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.16em]" style={{ color: W_MUT }}>Tracking ID</p>
            <div className="flex items-center gap-1.5 mt-0.5">
              <p className="font-mono text-[13px] font-bold tracking-tight truncate" style={{ color: W_INK }}>{s.trackingId}</p>
              <button onClick={copy} className="shrink-0" style={{ color: copied ? W_ACC : W_MUT }}>
                {copied ? <Icons.Check size={13} /> : <Icons.Copy size={12} />}
              </button>
            </div>
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.16em]" style={{ color: W_MUT }}>Order ID</p>
            <p className="mt-0.5 font-mono text-[13px] font-bold tracking-tight" style={{ color: W_INK }}>{s.orderId}</p>
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.16em]" style={{ color: W_MUT }}>Courier</p>
            <p className="mt-0.5 text-[13px] font-bold" style={{ color: W_INK }}>{s.courier}</p>
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.16em]" style={{ color: W_MUT }}>Order Date</p>
            <p className="mt-0.5 text-[13px] font-bold" style={{ color: W_INK }}>{s.orderDate}</p>
          </div>
        </div>
      </div>

      {/* Delivering to */}
      <div className="mt-7">
        <WHair />
        <div className="mt-5">
          <WKicker className="mb-3">Delivering to</WKicker>
          <p className="text-[15px] font-bold leading-relaxed" style={{ color: W_INK }}>{s.address}</p>
          <div className="mt-3 flex items-center gap-2">
            <Icons.Phone size={13} style={{ color: W_MUT }} />
            <p className="font-mono text-[13px]" style={{ color: W_MUT }}>+91 {s.mobile}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── COL 3 · For you (promo banner + coupon + recs) ────────────
function V7RecCard({ p }) {
  const tilt = useTilt(8, 1.02);
  return (
    <div>
      <div ref={tilt.ref} onMouseMove={tilt.onMouseMove} onMouseLeave={tilt.onMouseLeave} style={tilt.style} className="relative">
        <ImagePlaceholder tone={p.tone} rounded="rounded-md" className="aspect-[4/5] w-full" label="product" />
        {p.best && <span className="absolute left-0 top-2 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white" style={{ background: W_ACC }}>Best Seller</span>}
      </div>
      <p className="mt-2 truncate text-[13px] font-bold" style={{ color: W_INK }}>{p.name}</p>
      <p className="text-[13px]">
        <span className="font-bold" style={{ color: W_INK }}>{fmtINR(p.price)}</span>{' '}
        <span className="line-through" style={{ color: W_MUT }}>{fmtINR(p.mrp)}</span>{' '}
        <span className="font-bold" style={{ color: W_ACC }}>-{p.off}%</span>
      </p>
    </div>
  );
}

function V7Col3({ promo }) {
  const [copied, setCopied] = wS(false);
  const [page, setPage] = wS(0);
  const pages = Math.ceil(promo.products.length / 2);
  wE(() => {
    if (prefersReduced) return;
    const id = setInterval(() => setPage(p => (p + 1) % pages), 3800);
    return () => clearInterval(id);
  }, [pages]);
  const copy = () => { try { navigator.clipboard?.writeText(promo.coupon.code); } catch {} setCopied(true); setTimeout(() => setCopied(false), 1500); };

  return (
    <div className="flex h-full flex-col gap-6">
      <div className="flex items-center justify-between">
        <WKicker>For you</WKicker>
        <span className="text-[10px] font-medium uppercase tracking-wider" style={{ color: '#bdb8af' }}>Sponsored</span>
      </div>

      {/* Promo banner — flex-1 so it grows to fill available col height */}
      <ParallaxScene className="relative flex-1 overflow-hidden">
        <div className="relative h-full overflow-hidden rounded-sm" style={{ background: W_ACC, minHeight: 200 }}>
          <Parallax s={20} className="pointer-events-none absolute -right-8 -top-10 text-[130px] font-extrabold leading-none" style={{ color: '#fff', opacity: 0.08 }}>%</Parallax>
          <Parallax s={-10} className="pointer-events-none absolute -bottom-10 -left-6 h-36 w-36 rounded-full" style={{ background: 'rgba(255,255,255,.10)' }} />
          <div className="relative p-6 text-white">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em]" style={{ opacity: .85 }}>{promo.bannerKicker}</span>
            <h4 className="mt-2 max-w-[15ch] text-[24px] font-extrabold leading-[1.02] tracking-tight">{promo.bannerTitle}</h4>
            <p className="mt-1.5 text-[13px] font-medium" style={{ opacity: .9 }}>{promo.bannerSub}</p>
            <button className="mt-4 inline-flex items-center gap-2 bg-white px-4 py-2.5 text-sm font-bold transition-all hover:gap-3" style={{ color: W_ACC }}>
              Shop Now <Icons.ArrowRight size={16} />
            </button>
          </div>
        </div>
      </ParallaxScene>

      {/* Coupon */}
      <div>
        <WHair />
        <div className="flex items-center justify-between gap-3 py-3.5">
          <div className="min-w-0">
            <p className="truncate text-sm font-bold" style={{ color: W_INK }}>{promo.coupon.text}</p>
            <p className="truncate text-xs mt-0.5" style={{ color: W_MUT }}>{promo.coupon.sub}</p>
          </div>
          <button onClick={copy} className="flex shrink-0 items-center gap-1.5 text-xs font-extrabold uppercase tracking-wide" style={{ color: W_ACC }}>
            {copied ? <><Icons.Check size={14} /> Copied</> : <><Icons.Tag size={13} /> {promo.coupon.code}</>}
          </button>
        </div>
        <WHair />
      </div>

      {/* Recommendations — fixed, sits below the growing banner */}
      <div>
        <div className="mb-3 flex items-center justify-between">
          <p className="text-sm font-bold" style={{ color: W_INK }}>{promo.recTitle}</p>
          <div className="flex gap-3">
            {[0, 1].map(d => (
              <button key={d} onClick={() => setPage(p => (p + (d ? 1 : -1) + pages) % pages)} style={{ color: W_MUT }}>
                <span style={{ display: 'block', transform: `rotate(${d ? -90 : 90}deg)` }}><Icons.Chevron size={16} /></span>
              </button>
            ))}
          </div>
        </div>
        <div className="overflow-hidden">
          <div className="flex gap-4 transition-transform duration-500 ease-out"
            style={{ transform: `translateX(calc(-${page * 100}% - ${page} * 1rem))` }}>
            {promo.products.map((p, i) => (
              <div key={i} className="w-[calc(50%-0.5rem)] min-w-0 shrink-0"><V7RecCard p={p} /></div>
            ))}
          </div>
        </div>
        <div className="mt-4 flex gap-1.5">
          {Array.from({ length: pages }).map((_, i) => (
            <button key={i} onClick={() => setPage(i)} className="h-1 rounded-full transition-all duration-300"
              style={{ width: i === page ? 22 : 8, background: i === page ? W_ACC : W_LINE }} />
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Footer ────────────────────────────────────────────────────
function V7Footer() {
  return (
    <footer className="mt-14">
      <WHair />
      <div className="tp-foot py-8">
        <div>
          <span className="text-base font-extrabold tracking-[0.04em]" style={{ color: W_INK }}>{ORDER.brand}<span style={{ color: W_ACC }}>.</span></span>
          <p className="mt-3 text-[13px]" style={{ color: W_MUT }}>{ORDER.support.email}</p>
          <p className="text-[13px]" style={{ color: W_MUT }}>{ORDER.support.phone}</p>
          <p className="mt-1 text-[11px]" style={{ color: W_MUT }}>{ORDER.support.hours}</p>
        </div>
        <div>
          <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.18em]" style={{ color: W_MUT }}>Help & Policies</p>
          <ul className="space-y-2 text-[13px] font-medium" style={{ color: W_INK }}>
            {ORDER.policies.map(p => <li key={p}><a className="cursor-pointer transition-colors hover:opacity-60">{p}</a></li>)}
          </ul>
        </div>
        <div>
          <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.18em]" style={{ color: W_MUT }}>Get the app</p>
          <div className="flex flex-col gap-2 text-[13px] font-bold" style={{ color: W_INK }}>
            <span>App Store →</span><span>Google Play →</span>
          </div>
        </div>
      </div>
      <WHair />
      <div className="tp-foot-bottom flex items-center justify-between gap-2 py-5 text-xs" style={{ color: W_MUT }}>
        <span>© 2026 {ORDER.brand}. All rights reserved.</span>
        <span>Powered by <span className="font-bold" style={{ color: W_INK }}>ClickPost</span></span>
      </div>
    </footer>
  );
}

// ── Page root ─────────────────────────────────────────────────
function SingleTierPage({ minH = 1520 }) {
  const [delivered, setDelivered] = wS(false);
  const ref = wR(null);
  const order = delivered ? deliveredOrder(ORDER) : ORDER;
  wE(() => { if (delivered) { const t = setTimeout(() => fireConfetti(ref.current), 250); return () => clearTimeout(t); } }, [delivered]);

  return (
    <div ref={ref} className="tp-root relative flex flex-col font-sans antialiased" style={{ minHeight: minH, background: W_BG, color: W_INK }}>
      <V7Header delivered={delivered} setDelivered={setDelivered} />
      <main className="mx-auto w-full max-w-[1280px] flex-1 px-8 py-12">
        <div className="tp-grid-v7">
          {/* EDD Hero — spans col 1+2 in desktop, full-width in tablet */}
          <Reveal className="v7-hero min-w-0">
            <V7Hero order={order} delivered={delivered} />
          </Reveal>
          {/* Shipment progress — col 1, row 2 */}
          <Reveal delay={100} className="v7-timeline min-w-0">
            <V7Timeline order={order} delivered={delivered} />
          </Reveal>
          {/* Your order + details + delivering to — col 2, row 2 */}
          <Reveal delay={160} className="v7-order v7-divider min-w-0">
            <V7Col2 order={order} />
          </Reveal>
          {/* For you — col 3, spans both rows */}
          <Reveal delay={240} className="v7-promo v7-divider min-w-0">
            <V7Col3 promo={order.promo} />
          </Reveal>
        </div>
        <V7Footer />
      </main>
    </div>
  );
}

Object.assign(window, { SingleTierPage });
