import React from "react";

interface HeaderProps {
  setActiveTab: (tab: string) => void;
}

const Header: React.FC<HeaderProps> = ({ setActiveTab }) => {
  return (
    <header className="bg-blue-600 text-white p-6 shadow-md">
      <h1 className="text-3xl font-bold text-center">Dirtworks Admin Panel</h1>

      {/* Navigation Tabs */}
      <nav className="bg-blue-500 text-white p-4 flex justify-center space-x-4 shadow-md">
        <button onClick={() => setActiveTab("home")} className="hover:underline">Home</button>
        <button onClick={() => setActiveTab("products")} className="hover:underline">Products</button>
        <button onClick={() => setActiveTab("specials")} className="hover:underline">Specials</button>
        <button onClick={() => setActiveTab("greenhouses")} className="hover:underline">Greenhouses</button>
      </nav>
    </header>
  );
};

export default Header;
