// types.ts
export interface Users {
  _id: string;
  username: string;
  image: string;
  email: string;
  password: string;
  confirmPassword: string;
  dateOfBirth: string;
  phoneNumber: string;
  address: string;
  role: string;
}

export interface AuthContextTypes {
  user: Users | null;
  setUser: React.Dispatch<React.SetStateAction<Users | null>>;
  login: (username: string, password: string) => Promise<Users>;
  logout: () => void;
}
