// ── VARIANT 5 · THE SPINE ─────────────────────────────────────────────────
// Strict 3-column, fully flat (no containers). The CENTER column IS the
// timeline — a thin vertical spine that owns its column as a pure graphic
// device. Status & ETA lead on the LEFT (most important per user). Your
// order + reference IDs + a fenced "For you" sit on the RIGHT.
const { useState: sS, useEffect: sE, useRef: sR } = React;

const S_INK = '#191714', S_ACC = '#E14328', S_MUT = '#8c877e', S_LINE = '#e8e5de', S_BG = '#fffdfa';
const SHair = ({ className }) => <div className={cn('h-px w-full', className)} style={{ background: S_LINE }} />;
const SKicker = ({ children, className }) => (
  <p className={cn('text-[11px] font-bold uppercase tracking-[0.2em]', className)} style={{ color: S_MUT }}>{children}</p>
);
const STEP_ICON_S = { placed: 'Package', dispatched: 'Truck', transit: 'Route', ofd: 'Truck', delivered: 'Home' };

function V5Header({ delivered, setDelivered }) {
  return (
    <header className="sticky top-0 z-40" style={{ background: 'rgba(255,253,250,.82)', backdropFilter: 'blur(10px)', borderBottom: `1px solid ${S_LINE}` }}>
      <div className="mx-auto flex max-w-[1280px] items-center justify-between gap-4 px-8 py-4">
        <span className="text-lg font-extrabold tracking-[0.04em]" style={{ color: S_INK }}>{ORDER.brand}<span style={{ color: S_ACC }}>.</span></span>
        <div className="flex items-center gap-5">
          <div className="tp-preview items-center gap-4 text-xs font-bold uppercase tracking-wide">
            {[['In Transit', false], ['Delivered', true]].map(([lbl, val]) => (
              <button key={lbl} onClick={() => setDelivered(val)} className="relative py-1" style={{ color: delivered === val ? S_INK : S_MUT }}>
                {lbl}{delivered === val && <span className="absolute inset-x-0 -bottom-px h-[2px]" style={{ background: S_ACC }} />}
              </button>
            ))}
          </div>
          <button className="flex items-center gap-1.5 text-sm font-bold" style={{ color: S_INK }}><Icons.Help size={16} /> Help</button>
        </div>
      </div>
    </header>
  );
}

// ── LEFT · Status & ETA hero (the headline moment — owns the column) ──
function V5Hero({ order, delivered }) {
  return (
    <ParallaxScene className="relative overflow-hidden pb-1">
      <Parallax s={32} className="pointer-events-none absolute -left-4 -top-8 select-none text-[200px] font-extrabold leading-none tracking-tight"
        style={{ color: S_ACC, opacity: 0.07, whiteSpace: 'nowrap' }}>{delivered ? 'HERE' : 'ETA'}</Parallax>
      <Parallax s={-14} className="pointer-events-none absolute -right-2 bottom-10 h-32 w-32 rounded-full" style={{ background: 'radial-gradient(circle, rgba(225, 67, 40, 0.08), transparent 70%)' }} />
      <div className="relative">
        <span className="inline-flex items-center gap-2">
          <span className="relative flex h-2.5 w-2.5">{!delivered && <span className="absolute inline-flex h-full w-full animate-ping rounded-full" style={{ background: S_ACC, opacity: .6 }} />}<span className="relative h-2.5 w-2.5 rounded-full" style={{ background: S_ACC }} /></span>
          <span className="text-xs font-bold uppercase tracking-[0.22em]" style={{ color: S_MUT }}>{order.status}</span>
        </span>
        <p className="mt-10 text-xs font-bold uppercase tracking-[0.2em]" style={{ color: S_MUT }}>{delivered ? 'Delivered on' : 'Estimated delivery'}</p>
        <Parallax s={-7} className="mt-2">
          <h1 className="text-[88px] font-extrabold leading-[0.88] tracking-[-0.03em]" style={{ color: S_INK }}>
            <Reveal as="span" className="block">{order.estDelivery.day}</Reveal>
            <Reveal as="span" delay={90} className="block" style={{ color: S_ACC }}>{order.estDelivery.date}</Reveal>
          </h1>
        </Parallax>
        <div className="mt-8 flex items-start gap-2.5 max-w-[440px]">
          <span className="mt-0.5 shrink-0" style={{ color: S_ACC }}>{delivered ? <Icons.Sparkles size={18} /> : <Icons.Info size={18} />}</span>
          <p className="text-[15px] font-medium leading-relaxed" style={{ color: S_INK }}>{order.banner}</p>
        </div>
      </div>
    </ParallaxScene>
  );
}

// ── CENTER · detailed journey, expandable inline under the current step ──
function V5SpineDetailed({ subEvents }) {
  const [open, setOpen] = sS(false);
  return (
    <div className="mt-2.5">
      {open && (
        <div className="mt-2 space-y-2.5">
          {subEvents.map((s, i) => (
            <Reveal key={i} delay={i * 80} y={8}>
              <div className="border-l-[2px] pl-3" style={{ borderColor: S_ACC }}>
                <p className="text-[12px] font-bold leading-tight" style={{ color: S_INK }}>{s.location}</p>
                <p className="mt-0.5 text-[11px]" style={{ color: S_MUT }}>{s.time}</p>
                <p className="text-[11px]" style={{ color: S_MUT }}>{s.remark}</p>
              </div>
            </Reveal>
          ))}
        </div>
      )}
      <button onClick={() => setOpen(o => !o)} className="mt-2 inline-flex items-center gap-1 text-[12px] font-bold" style={{ color: S_ACC }}>
        {open ? 'Hide journey' : 'See detailed journey'} <Icons.Chevron size={13} className={cn('transition-transform', open && 'rotate-180')} />
      </button>
    </div>
  );
}

// ── CENTER · The Spine — the column IS the timeline ───────────
function V5Spine({ order, delivered }) {
  const steps = order.timeline;
  const idx = delivered ? steps.length - 1 : 2;
  return (
    <div className="flex h-full justify-center">
      <div className="w-full max-w-[240px]">
        {steps.map((s, i) => {
          const done = delivered || i < idx, cur = !delivered && i === idx;
          const Icon = Icons[STEP_ICON_S[s.key]];
          const isLast = i === steps.length - 1;
          return (
            <div key={s.key} className="flex gap-3.5">
              <div className="relative flex w-9 shrink-0 flex-col items-center">
                <span className="z-10 flex h-9 w-9 items-center justify-center">
                  {done ? (
                    <span className="flex h-8 w-8 items-center justify-center rounded-full transition-colors duration-500" style={{ background: S_ACC, color: '#fff' }}>
                      <Icons.Check size={17} />
                    </span>
                  ) : cur ? (
                    <span className="relative flex h-9 w-9 items-center justify-center rounded-full ring-pulse-coral" style={{ background: S_BG, border: `2.5px solid ${S_ACC}`, color: S_ACC }}>
                      <Icon size={15} />
                    </span>
                  ) : (
                    <span className="flex h-8 w-8 items-center justify-center rounded-full" style={{ background: S_BG, border: `2px solid ${S_LINE}`, color: '#c9c4bb' }}>
                      <Icon size={14} />
                    </span>
                  )}
                </span>
                {!isLast && (
                  <span className="relative my-1.5 w-[2.5px] flex-1 overflow-hidden rounded-full" style={{ background: S_LINE }}>
                    <span className="absolute inset-x-0 top-0 h-full origin-top rounded-full transition-transform duration-[900ms] ease-out"
                      style={{ background: S_ACC, transform: done ? 'scaleY(1)' : 'scaleY(0)', transitionDelay: `${i * 180 + 400}ms` }} />
                  </span>
                )}
              </div>
              <div className={cn('min-w-0 flex-1', isLast ? 'pb-2' : 'pb-12')}>
                <div className="flex items-center gap-2">
                  <p className="whitespace-nowrap text-[15px] font-bold tracking-tight" style={{ color: done || cur ? S_INK : '#b5b0a7' }}>{s.label}</p>
                  {cur && <span className="text-[10px] font-bold uppercase tracking-wide" style={{ color: S_ACC }}>● Now</span>}
                </div>
                <p className="mt-0.5 text-[12px]" style={{ color: S_MUT }}>{s.date}{s.time && ` · ${s.time}`}</p>
                {s.subEvents && cur && <V5SpineDetailed subEvents={s.subEvents} />}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ── RIGHT · Your order + IDs + fenced For-you ─────────────────
function V5OrderItem({ it }) {
  const tilt = useTilt(7, 1.03);
  return (
    <div className="flex items-center gap-3.5">
      <div ref={tilt.ref} onMouseMove={tilt.onMouseMove} onMouseLeave={tilt.onMouseLeave} style={tilt.style} className="shrink-0">
        <ImagePlaceholder tone={it.tone} rounded="rounded-md" className="h-16 w-16" label="" />
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-[14px] font-bold leading-tight" style={{ color: S_INK }}>{it.name}</p>
        <p className="mt-0.5 text-[12px]" style={{ color: S_MUT }}>Size {it.size} · Qty {it.qty}</p>
      </div>
      <p className="shrink-0 text-[14px] font-bold tabular-nums" style={{ color: S_INK }}>{fmtINR(it.price * it.qty)}</p>
    </div>
  );
}

function V5RecCard({ p }) {
  const tilt = useTilt(8, 1.02);
  return (
    <div>
      <div ref={tilt.ref} onMouseMove={tilt.onMouseMove} onMouseLeave={tilt.onMouseLeave} style={tilt.style} className="relative">
        <ImagePlaceholder tone={p.tone} rounded="rounded-md" className="aspect-[4/5] w-full" label="product" />
        {p.best && <span className="absolute left-0 top-2 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white" style={{ background: S_ACC }}>Best Seller</span>}
      </div>
      <p className="mt-2 truncate text-[13px] font-bold" style={{ color: S_INK }}>{p.name}</p>
      <p className="text-[13px]"><span className="font-bold" style={{ color: S_INK }}>{fmtINR(p.price)}</span> <span className="line-through" style={{ color: S_MUT }}>{fmtINR(p.mrp)}</span> <span className="font-bold" style={{ color: S_ACC }}>-{p.off}%</span></p>
    </div>
  );
}

function V5Promo({ promo }) {
  const [copied, setCopied] = sS(false);
  const [page, setPage] = sS(0);
  const pages = Math.ceil(promo.products.length / 2);
  sE(() => { if (prefersReduced) return; const id = setInterval(() => setPage(p => (p + 1) % pages), 3800); return () => clearInterval(id); }, [pages]);
  const copy = () => { try { navigator.clipboard?.writeText(promo.coupon.code); } catch {} setCopied(true); setTimeout(() => setCopied(false), 1500); };
  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center justify-between">
        <SKicker>For you</SKicker>
        <span className="text-[10px] font-medium uppercase tracking-wider" style={{ color: '#bdb8af' }}>Sponsored</span>
      </div>
      <ParallaxScene className="relative -mx-1 overflow-hidden">
        <div className="relative overflow-hidden rounded-sm" style={{ background: S_ACC, minHeight: 210 }}>
          <Parallax s={20} className="pointer-events-none absolute -right-8 -top-10 text-[120px] font-extrabold leading-none" style={{ color: '#fff', opacity: 0.08 }}>%</Parallax>
          <Parallax s={-10} className="pointer-events-none absolute -bottom-10 -left-6 h-32 w-32 rounded-full" style={{ background: 'rgba(255,255,255,.12)' }} />
          <div className="relative p-5 text-white">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em]" style={{ opacity: .85 }}>{promo.bannerKicker}</span>
            <h4 className="mt-2 max-w-[15ch] text-[22px] font-extrabold leading-[1.02] tracking-tight">{promo.bannerTitle}</h4>
            <p className="mt-1.5 text-[13px] font-medium" style={{ opacity: .9 }}>{promo.bannerSub}</p>
            <button className="mt-3.5 inline-flex items-center gap-2 bg-white px-4 py-2.5 text-sm font-bold transition-all hover:gap-3" style={{ color: S_ACC }}>Shop Now <Icons.ArrowRight size={16} /></button>
          </div>
        </div>
      </ParallaxScene>
      <div>
        <SHair />
        <div className="flex items-center justify-between gap-3 py-3.5">
          <div className="min-w-0"><p className="truncate text-sm font-bold" style={{ color: S_INK }}>{promo.coupon.text}</p><p className="truncate text-xs" style={{ color: S_MUT }}>{promo.coupon.sub}</p></div>
          <button onClick={copy} className="flex shrink-0 items-center gap-1.5 text-xs font-extrabold uppercase tracking-wide" style={{ color: S_ACC }}>
            {copied ? <><Icons.Check size={14} /> Copied</> : <><Icons.Tag size={13} /> {promo.coupon.code}</>}
          </button>
        </div>
        <SHair />
      </div>
      <div>
        <div className="mb-3 flex items-center justify-between">
          <p className="text-sm font-bold" style={{ color: S_INK }}>{promo.recTitle}</p>
          <div className="flex gap-3">{[0, 1].map(d => <button key={d} onClick={() => setPage(p => (p + (d ? 1 : -1) + pages) % pages)} style={{ color: S_MUT }}><Icons.Chevron size={16} className={d ? '-rotate-90' : 'rotate-90'} /></button>)}</div>
        </div>
        <div className="overflow-hidden">
          <div className="flex gap-4 transition-transform duration-500 ease-out" style={{ transform: `translateX(calc(-${page * 100}% - ${page} * 1rem))` }}>
            {promo.products.map((p, i) => <div key={i} className="w-[calc(50%-0.5rem)] min-w-0 shrink-0"><V5RecCard p={p} /></div>)}
          </div>
        </div>
        <div className="mt-4 flex gap-1.5">{Array.from({ length: pages }).map((_, i) => <button key={i} onClick={() => setPage(i)} className="h-1 rounded-full transition-all duration-300" style={{ width: i === page ? 22 : 8, background: i === page ? S_ACC : S_LINE }} />)}</div>
      </div>
    </div>
  );
}

function V5YourOrder({ order }) {
  const total = useCountUp(order.sidebar.orderTotal, true);
  return (
    <div>
      <SKicker className="mb-4">Your order</SKicker>
      <div className="flex flex-col gap-4">
        {order.items.map((it, i) => <V5OrderItem key={i} it={it} />)}
      </div>
      <div className="mt-5">
        <SHair />
        <div className="flex items-end justify-between py-3.5">
          <span className="text-[11px] font-bold uppercase tracking-[0.18em]" style={{ color: S_MUT }}>Order Total</span>
          <span className="text-[26px] font-extrabold tracking-tight tabular-nums" style={{ color: S_INK }}>{fmtINR(total)}</span>
        </div>
        <SHair />
      </div>
    </div>
  );
}

function V5TrackingDetails({ order }) {
  const s = order.sidebar;
  const [copied, setCopied] = sS(false);
  const copy = () => { try { navigator.clipboard?.writeText(s.trackingId); } catch {} setCopied(true); setTimeout(() => setCopied(false), 1500); };
  return (
    <div>
      <SKicker className="mb-3">Tracking details</SKicker>
      <div className="flex flex-col gap-3">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.16em]" style={{ color: S_MUT }}>Tracking ID</p>
          <div className="flex items-center gap-1.5">
            <p className="font-mono text-[13px] font-bold tracking-tight" style={{ color: S_INK }}>{s.trackingId}</p>
            <button onClick={copy} style={{ color: copied ? S_ACC : S_MUT }}>{copied ? <Icons.Check size={13} /> : <Icons.Copy size={12} />}</button>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div><p className="text-[10px] font-bold uppercase tracking-[0.16em]" style={{ color: S_MUT }}>Order ID</p><p className="font-mono text-[13px] font-bold tracking-tight" style={{ color: S_INK }}>{s.orderId}</p></div>
          <div><p className="text-[10px] font-bold uppercase tracking-[0.16em]" style={{ color: S_MUT }}>Courier</p><p className="text-[13px] font-bold" style={{ color: S_INK }}>{s.courier}</p></div>
          <div><p className="text-[10px] font-bold uppercase tracking-[0.16em]" style={{ color: S_MUT }}>Order Date</p><p className="text-[13px] font-bold" style={{ color: S_INK }}>{s.orderDate}</p></div>
        </div>
      </div>
    </div>
  );
}

function V5DeliveringTo({ order }) {
  const s = order.sidebar;
  return (
    <div>
      <SKicker className="mb-3">Delivering to</SKicker>
      <p className="text-[15px] font-bold leading-relaxed" style={{ color: S_INK }}>{s.address}</p>
      <p className="mt-2 font-mono text-[13px]" style={{ color: S_MUT }}>+91 {s.mobile}</p>
    </div>
  );
}

function V5Footer() {
  return (
    <footer className="mt-6">
      <SHair />
      <div className="tp-foot py-8">
        <div>
          <span className="text-base font-extrabold tracking-[0.04em]" style={{ color: S_INK }}>{ORDER.brand}<span style={{ color: S_ACC }}>.</span></span>
          <p className="mt-3 text-[13px]" style={{ color: S_MUT }}>{ORDER.support.email}</p>
          <p className="text-[13px]" style={{ color: S_MUT }}>{ORDER.support.phone}</p>
        </div>
        <div>
          <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.18em]" style={{ color: S_MUT }}>Help & Policies</p>
          <ul className="space-y-2 text-[13px] font-medium" style={{ color: S_INK }}>{ORDER.policies.map(p => <li key={p}>{p}</li>)}</ul>
        </div>
        <div>
          <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.18em]" style={{ color: S_MUT }}>Get the app</p>
          <div className="flex flex-col gap-2 text-[13px] font-bold" style={{ color: S_INK }}><span>App Store →</span><span>Google Play →</span></div>
        </div>
      </div>
      <SHair />
      <div className="tp-foot-bottom flex items-center justify-between gap-2 py-5 text-xs" style={{ color: S_MUT }}>
        <span>© 2026 {ORDER.brand}. All rights reserved.</span>
        <span>Powered by <span className="font-bold" style={{ color: S_INK }}>ClickPost</span></span>
      </div>
    </footer>
  );
}

function SpinePage({ minH = 1720 }) {
  const [delivered, setDelivered] = sS(false);
  const ref = sR(null);
  const order = delivered ? deliveredOrder(ORDER) : ORDER;
  sE(() => { if (delivered) { const t = setTimeout(() => fireConfetti(ref.current), 250); return () => clearTimeout(t); } }, [delivered]);
  return (
    <div ref={ref} className="tp-root relative flex flex-col font-sans antialiased" style={{ minHeight: minH, background: S_BG, color: S_INK }}>
      <V5Header delivered={delivered} setDelivered={setDelivered} />
      <main className="mx-auto w-full max-w-[1280px] flex-1 px-8 py-10">
        <div className="tp-grid-spine" style={{ alignItems: 'start' }}>
          <Reveal className="min-w-0 flex flex-col gap-8">
            <V5Hero order={order} delivered={delivered} />
            <SHair />
            <V5YourOrder order={order} />
            <V5TrackingDetails order={order} />
          </Reveal>
          <Reveal delay={120} className="min-w-0">
            <V5Spine order={order} delivered={delivered} />
          </Reveal>
          <Reveal delay={260} className="min-w-0 flex flex-col gap-7">
            <V5DeliveringTo order={order} />
            <SHair />
            <V5Promo promo={order.promo} />
          </Reveal>
        </div>
        <V5Footer />
      </main>
    </div>
  );
}

Object.assign(window, { SpinePage });
