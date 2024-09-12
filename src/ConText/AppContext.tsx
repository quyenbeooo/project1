import { createContext, useContext, useEffect, useState } from "react";
import Cookies from "universal-cookie";
import axios from "axios";
export interface Users {
  _id: string;
  username: string;
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
const cookies = new Cookies();
const AuthContext = createContext<AuthContextTypes | undefined>(undefined);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState<Users | null>(null);
  // console.log(user);

  useEffect(() => {
    const storedUser = cookies.get("user");
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);
  const login = async (username: string, password: string): Promise<Users> => {
    try {
      const response = await axios.post("http://localhost:3000/auth/login", {
        username,
        password,
      });

      const userData = response.data.users;
      // const token = response.data;

      if (userData.isLocked) {
        throw new Error(
          "Tài khoản của bạn đã bị khóa. Vui lòng liên hệ bộ phận hỗ trợ."
        );
      }

      // Lưu trữ dữ liệu người dùng bao gồm cả vai trò
      setUser(userData);
      cookies.set("user", userData, { path: "/" });
      cookies.set("token", response.data.token, { path: "/" });

      return userData;
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    cookies.remove("user");
  };

  return (
    <AuthContext.Provider value={{ user, setUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextTypes => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
