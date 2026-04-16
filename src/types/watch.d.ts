type SaleType = "auction" | "fixed-price" | "taking-offer";

interface Bidder {
  userId: string;
  bidAmount: number;
}

interface Offer {
  userId: string;
  offerAmount: number;
}

interface BaseWatch { watchId: any; name: string; image: any; price: any; saleType: any; isAuthenticated: boolean; }

interface AuctionWatch extends BaseWatch {
  saleType: "auction";
  basePrice: number;
  bidders: Bidder[];
  sellerId: string;
}

interface FixedPriceWatch extends BaseWatch {
  saleType: "fixed-price";
  price: number;
  sellerId: string;
}

interface OfferWatch extends BaseWatch {
  saleType: "taking-offer";
  expectedPrice: number;
  offers: Offer[];
  sellerId: string;
}

interface ProducResponse<T = unknown> {
  data: T;
  message: string;
}
