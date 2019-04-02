import React from "react";

import Navbar from "./Navbar";
import Content from "./Content";
import Footer from "./Footer";

export default function App() {
  return (
    <div className="container">
      <Navbar />
      <Content />
      <Footer />
    </div>
  );
}
