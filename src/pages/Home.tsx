import React, { useState } from "react";
import Header from "../components/Header";
import Products from "../components/Products";
import Specials from "../components/Specials";
import Greenhouses from "../components/Greenhouse"

const Home: React.FC = () => {
  const [activeTab, setActiveTab] = useState("home"); 

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      {/* Header & Navigation */}
      <Header setActiveTab={setActiveTab} />

      {/* Main Content */}
      <main className="flex-grow p-8">
        {activeTab === "home" && (
          <div>
            <h2 className="text-2xl font-semibold mb-4">Dashboard</h2>
            <p className="py-4">Welcome to the Dirtworks Admin Panel. Manage data through this admin panel.</p>
            <hr></hr>
            <p className="py-4 font-bold">This is connected to Postgres Database and all changes here will reflect on www.kfdirtworks.com</p>
          </div>
        )}
        {activeTab === "products" && <Products />}
        {activeTab === "specials" && <Specials />}
        {activeTab === "greenhouses" && <Greenhouses />}
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white text-center p-4 mt-8">
        &copy; {new Date().getFullYear()} Dirtworks | Admin Panel
      </footer>
    </div>
  );
};

export default Home;
