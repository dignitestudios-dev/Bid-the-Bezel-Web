interface HomepageProductsResponse {
  success: boolean;
  message: string;
  data: {
    fixed_price: FixedPriceProduct[];
    auction: AuctionProduct[];
    taking_offers: TakingOfferProduct[];
  };
}

 interface TakingOfferProduct {
  _id: string;
  brandName: string;
  model: string;
  price: number;
  effectivePrice: number;
  soldPrice: number;
  description: string;
  referenceId: string;
  type: "taking_offers";
  status: "active" | string;
  currentHolder: "seller" | "buyer" | string;
  deliveryFlow: "at_seller" | string;
  isDeleted: boolean;

  seller: User;
  buyer: User | null;

  images: ProductImage[];

  authFlow: AuthFlow;
  authentication: Authentication;

  shipments: Record<string, any>;

  auction: Auction;

  isMyProduct: boolean;
  isDraftPageShown: boolean;
  isFavorite: boolean;

  createdAt: string;
  updatedAt: string;
}

interface FixedPriceProduct {
  _id: string;
  brandName: string;
  model: string;
  price: number;
  soldPrice: number;
  description: string | null;
  referenceId: string;
  type: "fixed_price";
  status: string;
  currentHolder: string;
  deliveryFlow: string;
  isDeleted: boolean;

  seller: Seller;
  buyer: any;

  images: ProductImage[];

  authFlow: {
    sellerRequestedPreAuth: boolean;
    buyerRequestedAuth: boolean;
  };

  authentication: {
    status: string;
    authenticatedBy: any;
    authenticatedAt: string | null;
  };

  shipments: any[];

  isMyProduct: boolean;
  isDraftPageShown: boolean;
  isFavorite: boolean;

  createdAt: string;
  updatedAt: string;
}

interface AuctionProduct {
  _id: string;
  brandName: string;
  model: string;
  price: number;
  effectivePrice: number;
  soldPrice: number;
  description: string | null;
  referenceId: string;

  type: "auction";
  status: "active" | "inactive" | "sold" | "deleted"; // adjust if more statuses exist
  currentHolder: "seller" | "buyer";

  deliveryFlow: "at_seller" | "shipping"; // extend if needed
  isDeleted: boolean;

  seller: Seller;
  buyer: Buyer | null;

  images: ProductImage[];

  authFlow: AuthFlow;

  authentication: Authentication;

  shipments: Shipment[];

  auction: AuctionDetails;
  isFavorite: boolean;
  isMyProduct: boolean;
  isDraftPageShown: boolean;

  createdAt: string;
  updatedAt: string;
}

interface Seller {
  _id: string;
  firstName: string | null;
  lastName: string | null;
  userName: string;
  email: string;
  profilePicture: string | null;
  rating: number;
}

interface ProductImage {
  _id: string;
  filename: string | null;
  location: string | null;
  mimetype: string | null;
  size: number | null;
}

