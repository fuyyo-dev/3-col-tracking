// ── Order data — STRICTLY the Flow-3 (Order Tracking · Single Shipment) data
// points listed in tracking-flows.pdf. Nothing invented beyond the user's
// explicit promo/coupon request. No map data.
const fmtINR = (n) => '₹' + Number(n).toLocaleString('en-IN');

const ORDER = {
  brand: 'MERIDIAN',
  estDelivery: { day: 'Wednesday', date: '18 Dec' },
  status: 'In Transit',
  // Contextual alert / info banner — a listed data point ("Alert / info
  // banner — contextual per status").
  banner: 'On the move — your order cleared the Bangalore hub and is heading your way.',

  // Timeline (normal view) — each step has date + time. The In-Transit step
  // carries the Detailed Journey sub-events (Location / Time / Remarks).
  timeline: [
    { key: 'placed',    label: 'Order Placed',     date: 'Thu, 15 Dec', time: '12:00 AM' },
    { key: 'dispatched',label: 'Dispatched',       date: 'Thu, 16 Dec', time: '7:00 AM' },
    { key: 'transit',   label: 'In Transit',       date: 'Thu, 17 Dec', time: '9:30 AM',
      subEvents: [
        { location: 'Bangalore Hub (Karnataka)',      time: 'Today · 2:00 pm',     remark: 'Received at sorting facility' },
        { location: 'Hosur Road Center (Karnataka)',  time: 'Today · 8:15 am',     remark: 'In transit to destination hub' },
        { location: 'Chennai Gateway (Tamil Nadu)',   time: 'Yesterday · 11:40 pm',remark: 'Departed from origin facility' },
      ] },
    { key: 'ofd',       label: 'Out For Delivery', date: 'Expected 18 Dec', time: '' },
    { key: 'delivered', label: 'Delivered',        date: 'Est. Thu, 18 Dec', time: '' },
  ],

  // Order line items — Flow-4 line-item schema (image, name, price, qty,
  // size) brought into the single-shipment view per the brand's old UI.
  // Unit prices × qty sum to orderTotal (3200 + 900×2 = 5000).
  items: [
    { name: 'Featherlite Windbreaker', size: 'M',        qty: 1, price: 3200, tone: 'c' },
    { name: 'Ribbed Knit Beanie',      size: 'One Size', qty: 2, price: 900,  tone: 'b' },
  ],

  // Order sidebar — exact field set from the flow doc.
  sidebar: {
    trackingId: '8998372778923',
    orderId: '8998372778923',
    courier: 'Delhivery',
    orderDate: 'Monday, 16 Dec',
    orderTotal: 5000,
    mobile: '9876543210',
    address: '245, HSR Layout, Sector 7, Landmark Dominos, Bangalore, Karnataka 560102',
  },

  // Upsell column — ad banner + Shop Now (Flow 3) and the recommendation
  // widget fields (Flow 11): image, name, sale price, MRP strikethrough,
  // discount %, Best Selling badge. Coupon block is the user's explicit ask.
  promo: {
    bannerKicker: 'NEW SEASON',
    bannerTitle: 'The drop everyone\u2019s waiting for',
    bannerSub: 'Up to 40% off fresh arrivals',
    coupon: { code: 'TRACK15', text: 'Extra 15% off your next order', sub: 'Auto-applies at checkout · Ends Sunday' },
    recTitle: 'You may also like',
    recTip: 'Picked for you based on this order',
    products: [
      { name: 'Court Classic Sneakers', price: 3499, mrp: 4999, off: 30, best: true,  tone: 'a' },
      { name: 'Everyday Knit Tee',      price: 1299, mrp: 1799, off: 28, best: false, tone: 'b' },
      { name: 'Tech Runner Lows',       price: 4199, mrp: 5999, off: 30, best: false, tone: 'c' },
      { name: 'Fleece Zip Hoodie',      price: 2799, mrp: 3999, off: 30, best: true,  tone: 'd' },
    ],
  },

  // Global footer elements.
  support: {
    email: 'hello@headsupport.com',
    phone: '011 408 45644',
    hours: 'Mon\u2013Fri 6:00 AM\u20139:00 PM · Sat\u2013Sun 9:00 AM\u201312:00 PM',
  },
  policies: ['Privacy Policy', 'Return Policy', 'Refund Policy', 'Terms & Conditions', 'Get Help'],
};

// Derive a delivered-state copy of the order for the celebration toggle.
function deliveredOrder(o) {
  return {
    ...o,
    status: 'Delivered',
    estDelivery: { day: 'Delivered', date: 'Wed, 18 Dec' },
    banner: 'Delivered! We hope you love it. Tap a pick below to keep the look going.',
  };
}

Object.assign(window, { ORDER, fmtINR, deliveredOrder });
