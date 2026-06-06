// ── TrackingPage — the 3-column core tracking experience (Flow 3). Themed via
// a wrapping .theme-* class; same component renders all three directions.
const { useState: tS, useEffect: tE, useRef: tR } = React;

const STEP_ICON = { placed: 'Package', dispatched: 'Truck', transit: 'Route', ofd: 'Truck', delivered: 'Home' };

// Small uppercase section label to separate zones (esp. commercial vs data).
const Kicker = ({ children, className }) => (
  <p className={cn('text-[11px] font-bold uppercase tracking-[0.16em] text-muted-foreground', className)}>{children}</p>
);

function Logo() {
  return (
    <div className="flex items-center gap-2.5 logo-mark">
      <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
        <Icons.Package size={17} />
      </span>
      <span className="text-lg font-extrabold tracking-tight text-foreground">{ORDER.brand}</span>
    </div>
  );
}

function Header({ delivered, setDelivered }) {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-card/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-[1200px] items-center justify-between gap-4 px-6 py-3.5">
        <Logo />
        <div className="flex items-center gap-2">
          {/* Demo-only state preview toggle */}
          <div className="tp-preview items-center gap-1 rounded-full border border-border bg-secondary p-1">
            <span className="px-2 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Preview</span>
            {[['In Transit', false], ['Delivered', true]].map(([lbl, val]) => (
              <button key={lbl} onClick={() => setDelivered(val)}
                className={cn('whitespace-nowrap rounded-full px-3 py-1 text-xs font-semibold transition-all',
                  delivered === val ? 'bg-card text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground')}>{lbl}</button>
            ))}
          </div>
          <Btn variant="ghost" size="sm" className="tp-updates text-muted-foreground">
            <Icons.Bell size={16} /> Updates
          </Btn>
          <Btn variant="outline" size="sm"><Icons.Help size={15} /> Get Help</Btn>
        </div>
      </div>
    </header>
  );
}

function Hero({ order, delivered }) {
  const total = order.timeline.length;
  const currentIndex = delivered ? total - 1 : 2;
  const frac = delivered ? 1 : currentIndex / (total - 1);
  const [w, setW] = tS(0);
  tE(() => { const t = setTimeout(() => setW(frac), 200); return () => clearTimeout(t); }, [frac]);
  const Icon = Icons[delivered ? 'Home' : 'Truck'];
  return (
    <ParallaxScene className="relative overflow-hidden rounded-lg border border-border bg-card text-card-foreground shadow-sm hero-card">
      <div className="hero-aurora pointer-events-none absolute inset-0 opacity-90" />
      {/* parallax depth layers */}
      <Parallax s={26} className="pointer-events-none absolute -right-12 -top-16 h-48 w-48 rounded-full"
        style={{ background: 'radial-gradient(circle, hsl(var(--brand) / .32), transparent 70%)', filter: 'blur(4px)' }} />
      <Parallax s={-16} className="pointer-events-none absolute -left-10 -bottom-12 h-44 w-44 rounded-full"
        style={{ background: 'radial-gradient(circle, hsl(330 82% 62% / .26), transparent 70%)', filter: 'blur(8px)' }} />
      <Parallax s={44} rot={6} className="pointer-events-none absolute right-[26%] top-5 text-brand/40"><Icons.Sparkles size={20} /></Parallax>
      <Parallax s={32} className="pointer-events-none absolute right-6 bottom-7 text-brand/25"><Icons.Sparkles size={13} /></Parallax>
      <CardContent className="relative p-6">
        <div className="flex items-start justify-between gap-3">
          <Kicker>{delivered ? 'Delivered On' : 'Estimated Delivery'}</Kicker>
          <span className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-full bg-brand/12 px-2.5 py-1 text-xs font-bold text-brand">
            <span className="relative flex h-2 w-2">
              {!delivered && <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand opacity-70" />}
              <span className="relative inline-flex h-2 w-2 rounded-full bg-brand" />
            </span>
            {order.status}
          </span>
        </div>
        <div className="mt-2 flex items-end gap-3">
          <Parallax s={-7} className="text-[34px] font-extrabold leading-[1.05] tracking-tight text-foreground">
            <Reveal as="span" className="block">{order.estDelivery.day},</Reveal>
            <Reveal as="span" delay={90} className="block text-brand">{order.estDelivery.date}</Reveal>
          </Parallax>
        </div>
        {/* Progress visualization of the existing timeline */}
        <Parallax s={-4} className="relative mt-6">
          <div className="h-2 w-full overflow-hidden rounded-full bg-secondary">
            <div className="hero-fill h-full rounded-full bg-brand transition-[width] duration-[1400ms] ease-out"
              style={{ width: `${w * 100}%` }} />
          </div>
          <div className="absolute -top-[7px] transition-[left] duration-[1400ms] ease-out" style={{ left: `calc(${w * 100}% - 14px)` }}>
            <span className="flex h-7 w-7 items-center justify-center rounded-full border border-border bg-card text-brand shadow-md">
              <Icon size={15} />
            </span>
          </div>
          <div className="mt-3 flex justify-between text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">
            <span>Placed</span><span>Delivered</span>
          </div>
        </Parallax>
      </CardContent>
    </ParallaxScene>
  );
}

function StatusBanner({ order, delivered }) {
  const Icon = delivered ? Icons.Sparkles : Icons.Truck;
  return (
    <Reveal delay={140}>
      <div className="flex items-start gap-3 rounded-lg border border-brand/25 bg-brand/[0.07] p-4">
        <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand/15 text-brand">
          <Icon size={16} />
        </span>
        <div>
          <p className="text-sm font-semibold text-foreground">{delivered ? 'Order delivered' : 'Shipment update'}</p>
          <p className="mt-0.5 text-[13px] leading-relaxed text-muted-foreground">{order.banner}</p>
        </div>
      </div>
    </Reveal>
  );
}

function DetailedJourney({ subEvents }) {
  const [open, setOpen] = tS(false);
  const last = subEvents[0];
  return (
    <div className="mt-3">
      {!open && (
        <div className="rounded-lg border border-border bg-secondary/60 p-3">
          <p className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">Latest scan</p>
          <p className="mt-1 text-[13px] font-medium text-foreground">{last.location}</p>
          <p className="text-xs text-muted-foreground">{last.time} · {last.remark}</p>
        </div>
      )}
      {open && (
        <div className="relative mt-1 space-y-3 pl-4">
          <span className="absolute left-[3px] top-2 bottom-2 w-px bg-border" />
          {subEvents.map((s, i) => (
            <Reveal key={i} delay={i * 80} y={8} className="relative">
              <span className="absolute -left-4 top-1.5 h-[7px] w-[7px] rounded-full bg-brand ring-4 ring-brand/10" />
              <p className="text-[13px] font-semibold text-foreground">{s.location}</p>
              <p className="text-xs text-muted-foreground">{s.time} · {s.remark}</p>
            </Reveal>
          ))}
        </div>
      )}
      <button onClick={() => setOpen((o) => !o)}
        className="mt-2.5 inline-flex items-center gap-1 text-[13px] font-bold text-brand transition-colors hover:opacity-80">
        {open ? 'Close Detailed Journey' : 'See Detailed Journey'}
        <Icons.Chevron size={15} className={cn('transition-transform duration-300', open && 'rotate-180')} />
      </button>
    </div>
  );
}

function Timeline({ order, delivered }) {
  const steps = order.timeline;
  const total = steps.length;
  const currentIndex = delivered ? total - 1 : 2;
  const status = (i) => delivered || i < currentIndex ? 'done' : i === currentIndex ? 'current' : 'pending';
  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-4">
        <CardTitle className="text-base">Shipment progress</CardTitle>
      </CardHeader>
      <CardContent>
        <div>
          {steps.map((s, i) => {
            const st = status(i);
            const Icon = Icons[STEP_ICON[s.key]];
            const isLast = i === total - 1;
            const lineDone = delivered || i < currentIndex;
            return (
              <div key={s.key} className="flex gap-3.5">
                {/* rail */}
                <div className="relative flex w-9 shrink-0 flex-col items-center">
                  <span className={cn('z-10 flex h-9 w-9 items-center justify-center rounded-full transition-colors duration-500',
                    st === 'done' && 'bg-brand text-brand-foreground',
                    st === 'current' && 'border-2 border-brand bg-card text-brand',
                    st === 'pending' && 'border-2 border-border bg-card text-muted-foreground')}>
                    {st === 'current' && <span className="absolute inset-0 rounded-full ring-pulse" />}
                    {st === 'done' ? <Icons.Check size={18} /> : <Icon size={16} />}
                  </span>
                  {!isLast && (
                    <span className="relative my-1 w-[2.5px] flex-1 overflow-hidden rounded-full bg-border">
                      <span className={cn('absolute inset-x-0 top-0 origin-top rounded-full bg-brand transition-transform duration-700 ease-out',
                        'h-full', lineDone ? 'scale-y-100' : 'scale-y-0')}
                        style={{ transitionDelay: `${i * 180 + 300}ms` }} />
                    </span>
                  )}
                </div>
                {/* content */}
                <div className={cn('min-w-0 flex-1', isLast ? 'pb-1' : 'pb-7')}>
                  <div className="flex items-center gap-2">
                    <p className={cn('whitespace-nowrap text-[15px] leading-tight', st === 'pending' ? 'font-medium text-muted-foreground' : 'font-bold text-foreground')}>{s.label}</p>
                    {st === 'current' && <Badge variant="soft" className="shrink-0 !px-2 !py-0 !text-[10px]">Now</Badge>}
                  </div>
                  <p className={cn('mt-0.5 text-[13px]', st === 'pending' ? 'text-muted-foreground/70' : 'text-muted-foreground')}>
                    {s.date}{s.time && ` · ${s.time}`}
                  </p>
                  {s.subEvents && st === 'current' && <DetailedJourney subEvents={s.subEvents} />}
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}

function SidebarRow({ icon, label, value, copy, mono }) {
  const Icon = Icons[icon];
  const [copied, setCopied] = tS(false);
  return (
    <div className="flex items-start gap-3 py-3">
      <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-secondary text-muted-foreground">
        <Icon size={15} />
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">{label}</p>
        <div className="flex items-center gap-1.5">
          <p className={cn('text-sm font-semibold text-foreground', mono && 'font-mono tracking-tight', value.long && 'leading-relaxed')}>{value.text || value}</p>
          {copy && (
            <button onClick={() => { try { navigator.clipboard?.writeText(value); } catch {} setCopied(true); setTimeout(() => setCopied(false), 1400); }}
              className="text-muted-foreground transition-colors hover:text-brand">
              {copied ? <Icons.Check size={13} /> : <Icons.Copy size={13} />}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

function Sidebar({ s }) {
  const total = useCountUp(s.orderTotal, true);
  return (
    <Card className="sticky top-[76px]">
      <CardHeader className="pb-1">
        <CardTitle className="text-base">Order details</CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="divide-y divide-border">
          <SidebarRow icon="Hash" label="Tracking ID" value={s.trackingId} copy mono />
          <SidebarRow icon="Receipt" label="Order ID" value={s.orderId} mono />
          <SidebarRow icon="Truck" label="Courier" value={s.courier} />
          <SidebarRow icon="Calendar" label="Order Date" value={s.orderDate} />
          <div className="flex items-start gap-3 py-3">
            <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-secondary text-muted-foreground"><Icons.Wallet size={15} /></span>
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">Order Total</p>
              <p className="text-lg font-extrabold tracking-tight text-foreground">{fmtINR(total)}</p>
            </div>
          </div>
          <SidebarRow icon="Phone" label="Mobile No." value={s.mobile} />
          <div className="flex items-start gap-3 py-3">
            <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-secondary text-muted-foreground"><Icons.MapPin size={15} /></span>
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">Delivery Address</p>
              <p className="mt-0.5 text-sm font-medium leading-relaxed text-foreground">{s.address}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function TrackingPage({ variant = 'minimal', minH = 1480 }) {
  const [delivered, setDelivered] = tS(false);
  const rootRef = tR(null);
  const order = delivered ? deliveredOrder(ORDER) : ORDER;
  tE(() => { if (delivered) { const t = setTimeout(() => fireConfetti(rootRef.current), 250); return () => clearTimeout(t); } }, [delivered]);
  return (
    <div ref={rootRef} className={cn('theme-premium', 'tp-root relative flex flex-col bg-surface font-sans text-foreground antialiased')}
      style={{ minHeight: minH }}>
      <Header delivered={delivered} setDelivered={setDelivered} />
      <main className="mx-auto w-full max-w-[1200px] flex-1 px-6 py-7">
        <div className="tp-grid">
          {/* Column 1 — status & timeline */}
          <div className="flex min-w-0 flex-col gap-4">
            <Reveal><Hero order={order} delivered={delivered} /></Reveal>
            <StatusBanner order={order} delivered={delivered} />
            <Reveal delay={200}><Timeline order={order} delivered={delivered} /></Reveal>
          </div>
          {/* Column 2 — order data */}
          <Reveal delay={120} className="min-w-0"><Sidebar s={order.sidebar} /></Reveal>
          {/* Column 3 — upsell (kept clearly separate from order data) */}
          <Reveal delay={260} className="tp-col3 flex min-w-0 flex-col gap-4">
            <div className="flex items-center justify-between">
              <Kicker>For you</Kicker>
              <span className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground/70">Sponsored</span>
            </div>
            <PromoBanner data={order.promo} />
            <CouponCard coupon={order.promo.coupon} />
            <Card><CardContent className="p-4"><RecCarousel promo={order.promo} /></CardContent></Card>
          </Reveal>
        </div>
        <div className="mt-6"><Footer support={order.support} policies={order.policies} /></div>
      </main>
    </div>
  );
}

Object.assign(window, { TrackingPage });
