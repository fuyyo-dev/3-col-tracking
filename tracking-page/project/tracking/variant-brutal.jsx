// ── VARIANT 2 · NEO-BRUTALISM ─────────────────────────────────────────────
// Raw blocks, 3px ink borders, hard offset shadows, rotated stickers, mono
// data, electric flat fills. Same Flow-3 data, same 3-column layout.
const { useState: bS, useEffect: bE, useRef: bR } = React;

const INK = '#141210';
const B_ACCENT = { placed: '#FFD23F', dispatched: '#7CC6FF', transit: '#FF5C9D', ofd: '#B6FF3C', delivered: '#B6FF3C' };

// Hard-shadow block.
const Box = ({ className, style, children, shadow = 6, ...p }) => (
  <div className={cn('border-[3px] bg-white', className)}
    style={{ borderColor: INK, boxShadow: `${shadow}px ${shadow}px 0 ${INK}`, ...style }} {...p}>{children}</div>
);
// Rotated sticker label.
const Sticker = ({ rotate = -4, bg = '#FFD23F', className, children }) => (
  <span className={cn('inline-flex items-center gap-1 border-[2.5px] px-2 py-0.5 text-[11px] font-extrabold uppercase tracking-wide', className)}
    style={{ borderColor: INK, background: bg, transform: `rotate(${rotate}deg)`, boxShadow: `3px 3px 0 ${INK}` }}>{children}</span>
);
const BrutBtn = ({ bg = '#FFD23F', className, children, ...p }) => (
  <button className={cn('inline-flex items-center justify-center gap-2 border-[3px] px-4 py-2.5 text-sm font-extrabold uppercase tracking-wide transition-all duration-150 hover:-translate-x-[2px] hover:-translate-y-[2px] active:translate-x-0 active:translate-y-0', className)}
    style={{ borderColor: INK, background: bg, color: INK, boxShadow: `4px 4px 0 ${INK}` }}
    onMouseEnter={(e) => e.currentTarget.style.boxShadow = `6px 6px 0 ${INK}`}
    onMouseLeave={(e) => e.currentTarget.style.boxShadow = `4px 4px 0 ${INK}`} {...p}>{children}</button>
);

function BrutHeader({ delivered, setDelivered }) {
  return (
    <header className="sticky top-0 z-40 border-b-[3px]" style={{ borderColor: INK, background: '#FBF6EA' }}>
      <div className="mx-auto flex max-w-[1200px] items-center justify-between gap-4 px-6 py-3.5">
        <div className="flex items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center border-[3px]" style={{ borderColor: INK, background: '#FFD23F', boxShadow: `3px 3px 0 ${INK}` }}><Icons.Package size={18} /></span>
          <span className="text-xl font-extrabold uppercase tracking-tight" style={{ color: INK }}>{ORDER.brand}</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="tp-preview items-center gap-0 border-[3px]" style={{ borderColor: INK }}>
            {[['In Transit', false], ['Delivered', true]].map(([lbl, val], i) => (
              <button key={lbl} onClick={() => setDelivered(val)}
                className={cn('px-3 py-1.5 text-xs font-extrabold uppercase', i === 0 && 'border-r-[3px]')}
                style={{ borderColor: INK, background: delivered === val ? INK : 'transparent', color: delivered === val ? '#fff' : INK }}>{lbl}</button>
            ))}
          </div>
          <BrutBtn bg="#fff" className="!py-2"><Icons.Help size={15} /> Help</BrutBtn>
        </div>
      </div>
    </header>
  );
}

function BrutHero({ order, delivered }) {
  const total = order.timeline.length;
  const idx = delivered ? total - 1 : 2;
  const frac = delivered ? 1 : idx / (total - 1);
  const [w, setW] = bS(0);
  bE(() => { const t = setTimeout(() => setW(frac), 200); return () => clearTimeout(t); }, [frac]);
  return (
    <ParallaxScene className="relative overflow-hidden border-[3px] p-6" style={{ background: '#FFD23F', borderColor: INK, boxShadow: `7px 7px 0 ${INK}` }}>
      {/* floating parallax stickers */}
      <Parallax s={30} rot={10} className="pointer-events-none absolute -right-3 top-3"><Sticker rotate={8} bg="#FF5C9D">Fast</Sticker></Parallax>
      <Parallax s={-20} className="pointer-events-none absolute right-10 bottom-4 h-10 w-10 rounded-full border-[3px]" style={{ borderColor: INK, background: '#7CC6FF' }} />
      <Parallax s={42} rot={-12} className="pointer-events-none absolute right-[38%] top-6" style={{ color: INK }}><Icons.Star size={18} /></Parallax>
      <div className="relative flex items-center justify-between gap-2">
        <span className="text-[11px] font-extrabold uppercase tracking-[0.18em]" style={{ color: INK }}>{delivered ? '// Delivered on' : '// Arriving'}</span>
        <Sticker rotate={3} bg="#fff">
          <span className="relative flex h-2 w-2">{!delivered && <span className="absolute inline-flex h-full w-full animate-ping rounded-full" style={{ background: INK, opacity: .5 }} />}<span className="relative h-2 w-2 rounded-full" style={{ background: INK }} /></span>
          {order.status}
        </Sticker>
      </div>
      <Parallax s={-6} className="relative mt-3">
        <h1 className="text-[44px] font-extrabold uppercase leading-[0.92] tracking-tight" style={{ color: INK }}>
          <Reveal as="span" className="block">{order.estDelivery.day}</Reveal>
          <Reveal as="span" delay={90} className="block">{order.estDelivery.date}</Reveal>
        </h1>
      </Parallax>
      <div className="relative mt-5 h-5 w-full border-[3px] bg-white" style={{ borderColor: INK }}>
        <div className="h-full transition-[width] duration-[1300ms] ease-out" style={{ width: `${w * 100}%`, background: INK, backgroundImage: 'repeating-linear-gradient(45deg, transparent 0 6px, rgba(255,255,255,.25) 6px 12px)' }} />
      </div>
    </ParallaxScene>
  );
}

function BrutDetailed({ subEvents }) {
  const [open, setOpen] = bS(false);
  return (
    <div className="mt-3">
      {open && (
        <div className="space-y-2">
          {subEvents.map((s, i) => (
            <Reveal key={i} delay={i * 80} y={8}>
              <div className="border-l-[4px] pl-3" style={{ borderColor: INK }}>
                <p className="text-[13px] font-extrabold uppercase" style={{ color: INK }}>{s.location}</p>
                <p className="font-mono text-[11px]" style={{ color: '#555' }}>{s.time} · {s.remark}</p>
              </div>
            </Reveal>
          ))}
        </div>
      )}
      <button onClick={() => setOpen(o => !o)} className="mt-2 inline-flex items-center gap-1 border-b-[3px] text-[12px] font-extrabold uppercase tracking-wide" style={{ borderColor: INK, color: INK }}>
        {open ? 'Hide journey' : 'See detailed journey'} <Icons.Chevron size={14} className={cn('transition-transform', open && 'rotate-180')} />
      </button>
    </div>
  );
}

function BrutTimeline({ order, delivered }) {
  const steps = order.timeline;
  const total = steps.length;
  const idx = delivered ? total - 1 : 2;
  return (
    <Box className="p-6" shadow={6}>
      <h3 className="mb-4 text-lg font-extrabold uppercase tracking-tight" style={{ color: INK }}>Progress</h3>
      <div className="space-y-3">
        {steps.map((s, i) => {
          const done = delivered || i < idx, cur = !delivered && i === idx;
          const acc = B_ACCENT[s.key];
          const Icon = Icons[{ placed: 'Package', dispatched: 'Truck', transit: 'Route', ofd: 'Truck', delivered: 'Home' }[s.key]];
          return (
            <div key={s.key} className="flex items-stretch gap-3">
              <div className="flex w-12 shrink-0 flex-col items-center">
                <span className="flex h-12 w-12 items-center justify-center border-[3px] text-[15px] font-extrabold"
                  style={{ borderColor: INK, background: done || cur ? acc : '#fff', color: INK, boxShadow: cur ? `3px 3px 0 ${INK}` : 'none' }}>
                  {done ? <Icons.Check size={20} /> : <Icon size={18} />}
                </span>
                {i < total - 1 && <span className="my-1 w-[3px] flex-1" style={{ background: INK, opacity: done ? 1 : 0.25 }} />}
              </div>
              <div className={cn('min-w-0 flex-1', i < total - 1 && 'pb-3')}>
                <div className="flex items-center gap-2">
                  <p className="whitespace-nowrap text-[15px] font-extrabold uppercase" style={{ color: done || cur ? INK : '#8a8580' }}>{s.label}</p>
                  {cur && <Sticker rotate={-3} bg={acc} className="!text-[9px] !px-1.5">Now</Sticker>}
                </div>
                <p className="font-mono text-[11px]" style={{ color: '#6b6660' }}>{s.date}{s.time && ` · ${s.time}`}</p>
                {s.subEvents && cur && <BrutDetailed subEvents={s.subEvents} />}
              </div>
            </div>
          );
        })}
      </div>
    </Box>
  );
}

function BrutSidebar({ s }) {
  const total = useCountUp(s.orderTotal, true);
  const Row = ({ label, value, mono }) => (
    <div className="border-b-[3px] py-2.5" style={{ borderColor: INK }}>
      <p className="text-[10px] font-extrabold uppercase tracking-widest" style={{ color: '#8a8580' }}>{label}</p>
      <p className={cn('text-sm font-extrabold uppercase', mono && 'font-mono !normal-case tracking-tight')} style={{ color: INK }}>{value}</p>
    </div>
  );
  return (
    <Box className="p-5" shadow={6}>
      <div className="mb-3 inline-block px-2 py-1 text-xs font-extrabold uppercase tracking-wide" style={{ background: INK, color: '#fff' }}>Order details</div>
      <Row label="Tracking ID" value={s.trackingId} mono />
      <Row label="Order ID" value={s.orderId} mono />
      <Row label="Courier" value={s.courier} />
      <Row label="Order Date" value={s.orderDate} />
      <div className="border-b-[3px] py-3" style={{ borderColor: INK }}>
        <p className="text-[10px] font-extrabold uppercase tracking-widest" style={{ color: '#8a8580' }}>Order Total</p>
        <p className="text-2xl font-extrabold" style={{ color: INK }}>{fmtINR(total)}</p>
      </div>
      <Row label="Mobile No." value={s.mobile} mono />
      <div className="py-2.5">
        <p className="text-[10px] font-extrabold uppercase tracking-widest" style={{ color: '#8a8580' }}>Delivery Address</p>
        <p className="mt-1 text-[13px] font-bold leading-snug" style={{ color: INK }}>{s.address}</p>
      </div>
    </Box>
  );
}

function BrutPromo({ promo }) {
  const [copied, setCopied] = bS(false);
  const [page, setPage] = bS(0);
  const pages = Math.ceil(promo.products.length / 2);
  bE(() => { if (prefersReduced) return; const id = setInterval(() => setPage(p => (p + 1) % pages), 3800); return () => clearInterval(id); }, [pages]);
  const copy = () => { try { navigator.clipboard?.writeText(promo.coupon.code); } catch {} setCopied(true); setTimeout(() => setCopied(false), 1500); };
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <span className="px-2 py-1 text-[11px] font-extrabold uppercase tracking-wide" style={{ background: INK, color: '#fff' }}>For you</span>
        <span className="text-[10px] font-extrabold uppercase tracking-wider" style={{ color: '#8a8580' }}>Sponsored</span>
      </div>
      {/* banner */}
      <ParallaxScene className="relative overflow-hidden border-[3px] p-5" style={{ background: '#FF5C9D', borderColor: INK, boxShadow: `7px 7px 0 ${INK}` }}>
        <Parallax s={26} rot={8} className="pointer-events-none absolute right-3 top-3"><Icons.Sparkles size={22} style={{ color: INK }} /></Parallax>
        <Parallax s={-16} className="pointer-events-none absolute -right-4 bottom-2 h-16 w-16 rounded-full border-[3px]" style={{ borderColor: INK, background: '#FFD23F' }} />
        <span className="inline-block border-[2.5px] bg-white px-2 py-0.5 text-[10px] font-extrabold uppercase" style={{ borderColor: INK }}>{promo.bannerKicker}</span>
        <h4 className="mt-2 max-w-[14ch] text-2xl font-extrabold uppercase leading-[0.95]" style={{ color: INK }}>{promo.bannerTitle}</h4>
        <p className="mt-1 text-[13px] font-bold" style={{ color: INK }}>{promo.bannerSub}</p>
        <BrutBtn bg="#fff" className="mt-3">Shop Now <Icons.ArrowRight size={16} /></BrutBtn>
      </ParallaxScene>
      {/* coupon */}
      <Box className="flex items-stretch overflow-hidden p-0" shadow={5}>
        <div className="flex flex-1 items-center gap-2 p-3">
          <span className="flex h-9 w-9 items-center justify-center border-[2.5px]" style={{ borderColor: INK, background: '#B6FF3C' }}><Icons.Tag size={16} /></span>
          <div className="min-w-0"><p className="truncate text-[13px] font-extrabold uppercase" style={{ color: INK }}>{promo.coupon.text}</p><p className="truncate font-mono text-[11px]" style={{ color: '#6b6660' }}>{promo.coupon.sub}</p></div>
        </div>
        <button onClick={copy} className="flex shrink-0 items-center gap-1 border-l-[3px] px-3 text-xs font-extrabold uppercase" style={{ borderColor: INK, background: copied ? '#B6FF3C' : '#FFD23F', color: INK }}>
          {copied ? <><Icons.Check size={14} /> Got it</> : <><Icons.Copy size={13} /> {promo.coupon.code}</>}
        </button>
      </Box>
      {/* products */}
      <Box className="p-4" shadow={6}>
        <div className="mb-2.5 flex items-center justify-between">
          <h4 className="text-sm font-extrabold uppercase" style={{ color: INK }}>{promo.recTitle}</h4>
          <div className="flex gap-1.5">
            {[0, 1].map(d => <button key={d} onClick={() => setPage(p => (p + (d ? 1 : -1) + pages) % pages)} className="flex h-7 w-7 items-center justify-center border-[2.5px]" style={{ borderColor: INK }}><Icons.Chevron size={13} className={d ? '-rotate-90' : 'rotate-90'} /></button>)}
          </div>
        </div>
        <div className="overflow-hidden">
          <div className="flex transition-transform duration-500 ease-out" style={{ transform: `translateX(-${page * 100}%)` }}>
            {promo.products.map((p, i) => (
              <div key={i} className="w-1/2 min-w-0 shrink-0 px-1">
                <div className="border-[2.5px]" style={{ borderColor: INK }}>
                  <div className="relative border-b-[2.5px]" style={{ borderColor: INK }}>
                    <ImagePlaceholder tone={p.tone} rounded="rounded-none" className="aspect-[4/5] w-full" label="product" />
                    {p.best && <span className="absolute left-1 top-1"><Sticker rotate={-6} bg="#FFD23F" className="!text-[8px] !px-1 !py-0">Best</Sticker></span>}
                    <span className="absolute right-1 top-1 border-[2px] bg-white px-1 text-[10px] font-extrabold" style={{ borderColor: INK }}>-{p.off}%</span>
                  </div>
                  <div className="p-2"><p className="truncate text-[12px] font-extrabold uppercase" style={{ color: INK }}>{p.name}</p><p className="font-mono text-[12px] font-bold" style={{ color: INK }}>{fmtINR(p.price)} <span className="text-[10px] line-through" style={{ color: '#9a958f' }}>{fmtINR(p.mrp)}</span></p></div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-3 flex justify-center gap-1.5">{Array.from({ length: pages }).map((_, i) => <button key={i} onClick={() => setPage(i)} className="h-3 w-3 border-[2px]" style={{ borderColor: INK, background: i === page ? INK : '#fff' }} />)}</div>
      </Box>
    </div>
  );
}

function BrutFooter() {
  return (
    <Box className="mt-2 p-0" shadow={6}>
      <div className="tp-foot p-6">
        <div>
          <span className="text-lg font-extrabold uppercase" style={{ color: INK }}>{ORDER.brand}</span>
          <p className="mt-2 font-mono text-[12px]" style={{ color: '#6b6660' }}>{ORDER.support.email}</p>
          <p className="font-mono text-[12px]" style={{ color: '#6b6660' }}>{ORDER.support.phone}</p>
        </div>
        <div>
          <p className="mb-2 text-xs font-extrabold uppercase tracking-wide" style={{ color: INK }}>Help & Policies</p>
          <ul className="space-y-1 text-[13px] font-bold uppercase" style={{ color: '#4a4640' }}>{ORDER.policies.map(p => <li key={p}>{p}</li>)}</ul>
        </div>
        <div>
          <p className="mb-2 text-xs font-extrabold uppercase tracking-wide" style={{ color: INK }}>Get the app</p>
          <div className="flex flex-col gap-2">{['App Store', 'Google Play'].map(s => <span key={s} className="w-fit border-[2.5px] px-3 py-1 text-xs font-extrabold uppercase" style={{ borderColor: INK }}>{s}</span>)}</div>
        </div>
      </div>
      <div className="tp-foot-bottom flex items-center justify-between gap-2 border-t-[3px] px-6 py-3 text-xs font-extrabold uppercase" style={{ borderColor: INK, color: '#6b6660' }}>
        <span>© 2026 {ORDER.brand}</span><span>Powered by ClickPost</span>
      </div>
    </Box>
  );
}

function BrutalPage({ minH = 1620 }) {
  const [delivered, setDelivered] = bS(false);
  const ref = bR(null);
  const order = delivered ? deliveredOrder(ORDER) : ORDER;
  bE(() => { if (delivered) { const t = setTimeout(() => fireConfetti(ref.current), 250); return () => clearTimeout(t); } }, [delivered]);
  return (
    <div ref={ref} className="tp-root relative flex flex-col font-sans antialiased" style={{ minHeight: minH, background: '#FBF6EA', color: INK }}>
      <BrutHeader delivered={delivered} setDelivered={setDelivered} />
      <main className="mx-auto w-full max-w-[1200px] flex-1 px-6 py-7">
        <div className="tp-grid">
          <div className="flex min-w-0 flex-col gap-4">
            <Reveal><BrutHero order={order} delivered={delivered} /></Reveal>
            <Reveal delay={140}>
              <Box className="flex items-center gap-3 p-4" style={{ background: delivered ? '#B6FF3C' : '#7CC6FF' }} shadow={5}>
                <span className="flex h-9 w-9 shrink-0 items-center justify-center border-[3px] bg-white" style={{ borderColor: INK }}>{delivered ? <Icons.Sparkles size={17} /> : <Icons.Truck size={17} />}</span>
                <p className="text-[13px] font-extrabold uppercase leading-tight" style={{ color: INK }}>{order.banner}</p>
              </Box>
            </Reveal>
            <Reveal delay={200}><BrutTimeline order={order} delivered={delivered} /></Reveal>
          </div>
          <Reveal delay={120} className="min-w-0"><BrutSidebar s={order.sidebar} /></Reveal>
          <Reveal delay={260} className="tp-col3 min-w-0"><BrutPromo promo={order.promo} /></Reveal>
        </div>
        <div className="mt-6"><BrutFooter /></div>
      </main>
    </div>
  );
}

Object.assign(window, { BrutalPage });
