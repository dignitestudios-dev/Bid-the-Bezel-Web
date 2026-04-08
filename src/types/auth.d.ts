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

interface AuthResponse {
  success: boolean;
  data: {
    token: string;
    user: {
      id: number;
      name: string;
      email: string;
      isProfileCompleted: boolean;
      isEmailVerified: boolean;
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
  };
}