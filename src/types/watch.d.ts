 type SaleType = "auction" | "fixed-price" | "taking-offer";

 interface Bidder {
  userId: string;
  bidAmount: number;
}

 interface Offer {
  userId: string;
  offerAmount: number;
}

 interface BaseWatch {
  watchId: string;
  name: string;
  image: string;
  sellerId: string;
  saleType: SaleType;
isAuthenticated?: boolean;
}

 interface AuctionWatch extends BaseWatch {
  saleType: "auction";
  basePrice: number;
  bidders: Bidder[];
}

 interface FixedPriceWatch extends BaseWatch {
  saleType: "fixed-price";
  price: number;
}

 interface OfferWatch extends BaseWatch {
  saleType: "taking-offer";
  expectedPrice: number;
  offers: Offer[];
}

