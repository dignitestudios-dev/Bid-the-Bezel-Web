interface OrderApiResponse {
  success: boolean;
  message: string;
  data: Order[];
  pagination: Pagination;
}

interface Pagination {
  itemsPerPage: number;
  currentPage: number;
  totalItems: number;
  totalPages: number;
}

interface Order {
  _id: string;
  orderNumber: string;
  product: Product;
  buyer: User;
  seller: User;
  totalAmount: number;
  platformFee: number;
  currency: string;
  status: string;
  payment: Payment;
  buyerShippingDetails: any | null;
  sellerShippingDetails: ShippingDetails | null;
  trackingHistory: TrackingHistory[];
  notes: string | null;
  isDeleted: boolean;
  isBuyer: boolean;
  isSeller: boolean;
  isAuthRequested: boolean;
  createdAt: string;
  updatedAt: string;
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
  seller: Partial<User>;
  buyer: Partial<User>;
  images: Image[];
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

interface User {
  _id: string;
  firstName: string | null;
  lastName: string | null;
  userName: string | null;
  email: string | null;
  profilePicture: ProfilePicture | null;
  rating: number;
}

interface ProfilePicture {
  _id: string;
  filename: string;
  key: string;
  location: string;
  mimetype: string;
  size: number;
  uploadedById: string;
  uploadedByModel: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface Image {
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
  days: number;
  startsAt: string | null;
  endsAt: string | null;
  totalBids: number;
  currentBidder: string | null;
  currentBidAmount: number;
}

interface Payment {
  status: string;
  method: string;
  transactionId: string | null;
  paidAt: string | null;
}

interface ShippingDetails {
  status: string;
  courier: string;
  trackingNumber: string;
  trackingLink: string;
}

interface TrackingHistory {
  status: string;
  isMarked: boolean;
  timestamp: string | null;
  trackingLink?: string | null;
}