'use client';

import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronLeft,
  faChevronRight,
  faTimes,
} from '@fortawesome/free-solid-svg-icons';

type GalleryImage = {
  id: number;
  imageUrl: string;
};

export default function GalleryPage() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [fullscreenIndex, setFullscreenIndex] = useState<number | null>(null);

  const pageSize = 30;
  const API_URL =
    'https://dinoparkwebshop-backend-1081514700612.us-central1.run.app/api/Gallery/paged';

  useEffect(() => {
    const fetchImages = async () => {
      const res = await fetch(`${API_URL}?page=${currentPage}&pageSize=${pageSize}`);
      const data = await res.json();
      setImages(data.images);
      setTotalPages(data.totalPages);
    };

    fetchImages();
  }, [currentPage]);

  const openImage = (index: number) => setFullscreenIndex(index);
  const closeImage = () => setFullscreenIndex(null);
  const nextImage = () => setFullscreenIndex((prev) => (prev !== null && prev < images.length - 1 ? prev + 1 : prev));
  const prevImage = () => setFullscreenIndex((prev) => (prev !== null && prev > 0 ? prev - 1 : prev));

  return (
    <div className="p-4 mt-28">
      <h1 className="text-2xl font-semibold mb-6 text-center">Galerija</h1>

      {/* Grid sa slikama */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {images.map((img, index) => (
          <img
            key={img.id}
            src={img.imageUrl}
            alt={`Image ${img.id}`}
            className="rounded-xl cursor-pointer object-cover w-full h-48"
            onClick={() => openImage(index)}
          />
        ))}
      </div>

      {/* Paginacija */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-4 mt-8">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => p - 1)}
            className="p-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
          >
            <FontAwesomeIcon icon={faChevronLeft} />
          </button>
          <span className="text-sm text-gray-700">
            Strana {currentPage} od {totalPages}
          </span>
          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((p) => p + 1)}
            className="p-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
          >
            <FontAwesomeIcon icon={faChevronRight} />
          </button>
        </div>
      )}

      {/* Fullscreen modal */}
      {fullscreenIndex !== null && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-90 flex items-center justify-center">
          <button
            onClick={closeImage}
            className="absolute top-4 right-4 text-white text-3xl"
          >
            <FontAwesomeIcon icon={faTimes} />
          </button>

          <button
            onClick={prevImage}
            disabled={fullscreenIndex === 0}
            className="absolute left-4 text-white text-4xl px-2 hover:text-gray-300"
          >
            <FontAwesomeIcon icon={faChevronLeft} />
          </button>

          <img
            src={images[fullscreenIndex].imageUrl}
            alt="Fullscreen"
            className="max-h-[80vh] max-w-[90vw] rounded-xl"
          />

          <button
            onClick={nextImage}
            disabled={fullscreenIndex === images.length - 1}
            className="absolute right-4 text-white text-4xl px-2 hover:text-gray-300"
          >
            <FontAwesomeIcon icon={faChevronRight} />
          </button>
        </div>
      )}
    </div>
  );
}
