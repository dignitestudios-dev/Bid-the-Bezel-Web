interface ProductsResponse {
  success: boolean;
  message: string;
  data: Product[];
}

interface Product {
  _id: string;
  brandName: string;
  model: string;
  price: number;
  effectivePrice: number;
  soldPrice: number;
  description: string;
  referenceId: string;
  type: string;
  status: string;
  currentHolder: string;
  deliveryFlow: string;
  isDeleted: boolean;
  seller: Seller;
  buyer: Buyer | null;
  images: ProductImage[];
  authFlow: AuthFlow;
  authentication: Authentication;
  shipments: any[]; // refine if structure known
  auction: Auction;
  isMyProduct: boolean;
  isDraftPageShown: boolean;
  createdAt: string;
  updatedAt: string;
}

interface Seller {
  _id: string;
  firstName: string | null;
  lastName: string | null;
  userName: string | null;
  email: string | null;
  profilePicture: string | null;
  rating: number;
}

interface Buyer {
  // define when structure is known
}

interface ProductImage {
  _id: string;
  filename: string;
  location: string;
  mimetype: string;
  size: number;
}

interface AuthFlow {
  sellerRequestedPreAuth: boolean;
  buyerRequestedAuth: boolean;
}

interface Authentication {
  status: string;
  authenticatedBy: string | null;
  authenticatedAt: string | null;
}

interface Auction {
  days: number | null;
  startsAt: string | null;
  endsAt: string | null;
  totalBids: number;
  currentBidder: string | null;
  currentBidAmount: number;
}