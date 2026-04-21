const user = {
  name: "John Doe",
  age: 30,
  email: "john.doe@example.com",
};

export const currentUser = {
  id: "user-003",
  name: "Alex Morgan",
};

export const auctionWatches: AuctionWatch[] = [
  {
    watchId: "auc-001",
    price: 9500,
    name: "Rolex Submariner 116610LN",
    image:
      "https://images.unsplash.com/photo-1594534475808-b18fc33b045e?w=400&h=400&fit=crop",
    basePrice: 9500,
    sellerId: "skipped_user",
    saleType: "auction",
    isAuthenticated: true,
    bidders: [],
  },
  {
    watchId: "auc-002",
    price: 7200,
    name: "Omega Speedmaster  Professional",
    image:
      "https://images.unsplash.com/photo-1594534475808-b18fc33b045e?w=400&h=400&fit=crop",
    basePrice: 7200,
    sellerId: "user-003",
    saleType: "auction",
    isAuthenticated: false,
    bidders: [{ userId: "user-004", bidAmount: 7500 }],
  },
  {
    watchId: "auc-003",
    name: "TAG Heuer Calibre 16",
    price: 4100,
    image:
      "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=400&h=400&fit=crop",
    basePrice: 4100,
    sellerId: "user-005",
    saleType: "auction",
    isAuthenticated: true,
    bidders: [],
  },
  {
    watchId: "auc-004",
    name: "Breitling B01 Chronograph",
    price: 8600,
    image:
      "https://images.unsplash.com/photo-1614164185128-e4ec99c436d7?w=400&h=400&fit=crop",
    basePrice: 8600,
    sellerId: "skipped_user",
    saleType: "auction",
    isAuthenticated: false,
    bidders: [{ userId: "user-003", bidAmount: 9000 }],
  },
  {
    watchId: "auc-005",
    name: "IWC Pilot's Watch 41",
    price: 6400,
    image:
      "https://images.unsplash.com/photo-1639006570490-79c0c53f1080?w=400&h=400&fit=crop",
    basePrice: 6400,
    sellerId: "user-006",
    saleType: "auction",
    isAuthenticated: true,
    bidders: [],
  },
  {
    watchId: "auc-006",
    name: "Panerai Marina PAM01312",
    price: 7800,
    image:
      "https://images.unsplash.com/photo-1622434641406-a158123450f9?w=400&h=400&fit=crop",
    basePrice: 7800,
    sellerId: "user-003",
    saleType: "auction",
    isAuthenticated: false,
    bidders: [{ userId: "user-001", bidAmount: 8100 }],
  },
  {
    watchId: "auc-007",
    name: "Hublot Big Bang Titanium",
    price: 11200,
    image:
      "https://images.unsplash.com/photo-1639006570490-79c0c53f1080?w=400&h=400&fit=crop",
    basePrice: 11200,
    sellerId: "user-007",
    saleType: "auction",
    isAuthenticated: true,
    bidders: [{ userId: "user-003", bidAmount: 11500 }],
  },
  {
    watchId: "auc-008",
    name: "Zenith El Chronomaster",
    price: 6900,
    image:
      "https://images.unsplash.com/photo-1533139502658-0198f920d8e8?w=400&h=400&fit=crop",
    basePrice: 6900,
    sellerId: "user-008",
    saleType: "auction",
    isAuthenticated: false,
    bidders: [],
  },
];

export const fixedPriceWatches: FixedPriceWatch[] = [
  {
    watchId: "fix-001",
    name: "Rolex Datejust Steel",
    image:
      "https://images.unsplash.com/photo-1548169874-53e85f753f1e?w=400&h=400&fit=crop",
    price: 8800,
    sellerId: "skipped_user",
    saleType: "fixed-price",
    isAuthenticated: true,
  },
  {
    watchId: "fix-002",
    name: "Omega Seamaster 300M",
    image:
      "https://images.unsplash.com/photo-1639006570490-79c0c53f1080?w=400&h=400&fit=crop",
    price: 5600,
    sellerId: "user-003",
    saleType: "fixed-price",
    isAuthenticated: false,
  },
  {
    watchId: "fix-003",
    name: "Cartier Santos de Large",
    image:
      "https://images.unsplash.com/photo-1609587312208-cea54be969e7?w=400&h=400&fit=crop",
    price: 7100,
    sellerId: "user-004",
    saleType: "fixed-price",
    isAuthenticated: true,
  },
  {
    watchId: "fix-004",
    name: "Tudor Black Fifty-Eight",
    image:
      "https://images.unsplash.com/photo-1639006570490-79c0c53f1080?w=400&h=400&fit=crop",
    price: 3900,
    sellerId: "user-005",
    saleType: "fixed-price",
    isAuthenticated: false,
  },
  {
    watchId: "fix-005",
    name: "Longines Moonphase",
    image:
      "https://images.unsplash.com/photo-1609587312208-cea54be969e7?w=400&h=400&fit=crop",
    price: 3200,
    sellerId: "user-006",
    saleType: "fixed-price",
    isAuthenticated: true,
  },
  {
    watchId: "fix-006",
    name: "Rado Captain  Automatic",
    image:
      "https://images.unsplash.com/photo-1617625802912-cde586faf331?w=400&h=400&fit=crop",
    price: 2800,
    sellerId: "skipped_user",
    saleType: "fixed-price",
    isAuthenticated: false,
  },
  {
    watchId: "fix-007",
    name: "Nomos Glashütte  38",
    image:
      "https://images.unsplash.com/photo-1509048191080-d2984bad6ae5?w=400&h=400&fit=crop",
    price: 2600,
    sellerId: "user-008",
    saleType: "fixed-price",
    isAuthenticated: true,
  },
  {
    watchId: "fix-008",
    name: "Hamilton Khaki Field ",
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop",
    price: 900,
    sellerId: "user-001",
    saleType: "fixed-price",
    isAuthenticated: false,
  },
];

export const offerWatches: OfferWatch[] = [
  {
    watchId: "off-001",
    name: "Jaeger-LeCoultre Reverso ",
    price: 9800,
    image:
      "https://images.unsplash.com/photo-1612817159949-195b6eb9e31a?w=400&h=400&fit=crop",
    expectedPrice: 9800,
    sellerId: "skipped_user",
    saleType: "taking-offer",
    isAuthenticated: true,
    offers: [{ userId: "user-002", offerAmount: 9300 }],
  },
];

export const allWatches: any[] = [
  ...auctionWatches,
  ...fixedPriceWatches,
  ...offerWatches,
];
