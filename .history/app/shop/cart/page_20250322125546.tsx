"use client";
import { useEffect, useState } from "react";
import { FaTrash, FaTruck, FaInfoCircle } from "react-icons/fa";

const DELIVERY_COST = 440;
const FREE_DELIVERY_THRESHOLD = 5000;

const CartPage = () => {
  const [cartItems, setCartItems] = useState<any[]>([]);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const form = e.target as HTMLFormElement;
    const name = form.name.value;
    const address = form.address.value;
    const city = form.city.value;
    const postal = form.postal.value;
    const phone = form.phone.value;
    const email = form.email.value;

    const fullAddress = `${address}, ${city} ${postal}`;

    const cart = JSON.parse(localStorage.getItem("cart") || "[]");

    if (!cart.length) {
      alert("Korpa je prazna.");
      return;
    }

    // Grupisanje proizvoda po ID-u
    const itemsMap = new Map<number, { productId: number; quantity: number }>();
    for (const item of cart) {
      if (!item.id) continue;
      if (itemsMap.has(item.id)) {
        itemsMap.get(item.id)!.quantity++;
      } else {
        itemsMap.set(item.id, { productId: item.id, quantity: 1 });
      }
    }

    const items = Array.from(itemsMap.values());

    const payload = {
      name,
      address: fullAddress,
      email,
      phone,
      items,
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

      if (!res.ok) throw new Error("Neuspešno slanje porudžbine");

      const data = await res.json();
      alert("✅ Porudžbina uspešno poslata!");

      localStorage.removeItem("cart");
      window.dispatchEvent(new Event("cartUpdated"));
      location.href = "/"; // ili redirect ka "hvala" stranici ako napraviš
    } catch (err) {
      alert("❌ Došlo je do greške. Pokušajte ponovo.");
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
                name="address"
                placeholder="Adresa"
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
    </div>
  );
};

export default CartPage;
