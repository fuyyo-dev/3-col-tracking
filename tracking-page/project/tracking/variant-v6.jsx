// ── VARIANT 6 · MODULAR ───────────────────────────────────────────────────
// Two-tier structure from the user's sketch:
//   TOP — hero (left, wider) + delivering-to (right)
//   ── full-width hairline ──
//   BOTTOM — 3 columns: timeline | items + order details | upsell
// Same flat-no-container language as V3/V4/V5. Spacing tuned for premium.
const { useState: zS, useEffect: zE, useRef: zR } = React;

const Z_INK = '#191714', Z_ACC = '#E14328', Z_MUT = '#8c877e', Z_LINE = '#e8e5de', Z_BG = '#fffdfa';
const ZHair = ({ className }) => <div className={cn('h-px w-full', className)} style={{ background: Z_LINE }} />;
const ZKicker = ({ children, className }) => (
  <p className={cn('text-[11px] font-bold uppercase tracking-[0.2em]', className)} style={{ color: Z_MUT }}>{children}</p>
);
const STEP_ICON_Z = { placed: 'Package', dispatched: 'Truck', transit: 'Route', ofd: 'Truck', delivered: 'Home' };

function V6Header({ delivered, setDelivered }) {
  return (
    <header className="sticky top-0 z-40" style={{ background: 'rgba(255,253,250,.82)', backdropFilter: 'blur(10px)', borderBottom: `1px solid ${Z_LINE}` }}>
      <div className="mx-auto flex max-w-[1280px] items-center justify-between gap-4 px-8 py-4">
        <span className="text-lg font-extrabold tracking-[0.04em]" style={{ color: Z_INK }}>{ORDER.brand}<span style={{ color: Z_ACC }}>.</span></span>
        <div className="flex items-center gap-5">
          <div className="tp-preview items-center gap-4 text-xs font-bold uppercase tracking-wide">
            {[['In Transit', false], ['Delivered', true]].map(([lbl, val]) => (
              <button key={lbl} onClick={() => setDelivered(val)} className="relative py-1" style={{ color: delivered === val ? Z_INK : Z_MUT }}>
                {lbl}{delivered === val && <span className="absolute inset-x-0 -bottom-px h-[2px]" style={{ background: Z_ACC }} />}
              </button>
            ))}
          </div>
          <button className="flex items-center gap-1.5 text-sm font-bold" style={{ color: Z_INK }}><Icons.Help size={16} /> Help</button>
        </div>
      </div>
    </header>
  );
}

// ── TOP LEFT · Hero (status + ETA + banner) ───────────────────
function V6Hero({ order, delivered }) {
  return (
    <ParallaxScene className="relative overflow-hidden">
      {/* big outlined accent word, right side of the (2-col-wide) hero */}
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center justify-end overflow-hidden" style={{ maxWidth: '52%' }}>
        <Parallax s={20} className="select-none leading-none tracking-tighter" style={{
          fontSize: '104px', fontWeight: 800, color: 'transparent',
          WebkitTextStroke: '1.25px rgba(225, 67, 40, 0.10)', whiteSpace: 'nowrap', marginRight: '-2px' }}>
          {delivered ? 'HERE' : 'ETA'}
        </Parallax>
      </div>
      <div className="relative">
        <span className="inline-flex items-center gap-2 rounded-full py-1.5 pl-2.5 pr-3.5" style={{ background: 'rgba(225, 67, 40, 0.10)' }}>
          <span className="relative flex h-2 w-2">{!delivered && <span className="absolute inline-flex h-full w-full animate-ping rounded-full" style={{ background: Z_ACC, opacity: .6 }} />}<span className="relative h-2 w-2 rounded-full" style={{ background: Z_ACC }} /></span>
          <span className="whitespace-nowrap text-[11px] font-bold uppercase tracking-[0.16em]" style={{ color: Z_ACC }}>{order.status}</span>
        </span>
        <p className="mt-7 text-xs font-bold uppercase tracking-[0.2em]" style={{ color: Z_MUT }}>{delivered ? 'Delivered on' : 'Estimated delivery'}</p>
        <Parallax s={-6} className="mt-2">
          <h1 className="text-[72px] font-extrabold leading-[0.92] tracking-[-0.03em]" style={{ color: Z_INK }}>
            <Reveal as="span" className="inline">{order.estDelivery.day},</Reveal>{' '}
            <Reveal as="span" delay={90} className="inline" style={{ color: Z_ACC }}>{order.estDelivery.date}</Reveal>
          </h1>
        </Parallax>
        <div className="mt-7 flex items-start gap-2.5 max-w-[560px]">
          <span className="mt-0.5 shrink-0" style={{ color: Z_ACC }}>{delivered ? <Icons.Sparkles size={18} /> : <Icons.Info size={18} />}</span>
          <p className="text-[15px] font-medium leading-relaxed" style={{ color: Z_INK }}>{order.banner}</p>
        </div>
      </div>
    </ParallaxScene>
  );
}

// ── TOP RIGHT · Delivering to + at-a-glance milestone strip ───
function V6MilestoneGlance({ order, delivered }) {
  const steps = order.timeline;
  const total = steps.length;
  const idx = delivered ? total - 1 : 2;
  const frac = delivered ? 1 : idx / (total - 1);
  const [w, setW] = zS(0);
  zE(() => { const t = setTimeout(() => setW(frac), 250); return () => clearTimeout(t); }, [frac]);
  const SHORT = { placed: 'Placed', dispatched: 'Shipped', transit: 'Transit', ofd: 'Out', delivered: 'Delivered' };
  return (
    <div>
      <ZKicker className="mb-5">At a glance</ZKicker>
      <div className="relative">
        {/* track — connects first & last dot centers (dots are 14px → 7px half) */}
        <div className="absolute top-[6px] h-[2px]" style={{ left: '7px', right: '7px', background: Z_LINE }} />
        <div className="absolute top-[6px] h-[2px] transition-[width] duration-[1200ms] ease-out" style={{ left: '7px', width: `calc((100% - 14px) * ${w})`, background: Z_ACC }} />
        <div className="relative flex justify-between">
          {steps.map((s, i) => {
            const done = delivered || i < idx, cur = !delivered && i === idx;
            const align = i === 0 ? 'items-start' : i === total - 1 ? 'items-end' : 'items-center';
            return (
              <div key={s.key} className={cn('flex flex-col gap-2', align)}>
                <span className="relative flex h-[14px] w-[14px] items-center justify-center">
                  {cur && <span className="absolute inline-flex h-full w-full animate-ping rounded-full" style={{ background: Z_ACC, opacity: .5 }} />}
                  <span className="relative h-[14px] w-[14px] rounded-full transition-colors duration-500"
                    style={{ background: done || cur ? Z_ACC : Z_BG, border: `2px solid ${done || cur ? Z_ACC : Z_LINE}` }} />
                </span>
                <span className="text-[9.5px] font-bold uppercase tracking-wide leading-tight"
                  style={{ color: cur ? Z_ACC : done ? Z_INK : Z_MUT }}>{SHORT[s.key]}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ── TOP RIGHT · Delivering to + at-a-glance (fills column height evenly) ──
function V6DeliveringTo({ order, delivered }) {
  const s = order.sidebar;
  return (
    <div className="flex h-full flex-col justify-between gap-8">
      <div>
        <ZKicker className="mb-4">Delivering to</ZKicker>
        <p className="text-[18px] font-bold leading-snug tracking-tight" style={{ color: Z_INK }}>{s.address}</p>
        <div className="mt-4 flex items-center gap-2">
          <Icons.Phone size={13} style={{ color: Z_MUT }} />
          <p className="whitespace-nowrap font-mono text-[13px]" style={{ color: Z_MUT }}>+91 {s.mobile}</p>
        </div>
      </div>
      <V6MilestoneGlance order={order} delivered={delivered} />
    </div>
  );
}

// ── BOTTOM LEFT · Timeline ────────────────────────────────────
function V6SpineDetailed({ subEvents }) {
  const [open, setOpen] = zS(false);
  return (
    <div className="mt-2.5">
      {open && (
        <div className="mt-2 space-y-2.5">
          {subEvents.map((s, i) => (
            <Reveal key={i} delay={i * 80} y={8}>
              <div className="border-l-[2px] pl-3" style={{ borderColor: Z_ACC }}>
                <p className="text-[12px] font-bold leading-tight" style={{ color: Z_INK }}>{s.location}</p>
                <p className="mt-0.5 text-[11px]" style={{ color: Z_MUT }}>{s.time}</p>
                <p className="text-[11px]" style={{ color: Z_MUT }}>{s.remark}</p>
              </div>
            </Reveal>
          ))}
        </div>
      )}
      <button onClick={() => setOpen(o => !o)} className="mt-2 inline-flex items-center gap-1 text-[12px] font-bold" style={{ color: Z_ACC }}>
        {open ? 'Hide journey' : 'See detailed journey'} <Icons.Chevron size={13} className={cn('transition-transform', open && 'rotate-180')} />
      </button>
    </div>
  );
}

function V6Spine({ order, delivered }) {
  const steps = order.timeline;
  const idx = delivered ? steps.length - 1 : 2;
  return (
    <div>
      <ZKicker className="mb-5">Shipment progress</ZKicker>
      {steps.map((s, i) => {
        const done = delivered || i < idx, cur = !delivered && i === idx;
        const Icon = Icons[STEP_ICON_Z[s.key]];
        const isLast = i === steps.length - 1;
        return (
          <div key={s.key} className="flex gap-3.5">
            <div className="relative flex w-9 shrink-0 flex-col items-center">
              <span className="z-10 flex h-9 w-9 items-center justify-center">
                {done ? (
                  <span className="flex h-8 w-8 items-center justify-center rounded-full transition-colors duration-500" style={{ background: Z_ACC, color: '#fff' }}>
                    <Icons.Check size={17} />
                  </span>
                ) : cur ? (
                  <span className="relative flex h-9 w-9 items-center justify-center rounded-full ring-pulse-coral" style={{ background: Z_BG, border: `2.5px solid ${Z_ACC}`, color: Z_ACC }}>
                    <Icon size={15} />
                  </span>
                ) : (
                  <span className="flex h-8 w-8 items-center justify-center rounded-full" style={{ background: Z_BG, border: `2px solid ${Z_LINE}`, color: '#c9c4bb' }}>
                    <Icon size={14} />
                  </span>
                )}
              </span>
              {!isLast && (
                <span className="relative my-1.5 w-[2.5px] flex-1 overflow-hidden rounded-full" style={{ background: Z_LINE }}>
                  <span className="absolute inset-x-0 top-0 h-full origin-top rounded-full transition-transform duration-[900ms] ease-out"
                    style={{ background: Z_ACC, transform: done ? 'scaleY(1)' : 'scaleY(0)', transitionDelay: `${i * 180 + 400}ms` }} />
                </span>
              )}
            </div>
            <div className={cn('min-w-0 flex-1', isLast ? 'pb-2' : 'pb-9')}>
              <div className="flex items-center gap-2">
                <p className="whitespace-nowrap text-[15px] font-bold tracking-tight" style={{ color: done || cur ? Z_INK : '#b5b0a7' }}>{s.label}</p>
                {cur && <span className="text-[10px] font-bold uppercase tracking-wide" style={{ color: Z_ACC }}>● Now</span>}
              </div>
              <p className="mt-0.5 text-[12px]" style={{ color: Z_MUT }}>{s.date}{s.time && ` · ${s.time}`}</p>
              {s.subEvents && cur && <V6SpineDetailed subEvents={s.subEvents} />}
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ── BOTTOM CENTER · Product list + Order details ──────────────
function V6OrderItem({ it }) {
  const tilt = useTilt(7, 1.03);
  return (
    <div className="flex items-center gap-3.5">
      <div ref={tilt.ref} onMouseMove={tilt.onMouseMove} onMouseLeave={tilt.onMouseLeave} style={tilt.style} className="shrink-0">
        <ImagePlaceholder tone={it.tone} rounded="rounded-md" className="h-16 w-16" label="" />
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-[14px] font-bold leading-tight" style={{ color: Z_INK }}>{it.name}</p>
        <p className="mt-0.5 text-[12px]" style={{ color: Z_MUT }}>Size {it.size} · Qty {it.qty}</p>
      </div>
      <p className="shrink-0 text-[14px] font-bold tabular-nums" style={{ color: Z_INK }}>{fmtINR(it.price * it.qty)}</p>
    </div>
  );
}

function V6YourOrder({ order }) {
  const total = useCountUp(order.sidebar.orderTotal, true);
  return (
    <div>
      <ZKicker className="mb-5">Your order</ZKicker>
      <div className="flex flex-col gap-4">
        {order.items.map((it, i) => <V6OrderItem key={i} it={it} />)}
      </div>
      <div className="mt-6">
        <ZHair />
        <div className="flex items-end justify-between py-3.5">
          <span className="text-[11px] font-bold uppercase tracking-[0.18em]" style={{ color: Z_MUT }}>Order Total</span>
          <span className="text-[26px] font-extrabold tracking-tight tabular-nums" style={{ color: Z_INK }}>{fmtINR(total)}</span>
        </div>
        <ZHair />
      </div>
    </div>
  );
}

function V6OrderDetails({ order }) {
  const s = order.sidebar;
  const [copied, setCopied] = zS(false);
  const copy = () => { try { navigator.clipboard?.writeText(s.trackingId); } catch {} setCopied(true); setTimeout(() => setCopied(false), 1500); };
  return (
    <div>
      <ZKicker className="mb-4">Order details</ZKicker>
      <div className="grid grid-cols-2 gap-x-4 gap-y-4">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.16em]" style={{ color: Z_MUT }}>Tracking ID</p>
          <div className="flex items-center gap-1.5">
            <p className="font-mono text-[13px] font-bold tracking-tight" style={{ color: Z_INK }}>{s.trackingId}</p>
            <button onClick={copy} style={{ color: copied ? Z_ACC : Z_MUT }}>{copied ? <Icons.Check size={13} /> : <Icons.Copy size={12} />}</button>
          </div>
        </div>
        <div><p className="text-[10px] font-bold uppercase tracking-[0.16em]" style={{ color: Z_MUT }}>Order ID</p><p className="font-mono text-[13px] font-bold tracking-tight" style={{ color: Z_INK }}>{s.orderId}</p></div>
        <div><p className="text-[10px] font-bold uppercase tracking-[0.16em]" style={{ color: Z_MUT }}>Courier</p><p className="text-[13px] font-bold" style={{ color: Z_INK }}>{s.courier}</p></div>
        <div><p className="text-[10px] font-bold uppercase tracking-[0.16em]" style={{ color: Z_MUT }}>Order Date</p><p className="text-[13px] font-bold" style={{ color: Z_INK }}>{s.orderDate}</p></div>
      </div>
    </div>
  );
}

// ── BOTTOM RIGHT · Upsell ─────────────────────────────────────
function V6RecCard({ p }) {
  const tilt = useTilt(8, 1.02);
  return (
    <div>
      <div ref={tilt.ref} onMouseMove={tilt.onMouseMove} onMouseLeave={tilt.onMouseLeave} style={tilt.style} className="relative">
        <ImagePlaceholder tone={p.tone} rounded="rounded-md" className="aspect-[4/5] w-full" label="product" />
        {p.best && <span className="absolute left-0 top-2 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white" style={{ background: Z_ACC }}>Best Seller</span>}
      </div>
      <p className="mt-2 truncate text-[13px] font-bold" style={{ color: Z_INK }}>{p.name}</p>
      <p className="text-[13px]"><span className="font-bold" style={{ color: Z_INK }}>{fmtINR(p.price)}</span> <span className="line-through" style={{ color: Z_MUT }}>{fmtINR(p.mrp)}</span> <span className="font-bold" style={{ color: Z_ACC }}>-{p.off}%</span></p>
    </div>
  );
}

function V6Promo({ promo }) {
  const [copied, setCopied] = zS(false);
  const [page, setPage] = zS(0);
  const pages = Math.ceil(promo.products.length / 2);
  zE(() => { if (prefersReduced) return; const id = setInterval(() => setPage(p => (p + 1) % pages), 3800); return () => clearInterval(id); }, [pages]);
  const copy = () => { try { navigator.clipboard?.writeText(promo.coupon.code); } catch {} setCopied(true); setTimeout(() => setCopied(false), 1500); };
  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center justify-between">
        <ZKicker>For you</ZKicker>
        <span className="text-[10px] font-medium uppercase tracking-wider" style={{ color: '#bdb8af' }}>Sponsored</span>
      </div>
      <ParallaxScene className="relative -mx-1 overflow-hidden">
        <div className="relative overflow-hidden rounded-sm" style={{ background: Z_ACC, minHeight: 220 }}>
          <Parallax s={20} className="pointer-events-none absolute -right-8 -top-10 text-[120px] font-extrabold leading-none" style={{ color: '#fff', opacity: 0.08 }}>%</Parallax>
          <Parallax s={-10} className="pointer-events-none absolute -bottom-10 -left-6 h-32 w-32 rounded-full" style={{ background: 'rgba(255,255,255,.12)' }} />
          <div className="relative p-5 text-white">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em]" style={{ opacity: .85 }}>{promo.bannerKicker}</span>
            <h4 className="mt-2 max-w-[15ch] text-[22px] font-extrabold leading-[1.02] tracking-tight">{promo.bannerTitle}</h4>
            <p className="mt-1.5 text-[13px] font-medium" style={{ opacity: .9 }}>{promo.bannerSub}</p>
            <button className="mt-3.5 inline-flex items-center gap-2 bg-white px-4 py-2.5 text-sm font-bold transition-all hover:gap-3" style={{ color: Z_ACC }}>Shop Now <Icons.ArrowRight size={16} /></button>
          </div>
        </div>
      </ParallaxScene>
      <div>
        <ZHair />
        <div className="flex items-center justify-between gap-3 py-3.5">
          <div className="min-w-0"><p className="truncate text-sm font-bold" style={{ color: Z_INK }}>{promo.coupon.text}</p><p className="truncate text-xs" style={{ color: Z_MUT }}>{promo.coupon.sub}</p></div>
          <button onClick={copy} className="flex shrink-0 items-center gap-1.5 text-xs font-extrabold uppercase tracking-wide" style={{ color: Z_ACC }}>
            {copied ? <><Icons.Check size={14} /> Copied</> : <><Icons.Tag size={13} /> {promo.coupon.code}</>}
          </button>
        </div>
        <ZHair />
      </div>
      <div>
        <div className="mb-3 flex items-center justify-between">
          <p className="text-sm font-bold" style={{ color: Z_INK }}>{promo.recTitle}</p>
          <div className="flex gap-3">{[0, 1].map(d => <button key={d} onClick={() => setPage(p => (p + (d ? 1 : -1) + pages) % pages)} style={{ color: Z_MUT }}><Icons.Chevron size={16} className={d ? '-rotate-90' : 'rotate-90'} /></button>)}</div>
        </div>
        <div className="overflow-hidden">
          <div className="flex gap-4 transition-transform duration-500 ease-out" style={{ transform: `translateX(calc(-${page * 100}% - ${page} * 1rem))` }}>
            {promo.products.map((p, i) => <div key={i} className="w-[calc(50%-0.5rem)] min-w-0 shrink-0"><V6RecCard p={p} /></div>)}
          </div>
        </div>
        <div className="mt-4 flex gap-1.5">{Array.from({ length: pages }).map((_, i) => <button key={i} onClick={() => setPage(i)} className="h-1 rounded-full transition-all duration-300" style={{ width: i === page ? 22 : 8, background: i === page ? Z_ACC : Z_LINE }} />)}</div>
      </div>
    </div>
  );
}

function V6Footer() {
  return (
    <footer className="mt-12">
      <ZHair />
      <div className="tp-foot py-8">
        <div>
          <span className="text-base font-extrabold tracking-[0.04em]" style={{ color: Z_INK }}>{ORDER.brand}<span style={{ color: Z_ACC }}>.</span></span>
          <p className="mt-3 text-[13px]" style={{ color: Z_MUT }}>{ORDER.support.email}</p>
          <p className="text-[13px]" style={{ color: Z_MUT }}>{ORDER.support.phone}</p>
        </div>
        <div>
          <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.18em]" style={{ color: Z_MUT }}>Help & Policies</p>
          <ul className="space-y-2 text-[13px] font-medium" style={{ color: Z_INK }}>{ORDER.policies.map(p => <li key={p}>{p}</li>)}</ul>
        </div>
        <div>
          <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.18em]" style={{ color: Z_MUT }}>Get the app</p>
          <div className="flex flex-col gap-2 text-[13px] font-bold" style={{ color: Z_INK }}><span>App Store →</span><span>Google Play →</span></div>
        </div>
      </div>
      <ZHair />
      <div className="tp-foot-bottom flex items-center justify-between gap-2 py-5 text-xs" style={{ color: Z_MUT }}>
        <span>© 2026 {ORDER.brand}. All rights reserved.</span>
        <span>Powered by <span className="font-bold" style={{ color: Z_INK }}>ClickPost</span></span>
      </div>
    </footer>
  );
}

function ModularPage({ minH = 1480 }) {
  const [delivered, setDelivered] = zS(false);
  const ref = zR(null);
  const order = delivered ? deliveredOrder(ORDER) : ORDER;
  zE(() => { if (delivered) { const t = setTimeout(() => fireConfetti(ref.current), 250); return () => clearTimeout(t); } }, [delivered]);
  return (
    <div ref={ref} className="tp-root relative flex flex-col font-sans antialiased" style={{ minHeight: minH, background: Z_BG, color: Z_INK }}>
      <V6Header delivered={delivered} setDelivered={setDelivered} />
      <main className="mx-auto w-full max-w-[1280px] flex-1 px-8 py-12">
        {/* TOP — Hero + Delivering to (equal-height, balanced) */}
        <div className="tp-grid-v6-top" style={{ alignItems: 'stretch' }}>
          <Reveal className="v6-hero-span min-w-0 flex flex-col justify-center"><V6Hero order={order} delivered={delivered} /></Reveal>
          <Reveal delay={100} className="v6-divider min-w-0 h-full"><V6DeliveringTo order={order} delivered={delivered} /></Reveal>
        </div>
        {/* full-width hairline rule between tiers */}
        <div className="my-12"><ZHair /></div>
        {/* BOTTOM — Timeline | Product list + Order details | Upsell */}
        <div className="tp-grid-v6-bottom" style={{ alignItems: 'stretch' }}>
          <Reveal delay={160} className="min-w-0"><V6Spine order={order} delivered={delivered} /></Reveal>
          <Reveal delay={220} className="v6-divider min-w-0 flex flex-col gap-9">
            <V6YourOrder order={order} />
            <V6OrderDetails order={order} />
          </Reveal>
          <Reveal delay={280} className="v6-divider min-w-0"><V6Promo promo={order.promo} /></Reveal>
        </div>
        <V6Footer />
      </main>
    </div>
  );
}

Object.assign(window, { ModularPage });
