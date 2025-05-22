"use client";

import { useEffect, useState, useMemo } from "react";
import { debounce } from "lodash";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FaShoppingCart } from "react-icons/fa";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";

type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
};

type ProductListProps = {
  page: number;
  onPageChange: (newPage: number) => void;
  query: string;
};

const ProductList = ({ page, onPageChange, query }: ProductListProps) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const router = useRouter();

  const pageSize = 30;

  const fetchProducts = async (q: string) => {
    setLoading(true);
    try {
      const res = await fetch(
        `https://dinoparkwebshop-backend-1081514700612.us-central1.run.app/api/Product/search?query=${encodeURIComponent(
          q
        )}&page=${page}&pageSize=${pageSize}`
      );
      const data = await res.json();
      setProducts(data.products);
      setTotalPages(data.totalPages);
    } catch (err) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const debouncedFetch = useMemo(() => debounce(fetchProducts, 300), [page]);

  useEffect(() => {
    debouncedFetch(query);

    return () => {
      debouncedFetch.cancel();
    };
  }, [query, debouncedFetch]);

  const addToCart = (product: Product) => {
    let cart = JSON.parse(localStorage.getItem("cart") || "[]");
    cart.push(product);
    localStorage.setItem("cart", JSON.stringify(cart));
    window.dispatchEvent(new Event("cartUpdated"));
  };

  return (
    <div className="w-full">
      {loading && <p className="text-center text-lg text-gray-600">Učitavanje...</p>}
      {error && (
        <p className="text-center text-lg text-red-500">
          Greška pri učitavanju proizvoda.
        </p>
      )}

      {!loading && !error && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {products.map((product) => (
              <div
                key={product.id}
                className="cursor-pointer bg-gray-100 rounded-lg shadow-lg hover:shadow-2xl transition overflow-hidden relative"
              >
                <div
                  className="relative w-full h-64"
                  onClick={() => router.push(`/shop/${product.id}`)}
                >
                  <Image
                    src={product.imageUrl}
                    alt={product.name}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-t-lg"
                  />
                </div>

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

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-4 mt-8">
              <button
                disabled={page === 1}
                onClick={() => onPageChange(page - 1)}
                className="p-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
              >
                <FontAwesomeIcon icon={faChevronLeft} />
              </button>
              <span className="text-sm text-gray-700">
                Strana {page} od {totalPages}
              </span>
              <button
                disabled={page === totalPages}
                onClick={() => onPageChange(page + 1)}
                className="p-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
              >
                <FontAwesomeIcon icon={faChevronRight} />
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ProductList;
