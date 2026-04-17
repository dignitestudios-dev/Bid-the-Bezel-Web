type AuthStep =
  | "login"
  | "register"
  | "otp-register"
  | "username"
  | "purchase-plan"
  | "plan-selected"
  | "subscription-confirmation"
  | "forgot-password"
  | "otp"
  | "reset-password"
  | "password-changed";

interface LoginPayload {
  email: string;
  password: string;
  method: string
}

interface RegisterPayload {
  name: string;
  email: string;
  password: string;
}
interface User {
  _id: string;
  firstName: string | null;
  lastName: string | null;
  email: string;
  phone: string | null;
  userName: string;
  method: string | null;
  bio: string | null;

  profilePicture: ProfilePicture | null;

  uid: string | null;

  type: string[];

  identityStatus: string;
  stripeAccountStatus: string;

  isPasswordSet: boolean;
  isSubscribed: boolean;
  isEmailVerified: boolean;
  isProfileCompleted: boolean;
  isDeactivatedByAdmin: boolean;
  isSellerPlanPurchased: boolean;
  isBuyerPlanPurchased: boolean;

  rating: number;

  addresses: any[];
  subscriptions: any[];

  createdAt: string;
  updatedAt: string;
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

interface MeApiResponse {
  success: boolean;
  message: string;
  data: User;
}
interface AuthResponse {
  success: boolean;
  data: {
    token: string;
    user: {
      id: number;
      name: string;
      email: string;
      userName?: string;
      profilePicture?: { location: string };
      isProfileCompleted: boolean;
      isEmailVerified: boolean;
      isSubscribed?: boolean;
    };
  };
}

interface CheckUsernameResponse {
  success: boolean;
  data: {
    exists: boolean;
  };
}

interface ProfileData {
  data: {
    id: string;
    name?: string;
    email?: string;
    userName?: string;
    profilePicture?: { location: string };
    isProfileCompleted?: boolean;
    isEmailVerified?: boolean;
    isSubscribed?: boolean;

  };
}