// ── Upsell column (promo banner + coupon + recommendation carousel) and the
// global footer. Kept visually distinct from the order-data column per the
// UX audit — clearly "commercial", never mixed with order facts.
const { useState: uS, useEffect: uE, useRef: uR } = React;

// Parallax ad banner with Shop Now.
function PromoBanner({ data }) {
  const ref = uR(null);
  const [t, setT] = uS({ x: 0, y: 0 });
  const onMove = (e) => {
    if (prefersReduced) return;
    const r = ref.current.getBoundingClientRect();
    setT({ x: ((e.clientX - r.left) / r.width - 0.5) * 2, y: ((e.clientY - r.top) / r.height - 0.5) * 2 });
  };
  return (
    <div ref={ref} onMouseMove={onMove} onMouseLeave={() => setT({ x: 0, y: 0 })}
      className="group relative h-60 overflow-hidden rounded-xl border border-border shadow-sm">
      <div className="absolute inset-[-12%] transition-transform duration-300 ease-out"
        style={{ transform: `translate3d(${t.x * -14}px, ${t.y * -14}px, 0) scale(1.12)` }}>
        <ImagePlaceholder tone="hero" rounded="rounded-none" className="h-full w-full" label="lifestyle / hero shot" />
      </div>
      <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(0,0,0,.05) 0%, rgba(0,0,0,.42) 100%)' }} />
      <div className="absolute inset-0 flex flex-col justify-end p-5 text-white"
        style={{ transform: `translate3d(${t.x * 5}px, ${t.y * 5}px, 0)` }}>
        <span className="mb-1.5 inline-flex w-fit items-center gap-1 rounded-full bg-white/20 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.18em] backdrop-blur-sm">
          {data.bannerKicker}
        </span>
        <h4 className="max-w-[15ch] text-[22px] font-extrabold leading-tight tracking-tight">{data.bannerTitle}</h4>
        <p className="mt-1 text-[13px] font-medium text-white/85">{data.bannerSub}</p>
        <Btn variant="brand" className="mt-3.5 w-fit group-hover:gap-3">
          Shop Now <Icons.ArrowRight size={16} />
        </Btn>
      </div>
    </div>
  );
}

// Coupon ticket — the user's explicit promo/offer ask.
function CouponCard({ coupon }) {
  const [copied, setCopied] = uS(false);
  const copy = () => { try { navigator.clipboard?.writeText(coupon.code); } catch {} setCopied(true); setTimeout(() => setCopied(false), 1600); };
  return (
    <div className="relative flex items-stretch overflow-hidden rounded-xl border border-dashed border-brand/40 bg-brand/[0.06]">
      <span className="pointer-events-none absolute -left-2 top-1/2 h-4 w-4 -translate-y-1/2 rounded-full bg-surface" />
      <span className="pointer-events-none absolute -right-2 top-1/2 h-4 w-4 -translate-y-1/2 rounded-full bg-surface" />
      <div className="flex flex-1 items-center gap-3 p-4">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand/12 text-brand">
          <Icons.Tag size={18} />
        </div>
        <div className="min-w-0">
          <p className="truncate text-sm font-bold text-foreground">{coupon.text}</p>
          <p className="mt-0.5 truncate text-xs text-muted-foreground">{coupon.sub}</p>
        </div>
      </div>
      <button onClick={copy}
        className="flex shrink-0 items-center gap-1.5 border-l border-dashed border-brand/40 px-3.5 text-xs font-bold uppercase tracking-wider text-brand transition-colors hover:bg-brand/10">
        {copied ? <><Icons.Check size={14} /> Copied</> : <><Icons.Copy size={13} /> {coupon.code}</>}
      </button>
    </div>
  );
}

// Recommendation carousel — 2 products per page, autoplay + dots + arrows.
function RecCarousel({ promo }) {
  const { products } = promo;
  const pages = Math.ceil(products.length / 2);
  const [page, setPage] = uS(0);
  const [paused, setPaused] = uS(false);
  uE(() => {
    if (paused || prefersReduced) return;
    const id = setInterval(() => setPage((p) => (p + 1) % pages), 3800);
    return () => clearInterval(id);
  }, [paused, pages]);
  return (
    <div onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      <div className="mb-2.5 flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <h4 className="text-sm font-bold text-foreground">{promo.recTitle}</h4>
          <Tooltip label={promo.recTip}><Icons.Info size={13} className="text-muted-foreground" /></Tooltip>
        </div>
        <div className="flex items-center gap-1">
          {[0, 1].map((d) => (
            <button key={d} onClick={() => setPage((p) => (p + (d ? 1 : -1) + pages) % pages)}
              className="flex h-7 w-7 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground">
              <Icons.Chevron size={14} className={d ? '-rotate-90' : 'rotate-90'} />
            </button>
          ))}
        </div>
      </div>
      <div className="overflow-hidden min-w-0">
        <div className="flex transition-transform duration-500 ease-out" style={{ transform: `translateX(-${page * 100}%)` }}>
          {products.map((p, i) => <div key={i} className="w-1/2 min-w-0 shrink-0 px-1"><ProductCard p={p} /></div>)}
        </div>
      </div>
      <div className="mt-3 flex justify-center gap-1.5">
        {Array.from({ length: pages }).map((_, i) => (
          <button key={i} onClick={() => setPage(i)}
            className={cn('h-1.5 rounded-full transition-all duration-300', i === page ? 'w-5 bg-brand' : 'w-1.5 bg-border')} />
        ))}
      </div>
    </div>
  );
}

function ProductCard({ p }) {
  const tilt = useTilt(10, 1.04);
  return (
    <a className="group/p block cursor-pointer">
      <div ref={tilt.ref} onMouseMove={tilt.onMouseMove} onMouseLeave={tilt.onMouseLeave} style={tilt.style} className="relative">
        <ImagePlaceholder tone={p.tone} className="aspect-[4/5] w-full" label="product" />
        {p.best && <Badge variant="highlight" className="absolute left-2 top-2 gap-1 !px-2 !py-0.5 !text-[10px]"><Icons.Star size={9} /> Best Seller</Badge>}
        <span className="absolute right-2 top-2 rounded-md bg-black/70 px-1.5 py-0.5 text-[10px] font-bold text-white backdrop-blur-sm">{p.off}% OFF</span>
      </div>
      <p className="mt-2 truncate text-[13px] font-semibold text-foreground group-hover/p:text-brand">{p.name}</p>
      <div className="mt-0.5 flex items-baseline gap-1.5">
        <span className="text-sm font-bold text-foreground">{fmtINR(p.price)}</span>
        <span className="text-xs text-muted-foreground line-through">{fmtINR(p.mrp)}</span>
      </div>
    </a>
  );
}

// ── Footer — light-theme treatment of the global persistent footer.
function Footer({ support, policies }) {
  const social = ['YT', 'X', 'in', 'f', 'IG'];
  return (
    <footer className="mt-2 rounded-xl border border-border bg-card">
      <div className="tp-foot p-6 md:p-7">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-md bg-primary text-primary-foreground"><Icons.Package size={15} /></span>
            <span className="text-base font-extrabold tracking-tight text-foreground">{ORDER.brand}</span>
          </div>
          <p className="mt-3 max-w-xs text-[13px] leading-relaxed text-muted-foreground">
            Questions about your order? Our team is here to help.
          </p>
          <div className="mt-3 space-y-1 text-[13px]">
            <p className="flex items-center gap-2 text-foreground"><Icons.Phone size={13} className="text-muted-foreground" /> {support.email}</p>
            <p className="flex items-center gap-2 text-foreground"><Icons.Phone size={13} className="text-muted-foreground" /> {support.phone}</p>
            <p className="text-xs text-muted-foreground">{support.hours}</p>
          </div>
        </div>
        <div>
          <p className="mb-3 text-xs font-bold uppercase tracking-wider text-muted-foreground">Help & Policies</p>
          <ul className="space-y-2 text-[13px]">
            {policies.map((p) => (
              <li key={p}><a className="cursor-pointer text-foreground/80 transition-colors hover:text-brand">{p}</a></li>
            ))}
          </ul>
        </div>
        <div>
          <p className="mb-3 text-xs font-bold uppercase tracking-wider text-muted-foreground">Get the app</p>
          <div className="flex flex-col gap-2">
            {['App Store', 'Google Play'].map((s) => (
              <div key={s} className="flex w-fit items-center gap-2 rounded-lg border border-border bg-secondary px-3 py-1.5">
                <span className="h-4 w-4 rounded-sm bg-foreground/80" />
                <span className="text-xs font-semibold text-foreground">{s}</span>
              </div>
            ))}
          </div>
          <div className="mt-4 flex gap-2">
            {social.map((s) => (
              <span key={s} className="flex h-8 w-8 items-center justify-center rounded-full border border-border bg-secondary text-[10px] font-bold text-muted-foreground transition-colors hover:bg-brand hover:text-brand-foreground">{s}</span>
            ))}
          </div>
        </div>
      </div>
      <Separator />
      <div className="tp-foot-bottom flex items-center justify-between gap-2 px-6 py-4 text-xs text-muted-foreground">
        <span>© 2026 {ORDER.brand}. All rights reserved.</span>
        <span className="flex items-center gap-1.5">Powered by <span className="font-bold tracking-tight text-foreground">CLICKPOST</span></span>
      </div>
    </footer>
  );
}

Object.assign(window, { PromoBanner, CouponCard, RecCarousel, ProductCard, Footer });
