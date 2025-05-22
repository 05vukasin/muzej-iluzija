"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import CartIcon from "./components/CartIcon";
import { FaShoppingCart } from "react-icons/fa"; // Dodata ikonica korpe

// Definišemo tip podataka za proizvod
type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
};

const ShopPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const router = useRouter(); // Koristimo `useRouter` za navigaciju

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          "https://dinoparkwebshop-backend-1081514700612.us-central1.run.app/api/Product"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const data: Product[] = await response.json();
        setProducts(data);
      } catch (err) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Funkcija za dodavanje u korpu (može se kasnije proširiti)
  const addToCart = (product: Product) => {
    console.log("Dodato u korpu:", product);
  };

  return (
    <section className="bg-white min-h-screen py-20 px-6 mt-24">
      <div className="max-w-7xl mx-auto">
        {/* Prikaz učitavanja */}
        {loading && (
          <p className="text-center text-lg text-gray-600">Učitavanje...</p>
        )}

        {/* Prikaz greške */}
        {error && (
          <p className="text-center text-lg text-red-500">
            Greška pri učitavanju proizvoda. Pokušajte ponovo kasnije.
          </p>
        )}

        {/* Grid layout za prikaz proizvoda */}
        {!loading && !error && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {products.map((product) => (
              <div
                key={product.id}
                className="cursor-pointer bg-gray-100 rounded-lg shadow-lg hover:shadow-2xl transition overflow-hidden relative"
              >
                {/* Slika zauzima 100% širine kartice, bez paddinga */}
                <div className="relative w-full h-64" onClick={() => router.push(`/shop/${product.id}`)}>
                  <Image
                    src={product.imageUrl}
                    alt={product.name}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-t-lg"
                  />
                </div>

                {/* Tekstualni deo kartice */}
                <div className="p-4 flex justify-between items-center">
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900">
                      {product.name}
                    </h2>
                    <p className="text-gray-600 font-bold text-lg mt-2">
                      {product.price},00 RSD
                    </p>
                  </div>
                  <button
                    className="text-gray-700 hover:text-gray-900 text-xl"
                    onClick={() => addToCart(product)}
                  >
                    <FaShoppingCart />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <CartIcon />
    </section>
  );
};

export default ShopPage;
