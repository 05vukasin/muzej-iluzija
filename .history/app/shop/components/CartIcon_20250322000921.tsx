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
      className="fixed bottom-6 right-6 bg-green-500 text-white p-4 rounded-full cursor-pointer shadow-lg hover:bg-green-600 transition relative flex items-center justify-center w-14 h-14"
      onClick={() => router.push("/shop/cart")}
    >
      <FaShoppingCart size={24} />
      {cartCount > 0 && (
        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-md">
          {cartCount}
        </span>
      )}
    </div>
  );
};

export default CartIcon;
