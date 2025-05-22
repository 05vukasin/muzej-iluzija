"use client";

import { useRouter } from "next/navigation";
import { FaShoppingCart } from "react-icons/fa";

const CartIcon = () => {
  const router = useRouter();

  return (
    <button
      onClick={() => router.push("/cart")}
      className="fixed bottom-6 right-6 bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 transition flex items-center justify-center"
      style={{ width: "60px", height: "60px" }}
    >
      <FaShoppingCart size={28} />
    </button>
  );
};

export default CartIcon;
