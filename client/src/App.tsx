import Footer from "layout/Footer/Footer";
import SubFooter from "layout/Footer/SubFooter";
import Navbar from "layout/Navbar/Navbar";
import Home from "pages/Home/Home";
import React from "react";

const App: React.FC = () => {
  return (
    <div>
      <Navbar />
      <Home />
      <Footer />
    </div>
  );
};

export default App;
