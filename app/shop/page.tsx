"use client";

import { useState } from "react";
import ProductList from "./components/ProductList";
import CartIcon from "./components/CartIcon";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const ShopPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [query, setQuery] = useState("");

  return (
    <section className="bg-white min-h-screen py-20 px-6 mt-24">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center">Prodavnica</h1>

        {/* Search bar */}
        <div className="mb-8 flex justify-center">
          <div className="relative w-full max-w-md">
            <input
              type="text"
              placeholder="Pretraži proizvode..."
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setCurrentPage(1); // Resetuje na prvu stranu prilikom nove pretrage
              }}
              className="w-full border border-gray-300 rounded-full py-2 px-5 pr-12 focus:outline-none focus:ring-2 focus:ring-green-400"
            />
            <FontAwesomeIcon
              icon={faSearch}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500"
            />
          </div>
        </div>

        {/* Lista proizvoda */}
        {/* <ProductList
          page={currentPage}
          onPageChange={setCurrentPage}
          query={query}
        /> */}
      </div>

      <CartIcon />
    </section>
  );
};

export default ShopPage;
