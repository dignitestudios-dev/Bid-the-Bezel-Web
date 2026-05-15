interface Image {
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

interface AdvertisementMetadata {
  link: string;
}

interface Advertisement {
  _id: string;
  title: string;
  content: string;
  image: Image;
  metadata: AdvertisementMetadata;
  is_active: boolean;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface Pagination {
  itemsPerPage: number;
  currentPage: number;
  totalItems: number;
  totalPages: number;
}

interface AdvertisementsData {
  advertisements: Advertisement[];
  pagination: Pagination;
}

interface AdvertisementsResponse {
  success: boolean;
  message: string;
  data: AdvertisementsData;
}