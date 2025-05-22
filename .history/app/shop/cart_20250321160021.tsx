"use client";

import { useState } from "react";

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);

  return (
    <section className="bg-white min-h-screen py-20 px-6 mt-24">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Vaša Korpa</h1>
        {cartItems.length === 0 ? (
          <p className="text-lg text-gray-600">Korpa je trenutno prazna.</p>
        ) : (
          <div>{/* Ovdje će ići lista proizvoda u korpi */}</div>
        )}
      </div>
    </section>
  );
};

export default CartPage;
