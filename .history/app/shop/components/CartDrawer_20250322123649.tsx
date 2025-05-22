"use client";
import { useEffect, useState } from "react";

const CartDrawer = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const [cartItems, setCartItems] = useState<any[]>([]);

  useEffect(() => {
    const loadCart = () => {
      const items = JSON.parse(localStorage.getItem("cart") || "[]");
      setCartItems(items);
    };
    loadCart();
    window.addEventListener("cartUpdated", loadCart);
    return () => window.removeEventListener("cartUpdated", loadCart);
  }, []);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-end">
      <div className="w-full max-w-5xl bg-white shadow-xl rounded-l-xl flex flex-col md:flex-row overflow-hidden">
        {/* Leva strana - Proizvodi */}
        <div className="w-full md:w-1/2 p-6 overflow-y-auto border-r">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">
            🛒 Vaša korpa
          </h2>
          {cartItems.length === 0 ? (
            <p className="text-gray-500">Korpa je prazna.</p>
          ) : (
            <ul className="space-y-4">
              {cartItems.map((item, index) => (
                <li
                  key={index}
                  className="flex justify-between items-center border-b pb-2"
                >
                  <span className="font-medium text-gray-700">{item.name}</span>
                  <span className="text-green-600 font-semibold">
                    {item.price} RSD
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Desna strana - Forma */}
        <div className="w-full md:w-1/2 p-6">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">
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
      <button
        className="absolute top-4 right-4 text-white text-2xl font-bold"
        onClick={onClose}
      >
        ✕
      </button>
    </div>
  );
};

export default CartDrawer;
