"use client";
import { useEffect, useState } from "react";

const CartPage = () => {
  const [cartItems, setCartItems] = useState<any[]>([]);

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem("cart") || "[]");
    setCartItems(items);
    const updateCart = () => {
      const refreshed = JSON.parse(localStorage.getItem("cart") || "[]");
      setCartItems(refreshed);
    };
    window.addEventListener("cartUpdated", updateCart);
    return () => window.removeEventListener("cartUpdated", updateCart);
  }, []);

  return (
    <div className="min-h-screen bg-white pt-28 pb-16 px-4 md:px-12">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10">
        {/* Korpa */}
        <div>
          <h2 className="text-3xl font-bold mb-6 text-gray-800">
            🛒 Vaša korpa
          </h2>
          {cartItems.length === 0 ? (
            <p className="text-gray-500">Korpa je prazna.</p>
          ) : (
            <ul className="space-y-4">
              {cartItems.map((item, index) => (
                <li
                  key={index}
                  className="flex justify-between border-b pb-2 text-lg"
                >
                  <span className="text-gray-700">{item.name}</span>
                  <span className="text-green-600 font-semibold">
                    {item.price} RSD
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Forma */}
        <div>
          <h2 className="text-3xl font-bold mb-6 text-gray-800">
            📦 Podaci za dostavu
          </h2>
          <form className="space-y-4">
            <input
              type="text"
              placeholder="Ime i prezime"
              className="w-full p-3 border rounded-md"
            />
            <input
              type="text"
              placeholder="Adresa"
              className="w-full p-3 border rounded-md"
            />
            <input
              type="text"
              placeholder="Grad"
              className="w-full p-3 border rounded-md"
            />
            <input
              type="text"
              placeholder="Poštanski broj"
              className="w-full p-3 border rounded-md"
            />
            <input
              type="tel"
              placeholder="Telefon"
              className="w-full p-3 border rounded-md"
            />
            <input
              type="text"
              value="Srbija"
              disabled
              className="w-full p-3 border rounded-md bg-gray-100 text-gray-500 cursor-not-allowed"
            />
            <button
              type="submit"
              className="w-full bg-green-500 text-white p-3 rounded-md font-bold hover:bg-green-600 transition"
            >
              Pošalji porudžbinu
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
