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
    <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex justify-end">
      <div className="w-full max-w-4xl bg-white shadow-lg flex flex-col md:flex-row">
        {/* Leva strana - proizvodi */}
        <div className="w-full md:w-1/2 p-6 overflow-y-auto">
          <h2 className="text-2xl font-bold mb-4">Vaša korpa</h2>
          {cartItems.length === 0 ? (
            <p>Korpa je prazna.</p>
          ) : (
            <ul className="space-y-4">
              {cartItems.map((item, index) => (
                <li key={index} className="flex justify-between">
                  <span>{item.name}</span>
                  <span>{item.price} RSD</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Desna strana - forma */}
        <div className="w-full md:w-1/2 p-6 border-l">
          <h2 className="text-2xl font-bold mb-4">Podaci za dostavu</h2>
          <form className="space-y-4">
            <input
              type="text"
              placeholder="Ime i prezime"
              className="w-full p-3 border rounded"
            />
            <input
              type="text"
              placeholder="Adresa"
              className="w-full p-3 border rounded"
            />
            <input
              type="text"
              placeholder="Grad"
              className="w-full p-3 border rounded"
            />
            <input
              type="text"
              placeholder="Telefon"
              className="w-full p-3 border rounded"
            />
            <button
              type="submit"
              className="w-full bg-green-500 text-white p-3 rounded font-bold hover:bg-green-600"
            >
              Pošalji porudžbinu
            </button>
          </form>
        </div>
      </div>
      <button
        className="absolute top-4 right-4 text-white text-2xl"
        onClick={onClose}
      >
        ✕
      </button>
    </div>
  );
};

export default CartDrawer;
