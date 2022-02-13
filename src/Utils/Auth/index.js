import { onAuthStateChanged } from "firebase/auth";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../../config/firebase/config";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
export const AuthContext = React.createContext();

export default function AuthProvider({ children }) {
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { displayName, email, uid, photoURL } = user;
        setUser({ displayName, email, uid, photoURL });
        setLoading(false);
        navigate("/");
        return; 
      } 
      setUser({});
      setLoading(false);
      navigate("/login");
    });
    return () => {
      unsubscribe();
    };
  }, [navigate]);
  return (
    <AuthContext.Provider value={{ user }}>
      {loading ? <Spin indicator={antIcon} /> : children}
    </AuthContext.Provider>
  );
}
