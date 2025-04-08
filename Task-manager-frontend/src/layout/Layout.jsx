import React from "react";
import Header from "./compnents/header/Header";
import Body from "./compnents/body/Body";
import Footer from "./compnents/footer/Footer";

const Layout = () => {
  return (
    <div
      style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
    >
      <Header />
      <Body />
      <Footer />
    </div>
  );
};

export default Layout;
