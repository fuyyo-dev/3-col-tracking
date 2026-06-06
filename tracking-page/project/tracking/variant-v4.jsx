// ── VARIANT 4 · CENTER STAGE ──────────────────────────────────────────────
// Flat / no-container language, restructured: the journey (hero + timeline)
// takes the wide CENTER column; order details are SPLIT — "Your order"
// (items + total + delivery) on the LEFT, reference IDs + the For-you/promo
// surface on the RIGHT. Same Flow-3 data + order line items.
const { useState: vS, useEffect: vE, useRef: vR } = React;

const V_INK = '#191714', V_ACC = '#E14328', V_MUT = '#8c877e', V_LINE = '#e8e5de', V_BG = '#fffdfa';
const VHair = ({ className }) => <div className={cn('h-px w-full', className)} style={{ background: V_LINE }} />;
const VKicker = ({ children, className }) => (
  <p className={cn('text-[11px] font-bold uppercase tracking-[0.2em]', className)} style={{ color: V_MUT }}>{children}</p>
);
const STEP_ICON_V = { placed: 'Package', dispatched: 'Truck', transit: 'Route', ofd: 'Truck', delivered: 'Home' };

function V4Header({ delivered, setDelivered }) {
  return (
    <header className="sticky top-0 z-40" style={{ background: 'rgba(255,253,250,.82)', backdropFilter: 'blur(10px)', borderBottom: `1px solid ${V_LINE}` }}>
      <div className="mx-auto flex max-w-[1240px] items-center justify-between gap-4 px-8 py-4">
        <span className="text-lg font-extrabold tracking-[0.04em]" style={{ color: V_INK }}>{ORDER.brand}<span style={{ color: V_ACC }}>.</span></span>
        <div className="flex items-center gap-5">
          <div className="tp-preview items-center gap-4 text-xs font-bold uppercase tracking-wide">
            {[['In Transit', false], ['Delivered', true]].map(([lbl, val]) => (
              <button key={lbl} onClick={() => setDelivered(val)} className="relative py-1" style={{ color: delivered === val ? V_INK : V_MUT }}>
                {lbl}{delivered === val && <span className="absolute inset-x-0 -bottom-px h-[2px]" style={{ background: V_ACC }} />}
              </button>
            ))}
          </div>
          <button className="flex items-center gap-1.5 text-sm font-bold" style={{ color: V_INK }}><Icons.Help size={16} /> Help</button>
        </div>
      </div>
    </header>
  );
}

// ── CENTER · the journey ──────────────────────────────────────
function V4Hero({ order, delivered }) {
  const total = order.timeline.length;
  const idx = delivered ? total - 1 : 2;
  const frac = delivered ? 1 : idx / (total - 1);
  const [w, setW] = vS(0);
  vE(() => { const t = setTimeout(() => setW(frac), 200); return () => clearTimeout(t); }, [frac]);
  return (
    <ParallaxScene className="relative overflow-hidden pb-2 pt-2 text-center">
      <Parallax s={24} className="pointer-events-none absolute left-1/2 -top-10 -translate-x-1/2 select-none text-[150px] font-extrabold leading-none tracking-tight"
        style={{ color: V_ACC, opacity: 0.06, whiteSpace: 'nowrap' }}>{delivered ? 'HERE' : 'ETA'}</Parallax>
      <div className="relative">
        <span className="inline-flex items-center gap-2">
          <span className="relative flex h-2.5 w-2.5">{!delivered && <span className="absolute inline-flex h-full w-full animate-ping rounded-full" style={{ background: V_ACC, opacity: .6 }} />}<span className="relative h-2.5 w-2.5 rounded-full" style={{ background: V_ACC }} /></span>
          <span className="text-xs font-bold uppercase tracking-[0.22em]" style={{ color: V_MUT }}>{order.status}</span>
        </span>
        <p className="mt-6 text-xs font-bold uppercase tracking-[0.2em]" style={{ color: V_MUT }}>{delivered ? 'Delivered on' : 'Estimated delivery'}</p>
        <Parallax s={-7} className="mt-1.5">
          <h1 className="text-[64px] font-extrabold leading-[0.92] tracking-[-0.03em]" style={{ color: V_INK }}>
            <Reveal as="span" className="block">{order.estDelivery.day}</Reveal>
            <Reveal as="span" delay={90} className="block" style={{ color: V_ACC }}>{order.estDelivery.date}</Reveal>
          </h1>
        </Parallax>
        {/* centered flat progress line */}
        <div className="relative mx-auto mt-9 max-w-[440px]">
          <div className="absolute left-0 right-0 top-1/2 h-[2px] -translate-y-1/2" style={{ background: V_LINE }} />
          <div className="absolute left-0 top-1/2 h-[2px] -translate-y-1/2 transition-[width] duration-[1300ms] ease-out" style={{ width: `${w * 100}%`, background: V_ACC }} />
          <div className="relative flex justify-between">
            {order.timeline.map((s, i) => (
              <span key={i} className="h-3 w-3 rounded-full transition-colors duration-500" style={{ background: (delivered || i <= idx) ? V_ACC : V_BG, border: `2px solid ${(delivered || i <= idx) ? V_ACC : V_LINE}` }} />
            ))}
          </div>
        </div>
      </div>
    </ParallaxScene>
  );
}

function V4Detailed({ subEvents }) {
  const [open, setOpen] = vS(false);
  return (
    <div className="mt-3">
      {open && (
        <div className="mt-1 space-y-3">
          {subEvents.map((s, i) => (
            <Reveal key={i} delay={i * 80} y={8} className="flex gap-3">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: V_ACC }} />
              <div><p className="text-[13px] font-bold" style={{ color: V_INK }}>{s.location}</p><p className="text-xs" style={{ color: V_MUT }}>{s.time} · {s.remark}</p></div>
            </Reveal>
          ))}
        </div>
      )}
      <button onClick={() => setOpen(o => !o)} className="mt-2 inline-flex items-center gap-1 text-[13px] font-bold" style={{ color: V_ACC }}>
        {open ? 'Hide detailed journey' : 'See detailed journey'} <Icons.Chevron size={14} className={cn('transition-transform', open && 'rotate-180')} />
      </button>
    </div>
  );
}

function V4Timeline({ order, delivered }) {
  const steps = order.timeline;
  const idx = delivered ? steps.length - 1 : 2;
  return (
    <div className="mx-auto max-w-[460px]">
      {steps.map((s, i) => {
        const done = delivered || i < idx, cur = !delivered && i === idx;
        const Icon = Icons[STEP_ICON_V[s.key]];
        const isLast = i === steps.length - 1;
        return (
          <div key={s.key} className="flex gap-4">
            <div className="relative flex w-7 shrink-0 flex-col items-center">
              <span className="z-10 mt-0.5" style={{ color: done ? V_ACC : cur ? V_INK : '#c9c4bb' }}>{done ? <Icons.Check size={22} /> : <Icon size={20} />}</span>
              {!isLast && <span className="relative my-1.5 w-[2px] flex-1 overflow-hidden rounded-full" style={{ background: V_LINE }}>
                <span className="absolute inset-x-0 top-0 h-full origin-top rounded-full transition-transform duration-700 ease-out" style={{ background: V_ACC, transform: done ? 'scaleY(1)' : 'scaleY(0)', transitionDelay: `${i * 160 + 300}ms` }} />
              </span>}
            </div>
            <div className={cn('min-w-0 flex-1', isLast ? 'pb-1' : 'pb-7')}>
              <div className="flex items-center gap-2">
                <p className="whitespace-nowrap text-[17px] font-bold tracking-tight" style={{ color: done || cur ? V_INK : '#b5b0a7' }}>{s.label}</p>
                {cur && <span className="text-[10px] font-bold uppercase tracking-wide" style={{ color: V_ACC }}>● Now</span>}
              </div>
              <p className="mt-0.5 text-[13px]" style={{ color: V_MUT }}>{s.date}{s.time && ` · ${s.time}`}</p>
              {s.subEvents && cur && <V4Detailed subEvents={s.subEvents} />}
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ── LEFT · your order (items + total + delivery) ──────────────
function V4OrderItem({ it }) {
  const tilt = useTilt(7, 1.03);
  return (
    <div className="flex items-center gap-3.5">
      <div ref={tilt.ref} onMouseMove={tilt.onMouseMove} onMouseLeave={tilt.onMouseLeave} style={tilt.style} className="shrink-0">
        <ImagePlaceholder tone={it.tone} rounded="rounded-md" className="h-16 w-16" label="" />
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-[14px] font-bold leading-tight" style={{ color: V_INK }}>{it.name}</p>
        <p className="mt-0.5 text-[12px]" style={{ color: V_MUT }}>Size {it.size} · Qty {it.qty}</p>
      </div>
      <p className="shrink-0 text-[14px] font-bold tabular-nums" style={{ color: V_INK }}>{fmtINR(it.price * it.qty)}</p>
    </div>
  );
}

function V4LeftColumn({ order }) {
  const s = order.sidebar;
  const total = useCountUp(s.orderTotal, true);
  return (
    <div className="flex flex-col gap-7">
      <div>
        <VKicker className="mb-4">Your order</VKicker>
        <div className="flex flex-col gap-4">
          {order.items.map((it, i) => <V4OrderItem key={i} it={it} />)}
        </div>
      </div>
      <div>
        <VHair />
        <div className="flex items-end justify-between py-4">
          <span className="text-[11px] font-bold uppercase tracking-[0.18em]" style={{ color: V_MUT }}>Order Total</span>
          <span className="text-[28px] font-extrabold tracking-tight tabular-nums" style={{ color: V_INK }}>{fmtINR(total)}</span>
        </div>
        <VHair />
      </div>
      <div>
        <VKicker className="mb-3">Delivering to</VKicker>
        <p className="text-[15px] font-bold leading-relaxed" style={{ color: V_INK }}>{s.address}</p>
        <p className="mt-2 font-mono text-[13px]" style={{ color: V_MUT }}>+91 {s.mobile}</p>
      </div>
    </div>
  );
}

// ── RIGHT · reference IDs + For-you / promo ───────────────────
function V4RightColumn({ order }) {
  const s = order.sidebar;
  const [copied, setCopied] = vS(false);
  const copy = () => { try { navigator.clipboard?.writeText(s.trackingId); } catch {} setCopied(true); setTimeout(() => setCopied(false), 1500); };
  return (
    <div className="flex flex-col gap-7">
      {/* reference IDs — quiet */}
      <div>
        <VKicker className="mb-3">Tracking details</VKicker>
        <div className="flex flex-col gap-3">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.16em]" style={{ color: V_MUT }}>Tracking ID</p>
            <div className="flex items-center gap-1.5">
              <p className="font-mono text-[13px] font-bold tracking-tight" style={{ color: V_INK }}>{s.trackingId}</p>
              <button onClick={copy} style={{ color: copied ? V_ACC : V_MUT }}>{copied ? <Icons.Check size={13} /> : <Icons.Copy size={12} />}</button>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div><p className="text-[10px] font-bold uppercase tracking-[0.16em]" style={{ color: V_MUT }}>Order ID</p><p className="font-mono text-[13px] font-bold tracking-tight" style={{ color: V_INK }}>{s.orderId}</p></div>
            <div><p className="text-[10px] font-bold uppercase tracking-[0.16em]" style={{ color: V_MUT }}>Courier</p><p className="text-[13px] font-bold" style={{ color: V_INK }}>{s.courier}</p></div>
            <div><p className="text-[10px] font-bold uppercase tracking-[0.16em]" style={{ color: V_MUT }}>Order Date</p><p className="text-[13px] font-bold" style={{ color: V_INK }}>{s.orderDate}</p></div>
          </div>
        </div>
      </div>
      <VHair />
      {/* For-you / promo — clearly fenced off from order data */}
      <V4Promo promo={order.promo} />
    </div>
  );
}

function V4RecCard({ p }) {
  const tilt = useTilt(8, 1.02);
  return (
    <div>
      <div ref={tilt.ref} onMouseMove={tilt.onMouseMove} onMouseLeave={tilt.onMouseLeave} style={tilt.style} className="relative">
        <ImagePlaceholder tone={p.tone} rounded="rounded-md" className="aspect-[4/5] w-full" label="product" />
        {p.best && <span className="absolute left-0 top-2 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white" style={{ background: V_ACC }}>Best Seller</span>}
      </div>
      <p className="mt-2 truncate text-[13px] font-bold" style={{ color: V_INK }}>{p.name}</p>
      <p className="text-[13px]"><span className="font-bold" style={{ color: V_INK }}>{fmtINR(p.price)}</span> <span className="line-through" style={{ color: V_MUT }}>{fmtINR(p.mrp)}</span> <span className="font-bold" style={{ color: V_ACC }}>-{p.off}%</span></p>
    </div>
  );
}

function V4Promo({ promo }) {
  const [copied, setCopied] = vS(false);
  const [page, setPage] = vS(0);
  const pages = Math.ceil(promo.products.length / 2);
  vE(() => { if (prefersReduced) return; const id = setInterval(() => setPage(p => (p + 1) % pages), 3800); return () => clearInterval(id); }, [pages]);
  const copy = () => { try { navigator.clipboard?.writeText(promo.coupon.code); } catch {} setCopied(true); setTimeout(() => setCopied(false), 1500); };
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <VKicker>For you</VKicker>
        <span className="text-[10px] font-medium uppercase tracking-wider" style={{ color: '#bdb8af' }}>Sponsored</span>
      </div>
      <ParallaxScene className="relative -mx-1 overflow-hidden">
        <div className="relative overflow-hidden rounded-sm" style={{ background: V_ACC, minHeight: 220 }}>
          <Parallax s={20} className="pointer-events-none absolute -right-8 -top-10 text-[120px] font-extrabold leading-none" style={{ color: '#fff', opacity: 0.08 }}>%</Parallax>
          <Parallax s={-10} className="pointer-events-none absolute -bottom-10 -left-6 h-32 w-32 rounded-full" style={{ background: 'rgba(255,255,255,.12)' }} />
          <div className="relative p-6 text-white">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em]" style={{ opacity: .85 }}>{promo.bannerKicker}</span>
            <h4 className="mt-2 max-w-[14ch] text-[24px] font-extrabold leading-[1.02] tracking-tight">{promo.bannerTitle}</h4>
            <p className="mt-1.5 text-[13px] font-medium" style={{ opacity: .9 }}>{promo.bannerSub}</p>
            <button className="mt-4 inline-flex items-center gap-2 bg-white px-4 py-2.5 text-sm font-bold transition-all hover:gap-3" style={{ color: V_ACC }}>Shop Now <Icons.ArrowRight size={16} /></button>
          </div>
        </div>
      </ParallaxScene>
      <div>
        <VHair />
        <div className="flex items-center justify-between gap-3 py-3.5">
          <div className="min-w-0"><p className="truncate text-sm font-bold" style={{ color: V_INK }}>{promo.coupon.text}</p><p className="truncate text-xs" style={{ color: V_MUT }}>{promo.coupon.sub}</p></div>
          <button onClick={copy} className="flex shrink-0 items-center gap-1.5 text-xs font-extrabold uppercase tracking-wide" style={{ color: V_ACC }}>
            {copied ? <><Icons.Check size={14} /> Copied</> : <><Icons.Tag size={13} /> {promo.coupon.code}</>}
          </button>
        </div>
        <VHair />
      </div>
      <div>
        <div className="mb-3 flex items-center justify-between">
          <p className="text-sm font-bold" style={{ color: V_INK }}>{promo.recTitle}</p>
          <div className="flex gap-3">{[0, 1].map(d => <button key={d} onClick={() => setPage(p => (p + (d ? 1 : -1) + pages) % pages)} style={{ color: V_MUT }}><Icons.Chevron size={16} className={d ? '-rotate-90' : 'rotate-90'} /></button>)}</div>
        </div>
        <div className="overflow-hidden">
          <div className="flex gap-4 transition-transform duration-500 ease-out" style={{ transform: `translateX(calc(-${page * 100}% - ${page} * 1rem))` }}>
            {promo.products.map((p, i) => <div key={i} className="w-[calc(50%-0.5rem)] min-w-0 shrink-0"><V4RecCard p={p} /></div>)}
          </div>
        </div>
        <div className="mt-4 flex gap-1.5">{Array.from({ length: pages }).map((_, i) => <button key={i} onClick={() => setPage(i)} className="h-1 rounded-full transition-all duration-300" style={{ width: i === page ? 22 : 8, background: i === page ? V_ACC : V_LINE }} />)}</div>
      </div>
    </div>
  );
}

function V4Footer() {
  return (
    <footer className="mt-6">
      <VHair />
      <div className="tp-foot py-8">
        <div>
          <span className="text-base font-extrabold tracking-[0.04em]" style={{ color: V_INK }}>{ORDER.brand}<span style={{ color: V_ACC }}>.</span></span>
          <p className="mt-3 text-[13px]" style={{ color: V_MUT }}>{ORDER.support.email}</p>
          <p className="text-[13px]" style={{ color: V_MUT }}>{ORDER.support.phone}</p>
        </div>
        <div>
          <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.18em]" style={{ color: V_MUT }}>Help & Policies</p>
          <ul className="space-y-2 text-[13px] font-medium" style={{ color: V_INK }}>{ORDER.policies.map(p => <li key={p}>{p}</li>)}</ul>
        </div>
        <div>
          <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.18em]" style={{ color: V_MUT }}>Get the app</p>
          <div className="flex flex-col gap-2 text-[13px] font-bold" style={{ color: V_INK }}><span>App Store →</span><span>Google Play →</span></div>
        </div>
      </div>
      <VHair />
      <div className="tp-foot-bottom flex items-center justify-between gap-2 py-5 text-xs" style={{ color: V_MUT }}>
        <span>© 2026 {ORDER.brand}. All rights reserved.</span>
        <span>Powered by <span className="font-bold" style={{ color: V_INK }}>ClickPost</span></span>
      </div>
    </footer>
  );
}

function CenterStagePage({ minH = 1660 }) {
  const [delivered, setDelivered] = vS(false);
  const ref = vR(null);
  const order = delivered ? deliveredOrder(ORDER) : ORDER;
  vE(() => { if (delivered) { const t = setTimeout(() => fireConfetti(ref.current), 250); return () => clearTimeout(t); } }, [delivered]);
  return (
    <div ref={ref} className="tp-root relative flex flex-col font-sans antialiased" style={{ minHeight: minH, background: V_BG, color: V_INK }}>
      <V4Header delivered={delivered} setDelivered={setDelivered} />
      <main className="mx-auto w-full max-w-[1240px] flex-1 px-8 py-10">
        <div className="tp-grid-cs" style={{ alignItems: 'start' }}>
          <Reveal className="min-w-0"><V4LeftColumn order={order} /></Reveal>
          <Reveal delay={120} className="min-w-0 flex flex-col gap-7">
            <V4Hero order={order} delivered={delivered} />
            <div className="flex items-start justify-center gap-2.5 text-center">
              <span className="mt-0.5 shrink-0" style={{ color: V_ACC }}>{delivered ? <Icons.Sparkles size={18} /> : <Icons.Info size={18} />}</span>
              <p className="max-w-[460px] text-[15px] font-medium leading-relaxed" style={{ color: V_INK }}>{order.banner}</p>
            </div>
            <div className="mt-2"><V4Timeline order={order} delivered={delivered} /></div>
          </Reveal>
          <Reveal delay={260} className="min-w-0"><V4RightColumn order={order} /></Reveal>
        </div>
        <V4Footer />
      </main>
    </div>
  );
}

Object.assign(window, { CenterStagePage });
