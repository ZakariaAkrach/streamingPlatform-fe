import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import { refreshToken } from "../../api/axiosConfig";

export default function AppLayout() {
  useEffect(() => {
    const interval = setInterval(() => {
       console.log("Calling refreshToken...");
      refreshToken();
    }, 10 * 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}
