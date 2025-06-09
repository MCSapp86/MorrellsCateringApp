
import { useState } from "react";

export default function MorrellsCateringApp() {
  const [order, setOrder] = useState({
    name: "",
    size: "",
    spice: "Regular",
    pickupTime: "",
    notes: ""
  });

  const sizes = [
    { id: 1, label: "Mini (16 oz) – $10", price: 10 },
    { id: 2, label: "Small (24 oz) – $17", price: 17 },
    { id: 3, label: "Medium (40 oz) – $25", price: 25 },
    { id: 4, label: "Large (72 oz) – $33", price: 33 },
    { id: 5, label: "Party Tray (96 oz) – $50", price: 50 }
  ];

  const spices = ["Regular", "Mild", "Spicy"];

  const getTax = (price) => price * 0.07;
  const getDiscount = (price) => (price >= 50 ? price * 0.2 : 0);

  const calculateTotal = () => {
    const selectedSize = sizes.find((s) => s.label === order.size);
    if (!selectedSize) return 0;
    const price = selectedSize.price;
    const tax = getTax(price);
    const discount = getDiscount(price);
    return (price + tax - discount).toFixed(2);
  };

  const createSMSLink = (phone, message) => {
    return `sms:${phone}?body=${encodeURIComponent(message)}`;
  };

  const handleSubmit = () => {
    const total = calculateTotal();
    const message = `New Conch Salad Order:\nName: ${order.name}\nSize: ${order.size}\nSpice: ${order.spice}\nPickup: ${order.pickupTime}\nNotes: ${order.notes}\nTotal: $${total}`;
    ["9548650773", "6789494355"].forEach(phone => {
      window.open(createSMSLink(phone, message));
    });
  };

  return (
    <div>
      <h1>Morrell’s Catering Orders</h1>
      <input placeholder="Name" onChange={e => setOrder({...order, name: e.target.value})} />
      <select onChange={e => setOrder({...order, size: e.target.value})}>
        <option value="">Select Size</option>
        {sizes.map(s => <option key={s.id}>{s.label}</option>)}
      </select>
      <select onChange={e => setOrder({...order, spice: e.target.value})}>
        {spices.map((s, i) => <option key={i}>{s}</option>)}
      </select>
      <input placeholder="Pickup Time" onChange={e => setOrder({...order, pickupTime: e.target.value})} />
      <input placeholder="Notes" onChange={e => setOrder({...order, notes: e.target.value})} />
      <p>Total: ${calculateTotal()}</p>
      <button onClick={handleSubmit}>Submit Order via Text</button>
    </div>
  );
}
