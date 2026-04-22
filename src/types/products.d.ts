interface HomepageProductsResponse {
  success: boolean;
  message: string;
  data: {
    fixed_price: FixedPriceProduct[];
    auction: AuctionProduct[];
    taking_offers: any[];
  };
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

  createdAt: string;
  updatedAt: string;
}

interface AuctionProduct {
  _id: string;
  brandName: string;
  model: string;
  price: number;
  soldPrice: number;
  description: string | null;
  referenceId: string;
  type: "auction";
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

