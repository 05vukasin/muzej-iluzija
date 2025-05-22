"use client";

import { FaShoppingCart } from "react-icons/fa";
import { useState, useEffect } from "react";
import clsx from "clsx";
import CartDrawer from "./CartDrawer";

const CartIcon = () => {
  const [cartCount, setCartCount] = useState(0);
  const [animate, setAnimate] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const updateCartCount = () => {
      const storedCart = JSON.parse(localStorage.getItem("cart") || "[]");
      setCartCount(storedCart.length);

      // Pokreni animaciju
      setAnimate(true);
      setTimeout(() => setAnimate(false), 500);
    };

    updateCartCount();
    window.addEventListener("cartUpdated", updateCartCount);

    return () => {
      window.removeEventListener("cartUpdated", updateCartCount);
    };
  }, []);

  return (
    <>
      <div
        className="fixed bottom-6 right-6 z-50"
        onClick={() => setIsOpen(true)}
      >
        <div className="relative bg-green-500 text-white w-14 h-14 flex items-center justify-center rounded-full shadow-lg hover:bg-green-600 transition-all duration-300 cursor-pointer">
          <FaShoppingCart size={22} />
          {cartCount > 0 && (
            <span
              className={clsx(
                "absolute -top-1 -right-1 bg-red-500 text-white text-[13px] font-bold px-1.5 py-0.5 rounded-full shadow-md",
                animate && "animate-bounce"
              )}
            >
              {cartCount}
            </span>
          )}
        </div>
      </div>

      <CartDrawer isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
};

export default CartIcon;
