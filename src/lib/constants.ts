const user = {
  name: "John Doe",
  age: 30,
  email: "john.doe@example.com",
};


export const currentUser = {
  id: "user-003",
  name: "Alex Morgan"
};

export const auctionWatches : AuctionWatch[] = [
  { watchId: "auc-001", name: "Rolex Submariner", image: "https://picsum.photos/seed/rolex1/400/400", basePrice: 9500, sellerId: "skipped_user", saleType: "auction", isAuthenticated: true, bidders: [] },
  { watchId: "auc-002", name: "Omega Speedmaster", image: "https://picsum.photos/seed/omega1/400/400", basePrice: 7200, sellerId: "user-003", saleType: "auction", isAuthenticated: false, bidders: [{ userId: "user-004", bidAmount: 7500 }] },
  { watchId: "auc-003", name: "Tag Heuer Carrera", image: "https://picsum.photos/seed/tag1/400/400", basePrice: 4100, sellerId: "user-005", saleType: "auction", isAuthenticated: true, bidders: [] },
  { watchId: "auc-004", name: "Breitling Navitimer", image: "https://picsum.photos/seed/breit1/400/400", basePrice: 8600, sellerId: "skipped_user", saleType: "auction", isAuthenticated: false, bidders: [{ userId: "user-003", bidAmount: 9000 }] },
  { watchId: "auc-005", name: "IWC Pilot Chronograph", image: "https://picsum.photos/seed/iwc1/400/400", basePrice: 6400, sellerId: "user-006", saleType: "auction", isAuthenticated: true, bidders: [] },
  { watchId: "auc-006", name: "Panerai Luminor", image: "https://picsum.photos/seed/panerai1/400/400", basePrice: 7800, sellerId: "user-003", saleType: "auction", isAuthenticated: false, bidders: [{ userId: "user-001", bidAmount: 8100 }] },
  { watchId: "auc-007", name: "Hublot Big Bang", image: "https://picsum.photos/seed/hublot1/400/400", basePrice: 11200, sellerId: "user-007", saleType: "auction", isAuthenticated: true, bidders: [{ userId: "user-003", bidAmount: 11500 }] },
  { watchId: "auc-008", name: "Zenith El Primero", image: "https://picsum.photos/seed/zenith1/400/400", basePrice: 6900, sellerId: "user-008", saleType: "auction", isAuthenticated: false, bidders: [] }
];



export const fixedPriceWatches :FixedPriceWatch[] = [
  { watchId: "fix-001", name: "Rolex Datejust", image: "https://picsum.photos/seed/rolex2/400/400", price: 8800, sellerId: "skipped_user", saleType: "fixed-price", isAuthenticated: true },
  { watchId: "fix-002", name: "Omega Seamaster", image: "https://picsum.photos/seed/omega2/400/400", price: 5600, sellerId: "user-003", saleType: "fixed-price", isAuthenticated: false },
  { watchId: "fix-003", name: "Cartier Santos", image: "https://picsum.photos/seed/cartier1/400/400", price: 7100, sellerId: "user-004", saleType: "fixed-price", isAuthenticated: true },
  { watchId: "fix-004", name: "Tudor Black Bay", image: "https://picsum.photos/seed/tudor1/400/400", price: 3900, sellerId: "user-005", saleType: "fixed-price", isAuthenticated: false },
  { watchId: "fix-005", name: "Longines Master Collection", image: "https://picsum.photos/seed/longines1/400/400", price: 3200, sellerId: "user-006", saleType: "fixed-price", isAuthenticated: true },
  { watchId: "fix-006", name: "Rado Captain Cook", image: "https://picsum.photos/seed/rado1/400/400", price: 2800, sellerId: "skipped_user", saleType: "fixed-price", isAuthenticated: false },
  { watchId: "fix-007", name: "Nomos Tangente", image: "https://picsum.photos/seed/nomos1/400/400", price: 2600, sellerId: "user-008", saleType: "fixed-price", isAuthenticated: true },
  { watchId: "fix-008", name: "Hamilton Khaki Field", image: "https://picsum.photos/seed/hamilton1/400/400", price: 900, sellerId: "user-001", saleType: "fixed-price", isAuthenticated: false }
];

export const offerWatches :OfferWatch[] = [
  { watchId: "off-001", name: "Jaeger-LeCoultre Reverso", image: "https://picsum.photos/seed/jlc1/400/400", expectedPrice: 9800, sellerId: "skipped_user", saleType: "taking-offer", isAuthenticated: true, offers: [{ userId: "user-002", offerAmount: 9300 }] },
  { watchId: "off-002", name: "Breguet Classique", image: "https://picsum.photos/seed/breguet1/400/400", expectedPrice: 11500, sellerId: "user-004", saleType: "taking-offer", isAuthenticated: false, offers: [] },
  { watchId: "off-003", name: "Vacheron Constantin Fiftysix", image: "https://picsum.photos/seed/vacheron1/400/400", expectedPrice: 14500, sellerId: "skipped_user", saleType: "taking-offer", isAuthenticated: true, offers: [{ userId: "user-003", offerAmount: 13800 }] },
  { watchId: "off-004", name: "Audemars Piguet Royal Oak", image: "https://picsum.photos/seed/ap1/400/400", expectedPrice: 32000, sellerId: "user-006", saleType: "taking-offer", isAuthenticated: false, offers: [] },
  { watchId: "off-005", name: "Patek Philippe Calatrava", image: "https://picsum.photos/seed/patek1/400/400", expectedPrice: 29000, sellerId: "user-007", saleType: "taking-offer", isAuthenticated: true, offers: [{ userId: "user-001", offerAmount: 27000 }] },
  { watchId: "off-006", name: "Blancpain Fifty Fathoms", image: "https://picsum.photos/seed/blancpain1/400/400", expectedPrice: 13500, sellerId: "user-008", saleType: "taking-offer", isAuthenticated: false, offers: [] },
  { watchId: "off-007", name: "Glashütte Original Senator", image: "https://picsum.photos/seed/glashutte1/400/400", expectedPrice: 10800, sellerId: "user-002", saleType: "taking-offer", isAuthenticated: true, offers: [] },
  { watchId: "off-008", name: "Ulysse Nardin Marine", image: "https://picsum.photos/seed/un1/400/400", expectedPrice: 8900, sellerId: "user-003", saleType: "taking-offer", isAuthenticated: false, offers: [{ userId: "user-004", offerAmount: 8600 }] }
];
