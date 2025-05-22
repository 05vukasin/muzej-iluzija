"use client";

import { FaShoppingCart } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

const CartIcon = () => {
  const router = useRouter();
  const [cartCount, setCartCount] = useState(0);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const updateCartCount = () => {
      const storedCart = JSON.parse(localStorage.getItem("cart") || "[]");
      setCartCount(storedCart.length);

      // Pokreni animaciju
      setAnimate(true);
      setTimeout(() => setAnimate(false), 500); // traje 0.5s
    };

    updateCartCount();
    window.addEventListener("cartUpdated", updateCartCount);

    return () => {
      window.removeEventListener("cartUpdated", updateCartCount);
    };
  }, []);

  return (
    <div
      className="fixed bottom-6 right-6 z-50"
      onClick={() => router.push("/shop/cart")}
    >
      <div className="relative bg-green-500 text-white w-14 h-14 flex items-center justify-center rounded-full shadow-lg hover:bg-green-600 transition-all duration-300 cursor-pointer">
        <FaShoppingCart size={22} />
        {cartCount > 0 && (
          <span className={`... ${animate ? "animate-bounce" : ""}`}>
            {cartCount}
          </span>
        )}
      </div>
    </div>
  );
};

export default CartIcon;
