interface ProductBidsResponse {
  success: boolean;
  message: string;
  data: Bid[];
  pagination: Pagination;
}

interface Bid {
  currentBidder: CurrentBidder;
  amount: number;
  totalBidAmount: number;
  bidPlacedAt: string;
  product: BidProduct;
  status: "pending" | "accepted" | "rejected" | "cancelled";
  _id: string;
}

interface CurrentBidder {
  name: string;
  userName: string;
  profilePicture: ProfilePicture;
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

interface BidProduct {
  effectivePrice: number;
}

interface Pagination {
  itemsPerPage: number;
  currentPage: number;
  totalItems: number;
  totalPages: number;
}