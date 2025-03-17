import React from "react";
import AppRoutes from "./routes/AppRoutes";
import Nav from "./components/Nav";
import Footer from "./components/Footer";

const App = () => {
  return (
    <main className="scroll-hide">
      <Nav />
      <AppRoutes />
      <Footer />
    </main>
  );
};

export default App;
