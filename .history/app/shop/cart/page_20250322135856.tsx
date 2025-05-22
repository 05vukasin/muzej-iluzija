"use client";
import { useEffect, useState } from "react";
import { FaTrash, FaTruck, FaInfoCircle } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import Modal from "react-modal";

Modal.setAppElement("body"); // da ne baci warning

const DELIVERY_COST = 440;
const FREE_DELIVERY_THRESHOLD = 5000;

const CartPage = () => {
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [formData, setFormData] = useState<FormData | null>(null);

  type FormData = {
    name: string;
    address: string;
    city: string;
    postal: string;
    phone: string;
    email: string;
  };

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("cart") || "[]");
    setCartItems(stored);
    const update = () => {
      const refreshed = JSON.parse(localStorage.getItem("cart") || "[]");
      setCartItems(refreshed);
    };
    window.addEventListener("cartUpdated", update);
    return () => window.removeEventListener("cartUpdated", update);
  }, []);

  const removeItem = (indexToRemove: number) => {
    const updated = cartItems.filter((_, i) => i !== indexToRemove);
    setCartItems(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
    window.dispatchEvent(new Event("cartUpdated"));
  };

  const total = cartItems.reduce((acc, item) => acc + item.price, 0);
  const delivery = total >= FREE_DELIVERY_THRESHOLD ? 0 : DELIVERY_COST;
  const grandTotal = total + delivery;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;

    const data: FormData = {
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      address: (form.elements.namedItem("address") as HTMLInputElement).value,
      city: (form.elements.namedItem("city") as HTMLInputElement).value,
      postal: (form.elements.namedItem("postal") as HTMLInputElement).value,
      phone: (form.elements.namedItem("phone") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
    };

    setFormData(data);
    setConfirmOpen(true);
  };

  const submitOrder = async () => {
    if (!formData) return;
    setConfirmOpen(false);

    const cart = JSON.parse(localStorage.getItem("cart") || "[]");

    if (!cart.length) {
      toast.error("Korpa je prazna.");
      return;
    }

    const itemsMap = new Map<number, { productId: number; quantity: number }>();
    for (const item of cart) {
      if (!item.id) continue;
      if (itemsMap.has(item.id)) {
        itemsMap.get(item.id)!.quantity++;
      } else {
        itemsMap.set(item.id, { productId: item.id, quantity: 1 });
      }
    }

    const payload = {
      name: formData.name,
      address: formData.address,
      city: formData.city,
      postalCode: formData.postal,
      email: formData.email,
      phone: formData.phone,
      items: Array.from(itemsMap.values()),
    };

    try {
      const res = await fetch(
        "https://dinoparkwebshop-backend-1081514700612.us-central1.run.app/api/Order",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      if (!res.ok) throw new Error("Neuspešno slanje");

      toast.success("✅ Hvala na porudžbini! Bićete uskoro kontaktirani.");
      localStorage.removeItem("cart");
      window.dispatchEvent(new Event("cartUpdated"));

      // Očisti formu
      setFormData(null);
      const form = document.querySelector("form") as HTMLFormElement;
      form.reset();
    } catch (err) {
      toast.error("❌ Došlo je do greške.");
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-white pt-28 pb-16 px-4 md:px-12">
      <div className="max-w-6xl mx-auto space-y-10">
        {/* ✅ INFO BLOKOVI */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="flex items-start gap-4 bg-gray-100 p-4 rounded-lg shadow-sm">
            <FaTruck size={24} className="text-green-600 mt-1" />
            <p className="text-gray-700 text-sm md:text-base">
              Šaljemo <strong>PostExpress</strong>-om. Porudžbine do 12h stižu
              narednog dana. Posle 12h idu dan kasnije.
            </p>
          </div>
          <div className="flex items-start gap-4 bg-gray-100 p-4 rounded-lg shadow-sm">
            <FaInfoCircle size={24} className="text-yellow-500 mt-1" />
            <p className="text-gray-700 text-sm md:text-base">
              Za porudžbine preko <strong>5.000 RSD</strong>, poštarina je{" "}
              <span className="text-green-600 font-bold">besplatna</span>.
            </p>
          </div>
        </div>

        {/* ✅ KORPA I FORMA */}
        <div className="grid md:grid-cols-2 gap-10">
          {/* Leva strana */}
          <div>
            <h2 className="text-3xl font-bold mb-6 text-gray-800">
              🛒 Vaša korpa
            </h2>
            {cartItems.length === 0 ? (
              <p className="text-gray-500">Korpa je prazna.</p>
            ) : (
              <ul className="space-y-4">
                {cartItems.map((item, index) => (
                  <li
                    key={index}
                    className="flex justify-between items-center border-b pb-2"
                  >
                    <div className="flex flex-col">
                      <span className="text-gray-800">{item.name}</span>
                      <span className="text-green-600 font-semibold">
                        {item.price} RSD
                      </span>
                    </div>
                    <button
                      className="text-red-500 hover:text-red-700"
                      onClick={() => removeItem(index)}
                    >
                      <FaTrash />
                    </button>
                  </li>
                ))}
              </ul>
            )}

            {/* ✅ UKUPNO */}
            {cartItems.length > 0 && (
              <div className="mt-10 border-t pt-6">
                <div className="bg-gray-50 p-4 rounded-lg shadow-sm space-y-3 text-base">
                  <div className="flex justify-between text-gray-700 font-medium">
                    <span>Ukupna cena:</span>
                    <span>{total.toLocaleString()} RSD</span>
                  </div>
                  <div className="flex justify-between text-gray-700 font-medium">
                    <span>Poštarina:</span>
                    <span
                      className={
                        delivery === 0 ? "text-green-600 font-bold" : ""
                      }
                    >
                      {delivery === 0
                        ? "Besplatna"
                        : `${delivery.toLocaleString()} RSD`}
                    </span>
                  </div>
                  <hr />
                  <div className="flex justify-between text-xl font-bold text-green-700">
                    <span>Za uplatu:</span>
                    <span>{grandTotal.toLocaleString()} RSD</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Desna strana - Forma */}
          <div>
            <h2 className="text-3xl font-bold mb-6 text-gray-800">
              📦 Podaci za dostavu
            </h2>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <input
                type="text"
                name="name"
                placeholder="Ime i prezime"
                className="w-full p-3 border rounded-md"
                required
              />
              <input
                type="text"
                name="city"
                placeholder="Grad"
                className="w-full p-3 border rounded-md"
                required
              />
              <input
                type="text"
                name="postal"
                placeholder="Poštanski broj"
                className="w-full p-3 border rounded-md"
                required
              />
              <input
                type="text"
                name="address"
                placeholder="Adresa"
                className="w-full p-3 border rounded-md"
                required
              />
              <input
                type="tel"
                name="phone"
                placeholder="Telefon"
                className="w-full p-3 border rounded-md"
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Email adresa"
                className="w-full p-3 border rounded-md"
                required
              />
              <input
                type="text"
                value="Srbija"
                disabled
                className="w-full p-3 border rounded-md bg-gray-100 text-gray-500 cursor-not-allowed"
              />
              <button
                type="submit"
                className="w-full bg-green-500 text-white p-3 rounded-md font-bold hover:bg-green-600 transition"
              >
                Pošalji porudžbinu
              </button>
            </form>
          </div>
        </div>
      </div>
      <Modal
        isOpen={confirmOpen}
        onRequestClose={() => setConfirmOpen(false)}
        className="bg-white w-full max-w-md p-8 rounded-xl shadow-xl text-center mx-4"
        overlayClassName="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50"
      >
        <h2 className="text-2xl font-bold mb-3 text-gray-800">
          Da li ste sigurni?
        </h2>
        <p className="text-gray-600 mb-6">
          Potvrdom će porudžbina biti poslata.
        </p>
        <div className="flex justify-center gap-4">
          <button
            onClick={submitOrder}
            className="bg-green-500 text-white px-6 py-2 rounded-md hover:bg-green-600 transition font-semibold"
          >
            Spreman sam
          </button>
          <button
            onClick={() => setConfirmOpen(false)}
            className="bg-gray-200 text-gray-800 px-6 py-2 rounded-md hover:bg-gray-300 transition font-semibold"
          >
            Otkaži
          </button>
        </div>
      </Modal>

      <ToastContainer position="top-center" />
    </div>
  );
};

export default CartPage;
