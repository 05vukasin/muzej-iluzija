"use client";

import { FaShoppingCart } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

const CartIcon = () => {
  const router = useRouter();
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const updateCartCount = () => {
      const storedCart = JSON.parse(localStorage.getItem("cart") || "[]");
      setCartCount(storedCart.length);
    };

    updateCartCount();
    window.addEventListener("cartUpdated", updateCartCount);

    return () => {
      window.removeEventListener("cartUpdated", updateCartCount);
    };
  }, []);

  return (
    <div
      className="fixed bottom-6 right-6 bg-green-500 text-white w-14 h-14 flex items-center justify-center rounded-full shadow-lg hover:bg-green-600 transition-all duration-300 z-50 cursor-pointer"
      onClick={() => router.push("/shop/cart")}
    >
      <FaShoppingCart size={22} />
      {cartCount > 0 && (
        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[13px] font-bold px-1.5 py-0.5 rounded-full shadow-md">
          {cartCount}
        </span>
      )}
    </div>
  );
};

export default CartIcon;
