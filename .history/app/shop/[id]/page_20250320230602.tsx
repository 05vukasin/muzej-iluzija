"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

// Definišemo tip podataka za proizvod
type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
};

const ProductPage = ({ params }: { params: { id: string } }) => {
  const router = useRouter();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(
          `https://dinoparkwebshop-backend-1081514700612.us-central1.run.app/api/Product/${params.id}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch product details");
        }
        const data: Product = await response.json();
        setProduct(data);
      } catch (err) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [params.id]);

  const handleAddToCart = () => {
    alert(`Dodato u korpu: ${product?.name}`);
  };

  return (
    <section className="bg-white min-h-screen py-20 px-6 mt-24">
      <div className="max-w-5xl mx-auto">
        {/* Dugme za vraćanje nazad */}
        <button
          onClick={() => router.back()} // Vraća korisnika nazad
          className="mb-6 px-6 py-3 bg-gray-200 text-gray-800 font-bold text-lg rounded-lg shadow-md hover:bg-gray-300 transition"
        >
          ← Nazad
        </button>

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

        {/* Prikaz podataka o proizvodu */}
        {product && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            {/* Slika proizvoda */}
            <div className="relative w-full h-96">
              <Image
                src={product.imageUrl}
                alt={product.name}
                layout="fill"
                objectFit="cover"
                className="rounded-lg shadow-lg"
              />
            </div>

            {/* Detalji o proizvodu */}
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
              <p className="text-gray-600 text-lg mt-4">{product.description}</p>
              <p className="text-green-500 text-2xl font-bold mt-6">
                {product.price} RSD
              </p>

              {/* Dugme za dodavanje u korpu */}
              <button
                onClick={handleAddToCart}
                className="mt-6 px-6 py-3 bg-green-500 text-white font-bold text-lg rounded-lg shadow-md hover:bg-green-600 transition"
              >
                Dodaj u korpu
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProductPage;
