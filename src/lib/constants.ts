const user = {
  name: "John Doe",
  age: 30,
  email: "john.doe@example.com",
};


export const currentUser = {
  id: "user-003",
  name: "Alex Morgan"
};

export const auctionWatches: AuctionWatch[] = [
  { watchId: "auc-001", name: "Rolex Submariner 116610LN", image: "https://images.unsplash.com/photo-1594534475808-b18fc33b045e?w=400&h=400&fit=crop", basePrice: 9500, sellerId: "skipped_user", saleType: "auction", isAuthenticated: true, bidders: [] },
  { watchId: "auc-002", name: "Omega Speedmaster  Professional", image: "https://images.unsplash.com/photo-1594534475808-b18fc33b045e?w=400&h=400&fit=crop", basePrice: 7200, sellerId: "user-003", saleType: "auction", isAuthenticated: false, bidders: [{ userId: "user-004", bidAmount: 7500 }] },
  { watchId: "auc-003", name: "TAG Heuer Calibre 16", image: "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=400&h=400&fit=crop", basePrice: 4100, sellerId: "user-005", saleType: "auction", isAuthenticated: true, bidders: [] },
  { watchId: "auc-004", name: "Breitling B01 Chronograph", image: "https://images.unsplash.com/photo-1614164185128-e4ec99c436d7?w=400&h=400&fit=crop", basePrice: 8600, sellerId: "skipped_user", saleType: "auction", isAuthenticated: false, bidders: [{ userId: "user-003", bidAmount: 9000 }] },
  { watchId: "auc-005", name: "IWC Pilot's Watch 41", image: "https://images.unsplash.com/photo-1639006570490-79c0c53f1080?w=400&h=400&fit=crop", basePrice: 6400, sellerId: "user-006", saleType: "auction", isAuthenticated: true, bidders: [] },
  { watchId: "auc-006", name: "Panerai Marina PAM01312", image: "https://images.unsplash.com/photo-1622434641406-a158123450f9?w=400&h=400&fit=crop", basePrice: 7800, sellerId: "user-003", saleType: "auction", isAuthenticated: false, bidders: [{ userId: "user-001", bidAmount: 8100 }] },
  { watchId: "auc-007", name: "Hublot Big Bang Titanium", image: "https://images.unsplash.com/photo-1639006570490-79c0c53f1080?w=400&h=400&fit=crop", basePrice: 11200, sellerId: "user-007", saleType: "auction", isAuthenticated: true, bidders: [{ userId: "user-003", bidAmount: 11500 }] },
  { watchId: "auc-008", name: "Zenith El Chronomaster", image: "https://images.unsplash.com/photo-1533139502658-0198f920d8e8?w=400&h=400&fit=crop", basePrice: 6900, sellerId: "user-008", saleType: "auction", isAuthenticated: false, bidders: [] }
];

export const fixedPriceWatches: FixedPriceWatch[] = [
  { watchId: "fix-001", name: "Rolex Datejust Steel", image: "https://images.unsplash.com/photo-1548169874-53e85f753f1e?w=400&h=400&fit=crop", price: 8800, sellerId: "skipped_user", saleType: "fixed-price", isAuthenticated: true },
  { watchId: "fix-002", name: "Omega Seamaster 300M", image: "https://images.unsplash.com/photo-1639006570490-79c0c53f1080?w=400&h=400&fit=crop", price: 5600, sellerId: "user-003", saleType: "fixed-price", isAuthenticated: false },
  { watchId: "fix-003", name: "Cartier Santos de Large", image: "https://images.unsplash.com/photo-1609587312208-cea54be969e7?w=400&h=400&fit=crop", price: 7100, sellerId: "user-004", saleType: "fixed-price", isAuthenticated: true },
  { watchId: "fix-004", name: "Tudor Black Fifty-Eight", image: "https://images.unsplash.com/photo-1639006570490-79c0c53f1080?w=400&h=400&fit=crop", price: 3900, sellerId: "user-005", saleType: "fixed-price", isAuthenticated: false },
  { watchId: "fix-005", name: "Longines Moonphase", image: "https://images.unsplash.com/photo-1609587312208-cea54be969e7?w=400&h=400&fit=crop", price: 3200, sellerId: "user-006", saleType: "fixed-price", isAuthenticated: true },
  { watchId: "fix-006", name: "Rado Captain  Automatic", image: "https://images.unsplash.com/photo-1617625802912-cde586faf331?w=400&h=400&fit=crop", price: 2800, sellerId: "skipped_user", saleType: "fixed-price", isAuthenticated: false },
  { watchId: "fix-007", name: "Nomos Glashütte  38", image: "https://images.unsplash.com/photo-1509048191080-d2984bad6ae5?w=400&h=400&fit=crop", price: 2600, sellerId: "user-008", saleType: "fixed-price", isAuthenticated: true },
  { watchId: "fix-008", name: "Hamilton Khaki Field ", image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop", price: 900, sellerId: "user-001", saleType: "fixed-price", isAuthenticated: false }
];

export const offerWatches: OfferWatch[] = [
  { watchId: "off-001", name: "Jaeger-LeCoultre Reverso ", image: "https://images.unsplash.com/photo-1612817159949-195b6eb9e31a?w=400&h=400&fit=crop", expectedPrice: 9800, sellerId: "skipped_user", saleType: "taking-offer", isAuthenticated: true, offers: [{ userId: "user-002", offerAmount: 9300 }] },
  { watchId: "off-002", name: "Breguet Classique 5177", image: "https://images.unsplash.com/photo-1614164185128-e4ec99c436d7?w=400&h=400&fit=crop", expectedPrice: 11500, sellerId: "user-004", saleType: "taking-offer", isAuthenticated: false, offers: [] },
  { watchId: "off-003", name: "Vacheron Constantin Overseas", image: "https://images.unsplash.com/photo-1614164185128-e4ec99c436d7?w=400&h=400&fit=crop", expectedPrice: 14500, sellerId: "skipped_user", saleType: "taking-offer", isAuthenticated: true, offers: [{ userId: "user-003", offerAmount: 13800 }] },
  { watchId: "off-004", name: "Audemars Piguet Royal Oak ", image: "https://images.unsplash.com/photo-1603561596112-0a132b757442?w=400&h=400&fit=crop", expectedPrice: 32000, sellerId: "user-006", saleType: "taking-offer", isAuthenticated: false, offers: [] },
  { watchId: "off-005", name: "Patek Philippe  5196G", image: "https://images.unsplash.com/photo-1622434641406-a158123450f9?w=400&h=400&fit=crop", expectedPrice: 29000, sellerId: "user-007", saleType: "taking-offer", isAuthenticated: true, offers: [{ userId: "user-001", offerAmount: 27000 }] },
  { watchId: "off-006", name: "Blancpain Fifty Fathoms ", image: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=400&h=400&fit=crop", expectedPrice: 13500, sellerId: "user-008", saleType: "taking-offer", isAuthenticated: false, offers: [] },
  { watchId: "off-007", name: "Glashütte Original Senator ", image: "https://images.unsplash.com/photo-1547996160-81dfa63595aa?w=400&h=400&fit=crop", expectedPrice: 10800, sellerId: "user-002", saleType: "taking-offer", isAuthenticated: true, offers: [] },
  { watchId: "off-008", name: "Ulysse Nardin Marine ", image: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=400&h=400&fit=crop", expectedPrice: 8900, sellerId: "user-003", saleType: "taking-offer", isAuthenticated: false, offers: [{ userId: "user-004", offerAmount: 8600 }] }
];
