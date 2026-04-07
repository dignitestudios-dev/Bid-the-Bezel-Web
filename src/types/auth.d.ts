 interface LoginPayload {
  email: string;
  password: string;
}

 interface RegisterPayload {
  name: string;
  email: string;
  password: string;
}

 interface AuthResponse {
 token: string;
  user: {
    id: number;
    name: string;
    email: string;
  };
}